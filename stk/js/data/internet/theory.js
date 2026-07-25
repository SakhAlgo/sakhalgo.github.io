/**
 * INTERNET THEORY MODULE
 * Теория по разделу "Интернет"
 */

const INTERNET_THEORY = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Интернет</title>
<style>
    /* ---------- Базовые стили для модуля ---------- */
    .internet-theory-module {
        font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
        color: #1e293b;
        line-height: 1.6;
        max-width: 960px;
        margin: 0 auto;
        position: relative;
    }

    /* ---------- Якорная навигация ---------- */
    .anchor-nav {
        // position: sticky;
        top: 0;
        background: rgba(255, 255, 255, 0.92);
        backdrop-filter: blur(8px);
        padding: 12px 16px;
        margin-bottom: 24px;
        border-radius: 16px;
        border: 1px solid #e9edf2;
        box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px 12px;
        z-index: 100;
    }

    .anchor-nav .nav-title {
        font-weight: 600;
        font-size: 0.85rem;
        color: #475569;
        margin-right: 8px;
        letter-spacing: 0.03em;
    }

    .anchor-nav a {
        color: #2563eb;
        text-decoration: none;
        font-size: 0.85rem;
        padding: 4px 8px;
        border-radius: 6px;
        transition: background 0.15s;
        border-bottom: none;
        font-weight: 500;
    }

    .anchor-nav a:hover {
        background: #eff6ff;
        color: #1d4ed8;
        border-bottom: none;
    }

    .anchor-nav .back-top {
        margin-left: auto;
        background: #f1f5f9;
        padding: 4px 14px;
        border-radius: 20px;
        font-size: 0.8rem;
        color: #1e293b;
    }

    .anchor-nav .back-top:hover {
        background: #e2e8f0;
    }

    .anchor-nav .divider {
        color: #cbd5e1;
        font-weight: 300;
    }

    /* ---------- Заголовки ---------- */
    .internet-theory-module h2 {
        font-size: 1.6rem;
        font-weight: 700;
        margin-top: 2.2rem;
        margin-bottom: 1rem;
        color: #0f172a;
        border-bottom: 3px solid #e9edf2;
        padding-bottom: 0.5rem;
    }

    .internet-theory-module h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin-top: 1.8rem;
        margin-bottom: 0.75rem;
        color: #0f172a;
    }

    .internet-theory-module h4 {
        font-size: 1.15rem;
        font-weight: 600;
        margin-top: 1.8rem;
        margin-bottom: 0.6rem;
        color: #0f172a;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .internet-theory-module h5 {
        font-size: 1rem;
        font-weight: 600;
        margin-top: 1.4rem;
        margin-bottom: 0.4rem;
        color: #1e293b;
    }

    /* ---------- Параграфы ---------- */
    .internet-theory-module p {
        margin: 0.6rem 0;
    }

    /* ---------- Списки ---------- */
    .internet-theory-module ul,
    .internet-theory-module ol {
        padding-left: 1.5rem;
        margin: 0.4rem 0 1rem 0;
    }

    .internet-theory-module li {
        margin-bottom: 0.3rem;
    }

    .internet-theory-module ul ul,
    .internet-theory-module ol ul {
        margin-top: 0.15rem;
        margin-bottom: 0.15rem;
    }

    /* ---------- Разделители ---------- */
    .internet-theory-module hr {
        border: none;
        border-top: 2px solid #e9edf2;
        margin: 2rem 0;
    }

    /* ---------- Ссылки ---------- */
    .internet-theory-module a {
        color: #2563eb;
        text-decoration: none;
        border-bottom: 1px dotted #94a3b8;
    }

    .internet-theory-module a:hover {
        color: #1d4ed8;
        border-bottom-color: #2563eb;
    }

    /* ---------- Таблицы ---------- */
    .internet-theory-module table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.95rem;
        margin: 1.2rem 0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
    }

    .internet-theory-module thead {
        background: #f1f5f9;
        border-bottom: 2px solid #dce3ec;
    }

    .internet-theory-module th {
        text-align: left;
        padding: 10px 14px;
        font-weight: 600;
        color: #0f172a;
        font-size: 0.85rem;
        letter-spacing: 0.02em;
    }

    .internet-theory-module td {
        padding: 10px 14px;
        border-bottom: 1px solid #edf2f7;
        vertical-align: top;
    }

    .internet-theory-module tbody tr:last-child td {
        border-bottom: none;
    }

    /* ---------- Специфичные классы для таблиц ---------- */
    .internet-theory-module .task {
        font-weight: 500;
        color: #0f172a;
    }

    .internet-theory-module .solution {
        color: #1e293b;
    }

    .internet-theory-module .device {
        display: inline-block;
        background: #f1f5f9;
        padding: 2px 12px;
        border-radius: 20px;
        font-size: 0.78rem;
        font-weight: 500;
        color: #1e293b;
        margin-top: 2px;
        white-space: nowrap;
    }

    /* ---------- Сетка сравнения (две карточки) ---------- */
    .internet-theory-module .comparison-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin: 16px 0;
    }

    .internet-theory-module .comparison-card {
        border-radius: 16px;
        padding: 18px 22px;
        background: #f8fafc;
        border: 1px solid #e9edf2;
    }

    .internet-theory-module .comparison-card h4 {
        margin-top: 0;
        margin-bottom: 0.6rem;
        font-size: 1.05rem;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .internet-theory-module .comparison-card h4 span {
        font-size: 1.6rem;
    }

    .internet-theory-module .comparison-card ul {
        margin: 0;
        padding-left: 1.2rem;
    }

    .internet-theory-module .comparison-card li {
        margin-bottom: 0.2rem;
    }

    .internet-theory-module .comparison-card.blue {
        border-left: 5px solid #3b82f6;
    }

    .internet-theory-module .comparison-card.green {
        border-left: 5px solid #22c55e;
    }

    /* ---------- Блоки-запоминалки ---------- */
    .internet-theory-module .reminder-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin: 16px 0 8px;
    }

    .internet-theory-module .reminder-card {
        border-radius: 14px;
        padding: 14px 20px;
        border-left: 5px solid #4a90d9;
        background: #f1f6fd;
    }

    .internet-theory-module .reminder-card.green {
        border-left-color: #2ecc71;
        background: #ecf8f2;
    }

    .internet-theory-module .reminder-card .icon {
        font-size: 1.6rem;
        margin-right: 8px;
    }

    .internet-theory-module .reminder-card strong {
        color: #1a5f7a;
    }

    .internet-theory-module .reminder-card.green strong {
        color: #1a6b3a;
    }

    .internet-theory-module .reminder-card .desc {
        display: block;
        margin-top: 4px;
        color: #2c3e50;
    }

    /* ---------- Карточка-выделение для важных правил ---------- */
    .internet-theory-module .rule-box {
        background: #fefce8;
        border: 1px solid #fde68a;
        border-radius: 12px;
        padding: 16px 20px;
        margin: 16px 0;
    }

    .internet-theory-module .rule-box strong {
        color: #92400e;
    }

    /* ---------- Кнопка "Наверх" (фиксированная) ---------- */
    .sticky-back-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #0f172a;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.4rem;
        cursor: pointer;
        box-shadow: 0 6px 20px rgba(15, 23, 42, 0.25);
        transition: transform 0.2s, opacity 0.2s;
        opacity: 0.8;
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
    }

    .sticky-back-top:hover {
        transform: scale(1.08);
        opacity: 1;
        color: white;
        border-bottom: none;
    }

    /* ---------- Адаптив ---------- */
    @media (max-width: 700px) {
        .internet-theory-module .comparison-grid,
        .internet-theory-module .reminder-grid {
            grid-template-columns: 1fr;
        }

        .internet-theory-module table {
            font-size: 0.85rem;
        }

        .internet-theory-module th,
        .internet-theory-module td {
            padding: 8px 10px;
        }

        .anchor-nav {
            padding: 10px 12px;
            gap: 4px 8px;
        }

        .anchor-nav .nav-title {
            font-size: 0.75rem;
        }

        .anchor-nav a {
            font-size: 0.75rem;
            padding: 2px 6px;
        }

        .sticky-back-top {
            width: 44px;
            height: 44px;
            font-size: 1.2rem;
            bottom: 20px;
            right: 20px;
        }
    }

    @media (max-width: 480px) {
        .internet-theory-module h2 {
            font-size: 1.3rem;
        }
        .internet-theory-module h3 {
            font-size: 1.1rem;
        }
        .internet-theory-module h4 {
            font-size: 1rem;
        }
        .internet-theory-module table {
            font-size: 0.78rem;
        }
        .internet-theory-module th,
        .internet-theory-module td {
            padding: 6px 8px;
        }
        .internet-theory-module .device {
            font-size: 0.7rem;
            padding: 1px 8px;
        }
        .internet-theory-module .comparison-card {
            padding: 14px 16px;
        }
        .internet-theory-module .reminder-card {
            padding: 12px 16px;
        }
        .anchor-nav a {
            font-size: 0.7rem;
            padding: 2px 5px;
        }
        .internet-theory-module p,
        .internet-theory-module li {
            font-size: 0.9rem;
        }
    }

    @media (max-width: 375px) {
        .internet-theory-module h2 {
            font-size: 1.15rem;
        }
        .internet-theory-module h3 {
            font-size: 1rem;
        }
        .internet-theory-module h4 {
            font-size: 0.95rem;
        }
        .internet-theory-module table {
            font-size: 0.72rem;
        }
        .internet-theory-module th,
        .internet-theory-module td {
            padding: 5px 6px;
        }
        .internet-theory-module .device {
            font-size: 0.65rem;
            padding: 1px 6px;
        }
        .internet-theory-module .comparison-card {
            padding: 12px 14px;
        }
        .internet-theory-module .reminder-card {
            padding: 10px 14px;
        }
        .internet-theory-module .comparison-card h4 span {
            font-size: 1.2rem;
        }
        .internet-theory-module .reminder-card .icon {
            font-size: 1.2rem;
        }
        .internet-theory-module p,
        .internet-theory-module li {
            font-size: 0.82rem;
        }
    }

    @media (max-width: 320px) {
        .internet-theory-module h2 {
            font-size: 1rem;
        }
        .internet-theory-module h3 {
            font-size: 0.9rem;
        }
        .internet-theory-module h4 {
            font-size: 0.85rem;
        }
        .internet-theory-module table {
            font-size: 0.65rem;
        }
        .internet-theory-module th,
        .internet-theory-module td {
            padding: 4px 5px;
        }
        .internet-theory-module .device {
            font-size: 0.6rem;
            padding: 1px 5px;
        }
        .internet-theory-module .comparison-card {
            padding: 10px 12px;
        }
        .internet-theory-module .comparison-card h4 {
            font-size: 0.85rem;
        }
        .internet-theory-module .comparison-card h4 span {
            font-size: 1rem;
        }
        .internet-theory-module .reminder-card {
            padding: 8px 12px;
        }
        .internet-theory-module .reminder-card .icon {
            font-size: 1rem;
        }
        .internet-theory-module .reminder-card strong {
            font-size: 0.8rem;
        }
        .internet-theory-module .reminder-card .desc {
            font-size: 0.75rem;
        }
        .internet-theory-module p,
        .internet-theory-module li {
            font-size: 0.75rem;
        }
    }
                /* ===== КНОПКА "ВВЕРХ" ===== */
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #1a5f7a;
    color: white !important;
    text-decoration: none;
    border-radius: 60px;
    padding: 14px 24px;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 8px 25px rgba(208, 219, 224, 0.35);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 999;
    border: 2px solid rgba(255,255,255,0.2);
    letter-spacing: 0.3px;
}

