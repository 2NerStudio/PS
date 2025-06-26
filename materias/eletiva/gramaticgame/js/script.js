document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'http://localhost:3000/api/v1';
    const token = sessionStorage.getItem('token');
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    // Verifica se o usuário está logado
    if (!token || !currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Elementos da UI
    const userProfile = document.getElementById('user-profile');
    const leaderboardTable = document.getElementById('leaderboard-table');
    const gameHistoryList = document.getElementById('game-history');
    const difficultySelect = document.getElementById('difficulty');
    const startGameBtn = document.getElementById('start-game');
    const logoutBtn = document.getElementById('logout');

    // Carrega dados do usuário e leaderboard
    async function loadUserData() {
        try {
            // Carrega perfil do usuário
            const userResponse = await fetch(`${API_BASE_URL}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const userData = await userResponse.json();
            
            if (!userResponse.ok) {
                throw new Error(userData.error || 'Failed to load user data');
            }
            
            // Atualiza UI com dados do usuário
            userProfile.innerHTML = `
                <h2>${userData.data.user.name}</h2>
                <p>Email: ${userData.data.user.email}</p>
                <h3>Melhores Pontuações</h3>
                <ul>
                    <li>Fácil: ${userData.data.user.scores.easy || 0}</li>
                    <li>Médio: ${userData.data.user.scores.medium || 0}</li>
                    <li>Difícil: ${userData.data.user.scores.hard || 0}</li>
                </ul>
            `;
            
            // Exibe histórico de jogos
            if (userData.data.gameHistory && userData.data.gameHistory.length > 0) {
                gameHistoryList.innerHTML = userData.data.gameHistory.map(game => `
                    <li>
                        ${game.difficulty}: ${game.score} pontos 
                        (${new Date(game.playedAt).toLocaleDateString()})
                    </li>
                `).join('');
            } else {
                gameHistoryList.innerHTML = '<li>Nenhum jogo registrado ainda</li>';
            }
            
            // Carrega leaderboard
            const leaderboardResponse = await fetch(`${API_BASE_URL}/users/leaderboard`);
            const leaderboardData = await leaderboardResponse.json();
            
            if (!leaderboardResponse.ok) {
                throw new Error(leaderboardData.error || 'Failed to load leaderboard');
            }
            
            // Preenche tabela de leaderboard
            leaderboardTable.innerHTML = leaderboardData.data.map((user, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.scores.easy || 0}</td>
                    <td>${user.scores.medium || 0}</td>
                    <td>${user.scores.hard || 0}</td>
                    <td>${user.totalScore || 0}</td>
                </tr>
            `).join('');
            
        } catch (err) {
            console.error('Error loading user data:', err);
            alert('Erro ao carregar dados do usuário');
        }
    }
    
    // Inicia um novo jogo
    startGameBtn.addEventListener('click', function() {
        const difficulty = difficultySelect.value;
        sessionStorage.setItem('gameDifficulty', difficulty);
        window.location.href = 'game.html';
    });
    
    // Logout
    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
    
    // Carrega os dados quando a página é aberta
    loadUserData();
});