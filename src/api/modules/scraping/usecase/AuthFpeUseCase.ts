import { ICaseContract } from "@src/api/contracts/case.contract";
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