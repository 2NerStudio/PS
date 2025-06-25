document.addEventListener('DOMContentLoaded', function() {
    // Easter Egg (seu código original)
    const badges = document.querySelectorAll('.badge');
    
    badges.forEach(badge => {
        let clickCount = 0;
        const maxClicks = 3;
        let clickTimeout;

        badge.addEventListener('click', function() {
            clickCount++;
            clearTimeout(clickTimeout);

            if (clickCount >= maxClicks) {
                showSecretImage();
                clickCount = 0;
            } else {
                clickTimeout = setTimeout(() => {
                    clickCount = 0;
                }, 2000);
            }
        });
    });

    function showSecretImage() {
        const existingImage = document.getElementById('secret-image');
        if (existingImage) {
            existingImage.remove();
        }

        const img = document.createElement('img');
        img.id = 'secret-image';
        img.src = 'assets/easteregg.jpg';
        img.alt = 'easter egg';
        img.style.maxWidth = '300px';
        img.style.margin = '20px auto';
        img.style.display = 'block';
        img.style.borderRadius = '8px';

        const materiasSection = document.querySelector('.materias');
        materiasSection.appendChild(img);

        setTimeout(() => {
            img.remove();
        }, 5000);
    }

    // Sistema de Código de Turma
    const modal = document.getElementById('turmaModal');
    const btnTurma = document.getElementById('btnTurma');
    const span = document.getElementsByClassName('close')[0];
    const btnAcessar = document.getElementById('btnAcessarTurma');
    const codigoInput = document.getElementById('codigoTurma');
    const mensagemErro = document.getElementById('mensagemErro');

    // Dicionário de códigos de turma e seus respectivos redirecionamentos
    const turmas = {
        'MAT': 'materias/matematica/matematica.html',
        'PORT': '#', // Substitua pelo link real quando disponível
        'CIEN': '#', // Substitua pelo link real quando disponível
        'ELETIVA': 'materias/eletiva/gramaticgame.html'
    };

    // Abre o modal quando clicar no botão
    btnTurma.onclick = function() {
        modal.style.display = 'block';
        codigoInput.focus();
    }

    // Fecha o modal quando clicar no X
    span.onclick = function() {
        modal.style.display = 'none';
        mensagemErro.style.display = 'none';
    }

    // Fecha o modal quando clicar fora dele
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            mensagemErro.style.display = 'none';
        }
    }

    // Valida o código quando clicar no botão Acessar
    btnAcessar.onclick = function() {
        const codigo = codigoInput.value.trim().toUpperCase();
        
        if (turmas[codigo]) {
            window.location.href = turmas[codigo];
        } else {
            mensagemErro.style.display = 'block';
            codigoInput.focus();
        }
    }

    // Também valida quando pressionar Enter no input
    codigoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            btnAcessar.click();
        }
    });
});