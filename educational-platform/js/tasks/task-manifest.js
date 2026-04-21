/**
 * Реестр всех заданий платформы с поддержкой курсов и модулей
 * Структура: Курсы → Модули → Задачи
 */

export const DIFFICULTY_MAP = {
    easy:   { label: 'Лёгкое',   color: '#3fb950', stars: '⭐' },
    medium: { label: 'Среднее',  color: '#d29922', stars: '⭐⭐' },
    hard:   { label: 'Сложное',  color: '#f85149', stars: '⭐⭐⭐' }
};

// ════════════════════════════════════════════════════
// КУРСЫ И МОДУЛИ
// ════════════════════════════════════════════════════

export const coursesManifest = [
    {
        id: 'html-css-basics',
        title: 'Основы HTML & CSS',
        description: 'Изучите базовые теги HTML и стилизацию CSS',
        icon: '🎨',
        modules: [
            {
                id: 'html-tags',
                title: 'HTML теги',
                description: 'Основные теги HTML',
                tasks: ['001', '002', '003', '004', '005', '021', '022', '023', '024', '025']
            },
            {
                id: 'css-styling',
                title: 'CSS стилизация',
                description: 'Базовая стилизация элементов',
                tasks: ['006', '007', '008', '009', '010', '026', '027', '028', '029', '030']
            }
        ]
    },
    {
        id: 'js-basics',
        title: 'Основы JavaScript',
        description: 'Программирование на JavaScript',
        icon: '⚡',
        modules: [
            {
                id: 'js-variables',
                title: 'Переменные и типы',
                description: 'Объявление переменных, типы данных',
                tasks: ['011', '012', '013', '014', '015', '031', '032', '033', '034', '035']
            },
            {
                id: 'js-functions',
                title: 'Функции',
                description: 'Создание и вызов функций',
                tasks: ['016', '017', '018', '019', '020', '036', '037', '038', '039', '040']
            }
        ]
    }
];

// ════════════════════════════════════════════════════
// ЗАДАЧИ
// ════════════════════════════════════════════════════

