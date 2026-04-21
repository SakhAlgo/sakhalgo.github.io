/**
 * TaskValidator — базовый класс для всех валидаторов заданий
 * Содержит общие утилиты: парсинг HTML, CSS-проверки, diff-анализ
 */
export class TaskValidator {

    /**
     * Главный метод валидации — переопределяется в дочерних классах
     * @returns {{ score: number, checks: Array, passed: boolean }}
     */
    async validate(userHTML, userCSS, userJS, samples, rules) {
        throw new Error('validate() must be implemented by subclass');
    }

    /* ─── HTML Parsing ─── */

    /**
     * Создаёт DOM из HTML+CSS+JS пользователя
     */
    parseHTML(html, css = '', js = '') {
        const fullDoc = `<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
        const parser  = new DOMParser();
        return parser.parseFromString(fullDoc, 'text/html');
    }

    /**
     * Создаёт скрытый iframe для проверки computed styles
     */
    createTestFrame(html, css, js) {
        const frame = document.createElement('iframe');
        frame.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1280px;height:800px;visibility:hidden';
        frame.setAttribute('sandbox', 'allow-scripts allow-same-origin');
        document.body.appendChild(frame);

        const doc = frame.contentDocument;
        doc.open();
        doc.write(`<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`);
        doc.close();

        return frame;
    }

    removeTestFrame(frame) {
        if (frame && frame.parentNode) frame.parentNode.removeChild(frame);
    }

    /* ─── Selectors ─── */

    checkSelector(doc, selector) {
        try { return !!doc.querySelector(selector); }
        catch { return false; }
    }

    checkSelectorAll(doc, selector) {
        try { return doc.querySelectorAll(selector); }
        catch { return []; }
    }

    /* ─── Text Content ─── */

    checkText(doc, selector, texts) {
        const el = doc.querySelector(selector);
        if (!el) return false;
        const content = el.textContent.toLowerCase();
        return (Array.isArray(texts) ? texts : [texts])
            .every(t => content.includes(t.toLowerCase()));
    }

    /* ─── CSS Checks via computed styles ─── */

    checkComputedStyle(frame, selector, property, options = {}) {
        const el = frame.contentDocument.querySelector(selector);
        if (!el) return false;

        const styles = frame.contentWindow.getComputedStyle(el);
        const value  = styles[property];

        if (!value || value === 'none' || value === 'normal' || value === '0px') {
            // Также проверяем через inline или stylesheet
            return false;
        }

        if (options.notDefault) {
            // Проверяем что значение не дефолтное
            return value !== options.notDefault;
        }

        if (options.includes) {
            return value.includes(options.includes);
        }

        if (options.greaterThan !== undefined) {
            return parseFloat(value) > options.greaterThan;
        }

        return true;
    }

    /* ─── CSS Source Analysis ─── */

    checkCSSRule(cssText, selector, property) {
        const selectorPattern = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(
            selectorPattern + '\\s*\\{[^}]*' + property + '\\s*:[^;]+;?[^}]*\\}',
            'is'
        );
        return regex.test(cssText);
    }

    extractCSSProperty(cssText, selector, property) {
        const selectorPattern = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const blockRegex = new RegExp(selectorPattern + '\\s*\\{([^}]*)\\}', 'is');
        const match = cssText.match(blockRegex);
        if (!match) return null;

        const propRegex = new RegExp(property + '\\s*:\\s*([^;\\n]+)', 'i');
        const propMatch = match[1].match(propRegex);
        return propMatch ? propMatch[1].trim() : null;
    }

    /* ─── JS Analysis ─── */

    checkJSPattern(jsText, pattern) {
        if (pattern instanceof RegExp) return pattern.test(jsText);
        return jsText.includes(pattern);
    }

    /* ─── Score Calculation ─── */

    buildScore(checks) {
        const total  = checks.reduce((s, c) => s + (c.weight || 1), 0);
        const earned = checks
            .filter(c => c.passed)
            .reduce((s, c) => s + (c.weight || 1), 0);
        return total > 0 ? Math.round((earned / total) * 100) : 0;
    }

    /* ─── Text Similarity ─── */

    similarity(a, b) {
        if (!a || !b) return 0;
        const longer  = a.length > b.length ? a : b;
        const shorter = a.length > b.length ? b : a;
        if (longer.length === 0) return 1;
        const editDist = this._editDistance(longer, shorter);
        return (longer.length - editDist) / longer.length;
    }

    _editDistance(a, b) {
        const dp = Array.from({ length: a.length + 1 }, (_, i) =>
            Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : i === 0 ? i : 0))
        );
        for (let i = 1; i <= a.length; i++) {
            dp[i][0] = i;
            for (let j = 1; j <= b.length; j++) {
                if (i === 1) dp[0][j] = j;
                dp[i][j] = a[i - 1] === b[j - 1]
                    ? dp[i - 1][j - 1]
                    : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
        return dp[a.length][b.length];
    }
}
