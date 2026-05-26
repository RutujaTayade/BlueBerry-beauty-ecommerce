const API_BASE_URL = "https://blueberry-beauty-ecommerce.onrender.com";

async function loadWishlist() {
  const userEmail = localStorage.getItem("loggedInUser");

  if (!userEmail) {
    window.location.href = "login.html";

    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/wishlist/${userEmail}`);

    const items = await response.json();

    const container = document.getElementById("wishlist-container");

    container.innerHTML = "";

    if (items.length === 0) {
      container.innerHTML = "<h2>Your Wishlist is Empty</h2>";

      return;
    }

    items.forEach((item) => {
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

          onclick="removeWishlist(${item.id})">

            Remove

          </button>

        </div>

      </div>

      `;

      container.innerHTML += card;
    });
  } catch (error) {
    console.log(error);
  }
}

async function removeWishlist(id) {
  try {
    await fetch(
      `${API_BASE_URL}/api/wishlist/remove/${id}`,

      {
        method: "DELETE",
      },
    );

    loadWishlist();
  } catch (error) {
    console.log(error);
  }
}

loadWishlist();
