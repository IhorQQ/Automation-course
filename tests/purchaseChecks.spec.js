const {test, expect} = require("@playwright/test");
const {loginPage, USERS_CREDS} = require("./pages/loginPage");
const {mainPage} = require("./pages/mainPage");
const {checkoutPage} = require("./pages/checkoutPage");


test.describe('Shut up and take my money', () => {
    test.beforeEach(async ({ page }) => {
        const loginPageInstance = new loginPage(page);
        await loginPageInstance.goto();
        await page.context().clearCookies();
        await loginPageInstance.starnardUserLogin(USERS_CREDS.standard_user, USERS_CREDS.password)
    })

    test('Adding product to the cart', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        await mainPageInstance.addToCartElement.first().click();
        await expect(mainPageInstance.cartBadge).toHaveText('1')
    })

    test('Deleting product from the cart', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        await mainPageInstance.addToCartElement.first().click();
        await expect(mainPageInstance.cartBadge).toHaveText('1')
        await page.locator('[data-test="remove-sauce-labs-backpack"]').click()
        await expect(mainPageInstance.cartBadge).toBeHidden()
        await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible()
    })

    test('Subtotal calculation', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        const checkoutPageInstance = new checkoutPage(page);
        let firstPriceString = await mainPageInstance.priceElement.nth(0).innerText(); //Get text from an element 1
        let secondPriceString = await mainPageInstance.priceElement.nth(1).innerText(); //Get text from an element 2
        let firstPriceNumber = Number(firstPriceString.split('$')[1]) // Extract number from string
        let secondPriceNumber = Number(secondPriceString.split('$')[1]); // Extract number from string
        await mainPageInstance.addToCartElement.first().click();
        await mainPageInstance.addToCartElement.nth(0).click(); //Have no idea why but it clicks on different buttons
        await checkoutPageInstance.goto();

        await expect(checkoutPageInstance.itemTotal).
        toHaveText('Item total: $' + (firstPriceNumber + secondPriceNumber));

    })
})
