// Service worker registration
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').catch(() => {});
	});
}

// Header scroll effect
function handleHeaderScroll() {
	const header = document.querySelector('.site-header');
	if (window.scrollY > 100) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
}

// Year in footer
document.addEventListener('DOMContentLoaded', () => {
	const yearSpan = document.getElementById('year');
	if (yearSpan) yearSpan.textContent = new Date().getFullYear();
	
	// Smooth scroll for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				const headerHeight = document.querySelector('.site-header').offsetHeight;
				const targetPosition = target.offsetTop - headerHeight - 20;
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		});
	});
	
	// Add scroll event listener
	window.addEventListener('scroll', handleHeaderScroll);
	
	// Animate menu items on scroll
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);
	
	// Observe menu categories
	document.querySelectorAll('.menu-category').forEach(category => {
		category.style.opacity = '0';
		category.style.transform = 'translateY(30px)';
		category.style.transition = 'all 0.6s ease';
		observer.observe(category);
	});
	
	// Observe gallery items
	document.querySelectorAll('.gallery-grid figure').forEach(figure => {
		figure.style.opacity = '0';
		figure.style.transform = 'scale(0.9)';
		figure.style.transition = 'all 0.6s ease';
		observer.observe(figure);
	});
});

// Gallery loader using existing images in project root
const galleryImages = [
	"WhatsApp Image 2025-09-02 a4t 6.53.08 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.02 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.02 PM1.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.024 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.03 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.03 PM4.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.04 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.05 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.06 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.07 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.08 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.09 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.10 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.11 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.12 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.13 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.14 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.53.409 PM.jpeg",
	"WhatsApp Image 2025-09-02 at 6.543.13 PM.jpeg",
	"WhatsApp Image 2025-09-02 at3 6.53.06 PM.jpeg",
	"WhatsApp Image 2025-09-024 at 6.53.10 PM.jpeg",
	"WhatsApp Image 2025-209-02 at 6.53.05 PM.jpeg",
	"WhatsApp Image 2025-409-02 at 6.53.11 PM.jpeg"
];

function createGallery() {
	const grid = document.getElementById('gallery-grid');
	if (!grid) return;
	const fragment = document.createDocumentFragment();
	for (const fileName of galleryImages) {
		const figure = document.createElement('figure');
		const img = document.createElement('img');
		img.loading = 'lazy';
		img.decoding = 'async';
		img.alt = 'Cash Club Dubai photo';
		img.src = `/${encodeURI(fileName)}`;
		img.width = 800;
		img.height = 1000;
		figure.appendChild(img);
		fragment.appendChild(figure);
	}
	grid.appendChild(fragment);
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', createGallery);
} else {
	createGallery();
}


