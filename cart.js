console.log("object");
const titleCart = document.getElementById("title");
const cartContainer = document.getElementById("cart-container");
const cartProductWrapper = document.getElementById("cart-product-wrapper");
const receipeProducts = document.getElementById("receipe-products");
const receipePrices = document.getElementById("receipe-prices");
const totalPrice = document.getElementById("total-price");
const cartCount = document.getElementById("cartCount");

let totalReceipe = 0;
let cartItems = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

displayProducts();

function displayProducts() {
  totalReceipe = 0;
  cartCount.innerText = cartItems.length;
  if (cartItems.length === 0) {
    titleCart.style.display = "block";
    titleCart.innerText = "سلة المشتريات فارغة";
    cartContainer.style.display = "none";
  } else {
    cartProductWrapper.innerHTML = "";
    receipeProducts.innerHTML = "";
    receipePrices.innerHTML = "";
    titleCart.style.display = "none";
    cartContainer.style.display = "flex";

    cartItems.forEach((item) => {
      const itemEl = createCartElement(item);
      const receipeInfo = createReceipeElement(item);
      const receipePrice = createReceipePrice(item);
      cartProductWrapper.appendChild(itemEl);
      receipeProducts.appendChild(receipeInfo);
      receipePrices.appendChild(receipePrice);
    });
    totalPrice.innerText = parseInt(totalReceipe);
  }
}
function createCartElement(item) {
  const itemEl = document.createElement("div");
  itemEl.className = "mb-6 border-b-1 border-white pb-6";
  itemEl.innerHTML = `<div class="flex items-center gap-5">
                  <img
                    class="h-[140px] rounded-md mb-4"
                    src="${item.url}"
                    alt="${item.name}"
                  />
                  <div>
                    <h2 class="text-2xl font-bold mb-3">${item.name}</h2>
                    <p class="mb-6">
                    ${item.description ? item.description : ""}
                    </p>
                    <span class="bg-[#2ecf5c] px-4 py-2 rounded-full"
                      >${item.price} ج.م</span
                    >
                  </div>
                </div>
  
                <div class="flex items-center gap-4 sm:gap-8 mt-4">
                  <button
                    class="block border-1 border-transparent px-2 text-[12px] sm:text-[14px] sm:px-6 py-2.5 rounded-full cursor-pointer mt-4 text-white bg-red-600 hover:bg-red-800 transition-all duration-200" onclick="removeFromCart(${
                      item.id
                    })"
                  >
                    احذف من العربة
                  </button>
                  <div class="flex items-center border-1 border-p1 mt-4">
                    <button
                      class="px-5 cursor-pointer text-xl font-bold py-2 hover:bg-p1 hover:text-white bg-white text-p1"  onclick="controlQuantity(${
                        item.id
                      },'-')"
                    >
                      -
                    </button>
                    <p id="quantity-${
                      item.id
                    }" class="px-8 text-xl font-bold bg-p3 py-2 w-20 mx-auto text-center">${
    item.count
  }</p>
                    <button onclick="controlQuantity(${item.id},'+')"
                      class="px-5 cursor-pointer text-xl font-bold py-2 hover:bg-p1 hover:text-white bg-white text-p1"
                    >
                      +
                    </button>
                  </div>
                </div>
    `;
  return itemEl;
}

function removeFromCart(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  displayProducts();
}

function createReceipeElement(item) {
  const receipeInfo = document.createElement("li");
  receipeInfo.innerHTML = `${item.count} ${item.name} (${item.price} ج.م) `;
  return receipeInfo;
}
function createReceipePrice(item) {
  const receipePrice = document.createElement("span");
  receipePrice.innerHTML = `${item.count * item.price} ج.م`;
  totalReceipe += item.count * item.price;
  return receipePrice;
}
function controlQuantity(id, op) {
  cartItems.map((item) => {
    if (item.id === id) {
      if (op === "+") item.count += 1;
      else {
        item.count -= 1;
        if (item.count == 0) removeFromCart(id);
      }
    }
  });
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  displayProducts();
}


