let allProducts = [];

async function loadProducts() {
  try {
    const response = await fetch(
      "https://blueberry-beauty-ecommerce.onrender.com/api/products",
    );

    const products = await response.json();

    console.log(products);

    allProducts = products;

    displayProducts(products);
  } catch (error) {
    console.log(error);
  }
}

function displayProducts(products) {
  const container = document.getElementById("products-container");

  container.innerHTML = "";

  products.forEach((product) => {
    const card = `

    <div class="product-card">

      <div
      class="wishlist-icon"

      onclick="event.stopPropagation();
      addToWishlist(
      '${product.title}',
      ${product.price},
      '${product.image}'
      )">

        <i class="fa-solid fa-heart"></i>

      </div>

      <img
      src="${product.image}"
      class="product-image"

      onclick="openProduct(${product.id})"
      >

      <div
      class="product-info"

      onclick="openProduct(${product.id})">

        <h3>${product.title}</h3>

        <p>${product.category}</p>

        <p class="price">
          ₹${product.price}
        </p>

        <div class="buttons">

          <button

          onclick="event.stopPropagation();

          addToCart(
          '${product.title}',
          ${product.price},
          '${product.image}'
          )">

            Add To Cart

          </button>

          <button
          class="quick-btn"

          onclick="event.stopPropagation();

          openProduct(${product.id})">

            Quick View

          </button>

        </div>

      </div>

    </div>

    `;

    container.innerHTML += card;
  });
}

function filterProducts(category) {
  if (category === "All") {
    displayProducts(allProducts);

    return;
  }

  const filtered = allProducts.filter((product) => {
    return (
      product.category &&
      product.category.toLowerCase() === category.toLowerCase()
    );
  });

  displayProducts(filtered);
}

document.getElementById("searchInput").addEventListener(
  "keyup",

  function () {
    const searchValue = this.value.toLowerCase();

    const filtered = allProducts.filter((product) => {
      return product.title && product.title.toLowerCase().includes(searchValue);
    });

    displayProducts(filtered);
  },
);

async function addToCart(title, price, image) {
  const userEmail = localStorage.getItem("loggedInUser");

  if (!userEmail) {
    alert("Please Login First");

    window.location.href = "login.html";

    return;
  }

  try {
    await fetch(
      "https://blueberry-beauty-ecommerce.onrender.com/api/cart/add",

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userEmail: userEmail,

          productTitle: title,

          productPrice: price,

          productImage: image,
        }),
      },
    );

    alert("Added To Cart");
  } catch (error) {
    console.log(error);
  }
}

async function addToWishlist(title, price, image) {
  const userEmail = localStorage.getItem("loggedInUser");

  if (!userEmail) {
    alert("Please Login First");

    return;
  }

  try {
    await fetch(
      "https://blueberry-beauty-ecommerce.onrender.com/api/wishlist/add",

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userEmail: userEmail,

          productTitle: title,

          productPrice: price,

          productImage: image,
        }),
      },
    );

    alert("Added To Wishlist");
  } catch (error) {
    console.log(error);
  }
}

function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

loadProducts();

document
  .getElementById("sortSelect")

  .addEventListener(
    "change",

    function () {
      const value = this.value;

      let sortedProducts = [...allProducts];

      if (value === "low") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (value === "high") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (value === "rating") {
        sortedProducts.sort((a, b) => b.rating - a.rating);
      }

      displayProducts(sortedProducts);
    },
  );
