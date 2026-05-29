// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener(
    "submit",

    async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();

      const email = document.getElementById("email").value.trim();

      const phone = document.getElementById("phone").value.trim();

      const password = document.getElementById("password").value;

      const confirmPassword = document.getElementById("confirmPassword").value;

      /* REQUIRED FIELD CHECK */

      if (!name || !email || !phone || !password || !confirmPassword) {
        alert("All fields are required");

        return;
      }

      /* EMAIL VALIDATION */

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        alert("Enter valid email");

        return;
      }

      /* PHONE VALIDATION */

      if (phone.length !== 10) {
        alert("Phone number must be 10 digits");

        return;
      }

      /* STRONG PASSWORD */

      const strongPassword = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

      if (!strongPassword.test(password)) {
        alert(
          "Password must contain uppercase letter, number and minimum 8 characters",
        );

        return;
      }

      /* CONFIRM PASSWORD */

      if (password !== confirmPassword) {
        alert("Passwords do not match");

        return;
      }

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

        const data = await response.json();

        console.log(data);

        if (data.message === "Login Successful") {
          localStorage.setItem("token", data.token);

          localStorage.setItem("loggedInUser", data.email);

          alert("Login Successful");

          window.location.href = "index.html";
        } else {
          alert("Invalid Credentials");
        }
      } catch (error) {
        console.log(error);

        alert("Login Failed");
      }
    },
  );
}
