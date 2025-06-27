function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

function getUserRanking() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users
        .map(user => ({
            id: user.id,
            name: user.name,
            score: (user.scores.easy || 0) + (user.scores.medium || 0) + (user.scores.hard || 0),
            easy: user.scores.easy || 0,
            medium: user.scores.medium || 0,
            hard: user.scores.hard || 0,
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
        // Atualiza somando a pontuação
        users[userIndex].scores[difficulty] = (users[userIndex].scores[difficulty] || 0) + score;
        users[userIndex].lastPlayed = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));
        
        currentUser.scores[difficulty] = users[userIndex].scores[difficulty];
        currentUser.lastPlayed = users[userIndex].lastPlayed;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
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
        
        currentUser.lastPlayed = users[userIndex].lastPlayed;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    }
    
    return false;
}