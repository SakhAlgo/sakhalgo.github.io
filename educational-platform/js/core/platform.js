import {
  tasksManifest,
  coursesManifest,
  DIFFICULTY_MAP,
} from "../tasks/task-manifest.js";
import { StorageManager } from "./storage.js";
import { PreviewManager } from "./preview.js";
import { EditorManager } from "./editor.js";

/**
 * EducationalPlatform — главное ядро платформы
 */
export class EducationalPlatform {
  constructor() {
    this.manifest = tasksManifest;
    this.progress = StorageManager.load();
    this.currentTask = null;
    this.editor = new EditorManager();
    this.preview = new PreviewManager("sampleFrame", "userFrame");
    this._filter = "";
    this._welcomeTimeout = null;
  }

  /* ══════════════════════════════════════════
       INIT
    ══════════════════════════════════════════ */

  async init() {
    this._filter = localStorage.getItem("educode_selected_course") || "";
    this._renderCourseSelect();
    this.renderTaskList();
    this.updateGlobalProgress();
    this.bindUI();
    this.preview.clearUser();

    if (this._filter === "standalone-react-basics") {
      // Если выбран standalone React курс — открываем iframe
      const welcomeScreen = document.getElementById("welcomeScreen");
      if (welcomeScreen) welcomeScreen.classList.add("hidden");
      this._openEmbeddedCourse("courses/react-basics/index.html");
    } else if (this._filter === "standalone-roblox-studio") {
      // Если выбран standalone Roblox Studio курс — открываем iframe
      const welcomeScreen = document.getElementById("welcomeScreen");
      if (welcomeScreen) welcomeScreen.classList.add("hidden");
      this._openEmbeddedCourse("courses/roblox-studio/index.html");
    } else {
      if (this._filter) {
        const welcomeScreen = document.getElementById("welcomeScreen");
        if (welcomeScreen) welcomeScreen.classList.add("hidden");
      }

      // Восстановить последнее задание или загрузить первое
      const lastId = localStorage.getItem("educode_last_task");
      if (lastId && this._filter && this._filter.startsWith("course-")) {
        // Только если lastId принадлежит текущему курсу
        const courseId = this._filter.replace("course-", "");
        const taskInfo = this.manifest.find((t) => t.id === lastId);
        if (taskInfo && taskInfo.courseId === courseId) {
          await this.loadTask(lastId);
          return;
        }
      }

      // Если выбран курс, загрузить первое задание этого курса
      let firstTask;
      if (this._filter && this._filter.startsWith("course-")) {
        const courseId = this._filter.replace("course-", "");
        firstTask = this.manifest.find((t) => t.courseId === courseId);
      }
      if (!firstTask) {
        firstTask = this.manifest[0];
      }
      if (firstTask) {
        await this.loadTask(firstTask.id);
      }
    }
  }

  /* ══════════════════════════════════════════
       TASK LOADING
    ══════════════════════════════════════════ */

  _getCourseDir(courseId) {
    return courseId === "html-css-basics"
      ? "html-css-basics"
      : courseId === "html-css-basics-2"
        ? "html-css-basics-2"
        : courseId === "html-css-basics-3"
          ? "html-css-basics-3"
          : courseId === "js-basics"
            ? "js-basics"
            : courseId === "python-basics"
              ? "python-basics"
              : "";
  }

