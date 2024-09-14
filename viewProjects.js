// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEw5vKEela_o4uCOP4Wn1Uw-oB-gErxTY",
  authDomain: "upload-for-pfe.firebaseapp.com",
  projectId: "upload-for-pfe",
  storageBucket: "upload-for-pfe.appspot.com",
  messagingSenderId: "508596542154",
  appId: "1:508596542154:web:299ef40982eacad94bb233",
  measurementId: "G-114ML4XWCD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function uploadFile(file) {
    // Create a reference to the path in Firebase Storage
    const storageRef = firebase.storage().ref('uploads/' + file.name);
  
    // Upload the file to the specified path
    const uploadTask = storageRef.put(file);
  
    // Monitor the upload process
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Optional: Track progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        // Handle errors during upload
        console.error('Upload failed:', error);
      }, 
      () => {
        // Handle successful uploads
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  }
  