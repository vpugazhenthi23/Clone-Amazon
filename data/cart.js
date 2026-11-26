export let cart = JSON.parse(localStorage.getItem('cart1'));

if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }];
}

function cartStore() {
    localStorage.setItem('cart1', JSON.stringify(cart));
    localStorage.setItem('quantity', JSON.stringify(getCartQuantity()));

}
function getCartQuantity() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}
export function addToCart(productId, productName, quantNum, extractValue) {
    let timerStorage = {};
    const previousTimerId = timerStorage[productId];
    if (previousTimerId) {
        clearTimeout(previousTimerId);
    }

    const timeId = setTimeout(() => {
        extractValue.classList.remove("css-added");
    }, 2000);

    timerStorage[productId] = timeId;

    const quantValue = Number(quantNum.value);

    let matchItem;

    cart.forEach((item1) => {
        if (productId === item1.productId) {
            matchItem = item1;
        }
    });
    if (matchItem) {
        matchItem.quantity += quantValue;
    } else {
        cart.push({
            productId: productId,
            name: productName,
            quantity: quantValue,
        });
    }
    cartStore()
}
export function removeCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    })
    cart = newCart;
    cartStore();
    document.querySelector('.js-link').innerHTML = `${cart.length} Items`;
    if (cart.length === 1) {
        document.querySelector('.js-link').innerHTML = `${cart.length} Item`;
    }
}
export function updateCartQuantity() {
   /*  let cartQuantity = 0;
    cart.forEach((item2) => {
        cartQuantity += item2.quantity;
    }) */
    const cartQuantity = getCartQuantity();
    localStorage.setItem('quantity', JSON.stringify(cartQuantity));
    document.querySelector(".add-cart").textContent = cartQuantity;
}
export function updateQuantity(saveId, newInput) {
    cart.forEach((item) => {
        if (item.productId === saveId) {
            item.quantity = newInput;
        }
    })
    cartStore();
}
