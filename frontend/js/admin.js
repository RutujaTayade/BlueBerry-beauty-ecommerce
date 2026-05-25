async function loadProducts() {
  try {
    const response = await fetch(
      "https://blueberry-beauty-ecommerce.onrender.com/api/products",
    );

    const products = await response.json();

    const container = document.getElementById("admin-products");

    container.innerHTML = "";

    products.forEach((product) => {
      const card = `

      <div class="admin-card">

        <img src="${product.image}">

        <div class="admin-info">

          <h3>${product.title}</h3>

          <p>${product.category}</p>

          <h4>₹${product.price}</h4>

          <button
          class="delete-btn"

          onclick="deleteProduct(${product.id})">

            Delete Product

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

document
  .getElementById("product-form")

  .addEventListener(
    "submit",

    async function (e) {
      e.preventDefault();

      const product = {
        title: document.getElementById("title").value,

        brand: document.getElementById("brand").value,

        category: document.getElementById("category").value,

        image: document.getElementById("image").value,

        price: parseFloat(document.getElementById("price").value),

        rating: parseFloat(document.getElementById("rating").value),

        description: document.getElementById("description").value,
      };

      try {
        await fetch(
          "https://blueberry-beauty-ecommerce.onrender.com/api/products",

          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(product),
          },
        );

        alert("Product Added");

        document.getElementById("product-form").reset();

        loadProducts();
      } catch (error) {
        console.log(error);
      }
    },
  );

async function deleteProduct(id) {
  try {
    await fetch(
      `https://blueberry-beauty-ecommerce.onrender.com/api/products/${id}`,

      {
        method: "DELETE",
      },
    );

    alert("Product Deleted");

    loadProducts();
  } catch (error) {
    console.log(error);
  }
}

loadProducts();
