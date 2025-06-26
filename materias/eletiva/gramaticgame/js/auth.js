// auth.js - Versão corrigida e simplificada (sem back-end)
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
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

    // Registrar novo usuário
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;

        if (!name || !email || !password) {
            alert('Por favor, preencha todos os campos');
            return;
        }

        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Verifica se o usuário já existe
        if (users.some(user => user.email === email)) {
            alert('Este email já está cadastrado');
            return;
        }

        // Cria novo usuário
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // Em um sistema real, isso seria hasheado
            scores: {
                easy: 0,
                medium: 0,
                hard: 0
            },
            createdAt: new Date().toISOString(),
            lastPlayed: null
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        alert('Cadastro realizado com sucesso! Faça login para continuar.');
        registerBox.style.display = 'none';
        loginBox.style.display = 'block';
        registerForm.reset();
    });

    // Login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            alert('Email ou senha incorretos');
            return;
        }

        // Armazena o usuário na sessão
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redireciona para a página principal
        window.location.href = 'index.html';
    });

    // Verifica se já está logado ao carregar a página
    if (getCurrentUser()) {
        window.location.href = 'index.html';
    }
});

// Função auxiliar para pegar usuário atual
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}