let editProductId = null;

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

          <div class="admin-buttons">

            <button
            class="edit-btn"

            onclick="editProduct(${product.id})">

              Edit

            </button>

            <button
            class="delete-btn"

            onclick="deleteProduct(${product.id})">

              Delete

            </button>

          </div>

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
        if (editProductId === null) {
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
        } else {
          await fetch(
            `https://blueberry-beauty-ecommerce.onrender.com/api/products/${editProductId}`,

            {
              method: "PUT",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify(product),
            },
          );

          alert("Product Updated");

          editProductId = null;

          document.querySelector("#product-form button").innerText =
            "Add Product";
        }

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

async function editProduct(id) {
  try {
    const response = await fetch(
      `https://blueberry-beauty-ecommerce.onrender.com/api/products/${id}`,
    );

    const product = await response.json();

    document.getElementById("title").value = product.title;

    document.getElementById("brand").value = product.brand;

    document.getElementById("category").value = product.category;

    document.getElementById("image").value = product.image;

    document.getElementById("price").value = product.price;

    document.getElementById("rating").value = product.rating;

    document.getElementById("description").value = product.description;

    editProductId = id;

    document.querySelector("#product-form button").innerText = "Update Product";

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  } catch (error) {
    console.log(error);
  }
}

loadProducts();
