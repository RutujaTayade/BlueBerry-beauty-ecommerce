function logout() {
  localStorage.removeItem("loggedInUser");

  alert("Logged Out");

  window.location.href = "login.html";
}

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");

if (menuToggle) {
  menuToggle.addEventListener(
    "click",

    function () {
      navLinks.classList.toggle("active");
    },
  );
}
