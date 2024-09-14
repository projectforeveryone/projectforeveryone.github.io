// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

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
const auth = getAuth(app);

// Attach event listener to the form
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
forgotPasswordForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;

    // Send a password reset email
    sendPasswordResetEmail(auth, email)
    .then(() => {
        // Redirect to the follow-up page after successful email sending
        window.location.href = "reset-confirmation.html";
    })
    .catch((error) => {
        // Display error message
        const errorMessage = error.message;
        document.getElementById('message').textContent = "Error: " + errorMessage;
        document.getElementById('message').style.color = "red";
    });
});
