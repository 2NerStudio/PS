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
    let questions = [];
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

    // Event Listeners
    document.querySelectorAll('.btn-difficulty').forEach(button => {
        button.addEventListener('click', startGame);
    });

    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartGame);

    // Funções do jogo
    function startGame(e) {
        currentDifficulty = e.target.dataset.difficulty;
        questions = [...questionsDatabase[currentDifficulty]];
        shuffleArray(questions); // Embaralha as perguntas
        score = 0;
        currentQuestionIndex = 0;
        
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        resultScreen.style.display = 'none';
        
        showQuestion();
    }

    function showQuestion() {
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        const questionNo = currentQuestionIndex + 1;
        const totalQuestions = questions.length;
        
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
        const correctIndex = questions[currentQuestionIndex].answer;
        
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
        
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }

    function showResults() {
        gameScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        
        // Atualiza a pontuação do usuário
        updateUserScore(currentDifficulty, score);
        
        finalScoreElement.textContent = score;
        totalQuestionsElement.textContent = questions.length;
        
        const percentage = (score / questions.length) * 100;
        
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
    }

    function restartGame() {
        resultScreen.style.display = 'none';
        startScreen.style.display = 'block';
    }

    function updateProgress() {
        const progress = ((currentQuestionIndex) / questions.length) * 100;
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