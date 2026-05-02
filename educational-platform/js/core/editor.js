/**
 * EditorManager — управление редактором кода
 * Вкладки, нумерация строк, Tab-indent, автосохранение
 *
 * Режимы вкладок:
 * - 'web'   → показывать HTML, CSS, JS (для курсов HTML/CSS и JS)
 * - 'python' → показывать только Python (для курса Python)
 */
export class EditorManager {
    constructor() {
        this.editors = {
            html: document.getElementById('htmlEditor'),
            css:  document.getElementById('cssEditor'),
            js:   document.getElementById('jsEditor'),
            py:   document.getElementById('pyEditor')
        };
        this.lineNumbers  = document.getElementById('lineNumbers');
        this.tabs         = document.querySelectorAll('.tab-btn');
        this.activeTab    = 'html';
        this._changeCallbacks = [];
        this._autoSaveTimer   = null;
        this._currentMode     = 'web'; // 'web' | 'python'

    this._initTabs();
    this._initEditors();
    this._initKeyboardShortcuts();
    this.updateLineNumbers();
    // По умолчанию режим 'web' — показываем HTML/CSS/JS
    this.setMode('web');
    }

    /* ─── Режим (набор вкладок) ─── */

    /**
     * Установить режим редактора.
     * @param {'web'|'python'} mode
     *   - 'web'    – показать вкладки HTML, CSS, JS
     *   - 'python' – показать только вкладку Python
     */
    setMode(mode) {
        this._currentMode = mode;
        const tabs = mode === 'python' ? ['py'] : ['html', 'css', 'js'];
        this.showTabs(tabs);
    }

    /** @returns {'web'|'python'} */
    getMode() {
        return this._currentMode;
    }

    /* ─── Tabs ─── */

    _initTabs() {
        document.getElementById('editorTabs')?.addEventListener('click', e => {
            const btn = e.target.closest('.tab-btn');
            if (!btn) return;
            // Не переключаться на скрытую вкладку
            if (btn.style.display === 'none') return;
            this.switchTab(btn.dataset.tab);
        });
    }

    /**
     * Показать только указанные табы, остальные скрыть.
     * @param {string[]} tabs - массив имён табов, например ['html','css','js'] или ['py']
     */
    showTabs(tabs) {
        // Скрываем/показываем кнопки вкладок
        this.tabs.forEach(btn => {
            const name = btn.dataset.tab;
            const show = tabs.includes(name);
            btn.style.display = show ? '' : 'none';
            btn.classList.toggle('active', show && name === this.activeTab);
        });
        // Скрываем/показываем редакторы
        Object.entries(this.editors).forEach(([key, el]) => {
            const show = tabs.includes(key);
            el.classList.toggle('active', show && key === this.activeTab);
        });
        // Если активная вкладка теперь скрыта — переключиться на первую доступную
        if (!tabs.includes(this.activeTab)) {
            this.switchTab(tabs[0]);
        }
    }

    switchTab(tabName) {
        this.tabs.forEach(b => b.classList.toggle('active', b.dataset.tab === tabName));
        Object.entries(this.editors).forEach(([key, el]) => {
            el.classList.toggle('active', key === tabName);
        });
        this.activeTab = tabName;
        this.updateLineNumbers();
        this.editors[tabName]?.focus();
    }

    /* ─── Editor setup ─── */

