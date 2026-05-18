const theme9 = {
  id: 9,
  title: "Анимация и волшебные перемещения",
  theory: {
    title: "Как заставить предметы двигаться плавно",
    subtitle: "TweenService, ProximityPrompt, телепорты",
    content: `<p>Ты уже умеешь делать кнопки, которые меняют цвет. А теперь научимся делать <strong>движущиеся двери, прыгающие платформы и секретные телепорты</strong>! Это как оживить свою игровую площадку!</p>

      <h3 style="color:var(--accent);margin-top:24px">🎬 TweenService — Плавное движение</h3>
      <p><strong>TweenService</strong> — это как анимация в мультиках. Без него дверь просто *исчезает* и появляется в другом месте. А с ним она <strong>плавно открывается</strong> за 1 секунду! Красиво и волшебно.</p>
      <div class="info-box success"><strong>💡 Простыми словами:</strong> Tween — это "плавное превращение". Цвет, размер, положение — всё можно менять плавно!</div>

      <h3 style="color:var(--accent);margin-top:24px">👋 ProximityPrompt — кнопка без клика</h3>
      <p>Надоело нажимать на кнопку мышкой? <strong>ProximityPrompt</strong> — это когда ты просто <strong>подходишь к двери</strong>, и на экране появляется надпись "Нажми E, чтобы открыть". Нажал E — и чудо случилось!</p>
      <div class="info-box success"><strong>💡 Как добавить:</strong> Нажми правой кнопкой на деталь → Insert Object → ProximityPrompt. Готово!</div>

      <h3 style="color:var(--accent);margin-top:24px">✨ TeleportService — Мгновенный прыжок</h3>
      <p>Хочешь, чтобы игрок наступил на коврик и *раз — оказался на другой стороне карты*? Это <strong>телепорт</strong>! Как в Майнкрафте, только проще.</p>`,
  },
  tasks: [
    {
      title: "🚪 Плавно открывающаяся дверь",
      desc: `<p>Сделай дверь, которая не *исчезает*, а <strong>плавно уезжает вниз</strong> при нажатии на кнопку!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Нажал на кнопку — дверь плавно уезжает в пол за 1 секунду. Через 5 секунд возвращается обратно.</p>

<h4>🖱️ Шаг 1 — Создай кнопку и дверь:</h4>
<ol>
  <li><strong>Button</strong> — Part, размер 3×1×3, цвет жёлтый, Anchored: ✅.</li>
  <li>Добавь внутрь <strong>ClickDetector</strong>.</li>
  <li><strong>Door</strong> — Part, размер 4×5×1, цвет коричневый, Anchored: ✅.</li>
  <li>Поставь дверь над землёй (Y = 3) рядом с кнопкой.</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт внутрь Button:</h4>
<div class="code-block">
  <div class="code-header">📜 Скрипт внутри Button</div>
  <pre id="code3_1">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")
local door = workspace:WaitForChild("Door")

-- Нашли сервис для анимации
local TweenService = game:GetService("TweenService")

-- Где дверь была сначала? Запомним!
local doorStartPos = door.Position
-- Куда она поедет? На 5 единиц вниз
local doorEndPos = doorStartPos - Vector3.new(0, 5, 0)

-- Настройки анимации: 1 секунда, плавно
local tweenInfo = TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)

clickDetector.MouseClick:Connect(function(player)
    print(player.Name .. " нажал на кнопку!")
    
    -- Анимация открывания
    local tweenOpen = TweenService:Create(door, tweenInfo, {Position = doorEndPos})
    tweenOpen:Play()
    
    -- Ждём 5 секунд
    task.wait(5)
    
    -- Анимация закрывания
    local tweenClose = TweenService:Create(door, tweenInfo, {Position = doorStartPos})
    tweenClose:Play()
end)</pre>
</div>
<button class="copy-btn" data-code="code3_1">📋 Копировать код</button>

<h4>⭐ Что нового ты узнал:</h4>
<p>• <strong>TweenService</strong> делает плавные движения!<br>• <strong>Vector3.new(0, -5, 0)</strong> — двигаем предмет вниз по координате Y.</p>`,
      hint: "Если дверь уезжает не туда — проверь координаты. Чтобы дверь уезжала вниз, отнимай от Y (например, было Y=3, стало Y=-2).",
      difficulty: "easy",
    },
    {
      title: "🔴🟡 Кнопка-светофор",
      desc: `<p>Сделай кнопку, которая <strong>плавно меняет цвет</strong> как светофор!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Красный → жёлтый → зелёный → жёлтый → красный. И так по кругу при каждом нажатии.</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Part размером 4×1×4, цвет: Bright red, Anchored: ✅.</li>
  <li>Добавь ClickDetector внутрь.</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт:</h4>
<div class="code-block">
  <div class="code-header">📜 Скрипт внутри кнопки</div>
  <pre id="code3_2">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")
local TweenService = game:GetService("TweenService")

-- Шаги светофора (какой цвет какой по счёту)
local steps = {
    {name = "Bright red", wait = 2},
    {name = "Bright yellow", wait = 1},
    {name = "Bright green", wait = 2},
    {name = "Bright yellow", wait = 1}
}
local currentStep = 1
local isRunning = false

clickDetector.MouseClick:Connect(function(player)
    if isRunning then return end
    isRunning = true
    
    -- Начинаем с первого шага
    currentStep = 1
    
    while currentStep <= #steps and isRunning do
        local step = steps[currentStep]
        local color = BrickColor.new(step.name)
        
        -- Плавно меняем цвет за 0.5 секунды
        local tween = TweenService:Create(button, TweenInfo.new(0.5), {BrickColor = color})
        tween:Play()
        
        print("💡 Цвет: " .. step.name)
        
        -- Ждём сколько нужно
        task.wait(step.wait)
        currentStep = currentStep + 1
    end
    
    isRunning = false
    print("🟢 Светофор закончил!")
end)</pre>
</div>
<button class="copy-btn" data-code="code3_2">📋 Копировать код</button>

<h4>⭐ Что нового ты узнал:</h4>
<p>• Можно <strong>плавно менять цвет</strong>, а не мгновенно!<br>• <strong>Массив steps</strong> хранит порядок цветов.</p>`,
      hint: "Цвет меняется плавно за 0.5 секунды — смотри как красиво! Не нажимай кнопку несколько раз подряд, пока светофор не закончит.",
      difficulty: "easy",
    },
    {
      title: "👋 Подойди — дверь откроется (без мышки!)",
      desc: `<p>Сделай дверь, которая открывается, когда ты <strong>просто подходишь</strong> к ней! Никаких кнопок, только клавиша E.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Подошёл к двери → на экране появилось "Нажми E" → нажал E → дверь плавно открывается.</p>

<h4>🖱️ Шаг 1 — Создай дверь:</h4>
<ol>
  <li>Part, назови <strong>AutoDoor</strong>, размер 4×6×1, Anchored: ✅.</li>
  <li><strong>Правой кнопкой на дверь → Insert Object → ProximityPrompt</strong>.</li>
  <li>Внутри ProximityPrompt в Properties найди <strong>ActionText</strong> и напиши "Открыть дверь".</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт внутрь двери:</h4>
<div class="code-block">
  <div class="code-header">📜 Скрипт внутри AutoDoor</div>
  <pre id="code3_3">local door = script.Parent
local prompt = door:WaitForChild("ProximityPrompt")
local TweenService = game:GetService("TweenService")

local isOpen = false
local startPos = door.Position
local openPos = startPos + Vector3.new(0, -5, 0)  -- Вниз на 5
local tweenInfo = TweenInfo.new(0.8, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)

prompt.Triggered:Connect(function(player)
    if isOpen then
        -- Закрываем дверь
        local tweenClose = TweenService:Create(door, tweenInfo, {Position = startPos})
        tweenClose:Play()
        isOpen = false
        print("🚪 " .. player.Name .. " закрыл дверь")
    else
        -- Открываем дверь
        local tweenOpen = TweenService:Create(door, tweenInfo, {Position = openPos})
        tweenOpen:Play()
        isOpen = true
        print("🚪 " .. player.Name .. " открыл дверь")
    end
end)

print("✅ Подойди к двери и нажми E!")</pre>
</div>
<button class="copy-btn" data-code="code3_3">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Когда подходишь к двери, появляется "Нажми E"?<br>• Нажал E — дверь открылась?<br>• Нажал ещё раз — закрылась?</p>`,
      hint: "ProximityPrompt работает только когда игрок РЯДОМ с дверью. Поставь дверь на землю и подойди вплотную!",
      difficulty: "medium",
    },
    {
      title: "✨ Волшебный коврик-телепорт",
      desc: `<p>Сделай коврик, на который наступишь — и <strong>мгновенно телепортируешься</strong> в другое место!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Красный коврик на земле. Наступил на него — бац! И ты уже на синем коврике в другом конце комнаты.</p>

<h4>🖱️ Шаг 1 — Создай два коврика:</h4>
<ol>
  <li><strong>RedCarpet</strong> — Part, размер 3×0.2×3, цвет Bright red, Anchored: ✅. Поставь на землю.</li>
  <li><strong>BlueCarpet</strong> — Part, размер 3×0.2×3, цвет Bright blue, Anchored: ✅. Поставь подальше.</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт в RedCarpet:</h4>
<div class="code-block">
  <div class="code-header">📜 Скрипт внутри RedCarpet</div>
  <pre id="code3_4">local carpet = script.Parent
local blueCarpet = workspace:WaitForChild("BlueCarpet")

carpet.Touched:Connect(function(hit)
    -- Проверяем: это игрок наступил?
    local character = hit.Parent
    local player = game:GetService("Players"):GetPlayerFromCharacter(character)
    
    if player then
        -- Где стоит синий коврик?
        local teleportPosition = blueCarpet.Position + Vector3.new(0, 3, 0)
        
        -- Телепортируем игрока!
        character:SetPrimaryPartCFrame(CFrame.new(teleportPosition))
        
        print("✨ " .. player.Name .. " телепортировался!")
        
        -- Красивый эффект — коврик мигает
        carpet.BrickColor = BrickColor.new("Bright orange")
        task.wait(0.2)
        carpet.BrickColor = BrickColor.new("Bright red")
    end
end)

print("✅ Наступи на красный коврик — попадёшь на синий!")</pre>
</div>
<button class="copy-btn" data-code="code3_4">📋 Копировать код</button>

<h4>⭐ Что нового ты узнал:</h4>
<p>• <strong>Touched</strong> — событие касания (наступил на коврик)!<br>• <strong>SetPrimaryPartCFrame</strong> — телепортирует персонажа.</p>`,
      hint: "Чтобы игрок не застрял в полу, добавляй +3 к Y координате: было Y=0 → станет Y=3 (над ковриком).",
      difficulty: "medium",
    },
    {
      title: "🕹️ Секретная комната по кнопке",
      desc: `<p>Сделай стену, которая <strong>плавно исчезает</strong> при нажатии на секретную кнопку! Откроется проход в тайную комнату.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Стена стоит, перегораживает проход. Нажал на секретную кнопку — стена плавно становится прозрачной и пропадает. Через 5 секунд возвращается.</p>

<h4>🖱️ Шаг 1 — Создай стену и кнопку:</h4>
<ol>
  <li><strong>SecretWall</strong> — Part, размер 6×5×1, цвет Dark grey, Anchored: ✅.</li>
  <li><strong>SecretButton</strong> — маленькая Part за углом, цвет Bright orange, размер 2×1×2.</li>
  <li>Добавь в кнопку ClickDetector.</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт в SecretButton:</h4>
<div class="code-block">
  <div class="code-header">📜 Скрипт внутри SecretButton</div>
  <pre id="code3_5">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")
local wall = workspace:WaitForChild("SecretWall")
local TweenService = game:GetService("TweenService")

local isOpen = false

clickDetector.MouseClick:Connect(function(player)
    if isOpen then 
        print("Стена уже открыта!")
        return
    end
    
    isOpen = true
    
    print("🔓 " .. player.Name .. " открыл секретную стену!")
    
    -- Плавно исчезаем (прозрачность 0.7)
    local tween1 = TweenService:Create(wall, TweenInfo.new(0.5), {Transparency = 0.7})
    tween1:Play()
    
    task.wait(0.5)
    
    -- Полностью прозрачная и не мешает проходить
    local tween2 = TweenService:Create(wall, TweenInfo.new(0.5), {Transparency = 1})
    tween2:Play()
    wall.CanCollide = false
    
    task.wait(5)
    
    -- Возвращаем стену обратно
    local tween3 = TweenService:Create(wall, TweenInfo.new(0.5), {Transparency = 0.5})
    tween3:Play()
    
    task.wait(0.5)
    
    local tween4 = TweenService:Create(wall, TweenInfo.new(0.3), {Transparency = 0})
    tween4:Play()
    wall.CanCollide = true
    isOpen = false
    
    print("🔒 Стена вернулась на место!")
end)</pre>
</div>
<button class="copy-btn" data-code="code3_5">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Спрятал ли ты кнопку за углом?<br>• Стена плавно исчезает?<br>• Сквозь неё можно пройти, когда она прозрачная?</p>`,
      hint: "CanCollide = false — это волшебное свойство, которое разрешает проходить сквозь предмет! Не забудь его вернуть обратно.",
      difficulty: "hard",
    },
    {
      title: "🏆 Собери 3 монеты — откроется сундук",
      desc: `<p>Сделай настоящий квест! Разбросай по карте 3 монеты. Когда игрок <strong>соберёт все</strong> — откроется сундук с сокровищем!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Три золотых монеты на карте. Коснулся монеты — она исчезает и пишет в чате "1/3 найдено". Собрал все три — сундук открывается!</p>

<h4>🖱️ Шаг 1 — Создай монетки и сундук:</h4>
<ol>
  <li><strong>Chest</strong> — Part, размер 3×2×3, цвет Bright yellow, Anchored: ✅.</li>
  <li><strong>Coin1, Coin2, Coin3</strong> — Part, размер 1×0.3×1, цвет Bright yellow, Anchored: ✅, материал Neon.</li>
  <li>Разбросай монетки в разных местах.</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт в ServerScriptService:</h4>
<div class="code-block">
  <div class="code-header">📜 Скрипт в ServerScriptService</div>
  <pre id="code3_6">-- Находим всё на карте
local chest = workspace:WaitForChild("Chest")
local coins = {
    workspace:WaitForChild("Coin1"),
    workspace:WaitForChild("Coin2"),
    workspace:WaitForChild("Coin3")
}

local TweenService = game:GetService("TweenService")

-- Сколько монет собрал каждый игрок?
local playerCoins = {}

-- Функция для открытия сундука
local function openChest(player)
    print("🏆 " .. player.Name .. " открыл сундук!")
    
    -- Плавно меняем цвет сундука
    local tween = TweenService:Create(chest, TweenInfo.new(0.5), {BrickColor = BrickColor.new("Bright green")})
    tween:Play()
    
    -- Пишем в чат
    game:GetService("Chat"):Chat(chest, "Сундук открыт! 🎉")
    
    -- Подпрыгиваем от радости
    for i = 1, 3 do
        local jumpTween = TweenService:Create(chest, TweenInfo.new(0.2), {Position = chest.Position + Vector3.new(0, 1, 0)})
        jumpTween:Play()
        task.wait(0.2)
        local downTween = TweenService:Create(chest, TweenInfo.new(0.2), {Position = chest.Position - Vector3.new(0, 1, 0)})
        downTween:Play()
        task.wait(0.2)
    end
end

-- Настраиваем каждую монетку
for _, coin in ipairs(coins) do
    coin.Touched:Connect(function(hit)
        local character = hit.Parent
        local player = game:GetService("Players"):GetPlayerFromCharacter(character)
        
        if not player then return end
        
        -- Если монета уже исчезла
        if not coin.Parent then return end
        
        -- Считаем монеты для этого игрока
        if not playerCoins[player] then
            playerCoins[player] = 0
        end
        
        -- Если эту монету игрок ещё не брал
        if coin:GetAttribute("owner") == nil then
            coin:SetAttribute("owner", player.Name)
            playerCoins[player] = playerCoins[player] + 1
            
            -- Волшебный эффект — монета исчезает
            coin.Transparency = 1
            coin.CanCollide = false
            
            print("💰 " .. player.Name .. " нашёл монету! (" .. playerCoins[player] .. "/3)")
            game:GetService("Chat"):Chat(coin, player.Name .. " нашёл монету! " .. playerCoins[player] .. "/3")
            
            -- Проверяем: все ли 3 монеты собраны?
            if playerCoins[player] >= 3 then
                openChest(player)
            end
        end
    end)
end

print("🪙 Квест запущен! Найди 3 монеты и открой сундук!")</pre>
</div>
<button class="copy-btn" data-code="code3_6">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Все монетки лежат на видных местах?<br>• При касании монета исчезает?<br>• Собрал 3 монеты — сундук позеленел и подпрыгнул?</p>`,
      hint: "Монетки будут исчезать для каждого игрока отдельно? Нет, в этом коде монета исчезает для ВСЕХ, когда первый игрок её коснулся. Так интереснее — кто первый найдёт!",
      difficulty: "hard",
    },
  ],
};

// Функция для копирования (оставляем как было)
function setupCopyButtons() {
    const buttons = document.querySelectorAll('.copy-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const codeId = this.getAttribute('data-code');
            const codeElement = document.getElementById(codeId);
            if (codeElement) {
                navigator.clipboard.writeText(codeElement.textContent).then(() => {
                    const originalText = this.textContent;
                    this.textContent = '✅ Скопировано!';
                    this.style.background = '#4caf50';
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '#2c3e50';
                    }, 1500);
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