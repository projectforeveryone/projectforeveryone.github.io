// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

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

// References to Firebase services
const auth = getAuth(app);
const database = getDatabase(app);

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Fetch user profile details from Realtime Database
        const userRef = ref(database, 'users/' + user.uid);
        get(userRef).then((snapshot) => {
            const data = snapshot.val();

            // Populate the dashboard with profile data
            if (data) {
                document.getElementById('firstName').textContent = data.firstName || 'Not provided';
                document.getElementById('lastName').textContent = data.lastName || 'Not provided';
                document.getElementById('email').textContent = data.email || 'Not provided';
                document.getElementById('bio').textContent = data.bio || 'Not provided';
                document.getElementById('skills').textContent = data.skills || 'Not provided';
            } else {
                console.log("No user data found");
            }
        }).catch((error) => {
            console.error("Error fetching user profile:", error);
        });
    } else {
        // Redirect to login if the user is not authenticated
        window.location.href = 'login.html';
    }
});
