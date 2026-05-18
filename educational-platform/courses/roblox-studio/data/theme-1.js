const theme1 = {
  id: 1,
  title: 'Волшебный мир Roblox',
  theory: {
    title: 'Твоя игровая мастерская',
    subtitle: 'Как создавать предметы и оживлять их',
    content: `<p><strong>Roblox Studio</strong> — это как конструктор LEGO, только на компьютере! Ты можешь строить что угодно: замки, гонки, парки развлечений.</p>

      <h3 style="color:var(--accent);margin-top:24px">🎮 Твои главные инструменты</h3>
      <p>• <strong>Explorer (Проводник)</strong> — окно слева, где видны все детали игры.<br>
         • <strong>Properties (Свойства)</strong> — окно справа, где меняют цвет, размер, прозрачность.<br>
         • <strong>Workspace</strong> — главная папка, где лежит всё, что видят игроки.</p>
      
      <div class="info-box success"><strong>💡 Секрет:</strong> Нет окон? Нажми <strong>View → Explorer</strong> и <strong>View → Properties</strong> в верхнем меню!</div>

      <h3 style="color:var(--accent);margin-top:24px">🧩 Из чего состоит игра</h3>
      <p>• <strong>Part</strong> — любой кирпичик или предмет.<br>
         • <strong>Size</strong> — размер (ширина, высота, глубина).<br>
         • <strong>Color / BrickColor</strong> — цвет блока.<br>
         • <strong>Anchored</strong> — закрепляет блок в воздухе.<br>
         • <strong>Transparency</strong> — делает блок прозрачным (0 — видно, 1 — не видно).<br>
         • <strong>Material</strong> — материал (дерево, камень, пластик, Neon).</p>

      <h3 style="color:var(--accent);margin-top:24px">⚡ Как добавить скрипт</h3>
      <p>1. Нажми правой кнопкой на <strong>ServerScriptService</strong> или на любой объект.<br>
         2. Выбери <strong>Insert Object → Script</strong>.<br>
         3. Вставь код и нажми <strong>▶ Play</strong>!</p>`,
  },
  tasks: [
    {
      title: '⭐ Секретная лестница в небо',
      desc: `<p>Построй лестницу, которая появляется из ниоткуда, когда ты подходишь!</p>

<h4>🎯 Что должно получиться:</h4>
<p>На земле лежит коврик. Когда игрок на него наступает — появляется лестница в небо.</p>

<h4>🖱️ Шаг 1 — Сделай коврик-активатор:</h4>
<ol>
  <li>Правой кнопкой на <strong>Workspace</strong> → <strong>Insert Object → Part</strong>.</li>
  <li>Назови его <strong>Activator</strong>.</li>
  <li>В Properties:<br>
      • <strong>BrickColor</strong> → Bright blue (синий)<br>
      • <strong>Size</strong> → 5, 0.5, 5 (плоский коврик)<br>
      • <strong>Anchored</strong> → ✅ галочка<br>
      • <strong>Transparency</strong> → 0.5 (полупрозрачный)</li>
</ol>

<h4>🖱️ Шаг 2 — Создай пустую папку для лестницы:</h4>
<ol>
  <li>Правой кнопкой на <strong>Workspace</strong> → <strong>Insert Object → Folder</strong>.</li>
  <li>Назови папку <strong>Staircase</strong> (пока пустая).</li>
</ol>

<h4>🖱️ Шаг 3 — Добавь волшебный скрипт внутрь Activator:</h4>
<ol>
  <li>Правой кнопкой на <strong>Activator</strong> → <strong>Insert Object → Script</strong>.</li>
  <li>Скопируй этот код (нажми на кнопку):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри Activator</div>
  <pre id="code1">local activator = script.Parent
local staircase = workspace:WaitForChild("Staircase")
local stairsCreated = false

activator.Touched:Connect(function(hit)
    local humanoid = hit.Parent:FindFirstChild("Humanoid")
    
    if humanoid and not stairsCreated then
        stairsCreated = true
        
        -- Создаём 5 ступенек!
        for i = 1, 5 do
            local stair = Instance.new("Part")
            stair.Size = Vector3.new(4, 0.5, 2)
            stair.BrickColor = BrickColor.new("Bright yellow")
            stair.Anchored = true
            stair.Position = Vector3.new(0, i * 1, 5)
            stair.Parent = staircase
        end
        
        -- Делаем коврик красным (активирован)
        activator.BrickColor = BrickColor.new("Bright red")
        
        -- Волшебное сообщение
        print("⭐ Лестница появилась! Иди наверх!")
    end
end)</pre>
  <button class="copy-btn" data-code="code1">📋 Копировать код</button>
</div>

<h4>✅ Проверь себя:</h4>
<p>• Коврик синий и полупрозрачный?<br>• Наступил — появились 5 жёлтых ступенек?<br>• Коврик стал красным?</p>`,
      hint: 'Папка Staircase должна быть пустой. Скрипт сам наполнит её ступеньками! Ступеньки появятся в воздухе — по ним можно забраться.',
      difficulty: 'medium',
    },
    {
      title: '🌈 Погоня за радугой',
      desc: `<p>Сделай волшебную тропинку, которая переливается всеми цветами!</p>

<h4>🎯 Что должно получиться:</h4>
<p>7 цветных блоков лежат на земле. Когда игрок наступает на блок — он начинает светиться и менять цвет.</p>

<h4>🖱️ Шаг 1 — Создай 7 разноцветных блоков:</h4>
<ol>
  <li>Создай первый блок: <strong>Workspace</strong> → правой кнопкой → <strong>Insert Object → Part</strong>.</li>
  <li>В Properties:<br>
      • <strong>Name</strong> → RedBlock<br>
      • <strong>BrickColor</strong> → Bright red<br>
      • <strong>Size</strong> → 4, 1, 4<br>
      • <strong>Anchored</strong> → ✅ галочка<br>
      • <strong>Material</strong> → Neon</li>
  <li>Скопируй блок 6 раз (<strong>Ctrl + D</strong>). Назови их по цветам:<br>
      OrangeBlock, YellowBlock, GreenBlock, BlueBlock, IndigoBlock, VioletBlock</li>
  <li>Разложи их в линию или радугой!</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт в ServerScriptService:</h4>
<ol>
  <li>Правой кнопкой на <strong>ServerScriptService</strong> → <strong>Insert Object → Script</strong>.</li>
  <li>Скопируй этот код (нажми на кнопку):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт в ServerScriptService</div>
  <pre id="code2">-- Список всех радужных блоков
local rainbowBlocks = {
    workspace:WaitForChild("RedBlock"),
    workspace:WaitForChild("OrangeBlock"),
    workspace:WaitForChild("YellowBlock"),
    workspace:WaitForChild("GreenBlock"),
    workspace:WaitForChild("BlueBlock"),
    workspace:WaitForChild("IndigoBlock"),
    workspace:WaitForChild("VioletBlock")
}

-- Цвета для переливания
local colors = {
    BrickColor.new("Bright red"),
    BrickColor.new("Bright orange"),
    BrickColor.new("Bright yellow"),
    BrickColor.new("Bright green"),
    BrickColor.new("Bright blue"),
    BrickColor.new("Deep blue"),
    BrickColor.new("Bright violet")
}

-- Для каждого блока
for i, block in ipairs(rainbowBlocks) do
    local originalColor = block.BrickColor
    local isActive = false
    
    block.Touched:Connect(function(hit)
        local humanoid = hit.Parent:FindFirstChild("Humanoid")
        
        if humanoid and not isActive then
            isActive = true
            
            -- Превращаем блок в радужный!
            for colorIndex = 1, #colors do
                task.wait(0.3)
                block.BrickColor = colors[colorIndex]
            end
            
            -- Возвращаем исходный цвет
            block.BrickColor = originalColor
            isActive = false
        end
    end)
end

print("🌈 Радуга готова! Наступай на блоки!")</pre>
  <button class="copy-btn" data-code="code2">📋 Копировать код</button>
</div>

<h4>✅ Проверь себя:</h4>
<p>• Все 7 блоков лежат на земле?<br>• При наступлении блок переливается цветами?<br>• Материал Neon делает блоки светящимися?</p>`,
      hint: 'Neon — волшебный материал! Блоки будут светиться как настоящие лампочки. Попробуй наступить на все блоки подряд!',
      difficulty: 'medium',
    },
    {
      title: '💨 Невидимый батут',
      desc: `<p>Создай прозрачный батут, который подбрасывает игроков высоко вверх!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Невидимая площадка. Наступил на неё — и тебя подкинуло в воздух!</p>

<h4>🖱️ Шаг 1 — Сделай батут невидимым:</h4>
<ol>
  <li>Правой кнопкой на <strong>Workspace</strong> → <strong>Insert Object → Part</strong>.</li>
  <li>Назови <strong>Booster</strong>.</li>
  <li>В Properties:<br>
      • <strong>Size</strong> → 8, 0.5, 8<br>
      • <strong>Anchored</strong> → ✅ галочка<br>
      • <strong>Transparency</strong> → 1 (совсем не видно!)<br>
      • <strong>CanCollide</strong> → ✅ оставь галочку (чтобы на него можно было встать)</li>
</ol>

<h4>🖱️ Шаг 2 — Укрась батут светящимися точками по краям:</h4>
<ol>
  <li>Создай маленький шарик: <strong>Insert Object → Part</strong>.</li>
  <li>Размер: 0.5, 0.5, 0.5</li>
  <li>Цвет: Bright yellow, Material: Neon</li>
  <li>Поставь 4 таких шарика по углам батута.</li>
</ol>

<h4>🖱️ Шаг 3 — Добавь скрипт внутрь Booster:</h4>
<ol>
  <li>Правой кнопкой на <strong>Booster</strong> → <strong>Insert Object → Script</strong>.</li>
  <li>Скопируй этот код (нажми на кнопку):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри Booster</div>
  <pre id="code3">local booster = script.Parent

-- Сила прыжка (чем больше, тем выше!)
local jumpPower = 80

booster.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChild("Humanoid")
    
    if humanoid then
        -- Находим ногу или основную часть персонажа
        local rootPart = character:FindFirstChild("HumanoidRootPart")
        
        if rootPart then
            -- Создаём эффект вспышки (жёлтый свет)
            local spark = Instance.new("Sparkles")
            spark.Parent = booster
            task.wait(0.2)
            spark:Destroy()
            
            -- Подбрасываем игрока!
            rootPart.Velocity = Vector3.new(0, jumpPower, 0)
            
            -- Игровой эффект
            print("💨 БУМ! Ты взлетел!")
        end
    end
end)</pre>
  <button class="copy-btn" data-code="code3">📋 Копировать код</button>
</div>

<h4>✅ Проверь себя:</h4>
<p>• Батут невидимый, но на него можно встать?<br>• По краям светятся жёлтые точки?<br>• Прыжок подкидывает высоко-высоко?</p>`,
      hint: 'Чем больше число в jumpPower, тем выше прыжок! Попробуй поставить 120 — полетишь как ракета! 🚀',
      difficulty: 'easy',
    },
    {
      title: '🎭 Маска-невидимка',
      desc: `<p>Создай волшебную маску! Надень её — и ты исчезнешь на 5 секунд.</p>

<h4>🎯 Что должно получиться:</h4>
<p>На земле лежит инструмент-маска. Берёшь её в руки — игрок становится прозрачным на 5 секунд.</p>

<h4>🖱️ Шаг 1 — Создай маску (инструмент):</h4>
<ol>
  <li>Правой кнопкой на <strong>Workspace</strong> → <strong>Insert Object → Tool</strong>.</li>
  <li>Назови инструмент <strong>MaskTool</strong>.</li>
  <li>Внутри инструмента создай деталь: правой кнопкой на <strong>MaskTool</strong> → <strong>Insert Object → Part</strong>.</li>
  <li>Назови деталь <strong>Handle</strong> (обязательно!).</li>
  <li>Настрой Handle:<br>
      • <strong>Size</strong> → 2, 1, 0.5 (плоская маска)<br>
      • <strong>BrickColor</strong> → Bright violet (фиолетовая)<br>
      • <strong>Material</strong> → Neon<br>
      • <strong>Shape</strong> → Ball (или оставь блоком)</li>
</ol>

<h4>🖱️ Шаг 2 — Добавь скрипт внутрь MaskTool:</h4>
<ol>
  <li>Правой кнопкой на <strong>MaskTool</strong> → <strong>Insert Object → Script</strong>.</li>
  <li>Скопируй этот код (нажми на кнопку):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри MaskTool</div>
  <pre id="code4">local tool = script.Parent

tool.Activated:Connect(function(player)
    local character = player.Character
    if character then
        local humanoid = character:FindFirstChild("Humanoid")
        
        if humanoid then
            -- Делаем игрока прозрачным
            for _, part in pairs(character:GetChildren()) do
                if part:IsA("BasePart") then
                    part.Transparency = 0.8
                end
            end
            
            -- Волшебное сообщение
            print("🎭 Ты стал невидимкой на 5 секунд!")
            
            -- Ждём 5 секунд
            task.wait(5)
            
            -- Возвращаем видимость
            for _, part in pairs(character:GetChildren()) do
                if part:IsA("BasePart") then
                    part.Transparency = 0
                end
            end
            
            print("👋 Ты снова видим!")
        end
    end
end)

-- Красивое описание в инвентаре
tool.Name = "🎭 Маска-невидимка"
tool.ToolTip = "Надень — и исчезни на 5 секунд!"</pre>
  <button class="copy-btn" data-code="code4">📋 Копировать код</button>
</div>

<h4>✅ Проверь себя:</h4>
<p>• Инструмент лежит на земле и его можно взять?<br>• После активации игрок становится полупрозрачным?<br>• Через 5 секунд видимость возвращается?</p>`,
      hint: 'Tool — это особый объект. Игрок может его подобрать, нажав E. В инвентаре он появится на панели снизу!',
      difficulty: 'medium',
    },
    {
      title: '🎄 Живая ёлка',
      desc: `<p>Посади волшебную ёлку, которая вырастает сама и мигает огоньками!</p>

<h4>🎯 Что должно получиться:</h4>
<p>Маленький горшочек. Ждёшь 10 секунд — вырастает ёлка с мигающими огоньками.</p>

<h4>🖱️ Шаг 1 — Сделай горшочек:</h4>
<ol>
  <li>Создай Part, назови <strong>Pot</strong>.</li>
  <li>Размер: 3, 1, 3, цвет: Brown (коричневый).</li>
</ol>

<h4>🖱️ Шаг 2 — Создай пустую папку Tree:</h4>
<ol>
  <li>В Workspace создай <strong>Folder</strong>, назови <strong>Tree</strong>.</li>
</ol>

<h4>🖱️ Шаг 3 — Добавь скрипт внутрь Pot:</h4>
<ol>
  <li>Правой кнопкой на <strong>Pot</strong> → <strong>Insert Object → Script</strong>.</li>
  <li>Скопируй этот код (нажми на кнопку):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри Pot</div>
  <pre id="code5">local pot = script.Parent
local treeFolder = workspace:WaitForChild("Tree")
local grown = false

-- Ждём 10 секунд
task.wait(10)

if not grown then
    grown = true
    
    -- Ствол ёлки (коричневый)
    local trunk = Instance.new("Part")
    trunk.Size = Vector3.new(1, 2, 1)
    trunk.BrickColor = BrickColor.new("Brown")
    trunk.Anchored = true
    trunk.Position = pot.Position + Vector3.new(0, 1.5, 0)
    trunk.Parent = treeFolder
    
    -- Первый ярус (зелёный, большой)
    local layer1 = Instance.new("Part")
    layer1.Size = Vector3.new(4, 1, 4)
    layer1.BrickColor = BrickColor.new("Bright green")
    layer1.Anchored = true
    layer1.Position = trunk.Position + Vector3.new(0, 1.5, 0)
    layer1.Parent = treeFolder
    
    -- Второй ярус (зелёный, средний)
    local layer2 = Instance.new("Part")
    layer2.Size = Vector3.new(3, 1, 3)
    layer2.BrickColor = BrickColor.new("Bright green")
    layer2.Anchored = true
    layer2.Position = layer1.Position + Vector3.new(0, 1.2, 0)
    layer2.Parent = treeFolder
    
    -- Третий ярус (зелёный, маленький)
    local layer3 = Instance.new("Part")
    layer3.Size = Vector3.new(2, 1, 2)
    layer3.BrickColor = BrickColor.new("Bright green")
    layer3.Anchored = true
    layer3.Position = layer2.Position + Vector3.new(0, 1.2, 0)
    layer3.Parent = treeFolder
    
    -- Звезда на макушке!
    local star = Instance.new("Part")
    star.Size = Vector3.new(1, 1, 1)
    star.BrickColor = BrickColor.new("Bright yellow")
    star.Material = Enum.Material.Neon
    star.Anchored = true
    star.Shape = Enum.PartType.Ball
    star.Position = layer3.Position + Vector3.new(0, 1, 0)
    star.Parent = treeFolder
    
    -- Ёлочные игрушки (разноцветные шарики)
    local colors = {"Bright red", "Bright blue", "Bright yellow", "Bright orange"}
    for i = 1, 12 do
        local ornament = Instance.new("Part")
        ornament.Size = Vector3.new(0.5, 0.5, 0.5)
        ornament.BrickColor = BrickColor.new(colors[math.random(1, #colors)])
        ornament.Material = Enum.Material.Neon
        ornament.Anchored = true
        ornament.Shape = Enum.PartType.Ball
        
        -- Случайное место на ёлке
        local x = math.random(-2, 2)
        local z = math.random(-2, 2)
        local y = math.random(1, 5)
        ornament.Position = trunk.Position + Vector3.new(x, y + 1, z)
        ornament.Parent = treeFolder
    end
    
    print("🎄 Ёлка выросла! С Рождеством!")
    
    -- Заставляем звёздочку мигать каждую секунду
    while true do
        task.wait(0.5)
        star.Transparency = star.Transparency == 0 and 0.5 or 0
    end
end</pre>
  <button class="copy-btn" data-code="code5">📋 Копировать код</button>
</div>

<h4>✅ Проверь себя:</h4>
<p>• Горшочек стоит на земле?<br>• Через 10 секунд вырастает зелёная ёлка?<br>• На ёлке есть мигающая звезда и разноцветные шарики?</p>`,
      hint: "Попробуй изменить время роста! Найди строку 'task.wait(10)' и поменяй 10 на 3 — ёлка вырастет быстрее! 🌱",
      difficulty: 'hard',
    },
    {
      title: '🚪 Портальная пушка',
      desc: `<p>Сделай портал! Наступи на синюю кнопку — телепорт в красный портал.</p>

<h4>🎯 Что должно получиться:</h4>
<p>Два круга на земле: синий (вход) и красный (выход). Наступил на синий — оказался на красном.</p>

<h4>🖱️ Шаг 1 — Создай синий портал (вход):</h4>
<ol>
  <li>Part, назови <strong>PortalIn</strong>.</li>
  <li>Size: 4, 0.5, 4, Color: Bright blue, Material: Neon.</li>
</ol>

<h4>🖱️ Шаг 2 — Создай красный портал (выход):</h4>
<ol>
  <li>Part, назови <strong>PortalOut</strong>.</li>
  <li>Size: 4, 0.5, 4, Color: Bright red, Material: Neon.</li>
  <li>Поставь его в другом месте карты!</li>
</ol>

<h4>🖱️ Шаг 3 — Добавь скрипт внутрь PortalIn:</h4>
<ol>
  <li>Правой кнопкой на <strong>PortalIn</strong> → <strong>Insert Object → Script</strong>.</li>
  <li>Скопируй этот код (нажми на кнопку):</li>
</ol>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри PortalIn</div>
  <pre id="code6">local portalIn = script.Parent
local portalOut = workspace:WaitForChild("PortalOut")

-- Эффект портала (вращающиеся частицы)
local function createPortalEffect(position)
    for i = 1, 8 do
        local particle = Instance.new("Part")
        particle.Size = Vector3.new(0.5, 0.5, 0.5)
        particle.BrickColor = BrickColor.new("Bright blue")
        particle.Material = Enum.Material.Neon
        particle.Anchored = true
        particle.CanCollide = false
        
        local angle = (i / 8) * math.pi * 2
        local x = math.cos(angle) * 2
        local z = math.sin(angle) * 2
        particle.Position = position + Vector3.new(x, 1, z)
        particle.Parent = workspace
        
        task.wait(0.05)
        particle:Destroy()
    end
end

portalIn.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChild("Humanoid")
    
    if humanoid then
        local rootPart = character:FindFirstChild("HumanoidRootPart")
        
        if rootPart then
            -- Создаём красивый эффект
            createPortalEffect(rootPart.Position)
            
            -- Телепортируем!
            rootPart.CFrame = portalOut.CFrame + Vector3.new(0, 2, 0)
            
            -- Эффект на выходе
            createPortalEffect(rootPart.Position)
            
            print("🌀 Телепортация успешна!")
        end
    end
end)

print("🚪 Портал готов! Наступи на синий — попадёшь в красный!")</pre>
  <button class="copy-btn" data-code="code6">📋 Копировать код</button>
</div>

<h4>✅ Проверь себя:</h4>
<p>• Синий и красный порталы стоят в разных местах?<br>• Наступаешь на синий — появляешься на красном?<br>• Появляются ли голубые искры при телепортации?</p>`,
      hint: 'Сделай порталы в разных концах карты! Например, синий у старта, красный — на высокой горе. Бам — и ты на вершине! 🏔️',
      difficulty: 'medium',
    },
  ],
};

// Функция для копирования текста в буфер обмена (работает без выделения!)
function setupCopyButtons() {
  const buttons = document.querySelectorAll('.copy-btn');

  buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
      const codeId = this.getAttribute('data-code');
      const codeElement = document.getElementById(codeId);

      if (codeElement) {
        const textToCopy = codeElement.textContent;

        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            const originalText = this.textContent;
            this.textContent = '✅ Скопировано!';
            this.style.background = '#4caf50';

            setTimeout(() => {
              this.textContent = originalText;
              this.style.background = '';
            }, 1500);
          })
          .catch((err) => {
            console.error('Ошибка копирования: ', err);
            alert(
              'Не удалось скопировать код. Попробуй выделить код вручную и нажать Ctrl+C'
            );
          });
      } else {
        console.error('Элемент с кодом не найден:', codeId);
        alert('Ошибка: код не найден');
      }
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupCopyButtons);
} else {
  setupCopyButtons();
}
