let cartItems = [];

// Function to update the number in the header
function updateCartCount() {
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Function to show the modal and its contents
function updateCartModal() {
    const cartItemsDisplay = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');

    cartItemsDisplay.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsDisplay.innerHTML = '<div class="cart-item">Your cart is empty.</div>';
        cartTotalDisplay.innerHTML = '';
    } else {
        cartItems.forEach(item => {
            cartItemsDisplay.innerHTML += `<div class="cart-item">${item.name} (x${item.quantity}) - NT$ ${item.price * item.quantity}</div>`;
        });
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalDisplay.innerHTML = `<strong>Total: NT$ ${total}</strong>`;
    }
}

// Global Click Listener for all buttons
document.addEventListener('click', (event) => {
    // ADD TO CART
    if (event.target.classList.contains('add-to-cart')) {
        const productElement = event.target.parentElement;
        const productName = productElement.dataset.name;
        const productPrice = parseInt(productElement.dataset.price, 10);

        const existingItem = cartItems.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: 1 });
        }
        updateCartCount();
    }

    // OPEN MODAL
    if (event.target.closest('#cart')) {
        updateCartModal();
        document.getElementById('cart-modal').style.display = "block";
    }

    // CLOSE MODAL
    if (event.target.matches('.close') || event.target.matches('#cart-modal')) {
        document.getElementById('cart-modal').style.display = "none";
    }

    // CLEAR CART
    if (event.target.id === 'clear-cart') {
        cartItems = []; // Wipe the array
        updateCartCount(); // Update the top right number
        updateCartModal(); // Update the list inside the popup
    }
});
