
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
        },
        {
            question: "Qual destas palavras está escrita corretamente?",
            options: ["Caza", "Casa", "Cassa", "Cazza"],
            answer: 1
        },
        {
            question: "Qual é o antônimo de 'alto'?",
            options: ["Baixo", "Grande", "Largo", "Estreito"],
            answer: 0
        },
        {
            question: "Qual destas palavras é um verbo?",
            options: ["Corrida", "Bonito", "Correr", "Felizmente"],
            answer: 2
        },
        {
            question: "Complete: 'Ontem eu ____ ao cinema.'",
            options: ["fui", "vou", "irei", "vamos"],
            answer: 0
        },
        {
            question: "Qual destas frases está no plural?",
            options: [
                "O gato dorme.",
                "Os gatos dormem.",
                "Eu gosto de gatos.",
                "O gato é fofo."
            ],
            answer: 1
        },
        {
            question: "Qual é o aumentativo de 'casa'?",
            options: ["Casinha", "Casebre", "Casarão", "Casario"],
            answer: 2
        },
        {
            question: "Qual destas palavras é paroxítona?",
            options: ["América", "Brasil", "Canadá", "México"],
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
        },
        {
            question: "Qual destas frases contém uma metáfora?",
            options: [
                "O tempo é um rio que corre.",
                "Choveu muito ontem.",
                "O sol está quente hoje.",
                "Vou para a escola."
            ],
            answer: 0
        },
        {
            question: "Qual destas palavras é um numeral?",
            options: ["Alguns", "Poucos", "Três", "Vários"],
            answer: 2
        },
        {
            question: "Qual é a função sintática da palavra 'livro' na frase: 'Comprei um livro interessante.'?",
            options: ["Sujeito", "Objeto direto", "Objeto indireto", "Adjunto adverbial"],
            answer: 1
        },
        {
            question: "Qual destas frases apresenta um adjunto adnominal?",
            options: [
                "O livro de português está na mesa.",
                "Estudei para a prova ontem.",
                "Corri rapidamente no parque.",
                "Comprei pão na padaria."
            ],
            answer: 0
        },
        {
            question: "Qual destas palavras é proparoxítona?",
            options: ["Árvore", "Caderno", "Livro", "Mesa"],
            answer: 0
        },
        {
            question: "Qual destas frases contém uma oração subordinada adverbial?",
            options: [
                "Quando cheguei, todos já tinham saído.",
                "O livro que comprei é interessante.",
                "Quero que você venha logo.",
                "Ele disse a verdade."
            ],
            answer: 0
        },
        {
            question: "Qual é a regência correta do verbo 'aspirar' no sentido de 'almejar'?",
            options: [
                "Aspirar algo",
                "Aspirar a algo",
                "Aspirar por algo",
                "Aspirar de algo"
            ],
            answer: 1
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
        },
        {
            question: "Qual destas frases contém um anacoluto?",
            options: [
                "O livro, já li várias vezes.",
                "O livro que comprei é interessante.",
                "Li o livro rapidamente.",
                "O livro está na mesa."
            ],
            answer: 0
        },
        {
            question: "Qual destas frases apresenta zeugma?",
            options: [
                "Ele prefere cinema; eu, teatro.",
                "Ele foi ao cinema e ao teatro.",
                "Ele gosta de cinema e teatro.",
                "Ele saiu cedo para o cinema."
            ],
            answer: 0
        },
        {
            question: "Qual destas frases contém um hipérbato?",
            options: [
                "Do céu caíram as bênçãos.",
                "As bênçãos caíram do céu.",
                "Caíram do céu as bênçãos.",
                "As bênçãos do céu caíram."
            ],
            answer: 2
        },
        {
            question: "Qual destas frases apresenta polissíndeto?",
            options: [
                "E corre, e pula, e grita, e ri.",
                "Corre, pula, grita e ri.",
                "Ele corre e depois pula.",
                "Correndo e pulando, ele se diverte."
            ],
            answer: 0
        },
        {
            question: "Qual destas construções apresenta um erro de paralelismo sintático?",
            options: [
                "Gosto de nadar e correr.",
                "Gosto de nadar e de correr.",
                "Gosto de nadar e também correr.",
                "Gosto tanto de nadar quanto de correr."
            ],
            answer: 2
        },
        {
            question: "Qual destas frases contém uma silepse de número?",
            options: [
                "O povo aplaudiu quando o presidente chegou.",
                "Os Lusíadas glorifica os feitos portugueses.",
                "Vossa Excelência está preocupado.",
                "A gente vamos embora agora."
            ],
            answer: 1
        },
        {
            question: "Qual destas frases apresenta uma ambiguidade?",
            options: [
                "Vi o irmão da Maria que mora no exterior.",
                "O irmão da Maria mora no exterior.",
                "Maria tem um irmão que mora no exterior.",
                "O irmão de Maria mora fora do país."
            ],
            answer: 0
        }
    ]
};