  async loadTask(taskId) {
    const taskInfo = this.manifest.find((t) => t.id === taskId);
    if (!taskInfo) return;

    // Скрыть приветственный экран через 3 секунды
    const welcomeScreen = document.getElementById("welcomeScreen");
    if (welcomeScreen && !welcomeScreen.classList.contains("hidden")) {
      clearTimeout(this._welcomeTimeout);
      this._welcomeTimeout = setTimeout(() => {
        welcomeScreen.classList.add("hidden");
      }, 3000);
    }

    const courseDir = this._getCourseDir(taskInfo.courseId);
    const taskUrlPrefix = courseDir
      ? `courses/${courseDir}/${taskInfo.taskPath}`
      : taskInfo.taskPath;

    // Загрузить конфиг
    let config = {};
    try {
      const r = await fetch(`${taskUrlPrefix}task.json`);
      config = await r.json();
    } catch (e) {
      this.toast("Не удалось загрузить задание", "error");
      return;
    }

    // Загрузить эталонные файлы
    let samples = { html: "", css: "", js: "", py: "" };
    try {
      samples = await this._loadSamples(taskUrlPrefix, config);
    } catch (e) {
      console.warn("Samples load failed:", e);
    }

    // Загрузить валидатор
    let ValidatorClass;
    try {
      const mod = await import(
        `../../courses/${courseDir}/validators/${taskInfo.validator}`
      );
      ValidatorClass = mod.default;
    } catch (e) {
      this.toast("Ошибка загрузки валидатора", "error");
      return;
    }

    // Восстановить код пользователя или взять шаблон
    const isPythonCourse = taskInfo.courseId === "python-basics";
    const savedCode = StorageManager.loadCode(taskId);
    let userCode;
    if (savedCode) {
      userCode = savedCode;
    } else if (isPythonCourse) {
      // Для Python-задач редактор пустой — ученик пишет код сам
      userCode = { html: "", css: "", js: "", py: "" };
    } else {
      userCode = this._getStarterCode(taskInfo.id, config);
    }

    this.currentTask = {
      ...taskInfo,
      config,
      samples,
      validator: new ValidatorClass(),
      passThreshold: config.passThreshold || 80,
    };

    this.renderTaskList();

    // Показываем нужные вкладки в зависимости от курса
    this.editor.setMode(isPythonCourse ? "python" : "web");

    this.editor.setAll(
      userCode.html,
      userCode.css,
      userCode.js,
      userCode.py || "",
    );
    // setMode() уже переключает активную вкладку, но для web-курсов
    // по умолчанию показываем HTML
    if (!isPythonCourse && this.editor.activeTab !== "html") {
      this.editor.switchTab("html");
    }

    // Очистить превью если нет сохранённого кода (первое открытие)
    if (!savedCode) {
      this.preview.clearUser();
    }

    this._renderSample();
    // Для Python-задач сразу запускаем эталон (результат sample.py)
    if (isPythonCourse && samples.py) {
      this.preview.renderSample("", "", "", samples.py);
    }
    this._updateTaskHeader(taskInfo, config);

    localStorage.setItem("educode_last_task", taskId);
    this.setStatus("Задание загружено. Ctrl+Enter — запустить", "info");

    // Авто-запуск если был сохранён код
    if (savedCode) this.runCode();
  }

  async _loadSamples(taskPath, config) {
    const sampleFiles = config.sampleFiles || {};
    const fetchFile = (filename) => {
      if (!filename) return Promise.resolve("");
      return fetch(`${taskPath}${filename}`)
        .then((r) => r.text())
        .catch(() => "");
    };
    const [html, css, js, py] = await Promise.all([
      fetchFile(sampleFiles.html),
      fetchFile(sampleFiles.css),
      fetchFile(sampleFiles.js),
      fetchFile(sampleFiles.py),
    ]);
    return { html, css, js, py };
  }

