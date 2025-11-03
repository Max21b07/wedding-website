// Audio Controls
const audioToggle = document.getElementById('audioToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

audioToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        audioToggle.textContent = '🎵';
        audioToggle.classList.remove('playing');
    } else {
        bgMusic.play();
        audioToggle.textContent = '🔊';
        audioToggle.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// Floating Hearts Animation
const heartsContainer = document.getElementById('heartsContainer');
const heartEmojis = ['💕', '💗', '💖', '💝', '💓', '💞'];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Create hearts periodically
setInterval(createHeart, 1500);

// Initial hearts
for (let i = 0; i < 5; i++) {
    setTimeout(createHeart, i * 300);
}

// Parallax Effect for Hero Image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxImg = document.querySelector('.parallax-img');
    if (parallaxImg) {
        parallaxImg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('active');
            }, delay);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        lightboxImg.src = item.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Keyboard Navigation for Lightbox
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Smooth Scroll Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add sparkle effect on mouse move
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.95) { // Only create sparkles occasionally
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.width = '5px';
        sparkle.style.height = '5px';
        sparkle.style.background = '#ffc0cb';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }
});

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Preload images for better performance
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================= //
// NEW PREMIUM UI INTERACTIONS //
// ========================= //

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Golden Particles Animation
const goldenParticlesContainer = document.getElementById('goldenParticles');

function createGoldenParticle() {
    const particle = document.createElement('div');
    particle.classList.add('golden-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 5 + 8) + 's';
    particle.style.animationDelay = Math.random() * 3 + 's';
    goldenParticlesContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 13000);
}

// Create golden particles periodically
setInterval(createGoldenParticle, 2000);

// Initial golden particles
for (let i = 0; i < 8; i++) {
    setTimeout(createGoldenParticle, i * 400);
}

// Confetti Animation for Final Section
const confettiContainer = document.getElementById('confettiContainer');
const confettiColors = ['#d4af37', '#ffc0cb', '#d4516f', '#e89bb5', '#ffd700'];

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    confetti.style.width = (Math.random() * 10 + 5) + 'px';
    confetti.style.height = (Math.random() * 10 + 5) + 'px';
    confettiContainer.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 6000);
}

// Observe final section to trigger confetti
const finalSection = document.querySelector('.final-section');
const confettiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start confetti
            const confettiInterval = setInterval(createConfetti, 150);

            // Create initial burst
            for (let i = 0; i < 30; i++) {
                setTimeout(createConfetti, i * 50);
            }

            // Stop after 10 seconds
            setTimeout(() => {
                clearInterval(confettiInterval);
            }, 10000);

            confettiObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

if (finalSection) {
    confettiObserver.observe(finalSection);
}

// Share Button with Ripple Effect
const shareBtn = document.getElementById('shareBtn');

if (shareBtn) {
    shareBtn.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        // Share functionality
        if (navigator.share) {
            navigator.share({
                title: 'Notre Mariage 💕',
                text: 'Venez célébrer notre mariage!',
                url: window.location.href
            }).catch(() => {});
        } else {
            // Fallback: copy URL
            navigator.clipboard.writeText(window.location.href).then(() => {
                const originalHTML = shareBtn.innerHTML;
                shareBtn.innerHTML = '<span>✓ Lien copié!</span><span class="vietnamese-cta">Đã sao chép!</span>';
                setTimeout(() => {
                    shareBtn.innerHTML = originalHTML;
                }, 2000);
            });
        }
    });
}

