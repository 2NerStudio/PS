// script.js - Versão completa sem back-end
document.addEventListener('DOMContentLoaded', function() {
    // Verifica autenticação
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Elementos da UI
    const userNameElement = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logout-btn');
    const profileBtn = document.getElementById('profile-btn');
    const showLeaderboardBtn = document.getElementById('show-leaderboard-btn');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    const difficultyButtons = document.querySelectorAll('.btn-difficulty');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const profileContainer = document.getElementById('profile-container');
    const backFromProfileBtn = document.getElementById('back-from-profile-btn');

    // Mostra informações do usuário
    if (userNameElement) {
        userNameElement.textContent = currentUser.name;
    }

    // Event Listeners
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }

    if (profileBtn) {
        profileBtn.addEventListener('click', showProfile);
    }

    if (showLeaderboardBtn) {
        showLeaderboardBtn.addEventListener('click', showLeaderboard);
    }

    if (backToMenuBtn) {
        backToMenuBtn.addEventListener('click', () => {
            document.getElementById('leaderboard-screen').style.display = 'none';
            document.getElementById('start-screen').style.display = 'block';
        });
    }

    if (backFromProfileBtn) {
        backFromProfileBtn.addEventListener('click', () => {
            document.getElementById('profile-screen').style.display = 'none';
            document.getElementById('start-screen').style.display = 'block';
        });
    }

    if (difficultyButtons) {
        difficultyButtons.forEach(button => {
            button.addEventListener('click', startGame);
        });
    }

    // Funções do jogo
    function startGame(e) {
        const difficulty = e.target.dataset.difficulty;
        sessionStorage.setItem('currentDifficulty', difficulty);
        
        // Esconde a tela inicial e mostra a tela do jogo
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        
        // Inicializa o jogo (esta parte seria manipulada pelo auth.js)
    }

    function showProfile() {
        const user = getCurrentUser();
        if (!user) return;

        const totalScore = (user.scores.easy * 1) + (user.scores.medium * 2) + (user.scores.hard * 3);
        
        let level = "Iniciante";
        let levelClass = "level-badge";
        
        if (totalScore >= 100) {
            level = "Mestre";
            levelClass += " gold";
        } else if (totalScore >= 50) {
            level = "Avançado";
            levelClass += " silver";
        } else if (totalScore >= 20) {
            level = "Intermediário";
            levelClass += " bronze";
        }
        
        profileContainer.innerHTML = `
            <div class="profile-header">
                <div class="profile-avatar">${user.name.charAt(0).toUpperCase()}</div>
                <div>
                    <h2>${user.name} <span class="${levelClass}">${level}</span></h2>
                    <p>Jogador desde ${new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            
            <div class="profile-stats">
                <div class="stat-card">
                    <div class="stat-value">${totalScore}</div>
                    <div class="stat-label">Pontos totais</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${user.scores.easy + user.scores.medium + user.scores.hard}</div>
                    <div class="stat-label">Questões acertadas</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${Math.floor(totalScore / 5)}</div>
                    <div class="stat-label">Partidas jogadas</div>
                </div>
            </div>
            
            <div class="progress-section">
                <h3>Desempenho por Nível</h3>
                
                <div class="progress-title">
                    <span>Fácil <small>(1 ponto por acerto)</small></span>
                    <span>${user.scores.easy} acertos</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${Math.min(100, (user.scores.easy / 20) * 100)}%"></div>
                </div>
                
                <div class="progress-title">
                    <span>Médio <small>(2 pontos por acerto)</small></span>
                    <span>${user.scores.medium} acertos</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${Math.min(100, (user.scores.medium / 15) * 100)}%"></div>
                </div>
                
                <div class="progress-title">
                    <span>Difícil <small>(3 pontos por acerto)</small></span>
                    <span>${user.scores.hard} acertos</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${Math.min(100, (user.scores.hard / 10) * 100)}%"></div>
                </div>
            </div>
        `;

        // Mostra a tela de perfil
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('profile-screen').style.display = 'block';
    }

    function showLeaderboard() {
        const ranking = getUserRanking();
        const currentUser = getCurrentUser();
        
        leaderboardContainer.innerHTML = '';
        
        if (ranking.length === 0) {
            leaderboardContainer.innerHTML = '<p>Nenhum jogador registrado ainda.</p>';
            return;
        }
        
        ranking.forEach((user, index) => {
            const leaderboardItem = document.createElement('div');
            leaderboardItem.className = 'leaderboard-item';
            
            if (currentUser && user.id === currentUser.id) {
                leaderboardItem.classList.add('current-user');
            }
            
            let trophyIcon = '';
            if (index === 0) trophyIcon = '<span class="trophy-icon gold-icon">🥇</span>';
            else if (index === 1) trophyIcon = '<span class="trophy-icon silver-icon">🥈</span>';
            else if (index === 2) trophyIcon = '<span class="trophy-icon bronze-icon">🥉</span>';
            
            const lastPlayed = user.lastPlayed 
                ? new Date(user.lastPlayed).toLocaleDateString() 
                : 'Nunca jogou';
            
            const scoreDetails = `Fácil: ${user.easy} | Médio: ${user.medium} | Difícil: ${user.hard}`;
            
            leaderboardItem.innerHTML = `
                <div class="leaderboard-position">${index + 1}</div>
                <div class="leaderboard-name">${user.name} ${trophyIcon}</div>
                <div class="leaderboard-score">
                    ${user.score} pts
                    <small>${scoreDetails}</small>
                    <small>Último jogo: ${lastPlayed}</small>
                </div>
            `;
            
            leaderboardContainer.appendChild(leaderboardItem);
        });

        // Mostra a tela de leaderboard
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('leaderboard-screen').style.display = 'block';
    }

    function logoutUser() {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }

    // Funções auxiliares
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
                lastPlayed: user.lastPlayed || null,
                createdAt: user.createdAt
            }))
            .sort((a, b) => {
                if (b.score !== a.score) return b.score - a.score;
                return new Date(a.createdAt) - new Date(b.createdAt);
            });
    }
});