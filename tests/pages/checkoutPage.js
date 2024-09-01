
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
        this.taxAmount = page.locator('[data-test="tax-label"]');
        this.totalAmount = this.page.locator('[data-test="total-label"]');
        this.inventoryItemPrice = this.page.locator('[data-test="inventory-item-price"]');

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

    async itemTotalNumber() {
        let itemTotalText = await this.itemTotal.innerText();
        let itemTotalNumber = parseInt(itemTotalText);
        console.log(itemTotalNumber);

    }

    async taxAmountNumber() {
        let taxText = await this.taxAmount.innerText()
        let taxNumber = parseInt(taxText);
        console.log(taxNumber);
    }



};