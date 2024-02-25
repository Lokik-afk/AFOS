document.addEventListener('DOMContentLoaded', function() {
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartPopup = document.getElementById('cart-popup');
    const cartContent = document.getElementById('cart-content');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const decrementButtons = document.querySelectorAll('.decrement-btn');
    const incrementButtons = document.querySelectorAll('.increment-btn');
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    const allergensInput = document.getElementById('allergens-input');
    const addAllergenButton = document.getElementById('add-allergen-btn');
    const menuBtn = document.getElementById('menu-btn');
    const menuSection = document.getElementById('menu-section');
    const orderTotal = document.getElementById('order-total');

    let allergens = [];
    let total = 0;

    menuBtn.addEventListener('click', function(event) {
        event.preventDefault();
        menuSection.scrollIntoView({ behavior: 'smooth' });
    });

    openCartBtn.addEventListener('click', function() {
        cartPopup.style.display = 'block';
    });

    closeCartBtn.addEventListener('click', function() {
        cartPopup.style.display = 'none';
    });

    clearCartBtn.addEventListener('click', function() {
        // Clear the cart content by removing all items
        cartContent.innerHTML = '';

        total = 0;
        orderTotal.textContent = `$${total.toFixed(2)}`;
        // Optionally, you can also close the cart popup after clearing the cart
        cartPopup.style.display = 'none';
    });

    addAllergenButton.addEventListener('click', function() {
        alert('Allergen added successfully!');
    });

    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Retrieve quantity
            const quantity = parseInt(button.parentNode.querySelector('.quantity').textContent);

            // Retrieve item details
            const itemName = button.dataset.name;
            const itemCalories = button.dataset.calories;
            const itemProtein = button.dataset.protein;
            const itemPrice = parseFloat(button.dataset.price);
            const itemTotal = itemPrice * quantity;

            // Add item to cart with quantity
            const li = document.createElement('li');
            li.textContent = `${itemName} - Quantity: ${quantity}, Calories: ${itemCalories}, Protein: ${itemProtein}g`;
            
            // Check for allergens
            if (allergens.length > 0) {
                li.textContent += `, Allergens: ${allergens.join(', ')}`;
            }
            total += itemTotal;
            orderTotal.textContent = `₹${total.toFixed(2)}`;
            cartContent.appendChild(li);
        });
    });

    // Increment quantity
    incrementButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const quantitySpan = button.parentNode.querySelector('.quantity');
            const quantity = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = quantity + 1;
        });
    });

    // Decrement quantity
    decrementButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const quantitySpan = button.parentNode.querySelector('.quantity');
            const quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantitySpan.textContent = quantity - 1;
            }
        });
    });

    // Update allergens when input changes
    allergensInput.addEventListener('change', function() {
        allergens = allergensInput.value.split(',').map(allergen => allergen.trim());
    });
});

const placeOrderBtn = document.querySelector('.place-order-btn');
placeOrderBtn.addEventListener('click', function() {
    const cartContent = document.getElementById('cart-content').innerHTML;
    if (cartContent.trim() === '') {
        alert('Your cart is empty. Please add items before placing an order.');
        return; // Prevent further execution
    }

    fetch('/place-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain' // Set the content type to plain text
        },
        body: cartContent // Send the cart content as a string
    })


    .then(response => {
        if (response.ok) {
            //alert('Order placed successfully!');
            clearCart();
            window.location.href = 'thanks.html';
        } else {
            throw new Error('Failed to place order');
        }
    })

    .catch(error => {
        console.error('Error placing order:', error);
        alert('Failed to place order');
    });
});

    function clearCart() {
        const cartContent = document.getElementById('cart-content');
        cartContent.innerHTML = '';
        updateOrderTotal(0);
    }

    function updateOrderTotal(total) {
        const orderTotal = document.getElementById('order-total');
        orderTotal.textContent = '$' + total.toFixed(2);
    }

