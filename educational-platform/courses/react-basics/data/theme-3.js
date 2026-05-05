// Тема 3: useState и события
const theme3 = {
  id: 3,
  title: "useState и события",
  theory: {
    title: "Состояние компонента (useState)",
    subtitle: "Хук useState, обработка событий, формы",
    content: `<p><strong>useState</strong> — это хук (функция) для добавления состояния в функциональные компоненты React. Без него компоненты были бы статичными — ничего не могло бы меняться после рендеринга. useState позволяет React-компонентам «запоминать» данные между рендерами.</p>

      <h3 style="color:var(--accent);margin-top:24px">📦 Синтаксис useState</h3>
      <div class="code-block"><div class="code-header">Базовая структура</div><pre>import { useState } from 'react';

const [state, setState] = useState(initialValue);
//       ^          ^               ^
//   текущее   функция         начальное
//   значение  обновления       значение</pre></div>
      <p><strong>useState возвращает массив из двух элементов:</strong></p>
      <ul style="padding-left:20px;margin:12px 0">
        <li><code>state</code> — текущее значение состояния</li>
        <li><code>setState</code> — функция для обновления состояния</li>
      </ul>

      <h3 style="color:var(--accent);margin-top:24px">🔢 Пример: счётчик</h3>
      <div class="code-block"><div class="code-header">Простейший счётчик</div><pre>import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

return (
    &lt;div&gt;
      &lt;p&gt;Счётчик: {count}&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;
        +1
      &lt;/button&gt;
    &lt;/div&gt;
  );
}</pre></div>
      <div class="info-box success"><strong>💡 Важно:</strong> <code>useState</code> — это хук. Все хуки React должны вызываться только на верхнем уровне компонента (не внутри условий, циклов или вложенных функций).</div>

      <h3 style="color:var(--accent);margin-top:24px">🎯 Множественные состояния</h3>
      <p>Можно вызывать useState несколько раз для разных переменных:</p>
      <div class="code-block"><div class="code-header">Несколько useState</div><pre>function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

return (
    &lt;form&gt;
      &lt;input value={email} onChange={e =&gt; setEmail(e.target.value)} /&gt;
      &lt;input value={password} onChange={e =&gt; setPassword(e.target.value)} /&gt;
      &lt;button disabled={isSubmitting}&gt;Отправить&lt;/button&gt;
    &lt;/form&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🔄 Объекты в useState</h3>
      <p>Для объектов нужно заменять весь объект целиком (используя спред-оператор), а не мутировать его:</p>
      <div class="code-block"><div class="code-header">Обновление объекта состояния</div><pre>function UserForm() {
  const [user, setUser] = useState({ name: '', age: 0 });

  const updateName = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const updateAge = (e) => {
    setUser({ ...user, age: +e.target.value });
  };

return (
    &lt;div&gt;
      &lt;p&gt;{user.name}, {user.age} лет&lt;/p&gt;
      &lt;input value={user.name} onChange={updateName} placeholder="Имя" /&gt;
      &lt;input value={user.age} onChange={updateAge} type="number" placeholder="Возраст" /&gt;
    &lt;/div&gt;
  );
}</pre></div>
      <div class="info-box warning"><strong>⚠️ Важно:</strong> В React состояние считается неизменяемым (immutable). Всегда создавайте новый объект/массив при обновлении, а не мутируйте существующий.</div>

      <h3 style="color:var(--accent);margin-top:24px">📋 Массивы в useState</h3>
      <div class="code-block"><div class="code-header">Работа с массивами</div><pre>function TodoApp() {
  const [todos, setTodos] = useState([]);

  // Добавление
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, done: false }]);
  };

  // Удаление по индексу
  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Обновление элемента
  const toggleTodo = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  };

return (
    &lt;ul&gt;
      {todos.map((todo, idx) =&gt; (
        &lt;li key={todo.id}&gt;{todo.text}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">⚡ Функциональное обновление (prevState)</h3>
      <p>Когда новое состояние зависит от предыдущего, используйте функцию-колбэк:</p>
      <div class="code-block"><div class="code-header">setCount(c => c + 1)</div><pre>function SafeCounter() {
  const [count, setCount] = useState(0);

  // ❌ Проблема: count может быть устаревшим
  const badIncrement = () => {
    setCount(count + 1);
    setCount(count + 1);
    // Результат: +1, а НЕ +2!
  };

  // ✅ Решение: функциональное обновление
  const goodIncrement = () => {
    setCount(c => c + 1);  // c — это актуальное значение
    setCount(c => c + 1);  // c — обновлённое (после предыдущего setCount)
    // Результат: +2 ✅
  };

return (
    &lt;div&gt;
      &lt;p&gt;{count}&lt;/p&gt;
      &lt;button onClick={badIncrement}&gt;+1 (плохо)&lt;/button&gt;
      &lt;button onClick={goodIncrement}&gt;+2 (хорошо)&lt;/button&gt;
    &lt;/div&gt;
  );
}</pre></div>
      <div class="info-box success"><strong>💡 Функциональное обновление:</strong> Используйте <code>setState(prev => newValue)</code> когда новое значение зависит от предыдущего. Это гарантирует, что вы всегда работаете с актуальным состоянием, даже при множественных вызовах.</div>

      <h3 style="color:var(--accent);margin-top:24px">🖱️ Обработка событий (Events)</h3>
      <p>React использует <strong>синтетические события (SyntheticEvent)</strong> — кросс-браузерную обёртку над нативными событиями:</p>
      <div class="code-block"><div class="code-header">Основные события</div><pre>function EventExamples() {
  const handleClick = () => alert('Клик!');
  const handleChange = (e) => console.log(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault(); // Отменяем перезагрузку страницы
    console.log('Форма отправлена');
  };

return (
    &lt;div&gt;
      &lt;button onClick={handleClick}&gt;Нажми&lt;/button&gt;
      &lt;input onChange={handleChange} placeholder="Введите текст" /&gt;
      &lt;form onSubmit={handleSubmit}&gt;
        &lt;button type="submit"&gt;Отправить&lt;/button&gt;
      &lt;/form&gt;
    &lt;/div&gt;
  );
}</pre></div>
      <div class="info-box warning"><strong>⚠️ Важно:</strong> События в React пишутся в camelCase: <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>, <code>onMouseEnter</code>.</div>

      <h3 style="color:var(--accent);margin-top:24px">📝 Управляемые компоненты (Controlled Components)</h3>
      <p>Управляемый компонент — это элемент формы (input, textarea, select), значение которого контролируется через state React:</p>
      <div class="code-block"><div class="code-header">Управляемый input</div><pre>function ControlledInput() {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

return (
    &lt;div&gt;
      &lt;input
        value={name}
        onChange={handleChange}
        placeholder="Ваше имя"
      /&gt;
      &lt;p&gt;Вы ввели: {name}&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🚫 Предотвращение отправки формы</h3>
      <div class="code-block"><div class="code-header">Обработка submit формы</div><pre>function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Вход:', { email, password });
  };

return (
    &lt;form onSubmit={handleSubmit}&gt;
      &lt;input type="email" value={email}
        onChange={e =&gt; setEmail(e.target.value)} /&gt;
      &lt;input type="password" value={password}
        onChange={e =&gt; setPassword(e.target.value)} /&gt;
      &lt;button type="submit"&gt;Войти&lt;/button&gt;
    &lt;/form&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🏷️ Ленивая инициализация</h3>
      <p>Если начальное значение требует дорогостоящих вычислений, передайте функцию:</p>
      <div class="code-block"><div class="code-header">Ленивая инициализация</div><pre>// ❌ БЕЗ ленивой инициализации — вызывается при КАЖДОМ рендере
const [value] = useState(expensiveComputation());

// ✅ С ленивой инициализацией — вызывается только ПЕРВЫЙ раз
const [value] = useState(() => expensiveComputation());</pre></div>
      <div class="info-box"><strong>💡 Когда использовать ленивую инициализацию:</strong> При чтении из localStorage, сложных математических вычислениях, парсинге больших данных.</div>`,
  },
 tasks: [
    {
      title: "Счётчик с кнопками +1 и -1",
      desc: "Функциональный компонент Counter, использующий хук useState для управления состоянием. Импортирует useState из 'react'. Хранит count (число, начальное значение 0). Возвращает: div с двумя кнопками (-1 и +1), которые изменяют count через setCount, и span для отображения текущего значения с отступами по бокам.",
      hint: "useState",
      difficulty: "easy",
      solution:
        "import { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    &lt;div&gt;\n      &lt;button onClick={() =&gt; setCount(count - 1)}&gt;-1&lt;/button&gt;\n      &lt;span style={{ margin: '0 20px' }}&gt;{count}&lt;/span&gt;\n      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;+1&lt;/button&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Управляемый input",
      desc: "Функциональный компонент TextDisplay с управляемым input. Хранит text (строка, начальное значение ''). onChange обновляет text через e.target.value. Возвращает: div с input (value={text}) и p, отображающим «Вы ввели: {text}».",
      hint: "onChange",
      difficulty: "easy",
      solution:
        "import { useState } from 'react';\n\nfunction TextDisplay() {\n  const [text, setText] = useState('');\n  \n  return (\n    &lt;div&gt;\n      &lt;input\n        value={text}\n        onChange={(e) =&gt; setText(e.target.value)}\n        placeholder=\"Введите текст...\"\n      /&gt;\n      &lt;p&gt;Вы ввели: {text}&lt;/p&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Кнопка показать/скрыть",
      desc: "Функциональный компонент ToggleText, переключающий видимость контента. Хранит visible (boolean, начальное false). Кнопка переключает visible через setVisible(!visible). Контент рендерится условно через оператор &amp;&amp;. Возвращает: div с кнопкой (текст меняется на «Показать»/«Скрыть») и условным параграфом «Секретный контент».",
      hint: "boolean состояние",
      difficulty: "easy",
      solution:
        "import { useState } from 'react';\n\nfunction ToggleText() {\n  const [visible, setVisible] = useState(false);\n  \n  return (\n    &lt;div&gt;\n      &lt;button onClick={() =&gt; setVisible(!visible)}&gt;\n        {visible ? 'Скрыть' : 'Показать'}\n      &lt;/button&gt;\n      {visible &amp;&amp; &lt;p&gt;Секретный контент&lt;/p&gt;}\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Форма с двумя полями (CSS-модуль)",
      desc: "Два файла: Form.module.css (содержит .form с flex-расположением, .input с тёмной темой) и LoginForm.jsx (функциональный компонент LoginForm. Хранит form — объект с полями email и password. Функция handleChange обновляет соответствующее поле через [e.target.name]. Функция handleSubmit предотвращает стандартную отправку, выводит form в alert и очищает поля. Возвращает: стилизованную форму с двумя input и кнопкой «Войти»).",
      hint: "Form.module.css",
      difficulty: "medium",
      solution:
        "// Form.module.css\n.form {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  max-width: 300px;\n}\n\n.input {\n  padding: 8px;\n  border-radius: 6px;\n  border: 1px solid var(--border);\n  background: var(--surface-2);\n  color: var(--text);\n}\n\n// LoginForm.jsx\nimport { useState } from 'react';\nimport styles from './Form.module.css';\n\nfunction LoginForm() {\n  const [form, setForm] = useState({ email: '', password: '' });\n  \n  const handleChange = (e) =&gt; {\n    setForm({ ...form, [e.target.name]: e.target.value });\n  };\n  \n  const handleSubmit = (e) =&gt; {\n    e.preventDefault();\n    alert(JSON.stringify(form));\n    setForm({ email: '', password: '' });\n  };\n  \n  return (\n    &lt;form className={styles.form} onSubmit={handleSubmit}&gt;\n      &lt;input\n        className={styles.input}\n        name=\"email\"\n        value={form.email}\n        onChange={handleChange}\n        placeholder=\"Email\"\n      /&gt;\n      &lt;input\n        className={styles.input}\n        name=\"password\"\n        type=\"password\"\n        value={form.password}\n        onChange={handleChange}\n        placeholder=\"Пароль\"\n      /&gt;\n      &lt;button type=\"submit\"&gt;Войти&lt;/button&gt;\n    &lt;/form&gt;\n  );\n}",
    },
    {
      title: "Список задач (Todo list) — добавление",
      desc: "Функциональный компонент TodoList для управления списком задач. Хранит tasks (массив строк) и input (строка текущего ввода). Функция addTask проверяет input на пустоту, добавляет задачу в tasks через setTasks([...tasks, input]) и очищает input. Возвращает: div с input, кнопкой «Добавить» и ul со списком задач.",
      hint: "setTasks([...tasks, newTask])",
      difficulty: "medium",
      solution:
        "import { useState } from 'react';\n\nfunction TodoList() {\n  const [tasks, setTasks] = useState([]);\n  const [input, setInput] = useState('');\n  \n  const addTask = () =&gt; {\n    if (input.trim()) {\n      setTasks([...tasks, input]);\n      setInput('');\n    }\n  };\n  \n  return (\n    &lt;div&gt;\n      &lt;input\n        value={input}\n        onChange={(e) =&gt; setInput(e.target.value)}\n      /&gt;\n      &lt;button onClick={addTask}&gt;Добавить&lt;/button&gt;\n      &lt;ul&gt;\n        {tasks.map((task, idx) =&gt; (\n          &lt;li key={idx}&gt;{task}&lt;/li&gt;\n        ))}\n      &lt;/ul&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Удаление задачи",
      desc: "TodoList с кнопкой удаления.",
      hint: "filter",
      difficulty: "medium",
      solution:
        "import { useState } from 'react';\n\nfunction TodoList() {\n  const [tasks, setTasks] = useState([]);\n  const [input, setInput] = useState('');\n  \n  const addTask = () =&gt; {\n    if (input.trim()) {\n      setTasks([...tasks, input]);\n      setInput('');\n    }\n  };\n  \n  const deleteTask = (idx) =&gt; {\n    setTasks(tasks.filter((_, i) =&gt; i !== idx));\n  };\n  \n  return (\n    &lt;div&gt;\n      &lt;input\n        value={input}\n        onChange={(e) =&gt; setInput(e.target.value)}\n      /&gt;\n      &lt;button onClick={addTask}&gt;Добавить&lt;/button&gt;\n      &lt;ul&gt;\n        {tasks.map((task, idx) =&gt; (\n          &lt;li key={idx}&gt;\n            {task}\n            &lt;button onClick={() =&gt; deleteTask(idx)}&gt;Удалить&lt;/button&gt;\n          &lt;/li&gt;\n        ))}\n      &lt;/ul&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Обновление счётчика (функциональное)",
      desc: "Функциональный компонент CounterWithPrev, демонстрирующий разницу между прямым и функциональным обновлением состояния. Хранит count (число). Возвращает div с отображением счётчика и тремя кнопками: +1 прямое обновление, +1 функциональное обновление (setCount(c =&gt; c + 1)), +2 за раз (двойной вызов функционального обновления).",
      hint: "setCount(c =&gt; c+1)",
      difficulty: "medium",
      solution:
        "import { useState } from 'react';\n\nfunction CounterWithPrev() {\n  const [count, setCount] = useState(0);\n  \n  const doubleCall = () =&gt; {\n    setCount(c =&gt; c + 1);\n    setCount(c =&gt; c + 1);\n  };\n  \n  return (\n    &lt;div&gt;\n      &lt;p&gt;{count}&lt;/p&gt;\n      &lt;button onClick={() =&gt; setCount(count + 1)}&gt;+1 (прямое)&lt;/button&gt;\n      &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;+1 (функц.)&lt;/button&gt;\n      &lt;button onClick={doubleCall}&gt;+2 за раз&lt;/button&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Чекбокс согласия",
      desc: "Функциональный компонент AgreementCheckbox с управляемым чекбоксом. Хранит agreed (boolean). Возвращает div с label, содержащим input type='checkbox', и параграфом, отображающим статус согласия: «Согласие получено ✅» или «Согласие не дано ❌».",
      hint: "type='checkbox'",
      difficulty: "easy",
      solution:
        "import { useState } from 'react';\n\nfunction AgreementCheckbox() {\n  const [agreed, setAgreed] = useState(false);\n  \n  return (\n    &lt;div&gt;\n      &lt;label&gt;\n        &lt;input\n          type=\"checkbox\"\n          checked={agreed}\n          onChange={(e) =&gt; setAgreed(e.target.checked)}\n        /&gt;\n        Я согласен\n      &lt;/label&gt;\n      &lt;p&gt;{agreed ? 'Согласие получено ✅' : 'Согласие не дано ❌'}&lt;/p&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Генератор случайного цвета",
      desc: "Функциональный компонент RandomColor, генерирующий случайный цвет. Хранит color (строка hex-цвета). Возвращает div с динамическим backgroundColor, отображающий текущий цвет и кнопку «Случайный цвет». При клике генерируется новый hex-цвет через Math.random.",
      hint: "Math.random",
      difficulty: "medium",
      solution:
        "import { useState } from 'react';\n\nfunction RandomColor() {\n  const [color, setColor] = useState('#ffffff');\n  \n  const generate = () =&gt; {\n    const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);\n    setColor(newColor);\n  };\n  \n  return (\n    &lt;div\n      style={{\n        backgroundColor: color,\n        padding: 40,\n        textAlign: 'center',\n        borderRadius: 16,\n        transition: 'background-color 0.3s ease'\n      }}\n    &gt;\n      &lt;p style={{ color: '#000', fontWeight: 'bold' }}&gt;\n        Текущий цвет: {color}\n      &lt;/p&gt;\n      &lt;button onClick={generate}&gt;Случайный цвет&lt;/button&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Двойной счётчик",
      desc: "Функциональный компонент DoubleCounter с двумя независимыми счётчиками. Хранит count1 и count2 (числа) через два вызова useState. Возвращает div с двумя блоками, каждый содержит название (Счётчик A / Счётчик B), значение, кнопку + и кнопку -.",
      hint: "два useState",
      difficulty: "medium",
      solution:
        "import { useState } from 'react';\n\nfunction DoubleCounter() {\n  const [count1, setCount1] = useState(0);\n  const [count2, setCount2] = useState(0);\n  \n  return (\n    &lt;div&gt;\n      &lt;div&gt;\n        Счётчик A: {count1}\n        &lt;button onClick={() =&gt; setCount1(count1 + 1)}&gt;+&lt;/button&gt;\n        &lt;button onClick={() =&gt; setCount1(count1 - 1)}&gt;-&lt;/button&gt;\n      &lt;/div&gt;\n      &lt;div&gt;\n        Счётчик B: {count2}\n        &lt;button onClick={() =&gt; setCount2(count2 + 1)}&gt;+&lt;/button&gt;\n        &lt;button onClick={() =&gt; setCount2(count2 - 1)}&gt;-&lt;/button&gt;\n      &lt;/div&gt;\n    &lt;/div&gt;\n  );\n}",
    },
  ],
};