/* FUNÇÃO ORIGINAL DE NAVEGAÇÃO ENTRE SEÇÕES */
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show the target section
    document.getElementById(sectionId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

/* EFEITOS INTERATIVOS */
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to navigation cards
    const cards = document.querySelectorAll('.nav-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Add parallax effect to header (Atenção: Parallax pode ser pesado em alguns dispositivos)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        // Apenas aplica o efeito se estiver na seção home para evitar deslocamento em outras seções
        if (header && document.getElementById('home').classList.contains('active')) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        } else {
            // Garante que o header volte ao normal quando sair da home
            header.style.transform = `translateY(0px)`;
        }
    });
});