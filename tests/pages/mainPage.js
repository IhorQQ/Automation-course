const { expect } = require('@playwright/test');


exports.mainPage = class mainPage {

    constructor(page) {
        this.page = page;
        this.cartBtn = page.locator('[data-test="shopping-cart-link"]');
        this.twitterBtn = page.locator('[data-test="social-twitter"]');
        this.linkedinBtn = page.locator('[data-test="social-linkedin"]');
        this.facebookBtn = page.locator('[data-test="social-facebook"]');


        this.priceElement = page.locator('[data-test="inventory-item-price"]');

        // SIDE MENU
        // this.menuBtn = page.getByRole('button', { name: 'Open Menu' });
        this.menuBtn = page.locator('#react-burger-menu-btn');
        this.logoutBtn = page.locator('[data-test="logout-sidebar-link"]');

        // CART
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]')


    }


    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async menuClick() {
        await this.menuBtn.click();
    }

    async cartClick() {
        await this.cartBtn.click();
    }

    async twitterLink() {
        await expect(page.locator('[data-test="social-twitter"]')).toHaveAttribute('href', 'https://x.com/saucelabs');

    }

    async facebookClick() {
        await this.facebookBtn.click();
    }

    async likeClick() {
        await this.linkedinBtn.click();
    }

    async logoutClick() {
        await this.logoutBtn.click();
    }



};
