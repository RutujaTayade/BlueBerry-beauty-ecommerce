async function loadOrders() {
  try {
    const response = await fetch(
      "https://blueberry-beauty-ecommerce.onrender.com/api/orders",
    );

    const orders = await response.json();

    const container = document.getElementById("orders-container");

    container.innerHTML = "";

    if (orders.length === 0) {
      container.innerHTML = "<h2>No Orders Found</h2>";

      return;
    }

    orders.forEach((order) => {
      const card = `

      <div class="order-card">

        <h3>${order.fullName}</h3>

        <p><strong>Email:</strong>
        ${order.email}</p>

        <p><strong>Phone:</strong>
        ${order.phone}</p>

        <p><strong>Address:</strong>
        ${order.address}</p>

        <p><strong>City:</strong>
        ${order.city}</p>

        <p><strong>Pincode:</strong>
        ${order.pincode}</p>

        <p><strong>Total:</strong>
        ₹${order.totalAmount}</p>

        <p><strong>Status:</strong>
        ${order.status}</p>

        <select
        class="status-select"

        onchange="updateStatus(
        ${order.id},
        this.value
        )">

          <option value="Pending"
          ${order.status === "Pending" ? "selected" : ""}>

            Pending

          </option>

          <option value="Shipped"
          ${order.status === "Shipped" ? "selected" : ""}>

            Shipped

          </option>

          <option value="Delivered"
          ${order.status === "Delivered" ? "selected" : ""}>

            Delivered

          </option>

          <option value="Cancelled"
          ${order.status === "Cancelled" ? "selected" : ""}>

            Cancelled

          </option>

        </select>

      </div>

      `;

      container.innerHTML += card;
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateStatus(id, status) {
  try {
    await fetch(
      `https://blueberry-beauty-ecommerce.onrender.com/api/orders/status/${id}`,

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status: status,
        }),
      },
    );

    alert("Order Status Updated");

    loadOrders();
  } catch (error) {
    console.log(error);
  }
}

loadOrders();
