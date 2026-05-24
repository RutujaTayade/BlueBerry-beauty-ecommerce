const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

async function loadProduct() {
  try {
    const response = await fetch(
      `https://blueberry-beauty-ecommerce.onrender.com/api/products/${productId}`,
    );

    const product = await response.json();

    console.log(product);

    if (!product || !product.id) {
      document.body.innerHTML = "<h1>Product Not Found</h1>";

      return;
    }

    const image = document.getElementById("product-image");

    const title = document.getElementById("product-title");

    const brand = document.getElementById("product-brand");

    const rating = document.getElementById("product-rating");

    const price = document.getElementById("product-price");

    const description = document.getElementById("product-description");

    image.src = product.image;

    title.innerText = product.title;

    brand.innerText = "Brand: " + product.brand;

    rating.innerText = "⭐ " + product.rating;

    price.innerText = "₹" + product.price;

    description.innerText = product.description;

    document
      .getElementById("cart-btn")

      .addEventListener(
        "click",

        async function () {
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

                  productTitle: product.title,

                  productPrice: product.price,

                  productImage: product.image,
                }),
              },
            );

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
