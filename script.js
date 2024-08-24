// script.js

// Function to fetch and display menu items
async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayMenu(data);
    } catch (error) {
        console.error('Error fetching menu:', error);
        alert('Failed to load menu. Please try again later.');
    }
}

// Function to display menu items in the UI
function displayMenu(menuItems) {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = ''; // Clear any existing items

    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}">
            <p>${item.name}</p>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-item="${item.name}">+</button>
        `;
        menuGrid.appendChild(menuItem);
    });

    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // For this example, we'll directly start the order process when a user adds an item
            // In a real application, you'd manage a cart system
            handleOrderProcess();
        });
    });
}

// Function to simulate taking an order
function TakeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // For simplicity, we'll simulate an order with 3 random items from the menu
            // In a real application, you'd capture user-selected items
            const burgers = ["Burger Classic", "Cheese Burger", "Veggie Burger", "Chicken Burger", "Double Burger", "Bacon Burger"];
            const order = {
                items: [
                    burgers[Math.floor(Math.random() * burgers.length)],
                    burgers[Math.floor(Math.random() * burgers.length)],
                    burgers[Math.floor(Math.random() * burgers.length)]
                ]
            };
            resolve(order);
        }, 2500); // 2.5 seconds delay
    });
}

// Function to simulate order preparation
function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500); // 1.5 seconds delay
    });
}

// Function to simulate payment processing
function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000); // 1 second delay
    });
}

// Function to display thank you message
function thankyouFnc() {
    alert("Thank you for eating with us today!");
}

// Function to handle the entire order process
async function handleOrderProcess() {
    try {
        // Switch to Order Processing Screen
        switchScreen('order-screen');

        // Update order status messages
        const orderMessage = document.getElementById('order-message');
        orderMessage.textContent = 'Taking your order...';

        // Step 1: Take Order
        const order = await TakeOrder();
        console.log('Order:', order);
        orderMessage.textContent = 'Order taken. Preparing your food...';

        // Step 2: Prepare Order
        const prepStatus = await orderPrep();
        console.log('Order Preparation:', prepStatus);
        if (prepStatus.order_status) {
            orderMessage.textContent = 'Order is being prepared...';
        }

        // Step 3: Pay for Order
        const paymentStatus = await payOrder();
        console.log('Payment Status:', paymentStatus);
        if (paymentStatus.order_status) {
            if (!paymentStatus.paid) {
                orderMessage.textContent = 'Payment pending...';
            } else {
                orderMessage.textContent = 'Payment received. Completing your order...';
            }
        }

        // Step 4: Thank You
        if (paymentStatus.paid) {
            thankyouFnc();
            // Switch back to Menu Screen after thanking
            switchScreen('menu-screen');
        }
    } catch (error) {
        console.error('Error during order process:', error);
        alert('An error occurred during the order process. Please try again.');
        // Switch back to Menu Screen in case of error
        switchScreen('menu-screen');
    }
}

// Function to switch between screens
function switchScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.add('active');
            screen.classList.remove('hidden');
        } else {
            screen.classList.remove('active');
            screen.classList.add('hidden');
        }
    });
}

// Initialize the application
window.onload = function () {
    getMenu();
};
