const {test, expect} = require("@playwright/test");
const {mainPage} = require("./pages/mainPage");
const {checkoutPage} = require("./pages/checkoutPage");
import {addItemToCart, extractPriceValue, removeItemFromCart} from "./helper/functions";


test.describe('Shut up and take my money', () => {
    test.beforeEach(async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        await mainPageInstance.goto();
    })

    test('Adding product to the cart', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        await addItemToCart(mainPageInstance, 0)
        await expect(mainPageInstance.cartBadge).toHaveText('1')
    })

    test('Deleting product from the cart', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        await addItemToCart(mainPageInstance, 0)
        await expect(mainPageInstance.cartBadge).toHaveText('1')
        await removeItemFromCart(mainPageInstance, 0)
        await expect(mainPageInstance.cartBadge).toBeHidden()
        await expect(mainPageInstance.addToCartElement.nth(0)).toBeVisible()
    })

    test('Subtotal calculation', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        const checkoutPageInstance = new checkoutPage(page);
        await addItemToCart(mainPageInstance, 0)
        await addItemToCart(mainPageInstance, 1)
        await checkoutPageInstance.goto();
        let firstPrice = extractPriceValue(await checkoutPageInstance.inventoryItemPrice.nth(0).innerText())
        let secondPrice = extractPriceValue(await checkoutPageInstance.inventoryItemPrice.nth(1).innerText())
        await expect(checkoutPageInstance.itemTotal).toHaveText(`Item total: $${firstPrice + secondPrice}`);
    })

    test('Tax calculation', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        const checkoutPageInstance = new checkoutPage(page);
        await addItemToCart(mainPageInstance, 0)
        await addItemToCart(mainPageInstance, 1)
        await checkoutPageInstance.goto();
        let taxNumber = ((extractPriceValue(await checkoutPageInstance.itemTotal.innerText())) * 0.08).toFixed(2)
        await expect(checkoutPageInstance.taxAmount).toHaveText(`Tax: $${taxNumber}`)
    })

    test('Total calculation', async ({ page }) => {
        const mainPageInstance = new mainPage(page);
        const checkoutPageInstance = new checkoutPage(page);
        await addItemToCart(mainPageInstance, 0)
        await addItemToCart(mainPageInstance, 1)
        await checkoutPageInstance.goto();
        let calculatedTotal = ((extractPriceValue(await checkoutPageInstance.itemTotal.innerText())) * 1.08).toFixed(2)
        await expect(checkoutPageInstance.totalAmount).toHaveText(`Total: $${calculatedTotal}`)
    })
})
