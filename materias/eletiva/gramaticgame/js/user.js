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

function addMockUsers() {
    const mockUsers = [
        { id: 1, name: "Campeão Master", scores: { easy: 1200, medium: 950, hard: 800 }, lastPlayed: "2023-06-20T09:45:00Z" },
        { id: 2, name: "Gênio Quiz", scores: { easy: 1100, medium: 850, hard: 750 }, lastPlayed: "2023-06-19T14:30:00Z" },
        { id: 3, name: "Sabichão", scores: { easy: 1000, medium: 800, hard: 700 }, lastPlayed: "2023-06-18T11:20:00Z" },
        { id: 4, name: "Perguntador", scores: { easy: 950, medium: 750, hard: 650 }, lastPlayed: "2023-06-17T16:15:00Z" },
        { id: 5, name: "Curioso", scores: { easy: 900, medium: 700, hard: 600 }, lastPlayed: "2023-06-16T13:10:00Z" },
        { id: 6, name: "Aprendiz", scores: { easy: 850, medium: 650, hard: 550 }, lastPlayed: "2023-06-15T10:05:00Z" },
        { id: 7, name: "Iniciante", scores: { easy: 800, medium: 600, hard: 500 }, lastPlayed: "2023-06-14T08:00:00Z" },
        { id: 8, name: "Novato", scores: { easy: 750, medium: 550, hard: 450 }, lastPlayed: "2023-06-13T17:55:00Z" },
        { id: 9, name: "Explorador", scores: { easy: 700, medium: 500, hard: 400 }, lastPlayed: "2023-06-12T12:50:00Z" },
        { id: 10, name: "Visitante", scores: { easy: 650, medium: 450, hard: 350 }, lastPlayed: "2023-06-11T09:45:00Z" }
    ];

    // Verifica se já existem usuários no localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Filtra para adicionar apenas usuários que não existem ainda (por ID)
    const newUsers = mockUsers.filter(mockUser => 
        !existingUsers.some(existingUser => existingUser.id === mockUser.id)
    );

    if (newUsers.length > 0) {
        localStorage.setItem('users', JSON.stringify([...existingUsers, ...newUsers]));
        console.log(`${newUsers.length} usuários fictícios adicionados ao leaderboard.`);
    } else {
        console.log('Todos os usuários fictícios já existem no leaderboard.');
    }
}
// Chame esta função uma vez para adicionar os usuários fictícios
addMockUsers();