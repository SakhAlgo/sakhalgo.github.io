/**
 * TV THEORY MODULE
 * Теория по разделу "Кабельное ТВ"
 */

const TV_THEORY = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Кабельного телевидения</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
            background: #f6f9fc;
            color: #1e293b;
            padding: 20px;
            line-height: 1.6;
        }

        .container {
            max-width: 1300px;
            margin: 0 auto;
            background: white;
            border-radius: 32px;
            box-shadow: 0 20px 60px rgba(0, 20, 40, 0.08);
            padding: 30px 30px 50px;
            position: relative;
        }

        h1 {
            font-size: 2.4rem;
            font-weight: 600;
            letter-spacing: -0.02em;
            background: linear-gradient(145deg, #0b3b5c, #1a5f7a);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
            border-bottom: 3px solid #e2edf3;
            padding-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .subhead {
            color: #3b5f7a;
            font-size: 1rem;
            font-weight: 400;
            margin-top: -10px;
            margin-bottom: 30px;
            padding-left: 4px;
            border-left: 4px solid #5b9fc7;
            padding-left: 16px;
            background: #f0f6fa;
            border-radius: 0 12px 12px 0;
            line-height: 1.4;
        }

        .toc {
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

        .toc a {
            color: #1a5f7a;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            transition: 0.2s;
            border-bottom: 2px solid transparent;
            padding-bottom: 2px;
        }

        .toc a:hover {
            border-bottom-color: #1a5f7a;
            color: #0a3b4f;
        }

        h2 {
            font-size: 1.8rem;
            font-weight: 600;
            margin: 40px 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #dde9f2;
            color: #0a4057;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        h3 {
            font-size: 1.3rem;
            font-weight: 600;
            margin: 28px 0 14px 0;
            color: #1f5673;
            padding-left: 6px;
            border-left: 4px solid #6aaac9;
            padding-left: 14px;
        }

        h4 {
            font-size: 1.05rem;
            font-weight: 600;
            margin: 20px 0 10px 0;
            color: #1f4b62;
        }

        p, li {
            color: #1e3443;
            margin-bottom: 10px;
        }

        ul, ol {
            padding-left: 28px;
            margin-bottom: 18px;
        }

        li {
            margin-bottom: 6px;
        }

        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 18px;
            margin: 20px 0 25px;
        }

        .card {
            background: #f7fafd;
            border-radius: 18px;
            padding: 18px 20px;
            border: 1px solid #e2edf6;
            transition: 0.15s;
        }

        .card strong {
            color: #0f4b6b;
            font-weight: 600;
        }

        .badge {
            display: inline-block;
            background: #cbdde9;
            font-weight: 600;
            padding: 0 14px;
            border-radius: 20px;
            font-size: 0.8rem;
            color: #163e53;
            letter-spacing: 0.02em;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 18px 0 28px;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.02);
            font-size: 0.95rem;
        }

        th {
            background: #dde9f3;
            color: #0c3347;
            font-weight: 600;
            padding: 12px 16px;
            text-align: left;
        }

        td {
            padding: 10px 16px;
            border-bottom: 1px solid #e2ecf5;
            background: white;
        }

        tr:last-child td {
            border-bottom: none;
        }

        .table-wrap {
            overflow-x: auto;
            border-radius: 18px;
            border: 1px solid #e2ecf5;
            background: white;
        }

        .highlight-box {
            background: #e7f1f9;
            border-left: 6px solid #3f8db0;
            padding: 18px 22px;
            border-radius: 16px;
            margin: 24px 0;
        }

        .highlight-box strong {
            color: #005073;
        }

        .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }

        .comparison-card {
            background: #f7fafd;
            border-radius: 18px;
            padding: 20px 24px;
            border: 2px solid #e2edf6;
        }

        .comparison-card.blue {
            border-color: #4a90d9;
            background: #f0f6ff;
        }

        .comparison-card.green {
            border-color: #2ecc71;
            background: #f0fff4;
        }

        .comparison-card h4 {
            margin-top: 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .comparison-card .badge-color {
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid #ddd;
        }

        .badge-color.blue {
            background: #4a90d9;
        }

        .badge-color.green {
            background: #2ecc71;
        }

        hr {
            margin: 40px 0 20px;
            border: 0;
            height: 2px;
            background: linear-gradient(90deg, #c3d9e8, transparent);
        }

        .footnote {
            color: #3f637b;
            font-size: 0.9rem;
            background: #f1f7fc;
            padding: 14px 20px;
            border-radius: 20px;
            margin-top: 20px;
        }

        .warning-box {
            background: #fff3e0;
            border-left: 6px solid #f39c12;
            padding: 16px 20px;
            border-radius: 12px;
            margin: 16px 0;
        }

        .warning-box strong {
            color: #e67e22;
        }

        /* ===== СТИЛИ ДЛЯ ПАМЯТКИ (ШПАРГАЛКИ) ===== */
        .cheat-sheet {
            max-width: 100%;
            margin: 30px 0 20px;
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.10);
            font-family: 'Segoe UI', Roboto, system-ui, -apple-system, sans-serif;
            border: 2px solid #1a5f7a;
            transition: all 0.2s;
        }

        .cheat-sheet-header {
            padding: 18px 28px 12px 28px;
            border-bottom: 2px solid #dce3ee;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            background: #f0f7fc;
            border-radius: 18px 18px 0 0;
        }

        .cheat-sheet-header .badge {
            background: #1a5f7a;
            color: white;
            font-weight: 600;
            font-size: 0.7rem;
            letter-spacing: 0.5px;
            padding: 4px 16px;
            border-radius: 40px;
            text-transform: uppercase;
        }

        .cheat-sheet-header .title {
            font-weight: 700;
            font-size: 1.2rem;
            color: #0b3b5c;
            letter-spacing: -0.3px;
        }

        .cheat-sheet-body {
            padding: 12px 24px 24px 24px;
        }

        .cheat-sheet .params-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.95rem;
            box-shadow: none;
            border-radius: 0;
            margin: 0;
        }

        .cheat-sheet .params-table thead th {
            text-align: left;
            padding: 12px 12px 8px 12px;
            font-weight: 600;
            color: #1a5f7a;
            border-bottom: 2px solid #dce3ee;
            font-size: 0.8rem;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            background: transparent;
        }

        .cheat-sheet .params-table tbody td {
            padding: 12px 12px;
            border-bottom: 1px solid #eef2f8;
            vertical-align: top;
            line-height: 1.5;
            background: transparent;
        }

        .cheat-sheet .params-table tbody tr:last-child td {
            border-bottom: none;
        }

        .cheat-sheet .params-table tbody td:first-child {
            font-weight: 500;
            color: #1f2b44;
            white-space: nowrap;
        }

        .cheat-sheet .value {
            background: #f2f6fe;
            padding: 4px 12px;
            border-radius: 30px;
            font-weight: 600;
            color: #1a3a6b;
            display: inline-block;
            font-size: 0.9rem;
            letter-spacing: 0.2px;
            border: 1px solid #dbe2f0;
        }

        .cheat-sheet .value.critical {
            background: #fff1f0;
            border-color: #f5c2c0;
            color: #b21e1e;
            box-shadow: 0 0 0 1px rgba(200, 40, 40, 0.1);
        }

        .cheat-sheet td.critical {
            color: #b22222;
            font-weight: 600;
            background: #fff6f6;
            border-radius: 6px;
            padding: 8px 12px;
            border-left: 3px solid #c42a2a;
        }

        .cheat-sheet .footnote {
            margin-top: 16px;
            padding: 12px 16px;
            background: #f8faff;
            border-radius: 14px;
            color: #1e2e4a;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 12px;
            border: 1px solid #e3eaf5;
        }

        .cheat-sheet .critical-text {
            font-weight: 700;
            color: #bc1c1c;
            background: #ffe8e8;
            padding: 0 8px;
            border-radius: 20px;
        }

        .cheat-sheet .footnote span:first-child {
            font-size: 1.2rem;
        }

        /* Адаптив для памятки */
        @media (max-width: 650px) {
            .cheat-sheet {
                margin: 20px 0;
                border-radius: 16px;
            }
            .cheat-sheet-header {
                padding: 14px 16px 10px 16px;
            }
            .cheat-sheet-header .title {
                font-size: 1rem;
            }
            .cheat-sheet-body {
                padding: 8px 14px 18px 14px;
            }
            .cheat-sheet .params-table tbody td {
                padding: 10px 6px;
            }
            .cheat-sheet .params-table thead th {
                padding: 8px 6px;
                font-size: 0.65rem;
            }
            .cheat-sheet .value {
                font-size: 0.8rem;
                padding: 2px 8px;
            }
        }

        @media (max-width: 480px) {
            .cheat-sheet .params-table thead {
                display: none;
            }
            .cheat-sheet .params-table,
            .cheat-sheet .params-table tbody,
            .cheat-sheet .params-table tr,
            .cheat-sheet .params-table td {
                display: block;
                width: 100%;
            }
            .cheat-sheet .params-table tr {
                margin-bottom: 14px;
                border: 1px solid #e2e9f2;
                border-radius: 14px;
                padding: 10px 10px;
                background: #fafcff;
            }
            .cheat-sheet .params-table td {
                border: none;
                padding: 4px 4px;
                display: flex;
                flex-wrap: wrap;
                align-items: baseline;
                gap: 4px 8px;
            }
            .cheat-sheet .params-table td:before {
                content: attr(data-label);
                font-weight: 600;
                color: #1a5f7a;
                min-width: 110px;
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.3px;
            }
            .cheat-sheet .params-table td:first-child {
                font-weight: 600;
                font-size: 1rem;
                color: #0b1a33;
                padding-bottom: 4px;
                border-bottom: 1px dashed #d0dae8;
                margin-bottom: 4px;
            }
            .cheat-sheet .params-table td:first-child:before {
                content: "Параметр";
            }
            .cheat-sheet .params-table td:nth-child(2):before {
                content: "Значение";
            }
            .cheat-sheet .params-table td:nth-child(3):before {
                content: "Что будет при ошибке";
            }
            .cheat-sheet .params-table td:first-child {
                display: block;
                padding-bottom: 4px;
            }
            .cheat-sheet .params-table td:first-child:before {
                display: none;
            }
            .cheat-sheet .params-table td:not(:first-child) {
                display: flex;
                padding: 3px 2px;
            }
            .cheat-sheet .value {
                font-size: 0.8rem;
                padding: 0 8px;
            }
            .cheat-sheet td.critical {
                border-left: none;
                background: #fff3f3;
            }
            .cheat-sheet .footnote {
                flex-wrap: wrap;
                font-size: 0.8rem;
            }
        }

        @media (max-width: 600px) {
            .container { padding: 16px; }
            h1 { font-size: 1.8rem; flex-wrap: wrap; }
            h2 { font-size: 1.5rem; }
            .toc { flex-direction: column; gap: 4px; }
            .card-grid { grid-template-columns: 1fr; }
            .comparison-grid { grid-template-columns: 1fr; }
        }

        /* ===== КНОПКА "ВВЕРХ" ===== */
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #1a5f7a;
    color: white;
    text-decoration: none;
    border-radius: 60px;
    padding: 14px 24px;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 0 8px 25px rgba(26, 95, 122, 0.35);
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
        
        /* Стили для секций */
        .theory-section {
            scroll-margin-top: 20px;
        }

        /* Стили для алгоритма */
        .algorithm-steps {
            counter-reset: step;
            list-style: none;
            padding-left: 0;
        }
        .algorithm-steps li {
            counter-increment: step;
            padding: 12px 16px 12px 50px;
            position: relative;
            background: #f8fafc;
            margin-bottom: 8px;
            border-radius: 12px;
            border-left: 4px solid #1a5f7a;
            font-weight: 500;
        }
        .algorithm-steps li::before {
            content: counter(step);
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            background: #1a5f7a;
            color: white;
            width: 26px;
            height: 26px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.85rem;
            font-weight: 700;
        }
        .algorithm-steps li ul {
            margin-top: 6px;
            margin-bottom: 0;
            font-weight: 400;
        }
        .algorithm-steps li ul li {
            border-left: none;
            padding: 4px 0 4px 20px;
            background: transparent;
            counter-increment: none;
            margin-bottom: 2px;
        }
        .algorithm-steps li ul li::before {
            display: none;
        }
    </style>
