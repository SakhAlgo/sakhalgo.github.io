// Custom JavaScript file to replace Bootstrap functionality if needed
// Currently empty as the form doesn't require Bootstrap-specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add any custom JavaScript functionality here if needed
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }
            
            // If validation passes, you could submit the form
            alert('Форма успешно отправлена!');
            form.submit(); // Uncomment this to actually submit the form
        });
    }
});