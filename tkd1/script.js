// Гамбургер меню
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Переключение мобильного меню
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Закрытие меню при клике вне его
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Изменение навбара при скролле
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Анимация элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Отключаем наблюдение после появления элемента для производительности
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Наблюдаем за всеми элементами с классом animate-on-scroll
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Подсветка активной ссылки в навигации
// const sections = document.querySelectorAll('section[id]');

// function highlightNavigation() {
//     const scrollY = window.pageYOffset;
    
//     sections.forEach(section => {
//         const sectionHeight = section.offsetHeight;
//         const sectionTop = section.offsetTop - navbar.offsetHeight - 10;
//         const sectionId = section.getAttribute('id');
//         const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
//         if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
//             navLinks.forEach(link => link.classList.remove('active-link'));
//             if (navLink) {
//                 navLink.classList.add('active-link');
//             }
//         }
//     });
// }

window.addEventListener('scroll', highlightNavigation);

// Ленивая загрузка iframe для улучшения производительности
const iframes = document.querySelectorAll('iframe');

const iframeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            // Iframe уже имеет src, просто добавляем класс loaded
            iframe.classList.add('loaded');
            iframeObserver.unobserve(iframe);
        }
    });
}, {
    rootMargin: '200px' // Загружаем видео за 200px до появления
});

iframes.forEach(iframe => {
    iframeObserver.observe(iframe);
});

// Анимация поясов при наведении
const beltItems = document.querySelectorAll('.belt-item');

beltItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Добавление эффекта параллакса для секций (опционально)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.poomsae-section, .hero, .freestyle-section');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        // Применяем небольшой параллакс эффект
        if (element.getBoundingClientRect().top < window.innerHeight && element.getBoundingClientRect().bottom > 0) {
            element.style.backgroundPosition = `center ${yPos}px`;
        }
    });
});

// Счетчик для анимации чисел (можно использовать для статистики)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Добавление эффекта ripple при клике на кнопки
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
    ripple.classList.add('ripple');
    
    const rippleElement = button.getElementsByClassName('ripple')[0];
    if (rippleElement) {
        rippleElement.remove();
    }
    
    button.appendChild(ripple);
}

// Применяем ripple эффект к ссылкам навигации
navLinks.forEach(link => {
    link.addEventListener('click', createRipple);
});

// Предзагрузка изображений и оптимизация
window.addEventListener('load', () => {
    // Удаляем класс loading после полной загрузки страницы
    document.body.classList.add('loaded');
    
    // Инициализируем все анимации
    setTimeout(() => {
        animatedElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});

// Обработка ошибок загрузки видео
iframes.forEach(iframe => {
    iframe.addEventListener('error', function() {
        console.error('Ошибка загрузки видео:', this.src);
        const container = this.closest('.video-container');
        if (container) {
            container.innerHTML = '<div style="padding: 2rem; text-align: center; color: #fff;">Видео временно недоступно</div>';
        }
    });
});

// Добавление кнопки "Наверх"
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

document.body.appendChild(scrollTopBtn);

// Показываем/скрываем кнопку "Наверх"
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// Прокрутка наверх при клике
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover эффект для кнопки "Наверх"
scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) translateY(0)';
});

// Добавление CSS для ripple эффекта
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link {
        position: relative;
        overflow: hidden;
    }
    
    .active-link {
        background: rgba(255, 255, 255, 0.25) !important;
        font-weight: 700;
    }
    
    .scroll-top-btn:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    }
    
    .scroll-top-btn:active {
        transform: scale(0.95) translateY(0) !important;
    }
`;

document.head.appendChild(style);

// Консольное сообщение для разработчиков
console.log('%c🥋 Пхумсе Тхэквондо', 'font-size: 24px; color: #667eea; font-weight: bold;');
console.log('%cСайт успешно загружен!', 'font-size: 14px; color: #764ba2;');
console.log('%cТренируйтесь усердно! 💪', 'font-size: 12px; color: #ff6b35;');
