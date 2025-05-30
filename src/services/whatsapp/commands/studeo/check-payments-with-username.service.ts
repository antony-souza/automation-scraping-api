import { WhatsAppProvider } from "@src/providers/whatsapp/whatsapp.provider";
import { Message } from "whatsapp-web.js";
import { logger } from "@src/utils/logger.utils";
import { userModel } from "@src/models/user.model";
import { chromium } from "playwright";
import { needPaymentMessage, notPaymentMessage } from "./messases.usecase";

export class CheckPaymentsWithUsernameCommandService {
    private _pendingUsernameStudeo = new Map<string, boolean>();
    private _contactName = new Map<string, string>();

    async handler() {
        const provider = WhatsAppProvider.Instance;
        if (!provider) return;

        const { client } = provider.getConfig();

        client.on("message", async (message: Message) => {
            const messageTrim = message.body.toLowerCase().trim();
            const contact = await message.getContact();
            const contactName = contact.pushname || contact.verifiedName || contact.number;
            this._contactName.set(message.from, contactName);

            if (messageTrim === "!consultar") {
                const contactName = this._contactName.get(message.from);
                await client.sendMessage(
                    message.from,
                    `🔍 Olá ${contactName}! Para consultar seus pagamentos, precisamos do seu username no Studeo.\n\n *Por favor, informe apenas o username corretamente*, sem espaços ou caracteres especiais.`
                );
                this._pendingUsernameStudeo.set(message.from, true);
                return;
            }
            
            if (this._pendingUsernameStudeo.has(message.from)) {
                const username = messageTrim;

                const user = await userModel.findOne({
                    usernameStudeo: username,
                });

                if (!user) {
                    await client.sendMessage(message.from, "⚠️ O username informado não foi encontrado em nosso sistema. Use *!consultar*, e tente novamente.");
                    this._pendingUsernameStudeo.delete(message.from);
                    return;
                }

                await client.sendMessage(message.from, "Aguarde um momento enquanto verifico os pagamentos pendentes...");

                const browser = await chromium.launch({ headless: true });
                const context = await browser.newContext();
                const studeoPage = await context.newPage();

                await studeoPage.goto("https://studeo.unicesumar.edu.br/#!/access/login", {
                    waitUntil: "load",
                });

                logger.info("Título:", await studeoPage.title());

                await studeoPage.click("div[title='Aceitar']");
                await studeoPage.fill("input[name='username']", user.usernameStudeo);
                await studeoPage.fill("input[name='password']", user.passwordStudeo);
                await studeoPage.click("button[type='submit']");

                logger.info("Autenticação Studeo concluída com sucesso!");

                await studeoPage.waitForURL("https://studeo.unicesumar.edu.br/#!/access/rules");

                try {
                    const ignoreButton = await studeoPage.waitForSelector("button:has-text('Ignorar avisos')", {
                        state: "visible",
                        timeout: 5000,
                    });

                    if (ignoreButton) await ignoreButton.click();
                } catch {
                    logger.info("Botão 'Ignorar avisos' não encontrado, seguindo com a execução.");
                }

                await studeoPage.waitForURL("https://studeo.unicesumar.edu.br/#!/app/home");
                await studeoPage.click("span:has-text('Financeiro')");
                await studeoPage.waitForURL("https://studeo.unicesumar.edu.br/#!/app/studeo/aluno/ambiente/financeiro");
                await studeoPage.click(".main-box-title-cobrancas");

                const tbody = await studeoPage.waitForSelector("tbody");
                let boletosPendentes = "";

                if (tbody) {
                    const boletosTable = await tbody.$$("tr");

                    for (const boleto of boletosTable) {
                        const columns = await boleto.$$("td");
                        const rowData: string[] = [];

                        for (const column of columns) {
                            const dataColumn = await column.innerText();
                            rowData.push(dataColumn.trim());
                        }

                        const titulo = rowData[0]?.replace(/\n+/g, " ");
                        const valor = rowData[1]?.replace(/\n+/g, " ");
                        const vencimento = rowData[3]?.replace(/\n+/g, " ");

                        const isLinhaValida =
                            titulo && valor && vencimento &&
                            !titulo.toLowerCase().includes("nenhum dado") &&
                            !titulo.toLowerCase().includes("não existem dados");

                        if (isLinhaValida) {
                            boletosPendentes += `🔸 *Mensalidade*\n💰 ${valor}\n📅 ${vencimento}\n\n`;
                        }
                    }

                    if (boletosTable.length === 0 || boletosPendentes.trim() === "") {
                        await client.sendMessage(message.from, notPaymentMessage(user.name));
                    } else {
                        await client.sendMessage(message.from, needPaymentMessage(user.name, boletosPendentes));
                    }

                    await browser.close();
                    this._pendingUsernameStudeo.delete(message.from);
                    return;
                }
            }
        });
    }
}
