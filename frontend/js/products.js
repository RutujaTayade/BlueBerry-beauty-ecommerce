const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

const API_BASE_URL = "https://blueberry-beauty-ecommerce.onrender.com";

async function loadProduct() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);

    const product = await response.json();

    console.log(product);

    if (!product || !product.id) {
      document.body.innerHTML = "<h1>Product Not Found</h1>";

      return;
    }

    document.getElementById("product-image").src = product.image;

    document.getElementById("product-title").innerText = product.title;

    document.getElementById("product-brand").innerText =
      "Brand: " + product.brand;

    document.getElementById("product-rating").innerText =
      "⭐ " + product.rating;

    document.getElementById("product-price").innerText = "₹" + product.price;

    document.getElementById("product-description").innerText =
      product.description;

    document.getElementById("cart-btn").addEventListener(
      "click",

      async function () {
        const userEmail = localStorage.getItem("loggedInUser");

        if (!userEmail) {
          alert("Please Login First");

          return;
        }

        try {
          const cartResponse = await fetch(
            `${API_BASE_URL}/api/cart/add`,

            {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                userEmail: userEmail,

                productTitle: product.title,

                productPrice: product.price,

                productImage: product.image,
              }),
            },
          );

          if (!cartResponse.ok) {
            throw new Error(
              `Cart add failed with status ${cartResponse.status}`,
            );
          }

          const data = await cartResponse.json();

          console.log(data);

          alert("Added To Cart");
        } catch (error) {
          console.log(error);
        }
      },
    );
  } catch (error) {
    console.log(error);
  }
}

window.onload = loadProduct;
