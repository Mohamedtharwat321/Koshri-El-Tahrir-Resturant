const products = [
  {
    name: "تحرير",
    description:
      "علبة تحرير تحتوى على كل مكونات الكشرى ( الارز - المكرونة - العدس - الحمص ) ومعاها شطة ودقة",
    url: "images/koshri1.jpeg",
    type: "koshri",
    price: 32,
    id: 1,
  },
  {
    name: "توب تحرير",
    description:
      "علبة توب تحرير تحتوى على كل مكونات الكشرى ( الارز - المكرونة - العدس - الحمص ) ومعاها شطة ودقة",
    url: "images/koshri2.jpeg",
    type: "koshri",
    price: 42,
    id: 2,
  },
  {
    name: "لارج تحرير",
    description:
      "علبة لارج تحرير تحتوى على كل مكونات الكشرى ( الارز - المكرونة - العدس - الحمص ) ومعاها شطة ودقة",
    url: "images/koshri3.jpeg",
    type: "koshri",
    price: 50,
    id: 3,
  },
  {
    name: "كينج تحرير",
    description:
      "علبة تحرير تحتوى على كل مكونات الكشرى ( الارز - المكرونة - العدس - الحمص ) ومعاها شطة ودقة",
    url: "images/koshri4.jpeg",
    type: "koshri",
    price: 65,
    id: 4,
  },
  {
    name: "طبق عائلي تكفي 5 أفراد",
    description:
      "طبق عائلى تحتوى على كل مكونات الكشرى الارز، المكرونة، العدس ، الحمص ومعاها شطة ودقة .",
    url: "images/koshri6.webp",
    type: "koshri family",
    price: 225,
    id: 5,
  },
  {
    name: "طبق ميجا تكفي 3 أفراد",
    description:
      "طبق عائلى تحتوى على كل مكونات الكشرى الارز، المكرونة، العدس ، الحمص ومعاها شطة ودقة .",
    url: "images/koshri6.webp",
    type: "koshri family",
    price: 140,
    id: 6,
  },
  {
    name: "باكيت تقلية",
    url: "images/basl.jpeg",
    type: "extra",
    price: 12,
    id: 7,
  },
  {
    name: "باكيت دقة",
    url: "images/daka.jpeg",
    type: "extra",
    price: 2,
    id: 8,
  },
  {
    name: "باكيت شطة",
    url: "images/shata.jpeg",
    type: "extra",
    price: 2,
    id: 9,
  },
  {
    name: "باكيت حمص",
    url: "images/homs.jpeg",
    type: "extra",
    price: 7,
    id: 10,
  },
  {
    name: "باكيت دقة",
    url: "images/daka.jpeg",
    type: "extra",
    price: 2,
    id: 11,
  },
  {
    name: "ميرندا تفاح",
    url: "images/mirnadtofha.jpeg",
    type: "drinks",
    price: 20,
    id: 12,
  },
  {
    name: "ميرندا برتقال",
    url: "images/mirndaorange.jpeg",
    type: "drinks",
    price: 20,
    id: 13,
  },
  {
    name: "سفن اب دايت",
    url: "images/7diet.jpeg",
    type: "drinks",
    price: 20,
    id: 14,
  },
  {
    name: "مهلبية",
    url: "images/rozlabn.webp",
    type: "dessert",
    price: 25,
    id: 15,
  },
  {
    name: "ارز باللبن",
    url: "images/rozlabn.webp",
    type: "dessert",
    price: 25,
    id: 16,
  },
];

const productsWrapper = document.getElementById("products-wrapper");
const cartCount = document.getElementById("cartCount");
const menuSections = document.getElementById("menu-sections");
const searchInput = document.getElementById("search-input");

let cartItems = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];
const productsEls = [];
let cartItemCount = cartItems.length;
cartCount.innerText = cartItemCount;

//loop to show products
products.forEach((product) => {
  const productEl = createProductElement(product);
  productsEls.push(productEl);
  productsWrapper.appendChild(productEl);
});

//create product
function createProductElement(product) {
  const productEl = document.createElement("div");
  productEl.className = "bg-p1 text-center py-8 px-4 rounded-md";
  const isInCart = cartItems.find((item) => item.id === product.id);

  productEl.innerHTML = `<div class="flex justify-center mb-4">
              <img
                class="h-[180px] rounded-md"
                src="${product.url}"
                alt="${product.name}"
              />
            </div>
            <h2 class="text-2xl font-bold mb-3">${product.name}</h2>
            <p class="mb-6">
            ${product.description ? product.description : ""}
            </p>
            <span class="bg-[#2ecf5c] px-4 py-2 rounded-full">${
              product.price
            } ج.م</span>
           <button
              class="block border-1 border-transparent  px-10 py-2.5 rounded-full cursor-pointer mx-auto mt-4 hover:bg-p1 hover:text-white hover:border-white transition-all duration-200 ${
                isInCart ? "added bg-red-600 text-white" : "bg-white text-p1"
              }"
              onclick="addToCart(event, ${product.id})"
            >
              ${isInCart ? "احذف من العربة" : "اضف الي العربة"}
            </button>`;

  return productEl;
}

//add to cart using local storage
function addToCart(event, id) {
  const selectedItem = products.find((item) => item.id === id);
  const btnElement = event.target;
  let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];

  if (btnElement.classList.contains("added")) {
    btnElement.classList.remove("added");
    btnElement.classList.remove("bg-red-600");
    btnElement.classList.remove("text-white");
    btnElement.classList.add("bg-white");
    btnElement.classList.add("text-p1");
    btnElement.innerText = "اضف الي العربة";
    cartItems = cartItems.filter((item) => item.id !== selectedItem.id);
    cartItemCount--;
  } else {
    btnElement.classList.add("added");
    btnElement.classList.remove("bg-white");
    btnElement.classList.remove("text-p1");
    btnElement.classList.add("bg-red-600");
    btnElement.classList.add("bg-red-text-white");
    btnElement.innerText = "احذف من العربة";
    cartItems = [...cartItems, { ...selectedItem, count: 1 }];
    cartItemCount++;
  }
  cartCount.innerText = cartItemCount;
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

//filter products + search
menuSections.addEventListener("click", filterProducts);
searchInput.addEventListener("input", filterProducts);

function filterProducts() {
  if (event.target.tagName == "LI") {
    event.target.classList.toggle("active");
  }
  const searchWord = searchInput.value.trim();
  const selectedCategories = Array.from(
    document.querySelectorAll(".active")
  ).map((chk) => chk.id);

  productsEls.forEach((productEl, index) => {
    const product = products[index];

    const matchSearch = product.name.includes(searchWord);
    const isInSelectedCategories =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.type);
    if (isInSelectedCategories && matchSearch) {
      productEl.classList.remove("hidden");
    } else {
      productEl.classList.add("hidden");
    }
  });
}
