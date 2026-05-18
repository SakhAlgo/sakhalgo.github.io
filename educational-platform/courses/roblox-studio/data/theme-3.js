const theme3 = {
  id: 3,
  title: "Волшебные кнопки и секретные сообщения. Часть 2",
  theory: {
    title: "Как заставить кнопки работать",
    subtitle: "ClickDetector, RemoteEvent, ReplicatedStorage",
    content: `<p>Представь, что ты делаешь игру, в которой можно нажимать на кнопки, открывать двери или получать сюрпризы. Чтобы это работало, нужны особые <strong>помощники</strong>!</p>

      <h3 style="color:var(--accent);margin-top:24px">🖱️ ClickDetector — невидимый слушатель</h3>
      <p><strong>ClickDetector</strong> — это как невидимый микрофон, который ты кладёшь внутрь кубика. Когда игрок нажимает на этот кубик мышкой, детектор «слышит» клик и говорит: «Эй, кто-то нажал!»</p>
      <div class="info-box success"><strong>💡 Как добавить:</strong> Нажми правой кнопкой на кубик в Explorer → Insert Object → ClickDetector.</div>

      <h3 style="color:var(--accent);margin-top:24px">📦 ReplicatedStorage — волшебный сундук</h3>
      <p><strong>ReplicatedStorage</strong> — это специальный сундук, который видят все: и сервер, и каждый игрок. Туда мы кладём <strong>RemoteEvent</strong> — волшебные письма, чтобы скрипты могли общаться друг с другом.</p>

      <h3 style="color:var(--accent);margin-top:24px">🌐 Как скрипты общаются</h3>
      <p>Иногда одному скрипту нужно что-то сказать другому. Например: «Сервер, игрок нажал на красную кнопку!» Для этого используется <strong>RemoteEvent</strong>.</p>
      <div class="code-block"><div class="code-header">📨 Как отправить сообщение</div><pre>-- Скрипт на кнопке (у игрока):
remote:FireServer("Красная кнопка нажата!")

-- Скрипт на сервере (ловит письмо):
remote.OnServerEvent:Connect(function(player, message)
    print(message) -- Напечатает: Красная кнопка нажата!
end)</pre></div>`,
  },
  tasks: [
    {
      title: "🐢 Черепаха-невидимка",
      desc: `<p>Сделай кнопку, которая заставляет черепаху появляться и исчезать!</p>

<h4>🎯 Что должно получиться:</h4>
<p>В игре стоят: красная кнопка и черепаха (или любой другой предмет). Нажал на кнопку — черепаха исчезла. Нажал ещё раз — появилась снова!</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Нажми правой кнопкой на <strong>Workspace</strong> → <strong>Insert Object → Part</strong>.</li>
  <li>Назови её <strong>InvisibleButton</strong>.</li>
  <li>В окне <strong>Properties</strong> настрой:<br>
      • <strong>BrickColor</strong> → Bright red<br>
      • <strong>Size</strong> → 3, 1, 3<br>
      • <strong>Anchored</strong> → ✅ галочка</li>
  <li>Добавь внутрь <strong>ClickDetector</strong>.</li>
</ol>

<h4>🖱️ Шаг 2 — Создай черепаху:</h4>
<ol>
  <li>Найди в Toolbox (панель слева, значок 🔧) и поищи <strong>"Turtle"</strong> или <strong>"Animal"</strong>.</li>
  <li>Выбери любую модель и нажми, чтобы она появилась в игре.</li>
  <li>Назови её <strong>Pet</strong> (или оставь как есть).</li>
  <li>Если не хочешь искать модель, просто создай Part зелёного цвета — это будет «черепаха».</li>
</ol>

<h4>🖱️ Шаг 3 — Добавь скрипт в кнопку:</h4>
<ol>
  <li>Правой кнопкой на InvisibleButton → Insert Object → Script.</li>
  <li>Скопируй этот код:</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри InvisibleButton</div>
  <pre id="code2_1">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")

-- Найди черепаху в Workspace (замени "Pet" на имя твоей модели)
local pet = workspace:WaitForChild("Pet")

local isHidden = false  -- спрятана ли черепаха?

clickDetector.MouseClick:Connect(function(player)
    if isHidden then
        -- Если спрятана, показываем
        pet.Visible = true
        isHidden = false
        print("🐢 Черепаха появилась!")
    else
        -- Если видна, прячем
        pet.Visible = false
        isHidden = true
        print("🐢 Черепаха спряталась!")
    end
end)</pre>
</div>
<button class="copy-btn" data-code="code2_1" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<p>⭐ <strong>Важно:</strong> Если твоя модель называется не "Pet", замени это имя в строчке <code>local pet = workspace:WaitForChild("Pet")</code> на своё!</p>

<h4>✅ Проверь себя:</h4>
<p>• Запусти игру. Черепаха видна?<br>• Нажми на красную кнопку — черепаха исчезла?<br>• Нажми ещё раз — появилась снова?</p>`,
      hint: "Если черепаха не исчезает, проверь: 1) Правильно ли написано имя модели? 2) У модели есть свойство Visible? У обычных частей (Part) оно есть. У сложных моделей — тоже.",
      difficulty: "easy",
    },
    {
      title: "🏃‍♂️ Кнопка-ускоритель",
      desc: `<p>Сделай кнопку, которая заставляет игрока бегать быстрее на 5 секунд!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Нажал на синюю кнопку — твой персонаж начинает бегать как молния. Через 5 секунд скорость становится обычной.</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Part в Workspace, назови <strong>SpeedButton</strong>.</li>
  <li>Размер: 3, 3, 3. Цвет: Bright blue. Anchored: ✅.</li>
  <li>Добавь внутрь <strong>ClickDetector</strong>.</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт в кнопку:</h4>
<ol>
  <li>Правой кнопкой на SpeedButton → Insert Object → Script.</li>
  <li>Скопируй код:</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри SpeedButton</div>
  <pre id="code2_2">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")

clickDetector.MouseClick:Connect(function(player)
    -- Находим персонажа игрока
    local character = player.Character
    if not character then return end  -- если персонажа нет, выходим
    
    -- Находим ноги персонажа (Humanoid — это его «мозг» для движения)
    local humanoid = character:WaitForChild("Humanoid")
    
    -- Запоминаем обычную скорость
    local normalSpeed = humanoid.WalkSpeed
    
    -- Устанавливаем супер-скорость (в 3 раза быстрее!)
    humanoid.WalkSpeed = normalSpeed * 3
    
    -- Кнопка мигает, чтобы показать, что скорость увеличилась
    button.BrickColor = BrickColor.new("Bright green")
    print("⚡ " .. player.Name .. " бежит быстрее на 5 секунд!")
    
    -- Ждём 5 секунд
    task.wait(5)
    
    -- Возвращаем обычную скорость
    humanoid.WalkSpeed = normalSpeed
    button.BrickColor = BrickColor.new("Bright blue")
    
    print("🐢 Скорость вернулась к обычной.")
end)</pre>
</div>
<button class="copy-btn" data-code="code2_2" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Запусти игру и подойди к синей кнопке.<br>• Нажми на неё и попробуй побегать — скорость увеличилась?<br>• Через 5 секунд скорость стала прежней?<br>• Кнопка мигнула зелёным?</p>`,
      hint: "Если скорость не изменилась, проверь окно Output — возможно, там ошибка. Иногда персонаж появляется не сразу, но скрипт это пережидает с помощью WaitForChild.",
      difficulty: "easy",
    },
    {
      title: "📢 Кричащая кнопка",
      desc: `<p>Сделай кнопку, которая «кричит» случайную фразу из списка!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Нажал на оранжевую кнопку — в чат вылетает случайная фраза: например, «Привет!» или «Иди сюда!» или «Сюрприз!»</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Part, назови <strong>ShoutButton</strong>. Размер: 4,1,4. Цвет: Bright orange. Anchored: ✅.</li>
  <li>Добавь внутрь <strong>ClickDetector</strong>.</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт:</h4>
<ol>
  <li>Правой кнопкой на ShoutButton → Insert Object → Script.</li>
  <li>Скопируй код:</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри ShoutButton</div>
  <pre id="code2_3">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")

-- Список фраз для крика
local phrases = {
    "🎉 Привет, народ! 🎉",
    "🍕 Иди сюда, тут пицца! 🍕",
    "⚡ Сюрпри-и-и-из! ⚡",
    "🦄 Я волшебная кнопка! 🦄",
    "⭐ Нажми на меня ещё раз! ⭐",
    "🚀 Полетели! 🚀"
}

clickDetector.MouseClick:Connect(function(player)
    -- Выбираем случайную фразу
    local randomIndex = math.random(1, #phrases)
    local message = phrases[randomIndex]
    
    -- Отправляем в чат от имени кнопки
    local chatService = game:GetService("Chat")
    chatService:Chat(button, message)
    
    -- Делаем красивый эффект: кнопка мигает разными цветами
    for i = 1, 3 do
        button.BrickColor = BrickColor.new("Bright yellow")
        task.wait(0.1)
        button.BrickColor = BrickColor.new("Bright orange")
        task.wait(0.1)
    end
    
    print(player.Name .. " заставил кнопку крикнуть: " .. message)
end)</pre>
</div>
<button class="copy-btn" data-code="code2_3" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Нажимай на кнопку много раз — в чате появляются разные фразы?<br>• Кнопка мигает жёлтым, когда кричит?<br>• Попробуй добавить свои фразы в список phrases!</p>`,
      hint: "Чтобы добавить свою фразу, напиши внутри фигурных скобок { } новую строчку в кавычках и запятой в конце. Например: \"🐱 Привет, котик!\"",
      difficulty: "easy",
    },
    {
      title: "🎈 Надувающийся шар",
      desc: `<p>Сделай кнопку, от которой шар становится больше с каждым нажатием!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Стоит маленький красный шар. Нажимаешь на кнопку — шар увеличивается. Нажал 3 раза — шар лопается и исчезает, а потом появляется новый.</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Part, назови <strong>InflateButton</strong>. Размер: 2,2,2. Цвет: Bright yellow. Anchored: ✅.</li>
  <li>Добавь внутрь <strong>ClickDetector</strong>.</li>
</ol>

<h4>🖱️ Шаг 2 — Создай шар:</h4>
<ol>
  <li>Part, назови <strong>Balloon</strong>. Размер: 2,2,2. Цвет: Bright red. Anchored: ✅ (пусть висит в воздухе).</li>
  <li>Можно сделать его круглым: в Properties → Shape → Ball.</li>
</ol>

<h4>🖱️ Шаг 3 — Добавь скрипт в кнопку:</h4>
<ol>
  <li>Правой кнопкой на InflateButton → Insert Object → Script.</li>
  <li>Скопируй код:</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри InflateButton</div>
  <pre id="code2_4">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")
local balloon = workspace:WaitForChild("Balloon")

local inflateCount = 0  -- сколько раз надули
local startSize = 2      -- начальный размер (2х2х2)

clickDetector.MouseClick:Connect(function(player)
    inflateCount = inflateCount + 1
    
    if inflateCount <= 3 then
        -- Увеличиваем шар: новый размер = старый + 1
        local newSize = startSize + inflateCount
        balloon.Size = Vector3.new(newSize, newSize, newSize)
        
        print("🎈 Шар надут " .. inflateCount .. " раз! Размер: " .. newSize)
        
        -- Меняем цвет при каждом надувании
        if inflateCount == 1 then
            balloon.BrickColor = BrickColor.new("Bright orange")
        elseif inflateCount == 2 then
            balloon.BrickColor = BrickColor.new("Bright yellow")
        elseif inflateCount == 3 then
            balloon.BrickColor = BrickColor.new("Bright green")
        end
    else
        -- Шар лопается!
        balloon.Visible = false
        print("💥 БАХ! Шар лопнул!")
        
        -- Делаем эффект хлопка (кнопка мигает красным)
        button.BrickColor = BrickColor.new("Bright red")
        task.wait(0.2)
        button.BrickColor = BrickColor.new("Bright yellow")
        
        -- Ждём 2 секунды и создаём новый шар
        task.wait(2)
        balloon.Visible = true
        balloon.Size = Vector3.new(startSize, startSize, startSize)
        balloon.BrickColor = BrickColor.new("Bright red")
        inflateCount = 0
        
        print("🎈 Появился новый шар! Можно надувать снова.")
    end
end)</pre>
</div>
<button class="copy-btn" data-code="code2_4" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Нажми на кнопку 1 раз — шар стал оранжевым и немного больше?<br>• Нажми 2 раза — жёлтый и ещё больше?<br>• Нажми 3 раза — зелёный?<br>• Нажми 4 раза — шар лопнул и исчез, а потом появился новый?</p>`,
      hint: "Vector3.new(x, y, z) — это три числа: ширина, высота, длина. Мы увеличиваем все три одинаково, чтобы шар рос равномерно.",
      difficulty: "medium",
    },
    {
      title: "🎣 Магнитная кнопка",
      desc: `<p>Сделай кнопку, которая притягивает к себе все мячики вокруг!</p>

<h4>🎯 Что должно получиться:</h4>
<p>По полу разбросаны маленькие мячики. Нажал на кнопку — все мячики сами прилетают к кнопке и исчезают (собираются).</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Part, назови <strong>MagnetButton</strong>. Размер: 3,1,3. Цвет: Bright purple. Anchored: ✅.</li>
  <li>Добавь внутрь <strong>ClickDetector</strong>.</li>
</ol>

<h4>🖱️ Шаг 2 — Создай мячики (5 штук):</h4>
<ol>
  <li>Создай Part, назови <strong>Ball1</strong>. Размер: 1,1,1. Цвет: Bright blue. <strong>Anchored: ❌</strong> (без галочки — мячик будет падать и катиться!).</li>
  <li>Поставь мячик недалеко от кнопки, но на расстоянии.</li>
  <li>Скопируй мячик 4 раза (Ctrl+C, Ctrl+V) и назови Ball2, Ball3, Ball4, Ball5.</li>
  <li>Разложи их вокруг кнопки в разных местах.</li>
</ol>

<h4>🖱️ Шаг 3 — Добавь скрипт в кнопку:</h4>
<ol>
  <li>Правой кнопкой на MagnetButton → Insert Object → Script.</li>
  <li>Скопируй код:</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри MagnetButton</div>
  <pre id="code2_5">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")

-- Находим все мячики
local balls = {
    workspace:WaitForChild("Ball1"),
    workspace:WaitForChild("Ball2"),
    workspace:WaitForChild("Ball3"),
    workspace:WaitForChild("Ball4"),
    workspace:WaitForChild("Ball5")
}

local collectedCount = 0

clickDetector.MouseClick:Connect(function(player)
    -- Эффект: кнопка светится
    button.Material = Enum.Material.Neon
    button.BrickColor = BrickColor.new("Bright white")
    
    print("🧲 Магнит включился! Собираем мячики...")
    
    -- Для каждого мячика
    for i, ball in ipairs(balls) do
        if ball and ball.Parent then  -- если мячик существует
            -- Телепортируем мячик к кнопке
            ball.Position = button.Position + Vector3.new(0, 1, 0)
            -- Делаем его маленьким и исчезающим
            ball.Size = Vector3.new(0.5, 0.5, 0.5)
            ball.Transparency = 0.5
            collectedCount = collectedCount + 1
            print("➕ Собран мячик " .. i)
            task.wait(0.1)  -- маленькая задержка между мячиками
        end
    end
    
    -- Поздравляем игрока
    local chatService = game:GetService("Chat")
    chatService:Chat(button, "🎉 " .. player.Name .. " собрал " .. collectedCount .. " мячиков! 🎉")
    
    print("🎉 Всего собрано мячиков: " .. collectedCount)
    
    -- Возвращаем кнопке обычный вид
    task.wait(1)
    button.Material = Enum.Material.SmoothPlastic
    button.BrickColor = BrickColor.new("Bright purple")
    
    -- Сбрасываем счётчик
    collectedCount = 0
end)</pre>
</div>
<button class="copy-btn" data-code="code2_5" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Все 5 мячиков разбросаны вокруг кнопки?<br>• Нажми на фиолетовую кнопку — мячики прилетели к ней?<br>• В чате появилось сообщение, сколько мячиков собрано?<br>• Можно ли нажать ещё раз и собрать их снова (мячики должны появиться на своих местах)?</p>`,
      hint: "Если хочешь, чтобы мячики появлялись заново на своих местах, нужно запомнить их начальные позиции. Это задание со звёздочкой — попробуй сделать это сам!",
      difficulty: "hard",
    },
    {
      title: "🎭 Кнопка-перевёртыш",
      desc: `<p>Сделай кнопку, которая меняет гравитацию на противоположную!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Нажал на кнопку — всё, что не приклеено к земле (Anchored: ❌), начинает лететь вверх. Через 3 секунды гравитация возвращается, и всё падает обратно.</p>

<h4>🖱️ Шаг 1 — Создай кнопку:</h4>
<ol>
  <li>Part, назови <strong>GravityButton</strong>. Размер: 4,1,4. Цвет: Bright pink. Anchored: ✅.</li>
  <li>Добавь внутрь <strong>ClickDetector</strong>.</li>
</ol>

<h4>🖱️ Шаг 2 — Создай предметы, которые будут летать:</h4>
<ol>
  <li>Создай несколько кубиков и сфер (Part → Shape → Ball).</li>
  <li>Для каждого: <strong>Anchored: ❌</strong> (сними галочку), чтобы они могли падать и летать.</li>
  <li>Разложи их рядом с кнопкой.</li>
</ol>

<h4>🖱️ Шаг 3 — Добавь скрипт в кнопку:</h4>
<ol>
  <li>Правой кнопкой на GravityButton → Insert Object → Script.</li>
  <li>Скопируй код:</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри GravityButton</div>
  <pre id="code2_6">local button = script.Parent
local clickDetector = button:WaitForChild("ClickDetector")
local workspaceService = game:GetService("Workspace")

local isFlipped = false
local normalGravity = 196.2  -- обычная гравитация
local flippedGravity = -196.2 -- перевёрнутая гравитация (отрицательная!)

clickDetector.MouseClick:Connect(function(player)
    if not isFlipped then
        -- Включаем перевёрнутую гравитацию
        workspaceService.Gravity = flippedGravity
        isFlipped = true
        
        -- Эффекты
        button.BrickColor = BrickColor.new("Bright cyan")
        button.Material = Enum.Material.Neon
        
        local chatService = game:GetService("Chat")
        chatService:Chat(button, "🌀 ГРАВИТАЦИЯ ПЕРЕВЕРНУЛАСЬ! 🌀")
        
        print("🌀 Гравитация перевернулась! Всё летит вверх.")
        
        -- Ждём 3 секунды
        task.wait(3)
        
        -- Возвращаем нормальную гравитацию
        workspaceService.Gravity = normalGravity
        isFlipped = false
        button.BrickColor = BrickColor.new("Bright pink")
        button.Material = Enum.Material.SmoothPlastic
        
        chatService:Chat(button, "⬇️ Гравитация вернулась! ⬇️")
        print("⬇️ Гравитация вернулась! Всё падает обратно.")
    else
        print("Гравитация уже перевёрнута! Подожди, пока она вернётся.")
    end
end)</pre>
</div>
<button class="copy-btn" data-code="code2_6" style="margin-top: 8px; padding: 6px 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px;">📋 Копировать код</button>

<h4>✅ Проверь себя:</h4>
<p>• Рядом с кнопкой лежат кубики, которые не приклеены (Anchored: ❌)?<br>• Нажми на розовую кнопку — кубики взлетели вверх?<br>• Через 3 секунды они упали обратно?<br>• Кнопка светилась голубым, пока гравитация была перевёрнута?</p>`,
      hint: "Отрицательная гравитация (-196.2) заставляет всё лететь ВВЕРХ, а не вниз. Это как если бы ты перевернул весь мир! Попробуй поставить другое число, например 50 или -500 — будет весело!",
      difficulty: "medium",
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