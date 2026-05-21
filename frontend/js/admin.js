const form = document.getElementById("productForm");

form.addEventListener(
  "submit",

  async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;

    const price = document.getElementById("price").value;

    const image = document.getElementById("image").value;

    const category = document.getElementById("category").value;

    const brand = document.getElementById("brand").value;

    const rating = document.getElementById("rating").value;

    const description = document.getElementById("description").value;

    await fetch(
    "https://blueberry-beauty-ecommerce.onrender.com/api/products"
      

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title,
          price,
          image,
          category,
          brand,
          rating,
          description,
        }),
      },
    );

    alert("Product Added");

    form.reset();

    loadProducts();
  },
);

async function loadProducts() {
  const response = await fetch("http://localhost:8081/api/products");

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

        <p>₹${product.price}</p>

        <button
        class="delete-btn"

        onclick="deleteProduct(
        ${product.id}
        )">

          Delete Product

        </button>

      </div>

    </div>

    `;

    container.innerHTML += card;
  });
}

async function deleteProduct(id) {
  await fetch(
    `http://localhost:8081/api/products/${id}`,

    {
      method: "DELETE",
    },
  );

  alert("Product Deleted");

  loadProducts();
}

loadProducts();
