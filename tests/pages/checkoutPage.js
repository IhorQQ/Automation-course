
// CHECKOUT PAGE
exports.checkoutPage = class checkoutPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.itemTotal = page.locator('[data-test="subtotal-label"]'); // Adjust selector as needed
        this.finishBtn = page.locator('[data-test="finish"]');
        this.cancelBtn = page.locator('[data-test="cancel"]');

    }


    async goto() {
        await this.page.goto('https://www.saucedemo.com/checkout-step-two.html');
    }

    async cancelClick() {
        await this.cancelBtn.click()
    }
    async finishClick() {
        await this.finishBtn.click();
    }

};
