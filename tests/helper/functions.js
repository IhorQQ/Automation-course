

export const addItemToCart = async (mainPageInstance, itemIndex) => {
    await mainPageInstance.addToCartElement.nth(itemIndex).click();
};

export const removeItemFromCart = async (mainPageInstance, itemIndex) => {
    await mainPageInstance.removeBtn.nth(itemIndex).click();
};


export const extractPriceValue = (priceText) => {
    return parseFloat(priceText.split('$')[1]);
};

export const checkoutItemPrice = async (checkoutPage, itemIndex) => {
    await checkoutPage.inventoryItemPrice.nth(itemIndex).innerText();
}
