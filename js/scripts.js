// ============================================
// LOGFULL - JavaScript Interativo
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MENU HAMBURGUER - MOBILE
    // ============================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animação do ícone hamburguer
            this.classList.toggle('active');
            
            // Prevenir scroll quando menu está aberto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ============================================
    // SCROLL SUAVE PARA ÂNCORAS
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#' && targetId !== '#!') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================
    // HEADER STICKY COM SOMBRA AO SCROLLAR
    // ============================================
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 12px rgba(10, 61, 98, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 4px rgba(10, 61, 98, 0.08)';
            }
        });
    }
    
    // ============================================
    // VALIDAÇÃO SIMPLES DO FORMULÁRIO
    // ============================================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        if (submitButton) {
            submitButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Elementos do formulário
                const nome = document.getElementById('nome');
                const email = document.getElementById('email');
                const mensagem = document.getElementById('mensagem');
                
                let isValid = true;
                let errorMessage = '';
                
                // Validação básica
                if (nome && nome.value.trim() === '') {
                    isValid = false;
                    errorMessage += '• Nome é obrigatório\n';
                    nome.style.borderColor = '#e74c3c';
                } else if (nome) {
                    nome.style.borderColor = '';
                }
                
                if (email && email.value.trim() === '') {
                    isValid = false;
                    errorMessage += '• Email é obrigatório\n';
                    email.style.borderColor = '#e74c3c';
                } else if (email && !isValidEmail(email.value)) {
                    isValid = false;
                    errorMessage += '• Email inválido\n';
                    email.style.borderColor = '#e74c3c';
                } else if (email) {
                    email.style.borderColor = '';
                }
                
                if (mensagem && mensagem.value.trim() === '') {
                    isValid = false;
                    errorMessage += '• Mensagem é obrigatória\n';
                    mensagem.style.borderColor = '#e74c3c';
                } else if (mensagem) {
                    mensagem.style.borderColor = '';
                }
                
                if (isValid) {
                    // Simulação de envio bem-sucedido
                    alert('✅ Mensagem enviada com sucesso!\n\nEntraremos em contato em breve.');
                    contactForm.reset();
                } else {
                    alert('⚠️ Por favor, corrija os seguintes erros:\n\n' + errorMessage);
                }
            });
        }
    }
    
    // ============================================
    // FUNÇÃO AUXILIAR - VALIDAR EMAIL
    // ============================================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ============================================
    // ANIMAÇÃO DE FADE IN AO SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const animatedElements = document.querySelectorAll(
        '.service-card, .value-card, .service-item, .content-grid'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // ============================================
    // CONSOLE LOG - INFORMAÇÕES DO SITE
    // ============================================
    console.log('%c🚚 LogFull - Sistema de Logística ', 'background: #0A3D62; color: #FFC938; font-size: 16px; padding: 8px; font-weight: bold;');
    console.log('%cSite institucional refatorado e otimizado', 'color: #1565C0; font-size: 12px;');
    
});

// ============================================
// PERFORMANCE - LAZY LOADING DE IMAGENS
// ============================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores antigos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}