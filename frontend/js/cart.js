async function loadCart() {
  const userEmail = localStorage.getItem("loggedInUser");

  if (!userEmail) {
    window.location.href = "login.html";

    return;
  }

  try {
    const response = await fetch(
      `https://blueberry-beauty-ecommerce.onrender.com/api/cart/${userEmail}`,
    );

    const cartItems = await response.json();

    const container = document.getElementById("cart-container");

    const totalElement = document.getElementById("cart-total");

    container.innerHTML = "";

    let total = 0;

    if (cartItems.length === 0) {
      container.innerHTML = `

      <div class="empty-cart">

        Your cart is empty

      </div>

      `;

      totalElement.innerText = 0;

      return;
    }

    cartItems.forEach((item) => {
      total += item.productPrice;

      const card = `

      <div class="cart-card">

        <img src="${item.productImage}">

        <div class="cart-info">

          <h3>${item.productTitle}</h3>

          <p class="price">

            ₹${item.productPrice}

          </p>

          <button
          class="remove-btn"

          onclick="removeItem(${item.id})">

            Remove Item

          </button>

        </div>

      </div>

      `;

      container.innerHTML += card;
    });

    totalElement.innerText = total;
  } catch (error) {
    console.log(error);
  }
}

async function removeItem(id) {
  try {
    await fetch(
      `https://blueberry-beauty-ecommerce.onrender.com/api/cart/remove/${id}`,

      {
        method: "DELETE",
      },
    );

    alert("Item Removed");

    loadCart();
  } catch (error) {
    console.log(error);
  }
}

document.getElementById("checkout-btn").addEventListener(
  "click",

  function () {
    window.location.href = "checkout.html";
  },
);

loadCart();
