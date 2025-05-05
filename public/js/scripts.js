const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

function validatePasswords() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!password || !confirmPassword) {
        confirmPasswordInput.style.color = '';
        return;
    }

    if (password === confirmPassword) {
        confirmPasswordInput.style.color = 'green';
    } else {
        confirmPasswordInput.style.color = 'red';
    }
}

passwordInput.addEventListener('input', validatePasswords);
confirmPasswordInput.addEventListener('input', validatePasswords);
