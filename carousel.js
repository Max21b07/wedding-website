// ==========================================
// Gallery Carousel
// ==========================================
class GalleryCarousel {
    constructor() {
        this.currentSlide = 0;
        this.photos = [
            'photos/pro02.jpg', 'photos/candid03.jpg', 'photos/pro07.jpg',
            'photos/candid04.jpg', 'photos/pro08.jpg', 'photos/candid05.jpg',
            'photos/pro09.jpg', 'photos/candid06.jpg', 'photos/pro11.jpg',
            'photos/candid07.jpg', 'photos/pro12.jpg', 'photos/candid08.jpg',
            'photos/pro13.jpg', 'photos/candid09.jpg', 'photos/pro14.jpg',
            'photos/pro15.jpg', 'photos/pro03.jpg', 'photos/pro04.jpg',
            'photos/pro01.jpg', 'photos/pro05.jpg', 'photos/pro06.jpg',
            'photos/candid01.jpg', 'photos/candid02.jpg', 'photos/pro10.jpg'
        ];

        this.track = document.getElementById('carouselTrack');
        this.indicators = document.getElementById('carouselIndicators');
        this.prevBtn = document.getElementById('carouselPrev');
        this.nextBtn = document.getElementById('carouselNext');
        this.gridView = document.getElementById('galleryGrid');
        this.carouselView = document.getElementById('carouselContainer');

        this.init();
    }

    init() {
        this.buildCarousel();
        this.attachEvents();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.carouselView.style.display !== 'none') {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            }
        });

        // Swipe support
        this.addSwipeSupport();
    }

    buildCarousel() {
        // Build slides
        this.photos.forEach((photo, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = '<img src="' + photo + '" alt="Photo de mariage ' + (index + 1) + '" loading="lazy">';
            this.track.appendChild(slide);

            // Build indicator
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(indicator);
        });

        this.updateCarousel();
    }

    attachEvents() {
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Toggle between grid and carousel
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;

                // Update active button
                document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Toggle views
                if (view === 'carousel') {
                    this.gridView.style.display = 'none';
                    this.carouselView.style.display = 'block';
                } else {
                    this.gridView.style.display = 'grid';
                    this.carouselView.style.display = 'none';
                }
            });
        });
    }

    prev() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarousel();
        }
    }

    next() {
        if (this.currentSlide < this.photos.length - 1) {
            this.currentSlide++;
            this.updateCarousel();
        }
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }

    updateCarousel() {
        // Move track
        this.track.style.transform = 'translateX(-' + (this.currentSlide * 100) + '%)';

        // Update indicators
        document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        // Update buttons state
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.photos.length - 1;
    }

    addSwipeSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    }
}

// Initialize carousel when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GalleryCarousel();
    });
} else {
    new GalleryCarousel();
}
