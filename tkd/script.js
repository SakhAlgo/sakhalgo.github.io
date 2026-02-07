// Темная/светлая тема
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Проверяем сохраненную тему или используем светлую по умолчанию
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);

// Обновляем иконку в зависимости от текущей темы
if (savedTheme === 'dark') {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Переключение темы
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Обновляем иконку
    if (newTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Мобильное меню
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Анимация гамбургера
    hamburger.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Модальное окно для пхумсе
const modal = document.getElementById('poomsae-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalVideo = document.getElementById('modal-video');

// Открытие модального окна при клике на кнопку "Подробнее"
document.querySelectorAll('.btn-outline').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Получаем название пхумсе из карточки
        const card = button.closest('.poomsae-card');
        const title = card.querySelector('.card-header h3').textContent + ' (' + 
                     card.querySelector('.card-header p').textContent + ')';
        
        modalTitle.textContent = title;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Предотвращаем прокрутку фона
        
        // Автовоспроизведение видео при открытии модального окна
        setTimeout(() => {
            modalVideo.play().catch(e => console.log("Автовоспроизведение заблокировано:", e));
        }, 300);
    });
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку
    
    // Останавливаем видео при закрытии
    modalVideo.pause();
    modalVideo.currentTime = 0;
});

// Закрытие модального окна при клике вне его области
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
});

// Календарь событий
const calendarDays = document.getElementById('calendar-days');
const currentMonthYear = document.getElementById('current-month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Инициализация календаря
renderCalendar(currentMonth, currentYear);

prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Начало недели
    
    currentMonthYear.textContent = getMonthName(month) + ' ' + year;
    
    calendarDays.innerHTML = '';
    
    // Создаем дни календаря
    for (let i = 0; i < 42; i++) { // 6 недель * 7 дней
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day.getDate();
        
        // Проверяем, относится ли день к текущему месяцу
        if (day.getMonth() === month && day.getFullYear() === year) {
            dayElement.classList.add('current-month');
            
            // Отмечаем сегодняшний день
            const today = new Date();
            if (day.toDateString() === today.toDateString()) {
                dayElement.classList.add('today');
            }
        } else {
            dayElement.classList.add('other-month');
            dayElement.style.color = 'var(--text-light)';
        }
        
        // Добавляем обработчик клика
        dayElement.addEventListener('click', () => {
            // Здесь можно добавить функционал выбора даты
            console.log(`Выбрана дата: ${day.getDate()}.${day.getMonth() + 1}.${day.getFullYear()}`);
        });
        
        calendarDays.appendChild(dayElement);
    }
}

function getMonthName(month) {
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return months[month];
}

// Система прогресса
function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const completedCount = document.getElementById('completed-count');
    const totalCount = document.getElementById('total-count');
    const currentLevel = document.getElementById('current-level');
    
    // В реальном приложении эти данные будут получаться из системы учета пользователя
    const completed = 4; // Пример: сколько пхумсе завершено
    const total = 12; // Пример: всего пхумсе
    const level = 'Желтый пояс (8 гуп)'; // Пример: текущий уровень
    
    const percentage = (completed / total) * 100;
    
    progressFill.style.width = `${percentage}%`;
    completedCount.textContent = completed;
    totalCount.textContent = total;
    currentLevel.textContent = level;
}

// Инициализация прогресса
updateProgress();

// Анимация при прокрутке
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .poomsae-card, .blog-card, .achievement-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Устанавливаем начальные стили для анимации
document.querySelectorAll('.feature-card, .poomsae-card, .blog-card, .achievement-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Добавляем обработчик прокрутки
window.addEventListener('scroll', animateOnScroll);

// Инициализация анимации при загрузке
setTimeout(animateOnScroll, 100);

// Таймер тренировок (функционал для интерактивного таймера)
function initializeTimer() {
    // В реальном приложении здесь будет реализован таймер
    console.log('Таймер тренировок инициализирован');
}

// Инициализация таймера
initializeTimer();

// Функция для фильтрации пхумсе по уровню сложности
function filterPoomsaeByLevel(level) {
    // В реальном приложении здесь будет фильтрация карточек пхумсе
    console.log(`Фильтрация пхумсе по уровню: ${level}`);
    
    // Пример: показать только пхумсе с определенным классом сложности
    const cards = document.querySelectorAll('.poomsae-card');
    cards.forEach(card => {
        if (level === 'all') {
            card.style.display = 'block';
        } else {
            const difficulty = card.querySelector('.difficulty-badge').classList.contains(level) ? level : null;
            card.style.display = difficulty === level ? 'block' : 'none';
        }
    });
}

// Поиск по пхумсе
function searchPoomsae(query) {
    // В реальном приложении здесь будет поиск по названиям и описаниям пхумсе
    console.log(`Поиск пхумсе по запросу: ${query}`);
    
    // Пример: фильтрация карточек по содержанию текста
    const cards = document.querySelectorAll('.poomsae-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query.toLowerCase()) ? 'block' : 'none';
    });
}

