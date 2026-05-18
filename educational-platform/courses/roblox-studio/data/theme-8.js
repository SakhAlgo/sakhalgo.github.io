const theme8 = {
  id: 8,
  title: "Звуки: музыка и звуковые эффекты",
  theory: {
    title: "Как добавить звук в игру в Roblox?",
    subtitle: "Sound, SoundService, AudioPlayer, Volume, Looping",
    content: `<p>В Roblox можно добавить музыку, звуки шагов, взрывов, нажатий на кнопки и даже голосовых команд! Звук делает игру живой и интересной.</p>

      <h3 style="color:var(--accent);margin-top:24px">🔊 Что такое Sound?</h3>
      <p><strong>Sound</strong> — это объект, который проигрывает звук. Его можно положить в любую часть игры: внутрь Part, в Tool, в GUI или даже игроку в голову!</p>
      <div class="code-block"><div class="code-header">Самый простой звук</div><pre>-- Создаём объект звука
local mySound = Instance.new("Sound")
mySound.SoundId = "rbxassetid://9120386546"  -- ID звука из библиотеки Roblox
mySound.Parent = workspace

-- Проигрываем звук
mySound:Play()</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🎮 Где брать звуки?</h3>
      <p>• <strong>Библиотека Roblox</strong> — нажми на <strong>View → Toolbox</strong>, выбери вкладку <strong>Audio</strong>. Там тысячи бесплатных звуков!<br>
      • <strong>Свой звук</strong> — загрузи MP3 файл (нужна верификация)<br>
      • <strong>Ссылка на звук</strong> — скопируй ID из библиотеки, он выглядит как число</p>
      
      <div class="info-box warning"><strong>⚠️ Важно:</strong> Звуки с ID нужно использовать только из библиотеки Roblox, иначе игра не пропустит их на сервере!</div>

      <h3 style="color:var(--accent);margin-top:24px">🎛️ Настройки звука</h3>
      <div class="code-block"><div class="code-header">Главные свойства Sound</div><pre>local sound = Instance.new("Sound")
sound.SoundId = "rbxassetid://123456789"  -- какой звук играть
sound.Volume = 0.5        -- громкость (0 = тихо, 1 = громко, 2 = очень громко)
sound.PlaybackSpeed = 1   -- скорость (0.5 = медленно, 2 = быстро)
sound.Looped = true       -- зациклить (true = повторять бесконечно)
sound.TimePosition = 0    -- с какой секунды начать

-- Для 3D звука (чем дальше, тем тише)
sound.RollOffMode = Enum.RollOffMode.Linear
sound.MaxDistance = 100   -- максимальная слышимость
sound.MinDistance = 10    -- минимальная дистанция (здесь звук самый громкий)</pre></div>

      <h3 style="color:var(--accent);margin-top:24px">🎵 SoundService — управление всей музыкой</h3>
      <p>В Explorer есть <strong>SoundService</strong> — он управляет звуками во всей игре:</p>
      <div class="code-block"><div class="code-header">Настройки SoundService</div><pre>local soundService = game:GetService("SoundService")

-- Выключить все звуки в игре (кнопка "Mute")
soundService:SetListenerVolume(Enum.ListenerType.Sound, 0)

-- Включить обратно (1 = нормально)
soundService:SetListenerVolume(Enum.ListenerType.Sound, 1)

-- Фоновая музыка (не выключается при паузе)
soundService.RespectFilteringEnabled = true</pre></div>

      <div class="info-box success"><strong>💡 Совет:</strong> Для фоновой музыки поставь Sound в SoundService или в Workspace, и поставь Looped = true. Музыка будет играть весь матч!</div>`,
  },
  tasks: [
    {
      title: "Кнопка с хлопком",
      desc: `<p>Сделаем кнопку на экране — нажал, и раздаётся хлопок! Очень просто и весело.</p>

<h4>🎯 Что должно получиться:</h4>
<p>На экране большая кнопка «👏 Хлопни!». Когда нажимаешь — слышен звук хлопка. Можно нажимать сколько угодно раз!</p>

<h4>👆 Шаг 1 — Найди звук хлопка в библиотеке:</h4>
<ol>
  <li>Открой <strong>View → Toolbox</strong> (или нажми Ctrl+Alt+T)</li>
  <li>Выбери вкладку <strong>Audio</strong> (значок ноты)</li>
  <li>В поиске напиши <strong>clap</strong> или <strong>хлопок</strong></li>
  <li>Найди короткий хлопок (обычно 0.5-1 секунда)</li>
  <li>Наведи мышкой — появится ID. Запомни число (например, <strong>184129886</strong>)</li>
</ol>

<h4>👆 Шаг 2 — Создай GUI с кнопкой:</h4>
<ol>
  <li>В Explorer нажми на <strong>StarterGui → Insert Object → ScreenGui</strong></li>
  <li>Назови его <strong>ClapGui</strong></li>
  <li>Правой кнопкой на <strong>ClapGui → Insert Object → TextButton</strong></li>
  <li>Назови кнопку <strong>ClapButton</strong></li>
  <li>В Properties настрой:<br>
    &nbsp;&nbsp;• <strong>Text</strong> → 👏 ХЛОПНИ!<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0, 200 / Y: 0, 80<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 0.5, -100 / Y: 0.5, -40 (это центр)<br>
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → жёлтый (R:255 G:200 B:0)<br>
    &nbsp;&nbsp;• <strong>TextColor3</strong> → чёрный<br>
    &nbsp;&nbsp;• <strong>TextScaled</strong> → ✅</li>
</ol>

<h4>👆 Шаг 3 — Добавь LocalScript в кнопку:</h4>
<ol>
  <li>Правой кнопкой на <strong>ClapButton → Insert Object → LocalScript</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">LocalScript внутри ClapButton</div><pre>-- Получаем кнопку
local button = script.Parent

-- ID звука хлопка (поменяй на свой!)
local CLAP_SOUND_ID = "rbxassetid://184129886"  -- стандартный хлопок

-- Создаём звук (прямо внутри кнопки, чтобы он никому не мешал)
local clapSound = Instance.new("Sound")
clapSound.SoundId = CLAP_SOUND_ID
clapSound.Volume = 0.8        -- громкий, но не оглушает
clapSound.Parent = button

-- Когда нажимают на кнопку
button.MouseButton1Click:Connect(function()
    -- Останавливаем, если уже играет
    clapSound:Stop()
    -- Играем заново
    clapSound:Play()
    
    -- Бонус: меняем цвет кнопки на миг
    button.BackgroundColor3 = Color3.fromRGB(255, 100, 0)  -- оранжевый
    task.wait(0.1)
    button.BackgroundColor3 = Color3.fromRGB(255, 200, 0)  -- обратно жёлтый
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Звук хлопка добавлен в LocalScript? ✅<br>• Кнопка меняет цвет при нажатии? ✅<br>• Хлопок слышен при каждом нажатии? ✅<br>• Если нажать быстро несколько раз — хлопки не накладываются? ✅</p>`,
      hint: "Если звук не играет — проверь, правильный ли ID. В библиотеке наведи на звук мышкой, скопируй число. В коде напиши 'rbxassetid://' + число. Volume можно сделать 0.3 — тихий хлопок, или 1.5 — очень громкий!",
      difficulty: "easy",
      solution: "local btn=script.Parent\nlocal snd=Instance.new('Sound')\nsnd.SoundId='rbxassetid://184129886'\nsnd.Volume=0.8\nsnd.Parent=btn\nbtn.MouseButton1Click:Connect(function() snd:Stop() snd:Play() end)",
    },
    {
      title: "Фоновая музыка в игре",
      desc: `<p>Сделаем так, чтобы в игре всегда играла приятная музыка. Как в мультике!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Как только игрок заходит в игру — начинает играть весёлая фоновая музыка. Она играет по кругу, не останавливаясь. Игрок может включить или выключить музыку кнопкой.</p>

<h4>👆 Шаг 1 — Добавь Sound в SoundService:</h4>
<ol>
  <li>В Explorer найди <strong>SoundService</strong> (обычно он ниже Workspace)</li>
  <li>Правой кнопкой → <strong>Insert Object → Sound</strong></li>
  <li>Назови его <strong>BackgroundMusic</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>SoundId</strong> → вставь ID весёлой музыки (ищи в Toolbox слово <strong>happy</strong> или <strong>adventure</strong>)<br>
    &nbsp;&nbsp;• <strong>Looped</strong> → ✅ (зациклить)<br>
    &nbsp;&nbsp;• <strong>Volume</strong> → 0.4 (негромкая фоновая)<br>
    &nbsp;&nbsp;• <strong>PlayOnRemove</strong> → оставь как есть</li>
</ol>

<h4>👆 Шаг 2 — Создай кнопку для включения/выключения музыки:</h4>
<ol>
  <li>В <strong>StarterGui</strong> создай <strong>ScreenGui → MusicGui</strong></li>
  <li>В MusicGui добавь <strong>TextButton → MusicButton</strong></li>
  <li>Настрой кнопку:<br>
    &nbsp;&nbsp;• <strong>Text</strong> → 🎵 Выкл музыку<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0, 120 / Y: 0, 40<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 1, -140 / Y: 0, 10 (правый верхний угол)<br>
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → зелёный</li>
</ol>

<h4>👆 Шаг 3 — Добавь LocalScript в MusicButton:</h4>
<div class="code-block"><div class="code-header">LocalScript внутри MusicButton</div><pre>local button = script.Parent
local soundService = game:GetService("SoundService")

-- Находим нашу фоновую музыку
local bgMusic = soundService:WaitForChild("BackgroundMusic")

-- Музыка играет?
local isPlaying = true

-- Запускаем музыку сразу
bgMusic:Play()

button.MouseButton1Click:Connect(function()
    if isPlaying then
        -- Выключаем музыку
        bgMusic:Stop()
        button.Text = "🎵 Вкл музыку"
        button.BackgroundColor3 = Color3.fromRGB(200, 0, 0)  -- красный
    else
        -- Включаем музыку сначала
        bgMusic:Play()
        button.Text = "🎵 Выкл музыку"
        button.BackgroundColor3 = Color3.fromRGB(0, 200, 0)  -- зелёный
    end
    
    isPlaying = not isPlaying
end)</pre></div>

<h4>👆 Шаг 4 (бонус) — Автоматическое включение музыки через Script:</h4>
<p>Иногда музыка не включается сама. Добавь этот скрипт в <strong>SoundService</strong>:</p>
<div class="code-block"><div class="code-header">Script внутри SoundService</div><pre>-- Этот скрипт запускает музыку для всех игроков
local bgMusic = script:WaitForChild("BackgroundMusic")

-- Ждём 2 секунды после запуска игры
task.wait(2)

-- Включаем музыку
bgMusic:Play()
print("🎵 Фоновая музыка играет!")</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Sound лежит в SoundService? ✅<br>• Looped = true? ✅<br>• При входе в игру музыка играет? ✅<br>• Кнопка выключает и включает музыку? ✅</p>`,
      hint: "Если музыка не играет, попробуй другой ID из библиотеки. Ищи 'background music royalty free'. Volume 0.3 подойдёт для тихой фоновой музыки. Looped = true заставит музыку повторяться бесконечно!",
      difficulty: "easy",
      solution: "local s=game.SoundService.BackgroundMusic s.Looped=true s.Volume=0.4 s:Play() local b=script.Parent b.MouseButton1Click:Connect(function() if s.IsPlaying then s:Stop() else s:Play() end end)",
    },
    {
      title: "Звук при прикосновении",
      desc: `<p>Сделаем волшебную монетку: когда игрок её касается — раздаётся звон, и монетка исчезает.</p>

<h4>🎯 Что должно получиться:</h4>
<p>На карте лежит золотая монетка. Когда персонаж подходит и касается её — слышен звон монетки, и монетка исчезает. Можно добавить много монеток!</p>

<h4>👆 Шаг 1 — Создай Part-монетку:</h4>
<ol>
  <li>В <strong>Workspace</strong> создай <strong>Part</strong> → назови <strong>Coin</strong></li>
  <li>Настрой:<br>
    &nbsp;&nbsp;• <strong>Size</strong> → 2, 2, 2<br>
    &nbsp;&nbsp;• <strong>Shape</strong> → Ball (шар, красивее)<br>
    &nbsp;&nbsp;• <strong>BrickColor</strong> → Bright yellow (жёлтый)<br>
    &nbsp;&nbsp;• <strong>Material</strong> → Neon (светится!)<br>
    &nbsp;&nbsp;• <strong>Anchored</strong> → ✅ (чтобы не упала)<br>
    &nbsp;&nbsp;• <strong>CanCollide</strong> → ✅ (чтобы можно было встать на неё)</li>
  <li>Поставь монетку на землю (Position Y = 1)</li>
</ol>

<h4>👆 Шаг 2 — Добавь звук монетки в Coin:</h4>
<ol>
  <li>Правой кнопкой на <strong>Coin → Insert Object → Sound</strong></li>
  <li>Назови его <strong>PickupSound</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>SoundId</strong> → найди в Toolbox звук 'coin pickup' (ID: 9120386546)<br>
    &nbsp;&nbsp;• <strong>Volume</strong> → 0.6</li>
</ol>

<h4>👆 Шаг 3 — Добавь Script в Coin:</h4>
<div class="code-block"><div class="code-header">Script внутри Coin</div><pre>-- Получаем монетку и её звук
local coin = script.Parent
local pickupSound = coin:WaitForChild("PickupSound")

-- Трогательная коробка (чуть больше монетки)
local touchBox = Instance.new("Part")
touchBox.Size = coin.Size + Vector3.new(1, 1, 1)
touchBox.Position = coin.Position
touchBox.Anchored = true
touchBox.CanCollide = false
touchBox.Transparency = 1  -- невидимая
touchBox.Parent = coin

-- Когда кто-то касается
touchBox.Touched:Connect(function(hit)
    -- Проверяем, что это игрок (у него есть Humanoid)
    local character = hit.Parent
    local humanoid = character:FindFirstChild("Humanoid")
    
    if humanoid then
        -- Играем звук
        pickupSound:Play()
        
        -- Делаем монетку невидимой и убираем столкновения
        coin.Transparency = 1
        coin.CanCollide = false
        
        -- Ждём пока звук доиграет, потом удаляем монетку
        task.wait(pickupSound.TimeLength)  -- длительность звука
        
        coin:Destroy()  -- монетка исчезает навсегда
    end
end)

-- Вращение монетки (красиво!)
while coin.Parent do
    task.wait(0.05)
    -- Поворачиваем монетку вокруг оси Y
    coin.CFrame = coin.CFrame * CFrame.Angles(0, math.rad(5), 0)
end</pre></div>

<h4>👆 Шаг 4 — Сделай много монеток (по желанию):</h4>
<p>Скопируй монетку (Ctrl+C, Ctrl+V) и разложи по карте в разных местах. У каждой будет свой звук!</p>

<h4>🔍 Проверь себя:</h4>
<p>• Монетка вращается? ✅<br>• Когда подходишь — слышен звон? ✅<br>• Монетка исчезает после касания? ✅<br>• Можно подобрать монетку только один раз? ✅</p>`,
      hint: "Чтобы монетка не исчезала мгновенно, мы добавили task.wait(pickupSound.TimeLength) — ждём пока звук доиграет. Попробуй заменить на wait(0.5) — полсекунды паузы. Звук будет доигрывать, но монетка исчезнет быстрее!",
      difficulty: "medium",
      solution: "local c=script.Parent local s=c.PickupSound c.Touched:Connect(function(h) if h.Parent:FindFirstChild('Humanoid') then s:Play() c.Transparency=1 wait(s.TimeLength) c:Destroy() end end)",
    },
    {
      title: "Говорящий NPC",
      desc: `<p>Сделаем персонажа, который говорит голосом! Нажимаешь на него — он говорит 'Привет!' или другую фразу.</p>

<h4>🎯 Что должно получиться:</h4>
<p>В игре стоит человечек (NPC). Когда игрок подходит и нажимает на него (клавиша E) — раздаётся голосовая фраза. Можно сделать несколько фраз!</p>

<h4>👆 Шаг 1 — Найди или создай голосовые фразы:</h4>
<ol>
  <li>В Toolbox → Audio найди короткие фразы: 'hello', 'hi', 'welcome'</li>
  <li>Запиши ID трёх разных фраз (например, приветствие, шутка, прощание)</li>
  <li>Или используй стандартные: <br>
    &nbsp;&nbsp;• 9120386560 — 'Hello!'<br>
    &nbsp;&nbsp;• 9120386570 — 'Good luck!'<br>
    &nbsp;&nbsp;• 184129890 — короткий смех</li>
</ol>

<h4>👆 Шаг 2 — Создай NPC (простой блок с лицом):</h4>
<ol>
  <li>В Workspace создай <strong>Part</strong> → назови <strong>NPC</strong></li>
  <li>Настрой:<br>
    &nbsp;&nbsp;• <strong>Size</strong> → 3, 4, 3<br>
    &nbsp;&nbsp;• <strong>BrickColor</strong> → Nougat (телесный)<br>
    &nbsp;&nbsp;• <strong>Anchored</strong> → ✅<br>
    &nbsp;&nbsp;• <strong>Position</strong> → Y = 2 (чтобы стоять на земле)</li>
  <li>Добавь глаза (два маленьких шара):<br>
    &nbsp;&nbsp;• Insert Object → Part → назови LeftEye<br>
    &nbsp;&nbsp;• Size → 0.5, 0.5, 0.2 → Position → X: -1, Y: 3.5, Z: 1.6<br>
    &nbsp;&nbsp;• Цвет → белый<br>
    &nbsp;&nbsp;• Сделай второй глаз (X: 1)</li>
  <li>Добавь улыбку (Part в форме цилиндра):<br>
    &nbsp;&nbsp;• Shape → Cylinder, Size → 1.5, 0.3, 0.3<br>
    &nbsp;&nbsp;• Position → X: 0, Y: 2.8, Z: 1.6</li>
</ol>

<h4>👆 Шаг 3 — Добавь звуки в NPC:</h4>
<ol>
  <li>В NPC создай 3 объекта <strong>Sound</strong>:<br>
    &nbsp;&nbsp;• HelloSound<br>
    &nbsp;&nbsp;• JokeSound<br>
    &nbsp;&nbsp;• GoodbyeSound</li>
  <li>Каждому в Properties → SoundId вставь свой ID</li>
  <li>Volume для всех → 0.7</li>
</ol>

<h4>👆 Шаг 4 — Добавь Script в NPC:</h4>
<div class="code-block"><div class="code-header">Script внутри NPC</div><pre>local npc = script.Parent
local players = game:GetService("Players")

-- Получаем звуки
local sounds = {
    hello = npc:WaitForChild("HelloSound"),
    joke = npc:WaitForChild("JokeSound"),
    goodbye = npc:WaitForChild("GoodbyeSound")
}

-- Какой звук будет следующим
local soundQueue = {"hello", "joke", "goodbye"}
local soundIndex = 1

-- Создаём невидимую область вокруг NPC
local interactionZone = Instance.new("Part")
interactionZone.Size = Vector3.new(8, 8, 8)
interactionZone.Position = npc.Position
interactionZone.Anchored = true
interactionZone.CanCollide = false
interactionZone.Transparency = 1
interactionZone.Parent = npc

-- Кто сейчас рядом с NPC?
local nearbyPlayers = {}

interactionZone.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChild("Humanoid")
    
    if humanoid then
        local player = players:GetPlayerFromCharacter(character)
        if player and not nearbyPlayers[player] then
            nearbyPlayers[player] = true
            print(player.Name .. " подошёл к NPC")
            
            -- Показываем подсказку на экране
            showHint(player, "Нажми E, чтобы поговорить")
        end
    end
end)

interactionZone.TouchEnded:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChild("Humanoid")
    
    if humanoid then
        local player = players:GetPlayerFromCharacter(character)
        if player and nearbyPlayers[player] then
            nearbyPlayers[player] = nil
        end
    end
end)

-- Функция показа подсказки
function showHint(player, text)
    local gui = player.PlayerGui:FindFirstChild("HintGui")
    if not gui then
        gui = Instance.new("ScreenGui")
        gui.Name = "HintGui"
        gui.Parent = player.PlayerGui
        
        local label = Instance.new("TextLabel")
        label.Size = UDim2.new(0, 300, 0, 50)
        label.Position = UDim2.new(0.5, -150, 0.8, 0)
        label.BackgroundTransparency = 0.5
        label.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
        label.TextColor3 = Color3.fromRGB(255, 255, 255)
        label.TextScaled = true
        label.Font = Enum.Font.GothamBold
        label.Parent = gui
        
        player.HintLabel = label
    end
    
    player.HintLabel.Text = text
    task.wait(2)
    if player.HintLabel then
        player.HintLabel.Text = ""
    end
end

-- Обработка нажатия клавиши E
game:GetService("UserInputService").InputBegan:Connect(function(input, gameProcessed)
    if gameProcessed then return end
    
    if input.KeyCode == Enum.KeyCode.E then
        -- Проверяем, есть ли игрок рядом с NPC
        local player = players.LocalPlayer
        if nearbyPlayers[player] then
            -- Играем следующий звук
            local soundName = soundQueue[soundIndex]
            local sound = sounds[soundName]
            sound:Play()
            
            -- Показываем текст на экране
            showHint(player, "NPC: " .. getMessage(soundName))
            
            -- Переходим к следующему звуку
            soundIndex = soundIndex + 1
            if soundIndex > #soundQueue then
                soundIndex = 1
            end
        end
    end
end)

function getMessage(soundName)
    if soundName == "hello" then
        return "Привет, путник! 👋"
    elseif soundName == "joke" then
        return "Почему робот не боится темноты? У него есть батарейки! 😄"
    elseif soundName == "goodbye" then
        return "Возвращайся ещё! 👋"
    end
    return "..."
end

print("🤖 NPC готов к разговору! Подойди и нажми E")</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• У NPC есть 3 разных звука? ✅<br>• При нажатии E слышна фраза? ✅<br>• Фразы меняются по кругу? ✅<br>• Появляется подсказка 'Нажми E'? ✅</p>`,
      hint: "Чтобы NPC говорил сам без нажатия, добавь в начало скрипта task.wait(3) и sounds.hello:Play(). Звук проиграется через 3 секунды после запуска игры. Классно для приветствия!",
      difficulty: "medium",
      solution: "-- 3 Sound в NPC с разными ID\n-- interactionZone для определения расстояния\n-- UserInputService для клавиши E\n-- Проигрываем звуки по очереди",
    },
    {
      title: "Музыкальная шкатулка",
      desc: `<p>Создадим волшебную шкатулку, которая играет мелодию, когда игрок подходит близко.</p>

<h4>🎯 Что должно получиться:</h4>
<p>На постаменте стоит красивая шкатулка. Когда игрок подходит ближе чем на 10 шагов — начинает играть тихая музыка. Чем ближе игрок — тем громче музыка. Когда уходит — музыка затихает и останавливается.</p>

<h4>👆 Шаг 1 — Создай шкатулку:</h4>
<ol>
  <li>В Workspace создай <strong>Part</strong> → назови <strong>MusicBox</strong></li>
  <li>Настрой:<br>
    &nbsp;&nbsp;• <strong>Size</strong> → 3, 2, 3<br>
    &nbsp;&nbsp;• <strong>BrickColor</strong> → Bright red<br>
    &nbsp;&nbsp;• <strong>Material</strong> → Wood<br>
    &nbsp;&nbsp;• <strong>Anchored</strong> → ✅<br>
    &nbsp;&nbsp;• <strong>Position</strong> → Y = 1</li>
  <li>Добавь крышку (ещё один Part сверху):<br>
    &nbsp;&nbsp;• Size → 3.2, 0.2, 3.2<br>
    &nbsp;&nbsp;• Position → Y = 2.1<br>
    &nbsp;&nbsp;• BrickColor → Gold</li>
  <li>Добавь ручку (Cylinder сверху):<br>
    &nbsp;&nbsp;• Shape → Cylinder, Size → 0.5, 1, 0.5<br>
    &nbsp;&nbsp;• Position → Y = 2.5<br>
    &nbsp;&nbsp;• Color → Bright yellow</li>
</ol>

<h4>👆 Шаг 2 — Найди красивую мелодию:</h4>
<ol>
  <li>В Toolbox → Audio найди <strong>music box melody</strong> или <strong>lullaby</strong></li>
  <li>Выбери спокойную, негромкую мелодию (30-60 секунд)</li>
  <li>Скопируй ID (например, 9120386580)</li>
</ol>

<h4>👆 Шаг 3 — Добавь звук в шкатулку и Script:</h4>
<div class="code-block"><div class="code-header">Script внутри MusicBox</div><pre>local musicBox = script.Parent
local players = game:GetService("Players")

-- Создаём звук
local melody = Instance.new("Sound")
melody.SoundId = "rbxassetid://9120386580"  -- вставь свой ID
melody.Volume = 0
melody.Looped = true   -- повторять мелодию
melody.Parent = musicBox

-- Дистанция, на которой слышна музыка
local MAX_DISTANCE = 20
local MIN_DISTANCE = 3   -- на этом расстоянии громкость = 1

-- Включаем музыку (тихо)
melody:Play()

-- Красивое свечение
local glow = Instance.new("PointLight")
glow.Color = Color3.fromRGB(255, 100, 100)  -- красное свечение
glow.Range = 15
glow.Brightness = 1
glow.Parent = musicBox

-- Анимация ручки (вращается)
local handle = musicBox:FindFirstChild("Handle")
if handle then
    task.spawn(function()
        while musicBox.Parent do
            task.wait(0.05)
            handle.CFrame = handle.CFrame * CFrame.Angles(0, math.rad(3), 0)
        end
    end)
end

-- Проверяем расстояние до игроков
while musicBox.Parent do
    task.wait(0.1)  -- проверяем 10 раз в секунду
    
    local closestDistance = MAX_DISTANCE
    local hasPlayerNear = false
    
    -- Проверяем всех игроков
    for _, player in ipairs(players:GetPlayers()) do
        local character = player.Character
        if character and character:FindFirstChild("Humanoid") then
            local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
            if humanoidRootPart then
                local distance = (humanoidRootPart.Position - musicBox.Position).Magnitude
                
                if distance < MAX_DISTANCE then
                    hasPlayerNear = true
                    if distance < closestDistance then
                        closestDistance = distance
                    end
                end
            end
        end
    end
    
    -- Вычисляем громкость
    local volume = 0
    if hasPlayerNear then
        -- Чем меньше расстояние, тем громче
        -- Формула: volume = 1 - (расстояние / MAX_DISTANCE)
        volume = 1 - (closestDistance / MAX_DISTANCE)
        volume = math.clamp(volume, 0, 1)  -- не больше 1 и не меньше 0
    end
    
    -- Плавно меняем громкость (не резко)
    melody.Volume = melody.Volume + (volume - melody.Volume) * 0.2
    
    -- Меняем яркость свечения в такт громкости
    glow.Brightness = 0.5 + melody.Volume * 3
    
    -- Если громкость очень маленькая, можно поставить на паузу
    if melody.Volume < 0.05 and not hasPlayerNear then
        melody.Playing = false
    elseif melody.Volume > 0.05 and not melody.Playing then
        melody.Playing = true
    end
end</pre></div>

<h4>👆 Шаг 4 — Укрась место вокруг:</h4>
<p>Добавь цветы, траву, дорожку к шкатулке — будет ещё красивее!</p>

<h4>🔍 Проверь себя:</h4>
<p>• Шкатулка красивая, с ручкой? ✅<br>• При подходе музыка включается? ✅<br>• Чем ближе — тем громче? ✅<br>• Когда уходишь — музыка затихает? ✅<br>• Ручка вращается? ✅</p>`,
      hint: "Формула громкости: volume = 1 - (distance / MAX_DISTANCE). Если MAX_DISTANCE = 10, а distance = 2, то volume = 1 - 0.2 = 0.8 (громко). Если distance = 9, volume = 0.1 (едва слышно). Идеально!",
      difficulty: "hard",
      solution: "local s=Instance.new('Sound') s.SoundId='rbxassetid://...' s.Looped=true s.Parent=script.Parent s:Play() while true do local d=(player.Character.HumanoidRootPart.Position - pos).Magnitude s.Volume=math.clamp(1-d/20,0,1) task.wait(0.1) end",
    },
  ],
};

// 🎵 Краткий гайд для учителя:
// Первый урок (Кнопка с хлопком) — самый простой, знакомит со Sound и GUI

// Второй урок (Фоновая музыка) — учит работать с SoundService и Looped

// Третий урок (Монетка) — показывает взаимодействие (Touched + звук)

// Четвёртый урок (NPC) — продвинутый: клавиши, диалоги, несколько звуков

// Пятый урок (Шкатулка) — сложный: динамическая громкость от расстояния