// ********** VARIÁVEIS DE CONTROLE **********
const totalMenuPages = 6; // Total de páginas do seu cardápio
let currentPage = 1;
const fileNamePrefix = 'catalogo'; // Prefixo do nome do arquivo (catalogo1, catalogo2, ...)

/* Estrutura de dados: Simula as fotos dentro das pastas da Galeria */
const galleryData = {
    'pascoa': {
        title: 'Especiais de Páscoa',
        photos: [
            { src: 'assets/pascoa-ovo-colher.jpg', alt: 'Ovo de Colher Gourmet' },
            { src: 'assets/pascoa-coelho-bolo.jpg', alt: 'Bolo temático de Páscoa' },
            { src: 'assets/pascoa-chocolates.jpg', alt: 'Caixa de chocolates artesanais' },
            // Adicione aqui os caminhos reais para as suas fotos de Páscoa
        ]
    },
    'natal': {
        title: 'Delícias de Natal',
        photos: [
            { src: 'assets/natal-panetone.jpg', alt: 'Panetone Trufado' },
            { src: 'assets/natal-guirlanda.jpg', alt: 'Bolo Guirlanda' },
            { src: 'assets/natal-cookies.jpg', alt: 'Caixa de Cookies natalinos' },
        ]
    },
    'bolos': {
        title: 'Bolos Personalizados',
        photos: [
            { src: 'assets/bolos-casamento.jpg', alt: 'Bolo de Casamento' },
            { src: 'assets/bolos-infantil.jpg', alt: 'Bolo Infantil' },
            { src: 'assets/bolos-formatura.jpg', alt: 'Bolo de Formatura' },
        ]
    },
    'brigadeiros-gourmet': {
        title: 'Brigadeiros Gourmet',
        photos: [
            { src: 'assets/brigadeiros-pistache.jpg', alt: 'Brigadeiro de Pistache' },
            { src: 'assets/brigadeiros-oreo.jpg', alt: 'Brigadeiro de Oreo' },
            { src: 'assets/brigadeiros-caixa.jpg', alt: 'Caixa de Brigadeiros' },
        ]
    },
    'sobremesas': {
        title: 'Sobremesas Especiais',
        photos: [
            { src: 'assets/sobremesas-tiramisu.jpg', alt: 'Tiramisu' },
            { src: 'assets/sobremesas-cheesecake.jpg', alt: 'Cheesecake' },
        ]
    },
    'bolos-pote': {
        title: 'Bolos no Pote',
        photos: [
            { src: 'assets/pote-red-velvet.jpg', alt: 'Bolo no Pote Red Velvet' },
            { src: 'assets/pote-cenoura.jpg', alt: 'Bolo no Pote de Cenoura' },
        ]
    },
};


/* FUNÇÃO MODIFICADA DE NAVEGAÇÃO ENTRE SEÇÕES COM HISTORY API (SPA FIX) */
function showSection(sectionId, shouldPushState = true) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostra a seção alvo
    document.getElementById(sectionId).classList.add('active');
    
    // Rola para o topo
    window.scrollTo(0, 0);

    // ********** CORREÇÃO DO BOTÃO VOLTAR NATIVO: HISTORY API **********
    if (shouldPushState) {
        // Altera a URL no navegador sem recarregar a página, registrando o estado.
        const url = sectionId === 'home' ? './' : `#${sectionId}`;
        history.pushState({ section: sectionId, folder: null }, '', url);
    }
    // ******************************************************

    // Garante que a galeria inicie nas pastas
    if (sectionId === 'gallery') {
        showFolders(false); 
    }
}


// ********** FUNÇÕES DA GALERIA **********

/**
 * Carrega e exibe as fotos de uma pasta específica da galeria.
 * @param {string} folderKey - A chave da pasta no objeto galleryData.
 */
