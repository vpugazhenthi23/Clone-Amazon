import { cart, removeCart, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatMoney } from "./utils/currency.js";

let productsResult = "";

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (productId === product.id) {
            matchingProduct = product;
        }
    });

    productsResult += `
    
    <div class="cart-item-container 
        js-cart-item-${matchingProduct.id}
    ">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src=${matchingProduct.image}>

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formatMoney(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label label-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>     
                <span class="update-quantity-link link-primary js-update"
                data-update-id = "${matchingProduct.id}">
                Update
                </span>
                 <span>
                    <input class="quantity-input ip-quantity-${matchingProduct.id}" 
                     data-input-id = "${matchingProduct.id}">
                    <span class="save-quantity-link link-primary js-key" 
                        data-save-id="${matchingProduct.id}">
                     Save
                    </span>
                </span>
                <span class="delete-quantity-link link-primary js-delete"
                data-property-id = "${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
`;
});

document.querySelector(".js-order").innerHTML = productsResult;

document.querySelector(".js-link").innerHTML = `${cart.length} Items`;

document.querySelectorAll(".js-delete").forEach((link) => {
    const productId = link.dataset.propertyId;
    const cartItem = document.querySelector(`.js-cart-item-${productId}`);
    cartItem.addEventListener('keydown', (event) => {
        if (event.key === 'Delete') {
            link.click();
            console.log('Deleted');
        }
    })
    link.addEventListener("click", () => {
        removeCart(productId);
        cartItem.remove();

    });
});

document.querySelectorAll(".js-update").forEach((link) => {
    link.addEventListener("click", () => {
        const updateItem = link.dataset.updateId;
        document.querySelector(`.js-cart-item-${updateItem}`).classList.add("is-editing-quantity");
        const inputElement = document.querySelector(`.ip-quantity-${updateItem}`);
        inputElement.value = "";
    });
});

document.querySelectorAll(".save-quantity-link").forEach((item) => {
    const saveId = item.dataset.saveId;
    const inputElement = document.querySelector(`.ip-quantity-${saveId}`);

    inputElement.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            item.click();
        }

    })

    item.addEventListener("click", () => {
        const saveId = item.dataset.saveId;
        const changeId = document.querySelector(`.js-cart-item-${saveId}`)
        changeId.classList.remove("is-editing-quantity");

        const inputElement = document.querySelector(`.ip-quantity-${saveId}`);
        let newInput = Number(inputElement.value);

        if (newInput > 0 && newInput < 100) {
            const quantityLabel = document.querySelector(`.label-quantity-${saveId}`);
            quantityLabel.innerHTML = newInput;
        }

        else {
            alert(`You Reached the maximum quantuty of = ${newInput}`);
            newInput = 0;
            const quantityLabel = document.querySelector(`.label-quantity-${saveId}`);
            quantityLabel.innerHTML = newInput;
            updateQuantity(saveId, newInput);
        }
        updateQuantity(saveId, newInput);
    });
});