</head>
<body>
<div class="container" id="top">
    <h1>Сеть кабельного телевидения</h1>
    <!-- Навигация -->
    <div class="toc">
        <a href="#section1">Устройство сети</a>
        <a href="#section2">Коаксиальный кабель</a>
        <a href="#section3">Частота и затухание</a>
        <a href="#section4">Каналы (2 и 69)</a>
        <a href="#section5">Затухание (кабель/сплиттеры)</a>
        <a href="#section5-1">Пассивное оборудование</a>
        <a href="#section6">Усилители и приёмники</a>
        <a href="#section7">Расчёты уровней</a>
        <a href="#section8">Неисправности</a>
        <a href="#section9">Дефекты изображения</a>
        <a href="#section10">Доп. оборудование</a>
        <a href="#section11">Поиск неисправностей</a>
        <a href="#section12">Настройка оборудования</a>
        <a href="#section13">Солнечная интерференция</a>
        <a href="#section14">Аттенюация и сплиттеры</a>
        <a href="#section15">Оптические сплиттеры (FBT)</a>
        <a href="#section16">Оптические коннекторы</a>
    </div>

    <!-- ==================== РАЗДЕЛ 1 ==================== -->
    <section id="section1" class="theory-section">
        <h2>Как устроена сеть кабельного телевидения</h2>
        <img src="js/data/tv/images/schema_tv.png" alt="Как устроена сеть кабельного телевидения" style="max-width:100%; height:auto;"/>
        <ul>
            <li><strong>Приём:</strong> спутниковые антенны → тюнеры → модуляторы (присваивают частоту каждой программе).</li>
            <li><strong>Магистраль:</strong> сигнал преобразуется в оптический и по оптоволокну передаётся в районы.</li>
            <li><strong>Распределение:</strong> оптоволокно → оптические сплиттеры → узлы (оптический приёмник).</li>
            <li>Оптический приёмник преобразует сигнал в радиочастотный и передаёт в коаксиальный кабель.</li>
            <li>Далее — коаксиальные сплиттеры и кабель по дому/объекту.</li>
        </ul>
    </section>

    <!-- ==================== РАЗДЕЛ 2 ==================== -->
    <section id="section2" class="theory-section">
        <h2>Устройство коаксиального кабеля</h2>
                <img src="js/data/tv/images/cable_rg6.png" alt="Устройство коаксиального кабеля" style="max-width:100%; height:auto;"/>
        <ul>
            <li><strong>Центральная жила:</strong> медь или сталь с медным покрытием, однородность диаметра.</li>
            <li><strong>Экран:</strong> фольга + оплётка (алюминий) — передача сигнала и защита от помех.</li>
            <li><strong>Изолятор:</strong> пористый (с воздухом) — лучше изолирует, чем сплошной материал (советский кабель).</li>
            <li><strong>Внешняя оболочка:</strong> защита от механических повреждений.</li>
        </ul>
    </section>

    <!-- ==================== РАЗДЕЛ 3 ==================== -->
    <section id="section3" class="theory-section">
        <h2>Влияние частоты на затухание</h2>
        <p>Диапазон эфирного вещание (антенна): <strong>48,5 … 862 МГц</strong>. Чем ниже частота, тем ниже затухание. </p>
    </section>

    <!-- ==================== РАЗДЕЛ 4 ==================== -->
    <section id="section4" class="theory-section">
        <h2>Что обозначают 2 и 69 каналы на дивайзере</h2>
        <ul>
            <li>Дивайзер измеряет уровень на аналоговых каналах (2 и 69) как начало и конец диапазона.</li>
            <li>Солнце ТК запаковывает информацию о каналах и сами каналы от 378 до 506 Мгц в кабельную сеть</li>
        </ul>
    </section>

    <!-- ==================== РАЗДЕЛ 5 ==================== -->
    <section id="section5" class="theory-section">
        <h2>Затухание кабеля и сплиттеров</h2>
        <h3>Типовое затухание на 100 м (дБ)</h3>
        <div class="table-wrap">
            <table>
                <tr><th>Кабель</th><th>2 канал</th><th>69 канал</th></tr>
                <tr><td>RG-6</td><td>5 дБ</td><td>21 дБ</td></tr>
                <tr><td>RG-11</td><td>3,5 дБ</td><td>14 дБ</td></tr>
            </table>
        </div>
        <p><em>Затухание растёт с частотой. Значения могут отличаться в зависимости от производителя.</em></p>
    </section>

    <!-- ==================== РАЗДЕЛ 5.1 ==================== -->
    <section id="section5-1" class="theory-section">
        <h2>Пассивное оборудование — задачи и решения</h2>
        <p><strong>Назначение:</strong> развести сигнал от одного источника к нескольким абонентам или устройствам <em>без использования электричества</em>.</p>

        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Главная задача</th>
                    <th>Как решает</th>
                    <th>Тип устройства</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Разветвить сигнал</td>
                    <td>Один кабель → много телевизоров</td>
                    <td>Сплиттер (делитель)</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Забрать часть сигнала</td>
                    <td>Отвести абоненту, остальное пустить дальше</td>
                    <td>TAP (ответвитель)</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Ослабить сигнал</td>
                    <td>Убрать перегрузку у ближних абонентов</td>
                    <td>Аттенюатор (ослабитель)</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Выровнять спектр</td>
                    <td>Скомпенсировать перекос частот</td>
                    <td>Эквалайзер (корректор)</td>
                </tr>
            </tbody>
        </table>

        <p style="margin-top: 12px; font-size: 13px; color: #546e7a;">
            ⚡ Все устройства работают <strong>пассивно</strong> — не требуют внешнего питания.
        </p>
        
        <h3>Делитель vs Ответвитель</h3>
        <img src="js/data/tv/images/splitter_tap.png" alt="Делитель vs Ответвитель" style="max-width:100%; height:auto;"/>
        <div class="comparison-grid" style="margin-top: 12px;">
            <div class="comparison-card blue">
                <h4 style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.8rem;">🔀</span> 
                    Делитель (Сплиттер)
                </h4>
                <ul>
                    <li><strong>Что делает:</strong> Делит сигнал <strong>поровну</strong> между всеми выходами</li>
                    <li><strong>Порты:</strong> Только <strong>вход + равные выходы</strong> (2, 3, 4, 8)</li>
                    <li><strong>Затухание:</strong> На <strong>всех выходах одинаковое</strong> (3–8 дБ)</li>
                    <li><strong>Где ставят:</strong> В квартире, на этаже — там, где нужно разветвить сигнал</li>
                    <li><strong>Пример названия:</strong> <code style="background: #d4e4f7; padding: 2px 10px; border-radius: 12px; font-weight: 700;">204</code> — 2 выхода по ~4 дБ</li>
                    <li><strong>Как расшифровать:</strong> 1-я цифра = <strong>число выходов</strong></li>
                </ul>
            </div>
            <div class="comparison-card green">
                <h4 style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 1.8rem;">🚰</span> 
                    Ответвитель (TAP)
                </h4>
                <ul>
                    <li><strong>Что делает:</strong> Забирает <strong>часть</strong> сигнала на отводы, остальное пропускает дальше</li>
                    <li><strong>Порты:</strong> <strong>Вход + проходной OUT + отводы TAP</strong> (1–4 шт)</li>
                    <li><strong>Затухание:</strong> На <strong>TAP</strong> — большое (6–30 дБ), на <strong>OUT</strong> — маленькое (1–2 дБ)</li>
                    <li><strong>Где ставят:</strong> На магистральном стояке — чтобы запитать этажи с сохранением прохода дальше</li>
                    <li><strong>Пример названия:</strong> <code style="background: #d4f0d4; padding: 2px 10px; border-radius: 12px; font-weight: 700;">212</code> — 2 отвода по ~12 дБ + проходной OUT</li>
                    <li><strong>Как расшифровать:</strong> 1-я цифра = <strong>число отводов TAP</strong></li>
                </ul>
            </div>
        </div>

        <!-- Запоминалка -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0 8px;">
            <div style="background: #eef4fa; border-radius: 14px; padding: 14px 20px; border-left: 5px solid #4a90d9;">
                <span style="font-size: 1.6rem; margin-right: 8px;">🔀</span>
                <strong style="color: #1a5f7a;">Делитель</strong>
                <span style="color: #2c3e50; display: block; margin-top: 4px;">«Раздатка» — <strong>всем поровну</strong></span>
            </div>
            <div style="background: #eaf5ee; border-radius: 14px; padding: 14px 20px; border-left: 5px solid #2ecc71;">
                <span style="font-size: 1.6rem; margin-right: 8px;">🚰</span>
                <strong style="color: #1a6b3a;">Ответвитель</strong>
                <span style="color: #2c3e50; display: block; margin-top: 4px;">«Кран на трубе» — <strong>каплю себе, остальное дальше</strong></span>
            </div>
        </div>

        <h3>Затухание коаксиальных сплиттеров на проход (вход–выход, дБ)</h3>
        <div class="table-wrap">
            <table>
                <tr><th>Сплиттер</th><th>2 канал</th><th>69 канал</th></tr>
                <tr><td>106</td><td>2,5</td><td>3</td></tr>
                <tr><td>108</td><td>1,5</td><td>2</td></tr>
                <tr><td>110</td><td>1</td><td>1,8</td></tr>
                <tr><td>412</td><td>3</td><td>4,5</td></tr>
                <tr><td>414</td><td>2,5</td><td>3</td></tr>
                <tr><td>420</td><td>1</td><td>1,5</td></tr>
                <tr><td>422</td><td>1</td><td>1,2</td></tr>
                <tr><td>424</td><td>0,8</td><td>1</td></tr>
                <tr><td>820</td><td>1,5</td><td>2</td></tr>
                <tr><td>816</td><td>4</td><td>4</td></tr>
                <tr><td>812</td><td>4</td><td>5</td></tr>
                <tr><td>204</td><td>4</td><td>4</td></tr>
                <tr><td>306</td><td>6</td><td>6</td></tr>
                <tr><td>408</td><td>8</td><td>8</td></tr>
            </table>
        </div>
        <p><strong>Выводы сплиттера:</strong> IN (вход), OUT (выход), TAP/BR (отвод). Качество влияет на затухание и помехи.</p>
        
        <h2>Схемы 9 этажного одноподъездного дома с растановкой сплиттеров от количества квартир:</h2>
        <img src="js/data/tv/images/schema9.png" alt="Схемы 9 этажного одноподяездного дома" style="max-width:100%; height:auto;"/>
        <img src="js/data/tv/images/scema&signals.png" alt="Схемы 9 этажного одноподяездного дома c сигналами." style="max-width:100%; height:auto;"/>
        
        <h3>Разъём типа F</h3>
        <p>Любой разъём вносит затухание из-за неидеального контакта центральной жилы и экрана. Важна правильная зачистка и фиксация.</p>
    </section>

    <!-- ==================== РАЗДЕЛ 6 ==================== -->
    <section id="section6" class="theory-section">
        <h2>Усилители и оптические приёмники</h2>
        <div class="card-grid">
            <div class="card"><strong>Коаксиальный усилитель:</strong> вход ~70 дБмкВ, выход ~100 дБмкВ. Усиление ~30 дБ. Перегруз при >73 дБ на входе или >103 дБ на выходе.</div>
            <div class="card"><strong>Оптический приёмник (Vertmax LTP-114-9-OS):</strong> диапазон +2 … -9 дБм, рекоменд. -4 дБм. Перегруз >0 дБм.</div>
            <div class="card"><strong>Оптический приёмник (Vector OPTI 50):</strong> диапазон 0 … -7 дБм, рекоменд. -2 дБм.</div>
        </div>
        <div class="highlight-box">
            <strong>Рекомендуемые выходные уровни оптического приёмника:</strong> 99 дБмкВ (2-й канал) и 102 дБмкВ (69-й канал).
        </div>
    </section>

    <!-- ==================== РАЗДЕЛ 7 ==================== -->
    <section id="section7" class="theory-section">
        <h2>Расчёт уровней сигнала</h2>
        <h3>Расчёт на подъезд</h3>
        <ol>
            <li>Определить кол-во подъездов и этажей.</li>
            <li>Вычесть потери на сплиттерах крышной разводки.</li>
            <li>Прибавить потери на кабеле от узла до подъезда (≈15–20 м между подъездами).</li>
            <li>От выходного сигнала оптического приёмника (99/102) отнять потери = расчётный сигнал на подъезд.</li>
            <li>Замерить сигнал с отвода сплиттера на верхнем (или нижнем) этаже и прибавить затухание на отводе.</li>
            <li>Сравнить с расчётным: расхождение ≥2 дБ — неисправность.</li>
        </ol>

        <h3>Расчёт на этаж</h3>
        <ol>
            <li>Взять расчётный уровень на подъезд.</li>
            <li>По схеме подъездных сплиттеров вычислить потери до этажа.</li>
            <li>Отнять потери по этажам.</li>
            <li>Замерить сигнал с отвода сплиттера, прибавить затухание отвода.</li>
            <li>Расхождение ≥2 дБ — неисправность.</li>
            <li>При несоответствии проверить сигнал на верхнем/нижнем этаже и сравнить с расчётным.</li>
        </ol>

        <h3>Рекомендуемый уровень для телевизора</h3>
        <p>60–75 дБмкВ. При превышении — перегруз, при недостатке — плохое изображение.</p>
    </section>

    <!-- ==================== РАЗДЕЛ 8 ==================== -->
    <section id="section8" class="theory-section">
        <h2>Основные неисправности</h2>
        <ul>
            <li><strong>Большая потеря на 69 канале:</strong> повреждения кабеля, плохой контакт экрана, неправильный монтаж коннекторов.</li>
            <li><strong>Большая потеря на 2 канале:</strong> плохой контакт центральной жилы, замыкание жилы и экрана, неисправные сплиттеры/розетки.</li>
            <li><strong>Слабый сигнал:</strong> неправильная настройка активного оборудования, обрыв экрана, неисправные сплиттеры.</li>
            <li><strong>Горизонтальные полосы</strong> — перегруз активного оборудования.</li>
            <li><strong>Диагональные полосы</strong> — наводка от силовых кабелей, неисправность фильтров.</li>
            <li><strong>Рябь / «снег»</strong> — недостаток сигнала, плохой контакт экрана, замыкание.</li>
            <li><strong>Цифровое ТВ «сыпется»</strong> — причины те же, а также помехи от Wi-Fi, радиотелефонов, ток по кабелю.</li>
        </ul>
    </section>

    <!-- ==================== РАЗДЕЛ 9 ==================== -->
    <section id="section9" class="theory-section">
        <h2>Дефекты изображения (аналог)</h2>
        <ul>
            <li><strong>Горизонтальные полосы:</strong> перегруз (вход/выход усилителя, приёмника).</li>
            <li><strong>Диагональные полосы:</strong> электрическая наводка, наводка на AV-шнуры, неисправные удлинители.</li>
            <li><strong>Рябь («снег»):</strong> слабый сигнал; рябь только на первых каналах — плохой контакт экрана.</li>
            <li><strong>Помехи только на 1-м канале:</strong> замыкание центральной жилы и экрана.</li>
        </ul>
    </section>

    <!-- ==================== РАЗДЕЛ 10 ==================== -->
    <section id="section10" class="theory-section">
        <h2>Дополнительное оборудование</h2>
        <ul>
            <li><strong>Изолятор земли:</strong> разрывает цепь тока по кабелю (system → subscriber).</li>
            <li><strong>Эквалайзер:</strong> затухание только на начальных частотах (выравнивает перекос).</li>
            <li><strong>Аттенюатор:</strong> равномерное затухание на всех частотах (коаксиальный или оптический).</li>
        </ul>
    </section>

    <!-- ==================== РАЗДЕЛ 11 ==================== -->
    <section id="section11" class="theory-section">
        <h2>Поиск неисправностей по зонам</h2>
        
        <h3>Проблема в подъезде</h3>
        <ol>
            <li>Проверить соответствие сигнала на этаже расчётному.</li>
            <li>Если на верхнем/нижнем этаже норма — проверять поэлементно (кабель, коннекторы, сплиттеры), сравнивать с таблицами (допуск: 1 дБ на 2-м, 2 дБ на 69-м).</li>
            <li>Если верхний/нижний этаж не соответствует — проблема в узле или крышной разводке.</li>
        </ol>

        <h3>Проблема в квартире</h3>
        <ol>
            <li>Замерить уровень в месте подключения квартиры.</li>
            <li>Рассчитать потери в квартирной разводке (кабель+сплиттеры).</li>
            <li>Проверить затухание на участках (допуск: 1,5 дБ на 2-м, 3 дБ на 69-м).</li>
            <li>Если затухание больше — проверить соединения, при необходимости заменить кабель.</li>
            <li>Проверить сплиттеры: затухание не должно превышать табличное.</li>
            <li>Если уровень в норме, но качество плохое — подключать напрямую от подъездного сплиттера, исключая квартирную разводку.</li>
        </ol>

        <h3>Проблема в узле</h3>
        <ul>
            <li>Проверить настройку активного оборудования.</li>
            <li>При недостатке оптического сигнала — сообщить в офис.</li>
            <li>При ухудшении качества по всему дому с правильными уровнями — заменить активное оборудование.</li>
            <li>Проверить пассивное оборудование (розетки, патчкорды, коннекторы, сплиттеры).</li>
            <li>При некачественном оптическом сигнале — проверка сварки оптоволокна, оптического сплиттера.</li>
        </ul>

        <!-- ===== НОВАЯ СЕКЦИЯ: АЛГОРИТМ ОТРАБОТКИ ЗАЯВОК ===== -->
        <h3 style="margin-top: 40px; border-left-color: #e67e22; padding-left: 14px; color: #b85a1a;">
            📋 Алгоритм отработки заявок по Телевидению
        </h3>
        <div class="warning-box" style="margin-bottom: 20px;">
            <strong>⚠️ Ошибка:</strong> Прийти к клиенту, спросить «Теперь показывает?», получить ответ «Да» и закрыть заявку.
        </div>

        <h4>✅ Правильный алгоритм закрытия заявки:</h4>
        <ol class="algorithm-steps">
            <li>
                <strong>Замер сигнала</strong>
                <ul>
                    <li>Уровень сигнала замеряется анализатором («девайзером») строго на <strong>ТВ-штекере</strong> (это последняя точка ответственности провайдера), а не на коннекторе у телевизора.</li>
                </ul>
            </li>
            <li>
                <strong>Самодиагностика</strong>
                <ul>
                    <li>При жалобах на «подсыпание» или артефакты цифры нужно смотреть параметры качества (<strong>BER</strong>) и уровня сигнала в меню приставки.</li>
                    <li><strong>BER</strong> (Bit Error Rate) — коэффициент битовых ошибок. В идеале должен быть равен <strong>0</strong>. Если BER > 0 — есть проблемы в сети.</li>
                    
                </ul>
            </li>
            <li>
                <strong>Локализация сетевых проблем</strong>
                <ul>
                    <li>Если проблема массовая (например, «квадратит» весь микрорайон), нужно проверять <strong>узел</strong> (сплиттер, оптический шкаф) и сравнивать сигнал с эталонным (например, в офисе).</li>
                </ul>
            </li>
        </ol>

        <div class="highlight-box" style="margin-top: 20px;">
            <strong>💡 Что такое «подсыпание»?</strong><br>
            В отличие от старого аналогового ТВ, где при плохом сигнале на экране появлялся «снег», цифровой сигнал либо есть (картинка идеальная), либо его нет. Но есть <strong>пограничное состояние</strong>, когда сигнал слабый или с помехами — картинка начинает «сыпаться» на цветные квадратики (макроблоки), замирать, зависать, звук может трещать. Вот это рассыпание на пиксели мастера и называют <strong>«подсыпанием»</strong> или <strong>«артефактами»</strong>.
        </div>

        <div class="highlight-box" style="background: #eef4fa; border-left-color: #4a90d9;">
            <strong>📊 Что такое «Самодиагностика»?</strong><br>
            Это встроенное в меню ТВ-приставки инженерное окно. Мастер вызывает его (обычно нажав комбинацию кнопок, например, три раза <code>Info</code>) и смотрит три главных параметра:
            <ul style="margin-top: 8px;">
                <li><strong>Уровень сигнала</strong> — «давление» в кабеле (дБмкВ).</li>
                <li><strong>Качество сигнала (SNR)</strong> — соотношение полезного сигнала к шуму.</li>
                <li><strong>BER</strong> — коэффициент битовых ошибок. <strong>Должен быть 0!</strong> Если BER > 0 — данные теряются, появляются артефакты.</li>
                <li><strong>Объяснение:</strong> Если мастер видит, что BER больше нуля (например, 10^-3 или 10^-4), это значит, что поток данных «рвется». Приставка пытается восстановить потерянные кусочки кода, но не успевает — именно поэтому на экране появляются те самые квадратики («подсыпание»).
