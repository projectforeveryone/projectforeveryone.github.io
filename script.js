document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Form validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent form submission for validation
            let isValid = true;
            const inputs = form.querySelectorAll("input, textarea");
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = "red"; // Highlight invalid fields
                } else {
                    input.style.borderColor = ""; // Reset border color
                }
            });

            if (isValid) {
                // Handle form submission (e.g., send data to server)
                alert("Form submitted successfully!");
                // Here you could add an AJAX request or similar functionality.
                form.reset(); // Reset the form
            } else {
                alert("Please fill out all required fields.");
            }
        });
    }

    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(item => {
        item.addEventListener("click", function () {
            const faqContent = this.nextElementSibling;
            if (faqContent.style.display === "block") {
                faqContent.style.display = "none";
            } else {
                faqItems.forEach(i => i.nextElementSibling.style.display = "none"); // Close other FAQs
                faqContent.style.display = "block";
            }
        });
    });
});
