// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";


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