.back-to-top:hover {
    background: #0f4a62;
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 14px 35px rgba(26, 95, 122, 0.45);
    color: white;
}

.back-to-top:active {
    transform: scale(0.95);
}

.back-to-top .arrow {
    font-size: 1.4rem;
    line-height: 1;
}

@media (max-width: 600px) {
    .back-to-top {
        bottom: 20px;
        right: 20px;
        padding: 12px 18px;
        font-size: 0.9rem;
        gap: 6px;
    }
    .back-to-top .arrow {
        font-size: 1.2rem;
    }
}
</style>
<body>
<div class="internet-theory-module" id="top2">

    <!-- ============================================================ -->
    <!--                    ЯКОРНАЯ НАВИГАЦИЯ                          -->
    <!-- ============================================================ -->
    <nav class="anchor-nav" aria-label="Якорная навигация">
        <a href="#twisted-pair">Витая пара</a>
        <span class="divider">|</span>
        <a href="#diagnostics">Диагностика</a>
        <span class="divider">|</span>
        <a href="#gpon">GPON</a>
        <span class="divider">|</span>
        <a href="#gpon-algorithm">Подключение GPON</a>
        <span class="divider">|</span>
        <a href="#ports-logic">Порты</a>
        <span class="divider">|</span>
        <a href="#docsis">DOCSIS</a>
        <span class="divider">|</span>
        <a href="#shor-air">Воздушные линии</a>
        <span class="divider">|</span>
        <a href="#practical-diagnostics">Практическая диагностика — работа с абонентом</a>
        <span class="divider">|</span>
        <a href="#youtube-issues">Работа с жалобами на YouTube</a>
    </nav>

    <!-- ============================================================ -->
    <!--                     ВИТАЯ ПАРА (TWISTED PAIR)                  -->
    <!-- ============================================================ -->
    <section id="twisted-pair">
        <h4>🔌 Витая пара - основа проводных сетей</h4>
        <p><strong>Витая пара (Twisted Pair):</strong> Самый распространённый тип кабеля для построения локальных сетей (Ethernet). Состоит из 8 медных проводов, скрученных попарно для защиты от помех.</p>
        
        <h4>📋 Категории витой пары</h4>
        <ul>
            <li><strong>Cat5e:</strong> до 1 Гбит/с на 100 м (самая популярная для дома)</li>
            <li><strong>Cat6:</strong> до 10 Гбит/с на 55 м, лучше экранирование</li>
            <li><strong>Cat6a:</strong> до 10 Гбит/с на 100 м (для серьёзных сетей)</li>
            <li><strong>Cat7/Cat8:</strong> до 40 Гбит/с (для дата-центров)</li>
        </ul>
        
        <h4>🔧 Типы подключения</h4>
        <ul>
            <li><strong>Прямой кабель (Straight-through):</strong> Для подключения разных типов устройств (компьютер ↔ роутер, роутер ↔ свитч).</li>
            <li><strong>Кросс-кабель (Crossover):</strong> Для подключения однотипных устройств (компьютер ↔ компьютер). Современные устройства поддерживают <strong>Auto-MDI/X</strong> — автоматическое определение типа кабеля.</li>
        </ul>
        
        <h4>⚡ Как передаётся сигнал</h4>
        <ul>
            <li>Данные передаются по <strong>дифференциальным парам</strong> — два провода работают как один канал (один передаёт «+», второй «−», помехи вычитаются).</li>
            <li>Скрутка проводов нужна для защиты от электромагнитных наводок — чем чаще скрутка, тем лучше помехозащищённость.</li>
            <li>В стандарте <strong>1000BASE-T (Gigabit Ethernet)</strong> используются все 4 пары для одновременной передачи в обе стороны (полный дуплекс).</li>
        </ul>
        
        <h4>📏 Обжим RJ-45</h4>
        <p>Стандарты обжима коннектора <strong>RJ-45</strong>:</p>
        <ul>
            <li><strong>TIA/EIA-568A:</strong> зелёный/зелёно-белый, оранжевый/оранжево-белый, синий/сине-белый, коричневый/коричнево-белый</li>
            <li><strong>TIA/EIA-568B:</strong> оранжевый/оранжево-белый, зелёный/зелёно-белый, синий/сине-белый, коричневый/коричнево-белый (самый распространённый)</li>
        </ul>
        <img src="js/data/internet/images/types_connection.png" alt="Типы обжима" style="max-width:100%; height:auto;"/>
    </section>

    <hr>

    <!-- ============================================================ -->
    <!--              ДИАГНОСТИКА КАБЕЛЯ                               -->
    <!-- ============================================================ -->
    <section id="diagnostics">
        <h4>📊 Диагностика кабеля: полный список терминов</h4>
        
        <h5>🔴 Определение базовых неисправностей</h5>
        <p><strong>TDR (Time Domain Reflectometer):</strong> Метод диагностики, который посылает импульс в кабель и измеряет время и характер отражённого сигнала. Позволяет определить:</p>
        <ul>
            <li><strong>Расстояние до обрыва</strong> — импульс отражается полностью.</li>
            <li><strong>Расстояние до короткого замыкания</strong> — импульс отражается инвертированно.</li>
            <li><strong>Неоднородности кабеля</strong> — частичное отражение показывает место повреждения.</li>
            <li><strong>Импедансные изменения</strong> — скрутки, перегибы, раздавливания.</li>
        </ul>

        <h5>⚠️ Типичные проблемы витой пары</h5>
        <ul>
            <li>
                <strong>OPEN (обрыв):</strong> Полное отсутствие электрического контакта в одной или нескольких жилах кабеля. Тестер показывает "Open" на конкретной жиле (например, "Pin 4 Open"). <br><em>🔹 Возможные причины:</em>
                <ul>
                    <li>Плохой контакт в коннекторе (недожат или пережат)</li>
                    <li>Обрыв жилы из-за перегиба или раздавливания кабеля</li>
                    <li>Перетяжка кабеля — микротрещины в меди</li>
                    <li>Использование коннектора не под тип жилы (одножильный vs многожильный)</li>
                    <li>Битый или окисленный контакт в розетке/патч-панели</li>
                </ul>
                <em>✅ Решение: переобжать, заменить коннектор или участок кабеля.</em>
            </li>
            <li>
                <strong>SHORT (короткое замыкание):</strong> Электрический контакт между двумя или более жилами. Тестер показывает "Short" между пинами (например, "Pin 1-2 Short"). <br><em>🔹 Возможные причины:</em>
                <ul>
                    <li>Защип изоляции при обжиме — жилы касаются друг друга внутри коннектора</li>
                    <li>Повреждение внешней оболочки — попадание влаги или коррозия</li>
                    <li>Раздавленный кабель — изоляция нарушена внутри</li>
                    <li>Плохая разделка кабеля перед обжимом (оголённые участки соприкасаются)</li>
                    <li>Использование некачественного CCA-кабеля — неравномерная изоляция</li>
                </ul>
                <em>✅ Решение: переобжать, проверить патч-панель, заменить повреждённый участок.</em>
            </li>
            <li>
                <strong>REVERSED (перепутаны местами):</strong> Жилы в паре поменяны местами (например, пин 1 на пине 2, а пин 2 на пине 1). <br><em>🔹 Возможные причины:</em>
                <ul>
                    <li>Ошибка при обжиме — перепутаны цвета в одной паре</li>
                    <li>Неверная схема на патч-панели (перекрещивание пар)</li>
                    <li>Невнимательность при разделке кабеля (особенно на длинных линиях)</li>
                </ul>
                <em>✅ Решение: переобжать конец с ошибкой, сверившись со стандартом (568A или 568B).</em>
            </li>
            <li>
                <strong>MISWIRE (неправильная распиновка):</strong> Несоответствие стандарту обжима (например, на одном конце 568A, на другом 568B при прямом кабеле). <br><em>🔹 Возможные причины:</em>
                <ul>
                    <li>Нарушение целостности пары (жилы из разных пар на пинах 1-2 или 3-6)</li>
                    <li>Использование разных стандартов на концах кабеля (A и B) для прямого соединения</li>
                    <li>Ошибка при кримповании — жила не до конца зашла в контакт</li>
                    <li>Перепутаны пары целиком (например, оранжевая на месте зелёной)</li>
                </ul>
                <em>✅ Решение: переобжать оба конца по одному стандарту (чаще 568B).</em>
            </li>
            <li>
                <strong>CROSSTALK — перекрёстные помехи:</strong> Нежелательное наведение сигнала с одной пары на другую. <br><em>🔹 Возможные причины:</em>
                <ul>
                    <li>Слишком сильное разматывание скруток при обжиме (более 13 мм)</li>
                    <li>Пересечение или параллельная прокладка рядом с силовыми кабелями (220 В)</li>
                    <li>Повреждение изоляции или нарушение структуры пары</li>
                    <li>Использование неэкранированного кабеля (UTP) в шумной электромагнитной среде</li>
                    <li>Разная длина скруток пар внутри кабеля — Skew-ошибки</li>
                    <li>Скрутка (сращивание) жил вместо цельного куска — отражения сигнала</li>
                </ul>
                <em>✅ Решение: заменить кабель на экранированный (FTP/STP), уменьшить длину линии, переобжать с сохранением скруток, развести силовые и сетевые кабели.</em>
            </li>
        </ul>

        <h5>➕ Дополнительные проблемы, не имеющие прямого диагноза, но влияющие на работу:</h5>
        <ul>
            <li><strong>Слишком длинный кабель (>100 м)</strong> — затухание сигнала (Attenuation). Решение: сократить длину или поставить repeater/коммутатор.</li>
            <li><strong>Использование кабеля CCA (медь-алюминий)</strong> — повышенное сопротивление, нагрев, нестабильность на длинных линиях. Решение: заменить на чисто медный (CU).</li>
            <li><strong>Перегибы и раздавливание кабеля</strong> — изменение волнового импеданса (отражения). Решение: проложить с радиусом изгиба не менее 4 диаметров кабеля.</li>
            <li><strong>Прокладка вблизи источников тепла</strong> — деградация изоляции. Решение: соблюдать расстояние > 50 см от нагревательных приборов.</li>
            <li><strong>Заземление экрана только с одной стороны</strong> (для FTP/SFTP) — паразитные токи. Решение: заземлять экран строго с одной стороны (обычно на стороне коммутатора).</li>
            <li><strong>Использование кабеля ниже требуемой категории</strong> (Cat5 для 2.5/5 Gbps) — ошибки FCS, ретрасмиссии. Решение: использовать Cat5e, Cat6 или выше.</li>
            <li><strong>Плохой IDC-контакт на патч-панели</strong> — периодические пропадания. Решение: дожать или перезаделать кросс.</li>
            <li><strong>Натяжение кабеля сверх нормы</strong> — рост сопротивления и микроразрывы. Решение: ослабить натяжение, использовать кабельные органайзеры.</li>
        </ul>
    </section>

    <hr>

    <!-- ============================================================ -->
    <!--                         GPON                                   -->
    <!-- ============================================================ -->
    <section id="gpon">
        <h4>🔦 GPON - гигабитная пассивная оптическая сеть</h4>
        <p><strong>GPON (Gigabit Passive Optical Network):</strong> Технология подключения к интернету по оптоволокну, которое заводится прямо в квартиру. Вместо медных проводов — стеклянная нить, по которой данные летят со скоростью света.</p>
        <p>На всём пути от провайдера до вашего дома нет ни одного устройства, которому нужно электричество (всё работает на сплиттерах-разветвителях). Поэтому интернет не отключается из-за проблем с розеткой в подъезде.</p>
        
        <h4>⚡ Скорость</h4>
        <p>до 2,5 Гбит/с на скачивание и 1,25 Гбит/с на отдачу. Этого хватит для игр, стримов и 4K-видео без задержек.</p>
        
        <h4>📡 Как работает передача?</h4>
        <p>По одному кабелю данные идут в обе стороны, но на разных длинах волн света:</p>
        <ul>
            <li><strong>1490 нм</strong> — от провайдера к вам (downstream),</li>
            <li><strong>1310 нм</strong> — от вас к провайдеру (upstream) с разделением по времени (TDMA), чтобы абоненты не «сталкивались».</li>
        </ul>
        <a href="https://www.feiboer.com.cn/ru/news/the-difference-between-sc-apc-and-sc-upc/">Разъемы SC/APC и SC/UPC: ключевые различия для оптоволоконных сетей</a>

        <h4>🏗️ Из чего состоит сеть</h4>
        <ul>
            <li><strong>OLT (Optical Line Terminal):</strong> Оборудование провайдера (главный «диспетчер»).</li>
            <li><strong>Сплиттеры:</strong> Пассивные разветвители (делят сигнал на множество квартир).</li>
            <li><strong>ONT (Optical Network Terminal):</strong> Ваш домашний терминал (в него приходит оптоволокно, а из него — интернет по Wi-Fi или кабелю).</li>
        </ul>
        
        <h4>✅ Главные плюсы</h4>
        <ul>
            <li>Высокая скорость и стабильность,</li>
            <li>Помехозащищённость (не боится электромагнитных волн),</li>
            <li>Надёжность (нет электроники на линии),</li>
            <li>Можно подключить до 128 абонентов на один порт OLT.</li>
        </ul>
        
        <h4>🔄 В чём отличие от старого FTTB</h4>
        <p>В <strong>FTTB (Fiber To The Building)</strong> оптоволокно идёт только до подъезда, а в квартиру — медный кабель (витая пара). В <strong>GPON</strong> волокно заходит напрямую в квартиру — это быстрее и надёжнее.</p>
    </section>

    <hr>
