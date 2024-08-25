const { test, expect } = require('@playwright/test');
const { loginPage, USERS_CREDS } = require('./pages/loginPage.js');
const { mainPage } = require('./pages/mainPage.js');
const {checkoutPage } = require('./pages/checkoutPage.js');


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

test.describe('Shut up and take my money', () => {
    test.beforeEach(async ({ page }) => {
        const loginPageInstance = new loginPage(page);
        await loginPageInstance.goto();
        await page.context().clearCookies();
        await loginPageInstance.starnardUserLogin(USERS_CREDS.standard_user, USERS_CREDS.password)
    })

    test('Adding product to the cart', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        await expect(mainPageInstance.cartBadge).toHaveText('1')
    })

    test('Deleting product from the cart', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        await expect(mainPageInstance.cartBadge).toHaveText('1')
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click()
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden()
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible()
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toBeHidden()
    })

    test('Subtotal calculation', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        const checkoutPageInstance = new checkoutPage(page);
        let firstPriceString = await mainPageInstance.priceElement.nth(0).innerText(); //Get text from an element 1
        let secondPriceString = await mainPageInstance.priceElement.nth(1).innerText(); //Get text from an element 2
        let firstPriceNumber = Number(firstPriceString.split('$')[1]) // Extract number from string
        let secondPriceNumber = Number(secondPriceString.split('$')[1]); // Extract number from string
        await page.getByRole('button', { name: 'Add to cart' }).nth(0).click();
        await page.getByRole('button', { name: 'Add to cart' }).nth(0).click(); //Have no idea why but it clicks on different buttons
        await checkoutPageInstance.goto();

        await expect(checkoutPageInstance.itemTotal).
        toHaveText('Item total: $' + (firstPriceNumber + secondPriceNumber));

    })
})





// test.beforeEach(async ({page}) => {
//     await page.goto('https://gh-users-search.netlify.app/',)
// })
// test('Request conter gets -1 after searh',
//     async ({page, context}) => {
//         // Get text from locator
//         let availableSubmitsText = await page.locator('[data-testid="rate-limit"]', {hasNotText: 'Requests: 0/60'}).innerText();
//         console.log(availableSubmitsText)
//
//         // Fetch the specific number from text
//         let availableSubmitsNumber = availableSubmitsText.split('/')[0].split(':')[1].trim();
//         console.log(availableSubmitsNumber)
//
//         // Logic for submitting
//         if (availableSubmitsNumber > 0) {
//             await page.getByTestId('search-bar').fill('test')
//             await page.getByRole("button", 'submit').click()
//             availableSubmitsNumber--
//             console.log(availableSubmitsNumber)
//             await expect(page.locator('[data-testid="rate-limit"]')).toHaveText("requests: " + availableSubmitsNumber + "/60")
//         } else {
//             console.log('No available submits')
//         }
//         await context.close();
//
//     })
//
//
