// ================= AUTH SYSTEM ================= //
const users = JSON.parse(localStorage.getItem("users")) || [];

// 1. Auto-redirect logic
if (localStorage.getItem("authenticated")) {
  if (window.location.pathname.includes("signin.html")) {
    const currentUser = localStorage.getItem("currentUser");
    alert(`You are already signed in as ${currentUser}!`);

    window.location.href = "index.html";
  }
} else {
  if (
    !window.location.pathname.includes("signin.html") &&
    !window.location.pathname.includes("signup.html") &&
    !window.location.pathname.includes("about.html") &&
    !window.location.pathname.includes("contact.html")
  ) {
    alert("You are not signed in! Redirecting to sign in page...");
    window.location.href = "signin.html";
  }
}

// 2. Enhanced Sign Up
function handleSignUp(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Validation
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (users.some((user) => user.username === username)) {
    alert("Username already exists!");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created! Redirecting...");
  window.location.href = "signin.html";
}

// 3. Enhanced Sign In
function handleSignIn(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("currentUser", username);
    alert("Signed in! Redirecting...");
    window.location.href = "index.html";
  } else {
    alert("Invalid username or password!");
  }
}

// 4. Sign Out
function handleSignOut() {
  const isAuthenticated = localStorage.getItem("authenticated");

  if (isAuthenticated === "true") {
    localStorage.removeItem("authenticated");
    alert("You have been signed out!");
    window.location.href = "signin.html";
  } else {
    alert("You are not signed in!");
  }
}

// 5. Dark Mode Toggle
function toggleDarkMode() {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "false");
  } else {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "true");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Check for dark mode preference in local storage
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // Dynamically insert images into each section
  const imageData = {
    icebergs: {
      folder: "images/Iceberg images",
      count: 16,
      alt: "Iceberg",
    },
    forests: {
      folder: "images/Forest images",
      count: 32,
      alt: "Forest",
    },
    Sunset: {
      folder: "images/Sunset",
      count: 34,
      alt: "Sunset",
    },
    "Palm Tree": {
      folder: "images/Palm Tree",
      count: 21,
      alt: "Palm Tree",
    },
    Seashell: {
      folder: "images/Seashell images",
      count: 20,
      alt: "Seashell",
    },
  };

  Object.keys(imageData).forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      let imgs = "";
      for (let i = 1; i <= imageData[sectionId].count; i++) {
        imgs += `<img src="${imageData[sectionId].folder}/${i}.jpeg" alt="${imageData[sectionId].alt} ${i}" width="200">`;
      }
      section.innerHTML = imgs;
    }
  });

  document
    .getElementById("toggleSidebarContent")
    .addEventListener("click", function () {
      const sidebar = document.querySelector(".sidebar");
      const sidebarContent = document.querySelector(".sidebar ul");
      const toggleButton = document.getElementById("toggleSidebarContent");
      if (sidebarContent.style.display === "none") {
        sidebarContent.style.display = "flex";
        // sidebarContent.style.flexDirection = "row";
        // sidebarContent.style.flexWrap = "wrap";
        // sidebarContent.style.justifyContent = "center";
        // sidebarContent.style.alignItems = "center";
        // Place the button just inside the right edge of the sidebar

        const mediaQuery = window.matchMedia("(max-width: 767px)");
        if (mediaQuery.matches) {
          sidebar.style.width = "20%";
        } else {
          sidebar.style.width = "10%";
        }
      } else {
        sidebarContent.style.display = "none";
        sidebar.style.width = "auto";
      }
    });

  // Category selection functionality
  const select = document.getElementById("categorySelect");
  const sections = document.querySelectorAll(".gallery-section");
  select.addEventListener("change", function () {
    const selected = this.value;

    sections.forEach((section) => {
      if (section.id === selected) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  });

  // Sidebar category click functionality
  document.querySelectorAll(".sidebar-dropdown a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default jump behavior

      const selectedCategory = link.getAttribute("href").substring(1); // Get category ID without '#'
      const sections = document.querySelectorAll(".gallery-section");
      const selectElement = document.getElementById("categorySelect"); // Get select element

      // Update the dropdown value
      selectElement.value = selectedCategory;

      // Show relevant gallery section
      sections.forEach((section) => {
        if (section.id === selectedCategory) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      });
    });
  });

  // Lightbox functionality
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("expandedImg");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close-btn"); // Changed to match HTML

  // Get all gallery images and add click event
  const galleryImages = document.querySelectorAll(".gallery-section img");
  galleryImages.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
      document.body.style.overflow = "hidden"; // Prevent scrolling
    });
  });

  // Close the modal - FIXED THIS PART
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  });

  // Close when clicking outside the image
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Close with ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
});
