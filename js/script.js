
const card = document.querySelectorAll(".product-card");
const cart = [];
const cartIcon = document.querySelector(".cart-value");

card.forEach((card) => {
  const productName = card.querySelector(".product-name").textContent;
  const productImage = card.querySelector("img").src;
  const productPrice = parseFloat(card.querySelector(".product-price").textContent.replace('$', ''));
  const availableQuantity = card.querySelector(".available-items");
  const quantityInput = card.querySelector("input[type='number']");
  const addToCartButton = card.querySelector(".add-to-cart");
  const incrementButton = card.querySelector(".increment");
  const decrementButton = card.querySelector(".decrement");
  let remainingQuantity = parseInt(availableQuantity.innerHTML);

  // Increment button click
  incrementButton.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity < remainingQuantity) {
      quantity += 1;
      quantityInput.value = quantity;
    } else {
      alert("Not enough stock available!");
    }
  });

  // Decrement button click
  decrementButton.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
      quantity -= 1;
      quantityInput.value = quantity;
    }
  });

  // Cart button click
  addToCartButton.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);

    if (quantity < 1 || quantity > remainingQuantity) {
      alert(`Please enter a valid quantity (1-${remainingQuantity}).`);
      return;
    }

    // Check if the product already exists in the cart
    const existingCartItemIndex = cart.findIndex((item) => item.name === productName);

    if (existingCartItemIndex > -1) {
      // Update quantity and total for the existing item
      cart[existingCartItemIndex].quantity += quantity;
      cart[existingCartItemIndex].total = (cart[existingCartItemIndex].quantity * cart[existingCartItemIndex].price).toFixed(2);
    } else {
      // Add new item to the cart
      const cartItem = {
        name: productName,
        price: productPrice,
        quantity,
        total: (productPrice * quantity).toFixed(2),
        image: productImage,
      };

      cart.push(cartItem);
    }

    // Update remaining quantity
    remainingQuantity -= quantity;
    availableQuantity.innerHTML = remainingQuantity;

    // Update cart count in the UI
    cartIcon.textContent = cart.length;

    localStorage.setItem("cart", JSON.stringify(cart));
    // Reset quantity input
    quantityInput.value = 1;
  });
});

function updateCart () {
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];

  cartIcon.textContent = cartData.length;
  console.log(cartData.length);
}

updateCart();




