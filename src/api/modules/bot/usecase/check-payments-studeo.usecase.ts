import { needPaymentMessage, notPaymentMessage } from "@src/services/whatsapp/commands/studeo/messases.usecase";
import { SendMessageForQueueWhatsGeneric } from "@src/services/whatsapp/send-message-generic.service";
import { logger } from "@src/utils/logger.utils";
import { chromium } from "playwright";


export class CheckPaymentsStudeoUseCase {
    async handler(phone: string, name: string, usernameStudeo: string, passwordStudeo: string) {

        const sendMessageForQueueWhatsGeneric = new SendMessageForQueueWhatsGeneric();

        if (!usernameStudeo || !passwordStudeo) {
            return {
                message: "Oops!",
                errors: ["Dados não informados"],
            }
        }

        const browser = await chromium.launch({
            headless: true,
        });

        const context = await browser.newContext();
        const studeoPage = await context.newPage();
        await studeoPage.goto("https://studeo.unicesumar.edu.br/#!/access/login", {
            waitUntil: "load",
        });

        logger.info("Título:", await studeoPage.title());

        await studeoPage.click("div[title='Aceitar']");
        await studeoPage.fill("input[name='username']", usernameStudeo);
        await studeoPage.fill("input[name='password']", passwordStudeo);
        await studeoPage.click("button[type='submit']");

        logger.info("Autenticacao Studeo concluida com sucesso!");


        await studeoPage.waitForURL("https://studeo.unicesumar.edu.br/#!/access/rules");

        try {
            const ignoreButton = await studeoPage.waitForSelector("button:has-text('Ignorar avisos')", {
                state: 'visible',
                timeout: 5000
            });

            if (ignoreButton) {
                await ignoreButton.click();
            }
        } catch (error) {
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
                await sendMessageForQueueWhatsGeneric.handler(phone, notPaymentMessage(name));
                await browser.close();
            } else {
                await sendMessageForQueueWhatsGeneric.handler(phone, needPaymentMessage(name, boletosPendentes));
                await browser.close();
            }
            await browser.close();
        }
    }
}