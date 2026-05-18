const theme4 = {
  id: 4,
  title: "GUI: кнопки и экраны в игре",
  theory: {
    title: "Как сделать экран и кнопки в игре?",
    subtitle: "ScreenGui, Frame, TextLabel, TextButton, StarterGui",
    content: `<p><strong>GUI</strong> (произносится «джи-ю-ай») — это всё что ты видишь на экране поверх игры: счёт, кнопки, надписи, меню. В Roblox GUI создаётся в специальной папке <strong>StarterGui</strong>.</p>

      <h3 style="color:var(--accent);margin-top:24px">📺 Из чего состоит GUI?</h3>
      <p>• <strong>ScreenGui</strong> — контейнер, «холст» на весь экран. Без него ничего не появится<br>
         • <strong>Frame</strong> — прямоугольник, фон для группы элементов<br>
         • <strong>TextLabel</strong> — надпись (только для чтения)<br>
         • <strong>TextButton</strong> — кнопка с текстом, на которую можно нажать</p>
      <div class="info-box success"><strong>💡 Как добавить:</strong> Правой кнопкой на StarterGui → Insert Object → ScreenGui. Потом правой на ScreenGui → Insert Object → Frame (или TextButton).</div>

      <h3 style="color:var(--accent);margin-top:24px">📐 Размер и позиция через UDim2</h3>
      <p>Позиция и размер GUI задаётся через <strong>UDim2</strong> — специальный тип с двумя числами: доля экрана (от 0 до 1) и пиксели. Например:<br>
      <code>UDim2.new(0.5, 0, 0.5, 0)</code> — центр экрана<br>
      <code>UDim2.new(1, 0, 1, 0)</code> — правый нижний угол<br>
      <code>UDim2.new(0, 200, 0, 100)</code> — 200 пикселей в ширину, 100 в высоту</p>

      <h3 style="color:var(--accent);margin-top:24px">🖱️ Как реагировать на нажатие кнопки?</h3>
      <div class="code-block"><div class="code-header">LocalScript внутри ScreenGui</div><pre>-- Находим кнопку по имени
local button = script.Parent:WaitForChild("MyButton")

-- Событие срабатывает когда игрок нажимает кнопку
button.MouseButton1Click:Connect(function()
    print("Кнопка нажата!")
end)</pre></div>`,
  },
  tasks: [
    {
      title: "Экран приветствия",
      desc: `<p>Создадим первый GUI! При входе в игру игрок видит надпись с приветствием посередине экрана.</p>

<h4>🎯 Что должно получиться:</h4>
<p>В центре экрана появляется большая надпись «Добро пожаловать, [имя игрока]!» на красивом фоне. Через 4 секунды сама исчезает.</p>

<h4>👆 Шаг 1 — Создай ScreenGui в StarterGui:</h4>
<ol>
  <li>В Explorer найди <strong>StarterGui</strong></li>
  <li>Правой кнопкой → <strong>Insert Object → ScreenGui</strong></li>
  <li>Переименуй в <strong>WelcomeGui</strong></li>
</ol>

<h4>👆 Шаг 2 — Создай фоновый прямоугольник:</h4>
<ol>
  <li>Правой кнопкой на <strong>WelcomeGui → Insert Object → Frame</strong></li>
  <li>Переименуй в <strong>BgFrame</strong></li>
  <li>В Properties настрой:<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0.6, 0 / Y: 0.2, 0 (60% ширины экрана, 20% высоты)<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 0.2, 0 / Y: 0.4, 0 (по центру)<br>
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → выбери тёмно-синий цвет<br>
    &nbsp;&nbsp;• <strong>BackgroundTransparency</strong> → 0.2 (немного прозрачный)<br>
    &nbsp;&nbsp;• <strong>BorderSizePixel</strong> → 0 (убрать рамку)</li>
</ol>

<h4>👆 Шаг 3 — Добавь надпись внутрь BgFrame:</h4>
<ol>
  <li>Правой кнопкой на <strong>BgFrame → Insert Object → TextLabel</strong></li>
  <li>Переименуй в <strong>WelcomeText</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 1, 0 / Y: 1, 0 (на весь Frame)<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 0, 0 / Y: 0, 0<br>
    &nbsp;&nbsp;• <strong>Text</strong> → Добро пожаловать!<br>
    &nbsp;&nbsp;• <strong>TextColor3</strong> → белый<br>
    &nbsp;&nbsp;• <strong>TextScaled</strong> → галочка ✅ (текст автоматически подстроится)<br>
    &nbsp;&nbsp;• <strong>BackgroundTransparency</strong> → 1 (прозрачный фон у текста)</li>
</ol>

<h4>👆 Шаг 4 — Добавь LocalScript внутрь WelcomeGui:</h4>
<ol>
  <li>Правой кнопкой на <strong>WelcomeGui → Insert Object → LocalScript</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">LocalScript внутри WelcomeGui</div><pre>-- LocalScript — код который работает только на экране игрока
-- Получаем игрока
local player = game.Players.LocalPlayer

-- Находим нашу надпись
local welcomeText = script.Parent:WaitForChild("BgFrame"):WaitForChild("WelcomeText")

-- Меняем текст: добавляем имя игрока
-- player.Name — это имя персонажа в игре
welcomeText.Text = "Добро пожаловать, " .. player.Name .. "!"

-- Ждём 4 секунды
task.wait(4)

-- Скрываем весь экран приветствия
script.Parent.Enabled = false</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• WelcomeGui лежит в StarterGui? ✅<br>• BgFrame виден посередине экрана? ✅<br>• LocalScript (не Script!) лежит в WelcomeGui? ✅<br>• При запуске показывает имя игрока и исчезает через 4 сек? ✅</p>`,
      hint: "Важно: здесь нужен LocalScript, а не Script! LocalScript работает на экране игрока. Обычный Script не видит GUI. В Explorer он выглядит немного иначе — с другой иконкой.",
      difficulty: "easy",
      solution: "local player = game.Players.LocalPlayer\nlocal welcomeText = script.Parent:WaitForChild('BgFrame'):WaitForChild('WelcomeText')\nwelcomeText.Text = 'Добро пожаловать, ' .. player.Name .. '!'\ntask.wait(4)\nscript.Parent.Enabled = false",
    },
    {
      title: "Кнопка показывает и скрывает панель",
      desc: `<p>Классический элемент любой игры — кнопка которая открывает и закрывает меню!</p>

<h4>🎯 Что должно получиться:</h4>
<p>В углу экрана кнопка «☰ Меню». Нажимаешь — появляется панель с текстом. Нажимаешь снова — панель прячется.</p>

<h4>👆 Шаг 1 — Создай ScreenGui:</h4>
<ol>
  <li>Правой кнопкой на <strong>StarterGui → Insert Object → ScreenGui</strong></li>
  <li>Переименуй в <strong>MenuGui</strong></li>
</ol>

<h4>👆 Шаг 2 — Создай кнопку-переключатель:</h4>
<ol>
  <li>Правой кнопкой на <strong>MenuGui → Insert Object → TextButton</strong></li>
  <li>Переименуй в <strong>MenuBtn</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>Text</strong> → ☰ Меню<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0, 120 / Y: 0, 40 (120 пикселей шириной)<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 0, 10 / Y: 0, 10 (верхний левый угол)<br>
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → тёмно-серый<br>
    &nbsp;&nbsp;• <strong>TextColor3</strong> → белый<br>
    &nbsp;&nbsp;• <strong>TextScaled</strong> → ✅</li>
</ol>

<h4>👆 Шаг 3 — Создай панель меню:</h4>
<ol>
  <li>Правой кнопкой на <strong>MenuGui → Insert Object → Frame</strong></li>
  <li>Переименуй в <strong>MenuPanel</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0, 200 / Y: 0, 150<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 0, 10 / Y: 0, 60<br>
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → тёмно-серый<br>
    &nbsp;&nbsp;• <strong>Visible</strong> → убери галочку ❌ (скрыта по умолчанию)</li>
  <li>Добавь внутрь TextLabel с текстом «Это моё меню!»</li>
</ol>

<h4>👆 Шаг 4 — Добавь LocalScript в MenuGui:</h4>
<div class="code-block"><div class="code-header">LocalScript внутри MenuGui</div><pre>-- Находим кнопку и панель
local menuBtn   = script.Parent:WaitForChild("MenuBtn")
local menuPanel = script.Parent:WaitForChild("MenuPanel")

-- Панель сейчас скрыта (Visible = false)
-- Переменная: открыто меню или закрыто?
local isOpen = false

-- Нажатие на кнопку
menuBtn.MouseButton1Click:Connect(function()

    -- Меняем состояние на противоположное
    isOpen = not isOpen

    -- Показываем или скрываем панель
    menuPanel.Visible = isOpen

    -- Меняем текст кнопки в зависимости от состояния
    if isOpen then
        menuBtn.Text = "✕ Закрыть"
    else
        menuBtn.Text = "☰ Меню"
    end
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• MenuPanel изначально скрыта (Visible = false в Properties)? ✅<br>• По нажатию панель появляется? ✅<br>• По второму нажатию скрывается? ✅<br>• Текст кнопки меняется? ✅</p>`,
      hint: "Visible = true показывает объект, Visible = false скрывает. Это работает для любого GUI-элемента! Убедись что MenuPanel изначально скрыта через Properties, иначе она будет видна с самого начала.",
      difficulty: "easy",
      solution: "local menuBtn = script.Parent:WaitForChild('MenuBtn')\nlocal menuPanel = script.Parent:WaitForChild('MenuPanel')\nlocal isOpen = false\nmenuBtn.MouseButton1Click:Connect(function()\n    isOpen = not isOpen\n    menuPanel.Visible = isOpen\n    menuBtn.Text = isOpen and '✕ Закрыть' or '☰ Меню'\nend)",
    },
    {
      title: "Счётчик очков на экране",
      desc: `<p>Теперь сделаем настоящий счёт как в играх! Кнопка на экране — нажимаешь — очки растут.</p>

<h4>🎯 Что должно получиться:</h4>
<p>В углу экрана надпись «Очки: 0». Кнопка «+ Нажми!» внизу. Каждое нажатие добавляет 1 очко. При 10 очках надпись меняет цвет на золотой.</p>

<h4>👆 Шаг 1 — Создай ScreenGui:</h4>
<ol>
  <li>StarterGui → <strong>Insert Object → ScreenGui</strong> → переименуй в <strong>ScoreGui</strong></li>
</ol>

<h4>👆 Шаг 2 — Создай надпись со счётом:</h4>
<ol>
  <li>ScoreGui → <strong>Insert Object → TextLabel</strong> → переименуй в <strong>ScoreLabel</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>Text</strong> → Очки: 0<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0, 200 / Y: 0, 50<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 1, -210 / Y: 0, 10 (правый верхний угол)<br>
    &nbsp;&nbsp;• <strong>TextColor3</strong> → белый<br>
    &nbsp;&nbsp;• <strong>TextScaled</strong> → ✅<br>
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → тёмный<br>
    &nbsp;&nbsp;• <strong>BackgroundTransparency</strong> → 0.3</li>
</ol>

<h4>👆 Шаг 3 — Создай кнопку для нажатий:</h4>
<ol>
  <li>ScoreGui → <strong>Insert Object → TextButton</strong> → переименуй в <strong>ClickBtn</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>Text</strong> → + Нажми!<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0, 160 / Y: 0, 60<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 0.5, -80 / Y: 1, -80 (по центру снизу)<br>
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → Bright green<br>
    &nbsp;&nbsp;• <strong>TextColor3</strong> → белый<br>
    &nbsp;&nbsp;• <strong>TextScaled</strong> → ✅</li>
</ol>

<h4>👆 Шаг 4 — Добавь LocalScript в ScoreGui:</h4>
<div class="code-block"><div class="code-header">LocalScript внутри ScoreGui</div><pre>-- Находим надпись и кнопку
local scoreLabel = script.Parent:WaitForChild("ScoreLabel")
local clickBtn   = script.Parent:WaitForChild("ClickBtn")

-- Начальное количество очков
local score = 0

-- Нажатие на кнопку
clickBtn.MouseButton1Click:Connect(function()

    -- Увеличиваем очки на 1
    score = score + 1

    -- Обновляем текст надписи
    scoreLabel.Text = "Очки: " .. score

    -- Проверяем: достигли ли 10 очков?
    if score >= 10 then
        -- Меняем цвет текста на золотой!
        scoreLabel.TextColor3 = Color3.fromRGB(255, 215, 0)
        scoreLabel.Text = "🏆 Очки: " .. score
    end

    -- Проверяем: достигли ли 25 очков?
    if score >= 25 then
        scoreLabel.Text = "⭐ СУПЕР! Очки: " .. score
    end
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• ScoreLabel показывает «Очки: 0» в начале? ✅<br>• При каждом нажатии число растёт? ✅<br>• При 10 очках текст становится золотым? ✅<br>• При 25 появляется «СУПЕР!»? ✅</p>`,
      hint: "Color3.fromRGB(255, 215, 0) — это золотой цвет. RGB это три числа: красный, зелёный, синий — каждое от 0 до 255. Попробуй изменить эти числа чтобы получить другой цвет!",
      difficulty: "easy",
      solution: "local scoreLabel = script.Parent:WaitForChild('ScoreLabel')\nlocal clickBtn = script.Parent:WaitForChild('ClickBtn')\nlocal score = 0\nclickBtn.MouseButton1Click:Connect(function()\n    score = score + 1\n    scoreLabel.Text = 'Очки: ' .. score\n    if score >= 10 then\n        scoreLabel.TextColor3 = Color3.fromRGB(255,215,0)\n        scoreLabel.Text = '🏆 Очки: ' .. score\n    end\n    if score >= 25 then\n        scoreLabel.Text = '⭐ СУПЕР! Очки: ' .. score\n    end\nend)",
    },
    {
      title: "Полоска здоровья на экране",
      desc: `<p>Сделаем красивую полоску здоровья! Она заполнена зелёным цветом и уменьшается когда игрок получает урон.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Внизу экрана полоска здоровья. Зелёная часть показывает сколько HP осталось. Когда здоровье ниже 30% — полоска становится красной.</p>

<h4>👆 Шаг 1 — Создай ScreenGui:</h4>
<ol>
  <li>StarterGui → <strong>Insert Object → ScreenGui</strong> → переименуй в <strong>HealthGui</strong></li>
</ol>

<h4>👆 Шаг 2 — Создай фон полоски (серый):</h4>
<ol>
  <li>HealthGui → <strong>Insert Object → Frame</strong> → переименуй в <strong>HealthBg</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0, 300 / Y: 0, 30<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 0.5, -150 / Y: 1, -50 (внизу по центру)<br>
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → тёмно-серый<br>
    &nbsp;&nbsp;• <strong>BorderSizePixel</strong> → 0</li>
</ol>

<h4>👆 Шаг 3 — Создай зелёную полоску внутри фона:</h4>
<ol>
  <li>Правой кнопкой на <strong>HealthBg → Insert Object → Frame</strong> → переименуй в <strong>HealthFill</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 1, 0 / Y: 1, 0 (на весь фон, 100%)<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 0, 0 / Y: 0, 0<br>
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → Bright green<br>
    &nbsp;&nbsp;• <strong>BorderSizePixel</strong> → 0</li>
</ol>

<h4>👆 Шаг 4 — Создай надпись с числом HP:</h4>
<ol>
  <li>Правой кнопкой на <strong>HealthBg → Insert Object → TextLabel</strong> → переименуй в <strong>HealthText</strong></li>
  <li>В Properties: Size → X:1,0 / Y:1,0 · Position → X:0,0/Y:0,0 · Text → 100/100 · TextColor3 → белый · TextScaled → ✅ · BackgroundTransparency → 1</li>
</ol>

<h4>👆 Шаг 5 — Добавь LocalScript в HealthGui:</h4>
<div class="code-block"><div class="code-header">LocalScript внутри HealthGui</div><pre>-- Получаем игрока и его персонажа
local player    = game.Players.LocalPlayer

-- Ждём пока персонаж загрузится в игре
local character = player.CharacterAdded:Wait()

-- Находим Humanoid — компонент который хранит здоровье
local humanoid  = character:WaitForChild("Humanoid")

-- Находим наши GUI-элементы
local healthFill = script.Parent:WaitForChild("HealthBg"):WaitForChild("HealthFill")
local healthText = script.Parent:WaitForChild("HealthBg"):WaitForChild("HealthText")

-- Функция обновления полоски здоровья
local function updateHealth(currentHealth)
    -- Считаем процент здоровья (от 0 до 1)
    local maxHealth = humanoid.MaxHealth
    local percent   = currentHealth / maxHealth

    -- Меняем ширину зелёной полоски
    -- X: percent — это доля от общей ширины
    healthFill.Size = UDim2.new(percent, 0, 1, 0)

    -- Обновляем текст
    healthText.Text = math.floor(currentHealth) .. " / " .. maxHealth

    -- Меняем цвет: зелёный при полном HP, красный при низком
    if percent > 0.3 then
        -- Больше 30% — зелёный цвет
        healthFill.BackgroundColor3 = Color3.fromRGB(0, 200, 0)
    else
        -- Меньше 30% — красный! Опасность!
        healthFill.BackgroundColor3 = Color3.fromRGB(220, 0, 0)
    end
end

-- Следим за изменением здоровья
-- HealthChanged срабатывает каждый раз когда HP меняется
humanoid.HealthChanged:Connect(function(newHealth)
    updateHealth(newHealth)
end)

-- Сразу показываем текущее здоровье при старте
updateHealth(humanoid.Health)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Полоска видна внизу экрана? ✅<br>• Показывает «100 / 100»? ✅<br>• Если получить урон (упасть в воду или лаву) — полоска уменьшается? ✅<br>• При низком HP становится красной? ✅</p>`,
      hint: "CharacterAdded:Wait() — ждёт пока персонаж появится в игре. Это важно! Без этой строки скрипт попытается найти Humanoid до того как персонаж загрузится и ничего не найдёт. UDim2.new(percent, 0, 1, 0) — меняем только ширину (X), высота остаётся 100%.",
      difficulty: "medium",
      solution: "local player = game.Players.LocalPlayer\nlocal character = player.CharacterAdded:Wait()\nlocal humanoid = character:WaitForChild('Humanoid')\nlocal fill = script.Parent:WaitForChild('HealthBg'):WaitForChild('HealthFill')\nlocal txt = script.Parent:WaitForChild('HealthBg'):WaitForChild('HealthText')\nlocal function update(hp)\n    local pct = hp / humanoid.MaxHealth\n    fill.Size = UDim2.new(pct, 0, 1, 0)\n    txt.Text = math.floor(hp) .. ' / ' .. humanoid.MaxHealth\n    fill.BackgroundColor3 = pct > 0.3 and Color3.fromRGB(0,200,0) or Color3.fromRGB(220,0,0)\nend\nhumanoid.HealthChanged:Connect(update)\nupdate(humanoid.Health)",
    },
    {
      title: "Меню с тремя вкладками",
      desc: `<p>Финальное задание — настоящее меню с вкладками как в больших играх! Три кнопки переключают три разных экрана.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Меню с тремя вкладками: «🏠 Главная», «⚙️ Настройки», «❓ Помощь». Нажимаешь на вкладку — показывается нужная панель, активная вкладка подсвечивается.</p>

<h4>👆 Шаг 1 — Создай ScreenGui и главный Frame:</h4>
<ol>
  <li>StarterGui → <strong>Insert Object → ScreenGui</strong> → переименуй в <strong>TabGui</strong></li>
  <li>TabGui → <strong>Insert Object → Frame</strong> → переименуй в <strong>Window</strong></li>
  <li>Window в Properties:<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0, 400 / Y: 0, 300<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 0.5, -200 / Y: 0.5, -150 (по центру)<br>
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → тёмно-серый<br>
    &nbsp;&nbsp;• <strong>BorderSizePixel</strong> → 0</li>
</ol>

<h4>👆 Шаг 2 — Создай панель вкладок (верхняя полоса):</h4>
<ol>
  <li>Window → <strong>Insert Object → Frame</strong> → переименуй в <strong>TabBar</strong></li>
  <li>TabBar: Size → X:1,0 / Y:0,40 · Position → X:0,0 / Y:0,0 · BackgroundColor3 → чёрный</li>
  <li>Внутри TabBar создай три TextButton:<br>
    &nbsp;&nbsp;• <strong>TabHome</strong> — Text: «🏠 Главная», Size: X:0.33,0 / Y:1,0, Position: X:0,0/Y:0,0<br>
    &nbsp;&nbsp;• <strong>TabSettings</strong> — Text: «⚙️ Настройки», Size: X:0.33,0 / Y:1,0, Position: X:0.33,0/Y:0,0<br>
    &nbsp;&nbsp;• <strong>TabHelp</strong> — Text: «❓ Помощь», Size: X:0.34,0 / Y:1,0, Position: X:0.66,0/Y:0,0</li>
  <li>Все три кнопки: BackgroundColor3 → тёмно-серый, TextColor3 → белый, TextScaled → ✅, BorderSizePixel → 0</li>
</ol>

<h4>👆 Шаг 3 — Создай три панели содержимого:</h4>
<ol>
  <li>Window → <strong>Insert Object → Frame</strong> → переименуй в <strong>PageHome</strong><br>
    Size: X:1,0/Y:1,-40 · Position: X:0,0/Y:0,40 · BackgroundTransparency:1<br>
    Добавь внутрь TextLabel с текстом «Добро пожаловать в игру!»</li>
  <li>Window → <strong>Insert Object → Frame</strong> → переименуй в <strong>PageSettings</strong><br>
    Size и Position те же. Visible → ❌. Добавь TextLabel «Настройки пока пусты»</li>
  <li>Window → <strong>Insert Object → Frame</strong> → переименуй в <strong>PageHelp</strong><br>
    Size и Position те же. Visible → ❌. Добавь TextLabel «Если что-то сломалось — перезапусти игру!»</li>
</ol>

<h4>👆 Шаг 4 — Добавь LocalScript в Window:</h4>
<div class="code-block"><div class="code-header">LocalScript внутри Window</div><pre>-- Получаем все вкладки (кнопки)
local tabBar      = script.Parent:WaitForChild("TabBar")
local tabHome     = tabBar:WaitForChild("TabHome")
local tabSettings = tabBar:WaitForChild("TabSettings")
local tabHelp     = tabBar:WaitForChild("TabHelp")

-- Получаем все страницы (панели)
local pageHome     = script.Parent:WaitForChild("PageHome")
local pageSettings = script.Parent:WaitForChild("PageSettings")
local pageHelp     = script.Parent:WaitForChild("PageHelp")

-- Цвета вкладок: активная и неактивная
local activeColor   = Color3.fromRGB(70, 130, 180)  -- синий — активная
local inactiveColor = Color3.fromRGB(50, 50, 50)    -- тёмный — неактивная

-- Функция переключения вкладок
-- Принимает: какую страницу показать и какую кнопку подсветить
local function switchTab(activePage, activeTab)

    -- Скрываем все страницы
    pageHome.Visible     = false
    pageSettings.Visible = false
    pageHelp.Visible     = false

    -- Сбрасываем цвет всех кнопок на неактивный
    tabHome.BackgroundColor3     = inactiveColor
    tabSettings.BackgroundColor3 = inactiveColor
    tabHelp.BackgroundColor3     = inactiveColor

    -- Показываем нужную страницу
    activePage.Visible = true

    -- Подсвечиваем активную вкладку синим
    activeTab.BackgroundColor3 = activeColor
end

-- Подключаем кнопки к функции переключения
tabHome.MouseButton1Click:Connect(function()
    switchTab(pageHome, tabHome)
end)

tabSettings.MouseButton1Click:Connect(function()
    switchTab(pageSettings, tabSettings)
end)

tabHelp.MouseButton1Click:Connect(function()
    switchTab(pageHelp, tabHelp)
end)

-- При старте показываем главную вкладку
switchTab(pageHome, tabHome)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Три кнопки-вкладки видны сверху окна? ✅<br>• При нажатии на вкладку меняется содержимое? ✅<br>• Активная вкладка подсвечивается синим? ✅<br>• По умолчанию открыта «Главная»? ✅</p>`,
      hint: "PageSettings и PageHelp должны быть скрыты по умолчанию (Visible = false в Properties). Только PageHome видна сразу. Функция switchTab сначала скрывает ВСЕ, потом показывает только нужную — это удобный приём!",
      difficulty: "hard",
      solution: "local tb = script.Parent:WaitForChild('TabBar')\nlocal th = tb:WaitForChild('TabHome')\nlocal ts = tb:WaitForChild('TabSettings')\nlocal thelp = tb:WaitForChild('TabHelp')\nlocal ph = script.Parent:WaitForChild('PageHome')\nlocal ps = script.Parent:WaitForChild('PageSettings')\nlocal phelp = script.Parent:WaitForChild('PageHelp')\nlocal ac = Color3.fromRGB(70,130,180)\nlocal ic = Color3.fromRGB(50,50,50)\nlocal function sw(page,tab)\n    ph.Visible=false ps.Visible=false phelp.Visible=false\n    th.BackgroundColor3=ic ts.BackgroundColor3=ic thelp.BackgroundColor3=ic\n    page.Visible=true tab.BackgroundColor3=ac\nend\nth.MouseButton1Click:Connect(function() sw(ph,th) end)\nts.MouseButton1Click:Connect(function() sw(ps,ts) end)\nthelp.MouseButton1Click:Connect(function() sw(phelp,thelp) end)\nsw(ph,th)",
    },
  ],
};