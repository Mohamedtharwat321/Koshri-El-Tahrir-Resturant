const cartCount = document.getElementById("cartCount");

let cartItems = localStorage.getItem("productsInCart")
  ? JSON.parse(localStorage.getItem("productsInCart"))
  : [];

cartCount.innerText = cartItems.length;
