// Firebase initialization
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Check if user is logged in and retrieve user info
onAuthStateChanged(auth, (user) => {
  console.log("Auth State Changed:", user); // Log user object

  if (user) {
    const displayName = user.displayName || "User";
    const email = user.email || "No email provided";
    const photoURL = user.photoURL || ""; // Make sure to handle null

    console.log("Display Name:", displayName);
    console.log("Email:", email);
    console.log("Photo URL:", photoURL);

    // Display user data on the dashboard
    document.getElementById("username").innerText = displayName;
    document.getElementById("email").innerText = email;

    // Set the user photo, using a default if none is available
    document.getElementById("user-photo").src = photoURL && photoURL.trim() !== ""
      ? photoURL
      : "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"; // Default photo URL
  } else {
    console.log("No user signed in. Redirecting to login.");
    window.location.href = "/login.html"; // Redirect if not signed in
  }
});
