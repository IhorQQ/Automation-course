const { expect } = require('@playwright/test');


exports.mainPage = class mainPage {

    constructor(page) {
        this.page = page;
        this.cartBtn = page.locator('[data-test="shopping-cart-link"]');


        // SOCIALS
        this.twitterBtn = this.page.locator('[data-test="social-twitter"]');
        this.linkedinBtn = this.page.locator('[data-test="social-linkedin"]');
        this.facebookBtn = this.page.locator('[data-test="social-facebook"]');


        this.priceElement = page.locator('[data-test="inventory-item-price"]');
        this.addToCartElement = page.getByRole('button', { name: 'Add to cart' });

        // SIDE MENU
        // this.menuBtn = page.getByRole('button', { name: 'Open Menu' });
        this.menuBtn = page.locator('#react-burger-menu-btn');
        this.logoutBtn = page.locator('[data-test="logout-sidebar-link"]');

        // CART
        this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]')


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

    async twitterLinkCheck() {
        await expect(twitterBtn).toHaveAttribute('href', 'https://twitter.com/saucelabs');

    }

    async facebookLinkCheck() {
        await expect(facebookBtn).toHaveAttribute('href', 'https://facebook.com/saucelabs');
    }

    async linkedinLinkCheck() {
        await expect(linkedinBtn).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');
    }

    async logoutClick() {
        await this.logoutBtn.click();
    }



};
