// Тема 6: Дополнительные хуки: useRef, useMemo, useCallback
const theme6 = {
  id: 6,
  title: "Дополнительные хуки: useRef, useMemo, useCallback",
  theory: {
    title: "useRef, useMemo, useCallback",
    subtitle: "Кеширование и DOM",
    content: `<p><strong>useRef</strong>, <strong>useMemo</strong> и <strong>useCallback</strong> — это дополнительные ху��и React, которые помогают оптимизировать производительность и управлять DOM-элементами.</p>

      <h3 style="color:var(--accent);margin-top:24px">📍 useRef — Ссылки на DOM</h3>
      <p><strong>useRef</strong> создаёт изменяемый объект, который сохраняется между рендерами. Его изменение <strong>не вызывает</strong> перерендер компонента.</p>
      <div class="code-block"><div class="code-header">Синтаксис useRef</div><pre>import { useRef, useEffect } from 'react';

function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

return &lt;input ref={inputRef} placeholder="Автофокус" /&gt;;
}</pre></div>
      <div class="info-box success"><strong>💡 useRef vs useState:</strong> Изменение <code>ref.current</code> не вызывает перерендер.</div>

      <h3 style="color:var(--accent);margin-top:24px">⚡ useMemo — Мемоизация вычислений</h3>
      <p><strong>useMemo</strong> кеширует результат дорогостоящих вычислений и пересчитывает его только при изменении зависимостей:</p>
      <div class="code-block"><div class="code-header">Синтаксис useMemo</div><pre>const cachedValue = useMemo(() => {
  return slowFunction(data);
}, [data]);</pre></div>
      <div class="code-block"><div class="code-header">Пример: факториал</div><pre>import { useState, useMemo } from 'react';

function FactorialCalculator() {
  const [num, setNum] = useState(5);

  const factorial = useMemo(() => {
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    return result;
  }, [num]);

return (
    &lt;div&gt;
      &lt;input type="number" value={num}
             onChange={e =&gt; setNum(+e.target.value)} /&gt;
      &lt;p&gt;{num}! = {factorial}&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🔗 useCallback — Стабильные функции</h3>
      <p><strong>useCallback</strong> возвращает мемоизированную версию функции, которая меняется только при изменении зависимостей:</p>
      <div class="code-block"><div class="code-header">useCallback + React.memo</div><pre>const Child = React.memo(({ onClick }) => {
 return &lt;button onClick={onClick}&gt;Нажми&lt;/button&gt;;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    alert('Клик!');
  }, []);

return (
    &lt;div&gt;
      &lt;p&gt;{count}&lt;/p&gt;
      &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;+1&lt;/button&gt;
      &lt;Child onClick={handleClick} /&gt;
    &lt;/div&gt;
  );
}</pre></div>
      <div class="info-box warning"><strong>⚠️ Важно:</strong> Не используйте useCallback или useMemo без необходимости. Преждевременная оптимизация усложняет код.</div>

      <h3 style="color:var(--accent);margin-top:24px">🔄 Разница useMemo и useCallback</h3>
      <div class="code-block"><div class="code-header">Сравнение</div><pre>// useMemo — кеширует ЗНАЧЕНИЕ (результат вызова функции)
const value = useMemo(() => compute(a, b), [a, b]);

// useCallback — кеширует ФУНКЦИЮ (саму функцию)
const fn = useCallback(() => compute(a, b), [a, b]);</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">📐 Измерение DOM-элементов с useRef</h3>
      <div class="code-block"><div class="code-header">offsetWidth / offsetHeight</div><pre>import { useState, useRef, useEffect } from 'react';

function ElementWidth() {
  const [width, setWidth] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      setWidth(divRef.current.offsetWidth);
    }
  }, []);

return (
    &lt;div&gt;
      &lt;div ref={divRef} className="measured-box"&gt;Измеряемый блок&lt;/div&gt;
      &lt;p&gt;Ширина: {width}px&lt;/p&gt;
    &lt;/div&gt;
  );
}</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">⏱️ Секундомер с useRef</h3>
      <div class="code-block"><div class="code-header">Хранение ID интервала</div><pre>function Stopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset = () => { stop(); setTime(0); };

return (
    &lt;div&gt;
      &lt;h2&gt;{time} сек&lt;/h2&gt;
      &lt;button onClick={start}&gt;Старт&lt;/button&gt;
      &lt;button onClick={stop}&gt;Стоп&lt;/button&gt;
      &lt;button onClick={reset}&gt;Сброс&lt;/button&gt;
    &lt;/div&gt;
  );
}</pre></div>`,
  },
tasks: [
    {
      title: "Фокус на input при монтировании",
      desc: "Функциональный компонент AutoFocusInput, автоматически устанавливающий фокус на input при монтировании. Использует useRef для получения ссылки на DOM-элемент input.",
      hint: "useRef + focus()",
      difficulty: "easy",
      solution:
        "import { useRef, useEffect } from 'react';\n\nfunction AutoFocusInput() {\n  const inputRef = useRef(null);\n  \n  useEffect(() =&gt; {\n    inputRef.current.focus();\n  }, []);\n  \n  return &lt;input ref={inputRef} placeholder=\"Я в фокусе!\" /&gt;;\n}",
    },
    {
      title: "useMemo для факториала",
      desc: "Функциональный компонент FactorialCalculator, кеширующий вычисление факториала через useMemo. Хранит num (число).",
      hint: "useMemo",
      difficulty: "medium",
      solution:
        "import { useState, useMemo } from 'react';\n\nfunction FactorialCalculator() {\n  const [num, setNum] = useState(5);\n  \n  const factorial = useMemo(() =&gt; {\n    let result = 1;\n    for (let i = 2; i &lt;= num; i++) {\n      result *= i;\n    }\n    return result;\n  }, [num]);\n  \n  return (\n    &lt;div&gt;\n      &lt;input\n        type=\"number\"\n        value={num}\n        onChange={(e) =&gt; setNum(+e.target.value)}\n      /&gt;\n      &lt;p&gt;{num}! = {factorial}&lt;/p&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "useCallback для стабильной функции",
      desc: "Два компонента: Child (обёрнут в React.memo, принимает пропс onClick) и Parent (хранит count, функция handleClick обёрнута в useCallback с пустыми зависимостями).",
      hint: "useCallback",
      difficulty: "medium",
      solution:
        "import { useState, useCallback } from 'react';\n\nconst Child = React.memo(({ onClick }) =&gt; {\n  console.log('Child render');\n  return &lt;button onClick={onClick}&gt;Нажми&lt;/button&gt;;\n});\n\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  \n  const handleClick = useCallback(() =&gt; {\n    alert('Клик!');\n  }, []);\n  \n  return (\n    &lt;div&gt;\n      &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;\n        Рендер родителя: {count}\n      &lt;/button&gt;\n      &lt;Child onClick={handleClick} /&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Хранение предыдущего значения",
      desc: "Функциональный компонент PreviousValue, хранящий предыдущее значение состояния через useRef. Хранит count (число). useRef (prevRef) обновляется в useEffect при каждом изменении count.",
      hint: "useRef + useEffect",
      difficulty: "medium",
      solution:
        "import { useState, useRef, useEffect } from 'react';\n\nfunction PreviousValue() {\n  const [count, setCount] = useState(0);\n  const prevRef = useRef(0);\n  \n  useEffect(() =&gt; {\n    prevRef.current = count;\n  }, [count]);\n  \n  return (\n    &lt;div&gt;\n      &lt;p&gt;Текущее: {count}&lt;/p&gt;\n      &lt;p&gt;Предыдущее: {prevRef.current}&lt;/p&gt;\n      &lt;button onClick={() =&gt; setCount(c =&gt; c + 1)}&gt;+1&lt;/button&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "useMemo для фильтрации большого массива",
      desc: "Функциональный компонент FilteredList, оптимизирующий фильтрацию массива из 100 элементов через useMemo.",
      hint: "useMemo для filtered",
      difficulty: "medium",
      solution:
        "import { useState, useMemo } from 'react';\n\nfunction FilteredList() {\n  const [query, setQuery] = useState('');\n  \n  const items = useMemo(\n    () =&gt; Array.from({ length: 100 }, (_, i) =&gt; `Элемент ${i}`),\n    []\n  );\n  \n  const filtered = useMemo(\n    () =&gt; items.filter(item =&gt; item.includes(query)),\n    [query, items]\n  );\n  \n  return (\n    &lt;div&gt;\n      &lt;input\n        value={query}\n        onChange={(e) =&gt; setQuery(e.target.value)}\n        placeholder=\"Фильтр...\"\n      /&gt;\n      &lt;ul&gt;\n        {filtered.map(item =&gt; (\n          &lt;li key={item}&gt;{item}&lt;/li&gt;\n        ))}\n      &lt;/ul&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "useRef для хранения таймера (секундомер)",
      desc: "Функциональный компонент Stopwatch — секундомер с кнопками Старт, Стоп, Сброс. Хранит time (число секунд). useRef (intervalRef) хранит ID интервала.",
      hint: "intervalRef.current",
      difficulty: "medium",
      solution:
        "import { useState, useRef, useEffect } from 'react';\n\nfunction Stopwatch() {\n  const [time, setTime] = useState(0);\n  const intervalRef = useRef(null);\n  \n  const start = () =&gt; {\n    if (intervalRef.current) return;\n    intervalRef.current = setInterval(() =&gt; {\n      setTime(t =&gt; t + 1);\n    }, 1000);\n  };\n  \n  const stop = () =&gt; {\n    clearInterval(intervalRef.current);\n    intervalRef.current = null;\n  };\n  \n  const reset = () =&gt; {\n    stop();\n    setTime(0);\n  };\n  \n  useEffect(() =&gt; {\n    return () =&gt; stop();\n  }, []);\n  \n  return (\n    &lt;div&gt;\n      &lt;h2&gt;{time} сек&lt;/h2&gt;\n      &lt;button onClick={start}&gt;Старт&lt;/button&gt;\n      &lt;button onClick={stop}&gt;Стоп&lt;/button&gt;\n      &lt;button onClick={reset}&gt;Сброс&lt;/button&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "useCallback с зависимостями",
      desc: "Функциональный компонент SearchComponent, принимающий пропс onSearch. Хранит query (строка). Функция handleSearch обёрнута в useCallback с зависимостями [query, onSearch].",
      hint: "useCallback([query])",
      difficulty: "medium",
      solution:
        "import { useState, useCallback } from 'react';\n\nfunction SearchComponent({ onSearch }) {\n  const [query, setQuery] = useState('');\n  \n  const handleSearch = useCallback(() =&gt; {\n    onSearch(query);\n  }, [query, onSearch]);\n  \n  return (\n    &lt;div&gt;\n      &lt;input\n        value={query}\n        onChange={(e) =&gt; setQuery(e.target.value)}\n      /&gt;\n      &lt;button onClick={handleSearch}&gt;Искать&lt;/button&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "Разница useMemo и useCallback",
      desc: "Демонстрация разницы между useMemo и useCallback с комментариями в коде. useMemo кеширует результат вычисления (значение), useCallback кеширует саму функцию.",
      hint: "useMemo возвращает значение, useCallback функцию",
      difficulty: "medium",
      solution:
        "// useMemo кеширует результат вычисления (значение)\nconst expensiveValue = useMemo(() =&gt; {\n  return heavyCalculation(data);\n}, [data]);\n\n// useCallback кеширует саму функцию\nconst stableFunction = useCallback(() =&gt; {\n  doSomething(data);\n}, [data]);\n\n// Пример: useMemo для объекта\nconst userConfig = useMemo(() =&gt; ({\n  theme: 'dark',\n  language: 'ru'\n}), []);\n\n// useCallback для обработчика\nconst handleClick = useCallback(() =&gt; {\n  console.log('Clicked', userConfig);\n}, [userConfig]);",
    },
    {
      title: "Измерение ширины элемента с useRef",
      desc: "Функциональный компонент ElementWidth, измеряющий ширину DOM-элемента через useRef и offsetWidth.",
      hint: "useRef + useEffect",
      difficulty: "medium",
      solution:
        "import { useState, useRef, useEffect } from 'react';\n\nfunction ElementWidth() {\n  const [width, setWidth] = useState(0);\n  const divRef = useRef(null);\n  \n  useEffect(() =&gt; {\n    if (divRef.current) {\n      setWidth(divRef.current.offsetWidth);\n    }\n  }, []);\n  \n  return (\n    &lt;div&gt;\n      &lt;div\n        ref={divRef}\n        style={{\n          width: '50%',\n          background: '#333',\n          padding: 20,\n          borderRadius: 8\n        }}\n      &gt;\n        Измеряемый блок\n      &lt;/div&gt;\n      &lt;p&gt;Ширина: {width}px&lt;/p&gt;\n    &lt;/div&gt;\n  );\n}",
    },
    {
      title: "useMemo для сортировки",
      desc: "Функциональный компонент SortableList, принимающий пропсы numbers (массив чисел) и sortOrder ('asc' или 'desc'). Использует useMemo для кеширования результата сортировки.",
      hint: "зависимости",
      difficulty: "medium",
      solution:
        "import { useMemo } from 'react';\n\nfunction SortableList({ numbers, sortOrder }) {\n  const sorted = useMemo(() =&gt; {\n    const copy = [...numbers];\n    \n    if (sortOrder === 'asc') {\n      return copy.sort((a, b) =&gt; a - b);\n    } else {\n      return copy.sort((a, b) =&gt; b - a);\n    }\n  }, [numbers, sortOrder]);\n  \n  return (\n    &lt;ul&gt;\n      {sorted.map((n, i) =&gt; (\n        &lt;li key={i}&gt;{n}&lt;/li&gt;\n      ))}\n    &lt;/ul&gt;\n  );\n}",
    },
  ],
};