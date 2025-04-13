// Function to add items to the cart (localStorage)
function addToCart(item, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ item, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item} has been added to your cart!`);
}

// Function to load and display orders on the Order Tracking page
function displayOrders() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const ordersList = document.getElementById("orders-list");

    if (cart.length === 0) {
        ordersList.innerHTML = "<p>No orders yet. Start adding items to your cart.</p>";
    } else {
        cart.forEach(order => {
            const orderElement = document.createElement("div");
            orderElement.innerHTML = `<p>${order.item} - $${order.price}</p>`;
            ordersList.appendChild(orderElement);
        });
    }
}

// Display orders on Order Tracking page
if (window.location.pathname.includes("orderTracking.html")) {
    displayOrders();
}
