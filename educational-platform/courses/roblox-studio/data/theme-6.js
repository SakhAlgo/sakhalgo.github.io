const theme6 = {
  id: 6,
  title: "Процедурная генерация: мир создаёт себя сам",
  theory: {
    title: "Как игра строит мир из кода?",
    subtitle: "math.noise, циклы, случайные числа, автоматическое создание объектов",
    content: `<p><strong>Процедурная генерация</strong> — это когда мир создаётся не вручную, а по правилам и математике. Minecraft генерирует горы и пещеры именно так! Ты пишешь правила — компьютер строит мир.</p>

      <h3 style="color:var(--accent);margin-top:24px">🎲 math.random — случайные числа</h3>
      <p>Самый простой инструмент генерации — случайное число.<br>
      • <code>math.random(1, 10)</code> — целое число от 1 до 10<br>
      • <code>math.random()</code> — дробное число от 0 до 1</p>
      <div class="code-block"><div class="code-header">Пример: случайная высота блока</div><pre>-- Каждый раз выдаёт разное число от 1 до 8
local height = math.random(1, 8)
part.Size = Vector3.new(4, height, 4)</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🌊 math.noise — плавный шум</h3>
      <p><code>math.noise(x, z)</code> возвращает число от -1 до 1, но в отличие от math.random — <strong>плавно меняется</strong>. Соседние значения похожи друг на друга. Именно это делает горы похожими на горы, а не на случайные иголки!</p>
      <div class="code-block"><div class="code-header">Пример: высота по координатам</div><pre>-- Умножаем координаты на 0.1 чтобы изменения были плавными
-- Умножаем результат на 10 чтобы горы были выше
local height = math.noise(x * 0.1, z * 0.1) * 10</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🔁 Цикл для создания множества объектов</h3>
      <div class="code-block"><div class="code-header">Создать 10 блоков в ряд</div><pre>for i = 1, 10 do
    local part = Instance.new("Part")
    part.Position = Vector3.new(i * 5, 0, 0)
    part.Parent = workspace
end</pre></div>`,
  },
  tasks: [
    {
      title: "Случайный лес",
      desc: `<p>Создадим лес из деревьев! Каждое дерево случайное — разная высота, разный оттенок зелёного.</p>

<h4>🎯 Что должно получиться:</h4>
<p>При запуске игры появляется 20 деревьев в случайных местах. Каждое дерево — ствол (коричневый цилиндр) и крона (зелёный шар). Все разные по высоте!</p>

<h4>👆 Шаг 1 — Создай Script в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService → Insert Object → Script</strong></li>
  <li>Переименуй в <strong>ForestGenerator</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script ForestGenerator в ServerScriptService</div><pre>-- Сколько деревьев создать
local TREE_COUNT = 20

-- На каком участке карты разбросать деревья
-- Деревья будут в квадрате от -50 до +50 по X и Z
local AREA = 50

for i = 1, TREE_COUNT do

    -- Случайная позиция в пределах области
    local x = math.random(-AREA, AREA)
    local z = math.random(-AREA, AREA)

    -- Случайная высота дерева от 3 до 8
    local trunkHeight = math.random(3, 8)

    -- === СТВОЛ ДЕРЕВА ===
    local trunk = Instance.new("Part")
    trunk.Name = "Trunk_" .. i

    -- Цилиндр для ствола
    trunk.Shape = Enum.PartType.Cylinder

    -- Размер: высота = trunkHeight, ширина = 1
    trunk.Size = Vector3.new(trunkHeight, 1, 1)

    -- Коричневый цвет
    trunk.BrickColor = BrickColor.new("Reddish brown")
    trunk.Material = Enum.Material.Wood

    -- Ствол не должен падать
    trunk.Anchored = true

    -- Ставим ствол: центр на высоте trunkHeight/2
    trunk.Position = Vector3.new(x, trunkHeight / 2, z)

    -- Цилиндр лежит на боку — нужно повернуть вертикально
    trunk.CFrame = CFrame.new(trunk.Position) * CFrame.Angles(0, 0, math.rad(90))

    trunk.Parent = workspace

    -- === КРОНА ДЕРЕВА (шар сверху) ===
    local crown = Instance.new("Part")
    crown.Name = "Crown_" .. i

    -- Шар для кроны
    crown.Shape = Enum.PartType.Ball

    -- Случайный размер кроны от 3 до 6
    local crownSize = math.random(3, 6)
    crown.Size = Vector3.new(crownSize, crownSize, crownSize)

    -- Зелёный цвет (один из трёх оттенков)
    local greenColors = {"Bright green", "Dark green", "Olive"}
    local randomGreen = greenColors[math.random(1, 3)]
    crown.BrickColor = BrickColor.new(randomGreen)
    crown.Material = Enum.Material.Grass

    crown.Anchored = true

    -- Крона стоит на вершине ствола
    crown.Position = Vector3.new(x, trunkHeight + crownSize / 2, z)

    crown.Parent = workspace
end

print("Лес сгенерирован! Деревьев: " .. TREE_COUNT)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• При запуске появляются деревья? ✅<br>• У каждого дерева есть ствол и крона? ✅<br>• Все деревья разные по высоте? ✅<br>• В Output написано «Лес сгенерирован!»? ✅</p>`,
      hint: "math.random(-50, 50) даёт случайное число от -50 до 50 — это координата X или Z. Каждый раз при запуске деревья будут в новых местах! Попробуй изменить TREE_COUNT на 50 — будет густой лес.",
      difficulty: "easy",
      solution: "local COUNT = 20\nlocal AREA = 50\nfor i = 1, COUNT do\n    local x = math.random(-AREA, AREA)\n    local z = math.random(-AREA, AREA)\n    local h = math.random(3, 8)\n    local trunk = Instance.new('Part')\n    trunk.Shape = Enum.PartType.Cylinder\n    trunk.Size = Vector3.new(h, 1, 1)\n    trunk.BrickColor = BrickColor.new('Reddish brown')\n    trunk.Anchored = true\n    trunk.CFrame = CFrame.new(x, h/2, z) * CFrame.Angles(0,0,math.rad(90))\n    trunk.Parent = workspace\n    local crown = Instance.new('Part')\n    crown.Shape = Enum.PartType.Ball\n    local cs = math.random(3,6)\n    crown.Size = Vector3.new(cs,cs,cs)\n    crown.BrickColor = BrickColor.new('Bright green')\n    crown.Anchored = true\n    crown.Position = Vector3.new(x, h+cs/2, z)\n    crown.Parent = workspace\nend",
    },
    {
      title: "Волнистый пол",
      desc: `<p>Используем math.noise чтобы создать красивый волнистый ландшафт — как холмы!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Сетка 10×10 блоков. Каждый блок стоит на своей высоте — получается волнистый рельеф. Блоки окрашены по высоте: низкие — синие (вода), средние — зелёные (трава), высокие — серые (горы).</p>

<h4>👆 Шаг 1 — Создай Script в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService → Insert Object → Script</strong></li>
  <li>Переименуй в <strong>TerrainGenerator</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script TerrainGenerator в ServerScriptService</div><pre>-- Размер сетки: 10 на 10 блоков
local GRID_SIZE = 10

-- Размер каждого блока
local BLOCK_SIZE = 6

-- Максимальная высота холмов
local MAX_HEIGHT = 12

-- Случайное зерно: меняет форму ландшафта
-- Попробуй изменить это число — получишь другой мир!
local SEED = math.random(1, 1000)

print("Генерация ландшафта с зерном: " .. SEED)

-- Двойной цикл: по X и по Z создаём сетку блоков
for x = 1, GRID_SIZE do
    for z = 1, GRID_SIZE do

        -- math.noise возвращает плавное число от -1 до 1
        -- Умножаем координаты на 0.3 для плавных холмов
        -- Добавляем SEED чтобы каждый запуск был уникальным
        local noiseValue = math.noise(x * 0.3 + SEED, z * 0.3 + SEED)

        -- Превращаем число от -1..1 в высоту от 1..MAX_HEIGHT
        -- (noiseValue + 1) даёт от 0 до 2
        -- / 2 даёт от 0 до 1
        -- * MAX_HEIGHT даёт от 0 до MAX_HEIGHT
        local height = math.floor((noiseValue + 1) / 2 * MAX_HEIGHT) + 1

        -- Создаём блок
        local block = Instance.new("Part")
        block.Name = "Block_" .. x .. "_" .. z
        block.Size = Vector3.new(BLOCK_SIZE, height, BLOCK_SIZE)
        block.Anchored = true

        -- Позиция: сдвигаем по X и Z, высота = height/2 (центр блока)
        block.Position = Vector3.new(
            x * BLOCK_SIZE,
            height / 2,
            z * BLOCK_SIZE
        )

        -- Цвет зависит от высоты
        if height <= 3 then
            -- Низко — вода (синий)
            block.BrickColor = BrickColor.new("Bright blue")
            block.Material = Enum.Material.SmoothPlastic
        elseif height <= 7 then
            -- Средняя высота — трава (зелёный)
            block.BrickColor = BrickColor.new("Bright green")
            block.Material = Enum.Material.Grass
        else
            -- Высоко — горы (серый)
            block.BrickColor = BrickColor.new("Medium stone grey")
            block.Material = Enum.Material.Rock
        end

        block.Parent = workspace
    end
end

print("Ландшафт готов! Блоков: " .. GRID_SIZE * GRID_SIZE)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Появилась сетка блоков с разной высотой? ✅<br>• Низкие блоки синие, средние зелёные, высокие серые? ✅<br>• Рельеф плавный (не случайные иголки)? ✅<br>• Каждый запуск даёт другой ландшафт? ✅</p>`,
      hint: "Попробуй изменить GRID_SIZE на 20 — получится больший мир. Или измени число 0.3 на 0.1 — холмы станут более пологими и широкими. Или на 0.8 — очень резкий рельеф!",
      difficulty: "easy",
      solution: "local G=10 local B=6 local H=12 local S=math.random(1,1000)\nfor x=1,G do for z=1,G do\n    local n=math.noise(x*0.3+S,z*0.3+S)\n    local h=math.floor((n+1)/2*H)+1\n    local p=Instance.new('Part')\n    p.Size=Vector3.new(B,h,B)\n    p.Anchored=true\n    p.Position=Vector3.new(x*B,h/2,z*B)\n    if h<=3 then p.BrickColor=BrickColor.new('Bright blue')\n    elseif h<=7 then p.BrickColor=BrickColor.new('Bright green')\n    else p.BrickColor=BrickColor.new('Medium stone grey') end\n    p.Parent=workspace\nend end",
    },
    {
      title: "Дорога с препятствиями",
      desc: `<p>Создадим дорогу из платформ с препятствиями! Каждый запуск — новая расстановка.</p>

<h4>🎯 Что должно получиться:</h4>
<p>15 платформ стоят в ряд. На некоторых случайно стоят препятствия (красные блоки). Нужно добраться до конца не касаясь красных!</p>

<h4>👆 Шаг 1 — Создай Script в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService → Insert Object → Script</strong></li>
  <li>Переименуй в <strong>CourseGenerator</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script CourseGenerator в ServerScriptService</div><pre>-- Количество платформ в дорожке
local PLATFORM_COUNT = 15

-- Шанс появления препятствия (от 0 до 1)
-- 0.4 = 40% шанс — на каждой второй примерно
local OBSTACLE_CHANCE = 0.4

-- Находим место куда телепортировать если попал в лаву
-- (создадим стартовую площадку)
local startPad = Instance.new("Part")
startPad.Name = "StartPad"
startPad.Size = Vector3.new(6, 1, 6)
startPad.BrickColor = BrickColor.new("Bright green")
startPad.Anchored = true
startPad.Position = Vector3.new(0, 0, 0)
startPad.Parent = workspace

-- Создаём платформы в ряд
for i = 1, PLATFORM_COUNT do

    -- === ПЛАТФОРМА ===
    local platform = Instance.new("Part")
    platform.Name = "Platform_" .. i
    platform.Size = Vector3.new(6, 1, 6)
    platform.Anchored = true

    -- Чередуем цвета для красоты
    if i % 2 == 0 then
        platform.BrickColor = BrickColor.new("White")
    else
        platform.BrickColor = BrickColor.new("Light grey")
    end

    -- Платформы стоят в ряд по оси Z
    platform.Position = Vector3.new(0, 0, i * 7)
    platform.Parent = workspace

    -- === ПРЕПЯТСТВИЕ (случайно) ===
    -- math.random() возвращает число от 0 до 1
    -- Если оно меньше OBSTACLE_CHANCE — ставим препятствие
    -- Первую и последнюю платформу пропускаем (i > 1 и i < PLATFORM_COUNT)
    if math.random() < OBSTACLE_CHANCE and i > 1 and i < PLATFORM_COUNT then

        local obstacle = Instance.new("Part")
        obstacle.Name = "Obstacle_" .. i
        obstacle.Size = Vector3.new(2, 3, 2)
        obstacle.BrickColor = BrickColor.new("Bright red")
        obstacle.Material = Enum.Material.Neon
        obstacle.Anchored = true

        -- Препятствие стоит на платформе (+2 чтобы оказаться сверху)
        obstacle.Position = Vector3.new(
            math.random(-1, 1) * 2,  -- случайно влево или вправо
            2,                         -- над платформой
            i * 7                      -- на той же Z что и платформа
        )
        obstacle.Parent = workspace

        -- Если коснулся препятствия — телепорт на старт
        local script2 = Instance.new("Script")
        script2.Parent = obstacle
        script2.Source = [[
local obs = script.Parent
local start = workspace:WaitForChild("StartPad")
obs.Touched:Connect(function(hit)
    local h = hit.Parent:FindFirstChild("Humanoid")
    local r = hit.Parent:FindFirstChild("HumanoidRootPart")
    if h and r then
        r.CFrame = start.CFrame + Vector3.new(0, 3, 0)
        print(hit.Parent.Name .. " попался на препятствие!")
    end
end)
        ]]
    end
end

-- Финишная платформа
local finish = Instance.new("Part")
finish.Name = "Finish"
finish.Size = Vector3.new(8, 1, 8)
finish.BrickColor = BrickColor.new("Bright yellow")
finish.Material = Enum.Material.Neon
finish.Anchored = true
finish.Position = Vector3.new(0, 0, (PLATFORM_COUNT + 1) * 7)
finish.Parent = workspace

print("Полоса препятствий готова! Платформ: " .. PLATFORM_COUNT)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Платформы стоят в ряд? ✅<br>• На некоторых есть красные препятствия? ✅<br>• Первая и последняя платформа без препятствий? ✅<br>• Касание красного блока телепортирует на старт? ✅<br>• Каждый запуск расстановка разная? ✅</p>`,
      hint: "Попробуй изменить OBSTACLE_CHANCE на 0.7 — препятствий будет намного больше, будет сложнее! Или на 0.1 — почти пустая дорожка. PLATFORM_COUNT можно увеличить до 30.",
      difficulty: "medium",
      solution: "local N=15 local OC=0.4\nlocal sp=Instance.new('Part') sp.Name='StartPad' sp.Size=Vector3.new(6,1,6)\nsp.BrickColor=BrickColor.new('Bright green') sp.Anchored=true sp.Position=Vector3.new(0,0,0) sp.Parent=workspace\nfor i=1,N do\n    local p=Instance.new('Part') p.Name='Platform_'..i p.Size=Vector3.new(6,1,6) p.Anchored=true\n    p.BrickColor=i%2==0 and BrickColor.new('White') or BrickColor.new('Light grey')\n    p.Position=Vector3.new(0,0,i*7) p.Parent=workspace\n    if math.random()<OC and i>1 and i<N then\n        local o=Instance.new('Part') o.Size=Vector3.new(2,3,2)\n        o.BrickColor=BrickColor.new('Bright red') o.Material=Enum.Material.Neon o.Anchored=true\n        o.Position=Vector3.new(math.random(-1,1)*2,2,i*7) o.Parent=workspace\n    end\nend",
    },
    {
      title: "Генератор комнаты с сундуками",
      desc: `<p>Создадим комнату с несколькими сундуками. Нажимаешь на сундук — получаешь случайную награду!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Квадратная комната со стенами. Внутри 5 сундуков в случайных местах. Каждый сундук даёт случайную монет от 1 до 20 при нажатии.</p>

<h4>👆 Шаг 1 — Убедись что CoinsSystem из темы 5 работает (или создай счётчик заново)</h4>

<h4>👆 Шаг 2 — Создай Script в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService → Insert Object → Script</strong></li>
  <li>Переименуй в <strong>RoomGenerator</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script RoomGenerator в ServerScriptService</div><pre>-- Размер комнаты
local ROOM_SIZE = 30
local WALL_HEIGHT = 8
local CHEST_COUNT = 5

-- === ПУСТОЙ ПОЛ ===
local floor = Instance.new("Part")
floor.Name = "Floor"
floor.Size = Vector3.new(ROOM_SIZE, 1, ROOM_SIZE)
floor.BrickColor = BrickColor.new("Medium stone grey")
floor.Material = Enum.Material.SmoothPlastic
floor.Anchored = true
floor.Position = Vector3.new(0, 0, 0)
floor.Parent = workspace

-- === ЧЕТЫРЕ СТЕНЫ ===
local walls = {
    {pos = Vector3.new(0, WALL_HEIGHT/2, ROOM_SIZE/2),  size = Vector3.new(ROOM_SIZE, WALL_HEIGHT, 1)},
    {pos = Vector3.new(0, WALL_HEIGHT/2, -ROOM_SIZE/2), size = Vector3.new(ROOM_SIZE, WALL_HEIGHT, 1)},
    {pos = Vector3.new(ROOM_SIZE/2, WALL_HEIGHT/2, 0),  size = Vector3.new(1, WALL_HEIGHT, ROOM_SIZE)},
    {pos = Vector3.new(-ROOM_SIZE/2, WALL_HEIGHT/2, 0), size = Vector3.new(1, WALL_HEIGHT, ROOM_SIZE)},
}

for i, wallData in ipairs(walls) do
    local wall = Instance.new("Part")
    wall.Name = "Wall_" .. i
    wall.Size = wallData.size
    wall.BrickColor = BrickColor.new("Sand red")
    wall.Material = Enum.Material.Brick
    wall.Anchored = true
    wall.Position = wallData.pos
    wall.Parent = workspace
end

-- === СУНДУКИ ===
-- Таблица уже открытых сундуков (чтобы не открыть дважды)
local openedChests = {}

for i = 1, CHEST_COUNT do

    -- Случайная позиция внутри комнаты
    -- Оставляем отступ от стен (-10 до 10)
    local x = math.random(-10, 10)
    local z = math.random(-10, 10)

    -- === ТЕЛО СУНДУКА (нижняя часть) ===
    local chestBody = Instance.new("Part")
    chestBody.Name = "Chest_" .. i
    chestBody.Size = Vector3.new(2.5, 1.5, 1.5)
    chestBody.BrickColor = BrickColor.new("Reddish brown")
    chestBody.Material = Enum.Material.Wood
    chestBody.Anchored = true
    chestBody.Position = Vector3.new(x, 1.25, z)
    chestBody.Parent = workspace

    -- === КРЫШКА СУНДУКА ===
    local chestLid = Instance.new("Part")
    chestLid.Name = "Lid_" .. i
    chestLid.Size = Vector3.new(2.5, 0.5, 1.5)
    chestLid.BrickColor = BrickColor.new("Dark orange")
    chestLid.Material = Enum.Material.Wood
    chestLid.Anchored = true
    chestLid.Position = Vector3.new(x, 2.25, z)
    chestLid.Parent = workspace

    -- === ЗАМОК (маленький жёлтый блок) ===
    local lock = Instance.new("Part")
    lock.Name = "Lock_" .. i
    lock.Size = Vector3.new(0.4, 0.4, 0.2)
    lock.BrickColor = BrickColor.new("Bright yellow")
    lock.Material = Enum.Material.Neon
    lock.Anchored = true
    lock.Position = Vector3.new(x, 1.5, z + 0.85)
    lock.Parent = workspace

    -- === КЛИКДЕТЕКТОР на теле сундука ===
    local clickDetector = Instance.new("ClickDetector")
    clickDetector.Parent = chestBody

    -- При нажатии на сундук
    clickDetector.MouseClick:Connect(function(player)

        -- Проверяем: уже открыт?
        if openedChests[i] then
            print("Сундук " .. i .. " уже открыт!")
            return
        end

        -- Помечаем как открытый
        openedChests[i] = true

        -- Случайная награда от 1 до 20 монет
        local reward = math.random(1, 20)
        print(player.Name .. " открыл сундук " .. i .. " и получил " .. reward .. " монет!")

        -- Добавляем монеты если есть система монет
        local leaderstats = player:FindFirstChild("leaderstats")
        if leaderstats then
            local coins = leaderstats:FindFirstChild("Монеты")
            if coins then
                coins.Value = coins.Value + reward
            end
        end

        -- Меняем цвет сундука — он теперь открытый и пустой
        chestBody.BrickColor = BrickColor.new("Medium stone grey")
        chestLid.BrickColor  = BrickColor.new("Medium stone grey")
        lock.BrickColor      = BrickColor.new("Medium stone grey")
        lock.Material        = Enum.Material.SmoothPlastic
    end)
end

print("Комната сгенерирована! Сундуков: " .. CHEST_COUNT)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Появилась комната с полом и стенами? ✅<br>• Внутри стоят сундуки в разных местах? ✅<br>• При нажатии сундук сереет и даёт монеты? ✅<br>• Повторное нажатие не даёт монеты? ✅<br>• Каждый запуск сундуки в новых местах? ✅</p>`,
      hint: "Попробуй изменить CHEST_COUNT на 10 — будет больше сундуков. Или измени диапазон наград с (1, 20) на (50, 100) — богатые сундуки! Если хочешь большую комнату — увели ROOM_SIZE до 50.",
      difficulty: "medium",
      solution: "-- см. полный код выше",
    },
    {
      title: "Бесконечная дорога",
      desc: `<p>Финальное задание! Дорога появляется впереди и исчезает сзади — как в бесконечных раннерах!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Впереди игрока постоянно появляются новые платформы. Когда платформа остаётся далеко позади — она исчезает. Дорога бесконечная!</p>

<h4>👆 Шаг 1 — Создай Script в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService → Insert Object → Script</strong></li>
  <li>Переименуй в <strong>InfiniteRoad</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script InfiniteRoad в ServerScriptService</div><pre>-- Сервис для проверки каждый кадр
local RunService = game:GetService("RunService")

-- Список созданных платформ
local platforms = {}

-- Насколько далеко впереди генерировать (в единицах)
local AHEAD_DISTANCE = 60

-- Как далеко сзади удалять
local BEHIND_DISTANCE = 40

-- Расстояние между платформами
local PLATFORM_GAP = 8

-- Z-координата последней созданной платформы
local lastZ = 0

-- Цвета платформ — чередуются
local colors = {
    BrickColor.new("White"),
    BrickColor.new("Bright blue"),
    BrickColor.new("Bright green"),
}
local colorIndex = 1

-- Функция создания одной платформы
local function createPlatform(z)

    local platform = Instance.new("Part")
    platform.Name = "Road_" .. z
    platform.Size = Vector3.new(8, 1, PLATFORM_GAP)
    platform.Anchored = true

    -- Небольшое случайное смещение по X (влево-вправо)
    local offsetX = math.random(-3, 3)
    platform.Position = Vector3.new(offsetX, 0, z)

    -- Берём следующий цвет по кругу
    platform.BrickColor = colors[colorIndex]
    colorIndex = (colorIndex % #colors) + 1

    platform.Parent = workspace

    -- Запоминаем платформу в список
    table.insert(platforms, platform)
end

-- Генерируем первые платформы чтобы было с чего начать
for z = 0, AHEAD_DISTANCE, PLATFORM_GAP do
    createPlatform(z)
    lastZ = z
end

-- Каждую секунду проверяем позицию игрока
RunService.Heartbeat:Connect(function()

    -- Получаем первого игрока (для простоты)
    local player = game.Players:GetPlayers()[1]
    if not player or not player.Character then return end

    local rootPart = player.Character:FindFirstChild("HumanoidRootPart")
    if not rootPart then return end

    local playerZ = rootPart.Position.Z

    -- Генерируем платформы впереди
    while lastZ < playerZ + AHEAD_DISTANCE do
        lastZ = lastZ + PLATFORM_GAP
        createPlatform(lastZ)
    end

    -- Удаляем платформы далеко позади
    for i = #platforms, 1, -1 do
        local platform = platforms[i]
        if platform and platform.Parent then
            if platform.Position.Z < playerZ - BEHIND_DISTANCE then
                platform:Destroy()
                table.remove(platforms, i)
            end
        end
    end
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Появились платформы перед игроком? ✅<br>• При движении вперёд платформы появляются? ✅<br>• Старые платформы позади исчезают? ✅<br>• Платформы немного сдвинуты влево-вправо? ✅<br>• Цвета чередуются? ✅</p>`,
      hint: "Измени AHEAD_DISTANCE на 120 — дорога будет строиться дальше впереди. PLATFORM_GAP можно увеличить до 12 — появятся пропасти между платформами! Будь осторожен — если пропасть слишком большая, не допрыгнешь.",
      difficulty: "hard",
      solution: "local RS=game:GetService('RunService')\nlocal platforms={} local lastZ=0 local GAP=8 local AHEAD=60 local BEHIND=40\nlocal colors={BrickColor.new('White'),BrickColor.new('Bright blue'),BrickColor.new('Bright green')}\nlocal ci=1\nlocal function make(z)\n    local p=Instance.new('Part') p.Size=Vector3.new(8,1,GAP) p.Anchored=true\n    p.Position=Vector3.new(math.random(-3,3),0,z)\n    p.BrickColor=colors[ci] ci=ci%#colors+1\n    p.Parent=workspace table.insert(platforms,p)\nend\nfor z=0,AHEAD,GAP do make(z) lastZ=z end\nRS.Heartbeat:Connect(function()\n    local pl=game.Players:GetPlayers()[1]\n    if not pl or not pl.Character then return end\n    local r=pl.Character:FindFirstChild('HumanoidRootPart')\n    if not r then return end\n    local pz=r.Position.Z\n    while lastZ<pz+AHEAD do lastZ=lastZ+GAP make(lastZ) end\n    for i=#platforms,1,-1 do\n        local p=platforms[i]\n        if p and p.Parent and p.Position.Z<pz-BEHIND then p:Destroy() table.remove(platforms,i) end\n    end\nend)",
    },
  ],
};