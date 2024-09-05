const { test, expect } = require('@playwright/test');
const { loginPage, USERS_CREDS } = require('./pages/loginPage.js');
const { mainPage } = require('./pages/mainPage.js');


test.describe('Login tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPageInstance = new loginPage(page);
        await loginPageInstance.goto();
        await page.context().clearCookies();
    });


    test('Successful login', async ({ page }) => {
        const loginPageInstance = new loginPage(page);
        await loginPageInstance.loginFill(USERS_CREDS.standard_user);
        await loginPageInstance.passwordFill(USERS_CREDS.password);
        await loginPageInstance.clickLoginButton();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Locked out user login', async ({ page }) => {
        const loginPageInstance = new loginPage(page);
        await loginPageInstance.loginFill(USERS_CREDS.locked_out_user);
        await loginPageInstance.passwordFill(USERS_CREDS.password);
        await loginPageInstance.clickLoginButton();
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.')
    })

    test('Invalid creds login', async ({ page }) => {
        const loginPageInstance = new loginPage(page);
        await loginPageInstance.loginFill(USERS_CREDS.standard_user);
        await loginPageInstance.passwordFill(USERS_CREDS.wrong_password);
        await loginPageInstance.clickLoginButton();
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

    test('Logout', async ({ page }) => {
        const loginPageInstance = new loginPage(page);
        const mainPageInstance = new mainPage(page);
        await loginPageInstance.starnardUserLogin(USERS_CREDS.standard_user, USERS_CREDS.password);
        await mainPageInstance.menuClick();
        await mainPageInstance.logoutClick();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    })
})