const API_URL = 'http://localhost:5000/api/v1/users';

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

function getToken() {
    return sessionStorage.getItem('token');
}

async function updateUserScore(difficulty, score) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;

    try {
        const response = await fetch(`${API_URL}/scores`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({ difficulty, score })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update scores');
        }

        // Atualiza o usuário na sessão
        const updatedUser = { ...currentUser, scores: data.data };
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
        
        return true;
    } catch (err) {
        console.error('Error updating scores:', err);
        return false;
    }
}

async function getUserRanking() {
    try {
        const response = await fetch(`${API_URL}/leaderboard`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch leaderboard');
        }

        return data.data;
    } catch (err) {
        console.error('Error fetching leaderboard:', err);
        return [];
    }
}

function updateLastPlayed() {
    // Esta função agora é tratada no backend quando atualizamos os scores
    return true;
}

export { getCurrentUser, updateUserScore, getUserRanking, updateLastPlayed };

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