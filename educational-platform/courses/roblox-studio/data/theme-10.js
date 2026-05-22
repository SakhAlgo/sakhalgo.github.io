const theme10 = {
  id: 10,
  title: "Инструменты и предметы игрока",
  theory: {
    title: "Как сделать предметы, которые можно брать в руки?",
    subtitle: "Tool, Handle, Backpack, StarterPack, Activated",
    content: `<p>В Roblox можно создавать предметы, которые игрок берёт в руки — мечи, ключи, магические палочки, еду и многое другое! Такие предметы называются <strong>Tool</strong> (инструмент).</p>

      <h3 style="color:var(--accent);margin-top:24px">🛠️ Что такое Tool?</h3>
      <p><strong>Tool</strong> — это специальный объект, который может взять в руки персонаж. Когда игрок подбирает инструмент, он появляется в панели быстрого доступа (хотбар) внизу экрана  .</p>
      <div class="code-block"><div class="code-header">Самый простой инструмент</div><pre>-- Создаём Tool и даём игроку
local tool = Instance.new("Tool")
tool.Name = "Волшебная палочка"
tool.Parent = game:GetService("StarterPack")  -- выдаётся всем игрокам</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">📦 Где хранятся инструменты?</h3>
      <p>• <strong>StarterPack</strong> — инструменты отсюда получает каждый игрок при появлении в игре.<br>
      • <strong>Workspace</strong> — инструменты, которые лежат на карте (их можно подобрать).<br>
      • <strong>Backpack игрока</strong> — рюкзак игрока, где лежат его инструменты.<br>
      • <strong>ServerStorage</strong> — склад, где инструменты ждут своего часа.</p>
      
      <div class="info-box success"><strong>💡 Важно:</strong> У каждого инструмента должна быть деталь с именем <strong>Handle</strong> — это та часть, за которую персонаж держит предмет  !</div>

      <h3 style="color:var(--accent);margin-top:24px">🎮 Главные события Tool</h3>
      <div class="code-block"><div class="code-header">Equipped, Unequipped, Activated</div><pre>
-- Объявляем переменную "tool" — это ссылка на сам инструмент
-- script.Parent означает: "родительская папка того скрипта, который сейчас работает"
-- То есть если этот скрипт лежит ВНУТРИ инструмента, то tool — это и есть этот инструмент
local tool = script.Parent

-- Когда игрок взял предмет в руки
tool.Equipped:Connect(function()
    print("Предмет в руках!")
end)

-- Когда игрок убрал предмет
tool.Unequipped:Connect(function()
    print("Предмет убран")
end)

-- Когда игрок нажал левую кнопку мыши с предметом в руках
tool.Activated:Connect(function()
    print("Предмет использован!")
end)</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">⌨️ Обработка нажатий клавиш</h3>
      <p>Если нужно, чтобы предмет реагировал на клавиши (например, R для перезарядки), используй <strong>ContextActionService</strong>  :</p>
      <div class="code-block"><div class="code-header">Привязка клавиши R</div><pre>

-- Подключаем специальную игровую службу, которая следит за нажатиями клавиш
local ContextActionService = game:GetService("ContextActionService")

-- ЭТО БЛОК-СХЕМА: что делать, когда клавиша нажата
local function onAction(actionName, inputState, inputObject)
    -- Если клавиша ТОЛЬКО ЧТО была нажата (а не зажата и не отпущена)
    if inputState == Enum.UserInputState.Begin then
        -- Пишем в консоль (для разработчика) сообщение
        print("Клавиша R нажата!")
    end
end

-- КОГДА ИГРОК ВЗЯЛ ИНСТРУМЕНТ В РУКИ (достал из рюкзака)
tool.Equipped:Connect(function()
    -- Привязываем действие "myAction" к клавише R
    -- "true" означает, что игра не будет мешать другим действиям
    ContextActionService:BindAction("myAction", onAction, true, Enum.KeyCode.R)
end)

-- КОГДА ИГРОК УБРАЛ ИНСТРУМЕНТ (положил обратно в рюкзак)
tool.Unequipped:Connect(function()
    -- Отвязываем действие "myAction" — клавиша R больше ничего не делает
    ContextActionService:UnbindAction("myAction")
end)</pre></div>`,
  },
  tasks: [
    {
      title: "Мой первый меч",
      desc: `<p>Создадим простой меч, который можно взять в руки! При нажатии мышки меч издаёт звук.</p>

<h4>🎯 Что должно получиться:</h4>
<p>На земле лежит меч. Игрок подходит, нажимает на него — и меч попадает в инвентарь. Теперь можно взять его в руки (клавиша 1) и нажимать мышкой — меч будет махать и издавать звук!</p>

<h4>👆 Шаг 1 — Создай меч (Tool):</h4>
<ol>
  <li>В <strong>Workspace</strong> нажми «+» → <strong>Tool</strong></li>
  <li>Назови его <strong>Sword</strong></li>
</ol>

<h4>👆 Шаг 2 — Добавь Handle (рукоятку):</h4>
<ol>
  <li>Внутри Sword нажми «+» → <strong>Part</strong> → назови <strong>Handle</strong>  </li>
  <li>Настрой Handle:<br>
    &nbsp;&nbsp;• <strong>Size</strong> → 1, 1, 3 (длинная палка)<br>
    &nbsp;&nbsp;• <strong>Color</strong> → серый или серебряный<br>
    &nbsp;&nbsp;• <strong>Material</strong> → Metal<br>
    &nbsp;&nbsp;• <strong>Anchored</strong> → ❌ (чтобы не парил в воздухе)</li>
  <li>Добавь лезвие (ещё один Part):<br>
    &nbsp;&nbsp;• Назови <strong>Blade</strong><br>
    &nbsp;&nbsp;• Size → 0.5, 0.5, 2<br>
    &nbsp;&nbsp;• Position → X: 0, Y: 0, Z: 1.8<br>
    &nbsp;&nbsp;• Color → голубой (Neon)</li>
</ol>

<h4>👆 Шаг 3 — Добавь звук в Tool:</h4>
<ol>
  <li>Внутри Sword нажми «+» → <strong>Sound</strong> → назови <strong>SwingSound</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>SoundId</strong> → найди в Toolbox звук «sword swing»<br>
    &nbsp;&nbsp;• <strong>Volume</strong> → 0.5</li>
</ol>

<h4>👆 Шаг 4 — Добавь Script в Sword:</h4>
<div class="code-block"><div class="code-header">Script внутри Sword</div><pre>-- Получаем инструмент и звук
local tool = script.Parent
local swingSound = tool:WaitForChild("SwingSound")

-- Анимация взмаха (меняем цвет лезвия)
local blade = tool:WaitForChild("Blade")
local originalColor = blade.Color

-- Функция взмаха
local function swing()
    print("🎮 Меч активирован!")
    
    -- Играем звук
    swingSound:Play()
    
    -- Лезвие светится белым
    blade.Color = Color3.fromRGB(255, 255, 255)
    blade.Material = Enum.Material.Neon
    
    -- Через 0.2 секунды возвращаем цвет обратно
    task.wait(0.2)
    blade.Color = originalColor
    blade.Material = Enum.Material.Metal
end

-- Когда игрок нажимает левую кнопку мыши с мечом в руках
tool.Activated:Connect(swing)

-- Когда игрок берёт меч в руки
tool.Equipped:Connect(function()
    print("🗡️ Меч в руках!")
end)

print("✅ Меч готов! Нажми на него, чтобы взять")</pre></div>

<h4>👆 Шаг 5 — Проверь работу:</h4>
<ol>
  <li>Нажми <strong>Play</strong></li>
  <li>Подойди к мечу на земле</li>
  <li>Нажми на меч, чтобы взять его в инвентарь</li>
  <li>Нажми клавишу <strong>1</strong>, чтобы взять меч в руки</li>
  <li>Нажимай левую кнопку мыши — меч машет и издаёт звук!</li>
</ol>

<h4>🔍 Проверь себя:</h4>
<p>• Есть ли у меча деталь Handle? ✅<br>• Меч можно подобрать? ✅<br>• Меч появляется в инвентаре (внизу экрана)? ✅<br>• При нажатии мышки меч меняет цвет? ✅<br>• Слышен звук взмаха? ✅</p>`,
      hint: "Handle — самая важная часть Tool! Без него предмет не возьмётся в руки  . Попробуй изменить SoundId на другой звук — например, magic spell для волшебного меча!",
      difficulty: "easy",
      solution: "local tool=script.Parent local sound=tool.SwingSound tool.Activated:Connect(function() sound:Play() end)",
    },
    {
      title: "Ключ, открывающий дверь",
      desc: `<p>Сделаем ключ, который открывает секретную дверь! Без ключа дверь не открыть.</p>

<h4>🎯 Что должно получиться:</h4>
<p>На карте есть закрытая дверь. Где-то лежит ключ. Если игрок берёт ключ в инвентарь, дверь можно открыть (нажать на неё). Если ключа нет — дверь не реагирует.</p>

<h4>👆 Шаг 1 — Создай ключ (Tool):</h4>
<ol>
  <li>В <strong>Workspace</strong> создай <strong>Tool</strong> → назови <strong>Key</strong></li>
  <li>Внутри Key создай <strong>Part</strong> → назови <strong>Handle</strong></li>
  <li>Настрой Handle:<br>
    &nbsp;&nbsp;• <strong>Size</strong> → 0.5, 0.5, 1.5<br>
    &nbsp;&nbsp;• <strong>Color</strong> → золотой (BrickColor → Bright yellow)<br>
    &nbsp;&nbsp;• <strong>Anchored</strong> → ❌<br>
    &nbsp;&nbsp;• Поставь на землю (Y = 1)</li>
  <li>Добавь кружок (головка ключа):<br>
    &nbsp;&nbsp;• Part → назови Head<br>
    &nbsp;&nbsp;• Size → 0.8, 0.8, 0.3<br>
    &nbsp;&nbsp;• Color → золотой<br>
    &nbsp;&nbsp;• Position → X: 0, Y: 0, Z: -0.8</li>
</ol>

<h4>👆 Шаг 2 — Создай дверь и кнопку открытия:</h4>
<ol>
  <li>В Workspace создай <strong>Part</strong> → назови <strong>Door</strong><br>
    &nbsp;&nbsp;• Size → 4, 6, 0.5<br>
    &nbsp;&nbsp;• Color → коричневый<br>
    &nbsp;&nbsp;• Anchored → ✅</li>
  <li>Внутри Door создай <strong>ProximityPrompt</strong>  <br>
    &nbsp;&nbsp;• <strong>ActionText</strong> → «Открыть дверь»<br>
    &nbsp;&nbsp;• <strong>ObjectText</strong> → «Дверь»</li>
</ol>

<h4>👆 Шаг 3 — Добавь Script в Door:</h4>
<div class="code-block"><div class="code-header">Script внутри Door</div><pre>
local door = script.Parent
local prompt = door:WaitForChild("ProximityPrompt")
local players = game:GetService("Players")

-- ID ключа (имя инструмента)
local REQUIRED_KEY = "Key"

prompt.Triggered:Connect(function(player)
    -- Проверяем, есть ли у игрока ключ
    local hasKey = false
    local backpack = player:FindFirstChild("Backpack")
    local character = player.Character
    
    -- Ищем ключ в рюкзаке
    if backpack then
        local key = backpack:FindFirstChild(REQUIRED_KEY)
        if key then
            hasKey = true
            key:Destroy() -- Ключ используется! Он исчезает
        end
    end
    
    -- Ищем ключ в руках
    if character then
        local key = character:FindFirstChild(REQUIRED_KEY)
        if key then
            hasKey = true
            key:Destroy()
        end
    end
    
    if hasKey then
        -- Открываем дверь!
        print("🔑 Дверь открыта!")
        
        -- Показываем сообщение игроку
        local gui = player.PlayerGui:FindFirstChild("DoorMessage")
        if not gui then
            gui = Instance.new("ScreenGui")
            gui.Name = "DoorMessage"
            gui.Parent = player.PlayerGui
            
            local label = Instance.new("TextLabel")
            label.Size = UDim2.new(0, 400, 0, 60)
            label.Position = UDim2.new(0.5, -200, 0.7, 0)
            label.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
            label.TextColor3 = Color3.fromRGB(255, 255, 255)
            label.TextScaled = true
            label.Parent = gui
        end
        
        -- Находим TextLabel внутри GUI
        local label = gui:FindFirstChild("TextLabel")
        if label then
            label.Text = "🚪 Дверь открылась! 🚪"
            task.wait(2)
            label.Text = ""
        end
        
        -- Анимация открытия (улетает вверх)
        local tweenService = game:GetService("TweenService")
        local tweenInfo = TweenInfo.new(1, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
        local goal = {CFrame = door.CFrame + Vector3.new(0, 10, 0)}
        local tween = tweenService:Create(door, tweenInfo, goal)
        tween:Play()
        
        -- Удаляем дверь через 2 секунды
        task.wait(2)
        door:Destroy()
        
    else
        -- Нет ключа
        print("🔒 Нет ключа! Дверь закрыта")
        
        local gui = player.PlayerGui:FindFirstChild("DoorMessage")
        if gui then
            local label = gui:FindFirstChild("TextLabel")
            if label then
                label.Text = "🔒 Нужен ключ! 🔒"
                task.wait(2)
                label.Text = ""
            end
        end
    end
end)

print("🚪 Дверь создана! Нужен ключ, чтобы открыть")

</pre></div>

<h4>👆 Шаг 4 — Добавь ключ в StarterPack (по желанию):</h4>
<p>Если хочешь, чтобы ключ был у игрока с самого начала — перетащи ключ в <strong>StarterPack</strong>  .</p>

<h4>🔍 Проверь себя:</h4>
<p>• Ключ можно подобрать? ✅<br>• Без ключа дверь не открывается? ✅<br>• С ключом дверь открывается? ✅<br>• После открытия ключ исчезает? ✅</p>`,
      hint: "ProximityPrompt — это кнопка, которая появляется на экране, когда игрок подходит близко к объекту. Можно менять ActionText на 'Взять ключ' или 'Использовать'!  ",
      difficulty: "medium",
      solution: "prompt.Triggered:Connect(function(p) if p.Backpack:FindFirstChild('Key') then door:Destroy() else p.PlayerGui:FindFirstChild('Hint').Text='Нужен ключ!' end end)",
    },
    {
      title: "Волшебная палочка с анимацией",
      desc: `<p>Создадим волшебную палочку, которая стреляет огненными шарами и имеет красивую анимацию взмаха!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Игрок берёт в руки волшебную палочку. При нажатии мышки палочка совершает взмах, появляется огненный шар, который летит вперёд и взрывается. Очень зрелищно!</p>

<h4>👆 Шаг 1 — Создай палочку:</h4>
<ol>
  <li>В <strong>StarterPack</strong> создай <strong>Tool</strong> → назови <strong>Wand</strong> (так палочка будет у игрока с самого начала)</li>
  <li>Внутри Wand создай <strong>Part</strong> → назови <strong>Handle</strong><br>
    &nbsp;&nbsp;• Size → 0.5, 0.5, 1<br>
    &nbsp;&nbsp;• Color → коричневый (Wood)</li>
  <li>Добавь наконечник (Part):<br>
    &nbsp;&nbsp;• Назови <strong>Tip</strong><br>
    &nbsp;&nbsp;• Size → 0.4, 0.4, 0.3<br>
    &nbsp;&nbsp;• Position → Z = 0.65<br>
    &nbsp;&nbsp;• Color → золотой (Neon)</li>
</ol>

<h4>👆 Шаг 2 — Добавь звуки:</h4>
<ol>
  <li>Добавь Sound → назови <strong>CastSound</strong> (звук заклинания)</li>
  <li>Добавь Sound → назови <strong>ExplodeSound</strong> (звук взрыва)</li>
</ol>

<h4>👆 Шаг 3 — Добавь Script в Wand:</h4>
<div class="code-block"><div class="code-header">Script внутри Wand</div><pre>local tool = script.Parent
local players = game:GetService("Players")
local castSound = tool:WaitForChild("CastSound")
local explodeSound = tool:WaitForChild("ExplodeSound")

-- Красивая анимация взмаха (поворачиваем палочку)
local function swingAnimation()
    local handle = tool.Handle
    local originalCFrame = handle.CFrame
    
    -- Поворачиваем вперёд
    handle.CFrame = handle.CFrame * CFrame.Angles(0, math.rad(30), 0)
    task.wait(0.05)
    -- Возвращаем обратно
    handle.CFrame = originalCFrame
end

-- Создание огненного шара
local function shootFireball(player)
    local character = player.Character
    if not character then return end
    
    local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
    if not humanoidRootPart then return end
    
    -- Создаём огненный шар (Part)
    local fireball = Instance.new("Part")
    fireball.Name = "Fireball"
    fireball.Size = Vector3.new(1, 1, 1)
    fireball.Shape = Enum.PartType.Ball
    fireball.Color = Color3.fromRGB(255, 100, 0)
    fireball.Material = Enum.Material.Neon
    fireball.CanCollide = false
    
    -- Ставим шар перед палочкой
    local direction = character.HumanoidRootPart.CFrame.LookVector
    fireball.CFrame = CFrame.new(
        humanoidRootPart.Position + direction * 3 + Vector3.new(0, 1.5, 0),
        humanoidRootPart.Position + direction * 10
    )
    fireball.Parent = workspace
    
    -- Добавляем свечение
    local light = Instance.new("PointLight")
    light.Color = Color3.fromRGB(255, 100, 0)
    light.Range = 10
    light.Brightness = 2
    light.Parent = fireball
    
    -- Анимация полёта
    local speed = 50
    local startPos = fireball.Position
    
    task.spawn(function()
        for i = 1, 30 do
            task.wait(0.03)
            -- Движемся вперёд
            fireball.Position = fireball.Position + direction * speed * 0.03
            
            -- Вращаем шар
            fireball.CFrame = fireball.CFrame * CFrame.Angles(math.rad(20), math.rad(20), 0)
            
            -- Проверяем, не врезался ли в что-то
            local hit = workspace:GetPartBoundsInRadius(fireball.Position, 2)
            for _, part in ipairs(hit) do
                if part ~= fireball and part.Parent ~= character then
                    -- Взрыв!
                    explodeSound:Play()
                    
                    -- Создаём маленький взрыв
                    local explosion = Instance.new("Explosion")
                    explosion.Position = fireball.Position
                    explosion.BlastRadius = 5
                    explosion.BlastPressure = 100000
                    explosion.Parent = workspace
                    
                    -- Удаляем огненный шар
                    fireball:Destroy()
                    return
                end
            end
        end
        
        -- Если ни во что не врезались, просто исчезаем
        fireball:Destroy()
    end)
end

-- Когда игрок нажимает мышку
tool.Activated:Connect(function()
    local player = players:GetPlayerFromCharacter(tool.Parent)
    if not player then return end
    
    -- Анимация взмаха
    swingAnimation()
    
    -- Звук заклинания
    castSound:Play()
    
    -- Создаём огненный шар
    shootFireball(player)
    
    print("✨ Волшебство сработало!")
end)

print("🪄 Волшебная палочка готова! Нажимай мышку, чтобы колдовать!")</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Палочка есть в инвентаре с самого начала? ✅<br>• При нажатии мышки слышен звук? ✅<br>• Появляется огненный шар? ✅<br>• Шар летит вперёд? ✅<br>• При попадании происходит взрыв? ✅</p>`,
      hint: "Можно изменить цвет огненного шара на синий (ледяная магия) или зелёный (яд). Поменяй Color3.fromRGB(255,100,0) на другой цвет!",
      difficulty: "medium",
      solution: "tool.Activated:Connect(function() local ball=Instance.new('Part') ball.Position=character.HumanoidRootPart.Position+Vector3.new(0,2,0)+direction*3 ball.Velocity=direction*70 ball.Parent=workspace end)",
    },
    {
      title: "Сбор монеток (инвентарь и счёт)",
      desc: `<p>Сделаем монетки, которые игрок собирает, и счётчик монеток на экране!</p>

<h4>🎯 Что должно получиться:</h4>
<p>По карте разбросаны золотые монетки. Когда игрок подходит к монетке, она исчезает, а на экране число монеток увеличивается. В конце можно собрать все монетки.</p>

<h4>👆 Шаг 1 — Создай монетку:</h4>
<ol>
  <li>В <strong>Workspace</strong> создай <strong>Part</strong> → назови <strong>Coin</strong><br>
    &nbsp;&nbsp;• <strong>Shape</strong> → Cylinder (как настоящая монетка)<br>
    &nbsp;&nbsp;• <strong>Size</strong> → 1, 0.2, 1<br>
    &nbsp;&nbsp;• <strong>Color</strong> → жёлтый (Neon)<br>
    &nbsp;&nbsp;• <strong>Anchored</strong> → ✅<br>
    &nbsp;&nbsp;• Поставь на землю (Y = 0.2)</li>
  <li>Добавь <strong>Sound</strong> → назови <strong>CoinSound</strong><br>
    &nbsp;&nbsp;• Найди в Toolbox звук 'coin pickup'</li>
</ol>

<h4>👆 Шаг 2 — Создай Leaderstats (счётчик) через Script:</h4>
<p>Leaderstats — это табличка с очками игрока. Она появляется справа от инвентаря.</p>
<div class="code-block"><div class="code-header">Script в ServerScriptService</div><pre>local players = game:GetService("Players")

-- Когда игрок заходит в игру
players.PlayerAdded:Connect(function(player)
    -- Создаём Leaderstats
    local stats = Instance.new("Folder")
    stats.Name = "leaderstats"
    stats.Parent = player
    
    -- Добавляем счётчик монеток
    local coins = Instance.new("NumberValue")
    coins.Name = "Монетки"
    coins.Value = 0
    coins.Parent = stats
end)

print("💰 Система счёта монеток готова!")</pre></div>

<h4>👆 Шаг 3 — Добавь Script в монетку:</h4>
<div class="code-block"><div class="code-header">Script внутри Coin</div><pre>local coin = script.Parent
local coinSound = coin:WaitForChild("CoinSound")
local players = game:GetService("Players")

-- Анимация вращения монетки
task.spawn(function()
    while coin.Parent do
        task.wait(0.05)
        coin.CFrame = coin.CFrame * CFrame.Angles(0, math.rad(10), 0)
    end
end)

-- Когда игрок касается монетки
coin.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChild("Humanoid")
    
    if not humanoid then return end
    
    local player = players:GetPlayerFromCharacter(character)
    if not player then return end
    
    -- Проверяем, не собрали ли уже эту монетку
    if coin:FindFirstChild("Collected") then return end
    
    -- Отмечаем, что монетка собрана
    local collected = Instance.new("BoolValue")
    collected.Name = "Collected"
    collected.Parent = coin
    
    -- Играем звук
    coinSound:Play()
    
    -- Увеличиваем счёт монеток игрока
    local leaderstats = player:FindFirstChild("leaderstats")
    if leaderstats then
        local coinsValue = leaderstats:FindFirstChild("Монетки")
        if coinsValue then
            coinsValue.Value = coinsValue.Value + 1
            print(player.Name .. " собрал монетку! Теперь у него " .. coinsValue.Value .. " монеток")
        end
    end
    
    -- Делаем монетку невидимой
    coin.Transparency = 1
    coin.CanCollide = false
    
    -- Ждём пока звук доиграет, потом удаляем
    task.wait(coinSound.TimeLength)
    coin:Destroy()
end)

print("💰 Монетка готова! Собери её!")</pre></div>

<h4>👆 Шаг 4 — Раскидай монетки по карте:</h4>
<ol>
  <li>Скопируй монетку (Ctrl+C, Ctrl+V) несколько раз</li>
  <li>Разложи их в разных местах на карте</li>
  <li>Для красоты можно менять цвет монеток (золотые, серебряные, бронзовые)</li>
</ol>

<h4>👆 Шаг 5 — Добавь GUI счётчика (по желанию):</h4>
<div class="code-block"><div class="code-header">LocalScript в StarterGui</div><pre>local player = game.Players.LocalPlayer
local coinsValue = player:WaitForChild("leaderstats"):WaitForChild("Монетки")

-- Создаём красивый счётчик на экране
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "CoinCounter"
screenGui.Parent = player:WaitForChild("PlayerGui")

local frame = Instance.new("Frame")
frame.Size = UDim2.new(0, 200, 0, 50)
frame.Position = UDim2.new(0, 10, 0, 10)
frame.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
frame.BackgroundTransparency = 0.5
frame.Parent = screenGui

local image = Instance.new("ImageLabel")
image.Size = UDim2.new(0, 40, 0, 40)
image.Position = UDim2.new(0, 5, 0, 5)
image.BackgroundTransparency = 1
image.Image = "rbxassetid://10178232362"  -- картинка монетки
image.Parent = frame

local text = Instance.new("TextLabel")
text.Size = UDim2.new(0, 140, 0, 40)
text.Position = UDim2.new(0, 50, 0, 5)
text.BackgroundTransparency = 1
text.TextColor3 = Color3.fromRGB(255, 215, 0)
text.TextScaled = true
text.Font = Enum.Font.GothamBold
text.Text = tostring(coinsValue.Value)
text.Parent = frame

-- Обновляем счётчик, когда число монеток меняется
coinsValue.Changed:Connect(function(newValue)
    text.Text = tostring(newValue)
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Монетка вращается? ✅<br>• При касании слышен звон? ✅<br>• Монетка исчезает? ✅<br>• Счётчик монеток увеличивается? ✅<br>• Можно собрать несколько монеток? ✅</p>`,
      hint: "Leaderstats автоматически показывается в правой части экрана! NumberValue с именем 'Монетки' отобразится как 'Монетки: 0'  . Чтобы создать другие ресурсы, добавь ещё NumberValue — например, 'Алмазы' или 'Здоровье'!",
      difficulty: "medium",
      solution: "local c=script.Parent c.Touched:Connect(function(h) if h.Parent:FindFirstChild('Humanoid') then local p=game.Players:GetPlayerFromCharacter(h.Parent) p.leaderstats.Монетки.Value+=1 c:Destroy() end end)",
    },
    {
      title: "Настоящий бластер",
      desc: `<p>Создадим крутой бластер с перезарядкой! Нажми R, чтобы перезарядить, а мышкой — стрелять.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Бластер в руках игрока. У него 5 патронов. При стрельбе патроны уменьшаются, летит лазер. Когда патроны кончаются — нужно нажать R, чтобы перезарядить.</p>

<h4>👆 Шаг 1 — Создай бластер:</h4>
<ol>
  <li>В <strong>StarterPack</strong> создай <strong>Tool</strong> → назови <strong>Blaster</strong></li>
  <li>Внутри Blaster создай <strong>MeshPart</strong> → назови <strong>Handle</strong>  <br>
    &nbsp;&nbsp;• <strong>MeshId</strong> → вставь ID: rbxassetid://92656610 (форма бластера)<br>
    &nbsp;&nbsp;• <strong>TextureId</strong> → rbxassetid://92658105 (текстура)</li>
  <li>Или сделай простой бластер из Parts:<br>
    &nbsp;&nbsp;• Handle — цилиндр (рукоятка)<br>
    &nbsp;&nbsp;• Barrel — длинный блок (ствол)</li>
</ol>

<h4>👆 Шаг 2 — Добавь звуки:</h4>
<ol>
  <li>Добавь <strong>ShootSound</strong> (звук выстрела)</li>
  <li>Добавь <strong>ReloadSound</strong> (звук перезарядки)</li>
  <li>Добавь <strong>EmptySound</strong> (звук пустого бластера)</li>
</ol>

<h4>👆 Шаг 3 — Создай GUI для отображения патронов:</h4>
<div class="code-block"><div class="code-header">LocalScript в StarterGui (AmmoGui)</div><pre>local player = game.Players.LocalPlayer

-- Создаём GUI
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "AmmoGui"
screenGui.Parent = player:WaitForChild("PlayerGui")

local frame = Instance.new("Frame")
frame.Size = UDim2.new(0, 200, 0, 60)
frame.Position = UDim2.new(1, -210, 1, -70)
frame.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
frame.BackgroundTransparency = 0.3
frame.Parent = screenGui

local ammoText = Instance.new("TextLabel")
ammoText.Size = UDim2.new(1, 0, 1, 0)
ammoText.BackgroundTransparency = 1
ammoText.TextColor3 = Color3.fromRGB(255, 255, 255)
ammoText.TextScaled = true
ammoText.Font = Enum.Font.GothamBold
ammoText.Text = "Патроны: --"
ammoText.Parent = frame

-- Функция обновления счётчика
function updateAmmo(ammo, maxAmmo)
    ammoText.Text = "🔫 " .. ammo .. " / " .. maxAmmo
    if ammo == 0 then
        ammoText.TextColor3 = Color3.fromRGB(255, 0, 0)
    else
        ammoText.TextColor3 = Color3.fromRGB(255, 255, 255)
    end
end

-- Ждём, когда игрок возьмёт бластер
local blaster = player.Backpack:WaitForChild("Blaster")
-- Если бластер уже в руках
if player.Character and player.Character:FindFirstChild("Blaster") then
    blaster = player.Character.Blaster
end

-- Слушаем события от бластера
local ammoEvent = Instance.new("RemoteEvent")
ammoEvent.Name = "AmmoUpdateEvent"
ammoEvent.Parent = player

ammoEvent.OnClientEvent:Connect(updateAmmo)</pre></div>

<h4>👆 Шаг 4 — Создай основной скрипт бластера:</h4>
<div class="code-block"><div class="code-header">Script внутри Blaster</div><pre>local tool = script.Parent
local players = game:GetService("Players")
local ContextActionService = game:GetService("ContextActionService")

-- Переменные бластера
local MAX_AMMO = 5
local currentAmmo = MAX_AMMO
local isReloading = false

-- Звуки
local shootSound = tool:WaitForChild("ShootSound")
local reloadSound = tool:WaitForChild("ReloadSound")
local emptySound = tool:WaitForChild("EmptySound")

-- Функция обновления GUI
local function updateAmmoGui(player)
    local ammoEvent = player:FindFirstChild("AmmoUpdateEvent")
    if ammoEvent then
        ammoEvent:FireClient(player, currentAmmo, MAX_AMMO)
    end
end

-- Функция выстрела
local function shoot(player)
    if isReloading then return end
    
    if currentAmmo > 0 then
        -- Стреляем!
        currentAmmo = currentAmmo - 1
        shootSound:Play()
        updateAmmoGui(player)
        
        -- Создаём лазерный луч
        local character = tool.Parent
        local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
        
        if humanoidRootPart then
            local direction = character.HumanoidRootPart.CFrame.LookVector
            local laser = Instance.new("Part")
            laser.Size = Vector3.new(0.5, 0.5, 5)
            laser.Color = Color3.fromRGB(255, 0, 0)
            laser.Material = Enum.Material.Neon
            laser.CanCollide = false
            laser.CFrame = CFrame.new(
                humanoidRootPart.Position + direction * 3 + Vector3.new(0, 1, 0),
                humanoidRootPart.Position + direction * 10
            )
            laser.Parent = workspace
            
            -- Лазер исчезает через 0.5 секунды
            task.wait(0.5)
            laser:Destroy()
        end
        
        print("🔫 Выстрел! Осталось патронов: " .. currentAmmo)
        
    else
        -- Нет патронов
        emptySound:Play()
        print("🔫 Пусто! Нажми R, чтобы перезарядить")
        
        -- Мигаем красным на экране
        local gui = player.PlayerGui:FindFirstChild("AmmoGui")
        if gui then
            local frame = gui:FindFirstChild("Frame")
            if frame then
                frame.BackgroundColor3 = Color3.fromRGB(255, 0, 0)
                task.wait(0.2)
                frame.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
            end
        end
    end
end

-- Функция перезарядки
local function reload(player)
    if isReloading then return end
    if currentAmmo == MAX_AMMO then return end
    
    isReloading = true
    reloadSound:Play()
    print("🔄 Перезарядка...")
    
    -- Показываем перезарядку на экране
    local gui = player.PlayerGui:FindFirstChild("AmmoGui")
    if gui then
        local frame = gui:FindFirstChild("Frame")
        if frame then
            local text = frame:FindFirstChildOfClass("TextLabel")
            if text then
                text.Text = "🔄 ПЕРЕЗАРЯДКА... 🔄"
            end
        end
    end
    
    task.wait(2)  -- Перезарядка 2 секунды
    
    currentAmmo = MAX_AMMO
    isReloading = false
    updateAmmoGui(player)
    
    print("✅ Перезаряжено! Патронов: " .. currentAmmo)
    
    if gui then
        local frame = gui:FindFirstChild("Frame")
        if frame then
            local text = frame:FindFirstChildOfClass("TextLabel")
            if text then
                text.Text = "Патроны: " .. currentAmmo .. " / " .. MAX_AMMO
            end
        end
    end
end

-- Обработка нажатия клавиш
local function onAction(actionName, inputState, inputObject)
    if inputState ~= Enum.UserInputState.Begin then return end
    
    local player = players:GetPlayerFromCharacter(tool.Parent)
    if not player then return end
    
    if actionName == "reload" then
        reload(player)
    end
end

-- Когда бластер берут в руки
tool.Equipped:Connect(function()
    local player = players:GetPlayerFromCharacter(tool.Parent)
    if player then
        updateAmmoGui(player)
    end
    ContextActionService:BindAction("reload", onAction, true, Enum.KeyCode.R)
end)

-- Когда бластер убирают
tool.Unequipped:Connect(function()
    ContextActionService:UnbindAction("reload")
end)

-- Когда стреляют (левая кнопка мыши)
tool.Activated:Connect(function()
    local player = players:GetPlayerFromCharacter(tool.Parent)
    if player then
        shoot(player)
    end
end)

print("🔫 Бластер готов! Стреляй мышкой, перезаряжай R!")</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Бластер можно взять в руки? ✅<br>• При стрельбе патроны уменьшаются? ✅<br>• Когда патроны кончаются, слышен звук? ✅<br>• Клавиша R перезаряжает бластер? ✅<br>• Лазер летит из бластера? ✅</p>`,
      hint: "ContextActionService позволяет привязать клавиши к действиям даже когда инструмент в руках  . Клавиша R отлично подходит для перезарядки! Можно изменить MAX_AMMO на 10 или 30 — будет больше патронов!",
      difficulty: "hard",
      solution: "-- Используем ContextActionService для клавиши R  \n-- Отслеживаем количество патронов\n-- При выстреле создаём лазерный луч\n-- При перезарядке ждём 2 секунды",
    },
  ],
};

