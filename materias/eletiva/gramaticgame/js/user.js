// user.js - Versão sem back-end

// Função para obter o usuário atual da sessionStorage
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

// Atualiza a pontuação do usuário no localStorage e sessionStorage
function updateUserScore(difficulty, score) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = getCurrentUser();
    
    if (!currentUser) return false;
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        // Atualiza apenas se a nova pontuação for maior que a anterior
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

// Obtém o ranking de todos os usuários
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
            lastPlayed: user.lastPlayed || null,
            createdAt: user.createdAt
        }))
        .sort((a, b) => {
            // Ordena por score (decrescente), depois por data de criação (mais antigos primeiro)
            if (b.score !== a.score) return b.score - a.score;
            return new Date(a.createdAt) - new Date(b.createdAt);
        });
}

// Atualiza a data da última jogada
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

// Exporta as funções para uso em outros arquivos
export { getCurrentUser, updateUserScore, getUserRanking, updateLastPlayed };