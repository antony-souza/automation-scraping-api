import { ICaseContract } from "@src/api/contracts/case.contract";
import { needPaymentMessage, notPaymentMessage } from "@src/services/whatsapp/messases.usecase";
import { SendMessageForWhatsAppGeneric } from "@src/services/whatsapp/send-message-generic.service";
import { logger } from "@src/utils/logger.utils";
import { chromium } from "playwright";


export class CheckPaymentsStudeoUseCase implements ICaseContract {
    async handler(phone: string, name: string, usernameStudeo: string, passwordStudeo: string) {

        if (!usernameStudeo || !passwordStudeo) {
            return {
                message: "Oops!",
                errors: ["Dados não informados"],
            }
        }

        const sendMessageForWhtsAppService = new SendMessageForWhatsAppGeneric();
        const browser = await chromium.launch({
            headless: false,
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

        logger.info("Autenticação Studeo concluída com sucesso!");


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

        const rows = await studeoPage.$$eval("#tablecobrancas tbody tr", (rows: HTMLElement[]) => {
            return rows.map(row => {
                const columns = row.querySelectorAll("td");
                return Array.from(columns).map((col: Element) => col.textContent?.trim() || "");
            });
        });


        if (rows.length === 0) {

            await sendMessageForWhtsAppService.handler(phone, notPaymentMessage(name));
            await browser.close();
            return {
                message: "Não há cobranças pendentes, enviamos mensagem para o aluno!",
                errors: []
            }
        }

        await sendMessageForWhtsAppService.handler(phone, needPaymentMessage(name));
        await browser.close();


        return {
            message: "Existem cobranças pendentes, enviamos mensagem para o aluno!",
            errors: []
        }
        /* const fpePage = await context.newPage();
        await fpePage.goto("https://www.churchofjesuschrist.org/?lang=por", {
            waitUntil: "load",
        });

        console.log("Título:", await fpePage.title());

        await fpePage.click("#truste-consent-button")
        await fpePage.waitForSelector("#signInButtonText")
        await fpePage.click("#signInButtonText")
    
        await fpePage.waitForURL("https://id.churchofjesuschrist.org/oauth2/default/v1/authorize*");

        await fpePage.waitForSelector("input[type='text']")
        await fpePage.fill("input[type='text']",data.usernameFpe)
        await fpePage.click(".button-primary")
        await fpePage.waitForSelector('input[type="password"]');
        await fpePage.fill("input[type='password']", data.passwordFpe)
        await fpePage.click("input[value='Verificar']")

        console.log("Autenticação FPE concluída com sucesso!"); */
    }
}