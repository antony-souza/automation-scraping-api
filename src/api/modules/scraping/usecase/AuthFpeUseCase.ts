import { ICaseContract } from "@src/api/contracts/case.contract";
import { messagesWhatsapp } from "@src/services/whatsapp/messases.usecase";
import { SendMessageFpePaymentsUseCase } from "@src/services/whatsapp/usecase/send-message-fpe-payments.usecase";
import { logger } from "@src/utils/logger.utils";
import { chromium } from "playwright";

export type AuthFpeData = {
    usernameStudeo: string;
    passwordStudeo: string;
    usernameFpe: string;
    passwordFpe: string;
}

export class AuthFpeUseCase implements ICaseContract {
    async handler(data: AuthFpeData) {

        if (!data) {
            return {
                message: "Oops!",
                errors: ["Dados não informados"],
            }
        }

        const browser = await chromium.launch({
            headless: false,
        });

        const context = await browser.newContext();
        const studeoPage = await context.newPage();
        await studeoPage.goto("https://studeo.unicesumar.edu.br/#!/access/login", {
            waitUntil: "load",
        });

        console.log("Título:", await studeoPage.title());

        await studeoPage.click("div[title='Aceitar']");
        await studeoPage.fill("input[name='username']", data.usernameStudeo);
        await studeoPage.fill("input[name='password']", data.passwordStudeo);
        await studeoPage.click("button[type='submit']");

        console.log("Autenticação Studeo concluída com sucesso!");

        await studeoPage.waitForURL("https://studeo.unicesumar.edu.br/#!/access/rules");
        await studeoPage.click("button:has-text('Ignorar avisos')");

        await studeoPage.waitForURL("https://studeo.unicesumar.edu.br/#!/app/home");
        await studeoPage.click("span:has-text('Financeiro')");
        await studeoPage.waitForURL("https://studeo.unicesumar.edu.br/#!/app/studeo/aluno/ambiente/financeiro");
        await studeoPage.click(".main-box-title-cobrancas");

        const rows = await studeoPage.$$eval("#tablecobrancas tbody tr", rows => {
            return rows.map(row => {
                const columns = row.querySelectorAll("td");
                return Array.from(columns).map(col => col.textContent?.trim());
            });
        });

        if (rows.length === 0) {
            const usecase = new SendMessageFpePaymentsUseCase();
            const phone = "7488152367";
            const message = `✅ Olá! Verificamos aqui e está tudo certo com seus pagamentos.

Não há nenhuma pendência no momento. Pode ficar tranquilo(a)! 😄`

            await usecase.handler(phone, message);

            return {
                message: "Não há cobranças pendentes, enviamos mensagem para o aluno",
                errors: []
            }
        }

        logger.info("Tabela de cobranças:", rows);
    

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

        return {
            message: "Autenticado com sucesso",
            errors: []
        }
    }
}