// Краткий гайд для учителя (тема: Инструменты и предметы)
// Структура уроков:
// Урок	Название	Сложность	Что изучаем
// 1	Мой первый меч	⭐ Easy	Tool, Handle, Activated, звуки
// 2	Ключ, открывающий дверь	⭐⭐ Medium	ProximityPrompt, проверка инвентаря
// 3	Волшебная палочка	⭐⭐ Medium	Анимация, создание объектов, взрывы
// 4	Сбор монеток	⭐⭐ Medium	Leaderstats, счётчик, GUI
// 5	Настоящий бластер	⭐⭐⭐ Hard	ContextActionService, перезарядка
// Главные понятия для детей:
// Tool — предмет, который можно взять в руки 

// Handle — рукоятка, за которую персонаж держит предмет 

// StarterPack — место, откуда игроки получают предметы при старте

// Activated — событие, когда игрок нажимает мышкой с предметом в руках

// leaderstats — табличка с очками игрока

// Полезные советы:
// Всегда называй деталь, за которую держат предмет, Handle — иначе предмет не возьмётся в руки! 

// Чтобы дать предмет всем игрокам при старте — положи его в StarterPack

// Чтобы предмет лежал на карте — положи в Workspace

// ContextActionService нужен для обработки клавиш (например, R для перезарядки) 