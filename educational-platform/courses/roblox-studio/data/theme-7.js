const theme7 = {
  id: 7,
  title: 'Террейн и окружение: ландшафт, вода, небо',
  theory: {
    title: 'Как сделать красивый мир в Roblox?',
    subtitle: 'Terrain, Atmosphere, Lighting, Sky, FillBlock',
    content: `<p>В Roblox есть специальный инструмент для создания природного ландшафта — <strong>Terrain</strong>. В отличие от обычных Part, Terrain лепится как пластилин: можно добавить землю, воду, скалы, снег — всё будет выглядеть по-настоящему!</p>

      <h3 style="color:var(--accent);margin-top:24px">🌍 Что такое Terrain?</h3>
      <p>В Explorer он всегда есть внутри <strong>Workspace → Terrain</strong>. Им можно управлять двумя способами:<br>
      • <strong>Руками</strong> — через вкладку <strong>Home → Edit → Terrain Editor</strong> в Studio<br>
      • <strong>Через скрипт</strong> — с помощью <code>workspace.Terrain:FillBlock()</code></p>
      <div class="code-block"><div class="code-header">Заполнить область материалом</div><pre>-- FillBlock заполняет прямоугольную область материалом
-- CFrame — центр и поворот области
-- Vector3 — размер области
-- Enum.Material.Grass — материал (трава, вода, камень...)
workspace.Terrain:FillBlock(
    CFrame.new(0, 0, 0),       -- центр
    Vector3.new(50, 4, 50),    -- размер
    Enum.Material.Grass        -- материал
)</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">☀️ Освещение и небо</h3>
      <p>В Explorer есть объект <strong>Lighting</strong> — он управляет временем суток, яркостью и туманом. Внутрь Lighting можно добавить:<br>
      • <strong>Sky</strong> — текстура неба (облака, звёзды)<br>
      • <strong>Atmosphere</strong> — туман, дымка, цвет горизонта<br>
      • <strong>ColorCorrectionEffect</strong> — общий оттенок экрана</p>
      <div class="code-block"><div class="code-header">Изменить время суток через скрипт</div><pre>-- ClockTime: 0 = полночь, 6 = рассвет, 12 = полдень, 20 = закат
game.Lighting.ClockTime = 18  -- вечер

-- Яркость окружающего света
game.Lighting.Ambient = Color3.fromRGB(100, 80, 60)  -- тёплый свет</pre></div>
      <div class="info-box success"><strong>💡 Совет:</strong> Все настройки Lighting можно менять прямо в Properties не запуская игру — сразу видно результат в редакторе!</div>`,
  },
  tasks: [
    {
      title: 'Тропический остров',
      desc: `<p>Создадим маленький тропический остров вручную, используя инструменты Terrain Editor! Никакого кода — только твои руки и фантазия 🏝️</p>

<h4>🎯 Что должно получиться:</h4>
<p>Маленький круглый остров с зелёным холмиком посередине, жёлтым песчаным пляжем по краям и бирюзовой водой вокруг. Как миниатюрный кусочек Карибов!</p>

<h4>👆 Шаг 1 — Очисти Terrain перед стартом:</h4>
<ol>
  <li>В Explorer нажми на <strong>Workspace → Terrain</strong></li>
  <li>Открой <strong>Home → Edit → Terrain Editor</strong> (иконка с горкой)</li>
  <li>Перейди на вкладку <strong>Edit</strong> и нажми <strong>Clear</strong></li>
</ol>

<h4>👆 Шаг 2 — Создай воду вокруг острова:</h4>
<ol>
  <li>В Terrain Editor перейди на вкладку <strong>Fill</strong></li>
  <li>Выбери инструмент <strong>Block</strong></li>
  <li>В поле <strong>Material</strong> выбери <strong>Water</strong></li>
  <li>Установи размер области <strong>500 x 10 x 500</strong></li>
  <li>Поставь позицию <strong>(0, -3, 0)</strong> и нажми <strong>Fill</strong></li>
</ol>

<h4>👆 Шаг 3 — Слепи сам остров:</h4>
<ol>
  <li>Перейди на вкладку <strong>Edit</strong> → инструмент <strong>Region</strong></li>
  <li>В <strong>Brush Shape</strong> выбери <strong>Sphere</strong> (сфера)</li>
  <li>Поставь размер кисти <strong>70 x 15 x 70</strong></li>
  <li>Наведи кисть в точку <strong>(0, 0, 0)</strong> и нажми <strong>Add</strong></li>
  <li>Теперь добавим холмик в центре: размер кисти <strong>30 x 20 x 30</strong>, наведи в <strong>(0, 0, 0)</strong> и снова <strong>Add</strong></li>
</ol>

<h4>👆 Шаг 4 — Раскрась остров:</h4>
<ol>
  <li>В Terrain Editor перейди на вкладку <strong>Paint</strong></li>
  <li>Выбери кисть <strong>Region</strong>, форма — <strong>Sphere</strong>, размер <strong>70 x 10 x 70</strong></li>
  <li>Материал <strong>Sand</strong> — пройдись по нижним краям острова (пляж)</li>
  <li>Материал <strong>Grass</strong> — закрась верхнюю часть (трава)</li>
  <li>Материал <strong>Rock</strong> или <strong>Slate</strong> — маленький мазок на вершине холма (каменистая макушка)</li>
</ol>

<h4>👆 Шаг 5 — Посади пальму (бонус!):</h4>
<ol>
  <li>В Explorer добавь в <strong>Workspace</strong> объект <strong>Part</strong></li>
  <li>Назови его <strong>PalmTrunk</strong>, поставь <strong>Material: Wood</strong>, цвет коричневый</li>
  <li>Размер <strong>2 x 8 x 2</strong>, поставь на вершину острова</li>
  <li>Создай ещё один Part <strong>PalmLeaves</strong>: <strong>Material: Grass</strong>, цвет тёмно-зелёный</li>
  <li>Размер <strong>10 x 4 x 10</strong>, форма <strong>Ball</strong>, положи сверху на ствол</li>
</ol>

<h4>🔍 Проверь себя:</h4>
<p>• Вода окружает остров? ✅<br>• Песчаный пляж по краям? ✅<br>• Зелёная трава сверху? ✅<br>• Холмик посередине? ✅<br>• Пальма стоит? ✅ (бонус)</p>

<p>💡 <em>Совет: нажми Play (F5) и походи по острову от первого лица, чтобы оценить свои труды!</em></p>`,
      hint: 'Инструмент Region в Terrain Editor — твой лучший друг! Меняй размер кисти и добавляй несколько слоёв с разной высотой, чтобы остров получился более естественным. Попробуй Add с размером (50, 8, 50) по краям — получится красивый волнистый пляж!',
      difficulty: 'easy',
      solution:
        'Ручная работа без скрипта:\n1. Clear terrain\n2. Fill Water: Block 500x10x500 на (0,-3,0)\n3. Edit Region Sphere (70x15x70) на (0,0,0) — Add\n4. Edit Region Sphere (30x20x30) на (0,0,0) — Add (холм)\n5. Paint Sand по краям, Grass сверху, Rock на вершине\n6. Пальма: ствол (Wood, 2x8x2) + листва (Grass, Ball 10x4x10)',
    },
    {
      title: 'Смена дня и ночи',
      desc: `<p>Сделаем живое небо! День сменяется ночью, как в настоящей игре.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Небо медленно меняется: рассвет → день → закат → ночь → снова рассвет. Освещение и цвет неба меняются плавно. Полный цикл за 60 секунд.</p>

<h4>👆 Шаг 1 — Добавь Sky в Lighting:</h4>
<ol>
  <li>В Explorer нажми правой кнопкой на <strong>Lighting</strong></li>
  <li><strong>Insert Object → Sky</strong></li>
  <li>Sky оставь с настройками по умолчанию — это уже красивое небо!</li>
</ol>

<h4>👆 Шаг 2 — Добавь Atmosphere в Lighting:</h4>
<ol>
  <li>Правой кнопкой на <strong>Lighting → Insert Object → Atmosphere</strong></li>
  <li>В Properties настрой:<br>
    &nbsp;&nbsp;• <strong>Density</strong> → 0.3 (лёгкая дымка)<br>
    &nbsp;&nbsp;• <strong>Color</strong> → светло-голубой<br>
    &nbsp;&nbsp;• <strong>Glare</strong> → 0.2</li>
</ol>

<h4>👆 Шаг 3 — Создай Script в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService → Insert Object → Script</strong></li>
  <li>Переименуй в <strong>DayNightCycle</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script DayNightCycle в ServerScriptService</div><pre>-- Получаем объект освещения
local lighting = game:GetService("Lighting")

-- Сколько реальных секунд длится один игровой день
-- 60 секунд = 1 минута реального времени = полный день в игре
local DAY_LENGTH = 60

-- В Roblox время идёт от 0 до 24
-- Считаем сколько игровых часов проходит за одну реальную секунду
local HOURS_PER_SECOND = 24 / DAY_LENGTH

-- Начинаем с рассвета
lighting.ClockTime = 6

-- Бесконечный цикл смены времени
while true do
    -- Небольшая пауза между кадрами
    task.wait(0.1)

    -- Двигаем время вперёд
    -- 0.1 секунды прошло * HOURS_PER_SECOND = сколько игровых часов прошло
    lighting.ClockTime = lighting.ClockTime + HOURS_PER_SECOND * 0.1

    -- Когда достигли 24 часов (полночь) — сбрасываем на 0
    if lighting.ClockTime >= 24 then
        lighting.ClockTime = 0
    end

    -- Меняем яркость в зависимости от времени суток
    local time = lighting.ClockTime

    if time >= 5 and time < 8 then
        -- Рассвет: тёплый оранжевый свет
        lighting.Ambient = Color3.fromRGB(120, 80, 40)
        lighting.Brightness = 1.5

    elseif time >= 8 and time < 17 then
        -- День: яркий белый свет
        lighting.Ambient = Color3.fromRGB(120, 120, 120)
        lighting.Brightness = 2.5

    elseif time >= 17 and time < 20 then
        -- Закат: красно-оранжевый
        lighting.Ambient = Color3.fromRGB(150, 60, 20)
        lighting.Brightness = 1.0

    else
        -- Ночь: тёмно-синий
        lighting.Ambient = Color3.fromRGB(20, 20, 60)
        lighting.Brightness = 0.3
    end
end</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• В Lighting есть Sky и Atmosphere? ✅<br>• Небо меняется при запуске? ✅<br>• Ночью темно, днём светло? ✅<br>• Закат оранжевый? ✅</p>`,
      hint: 'ClockTime — это как часы: 0 = полночь, 6 = утро, 12 = полдень, 18 = вечер, 24 = снова полночь. Попробуй изменить DAY_LENGTH на 10 — день будет проноситься за 10 секунд!',
      difficulty: 'easy',
      solution:
        'local L=game.Lighting\nL.ClockTime=6\nlocal DL=60\nlocal HPS=24/DL\nwhile true do\n    task.wait(0.1)\n    L.ClockTime=(L.ClockTime+HPS*0.1)%24\n    local t=L.ClockTime\n    if t>=5 and t<8 then L.Ambient=Color3.fromRGB(120,80,40) L.Brightness=1.5\n    elseif t>=8 and t<17 then L.Ambient=Color3.fromRGB(120,120,120) L.Brightness=2.5\n    elseif t>=17 and t<20 then L.Ambient=Color3.fromRGB(150,60,20) L.Brightness=1.0\n    else L.Ambient=Color3.fromRGB(20,20,60) L.Brightness=0.3 end\nend',
    },
    {
      title: 'Погода: дождь и туман',
      desc: `<p>Добавим погоду! Нажимаешь кнопку — начинается ливень с туманом. Нажимаешь ещё раз — снова солнечно.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Кнопка «☀️ Погода» на экране. При нажатии небо темнеет, появляется туман и по экрану падают капли дождя. Повторное нажатие возвращает солнце.</p>

<h4>👆 Шаг 1 — Создай RemoteEvent в ReplicatedStorage:</h4>
<ol>
  <li>ReplicatedStorage → <strong>Insert Object → RemoteEvent</strong> → переименуй в <strong>WeatherEvent</strong></li>
</ol>

<h4>👆 Шаг 2 — Создай кнопку погоды в StarterGui:</h4>
<ol>
  <li>StarterGui → <strong>Insert Object → ScreenGui</strong> → переименуй в <strong>WeatherGui</strong></li>
  <li>WeatherGui → <strong>Insert Object → TextButton</strong> → переименуй в <strong>WeatherBtn</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>Text</strong> → ☀️ Погода<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0, 150 / Y: 0, 45<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 1, -160 / Y: 0, 10 (правый верхний угол)<br>
    &nbsp;&nbsp;• <strong>TextColor3</strong> → белый<br>
    &nbsp;&nbsp;• <strong>TextScaled</strong> → ✅</li>
</ol>

<h4>👆 Шаг 3 — Добавь LocalScript в WeatherBtn:</h4>
<div class="code-block"><div class="code-header">LocalScript внутри WeatherBtn</div><pre>local weatherBtn   = script.Parent
local weatherEvent = game.ReplicatedStorage:WaitForChild("WeatherEvent")

local isRaining = false

weatherBtn.MouseButton1Click:Connect(function()
    isRaining = not isRaining
    weatherEvent:FireServer(isRaining)

    if isRaining then
        weatherBtn.Text = "🌧 Дождь"
        weatherBtn.BackgroundColor3 = Color3.fromRGB(50, 50, 80)
    else
        weatherBtn.Text = "☀️ Солнечно"
        weatherBtn.BackgroundColor3 = Color3.fromRGB(200, 140, 0)
    end
end)</pre></div>

<h4>👆 Шаг 4 — Создай Script в ServerScriptService:</h4>
<div class="code-block"><div class="code-header">Script WeatherSystem в ServerScriptService</div><pre>local weatherEvent = game.ReplicatedStorage:WaitForChild("WeatherEvent")

weatherEvent.OnServerEvent:Connect(function(player, isRaining)
    -- Пересылаем событие всем игрокам
    weatherEvent:FireAllClients(isRaining)
end)</pre></div>

<h4>👆 Шаг 5 — Создай LocalScript в StarterPlayerScripts:</h4>
<div class="code-block"><div class="code-header">LocalScript RainSystem в StarterPlayerScripts</div><pre>local Players      = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local lighting     = game.Lighting
local atmosphere   = lighting:WaitForChild("Atmosphere")

local player    = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Создаём экранный дождь
local screenGui = Instance.new("ScreenGui")
screenGui.Name           = "RainGui"
screenGui.ResetOnSpawn   = false
screenGui.IgnoreGuiInset = true
screenGui.Parent         = playerGui

local rainFrame = Instance.new("Frame")
rainFrame.Size                   = UDim2.new(1, 0, 1, 0)
rainFrame.BackgroundTransparency = 1
rainFrame.ClipsDescendants       = true
rainFrame.Parent                 = screenGui

local isRaining = false

local function createDrop()
    local drop = Instance.new("Frame")
    drop.BackgroundColor3       = Color3.fromRGB(180, 210, 255)
    drop.BorderSizePixel        = 0
    drop.BackgroundTransparency = math.random(1, 4) * 0.1
    drop.Size     = UDim2.new(0, math.random(1, 3), 0, math.random(15, 35))
    drop.Position = UDim2.new(math.random(0, 100) / 100, 0, -0.1, 0)
    drop.Parent   = rainFrame
    return drop
end

local function animateDrop(drop)
    local tween = TweenService:Create(drop,
        TweenInfo.new(math.random(4, 8) / 10, Enum.EasingStyle.Linear),
        {
            Position = UDim2.new(
                drop.Position.X.Scale + math.random(-3, 3) / 100,
                0,
                math.random(100, 120) / 100,
                0
            )
        }
    )
    tween:Play()
    tween.Completed:Connect(function()
        if isRaining then
            drop.Position = UDim2.new(math.random(0, 100) / 100, 0, -0.1, 0)
            animateDrop(drop)
        else
            drop:Destroy()
        end
    end)
end

local function startRain()
    isRaining = true
    TweenService:Create(lighting, TweenInfo.new(2),
        { Brightness = 0.3, Ambient = Color3.fromRGB(40, 50, 70) }):Play()
    TweenService:Create(atmosphere, TweenInfo.new(2),
        { Density = 0.85, Color = Color3.fromRGB(80, 90, 110) }):Play()
    for i = 1, 400 do
        task.delay(math.random(0, 100) / 100, function()
            if isRaining then animateDrop(createDrop()) end
        end)
    end
end

local function stopRain()
    isRaining = false
    TweenService:Create(lighting, TweenInfo.new(2),
        { Brightness = 2.5, Ambient = Color3.fromRGB(120, 120, 120) }):Play()
    TweenService:Create(atmosphere, TweenInfo.new(2),
        { Density = 0.3, Color = Color3.fromRGB(180, 200, 220) }):Play()
end

local weatherEvent = game.ReplicatedStorage:WaitForChild("WeatherEvent")
weatherEvent.OnClientEvent:Connect(function(raining)
    if raining then startRain() else stopRain() end
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• WeatherEvent лежит в ReplicatedStorage? ✅<br>• Atmosphere добавлена в Lighting? ✅<br>• При нажатии небо темнеет? ✅<br>• По экрану падают капли дождя? ✅<br>• Кнопка меняет текст? ✅</p>`,
      hint: 'Дождь сделан через ScreenGui — это рамки-капли поверх экрана. TweenService плавно меняет освещение. Попробуй изменить 400 на 800 — получится ураган! Или на 100 — редкий моросящий дождик.',
      difficulty: 'medium',
      solution:
        '-- LocalScript WeatherGui: isRaining=not isRaining; ev:FireServer(isRaining)\n-- Script ServerScriptService: ev.OnServerEvent → ev:FireAllClients(isRaining)\n-- LocalScript StarterPlayerScripts: ev.OnClientEvent → if raining then startRain() else stopRain() end',
    },
    {
      title: 'Зимняя карта со снегом',
      desc: `<p>Превратим любую карту в зимнюю! Скрипт покроет всё снегом и создаст метель.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Terrain покрыт снегом. Идёт снегопад (белые частицы). Небо серо-белое, как зимой. Ambient холодный синеватый.</p>

<h4>👆 Шаг 1 — Настрой Lighting вручную через Properties:</h4>
<ol>
  <li>Нажми на <strong>Lighting</strong> в Explorer</li>
  <li>В Properties измени:<br>
    &nbsp;&nbsp;• <strong>ClockTime</strong> → 10 (утро)<br>
    &nbsp;&nbsp;• <strong>Brightness</strong> → 1.5<br>
    &nbsp;&nbsp;• <strong>Ambient</strong> → светло-синий (R:100 G:120 B:150)<br>
    &nbsp;&nbsp;• <strong>OutdoorAmbient</strong> → белый (R:200 G:210 B:220)</li>
  <li>Правой кнопкой на <strong>Lighting → Insert Object → Atmosphere</strong><br>
    &nbsp;&nbsp;• <strong>Density</strong> → 0.4<br>
    &nbsp;&nbsp;• <strong>Color</strong> → бело-серый<br>
    &nbsp;&nbsp;• <strong>Haze</strong> → 2</li>
</ol>

<h4>👆 Шаг 2 — Создай Script в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService → Insert Object → Script</strong></li>
  <li>Переименуй в <strong>WinterMap</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script WinterMap в ServerScriptService</div><pre>
local terrain  = workspace.Terrain
local random   = Random.new()
local lighting = game:GetService("Lighting")

print("❄️  Генерирую зимний мир v2...")

-- ══════════════════════════════════════════════
-- УТИЛИТЫ
-- ══════════════════════════════════════════════

local function rnd(a, b)  return a + random:NextNumber() * (b - a) end
local function rndi(a, b) return math.random(a, b) end
local PI = math.pi

-- Создать Part в workspace
local function makePart(props)
	local p = Instance.new("Part")
	p.Anchored   = true
	p.CanCollide = props.noCollide and false or true
	p.CastShadow = props.noShadow and false or true
	for k, v in pairs(props) do
		if k ~= "noCollide" and k ~= "noShadow" then
			p[k] = v
		end
	end
	p.Parent = workspace
	return p
end

-- Холм: цилиндр + шаровая шапка
local function makeHill(cx, cz, radius, height, mat)
	terrain:FillCylinder(CFrame.new(cx, height*0.5, cz), height, radius, mat)
	terrain:FillBall(Vector3.new(cx, height*0.9, cz), radius*0.88, mat)
end

-- ══════════════════════════════════════════════
-- РЕЛЬЕФ
-- ══════════════════════════════════════════════

terrain:Clear()

-- Базовая снежная равнина
terrain:FillBlock(CFrame.new(0,-5,0), Vector3.new(700,10,700), Enum.Material.Snow)

-- Горный хребет (север)
for i, rx in ipairs({-150,-100,-50,0,55,110,160}) do
	local h = rnd(30, 65)
	local r = rnd(22, 40)
	local oz = -220 + rnd(-20,20)
	makeHill(rx, oz, r,        h,       Enum.Material.Snow)
	makeHill(rx, oz, r*0.4,    h*1.25,  Enum.Material.Rock)
	-- Снежная шапка горы
	makeHill(rx, oz, r*0.25,   h*1.35,  Enum.Material.Snow)
end

-- Второй хребет (восток, пониже)
for _, rx in ipairs({160,170,175,165}) do
	local h = rnd(15,35)
	makeHill(rx + rnd(-10,10), rnd(-100,80), rnd(14,22), h, Enum.Material.Snow)
end

-- Пологие холмы по карте
local hills = {
	{ 55, 65, 20,13}, {-60, 35,16,10}, { 85,-45,24,17},
	{-35,-85, 18,11}, { 25,105,22,15}, {-95,-25,27,19},
	{115, 85, 21,14}, {-75, 95,18,12}, { 45,-115,17,9},
	{-115,-95,30,21}, { 70, 10,15, 8}, {-40, 60,13, 7},
	{-80,-110,20,13}, { 90,-90,18,11},
}
for _, h in ipairs(hills) do
	makeHill(h[1], h[2], h[3]+rnd(-3,3), h[4]+rnd(-2,2), Enum.Material.Snow)
end

-- Главное замёрзшее озеро
terrain:FillCylinder(CFrame.new(0,-0.6,0), 1.2, 40, Enum.Material.Ice)
terrain:FillCylinder(CFrame.new(0,-0.9,0), 0.9, 47, Enum.Material.Snow) -- берег

-- Дополнительные пруды
for _, p in ipairs({{65,-25},{-55,75},{-85,-55},{75,95},{-120,30},{30,-130}}) do
	local r = rndi(8,18)
	terrain:FillCylinder(CFrame.new(p[1],-0.5,p[2]), 0.9, r, Enum.Material.Ice)
	terrain:FillCylinder(CFrame.new(p[1],-0.8,p[2]), 0.7, r+5, Enum.Material.Snow)
end

-- Замёрзшая река (зигзаг)
local riverSegs = {
	{-40, 30, 130, 8},
	{  0,-10, 100, 8},
	{ 30,-50,  90, 9},
}
for _, s in ipairs(riverSegs) do
	terrain:FillBlock(
		CFrame.new(s[1],-2,s[2]) * CFrame.Angles(0, rnd(0,PI), 0),
		Vector3.new(s[3], 3, s[4]), Enum.Material.Ice
	)
end

-- Снежные сугробы (вытянутые гребни)
for i = 1, 12 do
	local cx, cz = rnd(-130,130), rnd(-130,130)
	terrain:FillBlock(
		CFrame.new(cx, rnd(1,3), cz) * CFrame.Angles(0, rnd(0,PI), 0),
		Vector3.new(rnd(15,40), rnd(2,5), rnd(3,7)),
		Enum.Material.Snow
	)
end

print("  ✓ Рельеф создан")

-- ══════════════════════════════════════════════════════════════════
-- ДЕРЕВЬЯ — натуральные ели с ветками, наклоном и вариативностью
-- ══════════════════════════════════════════════════════════════════

--[[
  Структура реалистичной ели:
    • Ствол: тонкий конус (несколько сегментов, сужающихся кверху)
    • Ветки: 4–6 ярусов, каждый ярус = 6–8 отдельных веток-Parts,
      расходящихся под случайным углом; нижние ветки длиннее и опущены вниз,
      верхние — короче и почти горизонтальны
    • На каждой ветке — хвоя (сплющенный Ball)
    • Снег лежит на верхней плоскости ветки (тонкая белая пластина)
    • Верхушка — вытянутый конус-шпиль
]]

local TREE_FOLDER = Instance.new("Folder")
TREE_FOLDER.Name   = "Trees"
TREE_FOLDER.Parent = workspace

local function makeNaturalTree(ox, oz, groundY)
	groundY = groundY or 0

	local treeH   = rnd(14, 26)      -- полная высота
	local trunkH  = treeH * rnd(0.25, 0.35)  -- высота голого ствола
	local levels  = rndi(6, 9)        -- ярусов веток
	local lean    = rnd(-0.04, 0.04)  -- лёгкий наклон ствола (рад)
	local baseRad = rnd(0.22, 0.45)   -- радиус комля

	local treeRoot = Instance.new("Folder")
	treeRoot.Name   = "Tree_" .. tostring(math.floor(ox)) .. "_" .. tostring(math.floor(oz))
	treeRoot.Parent = TREE_FOLDER

	-- ── СТВОЛ (3 конических сегмента, сужаются) ──
	local trunkSegs = 4
	for seg = 1, trunkSegs do
		local t0  = (seg-1) / trunkSegs
		local t1  = seg     / trunkSegs
		local yMid = groundY + treeH * (t0 + t1) * 0.5
		local segH  = treeH / trunkSegs
		local r     = baseRad * (1 - t0 * 0.65)

		local part = Instance.new("Part")
		part.Shape    = Enum.PartType.Cylinder
		part.Size     = Vector3.new(segH + 0.1, r*2, r*2)
		-- Кора: тёмно-коричневая с вариацией
		local br = rndi(60,85); local bg = rndi(38,52); local bb = rndi(20,35)
		part.Color    = Color3.fromRGB(br, bg, bb)
		part.Material = Enum.Material.Wood
		part.Anchored = true
		part.CFrame   = CFrame.new(ox, yMid, oz)
		              * CFrame.Angles(lean, rnd(0, PI*2), math.rad(90))
		part.Parent   = treeRoot
	end

	-- ── ВЕТКИ ──
	for lv = 1, levels do
		local t          = (lv - 1) / (levels - 1)        -- 0 = низ, 1 = верх
		local lvY        = groundY + trunkH + (treeH - trunkH) * t
		local branchCount = rndi(5, 8)
		local branchLen  = treeH * 0.28 * (1 - t * 0.65) -- длина ветки
		local droop      = rnd(-0.45, -0.15)              -- наклон вниз (больше у основания)

		-- Цвет хвои — чуть темнее у основания, светлее к верхушке
		local g_val = math.floor(80 + t * 45)
		local needleColor  = Color3.fromRGB(15 + math.floor(t*20), g_val, 25)

		for br = 1, branchCount do
			local angle = (br / branchCount) * PI * 2 + rnd(-0.2, 0.2)
			local bx = ox + math.cos(angle) * branchLen * 0.5
			local bz = oz + math.sin(angle) * branchLen * 0.5
			local by = lvY + branchLen * 0.5 * math.sin(droop)

			-- Сама ветка (тонкий цилиндр)
			local bpart = Instance.new("Part")
			bpart.Shape    = Enum.PartType.Cylinder
			bpart.Size     = Vector3.new(branchLen, rnd(0.08,0.15), rnd(0.08,0.15))
			bpart.Color    = Color3.fromRGB(55,35,20)
			bpart.Material = Enum.Material.Wood
			bpart.Anchored = true
			-- Направление от ствола наружу и вниз
			bpart.CFrame   = CFrame.new(bx, by, bz)
			               * CFrame.Angles(droop, angle + math.rad(90), 0)
			bpart.Parent   = treeRoot

			-- Хвоя (сплющенный эллипсоид на конце ветки)
			local fsize   = branchLen * rnd(0.45, 0.65)
			local foliage = Instance.new("Part")
			foliage.Shape    = Enum.PartType.Ball
			foliage.Size     = Vector3.new(fsize, fsize*0.45, fsize)
			foliage.Color    = needleColor
			foliage.Material = Enum.Material.Grass
			foliage.Anchored = true
			foliage.Position = Vector3.new(
				ox + math.cos(angle) * branchLen * 0.85,
				lvY + branchLen * 0.85 * math.sin(droop) + rnd(-0.1, 0.15),
				oz + math.sin(angle) * branchLen * 0.85
			)
			foliage.Parent   = treeRoot

			-- Снег на ветках (тонкая белая пластина сверху хвои)
			if math.random() > 0.3 then
				local snowLoad = rnd(0.3, 0.7)   -- насколько ветка засыпана снегом
				local snowPart = Instance.new("Part")
				snowPart.Shape    = Enum.PartType.Ball
				snowPart.Size     = Vector3.new(fsize*snowLoad, fsize*0.12, fsize*snowLoad)
				snowPart.Color    = Color3.fromRGB(225, 238, 255)
				snowPart.Material = Enum.Material.Snow
				snowPart.Anchored = true
				snowPart.Position = Vector3.new(
					foliage.Position.X + rnd(-0.1,0.1),
					foliage.Position.Y + fsize*0.17,
					foliage.Position.Z + rnd(-0.1,0.1)
				)
				snowPart.Parent   = treeRoot
			end
		end
	end

	-- ── ВЕРХУШКА (острый шпиль) ──
	local tipY    = groundY + treeH
	local tipH    = rnd(1.5, 3.0)

	-- Шпиль из двух конусообразных частей
	for i = 1, 3 do
		local tf  = i / 3
		local tip = Instance.new("Part")
		tip.Shape    = Enum.PartType.Ball
		tip.Size     = Vector3.new(1.2*(1-tf*0.8), 1.0, 1.2*(1-tf*0.8))
		tip.Color    = Color3.fromRGB(15, math.floor(90+tf*30), 25)
		tip.Material = Enum.Material.Grass
		tip.Anchored = true
		tip.Position = Vector3.new(ox, tipY + (i-1)*0.7, oz)
		tip.Parent   = treeRoot
	end

	-- Маленькая звёздочка (~50% елей)
	if math.random() > 0.5 then
		local star = Instance.new("Part")
		star.Shape    = Enum.PartType.Ball
		star.Size     = Vector3.new(0.5, 0.75, 0.5)
		star.Color    = Color3.fromRGB(255, 215, 50)
		star.Material = Enum.Material.Neon
		star.Anchored = true
		star.Position = Vector3.new(ox, tipY + tipH + 0.2, oz)
		star.Parent   = treeRoot

		local light       = Instance.new("PointLight")
		light.Brightness  = 1.2
		light.Range       = 10
		light.Color       = Color3.fromRGB(255, 195, 70)
		light.Parent      = star
	end
end

-- Рассадить деревья: леса + одиночки
local forestCenters = {
	{ 60, 65}, {-72, 22}, { 32,-92}, {-32, 82},
	{102,-52}, {-92,-62}, { 12, 52}, { 82, 22},
	{-52,-32}, { 55,-80}, {-110, 50}, {100, 60},
}
for _, fc in ipairs(forestCenters) do
	for _ = 1, rndi(5, 11) do
		makeNaturalTree(fc[1]+rnd(-20,20), fc[2]+rnd(-20,20), 0)
	end
end
for _ = 1, 20 do
	makeNaturalTree(rnd(-135,135), rnd(-135,135), 0)
end

print("  ✓ Лес создан (натуральные ели)")

-- ══════════════════════════════════════════════
-- СНЕГОВИКИ — большие, детализированные
-- ══════════════════════════════════════════════

--[[
  Каждый снеговик:
    • 3 шара (нижний r=3, средний r=2.1, голова r=1.5)  → итого ~10 studs
    • Глаза (2 угольных шара) + брови
    • Нос-морковь (оранжевый цилиндр)
    • Рот (5 маленьких угольных шариков дугой)
    • Пуговицы (3 по туловищу)
    • Руки: две ветки (цилиндры) с «пальцами»
    • Шарф (несколько плоских сегментов вокруг шеи)
    • Шляпа-цилиндр (поля + тулья) или ведро
    • Мягкая тень под ногами (тёмный диск)
]]

local SNOWMAN_FOLDER = Instance.new("Folder")
SNOWMAN_FOLDER.Name   = "Snowmen"
SNOWMAN_FOLDER.Parent = workspace

local HAT_STYLES = {"tophat", "bucket", "beanie"}

local function makeSnowman(ox, oz, groundY)
	groundY = groundY or 0

	local scale   = rnd(0.85, 1.25)   -- небольшая вариативность роста
	local r1      = 3.0  * scale       -- нижний шар
	local r2      = 2.1  * scale       -- средний
	local r3      = 1.5  * scale       -- голова

	-- Y-центры шаров (они касаются)
	local y1 = groundY + r1
	local y2 = y1 + r1 + r2 - 0.3*scale   -- небольшое перекрытие
	local y3 = y2 + r2 + r3 - 0.25*scale

	local yaw = rnd(0, PI*2)   -- разворот снеговика

	local smRoot = Instance.new("Folder")
	smRoot.Name   = "Snowman"
	smRoot.Parent = SNOWMAN_FOLDER

	local function addBall(r, y, col, mat)
		local p = Instance.new("Part")
		p.Shape    = Enum.PartType.Ball
		p.Size     = Vector3.new(r*2, r*2, r*2)
		p.Color    = col
		p.Material = mat or Enum.Material.Snow
		p.Anchored = true
		p.Position = Vector3.new(ox, y, oz)
		p.Parent   = smRoot
		return p
	end

	local snowCol = Color3.fromRGB(225, 238, 252)

	-- Тело
	addBall(r1, y1, snowCol)
	addBall(r2, y2, snowCol)
	addBall(r3, y3, snowCol)

	-- ── ГЛАЗА ──
	local eyeOffset = r3 * 0.55
	for _, side in ipairs({-1, 1}) do
		local ex = ox + math.cos(yaw) * (-r3*0.95) + side * math.sin(yaw+PI/2) * eyeOffset*0.5
		local ez = oz + math.sin(yaw) * (-r3*0.95) + side * math.cos(yaw+PI/2) * eyeOffset*0.5
		addBall(r3*0.09, y3 + r3*0.22, Color3.fromRGB(15,15,15), Enum.Material.SmoothPlastic)
			.Position = Vector3.new(ex, y3 + r3*0.22, ez)
	end

	-- ── НОС (морковь) ──
	local noseLen = r3 * 0.75
	local noseDir = Vector3.new(math.cos(yaw), 0, math.sin(yaw)) * -1
	local nosePart = Instance.new("Part")
	nosePart.Shape    = Enum.PartType.Cylinder
	nosePart.Size     = Vector3.new(noseLen, r3*0.11, r3*0.11)
	nosePart.Color    = Color3.fromRGB(235, 100, 18)
	nosePart.Material = Enum.Material.SmoothPlastic
	nosePart.Anchored = true
	nosePart.CFrame   = CFrame.new(
		ox + noseDir.X*(r3+noseLen*0.4),
		y3,
		oz + noseDir.Z*(r3+noseLen*0.4)
	) * CFrame.Angles(0, yaw + PI/2, 0)
	nosePart.Parent   = smRoot

	-- ── РОТ (дуга из шариков) ──
	for mi = 1, 5 do
		local mAngle = (mi - 3) * 0.28   -- -2..+2 шага
		local mR     = r3 * 0.88
		local mx = ox + math.cos(yaw) * (-mR) + math.cos(yaw + PI/2 + mAngle) * r3*0.32
		local mz = oz + math.sin(yaw) * (-mR) + math.sin(yaw + PI/2 + mAngle) * r3*0.32
		local my = y3 - r3 * 0.32 - math.abs(mAngle) * r3 * 0.18
		local mb = Instance.new("Part")
		mb.Shape    = Enum.PartType.Ball
		mb.Size     = Vector3.new(r3*0.1, r3*0.1, r3*0.1)
		mb.Color    = Color3.fromRGB(15,15,15)
		mb.Material = Enum.Material.SmoothPlastic
		mb.Anchored = true
		mb.Position = Vector3.new(mx, my, mz)
		mb.Parent   = smRoot
	end

	-- ── ПУГОВИЦЫ (3 штуки по туловищу) ──
	for bi = 1, 3 do
		local bFront = Vector3.new(math.cos(yaw)*-1, 0, math.sin(yaw)*-1) * r2*0.92
		local by     = y2 + (bi - 2) * r2 * 0.38
		local btn    = Instance.new("Part")
		btn.Shape    = Enum.PartType.Ball
		btn.Size     = Vector3.new(r2*0.13, r2*0.13, r2*0.13)
		btn.Color    = Color3.fromRGB(20,20,20)
		btn.Material = Enum.Material.SmoothPlastic
		btn.Anchored = true
		btn.Position = Vector3.new(ox+bFront.X, by, oz+bFront.Z)
		btn.Parent   = smRoot
	end

	-- ── РУКИ (ветки с «пальцами») ──
	for _, side in ipairs({-1, 1}) do
		local armAngle  = yaw + side * PI/2
		local armLen    = r1 * 1.8
		local armDroop  = rnd(-0.3, 0.1)  -- небольшой наклон вниз
		local armStart  = Vector3.new(
			ox + math.cos(armAngle) * r2 * 0.95,
			y2 + rnd(-0.2,0.3)*scale,
			oz + math.sin(armAngle) * r2 * 0.95
		)
		local arm = Instance.new("Part")
		arm.Shape    = Enum.PartType.Cylinder
		arm.Size     = Vector3.new(armLen, 0.12*scale, 0.12*scale)
		arm.Color    = Color3.fromRGB(55,35,18)
		arm.Material = Enum.Material.Wood
		arm.Anchored = true
		arm.CFrame   = CFrame.new(
			armStart.X + math.cos(armAngle)*armLen*0.5,
			armStart.Y + armLen*0.5*math.sin(armDroop),
			armStart.Z + math.sin(armAngle)*armLen*0.5
		) * CFrame.Angles(armDroop, armAngle+PI/2, 0)
		arm.Parent   = smRoot

		-- «Пальцы» — 3 коротких прутика на конце
		local tipX = armStart.X + math.cos(armAngle)*armLen
		local tipY = armStart.Y + armLen*math.sin(armDroop)
		local tipZ = armStart.Z + math.sin(armAngle)*armLen
		for fi = -1, 1 do
			local fAngle = armDroop + fi * 0.45
			local finger = Instance.new("Part")
			finger.Shape    = Enum.PartType.Cylinder
			finger.Size     = Vector3.new(armLen*0.28, 0.08*scale, 0.08*scale)
			finger.Color    = Color3.fromRGB(50,32,16)
			finger.Material = Enum.Material.Wood
			finger.Anchored = true
			finger.CFrame   = CFrame.new(
				tipX + math.cos(armAngle)*armLen*0.14,
				tipY + math.sin(fAngle)*armLen*0.14,
				tipZ + math.sin(armAngle)*armLen*0.14
			) * CFrame.Angles(fAngle, armAngle+PI/2, 0)
			finger.Parent   = smRoot
		end
	end

	-- ── ШАРФ ──
	local scarfColor1 = Color3.fromRGB(rndi(150,220), rndi(20,60),  rndi(20,60))   -- красный
	local scarfColor2 = Color3.fromRGB(rndi(20,60),   rndi(20,60),  rndi(150,220)) -- синий
	local scarfY      = y3 - r3 * 0.65
	local scarfSegs   = 10
	for si = 1, scarfSegs do
		local sAngle = (si / scarfSegs) * PI * 2
		local sr     = r3 * 1.05 + (si % 2) * 0.05
		local scarf  = Instance.new("Part")
		scarf.Shape    = Enum.PartType.Ball
		scarf.Size     = Vector3.new(r3*0.55, r3*0.22, r3*0.45)
		scarf.Color    = (si % 2 == 0) and scarfColor1 or scarfColor2
		scarf.Material = Enum.Material.Fabric
		scarf.Anchored = true
		scarf.CFrame   = CFrame.new(
			ox + math.cos(sAngle)*sr,
			scarfY + rnd(-0.05,0.05)*scale,
			oz + math.sin(sAngle)*sr
		) * CFrame.Angles(0, sAngle + PI/2, 0)
		scarf.Parent   = smRoot
	end
	-- Конец шарфа свисает вниз
	for di = 1, 3 do
		local dScarf = Instance.new("Part")
		dScarf.Shape    = Enum.PartType.Ball
		dScarf.Size     = Vector3.new(r3*0.38, r3*0.25, r3*0.3)
		dScarf.Color    = (di % 2 == 0) and scarfColor1 or scarfColor2
		dScarf.Material = Enum.Material.Fabric
		dScarf.Anchored = true
		dScarf.Position = Vector3.new(
			ox + math.cos(yaw)*(-r3*1.05),
			scarfY - di * r3*0.25,
			oz + math.sin(yaw)*(-r3*1.05)
		)
		dScarf.Parent   = smRoot
	end

	-- ── ШЛЯПА ──
	local hatStyle = HAT_STYLES[rndi(1,3)]
	local hatY     = y3 + r3 * 0.82
	local hatColor = Color3.fromRGB(rndi(20,60), rndi(20,60), rndi(20,60))

	if hatStyle == "tophat" then
		-- Поля
		local brim = Instance.new("Part")
		brim.Shape    = Enum.PartType.Cylinder
		brim.Size     = Vector3.new(r3*0.3, r3*2.2, r3*2.2)
		brim.Color    = hatColor
		brim.Material = Enum.Material.SmoothPlastic
		brim.Anchored = true
		brim.CFrame   = CFrame.new(ox, hatY, oz) * CFrame.Angles(0,0,math.rad(90))
		brim.Parent   = smRoot
		-- Тулья
		local crown = Instance.new("Part")
		crown.Shape    = Enum.PartType.Cylinder
		crown.Size     = Vector3.new(r3*1.1, r3*1.5, r3*1.5)
		crown.Color    = hatColor
		crown.Material = Enum.Material.SmoothPlastic
		crown.Anchored = true
		crown.CFrame   = CFrame.new(ox, hatY + r3*0.55, oz) * CFrame.Angles(0,0,math.rad(90))
		crown.Parent   = smRoot
		-- Лента
		local band = Instance.new("Part")
		band.Shape    = Enum.PartType.Cylinder
		band.Size     = Vector3.new(r3*0.18, r3*1.52, r3*1.52)
		band.Color    = Color3.fromRGB(180,20,20)
		band.Material = Enum.Material.SmoothPlastic
		band.Anchored = true
		band.CFrame   = CFrame.new(ox, hatY + r3*0.15, oz) * CFrame.Angles(0,0,math.rad(90))
		band.Parent   = smRoot

	elseif hatStyle == "bucket" then
		-- Ведро (перевёрнутый усечённый конус = цилиндр)
		local bucket = Instance.new("Part")
		bucket.Shape    = Enum.PartType.Cylinder
		bucket.Size     = Vector3.new(r3*0.95, r3*1.6, r3*1.6)
		bucket.Color    = Color3.fromRGB(150, 100, 50)
		bucket.Material = Enum.Material.Metal
		bucket.Anchored = true
		bucket.CFrame   = CFrame.new(ox, hatY+r3*0.45, oz) * CFrame.Angles(0,0,math.rad(90))
		bucket.Parent   = smRoot
		-- Ободок ведра
		local rim = Instance.new("Part")
		rim.Shape    = Enum.PartType.Cylinder
		rim.Size     = Vector3.new(r3*0.1, r3*1.7, r3*1.7)
		rim.Color    = Color3.fromRGB(100,70,30)
		rim.Material = Enum.Material.Metal
		rim.Anchored = true
		rim.CFrame   = CFrame.new(ox, hatY, oz) * CFrame.Angles(0,0,math.rad(90))
		rim.Parent   = smRoot

	else -- beanie (шапка-шарик)
		local beanieColor = Color3.fromRGB(rndi(100,220), rndi(30,80), rndi(30,80))
		for bi = 1, 4 do
			local bPart = Instance.new("Part")
			bPart.Shape    = Enum.PartType.Ball
			bPart.Size     = Vector3.new(r3*1.4*(1-bi*0.15), r3*0.5, r3*1.4*(1-bi*0.15))
			bPart.Color    = (bi%2==0) and beanieColor or Color3.fromRGB(220,220,220)
			bPart.Material = Enum.Material.Fabric
			bPart.Anchored = true
			bPart.Position = Vector3.new(ox, hatY + bi*r3*0.22, oz)
			bPart.Parent   = smRoot
		end
		-- Помпон
		local pompom = Instance.new("Part")
		pompom.Shape    = Enum.PartType.Ball
		pompom.Size     = Vector3.new(r3*0.4, r3*0.4, r3*0.4)
		pompom.Color    = Color3.fromRGB(255,255,255)
		pompom.Material = Enum.Material.Fabric
		pompom.Anchored = true
		pompom.Position = Vector3.new(ox, hatY + r3*1.1, oz)
		pompom.Parent   = smRoot
	end

	-- ── ТЕНЬ (тёмный диск под ногами) ──
	local shadow = Instance.new("Part")
	shadow.Shape    = Enum.PartType.Cylinder
	shadow.Size     = Vector3.new(0.15, r1*2.2, r1*2.2)
	shadow.Color    = Color3.fromRGB(160,175,195)
	shadow.Material = Enum.Material.SmoothPlastic
	shadow.Transparency = 0.55
	shadow.Anchored = true
	shadow.CFrame   = CFrame.new(ox, groundY+0.08, oz) * CFrame.Angles(0,0,math.rad(90))
	shadow.Parent   = smRoot
end

-- Расставить снеговиков
local snowmanSpots = {
	{  12,  52 }, { -22, -12 }, {  48,  16 },
	{ -58,  58 }, {  72, -62 }, {   5, -45 },
	{ -35,  30 }, { 110,  15 }, { -85, -80 },
}
for _, sp in ipairs(snowmanSpots) do
	makeSnowman(sp[1], sp[2], 0)
end

print("  ✓ Снеговики созданы (большие, детализированные)")

-- ══════════════════════════════════════════════
-- КАМНИ И ВАЛУНЫ
-- ══════════════════════════════════════════════

for _ = 1, 40 do
	local s    = rnd(0.8, 5)
	local rock = Instance.new("Part")
	rock.Shape    = Enum.PartType.Ball
	rock.Size     = Vector3.new(s, s*rnd(0.45,0.85), s*rnd(0.65,1.0))
	local gr      = rndi(85,130)
	rock.Color    = Color3.fromRGB(gr, gr, gr+10)
	rock.Material = Enum.Material.Rock
	rock.Anchored = true
	rock.CFrame   = CFrame.new(rnd(-145,145), rnd(0.2,2), rnd(-145,145))
	              * CFrame.Angles(rnd(0,PI), rnd(0,PI), rnd(0,PI))
	rock.Parent   = workspace

	-- Снег на камнях (тонкая шапка сверху)
	if math.random() > 0.4 then
		local snowCap = Instance.new("Part")
		snowCap.Shape    = Enum.PartType.Ball
		snowCap.Size     = Vector3.new(s*0.8, s*0.18, s*0.8)
		snowCap.Color    = Color3.fromRGB(228, 240, 255)
		snowCap.Material = Enum.Material.Snow
		snowCap.Anchored = true
		snowCap.Position = Vector3.new(rock.Position.X, rock.Position.Y + s*0.38, rock.Position.Z)
		snowCap.Parent   = workspace
	end
end

-- Кластеры больших валунов
for _ = 1, 5 do
	local cx, cz = rnd(-120,120), rnd(-120,120)
	for _ = 1, rndi(3,6) do
		local s = rnd(2,7)
		local r = Instance.new("Part")
		r.Shape    = Enum.PartType.Ball
		r.Size     = Vector3.new(s, s*rnd(0.5,0.9), s*rnd(0.7,1))
		r.Color    = Color3.fromRGB(rndi(90,120), rndi(90,120), rndi(100,130))
		r.Material = Enum.Material.Rock
		r.Anchored = true
		r.CFrame   = CFrame.new(cx+rnd(-6,6), rnd(0,s*0.4), cz+rnd(-6,6))
		           * CFrame.Angles(rnd(0,PI), rnd(0,PI), rnd(0,PI))
		r.Parent   = workspace
	end
end

print("  ✓ Камни расставлены")

-- ══════════════════════════════════════════════
-- ЛЕДЯНЫЕ СТАЛАГМИТЫ (у берегов прудов)
-- ══════════════════════════════════════════════

local function makeIcicle(x, z, groundY)
	local h = rnd(1.5, 5)
	for seg = 1, rndi(2,4) do
		local t   = (seg-1) / 3
		local ice = Instance.new("Part")
		ice.Shape    = Enum.PartType.Ball
		ice.Size     = Vector3.new(h*(0.35-t*0.28), h*0.45, h*(0.35-t*0.28))
		ice.Color    = Color3.fromRGB(
			math.floor(160+t*60),
			math.floor(200+t*40),
			255
		)
		ice.Material    = Enum.Material.Ice
		ice.Transparency = 0.25 + t*0.35
		ice.Anchored    = true
		ice.Position    = Vector3.new(x+rnd(-0.2,0.2), groundY + h*0.4 + seg*h*0.35, z+rnd(-0.2,0.2))
		ice.Parent      = workspace
	end
end

for _ = 1, 25 do
	makeIcicle(rnd(-140,140), rnd(-140,140), 0)
end

print("  ✓ Ледяные кристаллы созданы")

-- ══════════════════════════════════════════════
-- СНЕГОПАД
-- ══════════════════════════════════════════════

local snowSource      = Instance.new("Part")
snowSource.Name       = "SnowSource"
snowSource.Size       = Vector3.new(600, 1, 600)
snowSource.Anchored   = true
snowSource.CanCollide = false
snowSource.Transparency = 1
snowSource.Position   = Vector3.new(0, 130, 0)
snowSource.Parent     = workspace

-- Основной снегопад
local sp = Instance.new("ParticleEmitter")
sp.Rate     = 400
sp.Speed    = NumberRange.new(14, 26)
sp.Lifetime = NumberRange.new(6, 9)
sp.Size     = NumberSequence.new({
	NumberSequenceKeypoint.new(0,   0.04),
	NumberSequenceKeypoint.new(0.2, 0.20),
	NumberSequenceKeypoint.new(1,   0.0),
})
sp.Transparency = NumberSequence.new({
	NumberSequenceKeypoint.new(0, 0.2),
	NumberSequenceKeypoint.new(0.8, 0.4),
	NumberSequenceKeypoint.new(1, 1.0),
})
sp.Color       = ColorSequence.new(Color3.fromRGB(215, 232, 255))
sp.Direction   = Vector3.new(0.12, -1, 0.07)
sp.RotSpeed    = NumberRange.new(-70, 70)
sp.Rotation    = NumberRange.new(0, 360)
sp.Parent      = snowSource

-- Порывы ветра
local wp = Instance.new("ParticleEmitter")
wp.Rate     = 90
wp.Speed    = NumberRange.new(32, 50)
wp.Lifetime = NumberRange.new(3, 5)
wp.Size     = NumberSequence.new(0.07)
wp.Transparency = NumberSequence.new({
	NumberSequenceKeypoint.new(0, 0.6),
	NumberSequenceKeypoint.new(1, 1.0),
})
wp.Color     = ColorSequence.new(Color3.fromRGB(195, 215, 250))
wp.Direction = Vector3.new(0.65, -1, 0.18)
wp.RotSpeed  = NumberRange.new(-40, 40)
wp.Parent    = snowSource

print("  ✓ Снегопад запущен")

-- ══════════════════════════════════════════════
-- АТМОСФЕРА
-- ══════════════════════════════════════════════

-- Очистить старые эффекты освещения
for _, child in ipairs(lighting:GetChildren()) do
	if child:IsA("PostEffect") or child:IsA("Atmosphere") or child:IsA("Sky") then
		child:Destroy()
	end
end

lighting.Ambient        = Color3.fromRGB(130, 158, 198)
lighting.OutdoorAmbient = Color3.fromRGB(110, 142, 180)
lighting.Brightness     = 2.0
lighting.ClockTime      = 15.5   -- чуть ближе к закату
lighting.FogEnd         = 450
lighting.FogStart       = 90
lighting.FogColor       = Color3.fromRGB(175, 198, 225)
lighting.ShadowSoftness = 0.6

local atm = Instance.new("Atmosphere")
atm.Density = 0.38
atm.Offset  = 0.08
atm.Color   = Color3.fromRGB(172, 202, 230)
atm.Decay   = Color3.fromRGB(95, 125, 158)
atm.Glare   = 0.08
atm.Haze    = 2.8
atm.Parent  = lighting

local bloom = Instance.new("BloomEffect")
bloom.Intensity = 0.5
bloom.Size      = 28
bloom.Threshold = 0.82
bloom.Parent    = lighting

local cc = Instance.new("ColorCorrectionEffect")
cc.Saturation = -0.18
cc.Contrast   = 0.10
cc.Brightness = 0.04
cc.TintColor  = Color3.fromRGB(205, 222, 255)
cc.Parent     = lighting

-- Лёгкое зеркальное свечение от льда
local sunRays = Instance.new("SunRaysEffect")
sunRays.Intensity = 0.06
sunRays.Spread    = 0.5
sunRays.Parent    = lighting

print("  ✓ Атмосфера настроена (закатное освещение, туман, лучи)")

-- ══════════════════════════════════════════════
-- ГОТОВО
-- ══════════════════════════════════════════════

print("")
print("╔══════════════════════════════════════════════╗")
print("║   ❄️  Зимний мир v2 готов!  ❄️              ║")
print("║                                              ║")
print("║  Рельеф:   горы, хребты, холмы, реки        ║")
print("║  Деревья:  натуральные ели с ветками/снегом  ║")
print("║  Снеговики: большие, шляпа/шарф/руки        ║")
print("║  Камни:    валуны со снежными шапками        ║")
print("║  Лёд:      сталагмиты, пруды, река          ║")
print("║  Эффекты:  снег, ветер, туман, Bloom, лучи  ║")
print("╚══════════════════════════════════════════════╝")</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Земля покрыта снегом? ✅<br>• В центре есть ледяное озеро? ✅<br>• Идёт снегопад? ✅<br>• Стоят ёлки? ✅<br>• Освещение холодное (синеватое)? ✅</p>`,
      hint: 'Enum.Material.Snow — снег, Enum.Material.Ice — лёд, Enum.Material.Rock — камень. Попробуй заменить Snow на SandWet — получится болото! Или на Mud — грязная местность.',
      difficulty: 'medium',
      solution:
        '-- см. полный код выше — terrain:Clear(), FillBlock Snow, FillCylinder Ice, ParticleEmitter для снега, ёлки из Part',
    },
    {
      title: 'Живой вулкан',
      desc: `<p>Финальное задание! Создадим вулкан который периодически извергается — лава вырывается вверх!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Terrain-вулкан стоит на карте. Каждые 10 секунд он «извергается»: из кратера вырываются оранжевые частицы, небо краснеет, раздаётся сообщение в Output. Через 3 секунды всё успокаивается.</p>

<h4>👆 Шаг 1 — Создай Script в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService → Insert Object → Script</strong></li>
  <li>Переименуй в <strong>Volcano</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script Volcano в ServerScriptService</div><pre>
local terrain = workspace.Terrain
local lighting = game.Lighting
local players = game:GetService("Players")

-- Очищаем карту
terrain:Clear()

-- Позиция вулкана (далеко от спавна)
local volcanoPos = Vector3.new(0, 0, 200)

-- Вспомогательная функция для неровных форм
local function unevenCylinder(center, radius, height, material)
    local steps = 12
    for i = 0, steps - 1 do
        local angle = (i / steps) * math.pi * 2
        local angleOffset = math.sin(angle * 3) * 0.3 + math.cos(angle * 5) * 0.2
        local currentRadius = radius * (0.7 + angleOffset + math.random(90, 110)/100)
        
        for h = 0, height, 2 do
            local currentHeight = center.Y + h
            local shrink = (1 - (currentHeight - center.Y) / (height + 5)) * currentRadius
            local x = center.X + math.cos(angle) * shrink * (0.8 + math.sin(angle * 2) * 0.2)
            local z = center.Z + math.sin(angle) * shrink * (0.8 + math.cos(angle * 3) * 0.2)
            
            terrain:FillBlock(
                CFrame.new(x, currentHeight, z),
                Vector3.new(4, 2, 4),
                material
            )
        end
    end
end

-- === НАТУРАЛЬНЫЙ ВУЛКАН (45 блоков высоты) ===
print("🌋 Строю натуральный вулкан...")

-- Неровное основание
for x = -45, 45, 6 do
    for z = -45, 45, 6 do
        local dist = math.sqrt(x*x + z*z)
        if dist < 42 then
            local noise = math.sin(x * 0.2) * math.cos(z * 0.2) * 4
            local height = 3 + noise
            if dist < 38 then
                height = height + (1 - dist/38) * 8
            end
            terrain:FillBlock(
                CFrame.new(volcanoPos.X + x, -2 + height, volcanoPos.Z + z),
                Vector3.new(5, 2, 5),
                Enum.Material.Rock
            )
        end
    end
end

-- Основной конус (асимметричный)
local layers = {
    {y = 5,  r1 = 35, r2 = 32, mat = Enum.Material.Rock},
    {y = 10, r1 = 32, r2 = 28, mat = Enum.Material.Rock},
    {y = 15, r1 = 28, r2 = 24, mat = Enum.Material.Rock},
    {y = 20, r1 = 24, r2 = 20, mat = Enum.Material.Rock},
    {y = 25, r1 = 20, r2 = 17, mat = Enum.Material.Rock},
    {y = 30, r1 = 17, r2 = 14, mat = Enum.Material.Rock},
    {y = 34, r1 = 14, r2 = 12, mat = Enum.Material.Rock},
    {y = 38, r1 = 12, r2 = 10, mat = Enum.Material.Rock},
    {y = 42, r1 = 10, r2 = 8,  mat = Enum.Material.Rock},
}

for _, layer in ipairs(layers) do
    local angle = math.random() * math.pi * 2
    local offsetX = math.cos(angle) * 2
    local offsetZ = math.sin(angle) * 2
    
    for i = 0, 36 do
        local ang = (i / 36) * math.pi * 2
        local radNoise = 0.8 + math.sin(ang * 4) * 0.15 + math.cos(ang * 7) * 0.1
        local radius = (layer.r1 + (layer.r2 - layer.r1) * 0.5) * radNoise
        
        local x = volcanoPos.X + offsetX + math.cos(ang) * radius
        local z = volcanoPos.Z + offsetZ + math.sin(ang) * radius
        
        terrain:FillBlock(
            CFrame.new(x, volcanoPos.Y + layer.y, z),
            Vector3.new(4, 3, 4),
            layer.mat
        )
    end
end

-- Неровный кратер
local craterRadius = 11
for ang = 0, 360, 15 do
    local rad = math.rad(ang)
    local noiseRadius = craterRadius + math.sin(ang * 3) * 2
    local x = volcanoPos.X + math.cos(rad) * noiseRadius
    local z = volcanoPos.Z + math.sin(rad) * noiseRadius
    
    for y = 38, 45 do
        local heightFactor = (y - 38) / 7
        local currentRadius = noiseRadius * (1 - heightFactor * 0.6)
        local cx = volcanoPos.X + math.cos(rad) * currentRadius
        local cz = volcanoPos.Z + math.sin(rad) * currentRadius
        
        terrain:FillBlock(
            CFrame.new(cx, volcanoPos.Y + y, cz),
            Vector3.new(3, 1, 3),
            Enum.Material.Rock
        )
    end
end

-- Убираем центр кратера (воздух)
for x = -13, 13, 3 do
    for z = -13, 13, 3 do
        local dist = math.sqrt(x*x + z*z)
        if dist < 12 then
            for y = 38, 46 do
                terrain:FillBlock(
                    CFrame.new(volcanoPos.X + x, volcanoPos.Y + y, volcanoPos.Z + z),
                    Vector3.new(3, 1, 3),
                    Enum.Material.Air
                )
            end
        end
    end
end

-- Лава в кратере (неровная)
for x = -9, 9, 2 do
    for z = -9, 9, 2 do
        local dist = math.sqrt(x*x + z*z)
        if dist < 9 and math.random() < 0.7 then
            terrain:FillBlock(
                CFrame.new(volcanoPos.X + x, volcanoPos.Y + 38 + math.random(0, 2), volcanoPos.Z + z),
                Vector3.new(2, 1, 2),
                Enum.Material.Sandstone
            )
        end
    end
end

-- Земля вокруг
terrain:FillBlock(
    CFrame.new(volcanoPos.X, volcanoPos.Y - 3, volcanoPos.Z),
    Vector3.new(300, 4, 300),
    Enum.Material.Ground
)

-- Потоки застывшей лавы
for i = 1, 30 do
    local angle = math.random() * math.pi * 2
    local startRadius = 18 + math.random(0, 8)
    local endRadius = 35 + math.random(0, 20)
    local pathX = volcanoPos.X + math.cos(angle) * startRadius
    local pathZ = volcanoPos.Z + math.sin(angle) * startRadius
    
    for r = startRadius, endRadius, 2 do
        local currentX = volcanoPos.X + math.cos(angle) * r
        local currentZ = volcanoPos.Z + math.sin(angle) * r
        local width = 2 + math.sin(r * 0.5) * 1.5
        local height = 1 + math.random(0, 2)
        
        terrain:FillBlock(
            CFrame.new(currentX + math.random(-width, width), volcanoPos.Y + 2 + math.random(0, 2), currentZ + math.random(-width, width)),
            Vector3.new(width * 2, height, width * 2),
            Enum.Material.Sandstone
        )
    end
end

-- === ЛАВОВОЕ ОЗЕРО ===
local lavaPool = Instance.new("Part")
lavaPool.Name = "LavaPool"
lavaPool.Size = Vector3.new(18, 1, 22)
lavaPool.Position = volcanoPos + Vector3.new(1, 39.5, -1)
lavaPool.Anchored = true
lavaPool.CanCollide = true
lavaPool.Material = Enum.Material.Neon
lavaPool.Color = Color3.fromRGB(255, 80, 0)
lavaPool.Parent = workspace

-- Свечение
local lavaLight = Instance.new("PointLight")
lavaLight.Color = Color3.fromRGB(255, 50, 0)
lavaLight.Range = 50
lavaLight.Brightness = 4
lavaLight.Parent = lavaPool

-- === ЧАСТИЦЫ ===
local particleSource = Instance.new("Part")
particleSource.Size = Vector3.new(14, 1, 14)
particleSource.Position = volcanoPos + Vector3.new(0, 41, 0)
particleSource.Anchored = true
particleSource.CanCollide = false
particleSource.Transparency = 1
particleSource.Parent = workspace

-- Пепел
local ash = Instance.new("ParticleEmitter")
ash.Rate = 25
ash.Speed = NumberRange.new(15, 35)
ash.Lifetime = NumberRange.new(5, 9)
ash.Size = NumberSequence.new({
    NumberSequenceKeypoint.new(0, 1),
    NumberSequenceKeypoint.new(1, 3)
})
ash.Transparency = NumberSequence.new({
    NumberSequenceKeypoint.new(0, 0.2),
    NumberSequenceKeypoint.new(1, 1)
})
ash.Color = ColorSequence.new(Color3.fromRGB(70, 70, 80))
ash.SpreadAngle = Vector2.new(30, 30)
ash.Parent = particleSource

-- Искры
local sparks = Instance.new("ParticleEmitter")
sparks.Rate = 0
sparks.Speed = NumberRange.new(40, 90)
sparks.Lifetime = NumberRange.new(0.8, 1.8)
sparks.Size = NumberSequence.new(0.4)
sparks.Color = ColorSequence.new({
    ColorSequenceKeypoint.new(0, Color3.fromRGB(255, 120, 0)),
    ColorSequenceKeypoint.new(0.7, Color3.fromRGB(255, 40, 0)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(40, 40, 40))
})
sparks.SpreadAngle = Vector2.new(50, 50)
sparks.Parent = particleSource

-- Дымовые струи
local smokeVents = {}
for i = 1, 6 do
    local angle = math.random() * math.pi * 2
    local radius = 10 + math.random(0, 5)
    local vent = Instance.new("Part")
    vent.Size = Vector3.new(2, 1, 2)
    vent.Position = volcanoPos + Vector3.new(math.cos(angle) * radius, 42 + math.random(0, 3), math.sin(angle) * radius)
    vent.Anchored = true
    vent.CanCollide = false
    vent.Transparency = 1
    vent.Parent = workspace
    
    local smoke = Instance.new("ParticleEmitter")
    smoke.Rate = 10 + math.random(0, 10)
    smoke.Speed = NumberRange.new(20, 45)
    smoke.Lifetime = NumberRange.new(3, 6)
    smoke.Size = NumberSequence.new(1.5)
    smoke.Transparency = NumberSequence.new({
        NumberSequenceKeypoint.new(0, 0.3),
        NumberSequenceKeypoint.new(1, 1)
    })
    smoke.Color = ColorSequence.new(Color3.fromRGB(80, 80, 90))
    smoke.SpreadAngle = Vector2.new(20, 20)
    smoke.Parent = vent
    
    table.insert(smokeVents, smoke)
end

-- Тряска камеры
local function shakeCamera(intensity, duration)
    for _, player in ipairs(players:GetPlayers()) do
        local character = player.Character
        if character and character:FindFirstChild("Humanoid") then
            local shake = Instance.new("BoolValue")
            shake.Name = "CameraShake"
            shake.Parent = character
            task.wait(duration)
            shake:Destroy()
        end
    end
end

print("✅ Натуральный вулкан готов!")
print("📍 Высота: ~45 блоков")
print("📍 Позиция: X=0, Z=200")

-- Мерцание лавы
task.spawn(function()
    while true do
        task.wait(0.15)
        lavaLight.Brightness = 3 + math.random() * 3
    end
end)

-- === ЦИКЛ ИЗВЕРЖЕНИЙ ===
while true do
    for i = 1, 35 do
        task.wait(1)
        ash.Rate = 20 + math.random(0, 10)
    end
    
    print("🌋 НАЧАЛО ИЗВЕРЖЕНИЯ!")
    
    lighting.Ambient = Color3.fromRGB(160, 50, 20)
    lighting.Brightness = 3.5
    lighting.FogStart = 10
    lighting.FogEnd = 180
    lighting.FogColor = Color3.fromRGB(180, 70, 30)
    
    lavaLight.Brightness = 10
    lavaPool.Color = Color3.fromRGB(255, 150, 30)
    
    sparks.Rate = 400
    ash.Rate = 150
    ash.Speed = NumberRange.new(40, 80)
    
    for _, smoke in ipairs(smokeVents) do
        smoke.Rate = 40
        smoke.Speed = NumberRange.new(35, 65)
    end
    
    shakeCamera(2, 6)
    
    task.wait(6)
    
    print("Вулкан успокаивается...")
    
    lighting.Ambient = Color3.fromRGB(100, 100, 100)
    lighting.Brightness = 2
    lighting.FogStart = 0
    lighting.FogEnd = 1000
    lighting.FogColor = Color3.fromRGB(128, 128, 128)
    
    lavaLight.Brightness = 4
    lavaPool.Color = Color3.fromRGB(255, 80, 0)
    
    sparks.Rate = 0
    ash.Rate = 25
    ash.Speed = NumberRange.new(15, 35)
    
    for _, smoke in ipairs(smokeVents) do
        smoke.Rate = 12
        smoke.Speed = NumberRange.new(20, 45)
    end
    
    task.wait(3)
end</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Вулкан построен из нескольких ярусов? ✅<br>• Виден кратер и лава внутри? ✅<br>• Каждые 10 секунд начинается извержение? ✅<br>• Небо краснеет во время извержения? ✅<br>• Летят оранжевые частицы? ✅</p>`,
      hint: 'Terrain:FillCylinder с материалом Enum.Material.Air удаляет террейн — именно так делается кратер! Попробуй изменить task.wait(10) на task.wait(5) — извержения будут чаще. Или task.wait(3) в извержении на task.wait(8) — долгое извержение!',
      difficulty: 'hard',
      solution:
        '-- terrain:Clear(), несколько FillCylinder Rock убывающего радиуса, FillCylinder Air для кратера, FillCylinder Lava на дне\n-- ParticleEmitter над кратером Rate=0\n-- while true do task.wait(10) lighting.Ambient=red lavaParticles.Rate=150 task.wait(3) lighting.Ambient=normal lavaParticles.Rate=0 end',
    },
  ],
};
