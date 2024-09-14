// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCJGLobByfpZu1jUr6DXtmXI33rdVNj3KU",
    authDomain: "enquiries-822fb.firebaseapp.com",
    databaseURL: "https://enquiries-822fb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "enquiries-822fb",
    storageBucket: "enquiries-822fb.appspot.com",
    messagingSenderId: "767842759844",
    appId: "1:767842759844:web:74797fb95aaac7edc76231"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference to the database
  var contactFormDB = firebase.database().ref("contactForm");
  
  // Listen for form submit
  document.getElementById("contact-form").addEventListener('submit', submitForm);
  
  // Submit form
  function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name");
    var email = getElementVal("email");
    var message = getElementVal("message");
  
    saveMessages(name, email, message);
  
    // Redirect to another page after submission
    window.location.href = "thank-you.html";
  
    // Optionally reset the form
    document.getElementById("contact-form").reset();
  }
  
  // Save the messages to Firebase
  const saveMessages = (name, email, message) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      email: email,
      message: message,
    });
  }
  
  // Get form values
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  }
  