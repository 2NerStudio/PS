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

// Adicione esta função para registrar quando um usuário joga
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