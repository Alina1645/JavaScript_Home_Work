"use strict";

// Находим место для вставки товаров.

const featuredItemsEl = document.querySelector(".featuredItems");

// Собираем все данные из массива, преобразуя их в HTML-разметку товаров, и объединяем все разметки в одну строку.

featuredItemsEl.innerHTML = getProductsList()
    .map((product) => renderProduct(product))
    .join("");


// * Создаем функцию для генерации HTML-кода товара.

// * @param {object} data - Каждый товар представлен объектом, содержащим информацию о товаре.

// * @returns Создаем разметку для каждого товара.

function renderProduct(data) {
    return `
    <div class="featuredItem">
        <div class="featuredImgWrap">
            <img src="${data.img}" alt="${data.name}">
            <div class="featuredImgDark">
                <button class="addToCart" data-id="${data.id}">
                    <img src="images/cart.svg" alt="">
                    Add to Cart
                </button>
            </div>
        </div>
        <div class="featuredData">
            <div class="featuredName">
                ${data.name}
            </div>
            <div class="featuredText">
                ${data.description}
            </div>
            <div class="featuredPrice">
                ${data.price} $
            </div>
        </div>
    </div>
  `;
}
