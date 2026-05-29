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
                userEmail,

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

          alert("Added To Cart");
        } catch (error) {
          console.log(error);
        }
      },
    );

    loadReviews();

    setupReviewSubmission();
  } catch (error) {
    console.log(error);
  }
}

async function loadReviews() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reviews/${productId}`);

    const reviews = await response.json();

    const container = document.getElementById("reviews-container");

    if (!container) return;

    container.innerHTML = "";

    if (reviews.length === 0) {
      container.innerHTML = `<p>No reviews yet.</p>`;

      return;
    }

    reviews.forEach((review) => {
      container.innerHTML += `

        <div class="review-card">

          <h4>${review.userEmail}</h4>

          <p>
            ${"⭐".repeat(review.rating)}
          </p>

          <p>${review.comment}</p>

        </div>

      `;
    });
  } catch (error) {
    console.log(error);
  }
}

function setupReviewSubmission() {
  const submitBtn = document.getElementById("submitReview");

  if (!submitBtn) return;

  submitBtn.addEventListener(
    "click",

    async function () {
      const userEmail = localStorage.getItem("loggedInUser");

      if (!userEmail) {
        alert("Please Login First");

        return;
      }

      const rating = document.getElementById("rating").value;

      const comment = document.getElementById("reviewComment").value.trim();

      if (!comment) {
        alert("Please enter review");

        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/reviews`,

          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              productId: Number(productId),

              userEmail,

              rating: Number(rating),

              comment,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Review submit failed");
        }

        alert("Review Added");

        document.getElementById("reviewComment").value = "";

        loadReviews();
      } catch (error) {
        console.log(error);

        alert("Failed to submit review");
      }
    },
  );
}

window.onload = loadProduct;
