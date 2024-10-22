// upload.html: Handle project upload
document.getElementById('uploadForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const files = document.getElementById('files').files;
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
  
    try {
      const response = await fetch('http://localhost:5000/projects', {
        method: 'POST',
        body: formData
      });
      const project = await response.json();
      window.location.href = 'index.html#projects';
    } catch (error) {
      console.error('Error:', error);
    }
  
    event.target.reset();
  });
  
  // index.html: Load and display projects
  function addProjectToList(project) {
    const projectsList = document.getElementById('projectsList');
    const listItem = document.createElement('li');
  
    const projectTitle = document.createElement('h3');
    projectTitle.textContent = project.title;
  
    const projectDescription = document.createElement('p');
    projectDescription.textContent = project.description;
  
    const projectFiles = document.createElement('ul');
    project.files.forEach(file => {
      const fileItem = document.createElement('li');
      const fileLink = document.createElement('a');
      fileLink.href = `http://localhost:5000/${file}`;
      fileLink.textContent = file.split('/').pop(); // Display only the file name
      fileLink.target = '_blank';
      fileItem.appendChild(fileLink);
      projectFiles.appendChild(fileItem);
    });
  
    listItem.appendChild(projectTitle);
    listItem.appendChild(projectDescription);
    listItem.appendChild(projectFiles);
    projectsList.appendChild(listItem);
  }
  
  async function loadProjects() {
    try {
      const response = await fetch('http://localhost:5000/projects');
      const projects = await response.json();
      projects.forEach(project => addProjectToList(project));
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  window.onload = loadProjects;
  document.getElementById('loginForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const loginData = { email, password };
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
  
      if (response.ok) {
        const data = await response.json();
        // Handle successful login (e.g., store token)
        window.location.href = 'dashboard.html';
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  document.getElementById('registerForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const registerData = { email, password };
  
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
      });
  
      if (response.ok) {
        const data = await response.json();
        // Handle successful registration (e.g., store token)
        window.location.href = 'dashboard.html';
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  // Logout functionality
  document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('logout.html')) {
      // Clear any stored authentication tokens or session data
      // Example: localStorage.removeItem('authToken');
      // For demonstration, using localStorage
      localStorage.removeItem('authToken');
  
      // Redirect to login page after a short delay
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 2000); // 2 seconds delay for a better user experience
    }
  });

  // Select all FAQ items
  const faqItems = document.querySelectorAll('.faq-item h3');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentElement;

      // Toggle 'active' class on the clicked FAQ item
      parent.classList.toggle('active');

      // Toggle visibility of the answer
      const answer = parent.querySelector('p');
      if (parent.classList.contains('active')) {
        answer.style.display = 'block';
      } else {
        answer.style.display = 'none';
      }
    });
  });

