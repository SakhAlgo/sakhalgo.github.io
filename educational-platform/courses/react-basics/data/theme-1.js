// Тема 1: Основы React + Vite + JSX
const theme1 = {
  id: 1,
  title: 'Основы React + Vite + JSX',
  theory: {
    title: 'Введение в React и JSX',
    subtitle: 'Что такое React, установка через Vite, компоненты, JSX',
    content: `<p><strong>React</strong> — это JavaScript-библиотека для создания пользовательских интерфейсов, разработанная компанией Meta (Facebook). В отличие от полноценных фреймворков, React занимается только уровнем представления (View), что делает его гибким и лёгким для интеграции.</p>

      <h3 style="color:var(--accent);margin-top:24px">🔧 Установка через Vite</h3>
      <p><strong>Vite</strong> — современный инструмент сборки, который значительно быстрее Create React App благодаря использованию нативных ES-модулей в режиме разработки.</p>
      <div class="code-block"><div class="code-header">Bash</div><pre>npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev</pre></div>
      <p>Структура проекта: <code>src/</code> — папка с компонентами, <code>App.jsx</code> — корневой компонент, <code>main.jsx</code> — точка входа.</p>

      <h3 style="color:var(--accent);margin-top:24px">⚛️ Виртуальный DOM (Virtual DOM)</h3>
      <p><strong>Virtual DOM</strong> — это лёгкая JavaScript-копия реального DOM-дерева. При изменении состояни�� React:</p>
      <ol style="padding-left:20px;margin:12px 0">
        <li>Создаёт новый Virtual DOM</li>
        <li>Сравнивает (diffing) его с предыдущей версией</li>
        <li>Применяет только минимальные изменения (reconciliation) к реальному DOM</li>
      </ol>
      <div class="info-box success"><strong>💡 Преимущество:</strong> Virtual DOM минимизирует дорогостоящие операции с реальным DOM, что делает React быстрым даже при сложных интерфейсах.</div>

      <h3 style="color:var(--accent);margin-top:24px">📝 JSX — JavaScript XML</h3>
      <p><strong>JSX</strong> — это синтаксический сахар, который позволяет писать HTML-подобную разметку прямо внутри JavaScript. JSX транслируется в вызовы <code>React.createElement()</code>.</p>
      <div class="code-block"><div class="code-header">JSX — правила</div><pre>1. Единый корневой элемент (или фрагмент <>...</>)
2. Фигурные скобки {} для JavaScript-выражений
3. className вместо class
4. Закрывающие теги обязательны <br /></pre></div>
      <div class="code-block"><div class="code-header">Пример JSX</div><pre>function Greeting() {
  const name = 'Анна';
  const isAdmin = true;

  return (
    &lt;div className="profile"&gt;
      &lt;h1&gt; Привет, {name}!&lt;/h1&gt;
      {isAdmin && &lt;p&gt;У вас права администратора&lt;/p&gt;}
    &lt;/div&gt;
  );
}</pre></div>
      <p><strong>Правила JSX:</strong></p>
      <ul style="padding-left:20px;margin:12px 0">
        <li><code>{выражение}</code> — вставка любого JS-выражения (переменные, функции, тернарные операторы)</li>
        <li><code>className</code> — атрибут для CSS-классов (вместо <code>class</code> в HTML)</li>
        <li><code>style={{color: 'red'}}</code> — inline-стили передаются объектом</li>
        <li>Комментарии в JSX: <code>{/* комментарий */}</code></li>
      </ul>

      <h3 style="color:var(--accent);margin-top:24px">📦 Функциональные компоненты</h3>
      <p>Функциональный компонент — это обычная JavaScript-функция, которая:</p>
      <ul style="padding-left:20px;margin:12px 0">
        <li>Принимает <strong>props</strong> (объект с данными)</li>
        <li>Возвращает <strong>JSX-разметку</strong> (что отобразить на экране)</li>
        <li>Имя функции пишется с <strong>заглавной буквы</strong> (Правило именования)</li>
      </ul>
      <div class="code-block"><div class="code-header">Базовая структура компонента</div><pre>import { useState } from 'react';
import styles from './MyComponent.module.css';

function MyComponent({ name }) {
  // Логика: хуки, обработчики, вычисления

  return (
    &lt;div className={styles.wrapper}&gt;
      &lt;h1&gt;Привет, {name}!&lt;/h1&gt;
    &lt;/div&gt;
  );
}

export default MyComponent;</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🎨 Стилизация в React</h3>
      <p><strong>CSS-модули</strong> — рекомендуемый способ стилизации в React. Файл называется <code>Component.module.css</code>, классы импортируются как объект:</p>
      <div class="code-block"><div class="code-header">Button.module.css</div><pre>.button {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.button:hover {
  opacity: 0.9;
}</pre></div>
      <div class="code-block"><div class="code-header">Button.jsx</div><pre>import styles from './Button.module.css';

function Button({ label }) {
  return &lt;button className={styles.button}&gt;{label}&lt;/button&gt;;
}</pre></div>
      <div class="info-box"><strong>🔒 Преимущество CSS-модулей:</strong> классы изолированы — селектор <code>.button</code> автоматически получает уникальный хеш, что предотвращает конфликты имён.</div>

      <h3 style="color:var(--accent);margin-top:24px">🧩 Фрагменты (Fragments)</h3>
      <p>Фрагменты позволяют группировать несколько элементов без добавления лишнего DOM-узла:</p>
      <div class="code-block"><div class="code-header">Короткий синтаксис <>...</></div><pre>function App() {
  return (
    &lt;&gt;
      &lt;Header /&gt;
      &lt;Main /&gt;
      &lt;Footer /&gt;
    &lt;/&gt;
  );
}</pre></div>`,
  },
  tasks: [
    {
      title: 'Создание компонента HelloWorld',
      desc: 'Функциональный компонент HelloWorld. Принимает: без пропсов. Возвращает: h1 с текстом «Привет, React!». Демонстрирует базовую структуру функционального компонента: объявление функции с именем с заглавной буквы, return JSX-разметки.',
      hint: 'Имя с большой буквы, return JSX',
      difficulty: 'easy',
      solution:
        'function HelloWorld() {\n  return &lt;h1&gt;Привет, React!&lt;/h1&gt;;\n}',
    },
    {
      title: 'Вывод переменной в JSX',
      desc: "Функциональный компонент Greeting. Принимает: без пропсов. Содержит переменную name = 'Екатерина'. Возвращает: h2 с текстом «Здравствуй, {name}!», где {name} — вывод переменной через фигурные скобки JSX.",
      hint: 'Фигурные скобки {name}',
      difficulty: 'easy',
      solution:
        "function Greeting() {\n  const name = 'Екатерина';\n  \n  return &lt;h2&gt;Здравствуй, {name}!&lt;/h2&gt;;\n}",
    },
    {
      title: 'Вычисление в JSX',
      desc: 'Функциональный компонент Sum. Принимает: без пропсов. Выполняет вычисление 25 + 17 прямо внутри JSX. Возвращает: p с текстом «Сумма: {25 + 17}», где фигурные скобки содержат JavaScript-выражение.',
      hint: '{25 + 17}',
      difficulty: 'easy',
      solution:
        'function Sum() {\n  return &lt;p&gt;Сумма: {25 + 17}&lt;/p&gt;;\n}',
    },
    {
      title: 'Использование CSS-класса (CSS-модуль)',
      desc: 'Два файла: Card.module.css (содержит класс .card с фоном, отступами, border-radius) и Card.jsx (функциональный компонент Card. Принимает: без пропсов. Импортирует styles из Card.module.css. Возвращает: div с className={styles.card} и текстом «Это карточка»).',
      hint: 'Импорт styles, className={styles.card}',
      difficulty: 'easy',
      solution:
        "// Card.module.css\n.card {\n  background: #1e293b;\n  padding: 1rem;\n  border-radius: 12px;\n  color: white;\n}\n\n// Card.jsx\nimport styles from './Card.module.css';\n\nfunction Card() {\n  return &lt;div className={styles.card}&gt;Это карточка&lt;/div&gt;;\n}",
    },
    {
      title: 'Inline-стили vs CSS-модуль',
      desc: 'Два файла: Button.module.css (содержит классы .button c красным фоном, скруглениями, ховер-эффектом) и StyledButton.jsx (функциональный компонент StyledButton. Принимает: без пропсов. Импортирует styles из Button.module.css. Возвращает: button с className={styles.button} и текстом «Нажми меня»).',
      hint: 'Импорт и className={styles.button}',
      difficulty: 'easy',
      solution:
        "// Button.module.css\n.button {\n  background-color: red;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: bold;\n}\n\n.button:hover {\n  background-color: darkred;\n}\n\n// StyledButton.jsx\nimport styles from './Button.module.css';\n\nfunction StyledButton() {\n  return &lt;button className={styles.button}&gt;Нажми меня&lt;/button&gt;;\n}",
    },
    {
      title: 'Фрагмент без лишнего div',
      desc: 'Функциональный компонент FragmentExample. Принимает: без пропсов. Использует синтаксис короткого фрагмента &lt;&gt;...&lt;/&gt; для группировки дочерних элементов без добавления лишнего DOM-узла. Возвращает: фрагмент, содержащий h2 с текстом «Заголовок» и p с текстом «Текст параграфа».',
      hint: '&lt;&gt; ... &lt;/&gt;',
      difficulty: 'medium',
      solution:
        'function FragmentExample() {\n  return (\n    &lt;&gt;\n      &lt;h2&gt;Заголовок&lt;/h2&gt;\n      &lt;p&gt;Текст параграфа&lt;/p&gt;\n    &lt;/&gt;\n  );\n}',
    },
    {
      title: 'Условный рендеринг',
      desc: 'Функциональный компонент TimeMessage. Принимает: без пропсов. Использует new Date().getHours() для получения текущего часа. Возвращает: h1, содержимое которого выбирается через тернарный оператор: «Доброе утро!» если час &lt; 12, иначе «Добрый день!».',
      hint: 'new Date().getHours()',
      difficulty: 'medium',
      solution:
        "function TimeMessage() {\n  const hour = new Date().getHours();\n  \n  return (\n    &lt;h1&gt;\n      {hour &lt; 12 ? 'Доброе утро!' : 'Добрый день!'}\n    &lt;/h1&gt;\n  );\n}",
    },
    {
      title: 'Вложенные компоненты',
      desc: 'Пять функциональных компонентов: Header (возвращает header с текстом «Шапка сайта»), Main (возвращает main с текстом «Основной контент»), Footer (возвращает footer с текстом «Подвал 2026») и App (возвращает фрагмент, объединяющий Header, Main и Footer). Демонстрирует композицию компонентов.',
      hint: 'Композиция',
      difficulty: 'medium',
      solution:
        'function Header() {\n  return &lt;header&gt;Шапка сайта&lt;/header&gt;;\n}\n\nfunction Main() {\n  return &lt;main&gt;Основной контент&lt;/main&gt;;\n}\n\nfunction Footer() {\n  return &lt;footer&gt;Подвал 2026&lt;/footer&gt;;\n}\n\nfunction App() {\n  return (\n    &lt;&gt;\n      &lt;Header /&gt;\n      &lt;Main /&gt;\n      &lt;Footer /&gt;\n    &lt;/&gt;\n  );\n}',
    },
    {
      title: 'Рендеринг текущей даты',
      desc: "Функциональный компонент CurrentDate. Принимает: без пропсов. Использует new Date().toLocaleDateString('ru-RU') для форматирования текущей даты в российском формате. Возвращает: p с текстом «Сегодня: {date}».",
      hint: "toLocaleDateString('ru-RU')",
      difficulty: 'medium',
      solution:
        "function CurrentDate() {\n  const date = new Date().toLocaleDateString('ru-RU');\n  \n  return &lt;p&gt;Сегодня: {date}&lt;/p&gt;;\n}",
    },
    {
      title: 'Компонент с пропсом (CSS-модуль для карточки)',
      desc: 'Два файла: UserCard.module.css (содержит стили для .card, .avatar, .name с тёмной темой, акцентным цветом) и UserCard.jsx (функциональный компонент UserCard. Принимает: пропс name (строка). Импортирует styles из CSS-модуля. Возвращает: div с className={styles.card}, содержащий div с аватаром и h3 с именем пользователя).',
      hint: 'Card.module.css определяет стили',
      difficulty: 'medium',
      solution:
        "// UserCard.module.css\n.card {\n  border: 1px solid #ccc;\n  border-radius: 12px;\n  padding: 16px;\n  background: var(--surface);\n}\n\n.avatar {\n  font-size: 2rem;\n  margin-bottom: 8px;\n}\n\n.name {\n  margin: 0;\n  color: var(--accent);\n}\n\n// UserCard.jsx\nimport styles from './UserCard.module.css';\n\nfunction UserCard({ name }) {\n  return (\n    &lt;div className={styles.card}&gt;\n      &lt;div className={styles.avatar}&gt;👤&lt;/div&gt;\n      &lt;h3 className={styles.name}&gt;{name}&lt;/h3&gt;\n    &lt;/div&gt;\n  );\n}",
    },
  ],
};
