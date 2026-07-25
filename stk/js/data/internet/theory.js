/**
 * INTERNET THEORY MODULE
 * Теория по разделу "Интернет"
 */

const INTERNET_THEORY = `
    <h4>🌐 DOCSIS - стандарт передачи данных</h4>
    <p><strong>DOCSIS (Data Over Cable Service Interface Specification):</strong> Международный стандарт передачи данных по коаксиальному кабелю.</p>
    
    <h4>📡 Основные компоненты сети интернет</h4>
    <ul>
        <li><strong>CMTS (Cable Modem Termination System):</strong> Оборудование на стороне провайдера</li>
        <li><strong>Кабельный модем:</strong> Устройство абонента для подключения</li>
        <li><strong>Сплиттеры:</strong> Разделяют сигнал на ТВ и интернет</li>
        <li><strong>Усилители:</strong> Компенсируют затухание сигнала</li>
    </ul>
    
    <h4>📊 SNR - соотношение сигнал/шум</h4>
    <p><strong>SNR (Signal-to-Noise Ratio):</strong> Соотношение сигнал/шум. Чем выше значение, тем лучше качество соединения.</p>
    <p><strong>Рекомендуемые значения SNR:</strong> > 30 дБ для хорошего качества</p>
    
    <h4>📈 Уровни сигнала</h4>
    <ul>
        <li><strong>Приём:</strong> от -15 до +15 дБм (оптимально -5 до +5)</li>
        <li><strong>Передача:</strong> от +35 до +50 дБм (зависит от скорости)</li>
    </ul>
    
    <h4>🛠️ Технические аспекты</h4>
    <p><strong>Коррекция ошибок:</strong> Механизмы FEC (Forward Error Correction) для восстановления данных.</p>
    
    <h4>⚠️ Типичные проблемы</h4>
    <ul>
        <li>Шум в обратном канале</li>
        <li>Низкий SNR</li>
        <li>Несоответствие уровней сигнала</li>
        <li>Проблемы с изоляцией кабеля</li>
    </ul>
`;

// Регистрируем теорию
if (typeof window !== 'undefined') {
    window.INTERNET_THEORY = INTERNET_THEORY;
}

console.log('✅ Internet теория загружена');