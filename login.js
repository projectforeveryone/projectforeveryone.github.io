// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDG51D4xiyKPF07LIs69nHeoEJmCbL-oQA",
    authDomain: "official-pfe.firebaseapp.com",
    projectId: "official-pfe",
    storageBucket: "official-pfe.appspot.com",
    messagingSenderId: "470366394426",
    appId: "1:470366394426:web:c08eed4f0629ec09603d03"
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

