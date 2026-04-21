/**
 * EditorManager — управление редактором кода
 * Вкладки, нумерация строк, Tab-indent, автосохранение
 */
export class EditorManager {
    constructor() {
        this.editors = {
            html: document.getElementById('htmlEditor'),
            css:  document.getElementById('cssEditor'),
            js:   document.getElementById('jsEditor')
        };
        this.lineNumbers  = document.getElementById('lineNumbers');
        this.tabs         = document.querySelectorAll('.tab-btn');
        this.activeTab    = 'html';
        this._changeCallbacks = [];
        this._autoSaveTimer   = null;

        this._initTabs();
        this._initEditors();
        this._initKeyboardShortcuts();
        this.updateLineNumbers();
    }

    /* ─── Tabs ─── */

    _initTabs() {
        document.getElementById('editorTabs')?.addEventListener('click', e => {
            const btn = e.target.closest('.tab-btn');
            if (!btn) return;
            this.switchTab(btn.dataset.tab);
        });
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
            // Ctrl+1/2/3 — переключение вкладок
            if ((e.ctrlKey || e.metaKey) && ['1','2','3'].includes(e.key)) {
                const tabs = ['html', 'css', 'js'];
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

    setHTML(val) { if (this.editors.html) { this.editors.html.value = val; this.updateLineNumbers(); } }
    setCSS(val)  { if (this.editors.css)  this.editors.css.value  = val; }
    setJS(val)   { if (this.editors.js)   this.editors.js.value   = val; }

    setAll(html, css, js) {
        this.setHTML(html);
        this.setCSS(css);
        this.setJS(js);
        this.updateLineNumbers();
    }

    clearAll() {
        this.setAll('', '', '');
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
            js:   this.getJS()
        }));
    }
}
