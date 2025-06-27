document.addEventListener('DOMContentLoaded', function() {
    // Adiciona usuários fictícios apenas uma vez
    if (!localStorage.getItem('mockUsersAdded')) {
        addMockUsers();
        localStorage.setItem('mockUsersAdded', 'true');
    }

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
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    });
});

function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(user => user.email === email)) {
        return false;
    }
    
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
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

function authenticateUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email && user.password === password);
}

function addMockUsers() {
    const mockUsers = [
        { 
            id: "1", 
            name: "Campeão Master", 
            email: "campeao@exemplo.com", 
            password: "123456", 
            createdAt: "2023-01-01T00:00:00Z",
            scores: { easy: 12, medium: 10, hard: 8 }, 
            lastPlayed: "2023-06-20T09:45:00Z" 
        },
        { 
            id: "2", 
            name: "Gênio Quiz", 
            email: "genio@exemplo.com", 
            password: "123456",
            createdAt: "2023-01-02T00:00:00Z",
            scores: { easy: 11, medium: 9, hard: 7 }, 
            lastPlayed: "2023-06-19T14:30:00Z" 
        },
        { 
            id: "3", 
            name: "Sabichão", 
            email: "sabichao@exemplo.com", 
            password: "123456",
            createdAt: "2023-01-03T00:00:00Z",
            scores: { easy: 10, medium: 8, hard: 6 }, 
            lastPlayed: "2023-06-18T11:20:00Z" 
        },
        { 
            id: "4", 
            name: "Perguntador", 
            email: "perguntador@exemplo.com", 
            password: "123456",
            createdAt: "2023-01-04T00:00:00Z",
            scores: { easy: 9, medium: 7, hard: 5 }, 
            lastPlayed: "2023-06-17T16:15:00Z" 
        },
        { 
            id: "5", 
            name: "Curioso", 
            email: "curioso@exemplo.com", 
            password: "123456",
            createdAt: "2023-01-05T00:00:00Z",
            scores: { easy: 8, medium: 6, hard: 4 }, 
            lastPlayed: "2023-06-16T13:10:00Z" 
        },
        { 
            id: "6", 
            name: "Aprendiz", 
            email: "aprendiz@exemplo.com", 
            password: "123456",
            createdAt: "2023-01-06T00:00:00Z",
            scores: { easy: 7, medium: 5, hard: 3 }, 
            lastPlayed: "2023-06-15T10:05:00Z" 
        },
        { 
            id: "7", 
            name: "Iniciante", 
            email: "iniciante@exemplo.com", 
            password: "123456",
            createdAt: "2023-01-07T00:00:00Z",
            scores: { easy: 6, medium: 4, hard: 2 }, 
            lastPlayed: "2023-06-14T08:00:00Z" 
        },
        { 
            id: "8", 
            name: "Novato", 
            email: "novato@exemplo.com", 
            password: "123456",
            createdAt: "2023-01-08T00:00:00Z",
            scores: { easy: 5, medium: 3, hard: 1 }, 
            lastPlayed: "2023-06-13T17:55:00Z" 
        },
        { 
            id: "9", 
            name: "Explorador", 
            email: "explorador@exemplo.com", 
            password: "123456",
            createdAt: "2023-01-09T00:00:00Z",
            scores: { easy: 4, medium: 2, hard: 0 }, 
            lastPlayed: "2023-06-12T12:50:00Z" 
        },
        { 
            id: "10", 
            name: "Visitante", 
            email: "visitante@exemplo.com", 
            password: "123456",
            createdAt: "2023-01-10T00:00:00Z",
            scores: { easy: 3, medium: 1, hard: 0 }, 
            lastPlayed: "2023-06-11T09:45:00Z" 
        }
    ];

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const existingEmails = existingUsers.map(user => user.email);
    const usersToAdd = mockUsers.filter(user => !existingEmails.includes(user.email));
    
    if (usersToAdd.length > 0) {
        localStorage.setItem('users', JSON.stringify([...existingUsers, ...usersToAdd]));
    }
}