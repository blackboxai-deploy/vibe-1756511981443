// SWAT BODYGUARDS - Platform JavaScript

// Global Variables
let currentUser = {
    name: "NombreDelUsuario",
    role: "student", // or "admin"
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/498b420a-4c84-47f3-bc4a-28967043a663.png"
};

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initializeMobileSidebar();
    initializeFormValidation();
    loadUserData();
    initializeBootstrapComponents();
}

// Mobile Sidebar Toggle
function initializeMobileSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }
}

// Form Validation
function initializeFormValidation() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLogin();
        });
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateRegistration();
        });
    }
    
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
}

// Login Validation
function validateLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showAlert('Por favor, complete todos los campos', 'danger');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Por favor, ingrese un email válido', 'danger');
        return false;
    }
    
    showLoading(document.querySelector('#loginForm button[type="submit"]'));
    
    setTimeout(() => {
        hideLoading(document.querySelector('#loginForm button[type="submit"]'), 'Iniciar Sesión');
        
        if (email.includes('admin')) {
            window.location.href = 'student/dashboard.html'; // Redirect to student for demo
        } else {
            window.location.href = 'student/dashboard.html';
        }
    }, 2000);
}

// Registration Validation
function validateRegistration() {
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!name || !email || !password || !confirmPassword) {
        showAlert('Por favor, complete todos los campos', 'danger');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Por favor, ingrese un email válido', 'danger');
        return false;
    }
    
    if (password !== confirmPassword) {
        showAlert('Las contraseñas no coinciden', 'danger');
        return false;
    }
    
    if (!isStrongPassword(password)) {
        showAlert('La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números', 'danger');
        return false;
    }
    
    showLoading(document.querySelector('#registerForm button[type="submit"]'));
    
    setTimeout(() => {
        hideLoading(document.querySelector('#registerForm button[type="submit"]'), 'Registrarse');
        showAlert('Cuenta creada exitosamente. Redirigiendo...', 'success');
        
        setTimeout(() => {
            window.location.href = 'student/dashboard.html';
        }, 2000);
    }, 2000);
}

// Password Strength Checker
function checkPasswordStrength(password) {
    const strengthIndicator = document.getElementById('passwordStrength');
    if (!strengthIndicator) return;
    
    let strength = 0;
    let feedback = '';
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    switch (strength) {
        case 0:
        case 1:
            strengthIndicator.className = 'password-strength weak';
            feedback = 'Muy débil';
            break;
        case 2:
        case 3:
            strengthIndicator.className = 'password-strength medium';
            feedback = 'Medio';
            break;
        case 4:
        case 5:
            strengthIndicator.className = 'password-strength strong';
            feedback = 'Fuerte';
            break;
    }
    
    strengthIndicator.textContent = feedback;
    strengthIndicator.style.display = password.length > 0 ? 'block' : 'none';
}

// Load User Data
function loadUserData() {
    document.querySelectorAll('.user-name-placeholder').forEach(el => {
        el.textContent = currentUser.name;
    });
    
    document.querySelectorAll('.user-avatar').forEach(img => {
        img.src = currentUser.avatar;
        img.alt = currentUser.name;
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isStrongPassword(password) {
    return password.length >= 8 && 
           /[a-z]/.test(password) && 
           /[A-Z]/.test(password) && 
           /[0-9]/.test(password);
}

function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer') || createAlertContainer();
    
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type} alert-dismissible fade show`;
    alertElement.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertContainer.appendChild(alertElement);
    
    setTimeout(() => {
        if (alertElement.parentNode) {
            alertElement.parentNode.removeChild(alertElement);
        }
    }, 5000);
}

function createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alertContainer';
    container.className = 'fixed-top mt-3 mx-3';
    container.style.zIndex = '1060';
    document.body.appendChild(container);
    return container;
}

function showLoading(button) {
    if (!button) return;
    
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Procesando...';
}

function hideLoading(button, originalText) {
    if (!button) return;
    
    button.disabled = false;
    button.innerHTML = originalText;
}

function initializeBootstrapComponents() {
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        const modalElements = document.querySelectorAll('.modal');
        modalElements.forEach(modal => {
            new bootstrap.Modal(modal);
        });
    }
}

// Export functions for global access
window.SWAT = {
    showAlert,
    showLoading,
    hideLoading
};