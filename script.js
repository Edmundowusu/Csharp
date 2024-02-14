const toggle = document.getElementById("toggleDark");
const body = document.querySelector("body");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const links = document.querySelectorAll(".nav__links li a");
const icons = document.querySelectorAll(".nav__links li i, .navfooter_links i");
const skills = document.querySelectorAll(".skills__icons");

toggle.addEventListener("click", function () {
  this.classList.toggle("fa-moon");
  if (body.classList.toggle("light-mode")) {
    header.style.background = "#ecf0f1";
    header.style.color = "#24252a";
    footer.style.background = "#ecf0f1";
    footer.style.color = "#24252a";
    links.forEach((link) => {
      link.style.color = "#24252a";
    });
    icons.forEach((icon) => {
      icon.style.color = "#24252a";
    });
    skills.forEach((skill) => {
      skill.childNodes.forEach((child) => {
        if (child.nodeType === 1) {
          child.style.color = "#24252a";
        }
      });
    });
  } else {
    header.style.background = "#24252a";
    header.style.color = "#ecf0f1";
    footer.style.background = "#24252a";
    footer.style.color = "#ecf0f1";
    links.forEach((link) => {
      link.style.color = "#ecf0f1";
    });
    icons.forEach((icon) => {
      icon.style.color = "#ecf0f1";
    });
    skills.forEach((skill) => {
      skill.childNodes.forEach((child) => {
        if (child.nodeType === 1) {
          child.style.color = "#ecf0f1";
        }
      });
    });
  }
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}
// if (document.readyState == "loading") {
//   document.addEventListener("DOMContentLoaded", ready);
// } else {
//   ready();
// }

function purchaseClicked() {
  var price = document.getElementsByClassName("cart-total-price");
  var items = document.getElementsByClassName("cart-item-title");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  alert(
    "Your total price today is " + price[0].innerText + "\n" + " Thank you!"
  );
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addItemToCart(title, price, imageSrc);

  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button" >REMOVE</button>
        </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
