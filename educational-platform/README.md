# 📚 EduCode — Образовательная платформа

Интерактивная платформа для обучения веб-разработке с редактором кода, эталонами и автоматической проверкой.

---

## 🗂 Структура проекта

```
educational-platform/
│
├── index.html                    # Главная страница
├── config.json                   # Глобальные настройки
│
├── css/
│   └── common.css                # Все стили платформы (IDE-тема)
│
├── js/
│   ├── app.js                    # Точка входа
│   ├── core/
│   │   ├── platform.js           # Ядро: загрузка заданий, UI, проверка
│   │   ├── editor.js             # Редактор: вкладки, нумерация, Tab-indent
│   │   ├── preview.js            # iframe-менеджер (Blob URL)
│   │   ├── validator.js          # Базовый класс валидатора
│   │   └── storage.js            # LocalStorage: прогресс + код
│   │
│   └── tasks/
│       ├── task-manifest.js      # Реестр всех заданий
│       ├── task-001.js           # Валидатор: профильная карточка
│       ├── task-002.js           # Валидатор: калькулятор
│       └── task-003.js           # Валидатор: анимированная кнопка
│
└── tasks/
    ├── 001-user-card/
    │   ├── task.json             # Метаданные, требования, порог
    │   ├── sample.html/css/js    # Эталонное решение
    │
    ├── 002-calculator/
    │   └── ...
    │
    └── 003-animated-button/
        └── ...
```

---

## 🚀 Запуск

Требуется **HTTP-сервер** (из-за ES-модулей и fetch):

```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# VS Code
# Установите расширение "Live Server" → ПКМ на index.html → Open with Live Server
```

Затем откройте: `http://localhost:8080`

---

## ➕ Добавление нового задания

### 1. Создайте папку и файлы

```
tasks/004-modal-window/
├── task.json
├── sample.html
├── sample.css
└── sample.js
```

### 2. Заполните `task.json`

```json
{
  "id": "004",
  "title": "Модальное окно",
  "difficulty": "medium",
  "points": 200,
  "passThreshold": 70,
  "tags": ["html", "css", "javascript"],
  "description": "Создайте модальное окно с кнопкой открытия",
  "requirements": [
    "Кнопка для открытия модального окна",
    "Overlay (полупрозрачный фон)",
    "Кнопка закрытия",
    "Анимация появления"
  ],
  "sampleFiles": {
    "html": "sample.html",
    "css": "sample.css",
    "js": "sample.js"
  }
}
```

### 3. Напишите валидатор `js/tasks/task-004.js`

```javascript
import { TaskValidator } from '../core/validator.js';

export default class ModalValidator extends TaskValidator {
  async validate(userHTML, userCSS, userJS, samples, rules) {
    const doc = this.parseHTML(userHTML, userCSS, userJS);

    const checks = [
      {
        id: 'has-modal',
        label: 'Элемент модального окна',
        weight: 15,
        passed: this.checkSelector(doc, '.modal') || this.checkSelector(doc, '#modal'),
        hint: 'Добавьте элемент с классом .modal'
      },
      // ... остальные проверки
    ];

    const score = this.buildScore(checks);
    return { score, checks, passed: score >= (rules?.passThreshold || 70) };
  }
}
```

### 4. Зарегистрируйте в манифесте `js/tasks/task-manifest.js`

```javascript
{
  id:         '004',
  title:      'Модальное окно',
  difficulty: 'medium',
  stars:      '⭐⭐',
  points:     200,
  tags:       ['html', 'css', 'javascript'],
  validator:  'task-004.js',
  taskPath:   'tasks/004-modal-window/'
}
```

Готово! Задание автоматически появится в списке.

---

## ⌨️ Горячие клавиши

| Комбинация         | Действие             |
|--------------------|----------------------|
| `Ctrl+Enter`       | Запустить код        |
| `Ctrl+Shift+Enter` | Проверить решение    |
| `Ctrl+1/2/3`       | Переключить вкладку  |
| `F5`               | Запустить код        |
| `Tab`              | Отступ 2 пробела     |
| `Esc`              | Закрыть модальное    |

---

## 🏗 Архитектурные решения

### Безопасный рендер
Код пользователя рендерится через `Blob URL` в изолированном `<iframe sandbox>`, без доступа к основной странице.

### Ленивая загрузка
Валидаторы заданий подгружаются только при открытии задания через `import()`.

### Версионированное хранилище
`StorageManager` сохраняет прогресс с версией и делает резервную копию перед каждой записью.

### Базовый класс валидатора
`TaskValidator` предоставляет готовые утилиты:
- `parseHTML(html, css, js)` — создаёт DOM для анализа
- `createTestFrame()` — iframe для computed styles
- `checkSelector(doc, selector)` — проверка наличия элементов
- `checkText(doc, selector, texts)` — проверка текстового содержимого
- `checkCSSRule(css, selector, property)` — анализ CSS-исходника
- `checkJSPattern(js, pattern)` — анализ JS через RegExp
- `buildScore(checks)` — расчёт итогового балла по весам

---

## 📊 Система оценивания

Каждая проверка имеет **вес** (по умолчанию 1). Итоговый балл:

```
score = (сумма весов пройденных проверок / сумма всех весов) × 100
```

Задание засчитывается при `score >= passThreshold` (по умолчанию 70%).

---

## 🔧 Конфигурация (`config.json`)

```json
{
  "defaults": {
    "passThreshold": 70,
    "autoSave": true,
    "autoRunDelay": 800
  }
}
```
