const theme7 = {
  id: 7,
  title: "Террейн и окружение: ландшафт, вода, небо",
  theory: {
    title: "Как сделать красивый мир в Roblox?",
    subtitle: "Terrain, Atmosphere, Lighting, Sky, FillBlock",
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
      title: "Зелёный остров",
      desc: `<p>Создадим остров из кода! Скрипт нарисует землю, пляж и воду вокруг.</p>

<h4>🎯 Что должно получиться:</h4>
<p>При запуске появляется круглый остров: зелёная трава в центре, жёлтый песок по краям, вода вокруг. Красиво как в тропической игре!</p>

<h4>👆 Шаг 1 — Очисти Terrain перед стартом:</h4>
<ol>
  <li>В Explorer нажми на <strong>Workspace → Terrain</strong></li>
  <li>В Properties найди кнопку <strong>Clear</strong> или используй меню<br>
    <strong>Home → Edit → Terrain Editor → вкладка Edit → Clear</strong></li>
</ol>

<h4>👆 Шаг 2 — Создай Script в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService → Insert Object → Script</strong></li>
  <li>Переименуй в <strong>IslandGenerator</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script IslandGenerator в ServerScriptService</div><pre>-- Получаем объект Terrain
local terrain = workspace.Terrain

-- Сначала очищаем всё что было
terrain:Clear()

-- Размеры острова
local ISLAND_RADIUS = 60   -- радиус всего острова
local SAND_WIDTH    = 15   -- ширина пляжа
local WATER_DEPTH   = 10   -- глубина воды
local LAND_HEIGHT   = 6    -- высота суши

print("Генерирую остров...")

-- === ВОДА ВОКРУГ ОСТРОВА ===
-- FillBlock заполняет прямоугольник материалом
-- Делаем большое озеро/океан вокруг
terrain:FillBlock(
    CFrame.new(0, -WATER_DEPTH / 2, 0),           -- центр воды (немного под землёй)
    Vector3.new(300, WATER_DEPTH, 300),            -- большой прямоугольник
    Enum.Material.Water                            -- материал: вода
)

-- === ПЕСЧАНЫЙ ПЛЯЖ ===
-- Цилиндр песка поверх воды
terrain:FillCylinder(
    CFrame.new(0, 0, 0),                          -- центр
    LAND_HEIGHT / 2,                              -- высота
    ISLAND_RADIUS,                                -- радиус
    Enum.Material.Sand                            -- материал: песок
)

-- === ЗЕЛЁНАЯ ТРАВА В ЦЕНТРЕ ===
-- Меньший цилиндр поверх песка
terrain:FillCylinder(
    CFrame.new(0, LAND_HEIGHT / 4, 0),            -- чуть выше чем песок
    LAND_HEIGHT,                                  -- высота
    ISLAND_RADIUS - SAND_WIDTH,                   -- радиус меньше острова
    Enum.Material.Grass                           -- материал: трава
)

-- === НЕБОЛЬШОЙ ХОЛМ В ЦЕНТРЕ ===
terrain:FillCylinder(
    CFrame.new(0, LAND_HEIGHT, 0),                -- ещё выше
    LAND_HEIGHT / 2,                              -- половина высоты
    ISLAND_RADIUS / 3,                            -- маленький радиус
    Enum.Material.Grass
)

print("Остров готов! Можно прыгать в воду 🌊")</pre></div>

<h4>👆 Шаг 3 — Настрой воду в Lighting:</h4>
<ol>
  <li>В Explorer найди <strong>Lighting</strong></li>
  <li>В Properties измени:<br>
    &nbsp;&nbsp;• <strong>ClockTime</strong> → 14 (дневное время)<br>
    &nbsp;&nbsp;• <strong>Brightness</strong> → 2<br>
    &nbsp;&nbsp;• <strong>Ambient</strong> → светло-голубой цвет</li>
</ol>

<h4>🔍 Проверь себя:</h4>
<p>• Появилась синяя вода вокруг? ✅<br>• Остров с жёлтым пляжем? ✅<br>• Зелёная трава в центре? ✅<br>• Небольшой холм посередине? ✅</p>`,
      hint: "FillCylinder создаёт цилиндрическую область — гораздо красивее для острова чем прямоугольный FillBlock! Попробуй изменить ISLAND_RADIUS на 100 — остров будет огромным.",
      difficulty: "easy",
      solution: "local t=workspace.Terrain\nt:Clear()\nt:FillBlock(CFrame.new(0,-5,0),Vector3.new(300,10,300),Enum.Material.Water)\nt:FillCylinder(CFrame.new(0,0,0),3,60,Enum.Material.Sand)\nt:FillCylinder(CFrame.new(0,1.5,0),6,45,Enum.Material.Grass)\nt:FillCylinder(CFrame.new(0,6,0),3,20,Enum.Material.Grass)",
    },
    {
      title: "Смена дня и ночи",
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
local lighting = game.Lighting

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
      hint: "ClockTime — это как часы: 0 = полночь, 6 = утро, 12 = полдень, 18 = вечер, 24 = снова полночь. Попробуй изменить DAY_LENGTH на 10 — день будет проноситься за 10 секунд!",
      difficulty: "easy",
      solution: "local L=game.Lighting\nL.ClockTime=6\nlocal DL=60\nlocal HPS=24/DL\nwhile true do\n    task.wait(0.1)\n    L.ClockTime=(L.ClockTime+HPS*0.1)%24\n    local t=L.ClockTime\n    if t>=5 and t<8 then L.Ambient=Color3.fromRGB(120,80,40) L.Brightness=1.5\n    elseif t>=8 and t<17 then L.Ambient=Color3.fromRGB(120,120,120) L.Brightness=2.5\n    elseif t>=17 and t<20 then L.Ambient=Color3.fromRGB(150,60,20) L.Brightness=1.0\n    else L.Ambient=Color3.fromRGB(20,20,60) L.Brightness=0.3 end\nend",
    },
    {
      title: "Погода: дождь и туман",
      desc: `<p>Добавим погоду! Нажимаешь кнопку — начинается дождь с туманом. Нажимаешь ещё раз — снова солнечно.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Кнопка «🌧 Дождь» на экране. При нажатии небо темнеет, появляется туман и падают частицы дождя. Повторное нажатие возвращает солнце.</p>

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
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → тёмно-синий<br>
    &nbsp;&nbsp;• <strong>TextColor3</strong> → белый<br>
    &nbsp;&nbsp;• <strong>TextScaled</strong> → ✅</li>
</ol>

<h4>👆 Шаг 3 — Добавь LocalScript в WeatherGui:</h4>
<div class="code-block"><div class="code-header">LocalScript внутри WeatherGui</div><pre>local weatherBtn  = script.Parent:WaitForChild("WeatherBtn")
local weatherEvent = game.ReplicatedStorage:WaitForChild("WeatherEvent")

-- Идёт дождь или нет?
local isRaining = false

weatherBtn.MouseButton1Click:Connect(function()
    -- Переключаем состояние погоды
    isRaining = not isRaining

    -- Отправляем серверу: true = дождь, false = солнце
    weatherEvent:FireServer(isRaining)

    -- Меняем кнопку
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
local lighting     = game.Lighting

-- Находим Atmosphere (должна быть в Lighting)
local atmosphere = lighting:WaitForChild("Atmosphere")

-- Создаём RainPart — источник частиц дождя над картой
local rainEmitter = Instance.new("Part")
rainEmitter.Name       = "RainEmitter"
rainEmitter.Size       = Vector3.new(200, 1, 200)  -- большая область
rainEmitter.Anchored   = true
rainEmitter.CanCollide = false
rainEmitter.Transparency = 1                        -- невидимый
rainEmitter.Position   = Vector3.new(0, 80, 0)     -- высоко в небе
rainEmitter.Parent     = workspace

-- Создаём ParticleEmitter — источник частиц (капли дождя)
local rainParticles = Instance.new("ParticleEmitter")
rainParticles.Name        = "RainParticles"
rainParticles.Rate        = 0         -- пока выключен
rainParticles.Speed       = NumberRange.new(80, 100) -- скорость падения
rainParticles.Lifetime    = NumberRange.new(1, 1.5)  -- как долго живёт капля
rainParticles.Size        = NumberSequence.new(0.05) -- маленькие капли
rainParticles.Color       = ColorSequence.new(Color3.fromRGB(150, 180, 255))
rainParticles.Direction   = Vector3.new(0, -1, 0)    -- вниз
rainParticles.Parent      = rainEmitter

-- Получаем сигнал от кнопки
weatherEvent.OnServerEvent:Connect(function(player, isRaining)

    if isRaining then
        -- === ВКЛЮЧАЕМ ДОЖДЬ ===
        print("Начинается дождь!")

        -- Темнеем небо
        lighting.ClockTime = 14    -- остаётся день но...
        lighting.Brightness = 0.8  -- ...намного темнее
        lighting.Ambient = Color3.fromRGB(60, 70, 90)  -- серо-синий

        -- Усиливаем туман
        atmosphere.Density = 0.7   -- густой туман
        atmosphere.Color   = Color3.fromRGB(100, 110, 130)

        -- Включаем частицы дождя
        rainParticles.Rate = 500   -- 500 капель в секунду

    else
        -- === ВЫКЛЮЧАЕМ ДОЖДЬ ===
        print("Дождь кончился, снова солнечно!")

        -- Возвращаем солнечное освещение
        lighting.Brightness = 2.5
        lighting.Ambient = Color3.fromRGB(120, 120, 120)

        -- Убираем туман
        atmosphere.Density = 0.3
        atmosphere.Color   = Color3.fromRGB(180, 200, 220)

        -- Выключаем дождь
        rainParticles.Rate = 0
    end
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• WeatherEvent лежит в ReplicatedStorage? ✅<br>• Atmosphere добавлена в Lighting? ✅<br>• При нажатии небо темнеет? ✅<br>• Появляются частицы дождя? ✅<br>• Кнопка меняет текст? ✅</p>`,
      hint: "ParticleEmitter — это источник частиц. Rate = 0 значит выключен, Rate = 500 значит 500 частиц в секунду. Попробуй изменить Rate на 1000 — ливень! Или на 50 — редкий дождик.",
      difficulty: "medium",
      solution: "-- LocalScript: isRaining=not isRaining; ev:FireServer(isRaining)\n-- Script: ev.OnServerEvent:Connect(function(p,rain) if rain then L.Brightness=0.8 atm.Density=0.7 rp.Rate=500 else L.Brightness=2.5 atm.Density=0.3 rp.Rate=0 end end)",
    },
    {
      title: "Зимняя карта со снегом",
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

<div class="code-block"><div class="code-header">Script WinterMap в ServerScriptService</div><pre>local terrain = workspace.Terrain

print("Создаю зимнюю карту...")

-- === СНЕЖНЫЙ ЛАНДШАФТ ===
-- Очищаем и создаём снежную равнину
terrain:Clear()

-- Большая плоская равнина из снега
terrain:FillBlock(
    CFrame.new(0, -2, 0),
    Vector3.new(300, 4, 300),
    Enum.Material.Snow          -- материал: снег!
)

-- Холмы из снега (несколько в разных местах)
local hillPositions = {
    Vector3.new(30,  4, 20),
    Vector3.new(-40, 4, 50),
    Vector3.new(60,  4, -30),
    Vector3.new(-20, 4, -60),
}

for _, pos in ipairs(hillPositions) do
    -- Случайный размер холма
    local radius = math.random(10, 25)
    local height = math.random(5, 15)

    terrain:FillCylinder(
        CFrame.new(pos),
        height,
        radius,
        Enum.Material.Snow
    )
end

-- Замёрзшее озеро в центре (лёд)
terrain:FillCylinder(
    CFrame.new(0, 0, 0),
    1,          -- плоский
    20,         -- радиус
    Enum.Material.Ice  -- материал: лёд!
)

-- === СНЕГОПАД ===
-- Невидимый блок высоко в небе — источник снежинок
local snowSource = Instance.new("Part")
snowSource.Name        = "SnowSource"
snowSource.Size        = Vector3.new(300, 1, 300)
snowSource.Anchored    = true
snowSource.CanCollide  = false
snowSource.Transparency = 1
snowSource.Position    = Vector3.new(0, 100, 0)
snowSource.Parent      = workspace

-- Частицы снежинок
local snowParticles = Instance.new("ParticleEmitter")
snowParticles.Rate      = 200                            -- 200 снежинок в секунду
snowParticles.Speed     = NumberRange.new(20, 30)        -- медленно падают
snowParticles.Lifetime  = NumberRange.new(4, 6)          -- живут долго
snowParticles.Size      = NumberSequence.new(0.15)       -- маленькие
snowParticles.Color     = ColorSequence.new(Color3.fromRGB(240, 245, 255)) -- белые
snowParticles.Direction = Vector3.new(0.1, -1, 0.1)     -- чуть под углом (ветер)
snowParticles.RotSpeed  = NumberRange.new(-50, 50)       -- вращаются
snowParticles.Parent    = snowSource

-- === ЁЛКИ ===
-- Расставим несколько ёлок по карте
local treePositions = {
    Vector3.new(15, 2, 15),
    Vector3.new(-25, 2, 10),
    Vector3.new(40, 2, -20),
    Vector3.new(-10, 2, 40),
    Vector3.new(55, 2, 30),
}

for i, pos in ipairs(treePositions) do
    local treeHeight = math.random(8, 15)

    -- Ствол
    local trunk = Instance.new("Part")
    trunk.Shape     = Enum.PartType.Cylinder
    trunk.Size      = Vector3.new(treeHeight, 0.8, 0.8)
    trunk.BrickColor = BrickColor.new("Reddish brown")
    trunk.Material  = Enum.Material.Wood
    trunk.Anchored  = true
    trunk.CFrame    = CFrame.new(pos + Vector3.new(0, treeHeight/2, 0)) * CFrame.Angles(0,0,math.rad(90))
    trunk.Parent    = workspace

    -- Три уровня хвои (конусы из цилиндров)
    for level = 1, 3 do
        local foliage = Instance.new("Part")
        foliage.Shape    = Enum.PartType.Ball
        local size       = (4 - level) * 3  -- верхний уровень меньше
        foliage.Size     = Vector3.new(size, size * 0.6, size)
        foliage.BrickColor = BrickColor.new("Dark green")
        foliage.Material = Enum.Material.Grass
        foliage.Anchored = true
        foliage.Position = pos + Vector3.new(0, treeHeight * 0.4 + level * 3, 0)
        foliage.Parent   = workspace
    end
end

print("Зимняя карта готова! ❄️")</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Земля покрыта снегом? ✅<br>• В центре есть ледяное озеро? ✅<br>• Идёт снегопад? ✅<br>• Стоят ёлки? ✅<br>• Освещение холодное (синеватое)? ✅</p>`,
      hint: "Enum.Material.Snow — снег, Enum.Material.Ice — лёд, Enum.Material.Rock — камень. Попробуй заменить Snow на SandWet — получится болото! Или на Mud — грязная местность.",
      difficulty: "medium",
      solution: "-- см. полный код выше — terrain:Clear(), FillBlock Snow, FillCylinder Ice, ParticleEmitter для снега, ёлки из Part",
    },
    {
      title: "Живой вулкан",
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
      hint: "Terrain:FillCylinder с материалом Enum.Material.Air удаляет террейн — именно так делается кратер! Попробуй изменить task.wait(10) на task.wait(5) — извержения будут чаще. Или task.wait(3) в извержении на task.wait(8) — долгое извержение!",
      difficulty: "hard",
      solution: "-- terrain:Clear(), несколько FillCylinder Rock убывающего радиуса, FillCylinder Air для кратера, FillCylinder Lava на дне\n-- ParticleEmitter над кратером Rate=0\n-- while true do task.wait(10) lighting.Ambient=red lavaParticles.Rate=150 task.wait(3) lighting.Ambient=normal lavaParticles.Rate=0 end",
    },
  ],
};