<br>Правильный алгоритм мастера выглядит так:<br>
Клиент жалуется: «У меня вечером картинка рассыпается на квадраты!»
Мастер подключает свой прибор (анализатор/девайзер) к кабелю в квартире и видит, что сигнал в порядке.
Мастер смотрит Самодиагностику в меню приставки клиента.
Сценарий А: Если в самодиагностике BER = 0, уровень и качество отличные, но телевизор всё равно глючит — проблема не в провайдере. Скорее всего, умирает сама приставка, перегревается, неисправен HDMI-кабель или сломался тюнер в телевизоре клиента. Мастер закрывает заявку с чистой совестью: «С нашей стороны сигнал идеальный».
Сценарий Б: Если мастер видит, что BER не равен нулю (есть ошибки), значит, где-то в сети провайдера (в подъездном щитке, на чердаке или в оптическом шкафу на улице) есть проблема: окислился контакт, попала вода в муфту или сломался делитель (сплиттер). Мастер оставляет заявку на ремонт сетевого оборудования.
Резюме: Самодиагностика — это «рентген» цифрового ТВ, который позволяет мастеру доказать, виноват провайдер (плохой BER) или оборудование самого клиента.</li>
            </ul>
        </div>
        <!-- ===== КОНЕЦ НОВОЙ СЕКЦИИ ===== -->

    </section>

