// Тема 2: Props и композиция компонентов
const theme2 = {
  id: 2,
  title: "Props и композиция компонентов",
  theory: {
    title: "Работа с пропсами (Props)",
    subtitle: "Передача данных, children, композиция, PropTypes",
    content: `<p><strong>Props</strong> (сокращение от Properties) — это механизм передачи данных от р��дительского компонента дочернему. Props являются <strong>неизменяемыми (read-only)</strong> — дочерний компонент не может их модифицировать.</p>

      <h3 style="color:var(--accent);margin-top:24px">📤 Передача пропсов</h3>
      <p>Пропсы передаются как атрибуты JSX и собираются в объект в параметрах компонента:</p>
      <div class="code-block"><div class="code-header">Передача и приём пропсов</div><pre>// Родительский компонент
function App() {
return &lt;UserCard name="Анна" age={25} /&gt;;
}

// Дочерний компонент — без деструктуризации
function UserCard(props) {
  return &lt;h1&gt;{props.name}, {props.age} лет&lt;/h1&gt;;
}

// Дочерний компонент — с деструктуризацией (рекомендуется)
function UserCard({ name, age }) {
return &lt;h1&gt;{name}, {age} лет&lt;/h1&gt;;
}</pre></div>
      <div class="info-box success"><strong>💡 Совет:</strong> Всегда используйте деструктуризацию пропсов в параметрах — это делает код чище и понятнее.</div>

      <h3 style="color:var(--accent);margin-top:24px">🎯 defaultProps</h3>
      <p>Значения по умолчанию для пропсов, если родитель не передал соответствующий атрибут:</p>
      <div class="code-block"><div class="code-header">defaultProps</div><pre>function Button({ label, variant }) {
return &lt;button className={variant}&gt;{label}&lt;/button&gt;;
}

Button.defaultProps = {
  label: 'Нажми меня',
  variant: 'primary'
};

// Использование:&lt;Button /&gt; отобразит кнопку с label="Нажми меня"</pre></div>
      <p>Современная альтернатива — деструктуризация со значениями по умолчанию:</p>
      <div class="code-block"><div class="code-header">Значения по умолчанию в параметрах</div><pre>function Button({ label = 'Нажми меня', variant = 'primary' }) {
return &lt;button className={variant}&gt;{label}&lt;/button&gt;;
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">👶 Children prop</h3>
      <p>Специальный пропс <code>children</code> содержит всё, что находится между открывающим и закрывающим тегом компонента:</p>
      <div class="code-block"><div class="code-header">Использование children</div><pre>
function Container({ children }) {
return &lt;div className="container"&gt;{children}&lt;/div&gt;;
}

// Использование:
&lt;Container&gt;
  &lt;h2&gt;Заголовок&lt;/h2&gt;
  &lt;p&gt;Этот контент попадёт в children&lt;/p&gt;
&lt;/Container&gt;
</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🔄 Передача функций через пропсы</h3>
      <p>Функции передаются как обычные пропсы, что позволяет реализовать паттерн "умный родитель — глупый потомок":</p>
      <div class="code-block"><div class="code-header">Функция как пропс</div><pre>function ClickButton({ onClick, label }) {
return &lt;button onClick={onClick}&gt;{label}&lt;/button&gt;;
}

// Родитель передаёт обработчик:
&lt;ClickButton
  onClick={() =&gt; alert('Клик!')}
  label="Нажми меня"
/&gt;
</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🏗�� Композиция компонентов</h3>
      <p>Композиция — это объединение простых компонентов в более сложные. Вместо наследования React использует композицию:</p>
      <div class="code-block"><div class="code-header">Пример композиции</div><pre>
function Card({ title, children }) {
return (
    &lt;div className="card"&gt;
      &lt;h3 className="title"&gt;{title}&lt;/h3&gt;
      {children}
    &lt;/div&gt;
  );
}

function App() {
  return (
    &lt;Card title="Моя карточка"&gt;
      &lt;p&gt;Это содержимое карточки&lt;/p&gt;
      &lt;button&gt;Действие&lt;/button&gt;
    &lt;/Card&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">✅ PropTypes — валидация типов</h3>
      <p>Библиотека <code>prop-types</code> позволяет проверять типы передаваемых пропсов в development-режиме:</p>
      <div class="code-block"><div class="code-header">Установка и использование PropTypes</div><pre>npm install prop-types</pre></div>
      <div class="code-block"><div class="code-header">Пример валидации</div><pre>import PropTypes from 'prop-types';

function UserCard({ name, age, isActive, tags }) {
  return (
    &lt;div&gt;
      &lt;h2&gt;{name}&lt;/h2&gt;
      &lt;p&gt;Возраст: {age}&lt;/p&gt;
      &lt;p&gt;Статус: {isActive ? 'Активен' : 'Неактивен'}&lt;/p&gt;
      &lt;ul&gt;{tags.map(t =&gt; &lt;li key={t}&gt;{t}&lt;/li&gt;)}&lt;/ul&gt;
    &lt;/div&gt;
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,   // строка, обязательный
  age: PropTypes.number,               // число, опционально
  isActive: PropTypes.bool,            // boolean
  tags: PropTypes.arrayOf(PropTypes.string)  // массив строк
};</pre></div>
      <div class="info-box warning"><strong>⚠️ Важно:</strong> PropTypes проверяются только в development-режиме. В production-сборке они автоматически удаляются для производительности.</div>`,
  },
  tasks: [
    {
      title: "Передача простого пропса",
      desc: "Функциональный компонент Greeting. Принимает: пропс name (строка) через деструктуризацию в параметрах. Возвращает: h1 с текстом «Привет, {name}!».",
      hint: "function Greeting({ name })",
      difficulty: "easy",
      solution:
        "function Greeting({ name }) {\n  return &lt;h1&gt;Привет, {name}!&lt;/h1&gt;;\n}",
    },
    {
      title: "Деструктуризация пропсов",
      desc: "Функциональный компонент Greeting. Принимает: пропс name (строка) с деструктуризацией прямо в параметрах функции ({ name }). Возвращает: h1 с текстом «Привет, {name}!». Демонстрирует современный синтаксис деструктуризации пропсов.",
      hint: "({ name })",
      difficulty: "easy",
      solution:
        "function Greeting({ name }) {\n  return &lt;h1&gt;Привет, {name}!&lt;/h1&gt;;\n}",
    },
    {
      title: "defaultProps",
      desc: "Функциональный компонент Button. Принимает: пропсы label (строка) и variant (строка). Определяет значения по умолчанию через Button.defaultProps = { label: 'Кнопка', variant: 'primary' }. Возвращает: button с className={variant} и текстом label.",
      hint: "Button.defaultProps = { label: 'Кнопка' }",
      difficulty: "easy",
      solution:
        "function Button({ label, variant }) {\n  return &lt;button className={variant}&gt;{label}&lt;/button&gt;;\n}\n\nButton.defaultProps = {\n  label: 'Кнопка',\n  variant: 'primary'\n};",
    },
    {
      title: "Children prop — обёртка (CSS-модуль)",
      desc: "Два файла: Container.module.css (содержит .container с padding, border, border-radius, фоном) и Container.jsx (функциональный компонент Container. Принимает: пропс children (любой React-узел). Обёртывает children в div с className={styles.container}. Возвращает: стилизованный div-контейнер с дочерним содержимым).",
      hint: ".container { padding: 20px; border: 1px solid #ccc; }",
      difficulty: "easy",
      solution:
        "// Container.module.css\n.container {\n  padding: 20px;\n  border: 1px solid #ccc;\n  border-radius: 8px;\n  background: var(--surface);\n}\n\n// Container.jsx\nimport styles from './Container.module.css';\n\nfunction Container({ children }) {\n  return &lt;div className={styles.container}&gt;{children}&lt;/div&gt;;\n}",
    },
    {
      title: "Передача функции через пропс",
      desc: "Функциональный компонент ClickButton. Принимает: пропсы onClick (функция-обработчик клика) и label (строка). Возвращает: button с onClick={onClick} и текстом label. В комментарии показан пример использования: &lt;ClickButton onClick={() =&gt; alert('Нажато!')} label=\"Нажми\" /&gt;.",
      hint: "onClick пропс",
      difficulty: "medium",
      solution:
        "function ClickButton({ onClick, label }) {\n  return (\n    &lt;button onClick={onClick}&gt;\n      {label}\n    &lt;/button&gt;\n  );\n}\n\n// Использование:\n// &lt;ClickButton onClick={() =&gt; alert('Нажато!')} label=\"Нажми\" /&gt;",
    },
    {
      title: "Композиция — карточка с заголовком (CSS-модуль)",
      desc: "Два файла: Card.module.css (содержит .card с границей, скруглением, отступами, и .title с нижним отступом и акцентным цветом) и Card.jsx (функциональный компонент Card. Принимает: пропсы title (строка) и children (любой React-узел). Импортирует styles из CSS-модуля. Возвращает: div с className={styles.card}, содержащий h3 с заголовком и children).",
      hint: "Card.module.css",
      difficulty: "medium",
      solution:
        "// Card.module.css\n.card {\n  border: 1px solid #ccc;\n  border-radius: 12px;\n  padding: 16px;\n  margin: 8px;\n}\n\n.title {\n  margin-bottom: 12px;\n  color: var(--accent);\n}\n\n// Card.jsx\nimport styles from './Card.module.css';\n\nfunction Card({ title, children }) {\n  return (\n    &lt;div className={styles.card}&gt;\n      &lt;h3 className={styles.title}&gt;{title}&lt;/h3&gt;\n      {children}\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Список из пропса",
      desc: "Функциональный компонент ItemList. Принимает: пропс items (массив объектов с полями id и name). Использует метод map для рендеринга каждого элемента в li с key={item.id}. Возвращает: ul с отфильтрованным списком элементов.",
      hint: "map + key",
      difficulty: "medium",
      solution:
        "function ItemList({ items }) {\n  return (\n    &lt;ul&gt;\n      {items.map(item =&gt; (\n        &lt;li key={item.id}&gt;{item.name}&lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}",
    },
    {
      title: "PropTypes валидация",
      desc: "Функциональный компонент UserCard с валидацией пропсов через PropTypes. Принимает: пропсы name (строка, обязательный) и age (число, опционально). Импортирует PropTypes из 'prop-types'. Возвращает: div с текстом «{name}, возраст {age}». UserCard.propTypes задаёт типы пропсов для валидации в development-режиме.",
      hint: "PropTypes.string.isRequired",
      difficulty: "medium",
      solution:
        "import PropTypes from 'prop-types';\n\nfunction UserCard({ name, age }) {\n  return (\n    &lt;div&gt;\n      {name}, возраст {age}\n    &lt;/div&gt;\n  );\n}\n\nUserCard.propTypes = {\n  name: PropTypes.string.isRequired,\n  age: PropTypes.number\n};",
    },
    {
      title: "Передача JSX через children",
      desc: "Функциональный компонент Layout. Принимает: пропсы header, main, footer (любой React-узел для каждого). Позволяет передавать готовую JSX-разметку для каждой секции страницы. Возвращает: div, содержащий header (с пропсом header), main (с пропсом main) и footer (с пропсом footer).",
      hint: "children или отдельные пропсы",
      difficulty: "medium",
      solution:
        "function Layout({ header, main, footer }) {\n  return (\n    &lt;div&gt;\n      &lt;header&gt;{header}&lt;/header&gt;\n      &lt;main&gt;{main}&lt;/main&gt;\n      &lt;footer&gt;{footer}&lt;/footer&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Композиция модального окна (CSS-модуль)",
      desc: "Два файла: Modal.module.css (содержит .overlay для затемнения фона, .modal для карточки, .closeBtn для кнопки закрытия) и Modal.jsx (функциональный компонент Modal. Принимает: пропсы isOpen (boolean), onClose (функция), children (любой React-узел). Если isOpen false, возвращает null (ничего не рендерится). Иначе возвращает div.overlay с div.modal, содержащим кнопку закрытия и children).",
      hint: "Modal.module.css",
      difficulty: "medium",
      solution:
        "// Modal.module.css\n.overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1000;\n}\n\n.modal {\n  background: var(--surface);\n  padding: 20px;\n  border-radius: 16px;\n  max-width: 500px;\n  width: 90%;\n}\n\n.closeBtn {\n  margin-bottom: 16px;\n}\n\n// Modal.jsx\nimport styles from './Modal.module.css';\n\nfunction Modal({ isOpen, onClose, children }) {\n  if (!isOpen) return null;\n  \n  return (\n    &lt;div className={styles.overlay}&gt;\n      &lt;div className={styles.modal}&gt;\n        &lt;button className={styles.closeBtn} onClick={onClose}&gt;\n          Закрыть\n        &lt;/button&gt;\n        {children}\n      &lt;/div&gt;\n    &lt;/div&gt;\n  );\n}",
    },
  ],
};
