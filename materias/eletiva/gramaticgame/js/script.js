
// Verifica autenticação ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = getCurrentUser();
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const logoutBtn = document.getElementById('logout-btn');

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Mostra informações do usuário
    userInfo.style.display = 'block';
    userName.textContent = currentUser.name;

    // Logout
    logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    // Inicializa o jogo após verificar autenticação
    initializeGame();
});

function initializeGame() {
    // Variáveis do jogo
    let currentDifficulty = '';
    let selectedQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;

    // Elementos do DOM
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('next-btn');
    const scoreElement = document.getElementById('score');
    const progressBar = document.getElementById('progress-bar');
    const finalScoreElement = document.getElementById('final-score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const resultMessageElement = document.getElementById('result-message');
    const trophyElement = document.getElementById('trophy');
    const restartButton = document.getElementById('restart-btn');
    const leaderboardScreen = document.getElementById('leaderboard-screen');
    const showLeaderboardBtn = document.getElementById('show-leaderboard-btn');
    const backToMenuBtn = document.getElementById('back-to-menu-btn');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const profileScreen = document.getElementById('profile-screen');
    const profileBtn = document.getElementById('profile-btn');
    const backFromProfileBtn = document.getElementById('back-from-profile-btn');
    const profileContainer = document.getElementById('profile-container');

    // Adicione os event listeners:
    profileBtn.addEventListener('click', showProfile);
    backFromProfileBtn.addEventListener('click', () => {
        profileScreen.style.display = 'none';
        startScreen.style.display = 'block';
    });

    // Adicione esta função para mostrar o perfil:
    function showProfile() {
        startScreen.style.display = 'none';
        profileScreen.style.display = 'block';
        
        const user = getCurrentUser();
        if (!user) return;
        
        // Calcula a pontuação total somando todos os níveis
        const totalScore = (user.scores.easy || 0) + (user.scores.medium || 0) + (user.scores.hard || 0);
            
        // Determina o nível do jogador
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
    }
    showLeaderboardBtn.addEventListener('click', showLeaderboard);
    backToMenuBtn.addEventListener('click', () => {
        leaderboardScreen.style.display = 'none';
        startScreen.style.display = 'block';
    });

    function showLeaderboard() {
        startScreen.style.display = 'none';
        leaderboardScreen.style.display = 'block';
        
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
            
            if (currentUser && user.name === currentUser.name) {
                leaderboardItem.classList.add('current-user');
            }
            
            let trophyIcon = '';
            if (index === 0) trophyIcon = '<span class="trophy-icon gold-icon">🥇</span>';
            else if (index === 1) trophyIcon = '<span class="trophy-icon silver-icon">🥈</span>';
            else if (index === 2) trophyIcon = '<span class="trophy-icon bronze-icon">🥉</span>';
            
            // Adiciona detalhes das pontuações por nível
            const scoreDetails = `(Fácil: ${user.easy} | Médio: ${user.medium} | Difícil: ${user.hard})`;
            
            leaderboardItem.innerHTML = `
                <div class="leaderboard-position">${index + 1}</div>
                <div class="leaderboard-name">${user.name} ${trophyIcon}</div>
                <div class="leaderboard-score">${user.score} pts 
                </div>
            `;
            
            leaderboardContainer.appendChild(leaderboardItem);
        });
    }

    // Event Listeners
    document.querySelectorAll('.btn-difficulty').forEach(button => {
        button.addEventListener('click', startGame);
    });

    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartGame);

    // Funções do jogo
    function startGame(e) {
        currentDifficulty = e.target.dataset.difficulty;
        
        // Seleciona 5 questões aleatórias da dificuldade escolhida
        selectedQuestions = selectRandomQuestions(currentDifficulty, 5);
        
        score = 0;
        currentQuestionIndex = 0;
        
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        resultScreen.style.display = 'none';
        
        showQuestion();
    }

    // Seleciona n questões aleatórias de uma dificuldade
    function selectRandomQuestions(difficulty, count) {
        const allQuestions = [...questionsDatabase[difficulty]];
        const shuffled = shuffleArray(allQuestions);
        return shuffled.slice(0, count);
    }

    function showQuestion() {
        resetState();
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        const questionNo = currentQuestionIndex + 1;
        const totalQuestions = selectedQuestions.length;
        
        questionElement.innerHTML = `<span>${questionNo}/${totalQuestions}</span>. ${currentQuestion.question}`;
        
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerHTML = option;
            button.classList.add('btn-option');
            button.dataset.index = index;
            button.addEventListener('click', selectOption);
            optionsContainer.appendChild(button);
        });
        
        updateProgress();
    }

    function resetState() {
        feedbackElement.textContent = '';
        feedbackElement.className = 'feedback';
        nextButton.style.display = 'none';
        
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
    }

    function selectOption(e) {
        selectedOption = e.target;
        const selectedIndex = parseInt(selectedOption.dataset.index);
        const correctIndex = selectedQuestions[currentQuestionIndex].answer;
        
        // Desabilita todas as opções
        document.querySelectorAll('.btn-option').forEach(button => {
            button.disabled = true;
            button.style.cursor = 'not-allowed';
        });
        
        // Marca a opção correta como verde
        document.querySelector(`.btn-option[data-index="${correctIndex}"]`).style.backgroundColor = '#d4edda';
        document.querySelector(`.btn-option[data-index="${correctIndex}"]`).style.borderColor = '#c3e6cb';
        
        if (selectedIndex === correctIndex) {
            selectedOption.style.backgroundColor = '#d4edda';
            selectedOption.style.borderColor = '#c3e6cb';
            feedbackElement.textContent = 'Resposta correta!';
            feedbackElement.className = 'feedback correct';
            score++;
            scoreElement.textContent = score;
        } else {
            selectedOption.style.backgroundColor = '#f8d7da';
            selectedOption.style.borderColor = '#f5c6cb';
            feedbackElement.textContent = 'Resposta incorreta!';
            feedbackElement.className = 'feedback incorrect';
        }
        
        nextButton.style.display = 'block';
    }

    function nextQuestion() {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        gameScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        
        // Atualiza a pontuação do usuário (agora soma em vez de substituir)
        updateUserScore(currentDifficulty, score);
        
        finalScoreElement.textContent = score;
        totalQuestionsElement.textContent = selectedQuestions.length;
        
        const percentage = (score / selectedQuestions.length) * 100;
        
        if (percentage >= 80) {
            resultMessageElement.textContent = 'Excelente! Você domina a gramática!';
            trophyElement.textContent = '🏆';
            trophyElement.className = 'trophy gold';
        } else if (percentage >= 50) {
            resultMessageElement.textContent = 'Bom trabalho! Continue praticando!';
            trophyElement.textContent = '🥈';
            trophyElement.className = 'trophy silver';
        } else {
            resultMessageElement.textContent = 'Estude mais gramática e tente novamente!';
            trophyElement.textContent = '🥉';
            trophyElement.className = 'trophy bronze';
        }
        
        // Atualiza o último jogo jogado
        updateLastPlayed();
    }

    function restartGame() {
        resultScreen.style.display = 'none';
        startScreen.style.display = 'block';
    }

    function updateProgress() {
        const progress = ((currentQuestionIndex) / selectedQuestions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Função para embaralhar array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Funções de usuário (de user.js)
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
}

function updateUserScore(difficulty, score) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = getCurrentUser();
    
    if (!currentUser) return false;
    
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        // Atualiza a pontuação somando ao invés de substituir
        users[userIndex].scores[difficulty] += score;
        localStorage.setItem('users', JSON.stringify(users));
        
        // Atualiza também na sessão atual
        currentUser.scores[difficulty] = users[userIndex].scores[difficulty];
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
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

