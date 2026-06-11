/* ========================================
   SCRIPT PRINCIPAL - SEDUZIDOS PELA CEGUEIRA DA POLUIÇÃO
   Funcionalidades: Quiz, Acessibilidade (fonte, contraste, Libras)
   ======================================== */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== 1. FUNCIONALIDADE PRINCIPAL: QUIZ ==========
    const botaoResultado = document.getElementById('btnResultado');
    const resultadoDiv = document.getElementById('resultadoQuiz');

    if (botaoResultado) {
        botaoResultado.addEventListener('click', function() {
            // Coletar respostas das 5 perguntas
            const q1 = document.querySelector('input[name="q1"]:checked');
            const q2 = document.querySelector('input[name="q2"]:checked');
            const q3 = document.querySelector('input[name="q3"]:checked');
            const q4 = document.querySelector('input[name="q4"]:checked');
            const q5 = document.querySelector('input[name="q5"]:checked');
            
            // Verificar se todas foram respondidas
            if (!q1 || !q2 || !q3 || !q4 || !q5) {
                resultadoDiv.style.display = 'block';
                resultadoDiv.innerHTML = '⚠️ Por favor, responda todas as 5 perguntas antes de ver o resultado!';
                resultadoDiv.style.backgroundColor = '#cc3300';
                return;
            }
            
            // Somar pontos (cada resposta correta vale 1)
            let pontos = 0;
            if (q1.value === '1') pontos++;
            if (q2.value === '1') pontos++;
            if (q3.value === '1') pontos++;
            if (q4.value === '1') pontos++;
            if (q5.value === '1') pontos++;
            
            // Calcular percentual
            const percentual = (pontos / 5) * 100;
            
            // Mensagem personalizada
            let mensagem = '';
            if (percentual === 100) {
                mensagem = '🌟 Parabéns! Você NÃO está seduzido pela cegueira da poluição! Enxerga a realidade e busca soluções sustentáveis!';
            } else if (percentual >= 80) {
                mensagem = '🍃 Muito bom! Você já tem consciência, mas ainda pode abrir mais os olhos para o problema.';
            } else if (percentual >= 60) {
                mensagem = '🌱 Bom! Você está no caminho, mas precisa conhecer mais sobre alternativas naturais.';
            } else if (percentual >= 40) {
                mensagem = '⚠️ Atenção! Você ainda está um pouco seduzido pela cegueira da poluição. Leia o conteúdo do site!';
            } else {
                mensagem = '❌ Infelizmente, você ainda está seduzido pela cegueira da poluição. Reflita sobre os impactos dos agrotóxicos!';
            }
            
            // Exibir resultado
            resultadoDiv.style.display = 'block';
            resultadoDiv.innerHTML = `🌿 Seu nível de consciência ambiental: ${percentual}%<br>${mensagem}`;
            resultadoDiv.style.backgroundColor = '#2d5a27';
            
            // Rolar até o resultado
            resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    
    // ========== 2. ACESSIBILIDADE: PAINEL ==========
    const btnAcessibilidade = document.getElementById('btnAcessibilidade');
    const painel = document.getElementById('painelAcessibilidade');
    const fecharPainel = document.getElementById('fecharPainel');
    
    if (btnAcessibilidade) {
        btnAcessibilidade.addEventListener('click', function() {
            painel.style.display = painel.style.display === 'block' ? 'none' : 'block';
        });
    }
    
    if (fecharPainel) {
        fecharPainel.addEventListener('click', function() {
            painel.style.display = 'none';
        });
    }
    
    // ========== 3. AUMENTAR E DIMINUIR FONTE ==========
    const aumentarFonte = document.getElementById('aumentarFonte');
    const diminuirFonte = document.getElementById('diminuirFonte');
    
    function ajustarFonte(aumentar) {
        const body = document.body;
        let tamanhoAtual = parseFloat(window.getComputedStyle(body).fontSize);
        let novo = aumentar ? tamanhoAtual + 2 : tamanhoAtual - 2;
        if (novo >= 12 && novo <= 28) {
            body.style.fontSize = novo + 'px';
        }
    }
    
    if (aumentarFonte) {
        aumentarFonte.addEventListener('click', function() {
            ajustarFonte(true);
        });
    }
    
    if (diminuirFonte) {
        diminuirFonte.addEventListener('click', function() {
            ajustarFonte(false);
        });
    }
    
    // ========== 4. ALTO CONTRASTE ==========
    const altoContraste = document.getElementById('altoContraste');
    
    if (altoContraste) {
        altoContraste.addEventListener('click', function() {
            document.body.classList.toggle('alto-contraste');
            if (document.body.classList.contains('alto-contraste')) {
                localStorage.setItem('altoContraste', 'ativo');
            } else {
                localStorage.setItem('altoContraste', 'desativado');
            }
        });
        
        if (localStorage.getItem('altoContraste') === 'ativo') {
            document.body.classList.add('alto-contraste');
        }
    }
    
    // ========== 5. MODAL LIBRAS ==========
    const btnLibras = document.getElementById('btnLibrasInfo');
    const modalLibras = document.getElementById('modalLibras');
    const fecharModal = document.querySelector('.fecharModal');
    
    if (btnLibras) {
        btnLibras.addEventListener('click', function() {
            modalLibras.style.display = 'block';
        });
    }
    
    if (fecharModal) {
        fecharModal.addEventListener('click', function() {
            modalLibras.style.display = 'none';
        });
    }
    
    window.addEventListener('click', function(event) {
        if (event.target === modalLibras) {
            modalLibras.style.display = 'none';
        }
    });
    
    // ========== 6. FECHAR PAINEL AO CLICAR FORA ==========
    document.addEventListener('click', function(event) {
        if (painel && painel.style.display === 'block') {
            if (!painel.contains(event.target) && event.target !== btnAcessibilidade) {
                painel.style.display = 'none';
            }
        }
    });
});
