/**
 * PreviewManager — управление iframe-превью
 * Безопасный рендер HTML/CSS/JS пользователя и эталона
 */
export class PreviewManager {
  static _skulptSrc = null;
  static _stdlibSrc = null;
  static _skulptLoading = null;

  constructor(sampleFrameId, userFrameId) {
    this.sampleFrame = document.getElementById(sampleFrameId);
    this.userFrame = document.getElementById(userFrameId);
    this._debounceTimer = null;
  }

  /**
   * Загрузить Skulpt скрипты один раз (вызвать при старте приложения)
   */
  static loadSkulpt() {
    if (PreviewManager._skulptLoading) return PreviewManager._skulptLoading;
    PreviewManager._skulptLoading = Promise.all([
      fetch("https://skulpt.org/js/skulpt.min.js")
        .then((r) => r.text())
        .catch(() => ""),
      fetch("https://skulpt.org/js/skulpt-stdlib.js")
        .then((r) => r.text())
        .catch(() => ""),
    ]).then(([skulpt, stdlib]) => {
      PreviewManager._skulptSrc = skulpt;
      PreviewManager._stdlibSrc = stdlib;
    });
    return PreviewManager._skulptLoading;
  }

  /**
   * Рендер эталонного решения
   * Если передан py (Python-код), рендерит результат его выполнения
   */
  renderSample(html, css, js, py = '') {
    if (py) {
      this._renderPythonInFrame(this.sampleFrame, py);
    } else {
      this._render(this.sampleFrame, html, css, js, false);
    }
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
      true,
    );
  }

  /**
   * Рендер Python-кода через Skulpt в указанный iframe
   * Используем srcdoc + parent.Sk (Skulpt уже загружен на главной странице)
   * iFrame должен иметь sandbox="allow-scripts allow-modals allow-same-origin"
   */
  _renderPythonInFrame(frame, pyCode) {
    if (!frame) return;

    // Кодируем Python-код в base64 для безопасной передачи
    const encodedCode = btoa(unescape(encodeURIComponent(pyCode)));

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
  #pyOutput {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    line-height: 1.6;
    white-space: pre-wrap;
    color: #c9d1d9;
  }
  #pyOutput .stderr {
    color: #f85149;
  }
  #pyOutput .stdout {
    color: #c9d1d9;
  }
  #pyStatus {
    font-family: monospace;
    font-size: 11px;
    color: #8b949e;
    margin-bottom: 8px;
  }
  .error-line {
    color: #f85149;
    font-weight: bold;
  }
</style>
</head>
<body>
  <div id="pyOutput"></div>
  <script>
    // Skulpt загружается из родительского окна (index.html)
    var Sk = parent.Sk;
    var output = document.getElementById('pyOutput');
    var status = document.getElementById('pyStatus');
    var pyBase64 = '${encodedCode}';
    var pyCode = decodeURIComponent(escape(atob(pyBase64)));

    function runSkulpt() {
      if (typeof Sk === 'undefined') {
        status.textContent = '❌ Skulpt не загружен';
        output.innerHTML = '<div class="error-line">Ошибка: Skulpt (интерпретатор Python) не загружен на главной странице.</div>';
        return;
      }

      Sk.configure({
        output: function(text) {
          var line = document.createElement('div');
          line.className = 'stdout';
          line.textContent = text;
          output.appendChild(line);
          output.scrollTop = output.scrollHeight;
        },
        read: function(x) {
          if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) {
            throw "File not found: '" + x + "'";
          }
          return Sk.builtinFiles.files[x];
        }
      });

      Sk.misceval.asyncToPromise(function() {
        return Sk.importMainWithBody("<stdin>", false, pyCode, true);
      }).then(function() {
        status.textContent = '✅ Выполнено успешно';
      }, function(err) {
        var errDiv = document.createElement('div');
        errDiv.className = 'stderr';
        errDiv.textContent = '✗ ' + (err.toString() || 'Ошибка выполнения');
        output.appendChild(errDiv);
        status.textContent = '❌ Ошибка выполнения';
        console.error(err);
      });
    }

    runSkulpt();
  <\/script>
</body>
</html>`;

    frame.srcdoc = doc;
  }

  /**
   * Рендер Python-кода через Skulpt в окно пользователя
   */
  async renderPython(pyCode) {
    this._renderPythonInFrame(this.userFrame, pyCode);
  }

  /**
   * Безопасный рендер в iframe через Blob URL
   */
  _render(frame, html, css, js, showConsole = false) {
    if (!frame) return;

    const consoleCode = showConsole
      ? `
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
`
      : "";

    const consoleOutputDiv = showConsole
      ? '<div id="consoleOutput"></div>'
      : "";

    const consoleScript = showConsole
      ? `
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
`
      : "";

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
