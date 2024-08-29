const {test} = require("@playwright/test");
const { loginPage, USERS_CREDS } = require('./pages/loginPage.js');
const {mainPage} = require("./pages/mainPage");

test.describe('Socials check', () => {

    test.beforeEach(async ({ page }) => {
        const loginPageInstance = new loginPage(page);
        await loginPageInstance.goto();
        await page.context().clearCookies();
        await loginPageInstance.starnardUserLogin(USERS_CREDS.standard_user, USERS_CREDS.password)
    });

    test('Twitter check', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        await mainPageInstance.twitterLinkCheck()
    })

    test('Facebook check', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        await mainPageInstance.facebookLinkCheck()
    })

    test('LinkedIn check', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        await mainPageInstance.linkedinLinkCheck()
    })

})
