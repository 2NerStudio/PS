document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo (pode ser carregado de um JSON)
    const exercicios = [
        {
            id: 1,
            titulo: "Operações com Frações",
            topico: "fracoes",
            dificuldade: "facil",
            enunciado: "Qual é o resultado da seguinte operação: 1/2 + 1/4?",
            opcoes: [
                { texto: "2/6", correta: false },
                { texto: "3/4", correta: true },
                { texto: "1/6", correta: false },
                { texto: "1/4", correta: false }
            ],
            explicacao: "Para somar frações, precisamos ter o mesmo denominador. 1/2 é igual a 2/4. 2/4 + 1/4 = 3/4."
        },
        {
            id: 2,
            titulo: "Equação do 1º Grau",
            topico: "equacoes",
            dificuldade: "medio",
            enunciado: "Resolva a equação: 2x + 5 = 15",
            opcoes: [
                { texto: "x = 5", correta: true },
                { texto: "x = 10", correta: false },
                { texto: "x = 7.5", correta: false },
                { texto: "x = 20", correta: false }
            ],
            explicacao: "Subtraia 5 dos dois lados: 2x = 10. Depois divida por 2: x = 5."
        }
    ];

    const listaExercicios = document.querySelector('.lista-exercicios');
    const filtroDificuldade = document.getElementById('dificuldade');
    const filtroTopico = document.getElementById('topico');
    const progressoBar = document.querySelector('.progresso-bar');
    const pontuacaoElement = document.querySelector('.pontuacao');

    let exerciciosConcluidos = 0;
    let totalExercicios = 0;

    // Carrega os exercícios
    function carregarExercicios() {
        listaExercicios.innerHTML = '';
        const dificuldade = filtroDificuldade.value;
        const topico = filtroTopico.value;
        
        const exerciciosFiltrados = exercicios.filter(ex => {
            return (dificuldade === 'todos' || ex.dificuldade === dificuldade) &&
                   (topico === 'todos' || ex.topico === topico);
        });
        
        totalExercicios = exerciciosFiltrados.length;
        atualizarProgresso();
        
        exerciciosFiltrados.forEach(exercicio => {
            const card = document.createElement('div');
            card.className = 'exercicio-card';
            card.dataset.id = exercicio.id;
            card.dataset.topico = exercicio.topico;
            card.dataset.dificuldade = exercicio.dificuldade;
            
            let opcoesHTML = '';
            exercicio.opcoes.forEach((opcao, index) => {
                opcoesHTML += `
                    <label class="opcao-resposta">
                        <input type="radio" name="exercicio-${exercicio.id}" value="${index}">
                        ${opcao.texto}
                    </label>
                `;
            });
            
            card.innerHTML = `
                <h3>${exercicio.titulo}</h3>
                <span class="dificuldade ${exercicio.dificuldade}">
                    ${exercicio.dificuldade.charAt(0).toUpperCase() + exercicio.dificuldade.slice(1)}
                </span>
                <p class="enunciado">${exercicio.enunciado}</p>
                <div class="opcoes-resposta">${opcoesHTML}</div>
                <div class="feedback"></div>
                <button class="btn-verificar">Verificar Resposta</button>
            `;
            
            listaExercicios.appendChild(card);
        });
        
        // Adiciona eventos aos botões
        document.querySelectorAll('.btn-verificar').forEach(btn => {
            btn.addEventListener('click', verificarResposta);
        });
    }
    
    // Verifica a resposta do exercício
    function verificarResposta(event) {
        const btn = event.target;
        const card = btn.closest('.exercicio-card');
        const id = parseInt(card.dataset.id);
        const exercicio = exercicios.find(ex => ex.id === id);
        const opcaoSelecionada = card.querySelector('input[type="radio"]:checked');
        const feedback = card.querySelector('.feedback');
        
        if (!opcaoSelecionada) {
            feedback.textContent = "Selecione uma resposta antes de verificar!";
            feedback.style.display = 'block';
            feedback.className = 'feedback incorreto';
            return;
        }
        
        const index = parseInt(opcaoSelecionada.value);
        const opcao = exercicio.opcoes[index];
        
        if (opcao.correta) {
            feedback.innerHTML = `
                <strong>Correto!</strong> ${exercicio.explicacao}
            `;
            feedback.className = 'feedback correto';
            
            if (!card.classList.contains('concluido')) {
                card.classList.add('concluido');
                exerciciosConcluidos++;
                atualizarProgresso();
            }
        } else {
            feedback.innerHTML = `
                <strong>Incorreto.</strong> ${exercicio.explicacao}
            `;
            feedback.className = 'feedback incorreto';
        }
        
        feedback.style.display = 'block';
    }
    
    // Atualiza a barra de progresso
    function atualizarProgresso() {
        const percentual = totalExercicios > 0 ? (exerciciosConcluidos / totalExercicios) * 100 : 0;
        progressoBar.style.width = `${percentual}%`;
        pontuacaoElement.textContent = `${exerciciosConcluidos}/${totalExercicios} exercícios concluídos`;
    }
    
    // Filtros
    filtroDificuldade.addEventListener('change', carregarExercicios);
    filtroTopico.addEventListener('change', carregarExercicios);
    
    // Carrega os exercícios inicialmente
    carregarExercicios();
});