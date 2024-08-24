
// LOGIN PAGE + CREDENTIALS
exports.loginPage = class loginPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]'); // Adjust selector as needed
        this.passwordInput = page.locator('[data-test="password"]'); // Adjust selector as needed
        this.loginButton = page.locator('[data-test="login-button"]'); // Adjust selector as needed

    }


    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loginFill(username) {
        await this.usernameInput.fill(username);
    }
    async passwordFill(password) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton () {
        await this.loginButton.click();
    }

    async starnardUserLogin (username, password) {
        await this.goto()
        await this.loginFill(username);
        await this.passwordFill(password);
        await this.clickLoginButton()
    }


};

export const USERS_CREDS = {
    standard_user: 'standard_user',
    locked_out_user: 'locked_out_user',
    problem_user: 'problem_user',
    performance_glitch_user: 'performance_glitch_user',
    error_user: 'error_user',
    visual_user: 'visual_user',
    password: 'secret_sauce',
    wrong_password: 'wrong_password',
}
