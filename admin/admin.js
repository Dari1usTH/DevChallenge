document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password-input');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const loginBtn = document.getElementById('login-btn');
    const backBtn = document.getElementById('back-to-challenges');
    const messageContainer = document.getElementById('message-container');
    const MOONSHOT_HASH = '6749675d80a1faa70859312365b6eab644244d8e5d01cc94f44644c13d090ee7';
    
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
    
    loginBtn.addEventListener('click', async function() {
        const password = passwordInput.value.trim();
        
        if (!password) {
            showMessage('Please enter a password', 'error');
            return;
        }
        
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
        
        try {
            const hashBuffer = await crypto.subtle.digest(
                'SHA-256',
                new TextEncoder().encode(password)
            );
            
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');

            if (hashHex === MOONSHOT_HASH) {
                localStorage.setItem('user', 'admin');
                localStorage.setItem('adminAuthenticated', 'true');
                showMessage('✓ Access granted! Redirecting to challenges...', 'success');
                setTimeout(() => {
                    window.location.href = './challenges/chall.html';
                }, 1500);
            } else {
                showMessage('✗ Invalid password. Try again.', 'error');
                passwordInput.value = '';
                passwordInput.focus();
                this.disabled = false;
                this.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login as Admin';
            }
        } catch (error) {
            console.error('Error hashing password:', error);
            showMessage('An error occurred. Please try again.', 'error');
            this.disabled = false;
            this.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login as Admin';
        }
    });

    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
    
    backBtn.addEventListener('click', function() {
        window.location.href = './challenges/chall.html';
    });
    
    function showMessage(message, type) {
        messageContainer.textContent = message;
        messageContainer.className = 'message-container';
        messageContainer.classList.add(type);
        if (type === 'error') {
            setTimeout(() => {
                messageContainer.textContent = '';
                messageContainer.className = 'message-container';
            }, 5000);
        }
    }
    passwordInput.focus();
});