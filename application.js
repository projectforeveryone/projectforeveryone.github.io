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
// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Event listener for form submission
document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Get the email from the form
    const email = document.getElementById('email').value.trim();

    // Fetch the user's project from Firestore
    db.collection('users').where('email', '==', email).get()
        .then(querySnapshot => {
            if (!querySnapshot.empty) {
                // If the email is found, display the project details
                querySnapshot.forEach(doc => {
                    document.getElementById('projectInfo').textContent = doc.data().project;
                    document.getElementById('projectDetails').style.display = 'block';
                });
            } else {
                // If the email is not found, show an error message
                document.getElementById('projectInfo').textContent = "No project found for this email.";
                document.getElementById('projectDetails').style.display = 'block';
            }
        })
        .catch(error => {
            console.error("Error fetching project details: ", error);
            document.getElementById('projectInfo').textContent = "An error occurred. Please try again.";
            document.getElementById('projectDetails').style.display = 'block';
        });
});
