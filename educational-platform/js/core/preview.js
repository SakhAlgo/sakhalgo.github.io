/**
 * PreviewManager — управление iframe-превью
 * Безопасный рендер HTML/CSS/JS пользователя и эталона
 */
export class PreviewManager {
    constructor(sampleFrameId, userFrameId) {
        this.sampleFrame = document.getElementById(sampleFrameId);
        this.userFrame   = document.getElementById(userFrameId);
        this._debounceTimer = null;
    }

    /**
     * Рендер эталонного решения
     */
    renderSample(html, css, js) {
        this._render(this.sampleFrame, html, css, js);
    }

    /**
     * Рендер кода пользователя
     */
    renderUser(html, css, js) {
        this._render(this.userFrame, html, css, js);
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
        this._render(this.userFrame, '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#8b949e;font-family:monospace;font-size:13px;">Нажмите ▶ Запустить</div>', '', '');
    }

    /**
     * Безопасный рендер в iframe через Blob URL
     */
    _render(frame, html, css, js) {
        if (!frame) return;

        const doc = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; }
  ${css}
</style>
</head>
<body>
  ${html}
  <script>
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
            const blob = new Blob([doc], { type: 'text/html' });
            const url  = URL.createObjectURL(blob);
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
        const overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        overlay.innerHTML = `
            <div class="fullscreen-header">
                <span>${title}</span>
                <button class="btn-sm" id="closeFullscreen">✕ Закрыть</button>
            </div>
            <iframe id="fullFrame" style="flex:1;width:100%;background:#fff" sandbox="allow-scripts"></iframe>
        `;
        document.body.appendChild(overlay);

        // Копируем src
        const fullFrame = overlay.querySelector('#fullFrame');
        fullFrame.src   = frame.src;

        overlay.querySelector('#closeFullscreen').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });

        document.addEventListener('keydown', function esc(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', esc);
            }
        });
    }
}
