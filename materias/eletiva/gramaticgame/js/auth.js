import { addMockUsers } from './user.js';

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBox = document.getElementById('login-box');
    const registerBox = document.getElementById('register-box');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');

    // Alternar entre login e registro
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginBox.style.display = 'none';
        registerBox.style.display = 'block';
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerBox.style.display = 'none';
        loginBox.style.display = 'block';
    });

    // Cadastro de novo usuário
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;

        if (registerUser(name, email, password)) {
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            registerBox.style.display = 'none';
            loginBox.style.display = 'block';
            registerForm.reset();
        } else {
            alert('Este email já está cadastrado!');
        }
    });

    // Login do usuário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        const user = authenticateUser(email, password);
        
        if (user) {
            // Salva o usuário na sessão atual
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            // Redireciona para o jogo
            window.location.href = 'index.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    });
    addMockUsers();
});

// Função para registrar novo usuário
function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Verifica se o email já existe
    if (users.some(user => user.email === email)) {
        return false;
    }
    
    // Cria o novo usuário
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // Na prática, você deve usar hash de senha em um sistema real
        createdAt: new Date().toISOString(),
        scores: {
            easy: 0,
            medium: 0,
            hard: 0
        }
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

// Função para autenticar usuário
function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email && user.password === password);
}
