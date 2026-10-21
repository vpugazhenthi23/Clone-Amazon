export const cart = [];

export function addToCart (productId,productName,quantNum,extractValue){
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
            if (productId === item1.id) {
                matchItem = item1;
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
}