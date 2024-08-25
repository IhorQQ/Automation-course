const {test, expect} = require("@playwright/test");
const { loginPage, USERS_CREDS } = require('./pages/loginPage.js');

test.describe('Socials check', () => {

    test.beforeEach(async ({ page }) => {
        const loginPageInstance = new loginPage(page);
        await loginPageInstance.goto();
        await page.context().clearCookies();
        await loginPageInstance.starnardUserLogin(USERS_CREDS.standard_user, USERS_CREDS.password)
    });

    test('Twitter check', async ({ page }) => {
        await expect(page.locator('[data-test="social-twitter"]')).toHaveAttribute('href', 'https://twitter.com/saucelabs');
    })

    test('Facebook check', async ({ page }) => {
        await expect(page.locator('[data-test="social-facebook"]')).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');
    })

    test('LinkedIn check', async ({ page }) => {
        await expect(page.locator('[data-test="social-linkedin"]')).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');
    })

})
