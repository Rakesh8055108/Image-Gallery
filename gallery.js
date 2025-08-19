// Gallery data - in a real app, this might come from an API
const galleryData = [
    { id: 1, src: 'https://source.unsplash.com/random/600x400?nature', title: 'Mountain View', category: 'nature' },
    { id: 2, src: 'https://source.unsplash.com/random/600x400?city', title: 'City Lights', category: 'urban' },
    { id: 3, src: 'https://source.unsplash.com/random/600x400?art', title: 'Colorful Art', category: 'abstract' },
    { id: 4, src: 'https://source.unsplash.com/random/600x400?forest', title: 'Deep Forest', category: 'nature' },
    { id: 5, src: 'https://source.unsplash.com/random/600x400?building', title: 'Modern Architecture', category: 'urban' },
    { id: 6, src: 'https://source.unsplash.com/random/600x400?pattern', title: 'Geometric Pattern', category: 'abstract' },
    { id: 7, src: 'https://source.unsplash.com/random/600x400?waterfall', title: 'Waterfall', category: 'nature' },
    { id: 8, src: 'https://source.unsplash.com/random/600x400?street', title: 'Urban Street', category: 'urban' },
    { id: 9, src: 'https://source.unsplash.com/random/600x400?texture', title: 'Abstract Texture', category: 'abstract' },
    { id: 10, src: 'https://source.unsplash.com/random/600x400?lake', title: 'Serene Lake', category: 'nature' },
    { id: 11, src: 'https://source.unsplash.com/random/600x400?bridge', title: 'City Bridge', category: 'urban' },
    { id: 12, src: 'https://source.unsplash.com/random/600x400?paint', title: 'Color Splash', category: 'abstract' }
];

// Initialize the gallery
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
    setupEventListeners();
});

// Initialize gallery items
function initGallery() {
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.innerHTML = '';
    
    galleryData.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.dataset.category = item.category;
        galleryItem.innerHTML = `
            <img src="${item.src}" alt="${item.title}">
            <div class="item-info">
                <h3>${item.title}</h3>
                <span class="category">${item.category}</span>
            </div>
        `;
        galleryContainer.appendChild(galleryItem);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter gallery
            const filter = button.dataset.filter;
            filterGallery(filter);
        });
    });
    
    // Gallery items click for lightbox
    document.querySelector('.gallery-container').addEventListener('click', (e) => {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const index = Array.from(document.querySelectorAll('.gallery-item')).indexOf(galleryItem);
            openLightbox(index);
        }
    });
    
    // Lightbox controls
    document.querySelector('.close').addEventListener('click', closeLightbox);
    document.querySelector('.prev').addEventListener('click', () => navigateLightbox(-1));
    document.querySelector('.next').addEventListener('click', () => navigateLightbox(1));
    
    // Close lightbox when clicking outside content
    document.querySelector('.lightbox').addEventListener('click', (e) => {
        if (e.target === document.querySelector('.lightbox')) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
        }
    });
}

// Filter gallery based on category
function filterGallery(filter) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Lightbox functionality
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const imageTitle = document.querySelector('.image-title');
    const imageCategory = document.querySelector('.image-category');
    
    const item = galleryData[currentIndex];
    lightboxImg.src = item.src;
    imageTitle.textContent = item.title;
    imageCategory.textContent = item.category;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = ''; // Re-enable scrolling
}

function navigateLightbox(direction) {
    const galleryItems = document.querySelectorAll('.gallery-item:not([style*="display: none"])');
    currentIndex += direction;
    
    // Handle wrap-around
    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    } else if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }
    
    // Update lightbox with new image
    const visibleItems = Array.from(document.querySelectorAll('.gallery-item:not([style*="display: none"])'));
    const actualIndex = Array.from(document.querySelectorAll('.gallery-item')).indexOf(visibleItems[currentIndex]);
    
    const lightboxImg = document.querySelector('.lightbox-img');
    const imageTitle = document.querySelector('.image-title');
    const imageCategory = document.querySelector('.image-category');
    
    const item = galleryData[actualIndex];
    lightboxImg.src = item.src;
    imageTitle.textContent = item.title;
    imageCategory.textContent = item.category;
    
    // Add animation
    lightboxImg.style.animation = 'none';
    setTimeout(() => {
        lightboxImg.style.animation = 'zoom 0.3s ease';
    }, 10);
}
