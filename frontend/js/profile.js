const API_BASE_URL = "https://blueberry-beauty-ecommerce.onrender.com";

const userEmail = localStorage.getItem("loggedInUser");

if (!userEmail) {
  window.location.href = "login.html";
}

document.getElementById("user-email").innerText = userEmail;

async function loadProfileData() {
  try {
    const cartResponse = await fetch(`${API_BASE_URL}/api/cart/${userEmail}`);

    const cartItems = await cartResponse.json();

    document.getElementById("cart-count").innerText = cartItems.length;

    const wishlistResponse = await fetch(
      `${API_BASE_URL}/api/wishlist/${userEmail}`,
    );

    const wishlistItems = await wishlistResponse.json();

    document.getElementById("wishlist-count").innerText = wishlistItems.length;
  } catch (error) {
    console.log(error);
  }
}

function logoutUser() {
  localStorage.removeItem("loggedInUser");

  window.location.href = "login.html";
}

loadProfileData();
