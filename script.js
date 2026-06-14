// ===== ACESSIBILIDADE =====
const acessibilidadeBtn = document.getElementById('acessibilidadeBtn');
const acessibilidadePanel = document.getElementById('acessibilidadePanel');
const aumentarFonte = document.getElementById('aumentarFonte');
const diminuirFonte = document.getElementById('diminuirFonte');
const altoContraste = document.getElementById('altoContraste');

let fonteAtual = 1;
const classesFonte = ['fonte-pequena', 'fonte-normal', 'fonte-grande', 'fonte-muito-grande'];

acessibilidadeBtn.addEventListener('click', () => {
    const isVisible = acessibilidadePanel.style.display === 'flex';
    acessibilidadePanel.style.display = isVisible ? 'none' : 'flex';
});

aumentarFonte.addEventListener('click', () => {
    if (fonteAtual < 3) fonteAtual++;
    aplicarFonte();
});

diminuirFonte.addEventListener('click', () => {
    if (fonteAtual > 0) fonteAtual--;
    aplicarFonte();
});

function aplicarFonte() {
    document.body.classList.remove(...classesFonte);
    document.body.classList.add(classesFonte[fonteAtual]);
    localStorage.setItem('fonteSize', fonteAtual);
}

altoContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
    localStorage.setItem('altoContraste', document.body.classList.contains('alto-contraste'));
});

// Carregar preferências
const fonteSalva = localStorage.getItem('fonteSize');
if (fonteSalva !== null) {
    fonteAtual = parseInt(fonteSalva);
    aplicarFonte();
}
if (localStorage.getItem('altoContraste') === 'true') {
    document.body.classList.add('alto-contraste');
}

// ===== JOGO EDUCATIVO (Simulador de Plantio) =====
let estadoPlanta = 'neutro'; // neutro, crescida, doente, morta
let quantidadeAgrotoxicos = 0;

const planta = document.getElementById('planta');
const btnNatural = document.getElementById('btnNatural');
const btnAplicar = document.getElementById('btnAplicar');
const agrotoxicosSlider = document.getElementById('agrotoxicosSlider');
const quantidadeValor = document.getElementById('quantidadeValor');
const mensagemResultado = document.getElementById('mensagemResultado');
const reiniciarJogo = document.getElementById('reiniciarJogo');

function atualizarPlantaVisual() {
    planta.classList.remove('crescida', 'morta', 'doente');
    
    if (estadoPlanta === 'crescida') {
        planta.classList.add('crescida');
    } else if (estadoPlanta === 'morta') {
        planta.classList.add('morta');
    } else if (estadoPlanta === 'doente') {
        planta.classList.add('doente');
    }
}

function verificarEstadoPlanta() {
    if (quantidadeAgrotoxicos === 0 && estadoPlanta === 'neutro') {
        // Ainda não fez nada
        return;
    }
    
    if (quantidadeAgrotoxicos === 0 && estadoPlanta === 'crescida') {
        mensagemResultado.innerHTML = '🌱 Parabéns! Você cultivou sem agrotóxicos. A planta está saudável, o solo fértil e a biodiversidade preservada!';
        mensagemResultado.style.color = '#4CAF50';
    } else if (quantidadeAgrotoxicos > 0 && quantidadeAgrotoxicos <= 3) {
        estadoPlanta = 'doente';
        mensagemResultado.innerHTML = '⚠️ Você aplicou poucos agrotóxicos. A planta está doente e a biodiversidade local foi afetada. Abelhas e outros polinizadores estão sumindo.';
        mensagemResultado.style.color = '#DAA520';
    } else if (quantidadeAgrotoxicos > 3 && quantidadeAgrotoxicos <= 7) {
        estadoPlanta = 'doente';
        mensagemResultado.innerHTML = '⚠️⚠️ Você aplicou uma quantidade moderada de agrotóxicos. O solo está contaminado, minhocas morreram e a água próxima foi poluída.';
        mensagemResultado.style.color = '#DAA520';
    } else if (quantidadeAgrotoxicos > 7) {
        estadoPlanta = 'morta';
        mensagemResultado.innerHTML = '💀❌ Quantidade EXCESSIVA de agrotóxicos! A planta morreu, o solo ficou estéril por décadas, o lençol freático foi contaminado. Esta terra não produzirá mais nada.';
        mensagemResultado.style.color = '#dc3545';
    }
    
    atualizarPlantaVisual();
}

btnNatural.addEventListener('click', () => {
    quantidadeAgrotoxicos = 0;
    estadoPlanta = 'crescida';
    agrotoxicosSlider.value = 0;
    quantidadeValor.textContent = '0';
    verificarEstadoPlanta();
});

