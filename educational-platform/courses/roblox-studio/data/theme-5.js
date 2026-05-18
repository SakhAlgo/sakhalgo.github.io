const theme5 = {
  id: 5,
  title: "DataStore: сохранение прогресса",
  theory: {
    title: "Как игра запоминает твой прогресс?",
    subtitle: "DataStoreService, GetAsync, SetAsync, pcall",
    content: `<p>Когда ты выходишь из игры — все переменные и объекты удаляются. Но если использовать <strong>DataStore</strong> (хранилище данных), игра запомнит твои монеты, уровень и предметы. Это как записная книжка которую Roblox хранит на своих серверах!</p>

      <h3 style="color:var(--accent);margin-top:24px">📦 Как работает DataStore?</h3>
      <p>Всё просто — как словарь с двумя действиями:<br>
      • <strong>SetAsync</strong> — <em>записать</em> данные (как положить в ящик)<br>
      • <strong>GetAsync</strong> — <em>прочитать</em> данные (как достать из ящика)<br>
      Ключ — это уникальный ID игрока (<code>player.UserId</code>). У каждого игрока свой ящик!</p>

      <h3 style="color:var(--accent);margin-top:24px">🛡️ Что такое pcall?</h3>
      <p>DataStore иногда может не сработать — например если у Roblox проблемы с сервером. <strong>pcall</strong> (protected call) — это защитная обёртка: если что-то пошло не так, игра не сломается, а просто скажет об ошибке.</p>
      <div class="code-block"><div class="code-header">Как выглядит сохранение и загрузка</div><pre>-- Подключаем сервис хранилища
local DataStoreService = game:GetService("DataStoreService")

-- Создаём хранилище с именем "PlayerCoins"
local coinsStore = DataStoreService:GetDataStore("PlayerCoins")

-- ЗАГРУЗКА: читаем данные когда игрок заходит
local success, savedCoins = pcall(function()
    return coinsStore:GetAsync(player.UserId)
end)

-- СОХРАНЕНИЕ: записываем когда игрок выходит
local success, err = pcall(function()
    coinsStore:SetAsync(player.UserId, coins)
end)</pre></div>
      <div class="info-box success"><strong>💡 Важно:</strong> DataStore работает только на сервере — в обычном Script, не в LocalScript. И только если в настройках игры включён API Access (Studio → Game Settings → Security → Enable Studio Access to API Services).</div>`,
  },
  tasks: [
    {
      title: "Монеты которые не пропадают",
      desc: `<p>Создадим счётчик монет который сохраняется между сессиями. Вышел из игры — зашёл снова — монеты на месте!</p>

<h4>🎯 Что должно получиться:</h4>
<p>У каждого игрока есть монеты видные в таблице лидеров (Leaderboard). Монеты сохраняются при выходе и восстанавливаются при входе.</p>

<h4>👆 Шаг 1 — Включи сохранение данных в Studio:</h4>
<ol>
  <li>В верхнем меню нажми <strong>Home → Game Settings</strong></li>
  <li>Перейди во вкладку <strong>Security</strong></li>
  <li>Включи переключатель <strong>Enable Studio Access to API Services</strong> ✅</li>
  <li>Нажми Save</li>
</ol>
<div class="info-box success"><strong>💡 Без этого шага DataStore не работает в Studio!</strong> В реальной опубликованной игре это включено автоматически.</div>

<h4>👆 Шаг 2 — Добавь Script в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService → Insert Object → Script</strong></li>
  <li>Переименуй в <strong>CoinsSystem</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script CoinsSystem в ServerScriptService</div><pre>-- Подключаем сервис хранилища данных
local DataStoreService = game:GetService("DataStoreService")

-- Создаём хранилище с именем "PlayerCoins"
-- Это имя как название папки — придумай своё если хочешь
local coinsStore = DataStoreService:GetDataStore("PlayerCoins")

-- Срабатывает когда игрок заходит в игру
game.Players.PlayerAdded:Connect(function(player)

    -- Создаём папку leaderstats — она автоматически показывает
    -- содержимое в таблице лидеров в правом верхнем углу!
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    -- Создаём счётчик монет
    local coins = Instance.new("IntValue")
    coins.Name = "Монеты"
    coins.Value = 0  -- начальное значение
    coins.Parent = leaderstats

    -- ЗАГРУЖАЕМ сохранённые монеты из хранилища
    -- pcall защищает от ошибок сети
    local success, savedValue = pcall(function()
        return coinsStore:GetAsync(player.UserId)
    end)

    -- Если загрузка прошла успешно и данные есть
    if success and savedValue then
        coins.Value = savedValue
        print(player.Name .. " загружен с " .. savedValue .. " монетами")
    else
        print(player.Name .. " новый игрок, монет 0")
    end
end)

-- Срабатывает когда игрок выходит из игры
game.Players.PlayerRemoving:Connect(function(player)

    -- Находим монеты игрока
    local coins = player.leaderstats:FindFirstChild("Монеты")

    if coins then
        -- СОХРАНЯЕМ монеты в хранилище
        local success, err = pcall(function()
            coinsStore:SetAsync(player.UserId, coins.Value)
        end)

        if success then
            print(player.Name .. " сохранён: " .. coins.Value .. " монет")
        else
            -- Если что-то пошло не так — выводим ошибку
            print("Ошибка сохранения: " .. err)
        end
    end
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• В Game Settings включён API Access? ✅<br>• Script лежит в ServerScriptService? ✅<br>• При запуске в Output видно «новый игрок»? ✅<br>• В правом углу игры появилась таблица «Монеты: 0»? ✅</p>`,
      hint: "Таблица лидеров появляется автоматически если создать папку 'leaderstats' внутри игрока. Имя папки должно быть ТОЧНО 'leaderstats' — это магическое слово Roblox!",
      difficulty: "easy",
      solution: "local DSS = game:GetService('DataStoreService')\nlocal store = DSS:GetDataStore('PlayerCoins')\ngame.Players.PlayerAdded:Connect(function(player)\n    local ls = Instance.new('Folder')\n    ls.Name = 'leaderstats'\n    ls.Parent = player\n    local coins = Instance.new('IntValue')\n    coins.Name = 'Монеты'\n    coins.Value = 0\n    coins.Parent = ls\n    local ok, val = pcall(function() return store:GetAsync(player.UserId) end)\n    if ok and val then coins.Value = val end\nend)\ngame.Players.PlayerRemoving:Connect(function(player)\n    local coins = player.leaderstats:FindFirstChild('Монеты')\n    if coins then pcall(function() store:SetAsync(player.UserId, coins.Value) end) end\nend)",
    },
    {
      title: "Монеты за касание блока",
      desc: `<p>Теперь добавим способ зарабатывать монеты! Касаешься специального блока — получаешь монету. И они сохраняются!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Золотой блок стоит на карте. Касаешься его — +1 монета (с задержкой 3 секунды чтобы не читерить). Монеты видны в лидерборде и сохраняются.</p>

<h4>👆 Шаг 1 — Сначала сделай задание №1 (CoinsSystem должен уже работать!)</h4>

<h4>👆 Шаг 2 — Создай блок-монету в Workspace:</h4>
<ol>
  <li>Правой кнопкой на <strong>Workspace → Insert Object → Part</strong></li>
  <li>Переименуй в <strong>CoinBlock</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>Shape</strong> → Cylinder<br>
    &nbsp;&nbsp;• <strong>Size</strong> → 0.5, 3, 3<br>
    &nbsp;&nbsp;• <strong>BrickColor</strong> → Bright yellow<br>
    &nbsp;&nbsp;• <strong>Material</strong> → Neon<br>
    &nbsp;&nbsp;• <strong>Anchored</strong> → ✅<br>
    &nbsp;&nbsp;• <strong>Position</strong> → поставь рядом со стартом</li>
</ol>

<h4>👆 Шаг 3 — Добавь Script внутрь CoinBlock:</h4>
<ol>
  <li>Правой кнопкой на <strong>CoinBlock → Insert Object → Script</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script внутри Part CoinBlock</div><pre>-- Получаем блок-монету
local coinBlock = script.Parent

-- Таблица кулдаунов: хранит время последнего касания для каждого игрока
-- Это защита от читерства — нельзя касаться чаще чем раз в 3 секунды
local cooldowns = {}

-- При касании блока
coinBlock.Touched:Connect(function(hit)
    -- Проверяем что коснулся игрок
    local character = hit.Parent
    local humanoid  = character:FindFirstChild("Humanoid")
    if not humanoid then return end

    -- Находим игрока по его персонажу
    local player = game.Players:GetPlayerFromCharacter(character)
    if not player then return end

    -- Проверяем кулдаун: прошло ли 3 секунды с последнего касания?
    local lastTouch = cooldowns[player] or 0
    if tick() - lastTouch < 3 then
        -- Ещё не прошло 3 секунды — игнорируем касание
        return
    end

    -- Обновляем время последнего касания
    cooldowns[player] = tick()

    -- Ищем монеты игрока в leaderstats
    local leaderstats = player:FindFirstChild("leaderstats")
    if not leaderstats then return end

    local coins = leaderstats:FindFirstChild("Монеты")
    if not coins then return end

    -- Добавляем монету!
    coins.Value = coins.Value + 1
    print(player.Name .. " подобрал монету! Итого: " .. coins.Value)

    -- Маленькая анимация: блок мигает белым
    coinBlock.BrickColor = BrickColor.new("White")
    task.wait(0.2)
    coinBlock.BrickColor = BrickColor.new("Bright yellow")
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• CoinBlock золотой и светится? ✅<br>• При касании монеты растут в лидерборде? ✅<br>• Нельзя получить монету чаще чем раз в 3 секунды? ✅<br>• Блок мигает белым при касании? ✅</p>`,
      hint: "tick() возвращает текущее время в секундах. tick() - lastTouch — это сколько секунд прошло с последнего касания. Если меньше 3 — return прерывает функцию и монета не даётся.",
      difficulty: "easy",
      solution: "local coinBlock = script.Parent\nlocal cooldowns = {}\ncoinBlock.Touched:Connect(function(hit)\n    local char = hit.Parent\n    if not char:FindFirstChild('Humanoid') then return end\n    local player = game.Players:GetPlayerFromCharacter(char)\n    if not player then return end\n    local last = cooldowns[player] or 0\n    if tick() - last < 3 then return end\n    cooldowns[player] = tick()\n    local coins = player.leaderstats:FindFirstChild('Монеты')\n    if coins then\n        coins.Value = coins.Value + 1\n        coinBlock.BrickColor = BrickColor.new('White')\n        task.wait(0.2)\n        coinBlock.BrickColor = BrickColor.new('Bright yellow')\n    end\nend)",
    },
    {
      title: "Счётчик посещений",
      desc: `<p>Узнаем сколько раз игрок заходил в игру! Каждый вход добавляет +1 к счётчику визитов.</p>

<h4>🎯 Что должно получиться:</h4>
<p>В лидерборде появится столбец «Визиты». Каждый раз когда ты заходишь в игру — число увеличивается на 1. Это сохраняется навсегда!</p>

<h4>👆 Шаг 1 — Создай новый Script в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService → Insert Object → Script</strong></li>
  <li>Переименуй в <strong>VisitsSystem</strong></li>
  <li>Вставь код:</li>
</ol>

<div class="code-block"><div class="code-header">Script VisitsSystem в ServerScriptService</div><pre>-- Подключаем DataStore
local DataStoreService = game:GetService("DataStoreService")

-- Отдельное хранилище для счётчика визитов
local visitsStore = DataStoreService:GetDataStore("PlayerVisits")

game.Players.PlayerAdded:Connect(function(player)

    -- Ждём пока появится leaderstats (его создаёт CoinsSystem)
    -- Если CoinsSystem не запущен — создаём сами
    local leaderstats = player:WaitForChild("leaderstats", 5)

    if not leaderstats then
        -- Создаём папку если её нет
        leaderstats = Instance.new("Folder")
        leaderstats.Name = "leaderstats"
        leaderstats.Parent = player
    end

    -- Создаём счётчик визитов в лидерборде
    local visits = Instance.new("IntValue")
    visits.Name = "Визиты"
    visits.Value = 0
    visits.Parent = leaderstats

    -- ЗАГРУЖАЕМ сохранённое количество визитов
    local success, savedVisits = pcall(function()
        return visitsStore:GetAsync(player.UserId)
    end)

    if success and savedVisits then
        -- Восстанавливаем старое значение
        visits.Value = savedVisits
    end

    -- Добавляем +1 к визитам (игрок зашёл!)
    visits.Value = visits.Value + 1
    print(player.Name .. " зашёл в игру. Это его визит #" .. visits.Value)

    -- СОХРАНЯЕМ новое количество визитов сразу при входе
    local success2, err = pcall(function()
        visitsStore:SetAsync(player.UserId, visits.Value)
    end)

    if not success2 then
        print("Ошибка сохранения визитов: " .. err)
    end
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• В лидерборде появился столбец «Визиты»? ✅<br>• При первом входе показывает «Визит #1»? ✅<br>• Выйди и зайди снова — стало «Визит #2»? ✅<br>• В Output видно сообщение с номером визита? ✅</p>`,
      hint: "WaitForChild('leaderstats', 5) ждёт папку leaderstats максимум 5 секунд. Число 5 — это таймаут. Если CoinsSystem создаст папку быстрее — VisitsSystem её найдёт и не будет создавать заново.",
      difficulty: "medium",
      solution: "local DSS = game:GetService('DataStoreService')\nlocal store = DSS:GetDataStore('PlayerVisits')\ngame.Players.PlayerAdded:Connect(function(player)\n    local ls = player:WaitForChild('leaderstats',5) or Instance.new('Folder')\n    if ls.Name ~= 'leaderstats' then ls.Name='leaderstats' ls.Parent=player end\n    local v = Instance.new('IntValue')\n    v.Name = 'Визиты' v.Value = 0 v.Parent = ls\n    local ok, val = pcall(function() return store:GetAsync(player.UserId) end)\n    if ok and val then v.Value = val end\n    v.Value = v.Value + 1\n    pcall(function() store:SetAsync(player.UserId, v.Value) end)\n    print(player.Name .. ' визит #' .. v.Value)\nend)",
    },
    {
      title: "Кнопка сохранения прямо в игре",
      desc: `<p>Добавим кнопку «Сохранить» прямо на экран игрока! Нажал — данные сохранились, появилось подтверждение.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Кнопка «💾 Сохранить» на экране. Нажимаешь — появляется зелёная надпись «Сохранено!» на 2 секунды, данные сохраняются в DataStore.</p>

<h4>👆 Шаг 1 — Создай RemoteEvent в ReplicatedStorage:</h4>
<ol>
  <li>Правой кнопкой на <strong>ReplicatedStorage → Insert Object → RemoteEvent</strong></li>
  <li>Переименуй в <strong>SaveData</strong></li>
</ol>

<h4>👆 Шаг 2 — Создай GUI кнопку:</h4>
<ol>
  <li>StarterGui → <strong>Insert Object → ScreenGui</strong> → переименуй в <strong>SaveGui</strong></li>
  <li>SaveGui → <strong>Insert Object → TextButton</strong> → переименуй в <strong>SaveBtn</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>Text</strong> → 💾 Сохранить<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0, 150 / Y: 0, 45<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 0, 10 / Y: 1, -55 (левый нижний угол)<br>
    &nbsp;&nbsp;• <strong>BackgroundColor3</strong> → тёмно-зелёный<br>
    &nbsp;&nbsp;• <strong>TextColor3</strong> → белый<br>
    &nbsp;&nbsp;• <strong>TextScaled</strong> → ✅</li>
  <li>SaveGui → <strong>Insert Object → TextLabel</strong> → переименуй в <strong>SavedMsg</strong></li>
  <li>В Properties:<br>
    &nbsp;&nbsp;• <strong>Text</strong> → ✅ Сохранено!<br>
    &nbsp;&nbsp;• <strong>Size</strong> → X: 0, 150 / Y: 0, 35<br>
    &nbsp;&nbsp;• <strong>Position</strong> → X: 0, 10 / Y: 1, -105<br>
    &nbsp;&nbsp;• <strong>TextColor3</strong> → Bright green<br>
    &nbsp;&nbsp;• <strong>BackgroundTransparency</strong> → 1<br>
    &nbsp;&nbsp;• <strong>TextScaled</strong> → ✅<br>
    &nbsp;&nbsp;• <strong>Visible</strong> → ❌ (скрыта)</li>
</ol>

<h4>👆 Шаг 3 — Добавь LocalScript в SaveGui:</h4>
<div class="code-block"><div class="code-header">LocalScript внутри SaveGui</div><pre>-- Находим кнопку и сообщение
local saveBtn  = script.Parent:WaitForChild("SaveBtn")
local savedMsg = script.Parent:WaitForChild("SavedMsg")

-- Находим RemoteEvent для отправки сигнала серверу
local saveEvent = game.ReplicatedStorage:WaitForChild("SaveData")

-- Защита от спама
local isSaving = false

saveBtn.MouseButton1Click:Connect(function()

    -- Если уже сохраняем — игнорируем нажатие
    if isSaving then return end
    isSaving = true

    -- Меняем текст кнопки пока идёт сохранение
    saveBtn.Text = "⏳ Сохранение..."

    -- Отправляем сигнал серверу: "сохрани мои данные!"
    saveEvent:FireServer()

    -- Показываем сообщение об успехе
    savedMsg.Visible = true
    saveBtn.Text = "💾 Сохранить"

    -- Через 2 секунды скрываем сообщение
    task.wait(2)
    savedMsg.Visible = false
    isSaving = false
end)</pre></div>

<h4>👆 Шаг 4 — Добавь обработчик в CoinsSystem (или новый Script в ServerScriptService):</h4>
<div class="code-block"><div class="code-header">Добавь эти строки в конец Script CoinsSystem</div><pre>-- Находим RemoteEvent
local saveEvent = game.ReplicatedStorage:WaitForChild("SaveData")

-- Когда игрок нажал кнопку "Сохранить"
saveEvent.OnServerEvent:Connect(function(player)
    -- Находим монеты игрока
    local coins = player.leaderstats:FindFirstChild("Монеты")

    if coins then
        -- Сохраняем в DataStore
        local success, err = pcall(function()
            coinsStore:SetAsync(player.UserId, coins.Value)
        end)

        if success then
            print(player.Name .. " вручную сохранил данные: " .. coins.Value .. " монет")
        end
    end
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Кнопка «💾 Сохранить» видна в левом нижнем углу? ✅<br>• При нажатии появляется «✅ Сохранено!»? ✅<br>• В Output появляется сообщение о сохранении? ✅<br>• Повторное нажатие во время сохранения игнорируется? ✅</p>`,
      hint: "LocalScript отправляет сигнал через FireServer(), а серверный Script ловит его через OnServerEvent. Именно сервер делает SetAsync — клиент не имеет права напрямую писать в DataStore!",
      difficulty: "medium",
      solution: "-- LocalScript:\nlocal btn = script.Parent:WaitForChild('SaveBtn')\nlocal msg = script.Parent:WaitForChild('SavedMsg')\nlocal ev = game.ReplicatedStorage:WaitForChild('SaveData')\nlocal saving = false\nbtn.MouseButton1Click:Connect(function()\n    if saving then return end\n    saving = true\n    btn.Text = '⏳ Сохранение...'\n    ev:FireServer()\n    msg.Visible = true\n    btn.Text = '💾 Сохранить'\n    task.wait(2)\n    msg.Visible = false\n    saving = false\nend)",
    },
    {
      title: "Таблица рекордов (Лидерборд)",
      desc: `<p>Финальное задание! Создадим таблицу лучших игроков. Нажимаешь кнопку — видишь топ-5 игроков по монетам.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Кнопка «🏆 Рекорды» на экране. Нажимаешь — появляется окно с именами и монетами всех игроков которые сейчас в игре, отсортированных от большего к меньшему.</p>

<h4>👆 Шаг 1 — Создай GUI для таблицы рекордов:</h4>
<ol>
  <li>StarterGui → <strong>Insert Object → ScreenGui</strong> → переименуй в <strong>LeaderGui</strong></li>
  <li>LeaderGui → <strong>Insert Object → TextButton</strong> → переименуй в <strong>LeaderBtn</strong><br>
    Text: «🏆 Рекорды», Size: X:0,150/Y:0,45, Position: X:0,170/Y:1,-55, BackgroundColor3: тёмно-жёлтый, TextColor3: белый, TextScaled ✅</li>
  <li>LeaderGui → <strong>Insert Object → Frame</strong> → переименуй в <strong>LeaderPanel</strong><br>
    Size: X:0,280/Y:0,250, Position: X:0,170/Y:1,-315, BackgroundColor3: тёмный, Visible: ❌</li>
  <li>LeaderPanel → <strong>Insert Object → TextLabel</strong> → переименуй в <strong>LeaderTitle</strong><br>
    Text: «🏆 Таблица рекордов», Size: X:1,0/Y:0,40, TextColor3: золотой, TextScaled ✅, BackgroundTransparency: 1</li>
  <li>LeaderPanel → <strong>Insert Object → TextLabel</strong> → переименуй в <strong>LeaderList</strong><br>
    Size: X:1,0/Y:1,-40, Position: X:0,0/Y:0,40, TextColor3: белый, TextScaled ✅, BackgroundTransparency: 1, TextXAlignment: Left</li>
</ol>

<h4>👆 Шаг 2 — Добавь LocalScript в LeaderGui:</h4>
<div class="code-block"><div class="code-header">LocalScript внутри LeaderGui</div><pre>-- Находим все элементы
local leaderBtn   = script.Parent:WaitForChild("LeaderBtn")
local leaderPanel = script.Parent:WaitForChild("LeaderPanel")
local leaderList  = leaderPanel:WaitForChild("LeaderList")

-- Состояние: открыта таблица или нет
local isOpen = false

-- Функция которая собирает данные всех игроков и показывает их
local function updateLeaderboard()

    -- Получаем список всех игроков в игре
    local players = game.Players:GetPlayers()

    -- Создаём таблицу с именами и монетами
    local data = {}
    for _, player in pairs(players) do
        local leaderstats = player:FindFirstChild("leaderstats")
        if leaderstats then
            local coins = leaderstats:FindFirstChild("Монеты")
            if coins then
                -- Добавляем в таблицу: имя и количество монет
                table.insert(data, {
                    name   = player.Name,
                    coins  = coins.Value
                })
            end
        end
    end

    -- Сортируем по монетам: от большего к меньшему
    table.sort(data, function(a, b)
        return a.coins > b.coins
    end)

    -- Формируем текст для отображения
    local text = ""
    for rank, entry in ipairs(data) do
        -- rank — это место (1, 2, 3...)
        -- entry.name — имя игрока
        -- entry.coins — количество монет
        text = text .. rank .. ". " .. entry.name .. " — " .. entry.coins .. " монет\n"
    end

    -- Если никого нет — показываем заглушку
    if text == "" then
        text = "Нет данных"
    end

    -- Обновляем надпись
    leaderList.Text = text
end

-- Нажатие кнопки
leaderBtn.MouseButton1Click:Connect(function()
    isOpen = not isOpen
    leaderPanel.Visible = isOpen

    if isOpen then
        -- Обновляем данные каждый раз при открытии
        updateLeaderboard()
        leaderBtn.Text = "✕ Закрыть"
    else
        leaderBtn.Text = "🏆 Рекорды"
    end
end)</pre></div>

<h4>🔍 Проверь себя:</h4>
<p>• Кнопка «🏆 Рекорды» видна рядом с кнопкой сохранения? ✅<br>• При нажатии появляется панель с игроками? ✅<br>• Игроки отсортированы по монетам? ✅<br>• Повторное нажатие закрывает панель? ✅</p>`,
      hint: "table.sort сортирует таблицу. Функция внутри говорит как сравнивать: a.coins > b.coins значит 'сначала тот у кого больше монет'. Если изменить > на < — будет сортировка по возрастанию.",
      difficulty: "hard",
      solution: "local btn = script.Parent:WaitForChild('LeaderBtn')\nlocal panel = script.Parent:WaitForChild('LeaderPanel')\nlocal list = panel:WaitForChild('LeaderList')\nlocal isOpen = false\nlocal function update()\n    local data = {}\n    for _,p in pairs(game.Players:GetPlayers()) do\n        local ls = p:FindFirstChild('leaderstats')\n        if ls then\n            local c = ls:FindFirstChild('Монеты')\n            if c then table.insert(data,{name=p.Name,coins=c.Value}) end\n        end\n    end\n    table.sort(data,function(a,b) return a.coins>b.coins end)\n    local t = ''\n    for i,e in ipairs(data) do t=t..i..'. '..e.name..' — '..e.coins..' монет\\n' end\n    list.Text = t~='' and t or 'Нет данных'\nend\nbtn.MouseButton1Click:Connect(function()\n    isOpen = not isOpen\n    panel.Visible = isOpen\n    if isOpen then update() btn.Text='✕ Закрыть' else btn.Text='🏆 Рекорды' end\nend)",
    },
  ],
};