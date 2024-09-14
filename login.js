// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAI0BlQnSW2yXitTo6VDMF3fzKktyCS4aQ",
    authDomain: "project-for-everyone.firebaseapp.com",
    projectId: "project-for-everyone",
    storageBucket: "project-for-everyone.appspot.com",
    messagingSenderId: "596672283631",
    appId: "1:596672283631:web:f805fc04f72661b9762c1a",
    measurementId: "G-LMGRC4KGV8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Auth

// Submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Redirect to dashboard immediately after successful login
        window.location.href = "dashboard.html";
    })
    .catch((error) => {
        // Handle login errors
        const errorMessage = error.message;
        const messageElement = document.getElementById('message'); // Assuming a message element exists
        messageElement.textContent = "Error: " + errorMessage; // Display error message
        messageElement.style.color = "red"; // Set error message color
    });
});

