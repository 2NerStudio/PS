document.addEventListener('DOMContentLoaded', function() {
    const API_BASE_URL = 'http://localhost:3000/api/v1';
    const token = sessionStorage.getItem('token');
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const difficulty = sessionStorage.getItem('gameDifficulty') || 'easy';
    
    // Verifica se o usuário está logado
    if (!token || !currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Elementos da UI do jogo
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const submitBtn = document.getElementById('submit-answer');
    const gameOverModal = document.getElementById('game-over-modal');
    const finalScoreElement = document.getElementById('final-score');
    const saveScoreBtn = document.getElementById('save-score');
    const backToMenuBtn = document.getElementById('back-to-menu');
    
    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60; // 60 segundos por jogo
    let timer;
    let questions = [];
    
    // Carrega perguntas da API
    async function loadQuestions() {
        try {
            const response = await fetch(`${API_BASE_URL}/questions?difficulty=${difficulty}`);
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to load questions');
            }
            
            questions = data.data;
            showQuestion();
            startTimer();
        } catch (err) {
            console.error('Error loading questions:', err);
            alert('Erro ao carregar perguntas');
        }
    }
    
    // Mostra a pergunta atual
    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endGame();
            return;
        }
        
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.text;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'option-btn';
            button.onclick = () => selectOption(index);
            optionsContainer.appendChild(button);
        });
    }
    
    // Seleciona uma opção
    function selectOption(optionIndex) {
        const question = questions[currentQuestionIndex];
        const options = optionsContainer.querySelectorAll('.option-btn');
        
        // Remove seleção anterior
        options.forEach(btn => btn.classList.remove('selected'));
        
        // Marca a opção selecionada
        options[optionIndex].classList.add('selected');
    }
    
    // Submete a resposta
    submitBtn.addEventListener('click', function() {
        const selectedOption = optionsContainer.querySelector('.selected');
        
        if (!selectedOption) {
            alert('Selecione uma opção antes de enviar!');
            return;
        }
        
        const optionIndex = Array.from(optionsContainer.children).indexOf(selectedOption);
        const question = questions[currentQuestionIndex];
        
        // Verifica se a resposta está correta
        if (optionIndex === question.correctAnswer) {
            score += difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
            scoreElement.textContent = `Pontuação: ${score}`;
        }
        
        // Próxima pergunta
        currentQuestionIndex++;
        showQuestion();
    });
    
    // Temporizador do jogo
    function startTimer() {
        timerElement.textContent = `Tempo: ${timeLeft}s`;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Tempo: ${timeLeft}s`;
            
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }
    
    // Finaliza o jogo
    function endGame() {
        clearInterval(timer);
        finalScoreElement.textContent = score;
        gameOverModal.style.display = 'block';
    }
    
    // Salva a pontuação
    saveScoreBtn.addEventListener('click', async function() {
        try {
            const response = await fetch(`${API_BASE_URL}/users/scores`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    difficulty,
                    score
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to save score');
            }
            
            alert('Pontuação salva com sucesso!');
            gameOverModal.style.display = 'none';
            window.location.href = 'index.html';
        } catch (err) {
            console.error('Error saving score:', err);
            alert('Erro ao salvar pontuação');
        }
    });
    
    // Volta ao menu
    backToMenuBtn.addEventListener('click', function() {
        gameOverModal.style.display = 'none';
        window.location.href = 'index.html';
    });
    
    // Inicia o jogo
    loadQuestions();
});