const allergensSubstitutes = {
    "soya": ["chickpeas", "lentils", "beans"],
    "milk": ["almond milk", "coconut milk", "soy milk"],
    "wheat": ["quinoa", "oats", "rice flour"],
    "eggs": ["applesauce", "banana", "flaxseed meal"],
    "peanuts": ["almonds", "cashews", "sunflower seeds"],
    "tree nuts": ["pumpkin seeds", "sesame seeds", "chia seeds"],
    "fish": ["tofu", "tempeh", "beans"],
    "shellfish": ["lentils", "beans", "tofu"],
    "soy": ["chickpeas", "lentils", "beans"],
    "milk": ["almond milk", "coconut milk", "soy milk"],
    "mustard": ["horseradish", "wasabi", "turmeric"],
    "sesame seeds": ["chia seeds", "poppy seeds", "flaxseeds"],
    "celery": ["fennel", "cucumber", "carrots"],
    "lupin": ["black beans", "kidney beans", "green peas"],
    "sulfites": ["lemon juice", "vinegar", "apple cider"],
    "corn": ["quinoa", "amaranth", "millet"],
    "gluten": ["rice", "quinoa", "amaranth"],
    "mollusks": ["tofu", "tempeh", "seitan"],
    "red meat": ["chicken", "turkey", "fish"],
    "pork": ["chicken", "turkey", "tofu"],
    "beef": ["chicken", "turkey", "tofu"],
    "chicken": ["tofu", "seitan", "beans"],
    "turkey": ["tofu", "seitan", "beans"],
    "soybean oil": ["coconut oil", "olive oil", "avocado oil"],
    "sunflower oil": ["coconut oil", "olive oil", "avocado oil"],
    "canola oil": ["coconut oil", "olive oil", "avocado oil"],
    "sesame oil": ["coconut oil", "olive oil", "avocado oil"],
    "peanut oil": ["coconut oil", "olive oil", "avocado oil"],
    "palm oil": ["coconut oil", "olive oil", "avocado oil"],
    "coconut oil": ["olive oil", "avocado oil", "ghee"],
    "olive oil": ["coconut oil", "avocado oil", "ghee"],
    "avocado oil": ["coconut oil", "olive oil", "ghee"]
    // Add more allergens and substitutes as needed
};

// Function to update the dropdown list based on user input
function updateSubstituteDropdown(input) {
    const dropdown = document.getElementById("substitute-dropdown");
    dropdown.innerHTML = ""; // Clear previous dropdown items

    const inputValue = input.value.toLowerCase();

    // If input matches any allergen, show its substitutes
    if (inputValue && allergensSubstitutes[inputValue]) {
        allergensSubstitutes[inputValue].forEach(substitute => {
            const option = document.createElement("div");
            option.textContent = substitute;
            option.classList.add("substitute-option");
            dropdown.appendChild(option);
        });
    }
}

// Event listener for input field to trigger dropdown update
document.getElementById("allergens-input").addEventListener("input", function() {
    updateSubstituteDropdown(this);
});

// Event listener for substitute options to populate input field
document.addEventListener("click", function(e) {
    if (e.target.classList.contains("substitute-option")) {
        document.getElementById("allergens-input").value = e.target.textContent;
        document.getElementById("substitute-dropdown").innerHTML = ""; // Clear dropdown
    }
});

function updateSubstituteDropdown(input) {
    const dropdown = document.getElementById("substitute-dropdown");
    dropdown.innerHTML = ""; // Clear previous dropdown items

    const inputValue = input.value.toLowerCase();

    // If input matches any allergen, show its substitutes
    if (inputValue && allergensSubstitutes[inputValue]) {
        allergensSubstitutes[inputValue].forEach(substitute => {
            const option = document.createElement("div");
            option.textContent = substitute;
            option.classList.add("substitute-option");
            dropdown.appendChild(option);
        });
        dropdown.style.display = "block"; // Show the dropdown if there are substitutes
    } else {
        dropdown.style.display = "none"; // Hide the dropdown if there are no substitutes
    }
}

// Event listener for input field to trigger dropdown update
document.getElementById("allergens-input").addEventListener("input", function() {
    updateSubstituteDropdown(this);
});

document.addEventListener("click", function(e) {
    if (!e.target.matches('.substitute-dropdown') && !e.target.matches('.allergens-content')) {
        document.getElementById("substitute-dropdown").style.display = "none";
    }
});
