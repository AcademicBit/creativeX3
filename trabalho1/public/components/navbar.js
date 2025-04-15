// Função para carregar a navbar
async function loadNavbar() {
    try {
        const response = await fetch('/components/navbar.html');
        const html = await response.text();
        document.body.insertAdjacentHTML('afterbegin', html);
        
        // Atualiza o link ativo baseado na URL atual
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
        
        // Adiciona padding-top no body para compensar a navbar fixa
        document.body.style.paddingTop = '70px';
    } catch (error) {
        console.error('Erro ao carregar a navbar:', error);
    }
}

// Carrega a navbar quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', loadNavbar); 