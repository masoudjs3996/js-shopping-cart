let searchForm = document.querySelector(".search-form");
let shoppingCartTag = document.querySelector(".box");
let email = document.querySelector("#login-email");
let password = document.querySelector("#login-password");
let sendBtn = document.querySelector("#sendBtn");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};
let shoppingCart = document.querySelector(".shopping-cart");

document.querySelector("#cart-btn").onclick = () => {
  shoppingCart.classList.toggle("active");
  searchForm.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};
let loginForm = document.querySelector(".login-form");

document.querySelector("#login-btn").onclick = () => {
  loginForm.classList.toggle("active");
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  navbar.classList.remove("active");
};
let navbar = document.querySelector(".navbar");

document.querySelector("#menu-btn").onclick = () => {
  navbar.classList.toggle("active");
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
};
window.onscroll = () => {
  searchForm.classList.remove("active");
  shoppingCart.classList.remove("active");
  loginForm.classList.remove("active");
  navbar.classList.remove("active");
};

var swiper = new Swiper(".product-slider", {
  loop: true,
  spaceBetween: 20,
  outoplay: {
    delay: 7500,
    disablieOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});
var swiper = new Swiper(".review-slider", {
  loop: true,
  spaceBetween: 20,
  outoplay: {
    delay: 7500,
    disablieOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1020: {
      slidesPerView: 3,
    },
  },
});

// this is for shoppingCart

const products = document.querySelector("#product-list");

eventListener();
function eventListener() {
  products.addEventListener("click", buyproduct);
  shoppingCartTag.addEventListener("click", removeProductFromCart);
  document.addEventListener("DOMContentLoaded", showProductsUnLoad);
  email.addEventListener("blur", validateField);
  password.addEventListener("blur", validateField);
}
function buyproduct(e) {
  e.preventDefault();
  if (e.target.classList.contains("addToCart")) {
    const targetProduct = e.target.parentElement;
    getProductInfo(targetProduct);
  }
}

function getProductInfo(targetProduct) {
  const productInfo = {
    image: targetProduct.querySelector("img").src,
    titel: targetProduct.querySelector("h3").textContent,
    price: targetProduct.querySelectorAll("div")[0].innerText,
    id: targetProduct.querySelector("a").getAttribute("data-id"),
  };
  addToCart(productInfo);
}

function addToCart(productInfo) {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
  <i class="fas fa-trash remove" data-id="${productInfo.id}"></i>
    <img src="${productInfo.image}"/>
    <div class="content">
      <span class="titelSoppingProduct">${productInfo.titel}</span>
      <span>${productInfo.price}</span>
    </div>
  `;

  shoppingCartTag.appendChild(div);
  saveItemInLocalStorag(productInfo);
}
function removeProductFromCart(e) {
  let product, productID;
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.remove();
    product = e.target.parentElement;
    productID = product.querySelector(".remove").getAttribute("data-id");
  }
  removefromlocalstorage(productID);
}
function removefromlocalstorage(ID) {
  let productLs = getFromLocalstorag();
  productLs.forEach((product, index) => {
    if (product.id === ID) {
      productLs.splice(index, 1);
    }
  });

  localStorage.setItem("products", JSON.stringify(productLs));
}
function saveItemInLocalStorag(productInfo) {
  let product = getFromLocalstorag();
  product.push(productInfo);
  localStorage.setItem("products", JSON.stringify(product));
}
function getFromLocalstorag() {
  let product;
  if (localStorage.getItem("products")) {
    product = JSON.parse(localStorage.getItem("products"));
  } else {
    product = [];
  }
  return product;
}

function showProductsUnLoad() {
  let productLs = getFromLocalstorag();
  productLs.forEach((productInfo) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
    <i class="fas fa-trash remove" data-id="${productInfo.id}"></i>
      <img src="${productInfo.image}"/>
      <div class="content">
        <span class="titelSoppingProduct">${productInfo.titel}</span>
        <span>${productInfo.price}</span>
      </div>
    `;
    shoppingCartTag.appendChild(div);
  });
}

// valiadiating email

function validateField() {
  validateLength(this);
  if (this.type === "email") {
    validateEmail(this);
  }
  let error = document.querySelectorAll(".error");

  if (email.value !== "" && password.value !== "") {
    if (error.length === 0) {
      sendBtn.disabled = false;
    }
    sendBtn.classList.add("sendbtntrue");
  }
}

function validateLength(field) {
  if (field.value.length > 0) {
    field.classList.add("sucsses");
    field.classList.remove("error");
  } else {
    field.classList.add("error");
    field.classList.add("sucsses");
  }
}
function validateEmail(email) {
  if (email.value.includes("@gmail.com")) {
    email.classList.add("sucsses");
    email.classList.remove("error");
  } else {
    email.classList.add("error");
    email.classList.add("sucsses");
  }
}