function loadGalleryFolder(folderKey) {
    const data = galleryData[folderKey];
    const photosGrid = document.getElementById('photos-grid');
    const folderTitle = document.getElementById('current-folder-title');
    
    if (!data) {
        photosGrid.innerHTML = '<p style="text-align: center;">Galeria não encontrada.</p>';
        return;
    }

    // 1. Atualiza o título
    folderTitle.textContent = data.title;

    // 2. Constrói o HTML das fotos
    let photosHtml = '';
    data.photos.forEach(photo => {
        // Gera o HTML de cada item de foto
        photosHtml += `
            <div class="gallery-photo-item">
                <img src="${photo.src}" alt="${photo.alt}">
            </div>
        `;
    });
    photosGrid.innerHTML = photosHtml;

    // 3. Alterna a visualização para as fotos
    const foldersView = document.querySelector('.gallery-folders');
    const photosView = document.querySelector('.gallery-photos');

    foldersView.classList.remove('active-view');
    photosView.classList.add('active-view');

    // 4. Atualiza o histórico para que o botão 'Voltar' nativo funcione
    history.pushState({ section: 'gallery', folder: folderKey }, '', `#gallery/${folderKey}`);
}

/**
 * Retorna para a visualização principal de pastas da galeria.
 * @param {boolean} shouldPushState - Se deve adicionar um novo estado ao histórico (padrão: true).
 */
function showFolders(shouldPushState = true) {
    const foldersView = document.querySelector('.gallery-folders');
    const photosView = document.querySelector('.gallery-photos');

    photosView.classList.remove('active-view');
    foldersView.classList.add('active-view');

    // Se a função foi chamada pelo botão 'Voltar' do navegador, não adiciona ao histórico
    if (shouldPushState) {
        history.pushState({ section: 'gallery', folder: null }, '', '#gallery');
    }
}


// ********** FUNÇÕES DO CARDÁPIO (CARROSSEL) **********

/**
 * Altera a página do cardápio (imagem) e atualiza os controles.
 * @param {number} direction - 1 para Próxima, -1 para Anterior.
 */
function changeMenuPage(direction) {
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= totalMenuPages) {
        currentPage = newPage;
        
        const imgElement = document.getElementById('menu-page-image');
        const counterElement = document.getElementById('page-counter');
        const prevBtn = document.getElementById('prev-page-btn');
        const nextBtn = document.getElementById('next-page-btn');

        // 1. Atualiza a imagem com o novo nome de arquivo (catalogo1.jpg, catalogo2.jpg, etc.)
        imgElement.src = `assets/${fileNamePrefix}${currentPage}.jpg`;
        imgElement.alt = `Página ${currentPage} do Cardápio Cati Cake`;

        // 2. Atualiza o contador
        counterElement.textContent = `${currentPage} / ${totalMenuPages}`;

        // 3. Atualiza os botões (desabilitar/habilitar)
        prevBtn.disabled = (currentPage === 1);
        nextBtn.disabled = (currentPage === totalMenuPages);
    }
}


/* EFEITOS INTERATIVOS & INICIALIZAÇÃO */
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
        if (header && document.getElementById('home').classList.contains('active')) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        } else {
            header.style.transform = `translateY(0px)`;
        }
    });

    // ********** CORREÇÃO DO BOTÃO VOLTAR NATIVO: DETECTAR POPSTATE **********
    window.addEventListener('popstate', function(event) {
        const state = event.state;
        
        if (state && state.section === 'gallery') {
            if (state.folder) {
                // Voltou de uma seção externa para uma sub-galeria
                loadGalleryFolder(state.folder);
            } else {
                // Voltou de uma sub-galeria para as pastas
                showFolders(false); 
            }
            return; 
        }
        
        // Lógica de navegação entre seções (Home, Biography, Menu)
        const targetSection = (state && state.section) ? state.section : 'home';
        showSection(targetSection, false); 
    });

    // ********** INICIALIZAÇÃO CORRETA: Lidar com a URL de carregamento **********
    const urlParts = window.location.hash.substring(1).split('/');
    const initialSection = urlParts[0] || 'home';
    const initialFolder = urlParts[1] || null;

    if (initialSection === 'gallery' && initialFolder && galleryData[initialFolder]) {
        // Se a URL for tipo #gallery/bolos, carrega direto a sub-galeria
        showSection('gallery', false);
        loadGalleryFolder(initialFolder);
    } else {
        // Caso contrário, carrega a seção principal
        showSection(initialSection, false);
    }
    
    // Inicializa o cardápio (garante que os botões estejam corretos ao iniciar)
    if (initialSection === 'menu') {
        currentPage = 1;
        changeMenuPage(0); // Chamada neutra para apenas atualizar o estado visual
    }
    // ******************************************************
});