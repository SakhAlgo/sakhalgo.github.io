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
    this._filter = "all";
  }

  /* ══════════════════════════════════════════
       INIT
    ══════════════════════════════════════════ */

  async init() {
    this.renderTaskList();
    this.updateGlobalProgress();
    this.bindUI();
    this.preview.clearUser();

    // Восстановить последнее задание или загрузить первое
    const lastId = localStorage.getItem("educode_last_task");
    if (lastId) {
      await this.loadTask(lastId);
    } else {
      // Загрузить первое задание по умолчанию
      const firstTask = this.manifest[0];
      if (firstTask) {
        await this.loadTask(firstTask.id);
      }
    }
  }

  /* ══════════════════════════════════════════
       TASK LOADING
    ══════════════════════════════════════════ */

  async loadTask(taskId) {
    const taskInfo = this.manifest.find((t) => t.id === taskId);
    if (!taskInfo) return;

    // Скрыть приветственный экран
    const welcomeScreen = document.getElementById("welcomeScreen");
    if (welcomeScreen) welcomeScreen.classList.add("hidden");

    // Загрузить конфиг
    let config = {};
    try {
      const r = await fetch(`${taskInfo.taskPath}task.json`);
      config = await r.json();
    } catch (e) {
      this.toast("Не удалось загрузить задание", "error");
      return;
    }

    // Загрузить эталонные файлы
    let samples = { html: "", css: "", js: "" };
    try {
      samples = await this._loadSamples(taskInfo.taskPath, config);
    } catch (e) {
      console.warn("Samples load failed:", e);
    }

    // Загрузить валидатор
    let ValidatorClass;
    try {
      const mod = await import(`../tasks/${taskInfo.validator}`);
      ValidatorClass = mod.default;
    } catch (e) {
      this.toast("Ошибка загрузки валидатора", "error");
      return;
    }

    // Восстановить код пользователя или взять шаблон
    const savedCode = StorageManager.loadCode(taskId);
    const userCode = savedCode || this._getStarterCode(taskInfo.id, config);

    this.currentTask = {
      ...taskInfo,
      config,
      samples,
      validator: new ValidatorClass(),
      passThreshold: config.passThreshold || 70,
    };

    this.editor.setAll(userCode.html, userCode.css, userCode.js);
    this.editor.switchTab("html"); // Принудительно переключаем на HTML

    // Очистить превью если нет сохранённого кода (первое открытие)
    if (!savedCode) {
      this.preview.clearUser();
    }

    this._renderSample();
    this._updateTaskHeader(taskInfo, config);

    localStorage.setItem("educode_last_task", taskId);
    this.setStatus("Задание загружено. Ctrl+Enter — запустить", "info");

    // Авто-запуск если был сохранён код
    if (savedCode) this.runCode();
  }

  async _loadSamples(taskPath, config) {
    const [html, css, js] = await Promise.all([
      fetch(`${taskPath}${config.sampleFiles?.html || "sample.html"}`)
        .then((r) => r.text())
        .catch(() => ""),
      fetch(`${taskPath}${config.sampleFiles?.css || "sample.css"}`)
        .then((r) => r.text())
        .catch(() => ""),
      fetch(`${taskPath}${config.sampleFiles?.js || "sample.js"}`)
        .then((r) => r.text())
        .catch(() => ""),
    ]);
    return { html, css, js };
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
        css: `body {\n  display: flex;\n  /* Центрирование */\n}\n\n.profile-card {\n  /* Стили карточки */\n}`,
        js: ``,
      },
      "002": {
        html: baseHtmlTemplate,
        css: `.calculator {\n  /* Стили калькулятора */\n}`,
        js: `// Логика калькулятора\n`,
      },
      "003": {
        html: baseHtmlTemplate,
        css: `body {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\n.btn {\n  /* Стили кнопки */\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n\n.btn:hover {\n  /* Hover-состояние */\n}`,
        js: ``,
      },
      "004": {
        html: baseHtmlTemplate,
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
    const { html, css, js } = this._getEditorCode();
    this.preview.renderUser(html, css, js);
    StorageManager.saveCode(this.currentTask.id, html, css, js);
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

    const { html, css, js } = this._getEditorCode();
    this.runCode();

    try {
      // Ждём рендера
      await new Promise((r) => setTimeout(r, 300));

      const result = await this.currentTask.validator.validate(
        html,
        css,
        js,
        this.currentTask.samples,
        this.currentTask.config,
      );

      this._showCheckResults(result);

      if (result.passed) {
        StorageManager.markCompleted(this.currentTask.id, result.score, {
          html,
          css,
          js,
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
    };
  }

  /* ══════════════════════════════════════════
       UI RENDERING
    ══════════════════════════════════════════ */

  _groupTasksByTopic(tasks = this.manifest) {
    const topics = {};
    tasks.forEach(task => {
      if (!topics[task.topic]) {
        topics[task.topic] = [];
      }
      topics[task.topic].push(task);
    });
    // Сортируем задачи внутри темы по topicOrder или id
    Object.keys(topics).forEach(topic => {
      topics[topic].sort((a, b) => (a.topicOrder || parseInt(a.id)) - (b.topicOrder || parseInt(b.id)));
    });
    return topics;
  }

  renderTaskList() {
    const container = document.getElementById("taskList");
    if (!container) return;

    let renderedContent = "";
    let topics = this._groupTasksByTopic();

    if (this._filter === "all") {
      // Показываем все темы
      Object.keys(topics).forEach(topic => {
        renderedContent += this._renderTopic(topic, topics[topic]);
      });
    } else if (this._filter.startsWith("course-")) {
      // Показываем темы из конкретного курса
      const courseId = this._filter.replace("course-", "");
      const course = coursesManifest.find(c => c.id === courseId);
      if (course) {
        const courseTaskIds = new Set(course.modules.flatMap((module) => module.tasks));
        const courseTasks = this.manifest.filter((task) => courseTaskIds.has(task.id));
        topics = this._groupTasksByTopic(courseTasks);

        Object.keys(topics).forEach(topic => {
          renderedContent += this._renderTopic(topic, topics[topic]);
        });
      }
    }

    container.innerHTML = renderedContent || '<div class="task-list-loading"><span>Нет заданий</span></div>';

    // Навешиваем обработчики кликов
    container.querySelectorAll(".task-card").forEach((el) => {
      const handler = () => this.loadTask(el.dataset.id);
      el.addEventListener("click", handler);
      el.addEventListener("keydown", (e) => e.key === "Enter" && handler());
    });
  }

  _renderTopic(topic, tasks) {
    const completedInTopic = tasks.filter(t => this.progress[t.id]?.completed).length;
    const totalInTopic = tasks.length;
    const isActiveTopic = tasks.some(t => this.currentTask?.id === t.id);

    let html = `
      <div class="topic-section ${isActiveTopic ? 'active' : ''}">
        <div class="topic-header">
          <span class="topic-title">${this._formatTopicTitle(topic)}</span>
          <span class="topic-count">${completedInTopic}/${totalInTopic}</span>
        </div>
        <div class="topic-tasks">
    `;

    tasks.forEach(task => {
      const prog = this.progress[task.id];
      const isCompleted = prog?.completed;
      const isActive = this.currentTask?.id === task.id;
      const diffInfo = DIFFICULTY_MAP[task.difficulty] || DIFFICULTY_MAP.easy;

      html += `
        <div class="task-card ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}"
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
      'headings': 'Заголовки страницы',
      'text-formatting': 'Форматирование текста',
      'lists': 'Списки',
      'media': 'Медиа элементы',
      'css-colors': 'Цвета в CSS',
      'css-dimensions': 'Размеры элементов',
      'css-spacing': 'Отступы и границы',
      'css-font': 'Шрифты',
      'css-font-size': 'Размер шрифта',
      'css-text-align': 'Выравнивание текста',
      'css-opacity': 'Прозрачность',
      'css-shadow': 'Тень блока',
      'js-variables': 'Переменные и типы',
      'js-number-type': 'Тип number',
      'js-to-string': 'Преобразование в строку',
      'js-to-number': 'Преобразование в число',
      'js-template-string': 'Шаблонные строки',
      'js-functions': 'Функции',
    };
    return titles[topic] || topic.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  updateGlobalProgress() {
    const stats = StorageManager.getOverallStats(this.manifest.length);
    const fill = document.getElementById("globalProgress");
    const text = document.getElementById("progressText");
    const statP = document.getElementById("statPercent");
    const statPts = document.getElementById("statPoints");

    if (fill) fill.style.width = `${stats.percent}%`;
    if (text) text.textContent = `${stats.completed} / ${stats.total}`;
    if (statP) statP.textContent = stats.percent;
    if (statPts) {
      const pts = Object.values(this.progress)
        .filter((p) => p.completed)
        .reduce((sum, p) => {
          const task = this.manifest.find((t) => this.progress[t.id] === p);
          return sum + (task?.points || 0);
        }, 0);
      statPts.textContent = pts;
    }
  }

  _updateTaskHeader(taskInfo, config) {
    const badge = document.getElementById("taskIdBadge");
    const title = document.getElementById("taskTitle");
    const tags = document.getElementById("taskTags");
    const reqs = document.getElementById("taskRequirements");
    const score = document.getElementById("taskScore");

    if (badge) badge.textContent = `#${taskInfo.id}`;
    if (title)
      title.innerHTML = `${config.title || taskInfo.title} <span class="task-id-suffix">(#${taskInfo.id})</span>`;
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
    const { html, css, js } = this.currentTask.samples;
    this.preview.renderSample(html, css, js);
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

    // Close results
    document.getElementById("closeResults")?.addEventListener("click", () => {
      document.getElementById("checkResults").style.display = "none";
    });

    // Filters
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".filter-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this._filter = btn.dataset.filter;
        this.renderTaskList();
      });
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
}
