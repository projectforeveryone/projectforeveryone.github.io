// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', () => {
  const user = auth.currentUser;

  if (user) {
      const userId = user.uid;
      const userRef = database.ref('users/' + userId);

      userRef.once('value').then((snapshot) => {
          const data = snapshot.val();
          if (data) {
              document.getElementById('firstName').innerText = data.firstName;
              document.getElementById('lastName').innerText = data.lastName;
              document.getElementById('email').innerText = data.email;
              document.getElementById('phone').innerText = data.phone;
              document.getElementById('address').innerText = data.address;
              document.getElementById('bio').innerText = data.bio;
              document.getElementById('skills').innerText = data.skills;
              document.getElementById('linkedin').innerText = data.linkedin;
              document.getElementById('website').innerText = data.website;
          } else {
              alert('No data available');
          }
      }).catch((error) => {
          console.error('Error fetching data:', error);
      });
  } else {
      alert('User not authenticated.');
  }
});