// Firebase initialization (if not already initialized)
// Import Firebase dependencies
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Initialize Firebase Authentication
const auth = getAuth();

// Check if user is logged in and retrieve user info
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, retrieve user data
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const uid = user.uid;  // User's unique ID

    // Display the user data on the dashboard
    document.getElementById('username').innerText = displayName || 'User';
    document.getElementById('email').innerText = email;
    document.getElementById('user-photo').src = photoURL || 'default-photo-url';
  } else {
    // No user is signed in, redirect to login page
    window.location.href = '/login.html';
  }
});
