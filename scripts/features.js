// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const isDarkMode = body.classList.toggle("dark-mode"); // Toggle dark-mode class

  // Update button text
  themeToggle.textContent = isDarkMode
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";

  // Save preference in local storage
  localStorage.setItem("darkMode", isDarkMode);
}

// Function to apply saved theme on page load
function applySavedTheme() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggle").textContent = "Switch to Light Mode";
  }
}

// Call applySavedTheme when the page loads
document.addEventListener("DOMContentLoaded", applySavedTheme);

// =======================================================================
// Showing and deleting the saved ids
// Function to display saved tracking IDs
function displaySavedTrackingIds() {
  const savedIds = JSON.parse(localStorage.getItem("savedTrackingIds")) || [];
  const savedList = document.getElementById("savedTrackingList");
  savedList.innerHTML = ""; // Clear existing list

  if (savedIds.length === 0) {
    savedList.innerHTML = "<li>No saved tracking IDs found.</li>";
    return;
  }

  savedIds.forEach((id) => {
    const li = document.createElement("li");
    li.textContent = id;

    // Add Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.onclick = () => deleteTrackingId(id);

    li.appendChild(deleteButton);
    savedList.appendChild(li);
  });
}

// Function to delete a tracking ID
function deleteTrackingId(id) {
  let savedIds = JSON.parse(localStorage.getItem("savedTrackingIds")) || [];
  savedIds = savedIds.filter((savedId) => savedId !== id); // Remove the specified ID
  localStorage.setItem("savedTrackingIds", JSON.stringify(savedIds)); // Update local storage
  displaySavedTrackingIds(); // Refresh the list
}

// Display saved tracking IDs on page load
document.addEventListener("DOMContentLoaded", displaySavedTrackingIds);

// ===============Redirecting the user to the login page again

function redirectToLogin() {
  window.location.href = "../login/login.html"; // Update the path if necessary
}
