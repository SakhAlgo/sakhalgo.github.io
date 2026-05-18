const theme2 = {
  id: 2,
  title: "Волшебные кнопки и секретные сообщения. Часть 1",
  theory: {
    title: "Как заставить кнопки работать",
    subtitle: "ClickDetector, RemoteEvent, ReplicatedStorage",
    content: `<p>В Roblox есть особый способ реагировать на действия игрока. Нажал на кнопку, коснулся блока — происходит что-то интересное! Это называется <strong>События (Events)</strong>.</p>

      <h3 style="color:var(--accent);margin-top:24px">🖱️ ClickDetector — волшебный датчик клика</h3>
      <p><strong>ClickDetector</strong> — это невидимка, который делает любой блок кликабельным. Добавил его внутрь блока — и по блоку можно нажимать мышкой прямо в игре!</p>
      <div class="info-box success"><strong>💡 Как добавить:</strong> Нажми правой кнопкой на блок в Explorer → Insert Object → ClickDetector. Готово!</div>

      <h3 style="color:var(--accent);margin-top:24px">📦 ReplicatedStorage — общий сундук</h3>
      <p><strong>ReplicatedStorage</strong> — это папка, которую видят и сервер, и все игроки. Туда кладут <strong>RemoteEvent</strong> — специальные штуки для общения между скриптами.</p>

      <h3 style="color:var(--accent);margin-top:24px">🌐 Как работает связь</h3>
      <p>Иногда нужно, чтобы скрипты общались друг с другом. Для этого используют RemoteEvent. Один скрипт говорит: "Эй, сервер!" — а другой отвечает.</p>
      <div class="code-block"><div class="code-header">Как отправить секретное сообщение</div><pre>-- Первый скрипт (например, на кнопке):
remote:FireServer()   -- "Сервер, я нажал!"

-- Второй скрипт (на сервере) ловит:
remote.OnServerEvent:Connect(function(player)
    -- Делаем что-то волшебное
end)</pre></div>`,
  },
  tasks: [
    {
      title: "🎨 Кнопка-хамелеон",
      desc: `<p>Сделай кнопку, которая меняет цвет когда на неё нажимают!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Красный куб стоит на земле. Нажал на него — стал зелёным!</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Правой кнопкой на <strong>Workspace</strong> → <strong>Insert Object → Part</strong>.</li>
  <li>Назови её <strong>ColorButton</strong>.</li>
  <li>В Properties настрой:<br>
      • <strong>BrickColor</strong> → Bright red<br>
      • <strong>Size</strong> → 4, 1, 4<br>
      • <strong>Anchored</strong> → ✅ галочка</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь датчик клика:</h4>
<ol>
  <li>Правой кнопкой на <strong>ColorButton</strong> → <strong>Insert Object → ClickDetector</strong>.</li>
  <li>Теперь блок можно нажимать мышкой!</li>
</ol>

<h4>🖱️ Шаг 3 — Добавь скрипт внутрь кнопки:</h4>
<ol>
  <li>Правой кнопкой на <strong>ColorButton</strong> → <strong>Insert Object → Script</strong>.</li>
  <li>Скопируй этот код (нажми на кнопку ниже):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри ColorButton</div>
  <pre id="code2_1">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")

clickDetector.MouseClick:Connect(function(player)
    -- Меняем цвет на зелёный
    button.BrickColor = BrickColor.new("Bright green")
    
    -- Пишем кто нажал
    print(player.Name .. " нажал на кнопку!")
end)</pre>
</div>
<button class="copy-btn" data-code="code2_1" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Внутри ColorButton есть ClickDetector и Script?<br>• Кнопка красная до нажатия?<br>• После клика стала зелёной?</p>`,
      hint: "ClickDetector должен лежать ВНУТРИ ColorButton в Explorer, рядом со скриптом!",
      difficulty: "easy",
    },
    {
      title: "💡 Выключатель света",
      desc: `<p>Сделай кнопку-переключатель! Нажал раз — зелёная, нажал ещё раз — красная.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Кнопка меняет цвет при каждом нажатии: красный → зелёный → красный → зелёный.</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Part в Workspace, назови <strong>SwitchButton</strong>.</li>
  <li>Размер: 3, 3, 3, цвет: Bright red, Anchored: ✅.</li>
  <li>Добавь внутрь <strong>ClickDetector</strong>.</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт внутрь кнопки:</h4>
<ol>
  <li>Правой кнопкой на SwitchButton → Insert Object → Script.</li>
  <li>Скопируй код (нажми на кнопку ниже):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри SwitchButton</div>
  <pre id="code2_2">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")

-- Состояние: включена ли кнопка? (false = выключена, красная)
local isOn = false

clickDetector.MouseClick:Connect(function(player)
    -- Меняем состояние на противоположное
    isOn = not isOn
    
    if isOn then
        button.BrickColor = BrickColor.new("Bright green")
        print("💡 Свет включён!")
    else
        button.BrickColor = BrickColor.new("Bright red")
        print("💡 Свет выключен!")
    end
end)</pre>
</div>
<button class="copy-btn" data-code="code2_2" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Первый клик — зелёный?<br>• Второй клик — снова красный?<br>• Третий — опять зелёный?</p>`,
      hint: "isOn = not isOn переворачивает значение: было false → стало true, было true → стало false.",
      difficulty: "easy",
    },
    {
      title: "🚪 Кнопка открывает дверь",
      desc: `<p>Сделай дверь, которая открывается по кнопке!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Нажал на кнопку — дверь стала прозрачной. Через 5 секунд снова закрылась.</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Part в Workspace, назови <strong>DoorButton</strong>.</li>
  <li>Размер: 3, 1, 3, цвет: Bright yellow, Anchored: ✅.</li>
  <li>Добавь внутрь <strong>ClickDetector</strong>.</li>
</ol>

<h4>🖱️ Шаг 2 — Создай дверь:</h4>
<ol>
  <li>Part в Workspace, назови <strong>Door</strong>.</li>
  <li>Размер: 1, 8, 4, цвет: Brown (коричневый), Anchored: ✅.</li>
  <li>Поставь дверь рядом с кнопкой (инструмент Move — клавиша W).</li>
</ol>

<h4>🖱️ Шаг 3 — Добавь скрипт внутрь DoorButton:</h4>
<ol>
  <li>Правой кнопкой на DoorButton → Insert Object → Script.</li>
  <li>Скопируй код (нажми на кнопку ниже):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри DoorButton</div>
  <pre id="code2_3">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")
local door = workspace:WaitForChild("Door")
local isOpen = false

clickDetector.MouseClick:Connect(function(player)
    if isOpen then
        print("Дверь уже открыта!")
        return
    end
    
    isOpen = true
    
    -- Открываем дверь
    door.Transparency = 0.5
    door.CanCollide = false
    
    print("🚪 Дверь открылась!")
    
    -- Ждём 5 секунд
    task.wait(5)
    
    -- Закрываем дверь
    door.Transparency = 0
    door.CanCollide = true
    isOpen = false
    
    print("🚪 Дверь закрылась!")
end)</pre>
</div>
<button class="copy-btn" data-code="code2_3" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Дверь стоит рядом с кнопкой?<br>• Нажал — дверь стала прозрачной?<br>• Через 5 секунд снова закрылась?</p>`,
      hint: "CanCollide = false — сквозь дверь можно пройти. Transparency = 0.5 — дверь полупрозрачная, видно что открыта.",
      difficulty: "medium",
    },
    {
      title: "🔊 Говорящая кнопка",
      desc: `<p>Сделай кнопку, которая показывает сообщение всем игрокам!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Нажал на кнопку — в чате игры появилось "Привет от [имя игрока]!"</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Part в Workspace, назови <strong>ChatButton</strong>.</li>
  <li>Размер: 4, 1, 4, цвет: Bright purple, Anchored: ✅.</li>
  <li>Добавь внутрь <strong>ClickDetector</strong>.</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт внутрь кнопки:</h4>
<ol>
  <li>Правой кнопкой на ChatButton → Insert Object → Script.</li>
  <li>Скопируй код (нажми на кнопку ниже):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри ChatButton</div>
  <pre id="code2_4">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")

clickDetector.MouseClick:Connect(function(player)
    -- Отправляем сообщение в чат всем игрокам
    game:GetService("Chat"):Chat(button, "Привет от " .. player.Name .. "!")
    
    -- Красивые эффекты
    button.BrickColor = BrickColor.new("Bright green")
    task.wait(0.3)
    button.BrickColor = BrickColor.new("Bright purple")
    
    print(player.Name .. " поздоровался!")
end)</pre>
</div>
<button class="copy-btn" data-code="code2_4" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• При клике в чате появляется сообщение?<br>• Кнопка мигает зелёным?<br>• В Output видно кто нажал?</p>`,
      hint: "Чат можно открыть клавишей / или нажав на значок чата в правом верхнем углу экрана во время игры.",
      difficulty: "easy",
    },
    {
      title: "🎲 Случайный приз",
      desc: `<p>Сделай кнопку-сундук! Нажимаешь — получаешь случайный цвет.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Кнопка при нажатии меняет цвет на случайный из 5 вариантов.</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Part в Workspace, назови <strong>RandomButton</strong>.</li>
  <li>Размер: 3, 1, 3, цвет: Bright orange, Anchored: ✅.</li>
  <li>Добавь внутрь <strong>ClickDetector</strong>.</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт внутрь кнопки:</h4>
<ol>
  <li>Правой кнопкой на RandomButton → Insert Object → Script.</li>
  <li>Скопируй код (нажми на кнопку ниже):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри RandomButton</div>
  <pre id="code2_5">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")

-- Список возможных цветов
local colors = {
    "Bright red",
    "Bright blue", 
    "Bright green",
    "Bright yellow",
    "Bright orange",
    "Bright purple",
    "Bright pink"
}

clickDetector.MouseClick:Connect(function(player)
    -- Выбираем случайный цвет
    local randomIndex = math.random(1, #colors)
    local newColor = colors[randomIndex]
    
    -- Меняем цвет кнопки
    button.BrickColor = BrickColor.new(newColor)
    
    -- Делаем кнопку светящейся
    button.Material = Enum.Material.Neon
    
    print(player.Name .. " получил цвет: " .. newColor)
end)</pre>
</div>
<button class="copy-btn" data-code="code2_5" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• При каждом клике цвет меняется?<br>• Кнопка светится (Material: Neon)?<br>• В Output видно какой цвет выпал?</p>`,
      hint: "math.random(1, 7) выбирает число от 1 до 7. А #colors считает сколько цветов в списке (тоже 7).",
      difficulty: "medium",
    },
    {
      title: "🔐 Кодовый замок",
      desc: `<p>Сделай головоломку! Три кнопки — дверь открывается только если нажать их в правильном порядке.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Кнопки 1, 2, 3. Нажимай в порядке: жёлтая → красная → зелёная. Если порядок правильный — дверь открывается! Если ошибся — всё сбрасывается.</p>

<h4>🖱️ Шаг 1 — Создай три кнопки:</h4>
<ol>
  <li><strong>ButtonYellow</strong> → цвет: Bright yellow, размер: 3,3,3</li>
  <li><strong>ButtonRed</strong> → цвет: Bright red, размер: 3,3,3</li>
  <li><strong>ButtonGreen</strong> → цвет: Bright green, размер: 3,3,3</li>
  <li>В каждую добавь <strong>ClickDetector</strong></li>
  <li>Расставь кнопки в ряд</li>
</ol>

<h4>🖱️ Шаг 2 — Создай дверь:</h4>
<ol>
  <li>Part в Workspace, назови <strong>SecretDoor</strong>.</li>
  <li>Размер: 1, 8, 4, цвет: Dark grey, Anchored: ✅.</li>
</ol>

<h4>🖱️ Шаг 3 — Добавь скрипт в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на ServerScriptService → Insert Object → Script.</li>
  <li>Скопируй код (нажми на кнопку ниже):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт в ServerScriptService</div>
  <pre id="code2_6">-- Находим кнопки и дверь
local yellow = workspace:WaitForChild("ButtonYellow")
local red = workspace:WaitForChild("ButtonRed")
local green = workspace:WaitForChild("ButtonGreen")
local door = workspace:WaitForChild("SecretDoor")

-- Правильная последовательность (порядок нажатий)
local correctSequence = {"Yellow", "Red", "Green"}
local currentStep = 1  -- какая по счёту кнопка нужна
local progress = {}     -- что уже нажали

-- Функция для сброса головоломки
local function resetPuzzle()
    currentStep = 1
    progress = {}
    print("❌ Ошибка! Всё сброшено. Начинай заново!")
end

-- Функция для проверки кнопки
local function setupButton(button, colorName)
    local clickDetector = button:WaitForChild("ClickDetector")
    
    clickDetector.MouseClick:Connect(function(player)
        -- Проверяем: это та кнопка, которая нужна сейчас?
        if correctSequence[currentStep] == colorName then
            -- Правильно! Запоминаем
            table.insert(progress, colorName)
            currentStep = currentStep + 1
            
            -- Визуальный эффект
            button.Material = Enum.Material.Neon
            button.BrickColor = BrickColor.new("White")
            
            print("✅ " .. colorName .. " — правильно!")
            
            -- Проверяем: все три нажаты?
            if currentStep > 3 then
                print("🔓 УРА! Код верный! Дверь открывается!")
                
                -- Открываем дверь
                door.Transparency = 0.5
                door.CanCollide = false
                
                task.wait(5)
                
                -- Закрываем дверь
                door.Transparency = 0
                door.CanCollide = true
                
                -- Возвращаем кнопкам цвет и сбрасываем
                yellow.Material = Enum.Material.SmoothPlastic
                red.Material = Enum.Material.SmoothPlastic
                green.Material = Enum.Material.SmoothPlastic
                yellow.BrickColor = BrickColor.new("Bright yellow")
                red.BrickColor = BrickColor.new("Bright red")
                green.BrickColor = BrickColor.new("Bright green")
                
                resetPuzzle()
            end
        else
            -- Ошибка! Сбрасываем всё
            resetPuzzle()
            
            -- Возвращаем цвета кнопкам
            yellow.Material = Enum.Material.SmoothPlastic
            red.Material = Enum.Material.SmoothPlastic
            green.Material = Enum.Material.SmoothPlastic
            yellow.BrickColor = BrickColor.new("Bright yellow")
            red.BrickColor = BrickColor.new("Bright red")
            green.BrickColor = BrickColor.new("Bright green")
        end
    end)
end

-- Подключаем все кнопки
setupButton(yellow, "Yellow")
setupButton(red, "Red")
setupButton(green, "Green")

print("🔐 Кодовый замок готов! Порядок: Жёлтая → Красная → Зелёная")</pre>
</div>
<button class="copy-btn" data-code="code2_6" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Три кнопки стоят в ряд?<br>• У каждой есть ClickDetector?<br>• Если нажать жёлтую → красную → зелёную — дверь открывается?<br>• Если нажать не в том порядке — всё сбрасывается?</p>`,
      hint: "Правильный порядок: жёлтая → красная → зелёная. Попробуй сначала нажать красную — увидишь что всё сбрасывается!",
      difficulty: "hard",
    },
  ],
};

// Функция для копирования текста в буфер обмена
function setupCopyButtons() {
    const buttons = document.querySelectorAll('.copy-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const codeId = this.getAttribute('data-code');
            const codeElement = document.getElementById(codeId);
            
            if (codeElement) {
                const textToCopy = codeElement.textContent;
                
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalText = this.textContent;
                    this.textContent = '✅ Скопировано!';
                    this.style.background = '#4caf50';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '#2c3e50';
                    }, 1500);
                }).catch(err => {
                    console.error('Ошибка копирования: ', err);
                    alert('Не удалось скопировать код. Попробуй выделить код вручную и нажать Ctrl+C');
                });
            }
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCopyButtons);
} else {
    setupCopyButtons();
}