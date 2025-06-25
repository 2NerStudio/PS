// Banco de perguntas por nível de dificuldade
const questionsDatabase = {
    easy: [
        {
            question: "Qual é o plural de 'casa'?",
            options: ["Casas", "Casa", "Cazes", "Casais"],
            answer: 0
        },
        {
            question: "Qual destas palavras é um artigo definido?",
            options: ["Um", "Uns", "O", "Alguns"],
            answer: 2
        },
        {
            question: "Complete a frase: 'Eu ____ para escola todos os dias.'",
            options: ["vou", "vão", "vamos", "vou"],
            answer: 3
        },
        {
            question: "Qual destas palavras é um substantivo?",
            options: ["Correr", "Bonito", "Cachorro", "Rapidamente"],
            answer: 2
        },
        {
            question: "Qual é o feminino de 'menino'?",
            options: ["Menina", "Menino", "Meninos", "Meninaz"],
            answer: 0
        }
    ],
    medium: [
        {
            question: "Qual destas frases está na voz passiva?",
            options: [
                "O professor corrigiu as provas.",
                "As provas foram corrigidas pelo professor.",
                "O professor está corrigindo as provas.",
                "O professor vai corrigir as provas."
            ],
            answer: 1
        },
        {
            question: "Qual destas palavras é um advérbio?",
            options: ["Coragem", "Rapidamente", "Feliz", "Casa"],
            answer: 1
        },
        {
            question: "Identifique o sujeito na frase: 'Os alunos estudaram para a prova.'",
            options: ["estudaram", "para a prova", "Os alunos", "não há sujeito"],
            answer: 2
        },
        {
            question: "Qual destas palavras é oxítona?",
            options: ["casa", "árvore", "caderno", "sofá"],
            answer: 3
        },
        {
            question: "Qual é a classificação morfológica da palavra 'que' na frase: 'O livro que comprei é interessante.'?",
            options: ["Pronome relativo", "Conjunção", "Advérbio", "Preposição"],
            answer: 0
        }
    ],
    hard: [
        {
            question: "Qual destas frases contém um pleonasmo?",
            options: [
                "Subir para cima é mais fácil que descer para baixo.",
                "O sol brilha intensamente no verão.",
                "A criança pequena chorou muito.",
                "O livro interessante foi lido rapidamente."
            ],
            answer: 0
        },
        {
            question: "Qual destas construções apresenta uma crase incorreta?",
            options: [
                "Vou à escola.",
                "Refiro-me àquele assunto.",
                "Falou à respeito do caso.",
                "Entreguei o documento à secretária."
            ],
            answer: 2
        },
        {
            question: "Qual destas frases apresenta um erro de concordância verbal?",
            options: [
                "Faz dois anos que não o vejo.",
                "Houveram muitos problemas na reunião.",
                "Deve haver várias soluções para esse caso.",
                "Existem muitas pessoas esperando."
            ],
            answer: 1
        },
        {
            question: "Qual destas frases contém um erro de regência verbal?",
            options: [
                "Aspiro ao cargo de diretor.",
                "Prefiro mais o verão que o inverno.",
                "Visamos os objetivos traçados.",
                "Obedecemos às regras estabelecidas."
            ],
            answer: 1
        },
        {
            question: "Qual destas frases apresenta um erro de colocação pronominal?",
            options: [
                "Não se esqueça de trazer os documentos.",
                "Enviar-lhe-ei o contrato amanhã.",
                "Se me permite, gostaria de fazer uma sugestão.",
                "Vou te encontrar mais tarde."
            ],
            answer: 3
        }
    ]
};