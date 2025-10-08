// Script pour La Casa del Pro

// Initialisation lorsque le document est chargé
document.addEventListener('DOMContentLoaded', function() {
    // Animation au défilement
    initScrollAnimations();
    
    // Gestion du formulaire de contact
    initContactForm();
    
    // Navigation fluide
    initSmoothScrolling();
    
    // Navbar scroll effect
    initNavbarScroll();
    
    // Compteurs animés
    initCounters();
    
    // Animation des cartes de services
    initServiceCards();
});

// Animations au défilement
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-card, .animate-slide-left, .animate-slide-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationDelay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.style.animationPlayState = 'running';
                }, animationDelay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        // Ajouter un délai aléatoire pour un effet plus naturel
        const randomDelay = Math.random() * 0.5;
        element.setAttribute('data-delay', randomDelay * 1000);
        element.style.animationDelay = `${randomDelay}s`;
        observer.observe(element);
    });
}

// Gestion du formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const phone = contactForm.querySelector('input[type="tel"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const service = contactForm.querySelector('select').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simulation d'envoi (à remplacer par un vrai envoi)
            console.log('Demande de contact:', { name, phone, email, service, message });
            
            // Affichage d'un message de succès
            showNotification('Merci pour votre message! Nous vous contacterons dans les plus brefs délais.', 'success');
            
            // Réinitialisation du formulaire
            contactForm.reset();
        });
    }
}

// Notification
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Ajouter au body
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Navigation fluide
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Fermer le menu mobile si ouvert
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });
}

// Effet de la navbar au scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Compteurs animés
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 secondes
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animation des cartes de services
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
}

// Ajout des styles pour les notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 30px;
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        border-left: 4px solid #25D366;
    }
    
    .notification-success {
        border-left-color: #25D366;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-content i {
        font-size: 1.5rem;
        color: #25D366;
    }
    
    .notification-content span {
        font-weight: 500;
        color: #2c3e50;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 20px;
            left: 20px;
            max-width: none;
            transform: translateY(-100px);
        }
        
        .notification.show {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(notificationStyles);