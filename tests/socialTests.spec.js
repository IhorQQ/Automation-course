const {test} = require("@playwright/test");
const {mainPage} = require("./pages/mainPage");

test.describe('Socials check', () => {

    test.beforeEach(async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        await mainPageInstance.goto();
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
