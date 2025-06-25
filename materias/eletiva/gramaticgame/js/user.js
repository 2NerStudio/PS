// Funções relacionadas ao usuário
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
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

function getUserRanking() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users
        .map(user => ({
            name: user.name,
            score: user.scores.easy + user.scores.medium + user.scores.hard
        }))
        .sort((a, b) => b.score - a.score);
}