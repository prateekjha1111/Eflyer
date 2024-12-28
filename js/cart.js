
const cartItemsContainer = document.getElementById('cart-items');

const cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartIcon = document.querySelector(".cart-value");

cartIcon.textContent = cart.length;
 

// Function to render cart items
function renderCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    const emptyRow = document.createElement('tr');
    emptyRow.innerHTML = `<td colspan="6" class="text-center">Your cart is empty.</td>`;
    cartItemsContainer.appendChild(emptyRow);

    updateTotal();
    return;
  }

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="cart-product-name">${item.name}</td>
      <td>
        <img src="${item.image}" class="img-thumbnail cart-product-image" height="100px" width="100px">
      </td>
      <td>
        <div class="d-flex align-items-center justify-content-center">
          <span class="quantity cart-product-quantity">${item.quantity}</span>
        </div>
      </td>
      <td class="cart-product-price">$${item.price}</td>
      <td class="total-price">$${(item.quantity * item.price).toFixed(2)}</td>
      <td>
        <button class="btn btn-dark btn-sm remove" data-index="${index}">Remove</button>
      </td>
    `;
    cartItemsContainer.appendChild(row);
  });

  //event listeners to all remove buttons
  const removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index; 
      cart.splice(index, 1); 
      localStorage.setItem('cart', JSON.stringify(cart)); 
      renderCart(); 
      cartIcon.textContent = cart.length;
    });
  });

  updateTotal();
}



// to calculate and update the total price
function updateTotal() {
  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

renderCart();
