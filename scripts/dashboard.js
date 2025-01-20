// Mock data for tracking information
const trackingData = {
  12345: { status: "In Transit", location: "New York", estimate: "2025-01-25" },
  67890: {
    status: "Delivered",
    location: "Los Angeles",
    estimate: "2025-01-18",
  },
  67891: {
    status: "Delivered",
    location: "Los Angeles",
    estimate: "2025-01-18",
  },
};

// Load user info and greet them
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("greeting").textContent = `Welcome, ${user.name}!`;
    loadSavedTrackingIds();
    loadDeliveryHistory();
  } else {
    alert("Please sign up first.");
    window.location.href = "../login/login.html";
  }
});

// Function to track an order
// Function to track an order with error handling
// Addition of the progress bar function here

// Function to update delivery progress bar
function updateProgressBar(status) {
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  // Map statuses to progress percentages
  const statusProgress = {
    Shipped: 25,
    "In Transit": 50,
    "Out for Delivery": 75,
    Delivered: 100,
  };

  const percentage = statusProgress[status] || 0; // Default to 0 if status not found
  progressBar.style.width = percentage + "%"; // Update width of the bar
  progressText.textContent = `${percentage}% - ${status}`; // Update progress text
}

function trackOrder() {
  const trackingId = document.getElementById("trackingId").value.trim(); // Trim whitespace
  const resultDiv = document.getElementById("trackingResult");

  // Error: Empty Tracking ID
  if (!trackingId) {
    resultDiv.innerHTML = `<p style="color: red;">Please enter a valid Tracking ID.</p>`;
    return;
  }

  const savedIds = JSON.parse(localStorage.getItem("savedTrackingIds")) || [];

  // Error: Duplicate Tracking ID
  if (savedIds.includes(trackingId)) {
    resultDiv.innerHTML = `<p style="color: red;">This Tracking ID is already being tracked.</p>`;
    return;
  }

  // Tracking Data Lookup
  const result = trackingData[trackingId];

  if (result) {
    // Display tracking details if found
    resultDiv.innerHTML = `
      <p>Status: ${result.status}</p>
      <p>Current Location: ${result.location}</p>
      <p>Estimated Delivery: ${result.estimate}</p>
    `;
    updateProgressBar(result.status); // Update progress bar
    saveTrackingId(trackingId); // Save only if valid and not duplicate
  } else {
    // Error: Tracking ID Not Found
    resultDiv.innerHTML = `<p style="color: red;">Tracking ID not found. Please check and try again.</p>`;
  }
}

// Save tracking IDs to localStorage
function saveTrackingId(trackingId) {
  let savedIds = JSON.parse(localStorage.getItem("savedTrackingIds")) || [];
  if (!savedIds.includes(trackingId)) {
    savedIds.push(trackingId);
    localStorage.setItem("savedTrackingIds", JSON.stringify(savedIds));
    loadSavedTrackingIds();
  }
}

// Load saved tracking IDs
function loadSavedTrackingIds() {
  const savedIds = JSON.parse(localStorage.getItem("savedTrackingIds")) || [];
  const list = document.getElementById("savedTrackingIds");
  list.innerHTML = "";
  savedIds.forEach((id) => {
    const li = document.createElement("li");
    li.textContent = id;
    list.appendChild(li);
  });
}

// Load delivery history (mock data for simplicity)
function loadDeliveryHistory() {
  const deliveredIds = Object.keys(trackingData).filter(
    (id) => trackingData[id].status === "Delivered"
  );
  const list = document.getElementById("deliveryHistory");
  list.innerHTML = "";
  deliveredIds.forEach((id) => {
    const li = document.createElement("li");
    li.textContent = id;
    list.appendChild(li);
  });
}

// Function to search saved tracking IDs
function searchTrackingIds() {
  const query = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const savedIds = JSON.parse(localStorage.getItem("savedTrackingIds")) || [];
  const results = document.getElementById("searchResults");
  results.innerHTML = ""; // Clear previous search results

  // Filter tracking IDs based on query
  const filteredIds = savedIds.filter((id) => {
    const trackingInfo = trackingData[id];
    return (
      id.includes(query) ||
      (trackingInfo && trackingInfo.status.toLowerCase().includes(query))
    );
  });

  // Display filtered results
  if (filteredIds.length > 0) {
    filteredIds.forEach((id) => {
      const li = document.createElement("li");
      li.textContent = `${id} - ${trackingData[id]?.status || "Unknown"}`;
      results.appendChild(li);
    });
  } else {
    results.innerHTML = "<li>No matching results found.</li>";
  }
}
