// ==========================================
// Guestbook with Firebase
// ==========================================
class FirebaseGuestbook {
    constructor() {
        this.form = document.getElementById('guestbookForm');
        this.messagesContainer = document.getElementById('guestbookMessages');
        this.emptyState = document.getElementById('guestbookEmpty');
        this.toggleBtn = document.getElementById('showPrivateToggle');
        this.showPrivate = false;
        this.db = window.db;

        this.init();
    }

    init() {
        // Check if Firebase is loaded
        if (!this.db) {
            console.error('Firebase not initialized');
            this.fallbackToLocalStorage();
            return;
        }

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.togglePrivateMessages());
        }

        // Real-time listener for messages
        this.listenForMessages();

        // Add some demo messages if collection is empty (first time)
        this.addDemoMessagesIfEmpty();
    }

    async addDemoMessagesIfEmpty() {
        try {
            const snapshot = await this.db.collection('guestbook').limit(1).get();
            if (snapshot.empty) {
                const demoMessages = [
                    {
                        name: "Marie & Pierre",
                        text: "Félicitations pour votre magnifique union ! Nous vous souhaitons tout le bonheur du monde. 💕",
                        emoji: "💕",
                        visibility: "public",
                        date: new Date().toISOString(),
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    },
                    {
                        name: "Nguyễn Thị Lan",
                        text: "Chúc hai bạn trăm năm hạnh phúc! Mãi mãi bên nhau nhé! 🎉",
                        emoji: "🥂",
                        visibility: "anonymous",
                        date: new Date().toISOString(),
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    },
                    {
                        name: "Jean & Sophie",
                        text: "Un message privé juste pour vous : Votre amour est inspirant! Profitez de chaque instant ensemble. ❤️",
                        emoji: "💖",
                        visibility: "private",
                        date: new Date().toISOString(),
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }
                ];

                for (const msg of demoMessages) {
                    await this.db.collection('guestbook').add(msg);
                }
            }
        } catch (error) {
            console.error('Error adding demo messages:', error);
        }
    }

    listenForMessages() {
        // Only show approved messages (or all if showPrivate is true for admin)
        this.db.collection('guestbook')
            .where('approved', '==', true)
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                this.displayMessages(snapshot);
            }, (error) => {
                console.error('Error listening to messages:', error);
            });
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Honeypot check (anti-spam)
        const honeypot = document.getElementById('website');
        if (honeypot && honeypot.value !== '') {
            console.log('Spam detected via honeypot');
            this.showNotification('Erreur lors de la soumission', 'error');
            return;
        }

        // RGPD consent check
        const rgpdConsent = document.getElementById('rgpdConsent');
        if (!rgpdConsent || !rgpdConsent.checked) {
            this.showNotification('Veuillez accepter les conditions RGPD / Vui lòng chấp nhận điều khoản RGPD', 'error');
            return;
        }

        const name = document.getElementById('guestName').value.trim();
        const messageText = document.getElementById('guestMessage').value.trim();
        const emoji = document.querySelector('input[name="emoji"]:checked').value;
        const visibility = document.querySelector('input[name="visibility"]:checked').value;

        if (!name || !messageText) {
            this.showNotification('Veuillez remplir tous les champs / Vui lòng điền đầy đủ', 'error');
            return;
        }

        // Basic spam detection
        if (messageText.length < 10) {
            this.showNotification('Le message doit contenir au moins 10 caractères / Tin nhắn phải có ít nhất 10 ký tự', 'error');
            return;
        }

        // Check for spam patterns (too many links)
        const linkCount = (messageText.match(/https?:\/\//g) || []).length;
        if (linkCount > 2) {
            this.showNotification('Trop de liens dans le message / Quá nhiều liên kết trong tin nhắn', 'error');
            return;
        }

        const message = {
            name: name,
            text: messageText,
            emoji: emoji,
            visibility: visibility,
            date: new Date().toISOString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            moderated: false, // En attente de modération
            approved: false,  // Pas encore approuvé
            userAgent: navigator.userAgent.substring(0, 100) // Pour détecter les bots
        };

        try {
            await this.db.collection('guestbook').add(message);

            this.form.reset();
            document.querySelector('input[name="emoji"][value="💕"]').checked = true;
            document.querySelector('input[name="visibility"][value="public"]').checked = true;

            this.showNotification('Message ajouté avec succès! / Đã thêm tin nhắn!', 'success');

            // Scroll to messages
            setTimeout(() => {
                this.messagesContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 500);

        } catch (error) {
            console.error('Error adding message:', error);
            this.showNotification('Erreur lors de l\'ajout / Lỗi khi thêm', 'error');
        }
    }

    displayMessages(snapshot) {
        const messages = [];
        snapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() });
        });

        if (messages.length === 0) {
            this.emptyState.style.display = 'block';
            this.messagesContainer.style.display = 'none';
            if (this.toggleBtn) this.toggleBtn.style.display = 'none';
            return;
        }

        this.emptyState.style.display = 'none';
        this.messagesContainer.style.display = 'grid';
        if (this.toggleBtn) this.toggleBtn.style.display = 'flex';

        this.messagesContainer.innerHTML = messages.map(msg => {
            const visibility = msg.visibility || 'public';
            const badgeInfo = this.getVisibilityBadge(visibility);
            const displayName = visibility === 'anonymous' ? 'Utilisateur' : this.escapeHtml(msg.name);
            const formattedDate = this.formatDate(msg.date);

            return `
                <div class="guestbook-message" data-id="${msg.id}" data-visibility="${visibility}">
                    <div class="message-visibility-badge ${badgeInfo.class}">
                        <span>${badgeInfo.icon}</span>
                        <span>${badgeInfo.label}</span>
                    </div>
                    <div class="message-header">
                        <div class="message-avatar">${msg.emoji}</div>
                        <div class="message-info">
                            <div class="message-name">${displayName}</div>
                            <div class="message-date">${formattedDate}</div>
                        </div>
                    </div>
                    <div class="message-text">${this.escapeHtml(msg.text)}</div>
                </div>
            `;
        }).join('');

        // Update counter
        const publicCount = messages.filter(m => m.visibility !== 'private').length;
        const totalCount = messages.length;
        const counterText = this.showPrivate
            ? `${totalCount} message${totalCount > 1 ? 's' : ''} / tin nhắn`
            : `${publicCount} message${publicCount > 1 ? 's' : ''} / tin nhắn`;

        document.querySelector('.guestbook-header p')?.remove();
        const header = document.querySelector('.guestbook-header');
        if (header && !header.querySelector('.message-counter')) {
            const counter = document.createElement('p');
            counter.className = 'message-counter';
            counter.textContent = counterText;
            counter.style.cssText = 'font-size: 1.1rem; color: #d4af37; margin-top: 10px;';
            header.appendChild(counter);
        }
    }

    togglePrivateMessages() {
        this.showPrivate = !this.showPrivate;

        if (this.showPrivate) {
            this.toggleBtn.classList.add('active');
            this.toggleBtn.querySelector('.toggle-icon').textContent = '🔓';
            this.toggleBtn.querySelector('.french').textContent = 'Masquer les messages privés';
            this.toggleBtn.querySelector('.vietnamese').textContent = 'Ẩn tin nhắn riêng tư';

            document.querySelectorAll('.guestbook-message[data-visibility="private"]').forEach(msg => {
                msg.classList.add('show-private');
            });
        } else {
            this.toggleBtn.classList.remove('active');
            this.toggleBtn.querySelector('.toggle-icon').textContent = '🔒';
            this.toggleBtn.querySelector('.french').textContent = 'Afficher les messages privés';
            this.toggleBtn.querySelector('.vietnamese').textContent = 'Hiện tin nhắn riêng tư';

            document.querySelectorAll('.guestbook-message[data-visibility="private"]').forEach(msg => {
                msg.classList.remove('show-private');
            });
        }
    }

    getVisibilityBadge(visibility) {
        const badges = {
            public: { icon: '👁️', label: 'Public', class: 'badge-public' },
            anonymous: { icon: '🎭', label: 'Anonyme', class: 'badge-anonymous' },
            private: { icon: '🔒', label: 'Privé', class: 'badge-private' }
        };
        return badges[visibility] || badges.public;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #46d36f, #2ecc71)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            font-family: 'Noto Sans', sans-serif;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    fallbackToLocalStorage() {
        console.log('Falling back to localStorage');
        // Keep the old Guestbook class as fallback
    }
}

// Initialize when Firebase is ready
window.addEventListener('load', () => {
    // Wait a bit for Firebase to initialize
    setTimeout(() => {
        if (window.db) {
            new FirebaseGuestbook();
        } else {
            console.error('Firebase Firestore not available');
        }
    }, 1000);
});
