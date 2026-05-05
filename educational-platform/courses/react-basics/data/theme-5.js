// Тема 5: Условный рендеринг, списки и ключи
const theme5 = {
  id: 5,
  title: "Условный рендеринг, списки и ключи",
  theory: {
    title: "Условный рендеринг",
    subtitle: "if, &&, тернарный, key",
    content: `<p>Условный рендеринг и работа со списками — это основа динамических интерфейсов. React позволяет гибко управлять тем, что отображается на экране, используя обычные JavaScript-конструкции.</p>

      <h3 style="color:var(--accent);margin-top:24px">🔀 Тернарный оператор (?:)</h3>
      <p>Тернарный оператор — самый популярный способ условного рендеринга в JSX:</p>
      <div class="code-block"><div class="code-header">Тернарный оператор</div><pre>function AuthMessage({ isLoggedIn }) {
return (
    &lt;h2&gt;
      {isLoggedIn
        ? 'Добро пожаловать!'
        : 'Пожалуйста, войдите'}
    &lt;/h2&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">✅ Логическое И (&&)</h3>
      <p>Оператор <code>&&</code> используется для рендеринга элемента только при выполнении условия:</p>
      <div class="code-block"><div class="code-header">Условный рендеринг через &&</div><pre>function Notification({ hasNewMessage, messageCount }) {
return (
    &lt;div&gt;
      {hasNewMessage &amp;&amp; (
        &lt;div className="badge"&gt;
          🔔 У вас {messageCount} новых сообщений
        &lt;/div&gt;
      )}
    &lt;/div&gt;
  );
}</pre></div>
      <div class="info-box warning"><strong>⚠️ Внимание:</strong> Не используйте <code>&&</code> с числами <code>0</code> — <code>{0 && <Component />}</code> отобразит <code>0</code>.</div>

      <h3 style="color:var(--accent);margin-top:24px">📋 Рендеринг списков с map()</h3>
      <p>Метод <code>map()</code> преобразует массив данных в массив JSX-элементов:</p>
      <div class="code-block"><div class="code-header">Базовый рендеринг списка</div><pre>function FruitList() {
  const fruits = ['Яблоко', 'Банан', 'Апельсин'];

return (
    &lt;ul&gt;
      {fruits.map((fruit, index) =&gt; (
        &lt;li key={index}&gt;{fruit}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🔑 Ключи (key) — зачем они нужны</h3>
      <p>Атрибут <code>key</code> помогает React идентифицировать элементы списка при обновлении:</p>
      <ul style="padding-left:20px;margin:12px 0">
        <li><strong>Правильный key:</strong> уникальный и стабильный <code>id</code> из данных</li>
        <li><strong>Плохой key:</strong> индекс массива (если список может меняться)</li>
        <li><strong>Опасный key:</strong> <code>Math.random()</code> — ломает всё</li>
      </ul>
      <div class="code-block"><div class="code-header">Правильное использование key</div><pre>function UserList() {
  const users = [
    { id: 1, name: 'Анна' },
    { id: 2, name: 'Олег' }
  ];

return (
    &lt;ul&gt;
      {users.map(user =&gt; (
        &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;
      ))}
    &lt;/ul&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🔍 Фильтрация массивов</h3>
      <p>Метод <code>filter()</code> создаёт новый массив с элементами, прошедшими проверку:</p>
      <div class="code-block"><div class="code-header">Фильтрация с filter()</div><pre>function FilteredList() {
  const numbers = [5, 12, 8, 20, 3, 15];
  const filtered = numbers.filter(n => n > 10);

return (
    &lt;ul&gt;
      {filtered.map(n =&gt; &lt;li key={n}&gt;{n}&lt;/li&gt;)}
    &lt;/ul&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🔄 Сортировка списков</h3>
      <div class="code-block"><div class="code-header">Сортировка с sort()</div><pre>function SortableList({ items, asc }) {
  const sorted = [...items].sort((a, b) =>
    asc ? a - b : b - a
  );

return (
    &lt;ul&gt;
      {sorted.map(item =&gt; &lt;li key={item}&gt;{item}&lt;/li&gt;)}
    &lt;/ul&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🪆 Вложенные списки</h3>
      <div class="code-block"><div class="code-header">Двойной map</div><pre>function CategoryList() {
  const categories = [
    { name: 'Фрукты', items: ['Яблоко', 'Банан'] },
    { name: 'Овощи', items: ['Морковь', 'Картофель'] }
  ];

return (
    &lt;div&gt;
      {categories.map(cat =&gt; (
        &lt;div key={cat.name}&gt;
          &lt;h3&gt;{cat.name}&lt;/h3&gt;
          &lt;ul&gt;
            {cat.items.map(item =&gt; (
              &lt;li key={item}&gt;{item}&lt;/li&gt;
            ))}
          &lt;/ul&gt;
        &lt;/div&gt;
      ))}
    &lt;/div&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🔎 Поиск с filter + useState</h3>
      <div class="code-block"><div class="code-header">Динамическая фильтрация</div><pre>import { useState } from 'react';

function SearchableList() {
  const [query, setQuery] = useState('');
  const items = ['React', 'JavaScript', 'Vue', 'Angular'];

  const filtered = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

return (
    &lt;div&gt;
      &lt;input value={query}
             onChange={e =&gt; setQuery(e.target.value)}
             placeholder="Поиск..." /&gt;
      &lt;ul&gt;
        {filtered.map(item =&gt; (
          &lt;li key={item}&gt;{item}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🎨 Динамические стили по условию</h3>
      <div class="code-block"><div class="code-header">Динамический className</div><pre>import styles from './Badge.module.css';

function StatusBadge({ status }) {
  const className = status === 'online'
    ? styles.online
    : styles.offline;

return &lt;span className={className}&gt;{status}&lt;/span&gt;;
}</pre></div>`,
  },
tasks: [
    {
      title: "Тернарный оператор",
      desc: "Функциональный компонент AuthMessage, демонстрирующий условный рендеринг через тернарный оператор. Использует константу isLoggedIn = true. Возвращает h2, отображающий «Добро пожаловать!» если isLoggedIn true, иначе «Пожалуйста, войдите».",
      hint: "тернарный",
      difficulty: "easy",
      solution:
        "function AuthMessage() {\n  const isLoggedIn = true;\n  \n  return (\n    &lt;h2&gt;\n      {isLoggedIn ? 'Добро пожаловать!' : 'Пожалуйста, войдите'}\n    &lt;/h2&gt;\n  );\n}",
    },
    {
      title: "Логическое И (&amp;&amp;)",
      desc: "Функциональный компонент Notification, демонстрирующий условный рендеринг через оператор &amp;&amp;. Использует константу hasNewMessage = true. Возвращает div, внутри которого при hasNewMessage true отображается параграф «🔔 У вас новое сообщение», иначе ничего не рендерится.",
      hint: "&amp;&amp;",
      difficulty: "easy",
      solution:
        "function Notification() {\n  const hasNewMessage = true;\n  \n  return (\n    &lt;div&gt;\n      {hasNewMessage &amp;&amp; &lt;p&gt;🔔 У вас новое сообщение&lt;/p&gt;}\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Рендеринг массива строк",
      desc: "Функциональный компонент FruitList, демонстрирующий рендеринг списка через map. Содержит массив fruits = ['Яблоко', 'Банан', 'Апельсин']. Возвращает ul, где каждый элемент массива отображается в li с key, равным значению строки.",
      hint: "map",
      difficulty: "easy",
      solution:
        "function FruitList() {\n  const fruits = ['Яблоко', 'Банан', 'Апельсин'];\n  \n  return (\n    &lt;ul&gt;\n      {fruits.map(fruit =&gt; (\n        &lt;li key={fruit}&gt;{fruit}&lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}",
    },
    {
      title: "Key — уникальный идентификатор",
      desc: "Функциональный компонент UserList, демонстрирующий использование уникального id как key при рендеринге списка объектов. Содержит массив users с объектами { id, name }. Возвращает ul, где каждый user отображается в li с key={user.id}.",
      hint: "id как key",
      difficulty: "easy",
      solution:
        "function UserList() {\n  const users = [\n    { id: 1, name: 'Анна' },\n    { id: 2, name: 'Олег' }\n  ];\n  \n  return (\n    &lt;ul&gt;\n      {users.map(user =&gt; (\n        &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}",
    },
    {
      title: "Фильтрация массива",
      desc: "Функциональный компонент FilteredNumbers, демонстрирующий фильтрацию массива через filter. Содержит массив numbers = [5, 12, 8, 20, 3, 15]. Создаёт отфильтрованный массив filtered, оставляя только числа &gt; 10. Возвращает ul с отфильтрованными значениями.",
      hint: "filter",
      difficulty: "medium",
      solution:
        "function FilteredNumbers() {\n  const numbers = [5, 12, 8, 20, 3, 15];\n  const filtered = numbers.filter(n =&gt; n &gt; 10);\n  \n  return (\n    &lt;ul&gt;\n      {filtered.map((n, idx) =&gt; (\n        &lt;li key={idx}&gt;{n}&lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}",
    },
    {
      title: "Сортировка списка",
      desc: "Функциональный компонент SortedList, демонстрирующий сортировку массива. Содержит массив names = ['Анна', 'Олег', 'Борис', 'Мария']. Создаёт копию массива через спред-оператор и сортирует по алфавиту через sort(). Возвращает ul с отсортированными именами.",
      hint: "sort()",
      difficulty: "medium",
      solution:
        "function SortedList() {\n  const names = ['Анна', 'Олег', 'Борис', 'Мария'];\n  const sorted = [...names].sort();\n  \n  return (\n    &lt;ul&gt;\n      {sorted.map((name, idx) =&gt; (\n        &lt;li key={idx}&gt;{name}&lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}",
    },
    {
      title: "Динамические стили по условию (CSS-модуль)",
      desc: "Функциональный компонент StatusBadge, принимающий пропс status ('online' или 'offline'), и соответствующий CSS-модуль Badge.module.css. Возвращает span, className которого динамически выбирается через тернарный оператор: styles.online для online, styles.offline для offline.",
      hint: "className={status === 'online' ? styles.online : styles.offline}",
      difficulty: "medium",
      solution:
        "// Badge.module.css\n.online {\n  background: #10b981;\n  color: white;\n  padding: 4px 12px;\n  border-radius: 20px;\n}\n\n.offline {\n  background: #6b7280;\n  color: white;\n  padding: 4px 12px;\n  border-radius: 20px;\n}\n\n// StatusBadge.jsx\nimport styles from './Badge.module.css';\n\nfunction StatusBadge({ status }) {\n  const badgeClass = status === 'online' ? styles.online : styles.offline;\n  \n  return &lt;span className={badgeClass}&gt;{status}&lt;/span&gt;;\n}",
    },
    {
      title: "Вложенные списки",
      desc: "Функциональный компонент CategoryList, демонстрирующий рендеринг вложенных списков через двойной map. Содержит массив categories с объектами { name, items: [] }.",
      hint: "двойной map",
      difficulty: "medium",
      solution:
        "function CategoryList() {\n  const categories = [\n    { name: 'Фрукты', items: ['Яблоко', 'Банан'] },\n    { name: 'Овощи', items: ['Морковь', 'Картофель'] }\n  ];\n  \n  return (\n    &lt;div&gt;\n      {categories.map(category =&gt; (\n        &lt;div key={category.name}&gt;\n          &lt;h3&gt;{category.name}&lt;/h3&gt;\n          &lt;ul&gt;\n            {category.items.map(item =&gt; (\n              &lt;li key={item}&gt;{item}&lt;/li&gt;\n            ))}\n          &lt;/ul&gt;\n        &lt;/div&gt;\n      ))}\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Поиск с filter",
      desc: "Функциональный компонент SearchableList, реализующий поиск по списку через useState и filter. Хранит query (строка поиска). Содержит массив items = ['React', 'JavaScript', 'TypeScript', 'Vue', 'Angular']. Фильтрует items через item.toLowerCase().includes(query.toLowerCase()).",
      hint: "useState для query",
      difficulty: "medium",
      solution:
        "import { useState } from 'react';\n\nfunction SearchableList() {\n  const [query, setQuery] = useState('');\n  const items = ['React', 'JavaScript', 'TypeScript', 'Vue', 'Angular'];\n  \n  const filtered = items.filter(item =&gt;\n    item.toLowerCase().includes(query.toLowerCase())\n  );\n  \n  return (\n    &lt;div&gt;\n      &lt;input\n        value={query}\n        onChange={(e) =&gt; setQuery(e.target.value)}\n        placeholder=\"Поиск...\"\n      /&gt;\n      &lt;ul&gt;\n        {filtered.map(item =&gt; (\n          &lt;li key={item}&gt;{item}&lt;/li&gt;\n        ))}\n      &lt;/ul&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Рендеринг компонента в цикле (CSS-модуль)",
      desc: "Два компонента: ProductCard (принимает пропсы name и price, возвращает div с CSS-модулем) и ProductList (содержит массив products, рендерит ProductCard для каждого продукта через map с key={product.id}).",
      hint: "map + компонент",
      difficulty: "medium",
      solution:
        "// ProductCard.module.css\n.card {\n  border: 1px solid #ccc;\n  padding: 8px;\n  margin: 8px;\n  border-radius: 8px;\n}\n\n.price {\n  color: var(--accent-3);\n  font-weight: bold;\n}\n\n// ProductCard.jsx\nimport styles from './ProductCard.module.css';\n\nfunction ProductCard({ name, price }) {\n  return (\n    &lt;div className={styles.card}&gt;\n      &lt;h4&gt;{name}&lt;/h4&gt;\n      &lt;p className={styles.price}&gt;{price} ₽&lt;/p&gt;\n    &lt;/div&gt;\n  );\n}\n\nfunction ProductList() {\n  const products = [\n    { id: 1, name: 'Ноутбук', price: 50000 },\n    { id: 2, name: 'Мышь', price: 1000 }\n  ];\n  \n  return (\n    &lt;div&gt;\n      {products.map(product =&gt; (\n        &lt;ProductCard\n          key={product.id}\n          name={product.name}\n          price={product.price}\n        /&gt;\n      ))}\n    &lt;/div&gt;\n  );\n}",
    },
  ],
};