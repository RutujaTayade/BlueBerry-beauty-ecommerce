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

      try {
        const response = await fetch(
          "https://blueberry-beauty-ecommerce.onrender.com/api/auth/register",

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
      } catch (error) {
        console.log(error);

        alert("Registration Failed");
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

      try {
        const response = await fetch(
          "https://blueberry-beauty-ecommerce.onrender.com/api/auth/login",

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

        const text = await response.text();

        console.log(text);

        if (text.includes("Login Successful")) {
          localStorage.setItem("loggedInUser", email);

          alert("Login Successful");

          window.location.href = "index.html";
        } else {
          alert(text);
        }
      } catch (error) {
        console.log(error);

        alert("Login Failed");
      }
    },
  );
}
