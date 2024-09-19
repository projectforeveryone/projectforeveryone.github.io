// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB72t7tOL_0dsCq20TncHg-Bm5V_y2-_6M",
    authDomain: "uploaddocs-1ec15.firebaseapp.com",
    projectId: "uploaddocs-1ec15",
    storageBucket: "uploaddocs-1ec15.appspot.com",
    messagingSenderId: "167054968637",
    appId: "1:167054968637:web:8ddfe9b3a733a96c966754",
    measurementId: "G-XJE53THHZE"
};

firebase.initializeApp(firebaseConfig);

var filetext = document.querySelector(".fileText");
var uploadPercentage = document.querySelector(".uploadPercentage");
var progress = document.querySelector(".progress");
var message = document.querySelector(".message"); // For the 'Upload completed' message
var percentVal;
var fileItem;
var fileName;

// Function to get the selected file
function getfile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    filetext.innerHTML = fileName;
    message.innerHTML = ""; // Clear any previous messages
    progress.style.display = "block"; // Show the progress bar
    uploadPercentage.style.display = "block"; // Show the percentage
}

function uploadFile() {
    if (!fileItem) {
        alert("Please select a file first.");
        return;
    }

    let storageRef = firebase.storage().ref("documents/" + fileName);
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed", 
        (snapshot) => {
            percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            uploadPercentage.innerHTML = percentVal + "%";
            progress.style.width = percentVal + "%";
        }, 
        (error) => {
            console.log("Error:", error);
        }, 
        () => {
            // When the upload is complete
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                console.log("File available at:", url);

                // Hide the progress bar and percentage
                progress.style.display = "none";
                uploadPercentage.style.display = "none";

                // Show the upload completed message
                message.innerHTML = "Upload completed";
                message.style.color = "green";
            });
        }
    );
}
