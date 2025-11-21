// Mobile Menu Toggle - Simple and Reliable
(function() {
    'use strict';
    
    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        if (!mobileMenuToggle || !mobileNav) {
            console.log('Mobile menu elements not found');
            return;
        }

        console.log('Mobile menu initialized');

        // Toggle menu
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = mobileNav.classList.contains('active');
            
            if (isActive) {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                mobileMenuToggle.classList.add('active');
                mobileNav.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });

        // Close menu when clicking a link
        mobileNavLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
})();

// Smooth scroll navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
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
});

// Active navigation state
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(function(link) {
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
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');

    const projectObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    projectItems.forEach(function(item) {
        projectObserver.observe(item);
    });
});

// Parallax effect for section numbers
window.addEventListener('scroll', function() {
    const sectionNumbers = document.querySelectorAll('.section-number');
    sectionNumbers.forEach(function(number) {
        const rect = number.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * 0.05;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            number.style.transform = 'translateY(' + rate + 'px)';
        }
    });
});

// Interactive Grid Click
document.addEventListener('DOMContentLoaded', function() {
    const interactiveGrid = document.getElementById('interactive-grid');
    if (interactiveGrid) {
        const cells = interactiveGrid.querySelectorAll('.grid-cell');
        cells.forEach(function(cell) {
            cell.addEventListener('click', function() {
                cell.style.transform = 'scale(0)';
                setTimeout(function() {
                    cell.style.transform = 'scale(1)';
                }, 300);
            });
        });
    }
});

// Ripple Effect
document.addEventListener('DOMContentLoaded', function() {
    const rippleCards = document.querySelectorAll('.ripple-effect');
    rippleCards.forEach(function(card) {
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
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
        });
    });
});

// Wave Animation
document.addEventListener('DOMContentLoaded', function() {
    const waveContainers = document.querySelectorAll('.wave-container');
    waveContainers.forEach(function(container) {
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.classList.add('wave');
            wave.style.animationDelay = (i * 0.5) + 's';
            wave.style.opacity = 0.3 - (i * 0.1);
            container.appendChild(wave);
        }
    });
});

// Hover Card Interaction
document.addEventListener('DOMContentLoaded', function() {
    const hoverCard = document.getElementById('hover-card');
    if (hoverCard) {
        const emojis = ['👋', '✌️', '🤘', '👍', '🎨', '✨'];
        let currentIndex = 0;
        
        hoverCard.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % emojis.length;
            const emoji = hoverCard.querySelector('.hover-emoji');
            emoji.style.transform = 'scale(0) rotate(180deg)';
            
            setTimeout(function() {
                emoji.textContent = emojis[currentIndex];
                emoji.style.transform = 'scale(1) rotate(0deg)';
            }, 150);
        });
    }
});

// Click Card Feedback
document.addEventListener('DOMContentLoaded', function() {
    const clickCard = document.getElementById('click-card');
    if (clickCard) {
        let clickCount = 0;
        const target = clickCard.querySelector('.click-target');
        
        clickCard.addEventListener('click', function() {
            clickCount++;
            
            const ring = document.createElement('div');
            ring.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; border: 2px solid #1c1917; border-radius: 50%; pointer-events: none;';
            clickCard.appendChild(ring);
            
            ring.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(2)', opacity: 0 }
            ], {
                duration: 500,
                easing: 'ease-out'
            }).onfinish = function() { ring.remove(); };
            
            if (clickCount % 3 === 0) {
                target.style.background = '#1c1917';
                setTimeout(function() {
                    target.style.background = 'transparent';
                }, 200);
            }
        });
    }
});

// Morph Card Interaction
document.addEventListener('DOMContentLoaded', function() {
    const morphCard = document.getElementById('morph-card');
    if (morphCard) {
        morphCard.addEventListener('mouseenter', function() {
            const shape = morphCard.querySelector('.morph-shape');
            if (shape) shape.style.animationDuration = '2s';
        });
        
        morphCard.addEventListener('mouseleave', function() {
            const shape = morphCard.querySelector('.morph-shape');
            if (shape) shape.style.animationDuration = '4s';
        });
    }
});

// Add subtle parallax to bento cards (desktop only)
document.addEventListener('DOMContentLoaded', function() {
    const bentoCards = document.querySelectorAll('.bento-card');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
        bentoCards.forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                card.style.transform = 'perspective(1000px) rotateY(' + (deltaX * 2) + 'deg) rotateX(' + (-deltaY * 2) + 'deg) translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        });
    }
});
