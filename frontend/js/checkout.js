async function loadCartTotal() {
  const userEmail = localStorage.getItem("loggedInUser");

  if (!userEmail) {
    window.location.href = "login.html";

    return;
  }

  try {
    const response = await fetch(
      `https://blueberry-beauty-ecommerce.onrender.com/api/cart/${userEmail}`,
    );

    const cartItems = await response.json();

    let total = 0;

    cartItems.forEach((item) => {
      total += item.productPrice;
    });

    document.getElementById("totalAmount").value = total;
  } catch (error) {
    console.log(error);
  }
}

loadCartTotal();

const form = document.getElementById("checkoutForm");

form.addEventListener(
  "submit",

  async function (e) {
    e.preventDefault();

    try {
      const userEmail = localStorage.getItem("loggedInUser");

      const fullName = document.getElementById("fullName").value;

      const address = document.getElementById("address").value;

      const city = document.getElementById("city").value;

      const state = document.getElementById("state").value;

      const pincode = document.getElementById("pincode").value;

      const totalAmount = document.getElementById("totalAmount").value;

      const response = await fetch(
        "http://localhost:8081/api/orders",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userEmail,
            fullName,
            address,
            city,
            state,
            pincode,
            totalAmount,
          }),
        },
      );

      if (response.ok) {
        alert("Order Placed Successfully");

        window.location.href = "success.html";
      } else {
        alert("Order Failed");
      }
    } catch (error) {
      console.log(error);

      alert("Something Went Wrong");
    }
  },
);
