// ==================== ACESSIBILIDADE ====================
let tamanhoFonte = 100; // porcentagem padrão

const aumentarBtn = document.getElementById('aumentarFonte');
const diminuirBtn = document.getElementById('diminuirFonte');
const contrasteBtn = document.getElementById('altoContraste');

// Aumentar fonte
aumentarBtn.addEventListener('click', () => {
    if (tamanhoFonte < 150) {
        tamanhoFonte += 10;
        document.body.style.fontSize = tamanhoFonte + '%';
    }
});

// Diminuir fonte
diminuirBtn.addEventListener('click', () => {
    if (tamanhoFonte > 70) {
        tamanhoFonte -= 10;
        document.body.style.fontSize = tamanhoFonte + '%';
    }
});

// Alto contraste
contrasteBtn.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
});

// ==================== TESTE DE CONHECIMENTO AMBIENTAL ====================
const enviarQuiz = document.getElementById('enviarQuiz');
const resultadoQuizDiv = document.getElementById('resultadoQuiz');

enviarQuiz.addEventListener('click', () => {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');

    if (!q1 || !q2 || !q3 || !q4) {
        resultadoQuizDiv.innerHTML = '<p style="color: red;">⚠️ Responda todas as perguntas antes de ver seu resultado!</p>';
        return;
    }

    let pontos = 0;
    if (q1.value === 'b') pontos++;
    if (q2.value === 'c') pontos++;
    if (q3.value === 'b') pontos++;
    if (q4.value === 'b') pontos++;

    const percentual = (pontos / 4) * 100;
    let mensagem = '';

    if (percentual === 100) mensagem = '🌿 Parabéns! Você tem 100% de consciência ambiental. É um guardião da biodiversidade!';
    else if (percentual >= 75) mensagem = '💚 Muito bem! Você sabe bastante sobre sustentabilidade. Continue aprendendo!';
    else if (percentual >= 50) mensagem = '🌱 Bom, mas ainda precisa estudar mais sobre o impacto dos agrotóxicos.';
    else mensagem = '⚠️ Atenção! Você ainda não conhece os riscos do uso excessivo de agrotóxicos. Explore nosso site!';

    resultadoQuizDiv.innerHTML = `<p><strong>Seu percentual ecológico: ${percentual}%</strong><br>${mensagem}</p>`;
});

// ==================== JOGO EDUCATIVO: CENÁRIOS ====================
const botoesCenario = document.querySelectorAll('.cenario');
const resultadoJogo = document.getElementById('resultadoJogo');

botoesCenario.forEach(botao => {
    botao.addEventListener('click', () => {
        const tipo = botao.getAttribute('data-tipo');
        let mensagem = '';

        if (tipo === 'excessivo') {
            mensagem = '❌ Você escolheu USO EXCESSIVO de agrotóxicos. Resultado: solo degradado, rios contaminados, abelhas morrendo e perda total da biodiversidade. Produção cai depois de 3 anos.';
        } else if (tipo === 'moderado') {
            mensagem = '⚠️ Você escolheu USO MODERADO de agrotóxicos. Resultado: impacto médio. A biodiversidade diminui, mas ainda há produção. Não é o ideal.';
        } else if (tipo === 'biologico') {
            mensagem = '✅ Excelente! Você escolheu CONTROLE BIOLÓGICO + ROTAÇÃO DE CULTURA. Resultado: solo saudável, alta biodiversidade, abelhas polinizam livremente. Produção sustentável por muitos anos! 🌿🐞';
        }

        resultadoJogo.innerHTML = `<p>${mensagem}</p>`;
    });
});
