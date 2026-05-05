// Тема 4: useEffect и работа с API
const theme4 = {
  id: 4,
  title: "useEffect и работа с API",
  theory: {
    title: "Хук useEffect",
    subtitle: "Запросы, очистка",
    content: `<p><strong>useEffect</strong> — это хук для выполнения побочных эффектов (side effects) в функциональных компонентах. Побочные эффекты — это любые действия, которые не связаны напрямую с рендерингом: запросы к API, работа с localStorage, подписки на события, таймеры, манипуляции с DOM.</p>

      <h3 style="color:var(--accent);margin-top:24px">📦 Синтаксис useEffect</h3>
      <div class="code-block"><div class="code-header">Базовая структура</div><pre>import { useEffect } from 'react';

useEffect(() => {
  // 🔹 Побочный эффект (выполняется после рендеринга)

  return () => {
    // 🔸 Функция очистки (cleanup) — выполняется при размонтировании
    //    или перед повторным запуском эффекта
  };
}, [/* массив зависимостей */]);</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">📋 Три варианта зависимостей</h3>
      <p>Поведение <code>useEffect</code> зависит от массива зависимостей:</p>

      <div class="code-block"><div class="code-header">1. Пустой массив [] — однократный запуск</div><pre>useEffect(() => {
  console.log('Компонент смонтирован');
  fetchData();
}, []); // Выполнится только один раз при монтировании</pre></div>

      <div class="code-block"><div class="code-header">2. С зависимостями [a, b] — при изменении</div><pre>useEffect(() => {
  document.title = \`Счётчик: \${count}\`;
}, [count]); // Выполняется при каждом изменении count</pre></div>

      <div class="code-block"><div class="code-header">3. Без массива — после каждого рендера</div><pre>useEffect(() => {
  console.log('Рендер произошёл');
}); // Выполняется после КАЖДОГО рендера (используется редко)</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🌐 Запросы к API (Data Fetching)</h3>
      <p>Стандартный паттерн загрузки данных с сервера:</p>
      <div class="code-block"><div class="code-header">Fetch + три состояния</div><pre>function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then(data => {
        setUsers(data);      // Успех — сохраняем данные
        setLoading(false);   // Выключаем загрузку
      })
      .catch(err => {
        setError(err.message); // Ошибка — сохраняем сообщение
        setLoading(false);
      });
  }, []);

if (loading) return &lt;p&gt;Загрузка...&lt;/p&gt;;
  if (error) return &lt;p style={{color: 'red'}}&gt;Ошибка: {error}&lt;/p&gt;;

return (
    &lt;ul&gt;
      {users.map(u =&gt; &lt;li key={u.id}&gt;{u.name}&lt;/li&gt;)}
    &lt;/ul&gt;
  );
}</pre></div>
      <div class="info-box success"><strong>💡 Паттерн «Loading → Success → Error»:</strong> всегда обрабатывайте три состояния загрузки данных.</div>

      <h3 style="color:var(--accent);margin-top:24px">🧹 Cleanup — Функция очистки</h3>
      <p>Функция очистки предотвращает утечки памяти:</p>
      <div class="code-block"><div class="code-header">Таймер с очисткой</div><pre>function Timer() {
  useEffect(() => {
    const id = setInterval(() => {
      console.log('Тик');
    }, 1000);

    return () => clearInterval(id);
  }, []);

return &lt;p&gt;Таймер работает&lt;/p&gt;;
}</pre></div>
      <div class="code-block"><div class="code-header">Событие resize с очисткой</div><pre>function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return &lt;p&gt;Ширина: {width}px&lt;/p&gt;;
}&lt;/pre&gt;&lt;/div&gt;

      &lt;h3 style="color:var(--accent);margin-top:24px"&gt;💾 Работа с localStorage&lt;/h3&gt;
      &lt;div class="code-block"&gt;&lt;div class="code-header"&gt;Автосохранение + инициализация&lt;/div&gt;&lt;pre&gt;function Editor() {
  const [text, setText] = useState(() =&gt; {
    return localStorage.getItem('draft') || '';
  });

  useEffect(() =&gt; {
    localStorage.setItem('draft', text);
  }, [text]);

  return (
    &lt;textarea
      value={text}
      onChange={e =&gt; setText(e.target.value)}
    /&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">📌 useEffect vs Event Handlers</h3>
      <div class="code-block"><div class="code-header">Когда НЕ нужен useEffect</div><pre>// ❌ ПЛОХО: запрос при клике через useEffect
function PostLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);
  useEffect(() => {
    if (shouldLoad) fetchPost();
  }, [shouldLoad]);
return &lt;button onClick={() =&gt; setShouldLoad(true)}&gt;Загрузить&lt;/button&gt;;
}

// ✅ ХОРОШО: запрос напрямую в обработчике
function PostLoader() {
  const loadPost = () => fetchPost();
return &lt;button onClick={loadPost}&gt;Загрузить&lt;/button&gt;;
}</pre></div>`,
  },
  tasks: [
    {
      title: "Лог при монтировании",
      desc: "Функциональный компонент MountLogger, демонстрирующий useEffect с пустым массивом зависимостей. Вызывает console.log с сообщением «Компонент смонтирован» при монтировании. Возвращает параграф с подсказкой проверить консоль.",
      hint: "useEffect(()=&gt;{},[])",
      difficulty: "easy",
      solution:
        "import { useEffect } from 'react';\n\nfunction MountLogger() {\n  useEffect(() =&gt; {\n    console.log('Компонент смонтирован');\n  }, []);\n  \n  return &lt;p&gt;Проверьте консоль (F12)&lt;/p&gt;;\n}",
    },
    {
      title: "Обновление заголовка",
      desc: "Функциональный компонент TitleUpdater, обновляющий document.title через useEffect с зависимостью count. Хранит count (число). При каждом изменении count заголовок страницы меняется на «Счётчик: {count}». Возвращает div с отображением счётчика и кнопкой +1.",
      hint: "зависимость [count]",
      difficulty: "easy",
      solution:
        "import { useState, useEffect } from 'react';\n\nfunction TitleUpdater() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() =&gt; {\n    document.title = `Счётчик: ${count}`;\n  }, [count]);\n  \n  return (\n    &lt;div&gt;\n      &lt;p&gt;{count}&lt;/p&gt;\n      &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;+1&lt;/button&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Получение пользователей из API",
      desc: "Функциональный компонент UsersFetch, выполняющий GET-запрос к JSONPlaceholder API. Хранит users (массив объектов пользователей). В useEffect с пустыми зависимостями делает fetch и сохраняет результат в users. Возвращает ul с именем каждого пользователя (user.name) в li.",
      hint: "fetch then setUsers",
      difficulty: "medium",
      solution:
        "import { useState, useEffect } from 'react';\n\nfunction UsersFetch() {\n  const [users, setUsers] = useState([]);\n  \n  useEffect(() =&gt; {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      .then(response =&gt; response.json())\n      .then(data =&gt; setUsers(data));\n  }, []);\n  \n  return (\n    &lt;ul&gt;\n      {users.map(user =&gt; (\n        &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}",
    },
    {
      title: "Состояние загрузки",
      desc: "Функциональный компонент UsersWithLoading, расширяющий UsersFetch индикатором загрузки. Хранит users (массив) и loading (boolean). Пока loading=true, возвращает параграф «Загрузка пользователей...». После получения данных устанавливает loading=false и отображает список пользователей в ul.",
      hint: "setLoading",
      difficulty: "medium",
      solution:
        "import { useState, useEffect } from 'react';\n\nfunction UsersWithLoading() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n  \n  useEffect(() =&gt; {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      .then(response =&gt; response.json())\n      .then(data =&gt; {\n        setUsers(data);\n        setLoading(false);\n      });\n  }, []);\n  \n  if (loading) return &lt;p&gt;Загрузка пользователей...&lt;/p&gt;;\n  \n  return (\n    &lt;ul&gt;\n      {users.map(user =&gt; (\n        &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}",
    },
    {
      title: "Обработка ошибок",
      desc: "Функциональный компонент UsersWithError, расширяющий загрузку данных обработкой ошибок. Хранит users (массив), loading (boolean) и error (строка или null). Проверяет response.ok, при ошибке выбрасывает исключение. В .catch сохраняет сообщение об ошибке. В finally выключает loading. Возвращает: «Загрузка...», сообщение об ошибке красным цветом, или список пользователей.",
      hint: ".catch",
      difficulty: "medium",
      solution:
        "import { useState, useEffect } from 'react';\n\nfunction UsersWithError() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n  \n  useEffect(() =&gt; {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      .then(response =&gt; {\n        if (!response.ok) throw new Error('Ошибка сети');\n        return response.json();\n      })\n      .then(setUsers)\n      .catch(e =&gt; setError(e.message))\n      .finally(() =&gt; setLoading(false));\n  }, []);\n  \n  if (loading) return &lt;p&gt;Загрузка...&lt;/p&gt;;\n  if (error) return &lt;p style={{ color: 'red' }}&gt;Ошибка: {error}&lt;/p&gt;;\n  \n  return (\n    &lt;ul&gt;\n      {users.map(user =&gt; (\n        &lt;li key={user.id}&gt;{user.name}&lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}",
    },
    {
      title: "Таймер с очисткой",
      desc: "Функциональный компонент Timer, демонстрирующий cleanup функцию в useEffect. В useEffect с пустыми зависимостями запускает setInterval, каждую секунду выводящий в консоль «Прошла секунда». Возвращает функцию очистки с clearInterval, которая вызывается при размонтировании компонента. Возвращает параграф «Таймер работает (смотри консоль)».",
      hint: "clearInterval",
      difficulty: "medium",
      solution:
        "import { useEffect } from 'react';\n\nfunction Timer() {\n  useEffect(() =&gt; {\n    const id = setInterval(() =&gt; {\n      console.log('Прошла секунда');\n    }, 1000);\n    \n    return () =&gt; clearInterval(id);\n  }, []);\n  \n  return &lt;p&gt;Таймер работает (смотри консоль)&lt;/p&gt;;\n}",
    },
    {
      title: "Загрузка поста по ID",
      desc: "Функциональный компонент PostById, загружающий пост по указанному ID. Хранит id (число) и post (объект или null). Функция loadPost делает fetch по URL с id, парсит JSON и сохраняет в post. Возвращает div с input type='number', кнопкой «Загрузить пост» и условным отображением заголовка (post.title) и тела (post.body) поста.",
      hint: "fetch по id",
      difficulty: "medium",
      solution:
        'import { useState } from \'react\';\n\nfunction PostById() {\n  const [id, setId] = useState(1);\n  const [post, setPost] = useState(null);\n  \n  const loadPost = () =&gt; {\n    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)\n      .then(response =&gt; response.json())\n      .then(setPost);\n  };\n  \n  return (\n    &lt;div&gt;\n      &lt;input\n        type="number"\n        value={id}\n        onChange={(e) =&gt; setId(e.target.value)}\n        min="1"\n        max="100"\n      /&gt;\n      &lt;button onClick={loadPost}&gt;Загрузить пост&lt;/button&gt;\n      {post &amp;&amp; (\n        &lt;div&gt;\n          &lt;h3&gt;{post.title}&lt;/h3&gt;\n          &lt;p&gt;{post.body}&lt;/p&gt;\n        &lt;/div&gt;\n      )}\n    &lt;/div&gt;\n  );\n}',
    },
    {
      title: "Авто-сохранение в localStorage",
      desc: "Функциональный компонент AutoSaveTextarea, автоматически сохраняющий текст в localStorage. Хранит text (строка), инициализирующийся из localStorage.getItem('draft') или пустой строкой. В useEffect с зависимостью [text] при каждом изменении сохраняет текст в localStorage. Возвращает textarea с сохранённым значением.",
      hint: "useEffect с [text]",
      difficulty: "medium",
      solution:
        "import { useState, useEffect } from 'react';\n\nfunction AutoSaveTextarea() {\n  const [text, setText] = useState(() =&gt; {\n    return localStorage.getItem('draft') || '';\n  });\n  \n  useEffect(() =&gt; {\n    localStorage.setItem('draft', text);\n  }, [text]);\n  \n  return (\n    &lt;textarea\n      value={text}\n      onChange={(e) =&gt; setText(e.target.value)}\n      rows={5}\n      cols={40}\n      placeholder=\"Текст автосохраняется...\"\n    /&gt;\n  );\n}",
    },
    {
      title: "Отслеживание размера окна (resize)",
      desc: "Функциональный компонент WindowWidth, отслеживающий ширину окна браузера. Хранит width (число), инициализирующийся window.innerWidth. В useEffect добавляет обработчик resize на window, обновляющий ширину. Возвращает cleanup-функцию с removeEventListener. Возвращает параграф «Ширина окна: {width}px».",
      hint: "addEventListener/removeEventListener",
      difficulty: "medium",
      solution:
        "import { useState, useEffect } from 'react';\n\nfunction WindowWidth() {\n  const [width, setWidth] = useState(window.innerWidth);\n  \n  useEffect(() =&gt; {\n    const handler = () =&gt; setWidth(window.innerWidth);\n    \n    window.addEventListener('resize', handler);\n    \n    return () =&gt; window.removeEventListener('resize', handler);\n  }, []);\n  \n  return &lt;p&gt;Ширина окна: {width}px&lt;/p&gt;;\n}",
    },
    {
      title: "Загрузка случайного кота",
      desc: "Функциональный компонент RandomCat, загружающий случайные изображения котов через TheCatAPI. Хранит url (строка URL изображения) и loading (boolean). Функция loadCat делает fetch к API, извлекает URL первой картинки и обновляет state. useEffect вызывает loadCat при монтировании. Возвращает div с изображением кота (img) и кнопкой «Новый кот» для загрузки нового изображения.",
      hint: "fetch image",
      difficulty: "medium",
      solution:
        "import { useState, useEffect } from 'react';\n\nfunction RandomCat() {\n  const [url, setUrl] = useState('');\n  const [loading, setLoading] = useState(false);\n  \n  const loadCat = () =&gt; {\n    setLoading(true);\n    fetch('https://api.thecatapi.com/v1/images/search')\n      .then(response =&gt; response.json())\n      .then(data =&gt; {\n        setUrl(data[0].url);\n        setLoading(false);\n      });\n  };\n  \n  useEffect(() =&gt; {\n    loadCat();\n  }, []);\n  \n  return (\n    &lt;div&gt;\n      {loading ? (\n        &lt;p&gt;Загрузка кота...&lt;/p&gt;\n      ) : (\n        &lt;img src={url} alt=\"Котик\" style={{ maxWidth: '100%', borderRadius: 12 }} /&gt;\n      )}\n      &lt;button onClick={loadCat}&gt;Новый кот&lt;/button&gt;\n    &lt;/div&gt;\n  );\n}",
    },
  ],
};