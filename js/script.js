document.addEventListener('DOMContentLoaded', function() {
    if(document.querySelector('.exercicios-list')) {
        const exercicios = [
            { titulo: "Frações Básicas", nivel: "Iniciante" },
            { titulo: "Equações Simples", nivel: "Intermediário" },
            { titulo: "Áreas e Perímetros", nivel: "Básico" }
        ];
        
        const lista = document.querySelector('.exercicios-list');
        
        exercicios.forEach(ex => {
            const div = document.createElement('div');
            div.className = 'exercicio-item';
            div.innerHTML = `
                <h3>${ex.titulo}</h3>
                <p>Nível: ${ex.nivel}</p>
                <button class="btn-iniciar">Iniciar</button>
            `;
            lista.appendChild(div);
        });
    }
});