export const tasksManifest = [
    // ========== HTML & CSS: HTML теги (001-005) ==========
    {
        id:         '001',
        courseId:   'html-css-basics',
        moduleId:   'html-tags',
        title:      'Заголовок страницы',
        difficulty: 'easy',
        points:     50,
        tags:       ['html', 'h1'],
        validator:  'task-001.js',
        taskPath:   'tasks/001-html-heading/'
    },
    {
        id:         '002',
        courseId:   'html-css-basics',
        moduleId:   'html-tags',
        title:      'Абзац текста',
        difficulty: 'easy',
        points:     50,
        tags:       ['html', 'p'],
        validator:  'task-002.js',
        taskPath:   'tasks/002-html-paragraph/'
    },
    {
        id:         '003',
        courseId:   'html-css-basics',
        moduleId:   'html-tags',
        title:      'Список покупок',
        difficulty: 'easy',
        points:     50,
        tags:       ['html', 'ul', 'li'],
        validator:  'task-003.js',
        taskPath:   'tasks/003-html-list/'
    },
    {
        id:         '004',
        courseId:   'html-css-basics',
        moduleId:   'html-tags',
        title:      'Изображение',
        difficulty: 'easy',
        points:     50,
        tags:       ['html', 'img'],
        validator:  'task-004.js',
        taskPath:   'tasks/004-html-image/'
    },
    {
        id:         '005',
        courseId:   'html-css-basics',
        moduleId:   'html-tags',
        title:      'Ссылка',
        difficulty: 'easy',
        points:     50,
        tags:       ['html', 'a'],
        validator:  'task-005.js',
        taskPath:   'tasks/005-html-link/'
    },
    // ========== HTML & CSS: CSS стилизация (006-010) ==========
    {
        id:         '006',
        courseId:   'html-css-basics',
        moduleId:   'css-styling',
        title:      'Цвет текста',
        difficulty: 'easy',
        points:     50,
        tags:       ['css', 'color'],
        validator:  'task-006.js',
        taskPath:   'tasks/006-css-color/'
    },
    {
        id:         '007',
        courseId:   'html-css-basics',
        moduleId:   'css-styling',
        title:      'Фон элемента',
        difficulty: 'easy',
        points:     50,
        tags:       ['css', 'background'],
        validator:  'task-007.js',
        taskPath:   'tasks/007-css-background/'
    },
    {
        id:         '008',
        courseId:   'html-css-basics',
        moduleId:   'css-styling',
        title:      'Размеры блока',
        difficulty: 'easy',
        points:     50,
        tags:       ['css', 'width', 'height'],
        validator:  'task-008.js',
        taskPath:   'tasks/008-css-dimensions/'
    },
    {
        id:         '009',
        courseId:   'html-css-basics',
        moduleId:   'css-styling',
        title:      'Отступы',
        difficulty: 'easy',
        points:     50,
        tags:       ['css', 'margin', 'padding'],
        validator:  'task-009.js',
        taskPath:   'tasks/009-css-spacing/'
    },
    {
        id:         '010',
        courseId:   'html-css-basics',
        moduleId:   'css-styling',
        title:      'Граница элемента',
        difficulty: 'easy',
        points:     50,
        tags:       ['css', 'border'],
        validator:  'task-010.js',
        taskPath:   'tasks/010-css-border/'
    },
    // ========== JavaScript: Переменные и типы (011-015) ==========
    {
        id:         '011',
        courseId:   'js-basics',
        moduleId:   'js-variables',
        title:      'Объявление переменной',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'let', 'const'],
        validator:  'task-011.js',
        taskPath:   'tasks/011-js-variable/'
    },
    {
        id:         '012',
        courseId:   'js-basics',
        moduleId:   'js-variables',
        title:      'Строковая переменная',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'string'],
        validator:  'task-012.js',
        taskPath:   'tasks/012-js-string/'
    },
    {
        id:         '013',
        courseId:   'js-basics',
        moduleId:   'js-variables',
        title:      'Числовая переменная',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'number'],
        validator:  'task-013.js',
        taskPath:   'tasks/013-js-number/'
    },
    {
        id:         '014',
        courseId:   'js-basics',
        moduleId:   'js-variables',
        title:      'Булево значение',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'boolean'],
        validator:  'task-014.js',
        taskPath:   'tasks/014-js-boolean/'
    },
    {
        id:         '015',
        courseId:   'js-basics',
        moduleId:   'js-variables',
        title:      'Конкатенация строк',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'string', 'concat'],
        validator:  'task-015.js',
        taskPath:   'tasks/015-js-concat/'
    },
    // ========== JavaScript: Функции (016-020) ==========
    {
        id:         '016',
        courseId:   'js-basics',
        moduleId:   'js-functions',
        title:      'Простая функция',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'function'],
        validator:  'task-016.js',
        taskPath:   'tasks/016-js-function/'
    },
    {
        id:         '017',
        courseId:   'js-basics',
        moduleId:   'js-functions',
        title:      'Функция с параметром',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'function', 'parameter'],
        validator:  'task-017.js',
        taskPath:   'tasks/017-js-function-param/'
    },
    {
        id:         '018',
        courseId:   'js-basics',
        moduleId:   'js-functions',
        title:      'Возврат значения',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'function', 'return'],
        validator:  'task-018.js',
        taskPath:   'tasks/018-js-return/'
    },
    {
        id:         '019',
        courseId:   'js-basics',
        moduleId:   'js-functions',
        title:      'Стрелочная функция',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'arrow'],
        validator:  'task-019.js',
        taskPath:   'tasks/019-js-arrow/'
    },
    {
        id:         '020',
        courseId:   'js-basics',
        moduleId:   'js-functions',
        title:      'Вызов функции',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'function', 'call'],
        validator:  'task-020.js',
        taskPath:   'tasks/020-js-call/'
    },
    // ========== HTML & CSS: HTML теги (021-025) - дополнительные ==========
    {
        id:         '021',
        courseId:   'html-css-basics',
        moduleId:   'html-tags',
        title:      'Заголовок второго уровня',
        difficulty: 'easy',
        points:     50,
        tags:       ['html', 'h2'],
        validator:  'task-021.js',
        taskPath:   'tasks/021-html-heading-h2/'
    },
    {
        id:         '022',
        courseId:   'html-css-basics',
        moduleId:   'html-tags',
        title:      'Жирный текст',
        difficulty: 'easy',
        points:     50,
        tags:       ['html', 'strong', 'b'],
        validator:  'task-022.js',
        taskPath:   'tasks/022-html-bold/'
    },
    {
        id:         '023',
        courseId:   'html-css-basics',
        moduleId:   'html-tags',
        title:      'Курсив',
        difficulty: 'easy',
        points:     50,
        tags:       ['html', 'em', 'i'],
        validator:  'task-023.js',
        taskPath:   'tasks/023-html-italic/'
    },
    {
        id:         '024',
        courseId:   'html-css-basics',
        moduleId:   'html-tags',
        title:      'Нумерованный список',
        difficulty: 'easy',
        points:     50,
        tags:       ['html', 'ol', 'li'],
        validator:  'task-024.js',
        taskPath:   'tasks/024-html-ordered-list/'
    },
    {
        id:         '025',
        courseId:   'html-css-basics',
        moduleId:   'html-tags',
        title:      'Разрыв строки',
        difficulty: 'easy',
        points:     50,
        tags:       ['html', 'br'],
        validator:  'task-025.js',
        taskPath:   'tasks/025-html-line-break/'
    },
    // ========== HTML & CSS: CSS стилизация (026-030) - дополнительные ==========
    {
        id:         '026',
        courseId:   'html-css-basics',
        moduleId:   'css-styling',
        title:      'Шрифт текста',
        difficulty: 'easy',
        points:     50,
        tags:       ['css', 'font-family'],
        validator:  'task-026.js',
        taskPath:   'tasks/026-css-font/'
    },
    {
        id:         '027',
        courseId:   'html-css-basics',
        moduleId:   'css-styling',
        title:      'Размер шрифта',
        difficulty: 'easy',
        points:     50,
        tags:       ['css', 'font-size'],
        validator:  'task-027.js',
        taskPath:   'tasks/027-css-font-size/'
    },
    {
        id:         '028',
        courseId:   'html-css-basics',
        moduleId:   'css-styling',
        title:      'Выравнивание текста',
        difficulty: 'easy',
        points:     50,
        tags:       ['css', 'text-align'],
        validator:  'task-028.js',
        taskPath:   'tasks/028-css-text-align/'
    },
    {
        id:         '029',
        courseId:   'html-css-basics',
        moduleId:   'css-styling',
        title:      'Прозрачность',
        difficulty: 'easy',
        points:     50,
        tags:       ['css', 'opacity'],
        validator:  'task-029.js',
        taskPath:   'tasks/029-css-opacity/'
    },
    {
        id:         '030',
        courseId:   'html-css-basics',
        moduleId:   'css-styling',
        title:      'Тень блока',
        difficulty: 'easy',
        points:     50,
        tags:       ['css', 'box-shadow'],
        validator:  'task-030.js',
        taskPath:   'tasks/030-css-shadow/'
    },
    // ========== JavaScript: Переменные и типы (031-035) - дополнительные ==========
    {
        id:         '031',
        courseId:   'js-basics',
        moduleId:   'js-variables',
        title:      'Константа',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'const'],
        validator:  'task-031.js',
        taskPath:   'tasks/031-js-const/'
    },
    {
        id:         '032',
        courseId:   'js-basics',
        moduleId:   'js-variables',
        title:      'Тип данных number',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'number', 'typeof'],
        validator:  'task-032.js',
        taskPath:   'tasks/032-js-number-type/'
    },
    {
        id:         '033',
        courseId:   'js-basics',
        moduleId:   'js-variables',
        title:      'Преобразование в строку',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'string', 'toString'],
        validator:  'task-033.js',
        taskPath:   'tasks/033-js-to-string/'
    },
    {
        id:         '034',
        courseId:   'js-basics',
        moduleId:   'js-variables',
        title:      'Преобразование в число',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'number', 'parseInt'],
        validator:  'task-034.js',
        taskPath:   'tasks/034-js-to-number/'
    },
    {
        id:         '035',
        courseId:   'js-basics',
        moduleId:   'js-variables',
        title:      'Шаблонные строки',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'template', 'string'],
        validator:  'task-035.js',
        taskPath:   'tasks/035-js-template-string/'
    },
    // ========== JavaScript: Функции (036-040) - дополнительные ==========
    {
        id:         '036',
        courseId:   'js-basics',
        moduleId:   'js-functions',
        title:      'Функция с двумя параметрами',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'function', 'parameters'],
        validator:  'task-036.js',
        taskPath:   'tasks/036-js-function-two-params/'
    },
    {
        id:         '037',
        courseId:   'js-basics',
        moduleId:   'js-functions',
        title:      'Стрелочная функция с параметром',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'arrow', 'parameter'],
        validator:  'task-037.js',
        taskPath:   'tasks/037-js-arrow-param/'
    },
    {
        id:         '038',
        courseId:   'js-basics',
        moduleId:   'js-functions',
        title:      'Функция возвращает сумму',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'function', 'return', 'sum'],
        validator:  'task-038.js',
        taskPath:   'tasks/038-js-return-sum/'
    },
    {
        id:         '039',
        courseId:   'js-basics',
        moduleId:   'js-functions',
        title:      'Функция выражение',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'function', 'expression'],
        validator:  'task-039.js',
        taskPath:   'tasks/039-js-function-expression/'
    },
    {
        id:         '040',
        courseId:   'js-basics',
        moduleId:   'js-functions',
        title:      'Вложенный вызов функции',
        difficulty: 'easy',
        points:     50,
        tags:       ['js', 'function', 'call', 'nested'],
        validator:  'task-040.js',
        taskPath:   'tasks/040-js-nested-call/'
    }
];
