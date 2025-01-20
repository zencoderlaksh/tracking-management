// Save user information in localStorage and redirect to the dashboard
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    localStorage.setItem("user", JSON.stringify({ name, email }));
    alert("Signup successful!");
    window.location.href = "../dashboard/index.html";
  });
