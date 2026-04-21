/**
 * Реестр всех заданий платформы
 * Добавление нового задания = одна запись здесь + папка в /tasks/
 */
export const tasksManifest = [
    {
        id:         '001',
        title:      'Профильная карточка',
        difficulty: 'easy',
        stars:      '⭐',
        points:     100,
        tags:       ['html', 'css', 'flexbox'],
        validator:  'task-001.js',
        taskPath:   'tasks/001-user-card/'
    },
    {
        id:         '002',
        title:      'Калькулятор',
        difficulty: 'hard',
        stars:      '⭐⭐⭐',
        points:     300,
        tags:       ['html', 'css', 'javascript', 'events'],
        validator:  'task-002.js',
        taskPath:   'tasks/002-calculator/'
    },
    {
        id:         '003',
        title:      'Анимированная кнопка',
        difficulty: 'medium',
        stars:      '⭐⭐',
        points:     200,
        tags:       ['css', 'animation', 'transitions'],
        validator:  'task-003.js',
        taskPath:   'tasks/003-animated-button/'
    }
    // Добавляйте новые задания сюда!
    // {
    //     id: '004',
    //     title: 'Модальное окно',
    //     difficulty: 'medium',
    //     stars: '⭐⭐',
    //     points: 200,
    //     tags: ['html', 'css', 'javascript'],
    //     validator: 'task-004.js',
    //     taskPath: 'tasks/004-modal/'
    // }
];

export const DIFFICULTY_MAP = {
    easy:   { label: 'Лёгкое',   color: '#3fb950', stars: '⭐' },
    medium: { label: 'Среднее',  color: '#d29922', stars: '⭐⭐' },
    hard:   { label: 'Сложное',  color: '#f85149', stars: '⭐⭐⭐' }
};