  _getStarterCode(taskId, config) {
    // Базовый HTML шаблон для всех заданий
    const baseHtmlTemplate = `<!doctype html>
<html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  </head>
    <body>
      <!-- Введите html код здесь -->
      
    </body>
</html>`;

    // Шаблоны-заглушки для каждого задания
    const starters = {
      "001": {
        html: baseHtmlTemplate,
        css: ``,
        js: ``,
      },
      "002": {
        html: baseHtmlTemplate,
        css: ``,
        js: ``,
      },
      "003": {
        html: baseHtmlTemplate,
        css: ``,
        js: ``,
      },
      "004": {
        html: baseHtmlTemplate,
        css: ``,
        js: ``,
      },
      "043": {
        html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Исправить селектор</title>
</head>
<body>
  <p class="highlight">Текст с классом highlight</p>
  <p>Обычный текст</p>
  <span class="highlight">Это тоже highlight</span>
</body>
</html>`,
        css: `/* Задача: Исправить селектор для класса highlight
   Текущий селектор неправильный (без точки)
   Исправьте его на правильный */

highlight {
  color: #d29922;
  font-weight: bold;
}`,
        js: ``,
      },
      "044": {
        html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Дописать селектор</title>
</head>
<body>
  <button class="button">Нажми меня</button><br><br>
  <a class="button">Ссылка как кнопка</a><br><br>
  <button>Обычная кнопка</button><br>
</body>
</html>`,
        css: `/* Задача: Дописать селектор для класса button
   Нужно выбрать все элементы с классом button
   Дополните селектор */

 {
  background: #3fb950;
  color: white;
  padding: 10px 15px;
  margin: 5px;
}`,
        js: ``,
      },
      "045": {
        html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Выбрать селектор</title>
</head>
<body>
  <p>Первый абзац текста</p>
  <p>Второй абзац текста</p>
  <div>Это не абзац</div>
  <p>Третий абзац текста</p>
</body>
</html>`,
        css: `/* Задача: Выбрать все абзацы (теги p) на странице
   Напишите селектор для всех элементов p */

 {
  line-height: 1.6;
  color: #333;
}`,
        js: ``,
      },
      "085": {
        html: `
<!doctype html>
<html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  </head>
    <body>
      <p id="main" class="text">Какого цвета этот текст?</p>
    </body>
</html>`,
        css: ``,
        js: ``,
      },
      "086": {
        html: `
<!doctype html>
<html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  </head>
    <body>
      <div>
          <p>Наследованный стиль</p>
      </div>
    </body>
</html>`,
        css: ``,
        js: ``,
      },
    };

    // Возвращаем шаблон для конкретного задания или базовый шаблон
    const starter = starters[taskId];
    if (starter) {
      return starter;
    }

    // Для всех остальных заданий возвращаем базовый HTML шаблон
    return {
      html: baseHtmlTemplate,
      css: "",
      js: "",
    };
  }

  /* ══════════════════════════════════════════
       RUN & CHECK
    ══════════════════════════════════════════ */

  runCode() {
    if (!this.currentTask) return;
    const code = this._getEditorCode();
    const isPython = this.currentTask.courseId === "python-basics";
    if (isPython) {
      this.preview.renderPython(code.py);
    } else {
      this.preview.renderUser(code.html, code.css, code.js);
    }
    StorageManager.saveCode(
      this.currentTask.id,
      code.html,
      code.css,
      code.js,
      code.py,
    );
    this.setStatus("Код запущен", "success");
  }

  async checkSolution() {
    if (!this.currentTask) {
      this.toast("Выберите задание", "error");
      return;
    }

    const btn = document.getElementById("checkBtn");
    btn.disabled = true;
    btn.textContent = "⏳ Проверяю...";

    const code = this._getEditorCode();
    this.runCode();

    try {
      // Ждём рендера
      await new Promise((r) => setTimeout(r, 300));

      const isPython = this.currentTask.courseId === "python-basics";
      const result = await this.currentTask.validator.validate(
        isPython ? code.py : code.html,
        isPython ? "" : code.css,
        isPython ? "" : code.js,
        this.currentTask.samples,
        this.currentTask.config,
      );

      this._showCheckResults(result);

      if (result.passed) {
        StorageManager.markCompleted(this.currentTask.id, result.score, {
          html: code.html,
          css: code.css,
          js: code.js,
          py: code.py,
        });
        this.progress = StorageManager.load();
        this.updateGlobalProgress();
        this.renderTaskList();
        this.toast(
          `🎉 Отлично! Задание выполнено! Счёт: ${result.score}%`,
          "success",
        );
      } else {
        this.toast(
          `Ещё не так! Счёт: ${result.score}% (нужно ${this.currentTask.passThreshold}%)`,
          "error",
        );
      }
    } catch (e) {
      console.error("Validation error:", e);
      this.toast("Ошибка при проверке", "error");
    } finally {
      btn.disabled = false;
      btn.innerHTML = "<span>✓</span> Проверить";
    }
  }

  _getEditorCode() {
    return {
      html: this.editor.getHTML(),
      css: this.editor.getCSS(),
      js: this.editor.getJS(),
      py: this.editor.getPy(),
    };
  }

  /* ══════════════════════════════════════════
       UI RENDERING
    ══════════════════════════════════════════ */

  _groupTasksByTopic(tasks = this.manifest) {
    const topics = {};
    tasks.forEach((task) => {
      if (!topics[task.topic]) {
        topics[task.topic] = [];
      }
      topics[task.topic].push(task);
    });
    // Сортируем задачи внутри темы по topicOrder или id
    Object.keys(topics).forEach((topic) => {
      topics[topic].sort(
        (a, b) =>
          (a.topicOrder || parseInt(a.id)) - (b.topicOrder || parseInt(b.id)),
      );
    });
    return topics;
  }

  renderTaskList() {
    const container = document.getElementById("taskList");
    if (!container) return;

    let renderedContent = "";
    let topics = this._groupTasksByTopic();

    if (!this._filter) {
      container.innerHTML =
        '<div class="task-list-loading"><span>Выберите курс, чтобы увидеть задания</span></div>';
      return;
    }

    if (this._filter === "standalone-react-basics") {
      container.innerHTML = `
        <div class="task-list-loading" style="text-align:center;gap:8px;">
          <span style="font-size:1.5rem;">⚛️</span>
          <span>React. Теория и тесты</span>
          <span style="font-size:11px;color:var(--text-muted);">
            Курс выполняется в браузере<br>
          </span>
        </div>`;
      return;
    }

    if (this._filter === "standalone-roblox-studio") {
      container.innerHTML = `
        <div class="task-list-loading" style="text-align:center;gap:8px;">
          <span style="font-size:1.5rem;">🎮</span>
          <span>Roblox Studio. Теория и тесты</span>
          <span style="font-size:11px;color:var(--text-muted);">
            Курс выполняется в Roblox Studio<br>
          </span>
        </div>`;
      return;
    }

    if (this._filter.startsWith("course-")) {
      // Показываем темы из конкретного курса
      const courseId = this._filter.replace("course-", "");
      const course = coursesManifest.find((c) => c.id === courseId);
      if (course) {
        const courseTaskIds = new Set(
          course.modules.flatMap((module) => module.tasks),
        );
        const courseTasks = this.manifest.filter((task) =>
          courseTaskIds.has(task.id),
        );
        topics = this._groupTasksByTopic(courseTasks);
        const courseDir = this._getCourseDir(courseId);

        Object.keys(topics).forEach((topic) => {
          // Ищем модуль, в котором есть задача с данным топиком
          const module = course.modules.find((m) =>
            m.tasks.some((taskId) => {
              const task = this.manifest.find((t) => t.id === taskId);
              return task && task.topic === topic;
            }),
          );
          const theoryInfo = module?.theoryFile
            ? { theoryFile: module.theoryFile, courseDir }
            : null;
          renderedContent += this._renderTopic(
            topic,
            topics[topic],
            theoryInfo,
          );
        });
      }
    }

    container.innerHTML =
      renderedContent ||
      '<div class="task-list-loading"><span>Нет заданий</span></div>';

    // Навешиваем обработчики кликов
    container.querySelectorAll(".task-card").forEach((el) => {
      const handler = () => this.loadTask(el.dataset.id);
      el.addEventListener("click", handler);
      el.addEventListener("keydown", (e) => e.key === "Enter" && handler());
    });
  }

  _renderCourseSelect() {
    const select = document.getElementById("courseSelect");
    if (!select) return;

    select.innerHTML = `
      <option value="">Выберите курс</option>
      ${coursesManifest
        .map(
          (course) =>
            `<option value="course-${course.id}">${course.title}</option>`,
        )
        .join("")}
      <option value="standalone-react-basics">⚛️ React. Теория и тесты</option>
      <option value="standalone-roblox-studio">🎮 Roblox Studio. Теория и тесты</option>
    `;
    select.value = this._filter;
  }

  _renderTopic(topic, tasks, theoryInfo = null) {
    const completedInTopic = tasks.filter(
      (t) => this.progress[t.id]?.completed,
    ).length;
    const totalInTopic = tasks.length;
    const isActiveTopic = tasks.some((t) => this.currentTask?.id === t.id);

    let html = `
      <div class="topic-section ${isActiveTopic ? "active" : ""}">
        <div class="topic-header">
          <span class="topic-title">${this._formatTopicTitle(topic)}</span>
          <span class="topic-header-right">
            ${theoryInfo ? `<button class="theory-btn" data-theory-topic="${topic}" title="Открыть теорию">📖</button>` : ""}
            <span class="topic-count">${completedInTopic}/${totalInTopic}</span>
          </span>
        </div>
        <div class="topic-tasks">
    `;

    tasks.forEach((task) => {
      const prog = this.progress[task.id];
      const isCompleted = prog?.completed;
      const isActive = this.currentTask?.id === task.id;
      const diffInfo = DIFFICULTY_MAP[task.difficulty] || DIFFICULTY_MAP.easy;

      html += `
        <div class="task-card ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}"
             data-id="${task.id}" role="button" tabindex="0">
          <div class="task-card-inner">
            <div class="task-card-mark">?</div>
          </div>
        </div>
      `;
    });

    html += "</div></div>";
    return html;
  }

  _formatTopicTitle(topic) {
    // Преобразуем topic в читаемый заголовок
    const titles = {
      headings: "Заголовки страницы",
      "text-formatting": "Форматирование текста",
      lists: "Списки",
      borders: "Границы",
      forms: "Формы",
      comments: "Комментарии",
      structure: "Группировка элементов",
      tables: "Таблицы",
      media: "Медиа элементы",
      "css-colors": "Цвета в CSS",
      "css-dimensions": "Размеры элементов",
      "css-spacing": "Отступы и границы",
      "css-font": "Шрифты",
      "css-font-size": "Размер шрифта",
      "css-text-align": "Выравнивание текста",
      "css-opacity": "Прозрачность",
      "css-shadow": "Тень блока",
      "css-selectors": "Селекторы",
      "semantic-html": "Семантические теги",
      "css-specificity": "Специфичность селекторов",
      "css-inheritance": "Наследование свойств",
      "css-grouping": "Группировка селекторов",
      "css-pseudo-classes": "Псевдоклассы",
      "css-pseudo-elements": "Псевдоэлементы",
      "css-units": "Единицы измерения",
      "css-flexbox": "Flexbox",
      "js-variables": "Переменные и типы",
      "js-number-type": "Тип number",
      "js-to-string": "Преобразование в строку",
      "js-to-number": "Преобразование в число",
      "js-template-string": "Шаблонные строки",
      "js-functions": "Функции",
      "js-conditionals": "Ветвление",
      "js-arrays": "Массивы",
      "js-loops-for": "Цикл for",
      "js-loops-while": "Цикл while",
      "js-loops": "Циклы",
      "py-variables": "Переменные и типы",
      "py-data-types": "Типы данных",
      "py-strings": "Строки",
      "py-numbers": "Числа",
      "py-booleans": "Логический тип",
      "py-conversion": "Преобразование типов",
      "py-input-output": "Ввод и вывод",
      "py-functions": "Функции",
      "py-conditionals": "Ветвления",
      "py-loops": "Циклы",
      "py-lists": "Списки",
      "py-dicts": "Словари",
    };
    return (
      titles[topic] ||
      topic.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    );
  }

  updateGlobalProgress() {
    const stats = this._getSelectedCourseProgress();
    const fill = document.getElementById("globalProgress");
    const text = document.getElementById("progressText");
    const statP = document.getElementById("statPercent");
    const statPts = document.getElementById("statPoints");

    if (fill) fill.style.width = `${stats.percent}%`;
    if (text) text.textContent = `${stats.completed} / ${stats.total}`;
    if (statP) statP.textContent = stats.percent;
    if (statPts) {
      statPts.textContent = stats.points;
    }
  }

  _getSelectedCourseProgress() {
    // Для standalone-курсов прогресс не трогается
    if (
      !this._filter ||
      this._filter === "standalone-react-basics" ||
      this._filter === "standalone-roblox-studio"
    ) {
      return { completed: 0, total: 0, percent: 0, avgScore: 0, points: 0 };
    }

    if (!this._filter.startsWith("course-")) {
      return { completed: 0, total: 0, percent: 0, avgScore: 0, points: 0 };
    }

    const courseId = this._filter.replace("course-", "");
    const course = coursesManifest.find((c) => c.id === courseId);
    if (!course) {
      return { completed: 0, total: 0, percent: 0, avgScore: 0, points: 0 };
    }

    const taskIds = new Set(course.modules.flatMap((module) => module.tasks));
    const progressData = this.progress;
    const completedTasks = Array.from(taskIds).filter(
      (taskId) => progressData[taskId]?.completed,
    );

    const completed = completedTasks.length;
    const total = taskIds.size;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const points = completedTasks.reduce((sum, taskId) => {
      const task = this.manifest.find((t) => t.id === taskId);
      return sum + (task?.points || 0);
    }, 0);

    return {
      completed,
      total,
      percent,
      avgScore: 0,
      points,
    };
  }

  _updateTaskHeader(taskInfo, config) {
    const badge = document.getElementById("taskIdBadge");
    const title = document.getElementById("taskTitle");
    const tags = document.getElementById("taskTags");
    const reqs = document.getElementById("taskRequirements");
    const score = document.getElementById("taskScore");

    if (badge) badge.textContent = `#${taskInfo.id}`;
    if (title) title.innerHTML = `${config.title || taskInfo.title}`;
    if (tags)
      tags.innerHTML = (taskInfo.tags || [])
        .map((t) => `<span class="tag">${t}</span>`)
        .join("");

    if (reqs) {
      reqs.innerHTML = (config.requirements || [])
        .map(
          (r) =>
            `<div class="req-item"><span class="req-dot"></span>${r}</div>`,
        )
        .join("");
    }

    // Показать счёт если задание уже было выполнено
    const prog = this.progress[taskInfo.id];
    if (prog?.completed && score) {
      score.style.display = "";
      const scoreVal = document.getElementById("scoreValue");
      if (scoreVal) scoreVal.textContent = `${prog.score}%`;
    } else if (score) {
      score.style.display = "none";
    }
  }

  _renderSample() {
    if (!this.currentTask) return;
    const { html, css, js, py } = this.currentTask.samples;
    const isPython = this.currentTask.courseId === "python-basics";
    if (isPython && py) {
      this.preview.renderSample("", "", "", py);
    } else {
      this.preview.renderSample(html, css, js);
    }
  }

  _markActiveTask(taskId) {
    document.querySelectorAll(".task-item").forEach((el) => {
      el.classList.toggle("active", el.dataset.id === taskId);
    });
  }

  _markTaskCompleted(taskId) {
    const el = document.querySelector(`.task-item[data-id="${taskId}"]`);
    if (el) el.classList.add("completed");
  }

  _showCheckResults(result) {
    const panel = document.getElementById("checkResults");
    const body = document.getElementById("resultsBody");
    if (!panel || !body) return;

    const scoreColor = result.passed
      ? "var(--success)"
      : result.score >= 50
        ? "var(--warning)"
        : "var(--danger)";
    const circumference = 2 * Math.PI * 22;
    const offset = circumference - (result.score / 100) * circumference;

    body.innerHTML = `
            <div class="result-score">
                <div class="score-ring">
                    <svg width="52" height="52" viewBox="0 0 52 52">
                        <circle cx="26" cy="26" r="22" fill="none" stroke="var(--bg-overlay)" stroke-width="4"/>
                        <circle cx="26" cy="26" r="22" fill="none" stroke="${scoreColor}" stroke-width="4"
                            stroke-dasharray="${circumference}"
                            stroke-dashoffset="${offset}"
                            stroke-linecap="round"/>
                    </svg>
                    <div class="score-ring-text ${result.passed ? "pass" : "fail"}">${result.score}%</div>
                </div>
                <div class="score-details">
                    <h4>${result.passed ? "✅ Задание выполнено!" : "❌ Пока не засчитано"}</h4>
                    <p>${
                      result.passed
                        ? "Отличная работа! Можно переходить к следующему заданию."
                        : `Нужно набрать ${this.currentTask.passThreshold}%. Проверьте подсказки ниже.`
                    }</p>
                </div>
            </div>
            ${result.checks
              .map(
                (c) => `
                <div class="result-item ${c.passed ? "pass" : "fail"}" title="${!c.passed ? c.hint || "" : ""}">
                    ${c.passed ? "✓" : "✗"} ${c.label}
                </div>
            `,
              )
              .join("")}
        `;

    panel.style.display = "";
    panel.classList.add("fade-in");
  }

  /* ══════════════════════════════════════════
       UI BINDING
    ══════════════════════════════════════════ */

  bindUI() {
    // Run & Check
    document
      .getElementById("runBtn")
      ?.addEventListener("click", () => this.runCode());
    document
      .getElementById("checkBtn")
      ?.addEventListener("click", () => this.checkSolution());

    // Editor actions
    document
      .getElementById("formatBtn")
      ?.addEventListener("click", () => this.editor.formatActive());
    document.getElementById("clearBtn")?.addEventListener("click", () => {
      if (confirm("Очистить текущую вкладку?")) {
        const ed = this.editor.editors[this.editor.activeTab];
        if (ed) {
          ed.value = "";
          this.editor.updateLineNumbers();
        }
      }
    });
    document.getElementById("resetCodeBtn")?.addEventListener("click", () => {
      if (this.currentTask && confirm("Сбросить код к шаблону?")) {
        const starter = this._getStarterCode(
          this.currentTask.id,
          this.currentTask.config,
        );
        this.editor.setAll(starter.html, starter.css, starter.js);
      }
    });

    // Info toggle
    document.getElementById("infoToggle")?.addEventListener("click", () => {
      const desc = document.getElementById("taskDescription");
      if (desc)
        desc.style.display = desc.style.display === "none" ? "" : "none";
    });

    // Sample toggle
    document.getElementById("sampleToggle")?.addEventListener("click", () => {
      const panel = document.getElementById("samplePanel");
      if (!panel) return;

      const isHidden = panel.style.display === "none";
      panel.style.display = isHidden ? "flex" : "none";

      if (isHidden) {
        this._renderSample();
      }
    });

    // Fullscreen
    document
      .getElementById("fullscreenSample")
      ?.addEventListener("click", () => {
        this.preview.openFullscreen(
          document.getElementById("sampleFrame"),
          "🎯 Эталон",
        );
      });
    document.getElementById("fullscreenUser")?.addEventListener("click", () => {
      this.preview.openFullscreen(
        document.getElementById("userFrame"),
        "🖥️ Ваш результат",
      );
    });

    // Theory buttons
    document.getElementById("taskList")?.addEventListener("click", (e) => {
      const btn = e.target.closest(".theory-btn");
      if (!btn) return;
      const topic = btn.dataset.theoryTopic;
      if (!topic) return;
      this._openTheoryFullscreen(topic);
    });

    // Close results
    document.getElementById("closeResults")?.addEventListener("click", () => {
      document.getElementById("checkResults").style.display = "none";
    });

    // Course selector
    document
      .getElementById("courseSelect")
      ?.addEventListener("change", (event) => {
        const value = event.target.value;
        const welcomeScreen = document.getElementById("welcomeScreen");

        if (value === "standalone-react-basics") {
          // Standalone React курс
          this._filter = value;
          localStorage.setItem("educode_selected_course", value);
          if (welcomeScreen) welcomeScreen.classList.add("hidden");
          this._openEmbeddedCourse("courses/react-basics/index.html");
          this.renderTaskList();
          this.updateGlobalProgress();
        } else if (value === "standalone-roblox-studio") {
          // Standalone Roblox Studio курс
          this._filter = value;
          localStorage.setItem("educode_selected_course", value);
          if (welcomeScreen) welcomeScreen.classList.add("hidden");
          this._openEmbeddedCourse("courses/roblox-studio/index.html");
          this.renderTaskList();
          this.updateGlobalProgress();
        } else if (value) {
          // Обычный курс платформы
          this._filter = value;
          localStorage.setItem("educode_selected_course", value);
          if (welcomeScreen) welcomeScreen.classList.add("hidden");

          // Закрываем iframe, если был открыт standalone-курс
          this._closeEmbeddedCourse();

          const courseId = value.replace("course-", "");
          const firstTask = this.manifest.find((t) => t.courseId === courseId);
          if (firstTask) {
            this.loadTask(firstTask.id);
          }
        } else {
          this._filter = "";
          localStorage.removeItem("educode_selected_course");
          this._closeEmbeddedCourse();
          if (welcomeScreen) welcomeScreen.classList.remove("hidden");
        }
        this.renderTaskList();
        this.updateGlobalProgress();
      });

    // Sidebar toggle
    document.getElementById("sidebarToggle")?.addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("collapsed");
      const ws = document.getElementById("welcomeScreen");
      if (ws)
        ws.style.left = document
          .getElementById("sidebar")
          .classList.contains("collapsed")
          ? "52px"
          : "";
    });

    // Logo icon click to toggle sidebar (when collapsed)
    document.querySelector(".logo-icon")?.addEventListener("click", () => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar.classList.contains("collapsed")) {
        sidebar.classList.remove("collapsed");
        const ws = document.getElementById("welcomeScreen");
        if (ws) ws.style.left = "";
      }
    });

    // Export
    document.getElementById("exportBtn")?.addEventListener("click", () => {
      StorageManager.export(this.manifest);
      this.toast("Прогресс экспортирован", "success");
    });

    // Reset progress
    document.getElementById("resetBtn")?.addEventListener("click", () => {
      this.showConfirm(
        "Сбросить прогресс?",
        "Весь прогресс и сохранённый код будут удалены. Отменить нельзя.",
        () => {
          StorageManager.reset();
          this.progress = {};
          this.updateGlobalProgress();
          this.renderTaskList();
          this.toast("Прогресс сброшен", "info");
        },
      );
    });
  }

  /* ══════════════════════════════════════════
       HELPERS
    ══════════════════════════════════════════ */

  setStatus(msg, type = "info") {
    const el = document.getElementById("statusMsg");
    if (!el) return;
    el.textContent = msg;
    el.className = `status-msg ${type}`;
  }

  toast(msg, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("out");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Открыть теорию в полноэкранном режиме
   */
  _openTheoryFullscreen(topic) {
    const courseId = this._filter.replace("course-", "");
    const course = coursesManifest.find((c) => c.id === courseId);
    if (!course) return;

    // Ищем модуль, в котором есть задача с данным топиком
    const module = course.modules.find((m) =>
      m.tasks.some((taskId) => {
        const task = this.manifest.find((t) => t.id === taskId);
        return task && task.topic === topic;
      }),
    );
    if (!module || !module.theoryFile) return;

    const courseDir = this._getCourseDir(courseId);
    let theoryPath;
    if (module.theoryFile.startsWith("./")) {
      // У HTML/CSS курсов theoryFile уже содержит путь (./theory/...)
      theoryPath = `courses/${courseDir}/${module.theoryFile}`;
    } else if (courseId === "python-basics") {
      // У Python-курса файлы теории в подпапке theory/
      theoryPath = `courses/${courseDir}/theory/${module.theoryFile}`;
    } else {
      // У JS-курса файлы теории прямо в корне courses/js-basics/
      theoryPath = `courses/${courseDir}/${module.theoryFile}`;
    }

    const overlay = document.createElement("div");
    overlay.className = "fullscreen-overlay";
    overlay.innerHTML = `
      <div class="fullscreen-header">
        <button class="btn-sm" id="closeTheory">✕ Закрыть</button>
        <span>📖 Теория: ${module.title}</span>
      </div>
      <iframe src="${theoryPath}" style="flex:1;width:100%;background:#0d1117;border:none;"></iframe>
    `;
    document.body.appendChild(overlay);

    overlay.querySelector("#closeTheory").addEventListener("click", () => {
      overlay.remove();
    });

    const escHandler = (e) => {
      if (e.key === "Escape") {
        overlay.remove();
        document.removeEventListener("keydown", escHandler);
      }
    };
    document.addEventListener("keydown", escHandler);
  }

  showConfirm(title, text, onConfirm) {
    const overlay = document.getElementById("modalOverlay");
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalText").textContent = text;
    overlay.style.display = "flex";

    const confirm = () => {
      overlay.style.display = "none";
      onConfirm();
      cleanup();
    };
    const cancel = () => {
      overlay.style.display = "none";
      cleanup();
    };
    const cleanup = () => {
      document
        .getElementById("modalConfirm")
        .removeEventListener("click", confirm);
      document
        .getElementById("modalCancel")
        .removeEventListener("click", cancel);
    };

    document.getElementById("modalConfirm").addEventListener("click", confirm);
    document.getElementById("modalCancel").addEventListener("click", cancel);
    overlay.addEventListener(
      "click",
      (e) => {
        if (e.target === overlay) cancel();
      },
      { once: true },
    );
  }

  /* ══════════════════════════════════════════
       EMBEDDED COURSE (standalone SPA)
     ══════════════════════════════════════════ */

  /**
   * Открывает standalone-курс в iframe вместо редактора.
   * Скрывает шапку задания, рабочую область и приветствие.
   * @param {string} coursePath — путь к index.html курса (относительно корня)
   */
  _openEmbeddedCourse(coursePath) {
    const welcome = document.getElementById("welcomeScreen");
    const workspace = document.getElementById("workspace");
    const taskHeader = document.getElementById("taskHeader");
    const mainContent = document.getElementById("mainContent");

    // Скрываем шапку задания, рабочую область и приветствие
    if (welcome) welcome.classList.add("hidden");
    if (workspace) workspace.style.display = "none";
    if (taskHeader) taskHeader.style.display = "none";

    // Если контейнер курса уже существует — просто показываем его
    let container = document.getElementById("embeddedCourseContainer");
    if (container) {
      container.style.display = "";
      return;
    }

    // Определяем заголовок iframe на основе пути
    const frameTitle = coursePath.includes("roblox-studio")
      ? "🎮 Roblox Studio. Теория и тесты"
      : "⚛️ React. Теория и тесты";

    // Создаём контейнер курса
    container = document.createElement("div");
    container.id = "embeddedCourseContainer";
    container.className = "embedded-course";
    container.innerHTML = `
      <iframe
        src="${coursePath}"
        class="embedded-course-frame"
        sandbox="allow-scripts allow-modals allow-same-origin allow-forms"
        title="${frameTitle}"
      ></iframe>
    `;

    mainContent.appendChild(container);

    // Обработчик кнопки «Вернуться»
    document
      .getElementById("closeEmbeddedCourse")
      ?.addEventListener("click", () => this._closeEmbeddedCourse());
  }

  /**
   * Закрывает iframe курса и восстанавливает рабочую область.
   */
  _closeEmbeddedCourse() {
    const container = document.getElementById("embeddedCourseContainer");
    const workspace = document.getElementById("workspace");
    const taskHeader = document.getElementById("taskHeader");
    const welcome = document.getElementById("welcomeScreen");

    // Прячем контейнер курса
    if (container) container.style.display = "none";

    // Восстанавливаем шапку задания
    if (taskHeader) taskHeader.style.display = "";

    // Восстанавливаем рабочую область (если было открыто задание)
    if (this.currentTask && workspace) {
      workspace.style.display = "";
      this._updateTaskHeader(this.currentTask, this.currentTask.config);
      this._renderSample();
    } else {
      // Если не было открыто задание и курс не выбран — показываем приветствие
      if (welcome && !this._filter) {
        welcome.classList.remove("hidden");
      }
    }
  }
}
