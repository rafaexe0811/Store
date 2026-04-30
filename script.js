// Wait for the HTML to load before running code
document.addEventListener('DOMContentLoaded', function() {
    let cart = [];

    // 1. Function to Refresh the UI
    function refreshCartUI() {
        // Update Header Count
        const count = cart.reduce((total, item) => total + item.qty, 0);
        document.getElementById('cart-count').innerText = count;

        // Update Modal Items
        const listDiv = document.getElementById('cart-items-container');
        const totalDiv = document.getElementById('cart-total-container');
        
        listDiv.innerHTML = '';
        if (cart.length === 0) {
            listDiv.innerHTML = '<p>Your cart is empty.</p>';
            totalDiv.innerHTML = '';
        } else {
            let grandTotal = 0;
            cart.forEach(item => {
                const lineTotal = item.price * item.qty;
                grandTotal += lineTotal;
                listDiv.innerHTML += `
                    <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                        <span>${item.name} (x${item.qty})</span>
                        <span>NT$ ${lineTotal}</span>
                    </div>`;
            });
            totalDiv.innerHTML = `<hr><strong>Total: NT$ ${grandTotal}</strong>`;
        }
    }

    // 2. Click Event Listeners
    document.addEventListener('click', function(e) {
        
        // Add to Cart Button
        if (e.target.classList.contains('add-to-cart')) {
            const card = e.target.closest('.product');
            const name = card.getAttribute('data-name');
            const price = parseInt(card.getAttribute('data-price'));

            const found = cart.find(i => i.name === name);
            if (found) {
                found.qty++;
            } else {
                cart.push({ name: name, price: price, qty: 1 });
            }
            refreshCartUI();
        }

        // Open Modal
        if (e.target.closest('#cart-btn')) {
            document.getElementById('cart-modal').style.display = 'block';
            refreshCartUI();
        }

        // Close Modal (X button or background)
        if (e.target.classList.contains('close-btn') || e.target.id === 'cart-modal') {
            document.getElementById('cart-modal').style.display = 'none';
        }

        // Clear Cart Button Action
        if (e.target.id === 'clear-cart-action') {
            cart = []; // Empty the list
            refreshCartUI(); // Update the display
        }
    });
});
