/**
 * StorageManager — управление прогрессом пользователя
 * Использует localStorage с версионированием и резервным копированием
 */
export class StorageManager {
    static STORAGE_KEY  = 'educode_progress_v2';
    static BACKUP_KEY   = 'educode_progress_backup';
    static CODE_KEY     = 'educode_user_code';
    static VERSION      = '2.0';

    /* ─── Сохранение / Загрузка прогресса ─── */

    static save(progress) {
        try {
            const payload = {
                version:     this.VERSION,
                lastUpdated: Date.now(),
                data:        progress
            };
            // Резервная копия перед перезаписью
            const existing = localStorage.getItem(this.STORAGE_KEY);
            if (existing) localStorage.setItem(this.BACKUP_KEY, existing);

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
            return true;
        } catch (e) {
            console.error('[StorageManager] save failed:', e);
            return false;
        }
    }

    static load() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (!raw) return {};
            const parsed = JSON.parse(raw);
            return parsed.data || {};
        } catch (e) {
            console.warn('[StorageManager] corrupted data, trying backup...');
            return this._loadBackup();
        }
    }

    static _loadBackup() {
        try {
            const raw = localStorage.getItem(this.BACKUP_KEY);
            if (!raw) return {};
            const parsed = JSON.parse(raw);
            return parsed.data || {};
        } catch {
            return {};
        }
    }

    /* ─── Код пользователя ─── */

    static saveCode(taskId, html, css, js, py = '') {
        try {
            const all = this._loadCode();
            all[taskId] = { html, css, js, py, savedAt: Date.now() };
            localStorage.setItem(this.CODE_KEY, JSON.stringify(all));
        } catch (e) {
            console.error('[StorageManager] saveCode failed:', e);
        }
    }

    static loadCode(taskId) {
        const all = this._loadCode();
        return all[taskId] || null;
    }

    static _loadCode() {
        try {
            return JSON.parse(localStorage.getItem(this.CODE_KEY) || '{}');
        } catch { return {}; }
    }

    /* ─── Прогресс задания ─── */

    static markCompleted(taskId, score, code) {
        const all = this.load();
        all[taskId] = {
            completed:   true,
            score,
            code,
            completedAt: Date.now()
        };
        this.save(all);
        // Также сохраняем код
        this.saveCode(taskId, code.html, code.css, code.js, code.py || '');
    }

    static getTaskProgress(taskId) {
        const all = this.load();
        return all[taskId] || null;
    }

    static getOverallStats(totalTasks) {
        const all   = this.load();
        const tasks = Object.values(all);
        const completed = tasks.filter(t => t.completed).length;
        const totalScore = tasks.reduce((sum, t) => sum + (t.score || 0), 0);
        const avgScore   = completed > 0 ? Math.round(totalScore / completed) : 0;

        return {
            completed,
            total:    totalTasks,
            percent:  totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0,
            avgScore
        };
    }

    /* ─── Экспорт / Импорт ─── */

    static export(manifest) {
        const progress = this.load();
        const stats    = this.getOverallStats(manifest.length);
        const report   = {
            exportedAt: new Date().toISOString(),
            version:    this.VERSION,
            stats,
            tasks: manifest.map(t => ({
                id:         t.id,
                title:      t.title,
                completed:  !!(progress[t.id]?.completed),
                score:      progress[t.id]?.score || 0,
                completedAt: progress[t.id]?.completedAt || null
            }))
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = `educode-progress-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    static reset() {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.BACKUP_KEY);
        localStorage.removeItem(this.CODE_KEY);
    }
}