<!-- ============================================================ -->
    <!--           ПОДКЛЮЧЕНИЕ GPON — ПОШАГОВЫЙ АЛГОРИТМ               -->
    <!-- ============================================================ -->
    <section id="gpon-algorithm">
        <h2>Подключение GPON — пошаговый алгоритм</h2>
        <p><strong>Назначение:</strong> выполнить подключение абонента по технологии <em>GPON (Gigabit Passive Optical Network)</em> «под ключ» — от осмотра места до сдачи документов.</p>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Этап</th>
                    <th>Действие</th>
                    <th>Важные нюансы</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td class="task">Осмотр и документы</td>
                    <td class="solution">Сфотографировать ввод кабеля в дом с улицы и ШОР, снять видео от столба до ввода. Помочь абоненту заполнить договор и выбрать тариф → отправить на активацию (создание л/с и акта).</td>
                    <td><span class="device">Фото/видеофиксация обязательна</span></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td class="task">Проверка сигнала</td>
                    <td class="solution">Замерить сигнал с оптической розетки. Если сигнал плохой — звоним в ТП для вызова монтажников.</td>
                    <td><span class="device">Оптический дивайзер</span></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td class="task">Если абонент выкупает роутер</td>
                    <td class="solution">Цена роутера 3500 руб. (покупка сразу / отсрочка 1–2 года). Если берут — внести данные (серийник) в активацию, акт и отчёты.</td>
                    <td><span class="device">Роутер (опционально)</span></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td class="task">Планирование размещения</td>
                    <td class="solution">Уточнить у владельца места расположение опт. розетки, приставки и роутера. Возможность подключения к розеткам.</td>
                    <td><span class="device">Согласование с абонентом</span></td>
                </tr>
                <tr>
                    <td>5</td>
                    <td class="task">Монтаж оборудования</td>
                    <td class="solution">Закрепить на стене оптическую розетку и приставку. Соединить патчкордом SC/APC (2 м). Не допускать перегибов и повреждений кабеля.</td>
                    <td><span class="device">Аккуратная укладка</span></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td class="task">Подключение телевидения</td>
                    <td class="solution">Подключить сплиттер к приставке (например 306, 408, 410, 412) — для затухания сигнала. К сплиттеру подключить ТВ (1 шт.).</td>
                    <td><span class="device">Сплиттер</span></td>
                </tr>
                <tr>
                    <td>7</td>
                    <td class="task">Кабели</td>
                    <td class="solution">Не укладывать кабель — только отрезать нужную длину. Укладка — по отдельному вызову мастера или доп. оплату, если есть время</td>
                    <td><span class="device">Отрезка без укладки</span></td>
                </tr>
                <tr>
                    <td>8</td>
                    <td class="task">Интернет</td>
                    <td class="solution">Подключить роутер (кабель для интернета — аналогично, без укладки).</td>
                    <td><span class="device">Роутер</span></td>
                </tr>
                <tr>
                    <td>9</td>
                    <td class="task">Активация</td>
                    <td class="solution">После создания л/с вписать номер в договор. Позвонить в ТП и активировать. Называем адрес, услуги(например: тв, интернет), последние 4 символа приставки.</td>
                    <td><span class="device">Звонок в ТП</span></td>
                </tr>
                <tr>
                    <td>10</td>
                    <td class="task">Замер сигнала ТВ</td>
                    <td class="solution">Проверить сигнал дивайзером.</td>
                    <td><span class="device">Дивайзер</span></td>
                </tr>
                <tr>
                    <td>11</td>
                    <td class="task">Настройка</td>
                    <td class="solution">Донастроить интернет, проверить скорость.</td>
                    <td><span class="device">Скорость</span></td>
                </tr>
                <tr>
                    <td>12</td>
                    <td class="task">Фотофиксация</td>
                    <td class="solution">Сделать и загрузить обязательных фото/видео (ШОР, ввод кабеля, приставка, роутер, скорость, каталог, сигналы, канал Солнец ТВ, договор, серийники).</td>
                    <td><span class="device">Отчётность</span></td>
                </tr>
                <tr>
                    <td>13</td>
                    <td class="task">Учёт материалов</td>
                    <td class="solution">Внести использованный материал через приложение.</td>
                    <td><span class="device">Инвентаризация</span></td>
                </tr>
                <tr>
                    <td>14</td>
                    <td class="task">Закрытие</td>
                    <td class="solution">Абонент расписывается в документах. Отправить в штаб и в группу WatchApp (фото/видео).</td>
                    <td><span class="device">Подпись</span></td>
                </tr>
                <tr>
                    <td>15</td>
                    <td class="task">Звонок абонента</td>
                    <td class="solution">Абонент должен позвонить и закрыть заявку.</td>
                    <td><span class="device">Завершение</span></td>
                </tr>
                <tr>
                    <td>16</td>
                    <td class="task">Финальная проверка</td>
                    <td class="solution">Проверить, что не забыли инструменты и материалы.</td>
                    <td><span class="device">Готово ✅</span></td>
                </tr>
            </tbody>
        </table>

        <h3>Ключевые моменты</h3>
        
        <div class="comparison-grid">
            <div class="comparison-card blue">
                <h4>
                    <span>📸</span> 
                    Фотоотчёт
                </h4>
                <ul>
                    <li><strong>ШОР и ввод:</strong> фото ШОРА, фото завода кабеля, видео от ШОРА до завода</li>
                    <li><strong>Оборудование:</strong> приставка, роутер, серийник приставки, серийник роутера (опционально)</li>
                    <li><strong>Сигналы:</strong> оптический дивайзер, аналоговый сигнал</li>
                    <li><strong>Результат:</strong> скорость, каталог, канал Солнец ТВ на телевизоре</li>
                    <li><strong>Документы:</strong> договор</li>
                </ul>
            </div>
            <div class="comparison-card green">
                <h4>
                    <span>📦</span> 
                    Материалы и опции
                </h4>
                <ul>
                    <li><strong>Роутер:</strong> 3500 руб. — сразу / в рассрочку на 1–2 года</li>
                    <li><strong>Сплиттер:</strong> 306, 408 или 412 — для гашения сигнала</li>
                    <li><strong>Патчкорд:</strong> SC/APC, 2 метра</li>
                    <li><strong>Кабель:</strong> отрезается, но не укладывается (только по вызову мастера)</li>
                    <li><strong>ТВ:</strong> подключается 1 телевизор, остальные — по вызову</li>
                </ul>
            </div>
        </div>

        <!-- Запоминалка -->
        <div class="reminder-grid">
            <div class="reminder-card">
                <span class="icon">📋</span>
                <strong>До активации</strong>
                <span class="desc">Осмотр, договор, замер сигнала, монтаж, подключение ТВ и роутера</span>
            </div>
            <div class="reminder-card green">
                <span class="icon">✅</span>
                <strong>После активации</strong>
                <span class="desc">Настройка, фото, документы, закрытие заявки</span>
            </div>
        </div>
    </section>

    <hr>

    <!-- ============================================================ -->
    <!--     СЕКЦИЯ: ЛОГИКА РАБОТЫ ПОРТОВ — КОММУТАТОР / РОУТЕР       -->
    <!-- ============================================================ -->
    <section id="ports-logic">
        <h4>🎨 Цветовая индикация и скорость (Link / Speed) на гигабитных коммутаторах.</h4>
        <p>Цвет светодиода показывает, на какой скорости устройства смогли договориться работать между собой (процесс <strong>Auto-Negotiation</strong>).</p>

        <ul>
            <li>
                <strong>🟢 Зеленый цвет (Gigabit Ethernet — 1000 Мбит/с):</strong>
                <ul>
                    <li>Для работы на этой скорости необходимы все 8 жил (4 пары) в сетевом кабеле.</li>
                    <li>Кабель должен быть категории Cat5e или Cat6.</li>
                    <li>Оба устройства (и роутер, и коммутатор) должны иметь гигабитные порты.</li>
                </ul>
            </li>
            <li>
                <strong>🟠 Оранжевый / Желтый цвет (Fast Ethernet — 100 Мбит/с или 10 Мбит/с):</strong>
                <ul>
                    <li>Если ваш тариф 100 Мбит/с, порты физически зажимаются в этот лимит, и горит оранжевый. Это штатный режим, а не ошибка.</li>
                    <li>Для этой скорости физически достаточно всего 4 жил (2 пары) в кабеле.</li>
                    <li>Если кабель 8-жильный, но перебита хотя бы одна жила из «гигабитной» четверки, устройства автоматически сбросят скорость до 100 Мбит/с, и индикатор станет оранжевым.</li>
                </ul>
            </li>
        </ul>

        <hr>

        <h4>🔌 Как устройства «видят» друг друга на физическом уровне</h4>
        <p>Когда вы вставляете кабель, происходит процесс, который называется <strong>Link Training</strong> (установление связи).</p>

        <ul>
            <li><strong>Поиск партнера:</strong> Даже если порт пустой, коммутатор периодически посылает в кабель короткие электрические импульсы — <strong>FLP (Fast Link Pulses)</strong>.</li>
            <li><strong>Замыкание цепи:</strong> Как только кабель вставляется в работающий роутер, роутер ловит эти импульсы и отправляет свои в ответ.</li>
            <li><strong>Согласование:</strong> Устройства договариваются о максимальной скорости (100 или 1000) и режиме дуплекса (Full/Half).</li>
            <li><strong>Включение индикатора:</strong> Только после успешного согласования микросхема (PHY) подает ток на светодиод порта. Лампочка загорается.</li>
        </ul>

        <hr>

        <h4>🛠 Поведение портов при администрировании (Команды UP / DOWN)</h4>
        <p>Управляемый коммутатор позволяет отключать порты программно. Вот что происходит в разных сценариях:</p>

        <ul>
            <li>
                <strong>Сценарий А: Порт коммутатора опущен (shutdown)</strong>
                <ul>
                    <li>Вы зашли в консоль коммутатора и выключили порт.</li>
                    <li><strong>На коммутаторе:</strong> Чип полностью обесточивает порт. Импульсы FLP больше не генерируются. Лампочка тухнет.</li>
                    <li><strong>На роутере:</strong> Роутер перестает получать электрические сигналы с той стороны. Для него это эквивалентно тому, что кабель физически вытащили. Лампочка на роутере гаснет.</li>
                </ul>
            </li>
            <li>
                <strong>Сценарий Б: Порт коммутатора поднят (no shutdown), но роутер не подключен</strong>
                <ul>
                    <li>Порт готов к работе, в настройках он активен.</li>
                    <li><strong>На коммутаторе:</strong> Лампочка НЕ горит. Коммутатор шлет импульсы в пустоту, ответа нет, цепь не замкнута. Порт находится в статусе <strong>Link Down</strong> (или No Link).</li>
                </ul>
            </li>
            <li>
                <strong>Сценарий В: Кабель подключен, порты подняты, но лампочка НЕ горит</strong>
                <ul>
                    <li>Это признак физической неисправности. Причины:</li>
                    <ul>
                        <li><strong>Роутер выключен из розетки:</strong> На его портах нет питания, он не может ответить коммутатору.</li>
                        <li><strong>Обрыв кабеля:</strong> Жилы, отвечающие за передачу сигнала (Rx/Tx), полностью перебиты.</li>
                        <li><strong>Неправильный обжим:</strong> Кабель обжат не по стандарту (T568A/B), сигналы идут не в те пины разъема RJ-45.</li>
                    </ul>
                </ul>
            </li>
        </ul>
    </section>

    <hr>

    <!-- ============================================================ -->
    <!--                     DOCSIS                                    -->
    <!-- ============================================================ -->
    <section id="docsis">
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
        
        <h4>⚠️ Типичные проблемы DOCSIS</h4>
        <ul>
            <li>Шум в обратном канале</li>
            <li>Низкий SNR</li>
            <li>Несоответствие уровней сигнала</li>
            <li>Проблемы с изоляцией кабеля</li>
        </ul>
    </section>

    <hr>

    <!-- ============================================================ -->
    <!--         ВОЗДУШНЫЕ ЛИНИИ (SHOR & AIR LINES)              -->
    <!-- ============================================================ -->
    <section id="shor-air">
        <h2>📦 Воздушные линии — практика монтажа</h2>
        
        <!-- ====== ШОР ====== -->

        <h4>📦 "ШОР" — Распределительный шкаф (точка доступа)</h4>
        <img src="js/data/internet/images/shor.png" alt=" ШОР" style="max-width:100%; height:auto;"/>
        <p>В профессиональной речи монтажников <strong>"ШОР"</strong> — это сокращение от <em>шкаф (или распределительный щит)</em>. Это конечный или промежуточный узел сети, который монтируется на столбе (или на стене здания).</p>
        
        <p><strong>Назначение:</strong> В "ШОРе" происходит подключение абонентов. В него заводят основной оптоволоконный кабель, а затем с помощью патч-кордов подключают к нему дома или квартиры. По сути, это точка разделения магистрали на абонентские линии.</p>
        
        <p><strong>Запас кабеля:</strong> Внутри или снаружи шкафа всегда оставляют технологический запас кабеля ("петлю"), чтобы при необходимости можно было переделать соединения. Иногда его наматывают на специальное кольцо вокруг ШОРа.</p>

        <!-- ====== КОЛБА ====== -->
        <h4>🥫 "Колба" — Оптическая муфта</h4>
        <img src="js/data/internet/images/colba.png" alt="Ktv" style="max-width:100%; height:auto;"/>
        <p>А вот <strong>"колбой"</strong> монтажники называют <strong>оптические муфты</strong> — те самые герметичные цилиндры, которые часто можно увидеть на столбах.</p>
        
        <p><strong>Назначение:</strong> Их главная задача — соединить два отрезка оптоволоконного кабеля в один длинный (например, если нужно нарастить линию) или сделать ответвление от магистрали. Внутри муфты ("колбы") находится сплайс-пластина, где аккуратно раскладываются и свариваются волокна. Сама муфта защищает это хрупкое место от пыли и влаги.</p>
        
        <p><strong>Где применяется:</strong> Муфты вешают прямо на трос между опорами или крепят на сам столб. Встречаются как проходные ("вход-выход"), так и тупиковые (в конце линии).</p>

        <div class="rule-box">
            <strong>📌 Итог:</strong> По рабочим моментам на столбах эти два слова означают:<br>
            • <strong>ШОР</strong> — это точка распределения и подключения абонентов.<br>
            • <strong>Колба</strong> — это точка соединения магистральных кабелей.<br>
            А сам процесс монтажа оптоволокна на опорах включает в себя подвеску кабеля с помощью спиральных зажимов или на тросе, организацию запаса и правильное закрепление этих самых муфт и шкафов.
        </div>

        <hr>

        <!-- ====== ВОЗДУШНЫЕ ЛИНИИ ====== -->
        <h3>🌬️ Воздушные линии — ключевые правила</h3>

        <h4>1. Осмотр воздушных линий и проблема провисания</h4>
        <p><strong>Главные враги кабеля:</strong> Ветровая нагрузка (особенно для линий, идущих с Востока на Запад, при северном ветре) и скопление снега между опорами.</p>
        <p><strong>Последствия провисания:</strong> Из-за натяжения и веса снега/льда изоляция кабеля рвётся, и наружу «вылезает» белый оптический модуль (сердцевина). Чаще всего это происходит возле опор или на длинных пролётах между домами.</p>
        <p><strong>Длина пролётов:</strong> Пролёты по 60 метров не рассчитаны на стандартный самонесущий кабель — он начинает перетираться и провисать. Чем больше расстояние от опоры до дома, тем тщательнее нужно проверять монтаж (особенно под скатом крыши).</p>

        <h4>2. Матчасть: Кабель, муфты и крепёж</h4>
        <ul>
            <li>
                <strong>Маркировка оптического кабеля (ОКСМ):</strong> Техник должен уметь читать маркировку на оболочке. Например, <strong>3х4</strong> означает 3 модуля по 4 волокна (итого 12 волокон). Также указывается прочность на разрыв в килоньютонах (кН).
            </li>
            <li>
                <strong>Типы зажимов:</strong>
                <ul>
                    <li><strong>НСО</strong> (натяжной) и <strong>ПСО</strong> (подвесной) — используются для монтажа самонесущего кабеля («восьмёрки»).</li>
                    <li>Запрещено использовать неподходящие анкерные зажимы, которые передавливают оптику.</li>
                </ul>
            </li>
            <li>
                <strong>Узлы крепления (УКН):</strong>

                <ul>
                    <img src="js/data/internet/images/ukn.png" alt="УКН" style="max-width:100%; height:auto;"/>
                    <img src="js/data/internet/images/ukn2.png" alt="УКН" style="max-width:100%; height:auto;"/>
                    <li><strong>УКН большой</strong> — для магистральных линий, бетонных и металлических опор.</li>
                    <li><strong>УКН малый</strong> — для транзитных опор.</li>
                    <li><strong>Шуруп-кольцо / полукольцо</strong> (диаметром не менее 10 мм) — используется строго на деревянных опорах.</li>
                    <img src="js/data/internet/images/shurup.png" alt="Ktv" style="max-width:100%; height:auto;"/>
                </ul>
            </li>
        </ul>

        <h4>3. Топология сети и правила подвеса муфт</h4>
        <ul>
            <li>
                <strong>География (Сахалин):</strong> «Колбная» (подвес оптических муфт) используется на севере (до Александровки, Березняков, Лугового). В других районах (на юге, Охотская трасса и др.) используются термобоксы на опорах.
            </li>
            <li>
                <strong>Золотое правило подвеса «колбы»:</strong> Оптическая муфта должна висеть <strong>сосками (вводами кабеля) строго вниз</strong>. Если она задрана вверх или упала, внутрь попадёт вода. Зимой она замёрзнет, расширится и порвёт волокно, что приведёт к массовым авариям.
            </li>
            <li>
                <strong>Запас кабеля:</strong> Бухта запаса должна быть аккуратно намотана и подвязана к муфте и опоре <strong>вязальной проволокой</strong>.
            </li>
        </ul>

        <h4>4. Идентификация своих сетей (Борьба с «мусорными» заявками)</h4>
        <p><strong>Как отличить свой кабель:</strong></p>
        <ul>
            <li>Наличие специфического крепежа (шуруп-кольцо на дереве, правильные УКН).</li>
            <li>Правильная ориентация муфты (сосками вниз).</li>
            <li>Использование <strong>вязальной проволоки</strong> для фиксации запаса (конкуренты часто используют пластиковые стяжки или жёлтую изоленту — на цвет изоленты ориентироваться нельзя).</li>
        </ul>
        <hr>

        <!-- ====== ПАМЯТКА ====== -->
        <h3>💡 Главные выводы (Памятка для техника)</h3>
        <ul>
            <li><strong>Не создавайте заявки на чужие линии.</strong> Сначала подойдите к опоре и идентифицируйте кабель по крепежу и муфте.</li>
            <li><strong>Смотрите на «колбы».</strong> Если видите муфту сосками вверх или лежащую на земле — это аварийная ситуация (риск попадания воды и обрыва зимой).</li>
            <li><strong>Обращайте внимание на климат.</strong> Длинные пролёты и стороны света (Восток-Запад) — зоны повышенного риска обрыва из-за ветра и снега.</li>
        </ul>
    </section>
    <!-- ============================================================ -->
    <!--             8. ПРАКТИЧЕСКАЯ ДИАГНОСТИКА                       -->
    <!-- ============================================================ -->
    <section id="practical-diagnostics">
        <h2>🛠️ Практическая диагностика — работа с абонентом</h2>

        <p>Любая диагностика начинается с определённых действий: мастер приходит к абоненту, подключает ноутбук, предоставляет удалённый доступ и проводит проверку по регламенту.</p>

        <h4>🔍 Этапы диагностики</h4>
        <ul>
            <li><strong>Выяснение проблемы:</strong> что именно не работает. Часто проблема касается лишь пары сайтов, хотя по телефону клиенты говорят, что «не работает вообще всё».</li>
            <li><strong>Фиксация результата:</strong> фотографирование каждой вкладки настроек на оборудовании.</li>
            <li><strong>Проверка всех соединений:</strong> физическая проверка кабелей и разъёмов, «передёргивание» для выявления плавающих контактов.</li>
        </ul>

        <h4>📋 Чек-лист диагностики</h4>
        <div class="comparison-grid">
            <div class="comparison-card blue">
                <h4><span>💻</span> На компьютере</h4>
                <ul>
                    <li>Проверить диспетчер задач и список автозагрузки (msconfig)</li>
                    <li>Проверить настройки прокси-сервера в системе</li>
                    <li>Проверить настройки Wi-Fi на смартфонах</li>
                </ul>
            </div>
            <div class="comparison-card orange">
                <h4><span>📱</span> На смартфонах</h4>
                <ul>
                    <li>Отключить «частный DNS», если активирован вручную</li>
                    <li>Проверить дополнительные настройки сети</li>
                    <li>Объяснить, что частный DNS может работать сегодня, а завтра — нет</li>
                </ul>
            </div>
        </div>

        <div class="warning-box">
            <strong>⚠️ Важно:</strong> Абоненты часто прописывают «частный DNS» в надежде обойти блокировки, что на деле вызывает ошибки подключения. Необходимо зайти в настройки и отключить его.
        </div>
    </section>
        <!-- ============================================================ -->
    <!--             10. YouTube И VPN                                 -->
    <!-- ============================================================ -->
    <section id="youtube-issues">
        <h2>🎬 Работа с жалобами на YouTube</h2>

        <p>Часто заявки создаются потому, что абоненты не понимают причин сбоев. Они видят, что у соседей или родственников сервис работает (часто через VPN), и требуют объяснений.</p>

        <h4>📌 Что нужно объяснить абоненту</h4>
        <ul>
            <li>Многие VPN-сервисы сейчас работают нестабильно из-за блокировок.</li>
            <li>Серверы VPN периодически отключаются — абоненты не следят за новостями провайдеров.</li>
            <li>На одном устройстве YouTube может работать без VPN, а на другом — нет.</li>
        </ul>

        <h4>🔍 Причины различий на устройствах</h4>
        <ul>
            <li>Особенности подсети</li>
            <li>Настройки прокси</li>
            <li>Фоновые приложения, влияющие на трафик</li>
            <li>Ручные настройки DNS</li>
        </ul>

        <div class="warning-box">
            <strong>⚠️ Важно:</strong> Грамотно разъясните ситуацию, не допуская технического жаргона, который непонятен абоненту. Клиент должен уйти с пониманием причины, а не с ощущением, что «мастер ничего не сделал».
        </div>
    </section>

    <hr>

    <!-- ============================================================ -->
    <!--                   ПОДВЕДЕНИЕ ИТОГОВ                            -->
    <!-- ============================================================ -->
    <section style="margin-top: 2.5rem; padding: 20px; background: #f8fafc; border-radius: 16px; border: 1px solid #e9edf2;">
        <h2 style="border-bottom: none; margin-top: 0;">📌 Итоговые правила работы</h2>
        <div class="reminder-grid">
            <div class="reminder-card">
                <span class="icon">🔍</span>
                <strong>Диагностика начинается с опроса</strong>
                <span class="desc">Выясните, что именно не работает, а не полагайтесь на общие жалобы.</span>
            </div>
            <div class="reminder-card green">
                <span class="icon">📸</span>
                <strong>Фиксируйте всё</strong>
                <span class="desc">Фотографируйте настройки, оборудование и сигналы.</span>
            </div>
            <div class="reminder-card orange">
                <span class="icon">⚡</span>
                <strong>Проверяйте физику</strong>
                <span class="desc">Механическая проверка кабелей и разъёмов обязательна.</span>
            </div>
            <div class="reminder-card" style="border-left-color: #8b5cf6; background: #f5f3ff;">
                <span class="icon">🧠</span>
                <strong>Объясняйте грамотно</strong>
                <span class="desc">Разъясняйте причины сбоев доступным языком, без технического жаргона.</span>
            </div>
        </div>
    </section>

<!-- ===== КНОПКА "ВВЕРХ" ===== -->
<a href="#header" class="back-to-top" aria-label="Вернуться в начало">
    <span class="arrow">⬆</span></a>

</div>
</body>
</html>
`;

// Регистрируем теорию
if (typeof window !== 'undefined') {
    window.INTERNET_THEORY = INTERNET_THEORY;
}

console.log('✅ Internet теория загружена');