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

    console.log(cartItems);

    const container = document.getElementById("cart-container");

    const totalElement = document.getElementById("cart-total");

    container.innerHTML = "";

    let total = 0;

    if (!cartItems || cartItems.length === 0) {
      container.innerHTML = `

      <div class="empty-cart">

        Your cart is empty

      </div>

      `;

      totalElement.innerText = 0;

      return;
    }

    cartItems.forEach((item) => {
      const quantity = item.quantity || 1;

      const subtotal = item.productPrice * quantity;

      total += subtotal;

      const card = `

      <div class="cart-card">

        <img src="${item.productImage}">

        <div class="cart-info">

          <h3>${item.productTitle}</h3>

          <p class="price">

            ₹${item.productPrice}

          </p>

          <div class="quantity-box">

            <button
            onclick="decreaseQuantity(${item.id})">

              -

            </button>

            <span>

              ${quantity}

            </span>

            <button
            onclick="increaseQuantity(${item.id})">

              +

            </button>

          </div>

          <h4>

            Subtotal:
            ₹${subtotal}

          </h4>

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

    loadCart();
  } catch (error) {
    console.log(error);
  }
}

async function increaseQuantity(id) {
  try {
    await fetch(
      `https://blueberry-beauty-ecommerce.onrender.com/api/cart/increase/${id}`,

      {
        method: "PUT",
      },
    );

    loadCart();
  } catch (error) {
    console.log(error);
  }
}

async function decreaseQuantity(id) {
  try {
    await fetch(
      `https://blueberry-beauty-ecommerce.onrender.com/api/cart/decrease/${id}`,

      {
        method: "PUT",
      },
    );

    loadCart();
  } catch (error) {
    console.log(error);
  }
}

document
  .getElementById("checkout-btn")

  .addEventListener(
    "click",

    function () {
      window.location.href = "checkout.html";
    },
  );

loadCart();
