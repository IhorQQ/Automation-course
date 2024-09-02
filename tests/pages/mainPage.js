const { expect } = require('@playwright/test');


exports.mainPage = class MainPage {

    constructor(page) {
        this.page = page;
        this.cartBtn = page.locator('[data-test="shopping-cart-link"]');


        // SOCIALS
        this.twitterBtn = this.page.locator('[data-test="social-twitter"]');
        this.linkedinBtn = this.page.locator('[data-test="social-linkedin"]');
        this.facebookBtn = this.page.locator('[data-test="social-facebook"]');


        this.priceElement = page.locator('[data-test="inventory-item-price"]');
        this.addToCartElement = this.page.getByRole('button', { name: 'Add to cart' });
        this.removeBtn = page.getByRole('button', { name: 'Remove' });

        // SIDE MENU
        // this.menuBtn = page.getByRole('button', { name: 'Open Menu' });
        this.menuBtn = page.locator('#react-burger-menu-btn');
        this.logoutBtn = page.locator('[data-test="logout-sidebar-link"]');

        // CART
        this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]')


    }


    async goto() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    async menuClick() {
        await this.menuBtn.click();
    }

    async cartClick() {
        await this.cartBtn.click();
    }

    async twitterLinkCheck() {
        await expect(this.twitterBtn).toHaveAttribute('href', 'https://twitter.com/saucelabs');

    }

    async facebookLinkCheck() {
        await expect(this.facebookBtn).toHaveAttribute('href', 'https://www.facebook.com/saucelabs');
    }

    async linkedinLinkCheck() {
        await expect(this.linkedinBtn).toHaveAttribute('href', 'https://www.linkedin.com/company/sauce-labs/');
    }

    async logoutClick() {
        await this.logoutBtn.click();
    }



};