// Инициализация интерактивных элементов
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики для фильтров и поиска
    console.log('Интерактивные элементы инициализированы');
    
    // Добавляем плавную прокрутку для кнопок "Смотреть пхумсе" в секции поясов
    const watchButtons = document.querySelectorAll('.btn-watch');
    watchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Добавляем плавную прокрутку для ссылок поясов в навигации
    const beltLinks = document.querySelectorAll('.belt-link');
    beltLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Находим соответствующий пояс в секции по ID
            const beltColor = this.getAttribute('data-belt');
            let targetElement;
            
            switch(beltColor) {
                case 'yellow':
                    targetElement = document.querySelector('#yellow-belt');
                    break;
                case 'green':
                    targetElement = document.querySelector('#green-belt');
                    break;
                case 'blue':
                    targetElement = document.querySelector('#blue-belt');
                    break;
                case 'red':
                    targetElement = document.querySelector('#red-belt');
                    break;
                case 'brown':
                    targetElement = document.querySelector('#brown-belt');
                    break;
                case 'black':
                    targetElement = document.querySelector('#black-belt');
                    break;
                default:
                    targetElement = document.querySelector('#belt-ranks');
            }
            
            if (targetElement) {
                // Прокручиваем к секции поясов и выделяем нужный пояс
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Добавляем временный класс для выделения выбранного пояса
                targetElement.classList.add('highlight');
                setTimeout(() => {
                    targetElement.classList.remove('highlight');
                }, 2000);
                
                // Закрываем мобильное меню после выбора
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Обработчик для гамбургер-меню
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Закрытие меню при клике на ссылку (для мобильных устройств)
    const beltLinks = document.querySelectorAll('.belt-link');
    beltLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// Функции для карусели поясов
let slideIndex = [1, 1, 1, 1, 1, 1]; // Индекс слайдов для каждого карусели

function changeSlide(n, carouselId) {
    slideIndex[carouselId] += n;
    showSlides(carouselId);
}

function currentSlide(n, carouselId) {
    slideIndex[carouselId] = n;
    showSlides(carouselId);
}

function showSlides(carouselId) {
    const beltCards = document.querySelectorAll('.belt-card');
    if (beltCards[carouselId]) {
        const slides = beltCards[carouselId].querySelectorAll('.carousel-slide');
        const indicators = beltCards[carouselId].querySelectorAll('.indicator');
        
        if (slides.length === 0) return;
        
        // Скрываем все слайды
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Убираем активный класс с индикаторов
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Если индекс выходит за границы, возвращаемся к началу или концу
        if (slideIndex[carouselId] > slides.length) {
            slideIndex[carouselId] = 1;
        }
        if (slideIndex[carouselId] < 1) {
            slideIndex[carouselId] = slides.length;
        }
        
        // Показываем текущий слайд
        if (slides[slideIndex[carouselId] - 1]) {
            slides[slideIndex[carouselId] - 1].classList.add('active');
        }
        
        // Делаем активным текущий индикатор
        if (indicators[slideIndex[carouselId] - 1]) {
            indicators[slideIndex[carouselId] - 1].classList.add('active');
        }
    }
}

// Инициализируем все карусели
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем первый слайд активным для каждой карусели
    const beltCards = document.querySelectorAll('.belt-card');
    beltCards.forEach((beltCard, index) => {
        const firstSlide = beltCard.querySelector('.carousel-slide');
        if (firstSlide) {
            firstSlide.classList.add('active');
        }
        
        // Устанавливаем первый индикатор как активный
        const firstIndicator = beltCard.querySelector('.carousel-indicators .indicator');
        if (firstIndicator) {
            firstIndicator.classList.add('active');
        }
    });
});