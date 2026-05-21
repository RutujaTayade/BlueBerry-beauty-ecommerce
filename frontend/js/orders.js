async function loadOrders() {
  try {
    const userEmail = localStorage.getItem("loggedInUser");

    if (!userEmail) {
      window.location.href = "login.html";

      return;
    }

    const response = await fetch(
      `http://localhost:8081/api/orders/${userEmail}`,
    );

    const orders = await response.json();

    console.log(orders);

    const container = document.getElementById("orders-container");

    container.innerHTML = "";

    if (orders.length === 0) {
      container.innerHTML = `

      <h2>
        No Orders Found
      </h2>

      `;

      return;
    }

    orders.forEach((order) => {
      const card = `

      <div class="order-card">

        <h3>

          ${order.fullName}

        </h3>

        <p>

          ${order.address}

        </p>

        <p>

          ${order.city}

        </p>

        <p>

          ${order.state}

        </p>

        <p>

          ${order.pincode}

        </p>

        <p class="total">

          ₹${order.totalAmount}

        </p>

      </div>

      `;

      container.innerHTML += card;
    });
  } catch (error) {
    console.log(error);
  }
}

loadOrders();
