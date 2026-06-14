// ==================== ACESSIBILIDADE ====================
// Botão de abrir/fechar painel
const botaoAcessibilidade = document.getElementById('botaoAcessibilidade');
const painelAcessibilidade = document.getElementById('painelAcessibilidade');

botaoAcessibilidade.addEventListener('click', () => {
    if (painelAcessibilidade.style.display === 'flex') {
        painelAcessibilidade.style.display = 'none';
    } else {
        painelAcessibilidade.style.display = 'flex';
    }
});

// Aumentar e diminuir fonte
let tamanhoAtual = 2; // 0: pequena, 1: normal, 2: grande, 3: muito grande
const classesFonte = ['fonte-pequena', 'fonte-normal', 'fonte-grande', 'fonte-muito-grande'];

function aplicarTamanhoFonte(indice) {
    document.body.classList.remove(...classesFonte);
    document.body.classList.add(classesFonte[indice]);
    localStorage.setItem('tamanhoFonte', indice);
}

document.getElementById('aumentarFonteBtn').addEventListener('click', () => {
    if (tamanhoAtual < 3) tamanhoAtual++;
    aplicarTamanhoFonte(tamanhoAtual);
});

document.getElementById('diminuirFonteBtn').addEventListener('click', () => {
    if (tamanhoAtual > 0) tamanhoAtual--;
    aplicarTamanhoFonte(tamanhoAtual);
});

// Alto Contraste
const altoContrasteBtn = document.getElementById('altoContrasteBtn');
altoContrasteBtn.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
    const isContraste = document.body.classList.contains('alto-contraste');
    localStorage.setItem('altoContraste', isContraste);
});

// Carregar preferências salvas
const fonteSalva = localStorage.getItem('tamanhoFonte');
if (fonteSalva !== null) {
    tamanhoAtual = parseInt(fonteSalva);
    aplicarTamanhoFonte(tamanhoAtual);
}
const contrasteSalvo = localStorage.getItem('altoContraste') === 'true';
if (contrasteSalvo) {
    document.body.classList.add('alto-contraste');
}

// ==================== QUIZ INTERATIVO (FUNCIONALIDADE PRINCIPAL) ====================
// Array com perguntas, opções e respostas (índice 0 a 3)
const perguntas = [
    {
        texto: "O uso excessivo de agrotóxicos afeta principalmente:",
        opcoes: ["Apenas as pragas das plantações", "Somente o solo da fazenda", "A biodiversidade, a água e a saúde humana", "Apenas o bolso do agricultor"],
        correta: 2
    },
    {
        texto: "Qual das alternativas é uma solução tecnológica para reduzir agrotóxicos?",
        opcoes: ["Queimar a plantação após a colheita", "Agricultura de precisão com drones", "Aumentar a dose de veneno", "Ignorar as pragas"],
        correta: 1
    },
    {
        texto: "Como a biodiversidade é prejudicada pelos agrotóxicos?",
        opcoes: ["Aumenta o número de espécies de insetos", "Polinizadores como abelhas morrem", "Deixa o solo mais fértil", "Não causa nenhum impacto"],
        correta: 1
    },
    {
        texto: "Qual prática contribui para um agro mais forte e sustentável?",
        opcoes: ["Rotação de culturas e controle biológico", "Uso indiscriminado de químicos", "Desmatamento de áreas nativas", "Plantio em área única todos os anos"],
        correta: 0
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let quizFinalizado = false;

const perguntaContainer = document.getElementById('perguntaContainer');
const resultadoContainer = document.getElementById('resultadoContainer');
const resultadoTexto = document.getElementById('resultadoTexto');
const reiniciarBtn = document.getElementById('reiniciarQuizBtn');

// Função para carregar a pergunta atual
function carregarPergunta() {
    if (perguntaAtual < perguntas.length) {
        const p = perguntas[perguntaAtual];
        let html = `
            <h3>${p.texto}</h3>
            <div class="opcoes">
        `;
        p.opcoes.forEach((opcao, idx) => {
            html += `<div class="opcao" data-indice="${idx}">${opcao}</div>`;
        });
        html += `</div><p>Pergunta ${perguntaAtual+1} de ${perguntas.length}</p>`;
        perguntaContainer.innerHTML = html;
        resultadoContainer.style.display = 'none';
        perguntaContainer.style.display = 'block';
        
        // Adicionar eventos de clique nas opções
        document.querySelectorAll('.opcao').forEach(op => {
            op.addEventListener('click', (e) => {
                if (quizFinalizado) return;
                const escolhido = parseInt(op.getAttribute('data-indice'));
                if (escolhido === p.correta) {
                    pontuacao++;
                }
                perguntaAtual++;
                if (perguntaAtual < perguntas.length) {
                    carregarPergunta();
                } else {
                    finalizarQuiz();
                }
            });
        });
    } else {
        finalizarQuiz();
    }
}

function finalizarQuiz() {
    perguntaContainer.style.display = 'none';
    resultadoContainer.style.display = 'block';
    const percentual = (pontuacao / perguntas.length) * 100;
    let mensagem = '';
    if (percentual === 100) mensagem = `Excelente! Você acertou ${pontuacao} de ${perguntas.length} (${percentual}%). Você tem consciência ecológica! 🌱`;
    else if (percentual >= 50) mensagem = `Bom trabalho! Você acertou ${pontuacao} de ${perguntas.length} (${percentual}%). Continue aprendendo sobre sustentabilidade! 🌍`;
    else mensagem = `Você acertou ${pontuacao} de ${perguntas.length} (${percentual}%). Que tal explorar mais o site para entender a importância do agro sustentável? 💚`;
    
    resultadoTexto.innerHTML = mensagem;
    quizFinalizado = true;
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    quizFinalizado = false;
    carregarPergunta();
}

reiniciarBtn.addEventListener('click', reiniciarQuiz);

// Iniciar o quiz quando a página carregar
carregarPergunta();

// Suavizar rolagem ao clicar nos links do menu
document.querySelectorAll('.menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if(targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