btnAplicar.addEventListener('click', () => {
    if (estadoPlanta === 'morta') {
        mensagemResultado.innerHTML = '❌ A terra já está estéril. Não é possível plantar novamente sem recuperar o solo primeiro.';
        return;
    }
    
    if (estadoPlanta === 'crescida' && quantidadeAgrotoxicos > 0) {
        estadoPlanta = 'doente';
    } else if (estadoPlanta === 'neutro') {
        estadoPlanta = 'doente';
    }
    
    verificarEstadoPlanta();
});

agrotoxicosSlider.addEventListener('input', (e) => {
    quantidadeAgrotoxicos = parseInt(e.target.value);
    quantidadeValor.textContent = quantidadeAgrotoxicos;
});

reiniciarJogo.addEventListener('click', () => {
    quantidadeAgrotoxicos = 0;
    estadoPlanta = 'neutro';
    agrotoxicosSlider.value = 0;
    quantidadeValor.textContent = '0';
    planta.classList.remove('crescida', 'morta', 'doente');
    mensagemResultado.innerHTML = 'Faça sua escolha para começar';
    mensagemResultado.style.color = '#666';
});

// ===== QUIZ DE CONHECIMENTO =====
const perguntas = [
    {
        texto: "O uso excessivo de agrotóxicos afeta principalmente:",
        opcoes: ["A biodiversidade, a água e a saúde humana", "Apenas as pragas das plantações", "Somente o solo da fazenda", "Apenas o bolso do agricultor"],
        correta: 0
    },
    {
        texto: "Qual tecnologia ajuda a reduzir o uso de agrotóxicos?",
        opcoes: ["Agricultura de precisão com drones", "Queimadas controladas", "Desmatamento de áreas nativas", "Plantio em área única todo ano"],
        correta: 0
    },
    {
        texto: "Como os agrotóxicos em excesso afetam a biodiversidade?",
        opcoes: ["Matam polinizadores como abelhas", "Aumentam a variedade de insetos", "Deixam o solo mais fértil", "Não causam nenhum impacto"],
        correta: 0
    },
    {
        texto: "Qual prática é considerada mais sustentável para o agro?",
        opcoes: ["Controle biológico de pragas", "Uso excessivo de produtos químicos", "Aplicação sem critério", "Ignorar as pragas na lavoura"],
        correta: 0
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let quizAtivo = true;

const perguntaArea = document.getElementById('perguntaArea');
const resultadoArea = document.getElementById('resultadoArea');

function carregarPergunta() {
    if (!quizAtivo) return;
    
    if (perguntaAtual >= perguntas.length) {
        finalizarQuiz();
        return;
    }
    
    const p = perguntas[perguntaAtual];
    let html = `
        <div class="quiz-pergunta">
            <h3>${p.texto}</h3>
            <div class="opcoes">
    `;
    
    p.opcoes.forEach((opcao, idx) => {
        html += `<div class="opcao" data-index="${idx}">${opcao}</div>`;
    });
    
    html += `
            </div>
            <div class="quiz-progresso">${perguntaAtual + 1} / ${perguntas.length}</div>
        </div>
    `;
    
    perguntaArea.innerHTML = html;
    resultadoArea.style.display = 'none';
    perguntaArea.style.display = 'block';
    
    document.querySelectorAll('.opcao').forEach(op => {
        op.addEventListener('click', (e) => {
            if (!quizAtivo) return;
            const escolhida = parseInt(op.dataset.index);
            if (escolhida === perguntas[perguntaAtual].correta) {
                pontuacao++;
            }
            perguntaAtual++;
            carregarPergunta();
        });
    });
}

function finalizarQuiz() {
    quizAtivo = false;
    const percentual = (pontuacao / perguntas.length) * 100;
    let mensagem = '';
    let estilo = '';
    
    if (percentual === 100) {
        mensagem = '🎉 Perfeito! Você acertou todas as perguntas. Parabéns pela consciência ambiental! 🌱';
    } else if (percentual >= 50) {
        mensagem = `🌱 Bom trabalho! Você acertou ${pontuacao} de ${perguntas.length} (${percentual}%). Continue aprendendo sobre agro sustentável.`;
    } else {
        mensagem = `💚 Você acertou ${pontuacao} de ${perguntas.length}. Explore mais o site e descubra como podemos mudar essa realidade.`;
    }
    
    resultadoArea.innerHTML = `
        <div class="quiz-resultado">
            <h3>Seu resultado</h3>
            <p>${mensagem}</p>
            <button class="btn-reiniciar" id="reiniciarQuiz">↺ Responder novamente</button>
        </div>
    `;
    
    perguntaArea.style.display = 'none';
    resultadoArea.style.display = 'block';
    
    document.getElementById('reiniciarQuiz').addEventListener('click', () => {
        perguntaAtual = 0;
        pontuacao = 0;
        quizAtivo = true;
        carregarPergunta();
    });
}

// Smooth scroll para todos os links
document.querySelectorAll('.nav a, .btn-hero').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId && targetId !== '#') {
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Iniciar quiz
carregarPergunta();
