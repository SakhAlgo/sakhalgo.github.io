/**
 * PreviewManager — управление iframe-превью
 * Безопасный рендер HTML/CSS/JS пользователя и эталона
 */
export class PreviewManager {
  constructor(sampleFrameId, userFrameId) {
    this.sampleFrame = document.getElementById(sampleFrameId);
    this.userFrame = document.getElementById(userFrameId);
    this._debounceTimer = null;
  }

  /**
   * Рендер эталонного решения
   */
  renderSample(html, css, js) {
    this._render(this.sampleFrame, html, css, js, false);
  }

  /**
   * Рендер кода пользователя
   */
  renderUser(html, css, js) {
    this._render(this.userFrame, html, css, js, true);
  }

  /**
   * Рендер с debounce (для авто-запуска)
   */
  renderUserDebounced(html, css, js, delay = 800) {
    clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(() => {
      this.renderUser(html, css, js);
    }, delay);
  }

  /**
   * Очистить превью пользователя
   */
  clearUser() {
    this._render(
      this.userFrame,
      '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#0d1117;color:#8b949e;font-family:monospace;font-size:13px;">Нажмите ▶ Запустить</div>',
      "",
      "",
      true
    );
  }

  /**
   * Безопасный рендер в iframe через Blob URL
   */
  _render(frame, html, css, js, showConsole = false) {
    if (!frame) return;

    const consoleCode = showConsole ? `
  /* Стили для консольного вывода */
  #consoleOutput {
    font-family: monospace;
    padding: 10px;
    color: #58a6ff;
  }

  .console-log {
    margin: 2px 0;
    padding: 2px 0;
  }

  .console-error {
    color: #f85149;
  }

  .console-warn {
    color: #ffa657;
  }

  .console-info {
    color: #79c0ff;
  }
` : '';

    const consoleOutputDiv = showConsole ? '<div id="consoleOutput"></div>' : '';

    const consoleScript = showConsole ? `
    // Перехватываем консольные методы
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    };

    const consoleOutput = document.getElementById('consoleOutput');

    function addConsoleMessage(type, ...args) {
      const message = args.map(arg => {
        if (arg === null) return 'null';
        if (arg === undefined) return 'undefined';
        if (typeof arg === 'object') {
          try { return JSON.stringify(arg); } catch { return '[Object]'; }
        }
        return String(arg);
      }).join(' ');

      const messageElement = document.createElement('div');
      messageElement.className = 'console-log console-' + type;
      messageElement.textContent = message;
      consoleOutput.appendChild(messageElement);

      // Прокрутка вниз
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    console.log = function(...args) {
      addConsoleMessage('log', ...args);
      originalConsole.log.apply(console, args);
    };

    console.error = function(...args) {
      addConsoleMessage('error', ...args);
      originalConsole.error.apply(console, args);
    };

    console.warn = function(...args) {
      addConsoleMessage('warn', ...args);
      originalConsole.warn.apply(console, args);
    };

    console.info = function(...args) {
      addConsoleMessage('info', ...args);
      originalConsole.info.apply(console, args);
    };
` : '';

    const doc = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { box-sizing: border-box; }
  html { background: #0d1117; }
  body {
    margin: 0;
    padding: 16px;
    background: #0d1117;
    color: #c9d1d9;
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.5;
  }
  ${css}
  ${consoleCode}
</style>
</head>
<body>
  ${html}
  ${consoleOutputDiv}
  <script>
    ${consoleScript}
    // Перехватываем ошибки
    window.onerror = function(msg, src, line) {
      console.error('[Preview] ' + msg + ' at line ' + line);
      return true;
    };
    try {
      ${js}
    } catch(e) {
      console.error('[Preview JS Error]', e.message);
    }
  <\/script>
</body>
</html>`;

    try {
      const blob = new Blob([doc], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const oldUrl = frame._blobUrl;
      frame.src = url;
      frame._blobUrl = url;
      if (oldUrl) setTimeout(() => URL.revokeObjectURL(oldUrl), 1000);
    } catch (e) {
      // Fallback: srcdoc
      frame.srcdoc = doc;
    }
  }

  /**
   * Открыть iframe в полноэкранном режиме
   */
  openFullscreen(frame, title) {
    const overlay = document.createElement("div");
    overlay.className = "fullscreen-overlay";
    overlay.innerHTML = `
            <div class="fullscreen-header">
                <span>${title}</span>
                <button class="btn-sm" id="closeFullscreen">✕ Закрыть</button>
            </div>
            <iframe id="fullFrame" style="flex:1;width:100%;background:#0d1117;border:none;" sandbox="allow-scripts allow-modals"></iframe>
        `;
    document.body.appendChild(overlay);

    // Копируем src
    const fullFrame = overlay.querySelector("#fullFrame");
    fullFrame.src = frame.src;

    overlay.querySelector("#closeFullscreen").addEventListener("click", () => {
      document.body.removeChild(overlay);
    });

    document.addEventListener("keydown", function esc(e) {
      if (e.key === "Escape") {
        overlay.remove();
        document.removeEventListener("keydown", esc);
      }
    });
  }
}