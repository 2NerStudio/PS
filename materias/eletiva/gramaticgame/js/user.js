function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

function updateUserAnswers(difficulty, questionIds) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = getCurrentUser();
    
    if (!currentUser) return false;
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        // Adiciona novas questões respondidas corretamente (evitando duplicatas)
        questionIds.forEach(id => {
            if (!users[userIndex].correctAnswers[difficulty].includes(id)) {
                users[userIndex].correctAnswers[difficulty].push(id);
            }
        });
        
        users[userIndex].lastPlayed = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));
        
        // Atualiza sessionStorage
        currentUser.correctAnswers = users[userIndex].correctAnswers;
        currentUser.lastPlayed = users[userIndex].lastPlayed;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        return true;
    }
    
    return false;
}

function getUserRanking() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users
        .map(user => ({
            id: user.id,
            name: user.name,
            score: (user.correctAnswers.easy.length || 0) * 1 + 
                  (user.correctAnswers.medium.length || 0) * 2 + 
                  (user.correctAnswers.hard.length || 0) * 3,
            easy: user.correctAnswers.easy.length || 0,
            medium: user.correctAnswers.medium.length || 0,
            hard: user.correctAnswers.hard.length || 0
        }))
        .sort((a, b) => b.score - a.score);
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