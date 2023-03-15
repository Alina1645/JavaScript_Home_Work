"use strict";


//  * В корзине сохраняется количество каждого добавленного товара, где ключ - это идентификатор продукта, а значение - объект товара в корзине. Объект содержит id, название товара, цену и количество штук, например:

//  * {
//  *   "04a57766-c599-4366-8dc4-89ff1ccd3b14": {
//  *     id: "04a57766-c599-4366-8dc4-89ff1ccd3b14",
//  *     name: "ELLERY X M'O CAPSULE",
//  *     price: $52.00,
//  *     count: 2,
//  *   },
//  *   ...
//  * }

const basket = {};

//  * Формат объекта для продуктов, доступных на нашем сайте:

//  * {
//  *   04a57766-c599-4366-8dc4-89ff1ccd3b14: {
//  *     {
//  *        id: '04a57766-c599-4366-8dc4-89ff1ccd3b14',
//  *        name: 'ELLERY X M'O CAPSULE',
//  *        description: "Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.",
//  *        price: $52.00,
//  *        img: 'images/featured/1.jpg'
//  *     },
//  *     ...
//  *   }
//  * }

const products = getProductsObject();


// Идентифицируем элементы для работы с корзиной на странице

// Главный элемент корзины.
const basketEl = document.querySelector(".basket");

// Обертка для списка товаров в корзине.
const basketListEl = document.querySelector(".basketList");

// Количество товаров в корзине отображается в красном кружке рядом с иконкой корзины.
const basketCounterEl = document.querySelector(".cartIconWrap span");

// Общая сумма товаров в корзине.
const basketTotalValueEl = document.querySelector(".basketTotalValue");




//  Обработчик клика на значок корзины для открытия корзины.

document.querySelector(".cartIconWrap").addEventListener("click", () => {
  basketEl.classList.toggle("hidden");
});

// Обработчик клика на кнопку "Добавить в корзину" с делегированием события на общего родителя.

// Событие вешается на общего предка для всех кнопок.

document.querySelector(".featuredItems").addEventListener("click", (event) => {

  //Получаем кнопку "Add to cart" с помощью метода .closest, чтобы обработать клик на иконке корзины.
  const addToCartEl = event.target.closest(".addToCart");

  // Проверяем, был ли клик на кнопке с селектором ".addToCart" и существует ли такой селектор среди родительских элементов. Если нет, то ничего не делаем и выходим из функции.
  if (!addToCartEl) {
    return;
  }

  // Получаем id продукта из атрибута data-id у кнопки, на которую кликнули, и передаем его для добавления в корзину.
  addToBasket(addToCartEl.dataset.id);

  // Обновляем корзину.
  renderBasketContent();
});


// Обработчик клика на кнопке удаления товара.

basketEl.addEventListener("click", (event) => {

  // Проверяем, был ли клик на кнопке удаления товара. Если нет, то ничего не делаем и выходим из функции.
  if (!event.target.classList.contains("productRemove")) {
    return;
  }

  // Получаем id удаляемого товара и удаляем его из корзины.
  removeFromBasket(event.target.closest(".basketRow").dataset.id);

  // Обновляем корзину.
  renderBasketContent();
});


//  * Функция добавляет продукт в корзину.
//  * @param {string} id - id продукта.

function addToBasket(id) {

  // Если продукт еще не был добавлен в наш объект, который хранит все добавленные товары, то создаем новый объект.
  if (!(id in basket)) {

    //Копируем данные из продукта и добавляем количество в новый объект, который будет храниться в корзине.
    basket[id] = {
      id: id,
      name: products[id].name,
      price: products[id].price,
      count: 0,
    };
  }

  // Увеличиваем количество продукта на 1.
  basket[id].count++;
}


// * Функция удаляет продукт из корзины по id.
// * @param {string} id - id продукта.

function removeFromBasket(id) {

  // Если товара с данным id меньше или равно 1, то удаляем его из объекта, иначе вычитаем из счетчика количество товара.
  if (basket[id].count <= 1) {
    delete basket[id];
  } else {
    basket[id].count--;
  }
}


// Функция отрисовывает весь контент корзины.

function renderBasketContent() {

  // Отображаем все товары в корзине.

  //Для каждого товара создаем разметку и соединяем их в одну длинную строку, которая содержит разметки каждого товара, и добавляем эту строку в корзину.
  basketListEl.innerHTML = Object.values(basket).reduce(
    (acc, product) => acc + getBasketProductMarkup(product),
    ""
  );

  // Обновляем количество добавленных товаров рядом с иконкой корзины.
  basketCounterEl.textContent = getTotalBasketCount().toString();

  // Обновляем общую стоимость товаров в корзине.
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
}


// * Функция считает и возвращает количество продуктов в корзине.
// * @return {number} - Количество продуктов в корзине.

function getTotalBasketCount() {
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}


// * Функция вычисляет и возвращает общую стоимость всех добавленных в корзину продуктов.
// * @return {number} - Общая стоимость всех добавленных в корзину продуктов.

function getTotalBasketPrice() {
  return Object.values(basket).reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );
}


//  * Функция возвращает разметку для отдельного товара, который находится в корзине.
//  * @param {object} product - товар из корзины.

function getBasketProductMarkup(product) {
  return `
    <div class="basketRow" data-id="${product.id}">
      <div>${product.name}</div>
      <div>
        <span class="productCount">${product.count}</span> шт.
      </div>
      <div>${product.price} $ </div>
      <div>
        <span class="productTotalRow">
          ${(product.price * product.count).toFixed(2)} 
        </span>
      </div>
      <div><button class="productRemove">-</button></div>
    </div>
  `;
}


