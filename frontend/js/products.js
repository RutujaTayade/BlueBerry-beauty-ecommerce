const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

async function loadProduct() {
  try {
    const response = await fetch(
      `http://localhost:8081/api/products/${productId}`,
    );

    const product = await response.json();

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

        await fetch(
          "http://localhost:8081/api/cart/add",

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

        alert("Added To Cart");
      },
    );
  } catch (error) {
    console.log(error);
  }
}

loadProduct();
