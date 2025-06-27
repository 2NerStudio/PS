// Funções relacionadas ao usuário
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

function getUserRanking() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users
        .map(user => ({
            id: user.id,
            name: user.name,
            score: (user.scores.easy * 1) + (user.scores.medium * 2) + (user.scores.hard * 3),
            easy: user.scores.easy,
            medium: user.scores.medium,
            hard: user.scores.hard,
            lastPlayed: user.lastPlayed || null
        }))
        .sort((a, b) => b.score - a.score);
}

function updateUserScore(difficulty, score) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = getCurrentUser();
    
    if (!currentUser) return false;
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        // Atualiza a pontuação se for maior que a anterior
        if (score > users[userIndex].scores[difficulty]) {
            users[userIndex].scores[difficulty] = score;
            localStorage.setItem('users', JSON.stringify(users));
            
            // Atualiza também na sessão atual
            currentUser.scores[difficulty] = score;
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        return true;
    }
    
    return false;
}

function updateLastPlayed() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = getCurrentUser();
    
    if (!currentUser) return false;
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex].lastPlayed = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));
        
        // Atualiza também na sessão atual
        currentUser.lastPlayed = users[userIndex].lastPlayed;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    }
    
    return false;
}

// user.js
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

    // Verifica se já existem usuários no localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Filtra para adicionar apenas usuários que não existem ainda (por email)
    const newUsers = mockUsers.filter(mockUser => 
        !existingUsers.some(existingUser => existingUser.email === mockUser.email)
    );

    if (newUsers.length > 0) {
        localStorage.setItem('users', JSON.stringify([...existingUsers, ...newUsers]));
        console.log(`${newUsers.length} usuários fictícios adicionados ao leaderboard.`);
    } else {
        console.log('Todos os usuários fictícios já existem no leaderboard.');
    }
}