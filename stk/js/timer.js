/**
 * TIMER MODULE
 * Управление таймером теста
 */

class Timer {
    constructor(displayElement, onTick = null, onFinish = null) {
        this.display = displayElement;
        this.onTick = onTick;
        this.onFinish = onFinish;
        this.seconds = 0;
        this.interval = null;
        this.running = false;
        this.limit = 1800; // 30 минут
        console.log('⏱ Timer создан');
    }

    start(initialSeconds = 0) {
        if (this.running) {
            this.stop();
        }

        this.seconds = initialSeconds || 0;
        this.running = true;
        this.updateDisplay();

        this.interval = setInterval(() => {
            this.seconds++;
            this.updateDisplay();

            if (this.onTick) {
                this.onTick(this.seconds);
            }

            if (this.seconds >= this.limit) {
                this.stop();
                if (this.onFinish) {
                    console.log('⏰ Таймер завершён по лимиту');
                    this.onFinish();
                }
            }
        }, 1000);
        
        console.log('▶ Таймер запущен');
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.running = false;
        console.log('⏹ Таймер остановлен');
    }

    reset() {
        this.stop();
        this.seconds = 0;
        this.updateDisplay();
        console.log('🔄 Таймер сброшен');
    }

    updateDisplay() {
        if (this.display) {
            this.display.textContent = this.formatTime(this.seconds);
        }
    }

    formatTime(seconds) {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    }

    getTime() {
        return this.seconds;
    }

    setLimit(limit) {
        this.limit = limit;
        console.log(`⏱ Лимит времени установлен: ${limit}с`);
    }
}

// Экспортируем в глобальную область
window.Timer = Timer;
console.log('✅ Timer загружен');