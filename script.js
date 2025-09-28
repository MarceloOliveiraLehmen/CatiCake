/* FUNÇÃO MODIFICADA DE NAVEGAÇÃO ENTRE SEÇÕES COM HISTORY API */
function showSection(sectionId, shouldPushState = true) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostra a seção alvo
    document.getElementById(sectionId).classList.add('active');
    
    // Rola para o topo (opcional, mas mantém a UX)
    window.scrollTo(0, 0);

    // ********** CORREÇÃO DO BOTÃO VOLTAR NATIVO: HISTORY API **********
    if (shouldPushState) {
        // Altera a URL no navegador sem recarregar a página, registrando o estado.
        const url = sectionId === 'home' ? './' : `#${sectionId}`;
        history.pushState({ section: sectionId }, '', url);
    }
    // ******************************************************
}

/* EFEITOS INTERATIVOS */
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to navigation cards
    const cards = document.querySelectorAll('.nav-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Add parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        // Apenas aplica o efeito se estiver na seção home
        if (header && document.getElementById('home').classList.contains('active')) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        } else {
            // Garante que o header volte ao normal quando sair da home
            header.style.transform = `translateY(0px)`;
        }
    });

    // ********** CORREÇÃO DO BOTÃO VOLTAR NATIVO: DETECTAR POPSTATE **********
    window.addEventListener('popstate', function(event) {
        // Verifica o estado que foi salvo (se for null, volta para 'home')
        const targetSection = (event.state && event.state.section) ? event.state.section : 'home';
        
        // Chama a função de navegação, passando 'false' para NÃO adicionar um novo estado ao histórico
        showSection(targetSection, false); 
    });

    // ********** INICIALIZAÇÃO CORRETA: Lidar com a URL de carregamento **********
    // Verifica se há um hash na URL (ex: #gallery) ou usa 'home'
    const initialSection = window.location.hash.substring(1) || 'home';
    
    // Garante que a seção correta seja exibida na carga inicial, sem adicionar um novo histórico
    showSection(initialSection, false);
    // ******************************************************
});
