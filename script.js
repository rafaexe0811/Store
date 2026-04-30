let cartItems = [];

// 1. Update the Cart Number in Header
function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) countElement.textContent = totalItems;
}

// 2. Show the Modal with Items
function showCart() {
    const itemsContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    const modal = document.getElementById('cart-modal');
    
    if (!itemsContainer || !totalContainer || !modal) return;

    itemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        itemsContainer.innerHTML = '<p style="text-align:center; padding: 20px;">Your cart is empty.</p>';
        totalContainer.innerHTML = '';
    } else {
        cartItems.forEach(item => {
            itemsContainer.innerHTML += `
                <div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <span>${item.name} x${item.quantity}</span>
                    <span>NT$ ${item.price * item.quantity}</span>
                </div>`;
        });
        const grandTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalContainer.innerHTML = `<div style="text-align:right; margin-top:15px;"><strong>Total: NT$ ${grandTotal}</strong></div>`;
    }
    
    modal.style.display = 'block';
}

// 3. The Master Click Listener
document.addEventListener('click', function(e) {
    // --- ADD TO CART ---
    if (e.target.classList.contains('add-to-cart')) {
        const parent = e.target.closest('.product');
        const name = parent.getAttribute('data-name');
        const price = parseInt(parent.getAttribute('data-price'));

        const existing = cartItems.find(i => i.name === name);
        if (existing) {
            existing.quantity++;
        } else {
            cartItems.push({ name, price, quantity: 1 });
        }
        updateCartCount();
        console.log("Added to cart:", name);
    }

    // --- OPEN CART ---
    if (e.target.closest('#cart')) {
        showCart();
    }

    // --- CLOSE CART (X button or clicking outside) ---
    if (e.target.classList.contains('close') || e.target.id === 'cart-modal') {
        document.getElementById('cart-modal').style.display = 'none';
    }

    // --- CLEAR CART (The fix is here) ---
    if (e.target.id === 'clear-cart-btn') {
        console.log("Clear button clicked!"); // This helps us debug
        cartItems = []; // Wipe the data
        updateCartCount(); // Reset header
        showCart(); // Refresh the list to show "Empty"
    }
});
