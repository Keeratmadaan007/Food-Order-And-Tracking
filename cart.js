// Enhanced cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(item, price) {
    const existingItem = cart.find(i => i.item === item);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    updateStorage();
    updateCartUI();
    alert(`${item} added to cart!`);
}

function removeFromCart(item) {
    cart = cart.filter(i => i.item !== item);
    updateStorage();
    updateCartUI();
}

function updateStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI() {
    // Update cart count in navigation
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = count > 0 ? `(${count})` : '';
    });

    // Update order tracking page if open
    if (document.getElementById('orders-list')) {
        renderOrders();
    }
}

function renderOrders() {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    if (cart.length === 0) {
        ordersList.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <p>${item.item} - $${item.price} × ${item.quantity}</p>
            <button onclick="removeFromCart('${item.item}')">Remove</button>
        `;
        ordersList.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    const totalElement = document.createElement('div');
    totalElement.className = 'order-total';
    totalElement.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    ordersList.appendChild(totalElement);
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add cart count to navigation
    const orderLinks = document.querySelectorAll('a[href="orderTracking.html"]');
    orderLinks.forEach(link => {
        if (!link.querySelector('.cart-count')) {
            const countSpan = document.createElement('span');
            countSpan.className = 'cart-count';
            link.appendChild(countSpan);
        }
    });

    // Render orders if on tracking page
    if (document.getElementById('orders-list')) {
        renderOrders();
    }

    // Update initial cart count
    updateCartUI();
});