    _initEditors() {
        Object.values(this.editors).forEach(editor => {
            if (!editor) return;

            // Tab key — вставляет 2 пробела
            editor.addEventListener('keydown', e => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    this._insertAtCursor(editor, '  ');
                }
                // Ctrl+Enter — запустить
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    document.getElementById('runBtn')?.click();
                }
                // Ctrl+Shift+Enter — проверить
                if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Enter') {
                    e.preventDefault();
                    document.getElementById('checkBtn')?.click();
                }
                // Auto-close brackets/quotes
                this._handleAutoPair(e, editor);
            });

            editor.addEventListener('input', () => {
                this.updateLineNumbers();
                this._notifyChange();
            });

            editor.addEventListener('scroll', () => {
                this.syncLineNumberScroll(editor);
            });
        });
    }

    _initKeyboardShortcuts() {
        document.addEventListener('keydown', e => {
            // Ctrl+1/2/3/4 — переключение вкладок
            if ((e.ctrlKey || e.metaKey) && ['1','2','3','4'].includes(e.key)) {
                const tabs = ['html', 'css', 'js', 'py'];
                const idx  = parseInt(e.key) - 1;
                if (tabs[idx]) { e.preventDefault(); this.switchTab(tabs[idx]); }
            }
        });
    }

    /* ─── Auto-pair brackets ─── */

    _handleAutoPair(e, editor) {
        const pairs = { '{': '}', '(': ')', '[': ']', '"': '"', "'": "'" };
        if (pairs[e.key] && e.key !== '"' && e.key !== "'") {
            e.preventDefault();
            const sel = { start: editor.selectionStart, end: editor.selectionEnd };
            const selected = editor.value.substring(sel.start, sel.end);
            this._insertAtCursor(editor, e.key + selected + pairs[e.key]);
            // Переместить курсор
            const pos = sel.start + 1 + (selected.length > 0 ? selected.length : 0);
            editor.selectionStart = editor.selectionEnd = selected.length > 0 ? pos + 1 : sel.start + 1;
        }
    }

    /* ─── Insert text at cursor ─── */

    _insertAtCursor(editor, text) {
        const start = editor.selectionStart;
        const end   = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + text + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + text.length;
        editor.dispatchEvent(new Event('input'));
    }

    /* ─── Line numbers ─── */

    updateLineNumbers() {
        const editor = this.editors[this.activeTab];
        if (!editor || !this.lineNumbers) return;

        const lines = editor.value.split('\n').length;
        this.lineNumbers.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
    }

    syncLineNumberScroll(editor) {
        if (this.lineNumbers) {
            this.lineNumbers.scrollTop = editor.scrollTop;
        }
    }

    /* ─── Get/Set values ─── */

    getHTML() { return this.editors.html?.value || ''; }
    getCSS()  { return this.editors.css?.value  || ''; }
    getJS()   { return this.editors.js?.value   || ''; }
    getPy()   { return this.editors.py?.value   || ''; }

    setHTML(val) { if (this.editors.html) { this.editors.html.value = val; this.updateLineNumbers(); } }
    setCSS(val)  { if (this.editors.css)  this.editors.css.value  = val; }
    setJS(val)   { if (this.editors.js)   this.editors.js.value   = val; }
    setPy(val)   { if (this.editors.py)   this.editors.py.value   = val; }

    setAll(html, css, js, py = '') {
        this.setHTML(html);
        this.setCSS(css);
        this.setJS(js);
        this.setPy(py);
        this.updateLineNumbers();
    }

    clearAll() {
        this.setAll('', '', '', '');
    }

    /* ─── Format code (basic indent fix) ─── */

    formatActive() {
        const editor = this.editors[this.activeTab];
        if (!editor) return;
        // Basic: нормализуем отступы (2 пробела)
        const lines   = editor.value.split('\n');
        let depth     = 0;
        const indent  = '  ';
        const open    = /[{(<]$/;
        const close   = /^[})>]/;
        const result  = lines.map(raw => {
            const line = raw.trim();
            if (!line) return '';
            if (close.test(line)) depth = Math.max(0, depth - 1);
            const indented = indent.repeat(depth) + line;
            if (open.test(line)) depth++;
            return indented;
        });
        editor.value = result.join('\n');
        this.updateLineNumbers();
    }

    /* ─── Change callbacks ─── */

    onChange(cb) {
        this._changeCallbacks.push(cb);
    }

    _notifyChange() {
        this._changeCallbacks.forEach(cb => cb({
            html: this.getHTML(),
            css:  this.getCSS(),
            js:   this.getJS(),
            py:   this.getPy()
        }));
    }
}