<!-- ============================================================ -->
    <!--             ТЕЛЕВИДЕНИЕ                                    -->
    <!-- ============================================================ -->
    <section id="tv-diagnostics">
        <h2>📺 Диагностика телевидения</h2>

        <h4>📋 Что нужно выяснить у абонента</h4>
        <ul>
            <li>Когда именно возник сбой?</li>
            <li>Что именно не работало?</li>
            <li>Какие конкретно каналы отсутствовали?</li>
        </ul>

        <div class="rule-box">
            <strong>📌 Пример из практики:</strong> «Пока у других "рассыпается" всё телевидение, у меня может барахлит только один канал — например, 129-й. В таких случаях мы действуем системно, а не паникуем».
        </div>

        <h4>🔧 Системная диагностика ТВ</h4>
        <ul>
            <li>Проверка напряжения в розетке (мультиметром) — особенно в частных домах.</li>
            <li>Проверка напряжения на блоке питания GPON-станции.</li>
            <li>Проверка сигнала на конкретных каналах.</li>
            <li>Тестирование оборудования с заведомо исправным блоком питания.</li>
        </ul>

        <div class="tip-box">
            <strong>💡 Важно:</strong> Не стоит говорить «У меня возле телевизора нормальный сигнал». Понятия «нормальный сигнал» не существует. Есть конкретные технические параметры: адрес дома, количество подъездов, расчётные показатели.
        </div>
    </section>

    <hr>
    <!-- ==================== РАЗДЕЛ 12 ==================== -->
    <section id="section12" class="theory-section">
        <h2>Настройка оборудования</h2>
        <h3>Коаксиальный усилитель</h3>
        <ol>
            <li>Входной сигнал ≤ 70 дБмкВ (69-й канал). Если больше — загасить сплиттерами.</li>
            <li>Если 2-й канал > 69-го более чем на 3 дБ — загасить эквалайзером.</li>
            <li>Подать сигнал на усилитель.</li>
            <li>Встроенными аттенюатором и эквалайзером выставить выход: 100 дБмкВ на 2-м и 69-м каналах.</li>
        </ol>

        <h3>Оптический приёмник (общие правила)</h3>
        <ul>
            <li>Выходной уровень: 99 дБмкВ (2-й), 102 дБмкВ (69-й).</li>
            <li>Патчкорды только зелёные (для ТВ).</li>
            <li>Укладывать кольцами ≥15 см, не перегибать, беречь от пыли.</li>
            <li>При превышении оптического уровня установить оптический аттенюатор.</li>
        </ul>

        <h3>Vector OPTI 50</h3>
                <img src="js/data/tv/images/vector.png" alt="Ktv" style="max-width:100%; height:auto;"/>
        <ul>
            <li>Рекомендуемый вход: -2 дБм. Если выше — аттенюатор.</li>
            <li>Синей «крутилкой» (коаксиальный аттенюатор) выставить 99/102 дБмкВ.</li>
        </ul>

        <h3>Vertmax LTP-114-9-OS (КТВшка)</h3>
        <img src="js/data/tv/images/ktv.png" alt="Ktv" style="max-width:100%; height:auto;"/>

        <ul>
            <li>Рекомендуемый вход: -4 дБм. Выше — аттенюатор.</li>
            <li>Настройка через дисплей: кнопка «ок» переключает режимы (1,2,3,E1,A1,C,S,AG).</li>
            <li>Удерживать «up» для входа, выбрать значение, применить «ok».</li>
            <li>Сначала APV = -9, затем аттенюатором выставить 102 дБмкВ на 69-м, эквалайзером — 99 дБмкВ на 2-м.</li>
        </ul>
    </section>

    <!-- ==================== ШПАРГАЛКА ==================== -->
    <section id="cheatsheet" class="theory-section">
        <h2>📋 Шпаргалка для сотрудника</h2>
        <div class="cheat-sheet">
            <div class="cheat-sheet-header">
                <span class="badge">Памятка</span>
                <span class="title">Быстрые параметры «Солнце Телеком»</span>
            </div>
            <div class="cheat-sheet-body">
                <table class="params-table">
                    <thead>
                        <tr>
                            <th>Параметр</th>
                            <th>Значение для «Солнце Телеком»</th>
                            <th>Что будет при ошибке</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Источник сигнала</strong></td>
                            <td><span class="value">Кабель (DVB‑C)</span></td>
                            <td>Если выбрать «Антенна» — каналов не будет (0).</td>
                        </tr>
                        <tr>
                            <td><strong>Начальная частота</strong></td>
                            <td><span class="value">378 МГц</span></td>
                            <td>Не критично, если ниже старта — просто дольше поиск.</td>
                        </tr>
                        <tr>
                            <td><strong>Конечная частота</strong></td>
                            <td><span class="value">506 МГц</span></td>
                            <td>Если указать 850 — поиск дольше, каналов не прибавится.</td>
                        </tr>
                        <tr>
                            <td><strong>Символьная скорость</strong></td>
                            <td><span class="value critical">6952</span></td>
                            <td class="critical">Если ошибиться (даже на 77 пунктов) — каналы не найдутся.</td>
                        </tr>
                        <tr>
                            <td><strong>Модуляция</strong></td>
                            <td><span class="value">QAM 256</span></td>
                            <td>Обычно выставляется автоматически при выборе DVB‑C.</td>
                        </tr>
                        <tr>
                            <td><strong>Шаг сетки</strong></td>
                            <td><span class="value">8 МГц</span></td>
                            <td>Справочная информация, настройка обычно скрыта.</td>
                        </tr>
                    </tbody>
                </table>
                <div class="footnote">
                    <span>⚡</span> Критические параметры выделены <span class="critical-text">красным</span> — ошибка недопустима.
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== РАЗДЕЛ 13 ==================== -->
    <section id="section13" class="theory-section">
        <h2>Солнечная интерференция</h2>
        <ul>
            <li>Происходит дважды в год (весной и осенью, около 21 марта и 23 сентября).</li>
            <li>Солнце, спутник и антенна на одной линии — излучение Солнца заглушает сигнал.</li>
            <li>Длится до 10 минут, период интерференции — чуть более недели, каждый день в одно и то же время.</li>
            <li>Осенью: сначала южные широты, затем северные; весной — наоборот.</li>
        </ul>
    </section>

    <!-- ==================== РАЗДЕЛ 14 ==================== -->
    <section id="section14" class="theory-section">
        <h2>Настройка аттенюации в схеме</h2>
        <p>Настройка выполняется <strong>«сверху вниз»</strong> — от точки ввода в дом до последней квартиры.</p>

        <h3>1. На входе домового усилителя (Метод выравнивания «наклона»)</h3>
        <p>Высокие частоты затухают в кабеле сильнее низких. Если на входе в дом сигнал «завален» на высоких частотах, используют два инструмента:</p>
        <ul>
            <li><strong>Аттенюатор (ATT):</strong> Равномерно давит весь спектр частот, если приходящий с магистрали сигнал слишком мощный (перегружает усилитель).</li>
            <li><strong>Эквалайзер (EQ / Склон):</strong> Искусственно заваливает низкие частоты, чтобы компенсировать затухание кабеля и сделать спектр плоским.</li>
        </ul>

        <h3>2. Нарезка уровней по этажам (Подбор ответвителей)</h3>
        <p>Чтобы у жителей нижних и верхних этажей сигнал был одинаковым, на магистральном стояке используются ответвители (TAP) с разным затуханием на отвод:</p>
        <ul>
            <li><strong>Верхние этажи</strong> (ближе к усилителю): Ставятся ТАПы с высокой аттенюацией (например, -16 дБ или -20 дБ), так как чистый сигнал в кабеле еще очень силен.</li>
            <li><strong>Средние этажи:</strong> Ставятся ТАПы со средним затуханием (-12 дБ).</li>
            <li><strong>Нижние этажи</strong> (конец ветки): Ставятся ТАПы с минимальным затуханием (-8 дБ или -6 дБ), чтобы «выжать» остатки сигнала из затухшей магистрали стояка.</li>
        </ul>

        <h3>3. Абонентская аттенюация (Точечная настройка)</h3>
        <p>Если перекос идет в конкретной квартире (например, квартира находится прямо у мощного усилителя, и модем «слепнет» от перегрузки):</p>
        <ul>
            <li><strong>Фиксированный аттенюатор («бочонок»):</strong> Накручивается прямо на вход модема или делителя внутри квартиры (номиналы: -3, -6, -9, -12 дБ).</li>
            <li><strong>Изолятор заземления / фильтр:</strong> Попутно вносит небольшое затухание, убирая наводки.</li>
        </ul>

        <h3>Важные правила при настройке</h3>
        <ul>
            <li><strong>Не зажимайте Upstream слишком сильно:</strong> Если установить слишком мощный аттенюатор на абонентском отводе, кабельный модем будет вынужден излучать обратный канал на своем пределе (>55 дБмВ), что приведет к его перегреву и потере пакетов.</li>
            <li><strong>Принцип запаса:</strong> Всегда закладывайте 3–4 дБ запаса на старение кабеля, окисление разъемов и возможную установку дополнительных телевизоров у абонента.</li>
        </ul>

        <h3>Оптическая аттенюация в сетях GPON</h3>
        <p>Искусственное внесение затухания в оптических сетях (например, GPON) на домовой ветке обычно требуется, если абонент находится слишком близко к магистральному узлу (или оптическому передатчику). Если сигнал на входе в абонентский терминал (ONU/ONT) слишком мощный (например, выше -8 … -15 дБм в зависимости от модели), приемник уходит в насыщение (перегрузку), что вызывает ошибки (CRC) и обрывы связи.</p>

        <h4>«Аттенюация скруткой» (макроизгиб)</h4>
        <p>В профессиональной среде называется созданием макроизгиба (или технологической петли). Метод основан на физическом свойстве оптического волокна: при нарушении критического радиуса изгиба свет начинает частично покидать сердцевину кабеля и рассеиваться в оболочке, что снижает мощность проходящего сигнала.</p>

        <p><strong>Как работает аттенюация макроизгибом («скруткой»):</strong></p>
        <ul>
            <li><strong>Суть метода:</strong> На пигтейле (желтом или белом тонком оптическом патч-корде) аккуратно формируется кольцо или петля небольшого диаметра.</li>
            <li><strong>Регулировка:</strong> Чем меньше диаметр кольца и чем больше витков сделано, тем выше вносимое затухание. Одно плотное кольцо вокруг пальца или ручки может внести от 1.5 до 6 дБ затухания.</li>
            <li><strong>Контроль:</strong> Настройка выполняется строго под контролем измерителя оптической мощности (Optical Power Meter). Монтажник плавно уменьшает радиус кольца, пока прибор не покажет целевое значение (например, оптимальные -18 … -22 дБм). После этого петля жестко фиксируется изолентой или стяжкой.</li>
        </ul>

        <p><strong>Почему этот метод считается «кустарным» (Минусы и риски):</strong></p>
        <ul>
            <li><strong>Нестабильность во времени:</strong> Оптическое волокно «привыкает» к деформации, пластиковая оболочка патч-корда со временем дубеет или растягивается от изменения температуры. Затухание может «поплыть», и через полгода сигнал либо упадет ниже критического, либо снова вырастет.</li>
            <li><strong>Деградация волокна (риск перелома):</strong> В месте сильного изгиба в стекле возникают внутренние механические напряжения. Со временем это приводит к появлению микротрещин и полному перелому волокна.</li>
            <li><strong>Зависимость от длины волны:</strong> Макроизгиб гасит разные длины волн неравномерно. Например, в сетях GPON сигнал Downstream идет на 1490 нм, а Upstream на 1310 нм. Изгиб сильнее задерживает более длинную волну (1490 нм), что может вызвать сильный перекос между приемом и передачей.</li>
        </ul>
        <p><strong>Важно:</strong> Для современных оптических кабелей с волокном стандарта G.657 (с уменьшенным радиусом изгиба) этот метод малоэффективен — они специально спроектированы так, чтобы не терять сигнал при сильных изгибах.</p>

        <h4>Правильные альтернативы «скруткам»</h4>
        <p>Чтобы сеть работала стабильно годами, вместо загибания кабеля используют специализированные пассивные компоненты:</p>
        <ul>
            <li><strong>Фиксированные оптические аттенюаторы («патроны»):</strong> Компактные переходники (обычно типа SC/APC или SC/UPC), которые вставляются в розетку оптического кросса или абонентской розетки. Внутри них установлено специальное легированное волокно, которое точечно и равномерно поглощает свет. Доступные номиналы: 1, 3, 5, 10, 15 дБ. Плюсы: стабильность в любых температурных условиях, одинаковое затухание для всех длин волн, отсутствие механического напряжения на кабель.</li>
            <li><strong>Подбор правильного сплиттера (делителя) на ветке:</strong> Если на этапе проектирования дома понятно, что на ближней к магистрали ветке сигнал будет слишком мощным, вместо симметричных сплиттеров (например, 1×8) ставят планарные или сварные делители с нужным процентом ветвления (например, оконцевание ветки через оптический ТАП со схемой 20%/80% или 10%/90%). Это позволяет изначально направить избыток мощности на дальние этажи, погасив его для ближних абонентов естественным путем.</li>
        </ul>
    </section>

    <!-- ==================== РАЗДЕЛ 15 ==================== -->
    <section id="section15" class="theory-section">
        <h2>Оптические сплиттеры. (Fused Biconical Taper)</h2>
        <img src="js/data/tv/images/opt_spliters.png" alt="SC/APC и SC/UPC" style="max-width:100%; height:auto;"/>
        <p>Сварные оптические сплиттеры с неравномерным делением (такие как 70/30, 80/20, 90/10, а также симметричные 50/50) называются FBT-делителями. Они используются в топологиях типа «шина» или «цепочка» (древовидные сети), когда от одной магистральной оптической жилы нужно последовательно запитать несколько удаленных друг от друга точек.</p>
        <p>Их главное назначение — сбалансировать уровень сигнала по всей длине трассы, чтобы и у самого первого, и у самого последнего абонента мощность света была примерно одинаковой.</p>

        <h3>Когда используется сплиттер 70/30 (Несимметричный)</h3>

        <p>Этот тип делителя применяется в начале или середине распределительной ветки.</p>

        <h4>1. Поэтажный или подомный съем сигнала (Шинная топология)</h4>
        <p>Представьте магистральный кабель, который идет по длинной улице или сверху вниз по многоэтажному дому:</p>
        <ul>
            <li>В точке съема ставится сплиттер 70/30.</li>
        <img src="js/data/tv/images/fbt70_30.png" alt="SC/APC и SC/UPC" style="max-width:100%; height:auto;"/>

            <li><strong>Плечо 30%</strong> (с бóльшим затуханием): Отправляет меньшую часть мощности местным абонентам (в ОРК подъезда или на конкретный этаж). Поскольку они находятся близко к источнику, этого слабого сигнала им гарантированно хватит.</li>
            <li><strong>Плечо 70%</strong> (с меньшим затуханием): Транзитом пускает основную мощность света дальше по магистрали к следующим домам или нижним этажам, чтобы компенсировать будущие потери в кабеле.</li>
        </ul>

        <h4>2. Подключение удаленного «аппендикса» сети</h4>
        <p>Если от основной трассы вбок уходит небольшая ветка (например, на боковую улицу в частном секторе, где всего 2–3 дома), туда выгодно ответвить 30% мощности через сплиттер 70/30, а 70% пустить прямо по главной дороге, где висит еще 15–20 домов.</p>

        <h3>Когда используется сплиттер 50/50 (Симметричный)</h3>
        <p>Сплиттер 50/50 делит оптическую мощность строго пополам между двумя направлениями.</p>

        <h4>1. Деление магистрали на два равных кластера</h4>
        <p>Применяется, когда одна магистральная линия доходит до развилки и должна разделиться на две абсолютно одинаковые ветки:</p>
        <ul>
            <li>Разветвление на два одинаковых многоквартирных дома.</li>
            <li>Разделение оптического луча на два крыла одного большого здания.</li>
            <li>Деление одной улицы частного сектора на две параллельные улицы равной длины.</li>
        </ul>

        <h4>2. Окончание магистральной цепочки</h4>
        <p>В шинной топологии (цепочке) сплиттер 50/50 часто ставится в самой последней точке деления. Например, если по улице шли делители 90/10 → 80/20 → 70/30, то в самом конце линии, где осталось всего два последних дома или абонента, ставить несимметричный сплиттер нет смысла — остаток энергии делится пополам (50/50).</p>

        <h3>Пример расчета: Цепочка из сплиттеров</h3>
        <p>Чтобы понять логику, посмотрите на классическую схему каскадного подключения трех домов от одной жилы:</p>
        <ul>
            <li><strong>Дом №1 (ближний к станции):</strong> Ставим сплиттер 80/20. 20% света отдаем первому дому (ему хватит, так как кабель еще короткий). 80% мощности летит дальше.</li>
            <li><strong>Дом №2 (средний):</strong> На вход приходит 80% от исходной мощности. Ставим сплиттер 70/30. Берем 30% от пришедшего сигнала на этот дом, а оставшиеся 70% (от 80%) отправляем дальше.</li>
            <li><strong>Дом №3 (конечный):</strong> Сюда доходят остатки сигнала. Ставим сплиттер 50/50, чтобы поровну разделить финал трассы между двумя последними абонентскими коробками.</li>
        </ul>
        <p>В итоге, за счет правильного подбора процентов, на входе во все три дома уровень сигнала в дБм будет практически одинаковым, что исключает перегрузку первых и «голодание» последних.</p>
    </section>

    <!-- ==================== РАЗДЕЛ 16 ==================== -->
    <section id="section16" class="theory-section">
        <h2>Оптические коннекторы SC/APC и SC/UPC</h2>
        <p><strong>SC/APC</strong> и <strong>SC/UPC</strong> — это типы оптических коннекторов для оптоволоконных кабелей, которые отличаются друг от друга цветом и способом полировки торца. <strong>SC</strong> обозначает форму самого разъема (Square Connector / Standard Connector) — это популярный пластиковый разъем с защелкой (нажал и вставил). <strong>UPC</strong> — это прямая полировка синего цвета, а <strong>APC</strong> — угловая полировка зеленого цвета.</p>
              <img src="js/data/tv/images/sc_connectors.png" alt="SC/APC и SC/UPC" style="max-width:100%; height:auto;"/>
        <h3>Главные отличия</h3>
        <div class="comparison-grid">
            <div class="comparison-card blue">
                <h4><span class="badge-color blue"></span> SC/UPC (Синий)</h4>
                <ul>
                    <li><strong>Полировка:</strong> Перпендикулярная (прямая) с легким закруглением</li>
                    <li><strong>Цвет корпуса:</strong> Синий</li>
                    <li><strong>Обратные потери:</strong> ≈ -50 дБ</li>
                    <li><strong>Применение:</strong> Ethernet, дата-центры, короткие линии связи</li>
                </ul>
            </div>
            <div class="comparison-card green">
                <h4><span class="badge-color green"></span> SC/APC (Зеленый)</h4>
                <ul>
                    <li><strong>Полировка:</strong> Под углом 8 градусов</li>
                    <li><strong>Цвет корпуса:</strong> Зеленый</li>
                    <li><strong>Обратные потери:</strong> ≈ -60 дБ и ниже</li>
                    <li><strong>Применение:</strong> FTTH, GPON, кабельное телевидение (КТВ)</li>
                </ul>
            </div>
        </div>

        <h3>Физика процесса и отражение света</h3>
        <ul>
            <li><strong>Синий UPC:</strong> Отраженный свет идет прямо назад по кабелю к источнику сигнала. Это дает больше помех (обратные потери около -50 дБ).</li>
            <li><strong>Зеленый APC:</strong> Из-за скоса в 8 градусов отраженный свет уходит в боковую оболочку волокна, а не возвращается назад. Это дает отличную защиту от шума (обратные потери около -60 дБ и ниже).</li>
        </ul>

        <h3>Что означают обратные потери (Return Loss)</h3>
        <p><strong>Обратные потери</strong> — это часть светового сигнала, которая не дошла до принимающего устройства, а отразилась от стыка кабелей и вернулась обратно к передатчику. Чем меньше света возвращается назад, тем лучше. Отрицательное значение в децибелах (например, -50 дБ) показывает степень этого ослабления.</p>

        <p><strong>Что значит «-50 дБ» на простом языке:</strong></p>
        <ul>
            <li><strong>-10 дБ</strong> — назад вернулась 1/10 часть света (10%). Это плохо, связь будет сбоить.</li>
            <li><strong>-30 дБ</strong> — назад вернулась 1/1000 часть света (0.1%).</li>
            <li><strong>-50 дБ</strong> (коннектор UPC) — назад вернулась всего 1/100 000 часть света (0.001%). Сигнал отразился, но он очень слабый.</li>
            <li><strong>-60 дБ</strong> (коннектор APC) — назад вернулась 1/1 000 000 часть света (0.0001%). Отражения почти нет.</li>
        </ul>
        <p><strong>Важно:</strong> Каждые 10 децибел уменьшают мощность отраженного сигнала ровно в 10 раз. Соответственно, <strong>-60 дБ</strong> (зеленый коннектор APC) отражает свет назад в <strong>10 раз слабее</strong>, чем <strong>-50 дБ</strong> (синий коннектор UPC).</p>

        <div class="warning-box">
            <strong>⚠️ Важно!</strong> Нельзя соединять между собой коннекторы <strong>UPC (синий)</strong> и <strong>APC (зеленый)</strong>. Из-за разной формы они не соприкасаются плотно и могут поцарапать и испортить друг друга.
        </div>
    </section>

    <hr>
    <div class="footnote">
        ⚡ Данные приведены для типового оборудования и кабелей. В зависимости от качества компонентов характеристики могут отличаться. Все измерения уровней — в дБмкВ (для коаксиального сигнала) и дБм (для оптического).
    </div>
</div>


<!-- ===== КНОПКА "ВВЕРХ" ===== -->
<a href="#header" class="back-to-top" aria-label="Вернуться в начало">
    <span class="arrow">⬆</span></a>


</body>
</html>
`;

// Регистрируем теорию
if (typeof window !== 'undefined') {
    window.TV_THEORY = TV_THEORY;
}

console.log('✅ TV теория загружена');