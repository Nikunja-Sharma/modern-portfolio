// Smooth scroll navigation
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

// Active navigation state
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Intersection Observer for project items
const projectItems = document.querySelectorAll('.project-item');

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

projectItems.forEach(item => {
    projectObserver.observe(item);
});

// Parallax effect for section numbers
window.addEventListener('scroll', () => {
    const sectionNumbers = document.querySelectorAll('.section-number');
    sectionNumbers.forEach(number => {
        const rect = number.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * 0.05;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            number.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Interactive Grid Click
const interactiveGrid = document.getElementById('interactive-grid');
if (interactiveGrid) {
    const cells = interactiveGrid.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cell.style.transform = 'scale(0)';
            setTimeout(() => {
                cell.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// Ripple Effect
const rippleCards = document.querySelectorAll('.ripple-effect');
rippleCards.forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Wave Animation
const waveContainers = document.querySelectorAll('.wave-container');
waveContainers.forEach(container => {
    for (let i = 0; i < 3; i++) {
        const wave = document.createElement('div');
        wave.classList.add('wave');
        wave.style.animationDelay = `${i * 0.5}s`;
        wave.style.opacity = 0.3 - (i * 0.1);
        container.appendChild(wave);
    }
});

// Hover Card Interaction
const hoverCard = document.getElementById('hover-card');
if (hoverCard) {
    const emojis = ['👋', '✌️', '🤘', '👍', '🎨', '✨'];
    let currentIndex = 0;
    
    hoverCard.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % emojis.length;
        const emoji = hoverCard.querySelector('.hover-emoji');
        emoji.style.transform = 'scale(0) rotate(180deg)';
        
        setTimeout(() => {
            emoji.textContent = emojis[currentIndex];
            emoji.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
    });
}

// Click Card Feedback
const clickCard = document.getElementById('click-card');
if (clickCard) {
    let clickCount = 0;
    const target = clickCard.querySelector('.click-target');
    
    clickCard.addEventListener('click', () => {
        clickCount++;
        
        // Create expanding ring
        const ring = document.createElement('div');
        ring.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 40px;
            height: 40px;
            border: 2px solid #1c1917;
            border-radius: 50%;
            pointer-events: none;
        `;
        clickCard.appendChild(ring);
        
        // Animate ring
        ring.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
        ], {
            duration: 500,
            easing: 'ease-out'
        }).onfinish = () => ring.remove();
        
        // Change target color based on clicks
        if (clickCount % 3 === 0) {
            target.style.background = '#1c1917';
            setTimeout(() => {
                target.style.background = 'transparent';
            }, 200);
        }
    });
}

// Morph Card Interaction
const morphCard = document.getElementById('morph-card');
if (morphCard) {
    morphCard.addEventListener('mouseenter', () => {
        const shape = morphCard.querySelector('.morph-shape');
        shape.style.animationDuration = '2s';
    });
    
    morphCard.addEventListener('mouseleave', () => {
        const shape = morphCard.querySelector('.morph-shape');
        shape.style.animationDuration = '4s';
    });
}

// Cursor Trail Effect (subtle)
let cursorTrail = [];
const maxTrailLength = 5;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 1024) return; // Only on desktop
    
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > maxTrailLength) {
        cursorTrail.shift();
    }
});

// Add subtle parallax to bento cards
const bentoCards = document.querySelectorAll('.bento-card');
bentoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        card.style.transform = `perspective(1000px) rotateY(${deltaX * 2}deg) rotateX(${-deltaY * 2}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
