const contactform = document.getElementById("form");
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");
const messageField = document.getElementById("message");

const nameErrorField = document.getElementById("name_error");
const emailErrorField = document.getElementById("email_error");
const phoneErrorField = document.getElementById("phone_error");
const messageErrorField = document.getElementById("message_error");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\d{10}$/;

// Main submit handler
contactform.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
        sendEmail(); 
        showSuccessMessage();
    } else {
        showErrorMessage();
    }
});

// Function to validate all form fields
function validateForm() {
    let isValid = true;

    // Name Validation
    if (nameField.value.trim() === '') {
        nameErrorField.innerHTML = "A name is required!";
        nameField.style.borderColor = '#ff0000';
        isValid = false;
    } else {
        nameField.style.borderColor = '#33da00';
        nameErrorField.innerHTML = "";
    }

    // Email Validation
    if (emailField.value.trim() === '') {
        emailErrorField.innerHTML = "Email is required!";
        emailField.style.borderColor = '#ff0000';
        isValid = false;
    } else if (!emailField.value.match(emailRegex)) {
        emailErrorField.innerHTML = "Valid email is required!";
        emailField.style.borderColor = '#ff0000';
        isValid = false;
    } else {
        emailField.style.borderColor = '#00ff15';
        emailErrorField.innerHTML = ""; 
    }

    // Phone Validation
    if (phoneField.value.trim() === '') {
        phoneErrorField.innerHTML = "Phone number is required!";
        phoneField.style.borderColor = '#ff0000';
        isValid = false;
    } else if (!phoneField.value.match(phoneRegex)) {
        phoneErrorField.innerHTML = "Please enter a valid 10-digit phone number!";
        phoneField.style.borderColor = '#ff0000';
        isValid = false;
    } else {
        phoneField.style.borderColor = '#00ff15';
        phoneErrorField.innerHTML = "";
    }

    // Message Validation
    if (messageField.value.trim() === '') {
        messageErrorField.innerHTML = "Please tell me your message!";
        messageField.style.borderColor = '#ff0000';
        isValid = false;
    } else {
        messageField.style.borderColor = '#00ff15';
        messageErrorField.innerHTML = ""; 
    }

    return isValid;
}



nameField.addEventListener('input', () => {
    // Check if the name field is not empty
    if (nameField.value.trim() !== '') {
        nameField.style.borderColor = '#33da00'; 
        nameErrorField.innerHTML = "";  
    } else {
        nameField.style.borderColor = '#ff0000'; 
        nameErrorField.innerHTML = "A name is required..!";
    }
});
emailField.addEventListener('input', () => {
    // Check if the email is valid
    if (emailField.value.match(emailRegex)) {
        emailField.style.borderColor = '#00ff15';  // Green border
        emailErrorField.innerHTML = "";  // Clear any error message
    } else if (emailField.value.trim() !== '') {
        emailField.style.borderColor = '#ff0000';  // Red border for invalid email
        emailErrorField.innerHTML = "Valid email is required..!";  // Show error message
    } else {
        emailField.style.borderColor = '';  // Remove the border color if empty
        emailErrorField.innerHTML = "Email is required..!";  // Show error message
    }
});
phoneField.addEventListener('input', () => {
    // Check if the phone number matches the regex for a valid 10-digit phone number
    if (phoneField.value.match(phoneRegex)) {
        phoneField.style.borderColor = '#00ff15';  // Green border
        phoneErrorField.innerHTML = "";  // Clear any error message
    } else if (phoneField.value.trim() !== '') {
        phoneField.style.borderColor = '#ff0000';  // Red border for invalid phone number
        phoneErrorField.innerHTML = "Please enter a valid 10-digit phone number..!";  // Show error message
    } else {
        phoneField.style.borderColor = '';  // Remove the border color if empty
        phoneErrorField.innerHTML = "Phone number is required..!";  // Show error message
    }
});
messageField.addEventListener('input', () => {
    // Check if the message field is not empty
    if (messageField.value.trim() !== '') {
        messageField.style.borderColor = '#00ff15';  // Green border
        messageErrorField.innerHTML = "";  // Clear any error message
    } else {
        messageField.style.borderColor = '';  // Remove the border color if empty
        messageErrorField.innerHTML = "Please tell me your message..!";  // Show error message
    }
});



// Function to send the email via emailjs
function sendEmail() {
    const params = {
        from_name: nameField.value,
        name: nameField.value,
        email_id: emailField.value,
        phone_no: phoneField.value,
        message: messageField.value
    };

    emailjs.send("service_5ofgdtl", "template_853vplt", params)
        .then(function (res) {
            console.log('Email sent successfully:', res);
        })
        .catch(function (error) {
            console.log('Error sending email:', error); 
        });
}

// Function to show success message using SweetAlert
function showSuccessMessage() {
    const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "success",
        title: "Submitted successfully"
    });
}

// Function to show error message using SweetAlert
function showErrorMessage() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "error",  // Corrected to "error" instead of "Error"
        title: "Please fill all fields correctly"
    });
}