// Add ripple effect to all buttons and clickable elements
document.querySelectorAll('button, .gallery-item').forEach(element => {
    element.addEventListener('click', function(e) {
        if (this.classList.contains('gallery-item')) {
            return; // Skip gallery items as they have lightbox
        }

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Timeline badges animation on scroll
const timelineBadges = document.querySelectorAll('.timeline-badge');
const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'badge-pulse 2s infinite, badge-entrance 0.8s ease-out';
            badgeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

timelineBadges.forEach(badge => {
    badgeObserver.observe(badge);
});

// Add badge entrance animation
const badgeStyle = document.createElement('style');
badgeStyle.textContent = `
    @keyframes badge-entrance {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(-180deg);
            opacity: 0;
        }
        100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(badgeStyle);

// Enhanced sparkle effect - more golden particles
const originalSparkle = document.addEventListener;
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.97) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.width = '6px';
        sparkle.style.height = '6px';
        sparkle.style.background = Math.random() > 0.5 ? '#d4af37' : '#ffc0cb';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.boxShadow = '0 0 10px currentColor';
        sparkle.style.animation = 'sparkle 1.2s ease-out forwards';
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1200);
    }
});

// Letter-by-letter animation for titles (on first reveal)
const animateText = (element) => {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.animation = `letter-appear 0.5s ease forwards ${index * 0.03}s`;
        element.appendChild(span);
    });
};

const letterStyle = document.createElement('style');
letterStyle.textContent = `
    @keyframes letter-appear {
        0% {
            opacity: 0;
            transform: translateY(20px) rotateX(-90deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
        }
    }
`;
document.head.appendChild(letterStyle);

// Apply letter animation to hero title
window.addEventListener('load', () => {
    setTimeout(() => {
        const heroTitles = document.querySelectorAll('.hero-title .french, .hero-title .vietnamese');
        heroTitles.forEach((title, index) => {
            setTimeout(() => animateText(title), index * 800);
        });
    }, 500);
});

// ========================= //
// GUESTBOOK FUNCTIONALITY //
// ========================= //

const GUESTBOOK_STORAGE_KEY = 'wedding_guestbook_messages';

// Guestbook Class
class Guestbook {
    constructor() {
        this.form = document.getElementById('guestbookForm');
        this.messagesContainer = document.getElementById('guestbookMessages');
        this.emptyState = document.getElementById('guestbookEmpty');
        this.toggleBtn = document.getElementById('showPrivateToggle');
        this.messages = this.loadMessages();
        this.showPrivate = false;

        this.init();
    }

    init() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Toggle private messages
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.togglePrivateMessages());
        }

        // Display existing messages
        this.displayMessages();
    }

    loadMessages() {
        const stored = localStorage.getItem(GUESTBOOK_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    saveMessages() {
        localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(this.messages));
    }

    handleSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('guestName').value.trim();
        const messageText = document.getElementById('guestMessage').value.trim();
        const emoji = document.querySelector('input[name="emoji"]:checked').value;
        const visibility = document.querySelector('input[name="visibility"]:checked').value;

        if (!name || !messageText) return;

        const message = {
            id: Date.now(),
            name: name,
            text: messageText,
            emoji: emoji,
            visibility: visibility,
            date: new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        this.messages.unshift(message); // Add to beginning
        this.saveMessages();
        this.displayMessages();

        // Reset form with animation
        this.form.reset();

        // Success feedback
        this.showSuccessMessage();

        // Scroll to messages
        setTimeout(() => {
            this.messagesContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }

    togglePrivateMessages() {
        this.showPrivate = !this.showPrivate;

        if (this.showPrivate) {
            this.toggleBtn.classList.add('active');
            this.toggleBtn.querySelector('.toggle-icon').textContent = '🔓';
            this.toggleBtn.querySelector('.french').textContent = 'Masquer les messages privés';
            this.toggleBtn.querySelector('.vietnamese').textContent = 'Ẩn tin nhắn riêng tư';

            // Show private messages
            document.querySelectorAll('.guestbook-message[data-visibility="private"]').forEach(msg => {
                msg.classList.add('show-private');
            });
        } else {
            this.toggleBtn.classList.remove('active');
            this.toggleBtn.querySelector('.toggle-icon').textContent = '🔒';
            this.toggleBtn.querySelector('.french').textContent = 'Afficher les messages privés';
            this.toggleBtn.querySelector('.vietnamese').textContent = 'Hiện tin nhắn riêng tư';

            // Hide private messages
            document.querySelectorAll('.guestbook-message[data-visibility="private"]').forEach(msg => {
                msg.classList.remove('show-private');
            });
        }
    }

    showSuccessMessage() {
        const submitBtn = document.querySelector('.guestbook-submit');
        const originalHTML = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>✓ Merci !</span><span class="vietnamese">Cảm ơn !</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';

        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
        }, 2000);
    }

    displayMessages() {
        if (this.messages.length === 0) {
            this.emptyState.classList.add('visible');
            this.messagesContainer.innerHTML = '';
            return;
        }

        this.emptyState.classList.remove('visible');

        this.messagesContainer.innerHTML = this.messages.map(msg => {
            const visibility = msg.visibility || 'public';
            const badgeInfo = this.getVisibilityBadge(visibility);
            const displayName = visibility === 'anonymous' ? 'Utilisateur' : this.escapeHtml(msg.name);

            return `
                <div class="guestbook-message" data-id="${msg.id}" data-visibility="${visibility}">
                    <div class="message-visibility-badge ${badgeInfo.class}">
                        <span>${badgeInfo.icon}</span>
                        <span>${badgeInfo.label}</span>
                    </div>
                    <button class="message-delete" onclick="guestbook.deleteMessage(${msg.id})" title="Supprimer">×</button>
                    <div class="message-header">
                        <div class="message-emoji">${msg.emoji}</div>
                        <div class="message-info">
                            <div class="message-name">${displayName}</div>
                            <div class="message-date">${msg.date}</div>
                        </div>
                    </div>
                    <div class="message-text">${this.escapeHtml(msg.text)}</div>
                </div>
            `;
        }).join('');

        // Add counter
        this.updateCounter();
    }

    getVisibilityBadge(visibility) {
        const badges = {
            public: {
                icon: '👁️',
                label: 'Public',
                class: 'badge-public'
            },
            anonymous: {
                icon: '🎭',
                label: 'Anonyme',
                class: 'badge-anonymous'
            },
            private: {
                icon: '🔒',
                label: 'Privé',
                class: 'badge-private'
            }
        };
        return badges[visibility] || badges.public;
    }

    updateCounter() {
        let counter = document.querySelector('.message-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'message-counter';
            this.messagesContainer.parentNode.insertBefore(counter, this.messagesContainer);
        }

        const count = this.messages.length;
        counter.innerHTML = `
            <span class="count">${count}</span>
            ${count === 1 ? 'message' : 'messages'}
            <span style="opacity: 0.7;">/ tin nhắn</span>
        `;
    }

    deleteMessage(id) {
        if (!confirm('Voulez-vous vraiment supprimer ce message ?\nBạn có chắc muốn xóa tin nhắn này?')) {
            return;
        }

        const messageElement = document.querySelector(`[data-id="${id}"]`);

        // Animation before removal
        if (messageElement) {
            messageElement.style.animation = 'message-disappear 0.4s ease-out';

            setTimeout(() => {
                this.messages = this.messages.filter(msg => msg.id !== id);
                this.saveMessages();
                this.displayMessages();
            }, 400);
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Add disappear animation
const guestbookStyle = document.createElement('style');
guestbookStyle.textContent = `
    @keyframes message-disappear {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
        }
    }
`;
document.head.appendChild(guestbookStyle);

// Initialize Guestbook
let guestbook;
window.addEventListener('load', () => {
    guestbook = new Guestbook();
});

// Add some demo messages if empty (optional - remove in production)
window.addEventListener('load', () => {
    setTimeout(() => {
        const stored = localStorage.getItem(GUESTBOOK_STORAGE_KEY);
        if (!stored || JSON.parse(stored).length === 0) {
            // Add demo messages
            const demoMessages = [
                {
                    id: Date.now() - 1000,
                    name: "Marie & Pierre",
                    text: "Félicitations pour votre magnifique union ! Nous vous souhaitons tout le bonheur du monde. 💕",
                    emoji: "💕",
                    visibility: "public",
                    date: new Date(Date.now() - 86400000).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                },
                {
                    id: Date.now() - 2000,
                    name: "Nguyễn Thị Lan",
                    text: "Chúc hai bạn trăm năm hạnh phúc! Mãi mãi bên nhau nhé! 🥂",
                    emoji: "🥂",
                    visibility: "anonymous",
                    date: new Date(Date.now() - 172800000).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                },
                {
                    id: Date.now() - 3000,
                    name: "Jean & Sophie",
                    text: "Un message privé juste pour vous : Votre amour est inspirant ! Profitez de chaque instant ensemble. 💖",
                    emoji: "💖",
                    visibility: "private",
                    date: new Date(Date.now() - 259200000).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                }
            ];

            localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(demoMessages));
            if (guestbook) {
                guestbook.messages = demoMessages;
                guestbook.displayMessages();
            }
        }
    }, 1000);
});

console.log('💕 Site de mariage chargé avec amour! 💕');
console.log('💗 Wedding website loaded with love! 💗');
console.log('✨ Premium UI activated! ✨');
console.log('📖 Guestbook ready! ✨');

// ==========================================
// Guestbook Banner Control
// ==========================================
(function() {
    const banner = document.getElementById('guestbookBanner');
    const closeBanner = document.getElementById('closeBanner');
    const guestbookSection = document.getElementById('guestbook');
    
    let bannerDismissed = sessionStorage.getItem('bannerDismissed') === 'true';
    
    // Show banner after 3 seconds if not dismissed
    if (!bannerDismissed) {
        setTimeout(() => {
            banner.classList.add('show');
        }, 3000);
    }
    
    // Close banner
    closeBanner.addEventListener('click', () => {
        banner.classList.remove('show');
        sessionStorage.setItem('bannerDismissed', 'true');
    });
    
    // Hide banner when user scrolls to guestbook section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                banner.classList.remove('show');
            } else if (!bannerDismissed) {
                // Show again when scrolling away from guestbook
                const scrollPosition = window.scrollY;
                const guestbookPosition = guestbookSection.offsetTop;
                if (scrollPosition < guestbookPosition - 200) {
                    banner.classList.add('show');
                }
            }
        });
    }, { threshold: 0.1 });
    
    if (guestbookSection) {
        observer.observe(guestbookSection);
    }
})();
