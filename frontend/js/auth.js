// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener(
    "submit",

    async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;

      const email = document.getElementById("email").value;

      const password = document.getElementById("password").value;

      const response = await fetch(
        "http://localhost:8081/api/auth/register",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      );

      const data = await response.text();

      alert(data);

      if (data === "Registration Successful") {
        window.location.href = "login.html";
      }
    },
  );
}

// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener(
    "submit",

    async function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;

      const password = document.getElementById("loginPassword").value;

      const response = await fetch(
        "http://localhost:8081/api/auth/login",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.text();

      alert(data);

      if (data === "Login Successful") {
        localStorage.setItem("loggedInUser", email);

        window.location.href = "index.html";
      }
    },
  );
}
