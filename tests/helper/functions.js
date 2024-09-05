

export const addItemToCart = async (mainPageInstance, itemIndex) => {
    await mainPageInstance.addToCartElement.nth(itemIndex).click();
};

export const removeItemFromCart = async (mainPageInstance, itemIndex) => {
    await mainPageInstance.removeBtn.nth(itemIndex).click();
};


export const extractPriceValue = (priceText) => {
    return Number(priceText.match(/\d+(\.\d+)?/g))
};

export const checkoutItemPrice = async (checkoutPage, itemIndex) => {
    await checkoutPage.inventoryItemPrice.nth(itemIndex).innerText();
}
