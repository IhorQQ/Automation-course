
const {loginPage, USERS_CREDS} = require("./tests/pages/loginPage");
import { chromium } from "@playwright/test";

async function globalSetup() {
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPageInstance = new loginPage(page);
    await loginPageInstance.starnardUserLogin(USERS_CREDS.standard_user, USERS_CREDS.password)

    //Save the state
    await page.context().storageState({ path: "./LoginAuth.json"})

    await browser.close();
}

export default globalSetup;