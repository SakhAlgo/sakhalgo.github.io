/**
 * STORAGE MODULE
 * Управление сохранением и загрузкой состояния теста
 */

const STORAGE_KEY = 'testState';
const STORAGE_TTL = 7200000; // 2 часа

const StorageAPI = {
    save(state) {
        try {
            const data = {
                ...state,
                timestamp: Date.now()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            console.log('💾 Состояние сохранено');
            return true;
        } catch (e) {
            console.error('❌ Ошибка сохранения:', e);
            return false;
        }
    },

    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                console.log('ℹ️ Нет сохранённого состояния');
                return null;
            }

            const state = JSON.parse(raw);
            
            if (Date.now() - state.timestamp > STORAGE_TTL) {
                console.log('⏰ Состояние устарело, очищено');
                this.clear();
                return null;
            }

            console.log('📂 Состояние загружено');
            return state;
        } catch (e) {
            console.error('❌ Ошибка загрузки:', e);
            return null;
        }
    },

    clear() {
        localStorage.removeItem(STORAGE_KEY);
        console.log('🗑️ Состояние очищено');
    },

    hasState() {
        return !!localStorage.getItem(STORAGE_KEY);
    }
};

// Экспортируем в глобальную область
window.StorageAPI = StorageAPI;
console.log('✅ StorageAPI загружен');