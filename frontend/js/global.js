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



// function showToast(message) {

//   const toast =
//   document.getElementById("toast");

//   toast.innerText = message;

//   toast.style.opacity = "1";

//   toast.style.transform =
//   "translateX(0)";

//   setTimeout(() => {

//     toast.style.opacity = "0";

//     toast.style.transform =
//     "translateX(120px)";

//   }, 2500);
// }