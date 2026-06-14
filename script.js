// ===== ACESSIBILIDADE - AJUSTE DE FONTE =====
const acessibilidadeBtn = document.getElementById('acessibilidadeBtn');
const acessibilidadePanel = document.getElementById('acessibilidadePanel');
const aumentarFonte = document.getElementById('aumentarFonte');
const diminuirFonte = document.getElementById('diminuirFonte');

let fonteAtual = 1;
const classesFonte = ['fonte-pequena', 'fonte-normal', 'fonte-grande', 'fonte-muito-grande'];

// Abrir/fechar painel de acessibilidade
acessibilidadeBtn.addEventListener('click', () => {
    const isVisible = acessibilidadePanel.style.display === 'flex';
    acessibilidadePanel.style.display = isVisible ? 'none' : 'flex';
});

// Aumentar fonte
aumentarFonte.addEventListener('click', () => {
    if (fonteAtual < 3) fonteAtual++;
    aplicarFonte();
});

// Diminuir fonte
diminuirFonte.addEventListener('click', () => {
    if (fonteAtual > 0) fonteAtual--;
    aplicarFonte();
});

function aplicarFonte() {
    document.body.classList.remove(...classesFonte);
    document.body.classList.add(classesFonte[fonteAtual]);
    localStorage.setItem('fonteSize', fonteAtual);
}

// Carregar preferência salva
const fonteSalva = localStorage.getItem('fonteSize');
if (fonteSalva !== null) {
    fonteAtual = parseInt(fonteSalva);
    aplicarFonte();
}

// ===== JOGO EDUCATIVO (Simulador de Plantio) =====
let estadoPlanta = 'neutro';
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
    if (quantidadeAgrotoxicos === 0 && estadoPlanta === 'crescida') {
        mensagemResultado.innerHTML = '🌱 PARABÉNS! Você cultivou sem agrotóxicos. A planta está SAUDÁVEL, o solo fértil e a BIODIVERSIDADE preservada!';
        mensagemResultado.style.color = '#2d6a4f';
    } else if (quantidadeAgrotoxicos > 0 && quantidadeAgrotoxicos <= 3) {
        estadoPlanta = 'doente';
        mensagemResultado.innerHTML = '⚠️ ALERTA! Você aplicou POUCOS agrotóxicos. A planta está doente e a BIODIVERSIDADE local foi afetada. Abelhas e polinizadores estão sumindo.';
        mensagemResultado.style.color = '#bc6c25';
    } else if (quantidadeAgrotoxicos > 3 && quantidadeAgrotoxicos <= 7) {
        estadoPlanta = 'doente';
        mensagemResultado.innerHTML = '⚠️⚠️ GRAVE! Você aplicou quantidade MODERADA de agrotóxicos. O solo está contaminado, minhocas morreram e a água foi poluída.';
        mensagemResultado.style.color = '#bc6c25';
    } else if (quantidadeAgrotoxicos > 7) {
        estadoPlanta = 'morta';
        mensagemResultado.innerHTML = '💀❌ FATAL! Quantidade EXCESSIVA de agrotóxicos! A planta MORREU, o solo ficou estéril por décadas, o lençol freático foi contaminado. Esta terra não produzirá mais nada.';
        mensagemResultado.style.color = '#d62828';
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
        mensagemResultado.innerHTML = '❌ A TERRA JÁ ESTÁ ESTÉRIL! Não é possível plantar novamente sem recuperar o solo primeiro.';
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
    mensagemResultado.innerHTML = '🌾 Faça sua escolha para começar';
    mensagemResultado.style.color = '#2d6a4f';
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
    
    if (percentual === 100) {
        mensagem = '🎉 PERFEITO! Você acertou todas as perguntas. PARABÉNS pela consciência ambiental! 🌱';
    } else if (percentual >= 50) {
        mensagem = `🌱 BOM TRABALHO! Você acertou ${pontuacao} de ${perguntas.length} (${percentual}%). Continue aprendendo sobre AGRO SUSTENTÁVEL.`;
    } else {
        mensagem = `💚 Você acertou ${pontuacao} de ${perguntas.length}. Explore mais o site e descubra como podemos MUDAR essa realidade.`;
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
document.querySelectorAll('.nav a, .btn-hero, .btn-chamada').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Iniciar quiz
carregarPergunta();
