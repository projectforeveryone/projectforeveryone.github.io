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
const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

const profilePhoto = document.getElementById('profilePhoto');
const profilePhotoInput = document.getElementById('profilePhotoInput');
const uploadPhotoButton = document.getElementById('uploadPhoto');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.getElementById('progressBar');
const progressMessage = document.getElementById('uploadMessage');

// Auth state listener to load user profile data
auth.onAuthStateChanged((user) => {
  if (user) {
    // Fetch user profile data from Realtime Database
    database.ref('users/' + user.uid).once('value').then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        document.getElementById('firstName').textContent = data.firstName || 'Not provided';
        document.getElementById('lastName').textContent = data.lastName || 'Not provided';
        document.getElementById('email').textContent = data.email || 'Not provided';
        document.getElementById('phone').textContent = data.phone || 'Not provided';
        document.getElementById('address').textContent = data.address || 'Not provided';
        document.getElementById('bio').textContent = data.bio || 'Not provided';
        document.getElementById('skills').textContent = data.skills || 'Not provided';
        document.getElementById('linkedin').href = data.linkedin || '#';
        document.getElementById('linkedin').textContent = data.linkedin || 'Not provided';
        document.getElementById('website').href = data.website || '#';
        document.getElementById('website').textContent = data.website || 'Not provided';

        if (data.profilePhotoURL) {
          profilePhoto.src = data.profilePhotoURL;
        } else {
          profilePhoto.src = 'default-profile.png';
        }
      } else {
        console.log("No user data found");
      }
    }).catch((error) => {
      console.error("Error fetching user profile from Realtime Database:", error);
    });
  } else {
    window.location.href = 'login.html'; // Redirect to login if not authenticated
  }
});

// Preview selected image before upload
if (profilePhotoInput) {
  profilePhotoInput.addEventListener('change', function() {
    const file = profilePhotoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profilePhoto.src = e.target.result; // Show preview of the selected image
      };
      reader.readAsDataURL(file);
    }
  });
}

// Handle photo upload to Firebase Storage
if (uploadPhotoButton) {
  uploadPhotoButton.addEventListener('click', function() {
    const user = auth.currentUser;
    if (user) {
      const file = profilePhotoInput.files[0];
      if (file) {
        const storageRef = storage.ref(`profilePhotos/${user.uid}/${file.name}`);
        const uploadTask = storageRef.put(file);

        // Show progress bar
        progressContainer.style.display = 'block';
        progressMessage.textContent = ''; // Clear previous messages

        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = `${progress}%`; // Correct usage of template literal
          }, 
          (error) => {
            console.error('Upload failed:', error);
            alert("Photo upload failed. Please try again.");
            progressContainer.style.display = 'none'; // Hide progress bar on error
          }, 
          () => {
            // Upload successful, get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              // Save download URL to Realtime Database under the user's profile
              database.ref('users/' + user.uid).update({
                profilePhotoURL: downloadURL
              }).then(() => {
                profilePhoto.src = downloadURL; // Update profile picture in UI
                progressMessage.textContent = 'Upload complete!';
                setTimeout(() => {
                  progressContainer.style.display = 'none'; // Hide progress bar after short delay
                }, 2000);
              }).catch((error) => {
                console.error('Error saving photo URL to Realtime Database:', error);
                alert("Error saving the photo URL to the profile.");
                progressContainer.style.display = 'none';
              });
            });
          }
        );
      } else {
        alert("Please select a file first.");
      }
    }
  });
}
