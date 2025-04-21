
const form = document.getElementById('form');

let btn = document.getElementById("merabtn");

btn.addEventListener('mouseenter', function () {              // mouse in event
    btn.textContent = "Press to Sign up";
})

btn.addEventListener('mouseout', function () {               // mouse out event
    btn.textContent = "Sign up";
})


form.addEventListener('submit', function (e) {
    e.preventDefault();

    // field ki values milegi
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const age = document.getElementById('age').value.trim();
    const password = document.getElementById('password').value.trim();

    
    
    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.innerText = '');  
    
    // Validation flag
    let isValid = true;

    // Validate name
    const nameRegex = /^[A-Za-z\s]+$/;

    if (name === '' || name.length < 3) {
        document.getElementById('nameError').innerText = 'Enter a valid name (min 3 characters)';
        isValid = false;
    } else if (!nameRegex.test(name)) {
        document.getElementById('nameError').innerText = 'Name can only contain letters and spaces (no numbers or symbols)';
        isValid = false;
    } else {
        document.getElementById('nameError').innerText = '';
    }

    // Validate email
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Enter a valid email';
        isValid = false;
    } 

    // Validate phone
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById('phoneError').innerText = 'Enter a valid 10-digit phone number';
        isValid = false;
    }

    // Validate age
    if (isNaN(age) || age < 12 || age > 120) {
        document.getElementById('ageError').innerText = 'Enter a valid age (12 - 120)';
        isValid = false;
    }

    // Validate password
    if (password.length < 6) {
        document.getElementById('passwordError').innerText = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (isValid) {
        // Get existing users from local storage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if email already exists
        if (users.some(user => user.email === email)) {
            alert('Email already registered.');
            return;
        }

        // Add new user
        users.push({ name, email, phone, age, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Sign up successful!');
        form.reset();                      // form ko vapas reset kr dega
    }



});
