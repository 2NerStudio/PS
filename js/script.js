document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos com a classe "badge" (onde está escrito "Em breve")
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        let clickCount = 0;
        const maxClicks = 3; // Número de cliques necessários
        let clickTimeout; // Para resetar a contagem após um tempo

        badge.addEventListener('click', function() {
            clickCount++;
            clearTimeout(clickTimeout); // Reseta o timeout anterior

            // Se atingir 3 cliques, mostra a imagem
            if (clickCount >= maxClicks) {
                showSecretImage();
                clickCount = 0; // Reseta a contagem
            } else {
                // Reseta a contagem após 1 segundo se não completar os 3 cliques
                clickTimeout = setTimeout(() => {
                    clickCount = 0;
                }, 1000);
            }
        });
    });

    // Função para exibir a imagem
    function showSecretImage() {
        // Remove a imagem anterior se já existir
        const existingImage = document.getElementById('secret-image');
        if (existingImage) {
            existingImage.remove();
        }

        // Cria a imagem dinamicamente (substitua 'caminho-da-imagem.jpg' pelo seu arquivo)
        const img = document.createElement('img');
        img.id = 'secret-image';
        img.src = 'assets/easteregg.jpg'; // Atualize com o caminho correto
        img.alt = 'eastrer egg';
        img.style.maxWidth = '300px'; // Ajuste o tamanho conforme necessário
        img.style.margin = '20px auto';
        img.style.display = 'block';
        img.style.borderRadius = '8px';

        // Insere a imagem após o último card de matérias
        const materiasSection = document.querySelector('.materias');
        materiasSection.appendChild(img);

        // Opcional: Remove a imagem após alguns segundos
        setTimeout(() => {
            img.remove();
        }, 5000); // 5000ms = 5 segundos
    }
});