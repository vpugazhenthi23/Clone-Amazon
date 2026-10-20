let ProductsHTML = "";
products.forEach((prod) => {
    ProductsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src=${prod.image}>
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${prod.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${prod.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                    ${prod.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${(prod.priceCents / 100).toFixed(2)}
                </div>

                <div class="product-quantity-container ">
                    <select class = "js-quantity-selector-${prod.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-${prod.id}">
                    <img src= "images/icons/greentick.webp">
                    Added
                </div>

                <button class="add-to-cart-button button-primary js-cart"
                data-property-id = "${prod.id}" data-property-name ="${prod.name}">
                    Add to Cart
                </button>
                </div>

    `;
});

document.querySelector(".js-grid").innerHTML = ProductsHTML;

let timerStorage = {};

document.querySelectorAll(".js-cart").forEach((cartbtn) => {
    cartbtn.addEventListener("click", () => {
        const productName = cartbtn.dataset.propertyName;
        const productId = cartbtn.dataset.propertyId;
        const quantNum = document.querySelector(
            `.js-quantity-selector-${productId}`,
        );
        const extractValue = document.querySelector(`.js-added-${productId}`);
        extractValue.classList.add("css-added");

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

        cart.forEach((item) => {
            if (productId === item.id) {
                matchItem = item;
            }
        });
        if (matchItem) {
            matchItem.quantity += quantValue;
        } else {
            cart.push({
                id: productId,
                name: productName,
                quantity: quantValue,
            });
        }

        let cartQuantity = 0;

        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });
        document.querySelector(".add-cart").innerHTML = cartQuantity;
        console.log(cart);
    });
});
