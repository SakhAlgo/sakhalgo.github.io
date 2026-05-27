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
  <pre id="code1">
local activator = script.Parent
local stairsCreated = false

activator.Touched:Connect(function(hit)
	local character = hit.Parent
	local humanoid = character:FindFirstChild("Humanoid")
	local rootPart = character:FindFirstChild("HumanoidRootPart")

	if humanoid and rootPart and not stairsCreated then
		stairsCreated = true

		local playerPos = rootPart.Position
		local lookVector = rootPart.CFrame.LookVector

		for i = 1, 5 do
			local stair = Instance.new("Part")
			stair.Size = Vector3.new(4, 0.5, 2)
			stair.BrickColor = BrickColor.new("Bright yellow")
			stair.Anchored = true

			local offset = lookVector * (i * 5 + 5)
			stair.Position = Vector3.new(
				playerPos.X + offset.X,
				playerPos.Y + (i * 1),
				playerPos.Z + offset.Z
			)

			stair.CFrame = CFrame.new(stair.Position, stair.Position + lookVector)
			stair.Parent = workspace
		end

		activator.BrickColor = BrickColor.new("Bright red")
		print("⭐ Лестница появилась перед игроком!")
	end
end)
</pre>
  <button class="copy-btn" data-code="code1">📋 Копировать код</button>
</div>

<h4>✅ Проверь себя:</h4>
<p>• Коврик синий и полупрозрачный?<br>• Наступил — появились 5 жёлтых ступенек?<br>• Коврик стал красным?</p>`,
      hint: 'Папка Staircase должна быть пустой. Скрипт сам наполнит её ступеньками! Ступеньки появятся в воздухе — по ним можно забраться.',
      difficulty: 'medium',
    },
    {
      title: '🌈 Погоня за радугой',
      desc: `
<p>Сделай тропинку из 7 блоков. Наступишь на блок — он переливается всеми цветами!</p>

<h4>Шаг 1 — Создай 7 блоков</h4>
<p>В панели <strong>Explorer</strong> справа найди <strong>Workspace</strong>. Нажми на него <strong>правой кнопкой мыши</strong> → <strong>Insert Object</strong> → <strong>Part</strong>. Появится серый блок.</p>
<p>Выдели блок и в панели <strong>Properties</strong> снизу справа задай:</p>
<ul>
  <li><strong>Name</strong> → напиши <code>RedBlock</code></li>
  <li><strong>BrickColor</strong> → выбери <code>Bright red</code></li>
  <li><strong>Size</strong> → введи <code>4, 1, 4</code></li>
  <li><strong>Anchored</strong> → поставь галочку ✅ (чтобы блок не падал)</li>
  <li><strong>Material</strong> → выбери <code>Neon</code> (блок будет светиться!)</li>
</ul>
<p>Теперь скопируй этот блок 6 раз: выдели его и нажми <strong>Ctrl+D</strong> шесть раз. Переименуй копии так:</p>
<p><code>OrangeBlock</code>, <code>YellowBlock</code>, <code>GreenBlock</code>, <code>BlueBlock</code></p>
<p>У каждого блока измени <strong>BrickColor</strong> на его цвет: оранжевый, жёлтый, зелёный, синий. Расставь блоки в линию на земле.</p>

<h4>Шаг 2 — Добавь скрипт</h4>
<p>В <strong>Explorer</strong> найди <strong>ServerScriptService</strong>. Нажми на него <strong>правой кнопкой</strong> → <strong>Insert Object</strong> → <strong>Script</strong>. Откроется редактор кода. Удали весь текст внутри и вставь этот код:</p>

<div class="code-block">
  <div class="code-header">📜 Скрипт в ServerScriptService</div>
  <pre id="code2">-- Список всех радужных блоков
local rainbowBlocks = {
    workspace:WaitForChild("RedBlock"),
    workspace:WaitForChild("OrangeBlock"),
    workspace:WaitForChild("YellowBlock"),
    workspace:WaitForChild("GreenBlock"),
    workspace:WaitForChild("BlueBlock"),
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

-- Для каждого блока добавляем реакцию на касание
for i, block in ipairs(rainbowBlocks) do
    local originalColor = block.BrickColor
    local isActive = false

    block.Touched:Connect(function(hit)
        local humanoid = hit.Parent:FindFirstChild("Humanoid")

        if humanoid and not isActive then
            isActive = true

            -- Перебираем все цвета по очереди
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

print("🌈 Радуга готова!")</pre>
  <button class="copy-btn" data-code="code2">📋 Копировать код</button>
</div>

<h4>✅ Проверь</h4>
<p>Нажми <strong>Play</strong> (кнопка ▶ вверху). Подойди к любому блоку и наступи на него — он должен начать переливаться цветами, а потом вернуться к своему цвету.</p>
`,
      hint: 'Материал Neon делает блок светящимся — как настоящая неоновая лампа. Попробуй наступить на все блоки один за другим!',
      difficulty: 'medium',
    },

    {
      title: '💨 Невидимый батут',
      desc: `
<p>Создай невидимую площадку. Наступишь на неё — и тебя подбросит высоко вверх!</p>

<h4>Шаг 1 — Создай батут</h4>
<p>В <strong>Explorer</strong> нажми правой кнопкой на <strong>Workspace</strong> → <strong>Insert Object</strong> → <strong>Part</strong>.</p>
<p>Выдели созданный блок и в <strong>Properties</strong> задай:</p>
<ul>
  <li><strong>Name</strong> → <code>Booster</code></li>
  <li><strong>Size</strong> → <code>8, 0.5, 8</code> (широкий и плоский)</li>
  <li><strong>Anchored</strong> → галочка ✅</li>
  <li><strong>Transparency</strong> → <code>1</code> (значение 1 = полностью невидимый)</li>
  <li><strong>CanCollide</strong> → галочка ✅ (игрок всё равно встанет на него, даже если не видит)</li>
</ul>

<h4>Шаг 2 — Добавь скрипт прямо в батут</h4>
<p>В <strong>Explorer</strong> нажми правой кнопкой на <strong>Booster</strong> → <strong>Insert Object</strong> → <strong>Script</strong>. Удали весь текст и вставь:</p>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри Booster</div>
  <pre id="code3">
-- Script (обычный) внутри пада
local booster = script.Parent
local jumpPower = 150
local debounce = {}

booster.Touched:Connect(function(hit)
	local character = hit.Parent
	local humanoid = character:FindFirstChildOfClass("Humanoid")
	if not humanoid or humanoid.Health <= 0 then return end

	local rootPart = character:FindFirstChild("HumanoidRootPart")
	if not rootPart then return end

	if debounce[character] then return end
	debounce[character] = true

	-- Сбрасываем вертикальную скорость перед импульсом
	rootPart.AssemblyLinearVelocity = Vector3.new(
		rootPart.AssemblyLinearVelocity.X,
		0,
		rootPart.AssemblyLinearVelocity.Z
	)

	-- Передаём NetworkOwnership серверу, чтобы физика работала корректно
	rootPart:SetNetworkOwner(nil)

	rootPart:ApplyImpulse(Vector3.new(0, jumpPower * rootPart.AssemblyMass, 0))

	print("💨 Взлетаем!")

	task.wait(1)
	-- Возвращаем владение клиенту
	local player = game.Players:GetPlayerFromCharacter(character)
	if player then
		rootPart:SetNetworkOwner(player)
	end

	debounce[character] = nil
end)
</pre>
  <button class="copy-btn" data-code="code3">📋 Копировать код</button>
</div>

<h4>✅ Проверь</h4>
<p>Нажми <strong>Play</strong> и зайди на то место, где стоит батут — он невидимый, но ты стоишь на нём. Сделай шаг вперёд и встань на него — тебя подбросит!</p>
`,
      hint: 'Измени число 80 в строке jumpPower на 150 — и полетишь как ракета! Только не поставь слишком большое число, иначе улетишь за карту 😄',
      difficulty: 'easy',
    },

    {
      title: '🎭 Маска-невидимка',
      desc: `
<p>Создай инструмент — маску. Подберёшь её и нажмёшь — станешь невидимым на 5 секунд!</p>

<h4>Шаг 1 — Создай инструмент</h4>
<p>В <strong>Explorer</strong> нажми правой кнопкой на <strong>Workspace</strong> → <strong>Insert Object</strong> → <strong>Tool</strong>. Назови его <code>MaskTool</code>.</p>
<p>Теперь нажми правой кнопкой на <strong>MaskTool</strong> → <strong>Insert Object</strong> → <strong>Part</strong>. Назови эту деталь ровно <code>Handle</code> — это обязательно, иначе инструмент не будет работать!</p>
<p>Выдели <strong>Handle</strong> и в <strong>Properties</strong> задай:</p>
<ul>
  <li><strong>Size</strong> → <code>2, 1, 0.5</code></li>
  <li><strong>BrickColor</strong> → <code>Bright violet</code></li>
  <li><strong>Material</strong> → <code>Neon</code></li>
</ul>

<h4>Шаг 2 — Добавь скрипт в инструмент</h4>
<p>Нажми правой кнопкой на <strong>MaskTool</strong> → <strong>Insert Object</strong> → <strong>LocalScript</strong>. Удали текст внутри и вставь:</p>

<div class="code-block">
  <div class="code-header">📜 LocalScript внутри MaskTool</div>
  <pre id="code4">local tool = script.Parent
local player = game.Players.LocalPlayer

tool.Activated:Connect(function()
    local character = player.Character
    if not character then return end

    -- Делаем все части тела прозрачными
    for _, part in pairs(character:GetChildren()) do
        if part:IsA("BasePart") then
            part.Transparency = 0.9
        end
    end

    print("🎭 Ты невидимка! 5 секунд...")

    -- Ждём 5 секунд
    task.wait(5)

    -- Возвращаем видимость
    for _, part in pairs(character:GetChildren()) do
        if part:IsA("BasePart") then
            part.Transparency = 0
        end
    end

    print("👋 Ты снова видим!")
end)</pre>
  <button class="copy-btn" data-code="code4">📋 Копировать код</button>
</div>

<h4>✅ Проверь</h4>
<p>Нажми <strong>Play</strong>. Подойди к маске и нажми <strong>E</strong> — подберёшь её. Потом нажми <strong>левую кнопку мыши</strong> — игрок станет почти прозрачным. Через 5 секунд вернётся обратно.</p>
`,
      hint: 'Tool — особый объект в Roblox. Его можно подобрать с земли нажав E. После этого он появится в нижней панели инвентаря.',
      difficulty: 'medium',
    },

    {
      title: '🎄 Живая ёлка',
      desc: `
<p>Посади горшочек — и через 10 секунд из него вырастет ёлка с мигающей звездой!</p>

<h4>Шаг 1 — Создай горшочек</h4>
<p>В <strong>Explorer</strong> нажми правой кнопкой на <strong>Workspace</strong> → <strong>Insert Object</strong> → <strong>Part</strong>.</p>
<p>В <strong>Properties</strong> задай:</p>
<ul>
  <li><strong>Name</strong> → <code>Pot</code></li>
  <li><strong>Size</strong> → <code>3, 1, 3</code></li>
  <li><strong>BrickColor</strong> → <code>Brown</code></li>
  <li><strong>Anchored</strong> → галочка ✅</li>
</ul>

<h4>Шаг 2 — Добавь скрипт в горшочек</h4>
<p>Нажми правой кнопкой на <strong>Pot</strong> → <strong>Insert Object</strong> → <strong>Script</strong>. Удали текст и вставь:</p>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри Pot</div>
  <pre id="code5">local pot = script.Parent

-- Ждём 10 секунд перед тем как вырастить ёлку
task.wait(10)

-- Ствол
local trunk = Instance.new("Part")
trunk.Size = Vector3.new(1, 2, 1)
trunk.BrickColor = BrickColor.new("Brown")
trunk.Anchored = true
trunk.Position = pot.Position + Vector3.new(0, 2, 0)
trunk.Parent = workspace

-- Нижний ярус (самый широкий)
local layer1 = Instance.new("Part")
layer1.Size = Vector3.new(5, 1, 5)
layer1.BrickColor = BrickColor.new("Bright green")
layer1.Anchored = true
layer1.Position = trunk.Position + Vector3.new(0, 1.5, 0)
layer1.Parent = workspace

-- Средний ярус
local layer2 = Instance.new("Part")
layer2.Size = Vector3.new(3, 1, 3)
layer2.BrickColor = BrickColor.new("Bright green")
layer2.Anchored = true
layer2.Position = layer1.Position + Vector3.new(0, 1.2, 0)
layer2.Parent = workspace

-- Верхний ярус (маленький)
local layer3 = Instance.new("Part")
layer3.Size = Vector3.new(2, 1, 2)
layer3.BrickColor = BrickColor.new("Bright green")
layer3.Anchored = true
layer3.Position = layer2.Position + Vector3.new(0, 1.2, 0)
layer3.Parent = workspace

-- Звезда на макушке
local star = Instance.new("Part")
star.Size = Vector3.new(1, 1, 1)
star.BrickColor = BrickColor.new("Bright yellow")
star.Material = Enum.Material.Neon
star.Shape = Enum.PartType.Ball
star.Anchored = true
star.Position = layer3.Position + Vector3.new(0, 1, 0)
star.Parent = workspace

print("🎄 Ёлка выросла!")

-- Звезда мигает бесконечно
while true do
    task.wait(0.5)
    if star.Transparency == 0 then
        star.Transparency = 0.8
    else
        star.Transparency = 0
    end
end</pre>
  <button class="copy-btn" data-code="code5">📋 Копировать код</button>
</div>

<h4>✅ Проверь</h4>
<p>Нажми <strong>Play</strong> и жди. Через 10 секунд прямо из горшочка вырастет ёлка, а звезда на макушке начнёт мигать.</p>
`,
      hint: 'Хочешь чтобы ёлка росла быстрее? Найди строку task.wait(10) и замени 10 на 3. Теперь ждать нужно всего 3 секунды!',
      difficulty: 'hard',
    },

    {
      title: '🚪 Портал-телепорт',
      desc: `
<p>Создай два портала: синий и красный. Наступишь на синий — мгновенно окажешься на красном!</p>

<h4>Шаг 1 — Создай синий портал (вход)</h4>
<p>В <strong>Explorer</strong> нажми правой кнопкой на <strong>Workspace</strong> → <strong>Insert Object</strong> → <strong>Part</strong>.</p>
<p>В <strong>Properties</strong>:</p>
<ul>
  <li><strong>Name</strong> → <code>PortalIn</code></li>
  <li><strong>Size</strong> → <code>4, 0.5, 4</code></li>
  <li><strong>BrickColor</strong> → <code>Bright blue</code></li>
  <li><strong>Material</strong> → <code>Neon</code></li>
  <li><strong>Anchored</strong> → галочка ✅</li>
</ul>

<h4>Шаг 2 — Создай красный портал (выход)</h4>
<p>Снова: правой кнопкой на <strong>Workspace</strong> → <strong>Insert Object</strong> → <strong>Part</strong>.</p>
<p>В <strong>Properties</strong>:</p>
<ul>
  <li><strong>Name</strong> → <code>PortalOut</code></li>
  <li><strong>Size</strong> → <code>4, 0.5, 4</code></li>
  <li><strong>BrickColor</strong> → <code>Bright red</code></li>
  <li><strong>Material</strong> → <code>Neon</code></li>
  <li><strong>Anchored</strong> → галочка ✅</li>
</ul>
<p>Перетащи красный портал подальше от синего — в другой конец карты.</p>

<h4>Шаг 3 — Добавь скрипт в синий портал</h4>
<p>Нажми правой кнопкой на <strong>PortalIn</strong> → <strong>Insert Object</strong> → <strong>Script</strong>. Удали текст и вставь:</p>

<div class="code-block">
  <div class="code-header">📜 Скрипт внутри PortalIn</div>
  <pre id="code6">local portalIn = script.Parent
local portalOut = workspace:WaitForChild("PortalOut")

-- Защита от двойной телепортации
local cooldown = false

portalIn.Touched:Connect(function(hit)
    local character = hit.Parent
    local humanoid = character:FindFirstChild("Humanoid")

    if humanoid and not cooldown then
        cooldown = true

        local rootPart = character:FindFirstChild("HumanoidRootPart")
        if rootPart then
            -- Телепортируем игрока к красному порталу
            -- +3 по высоте чтобы появиться НАД порталом, а не внутри него
            rootPart.CFrame = portalOut.CFrame + Vector3.new(0, 3, 0)
            print("🌀 Телепортация!")
        end

        -- Пауза 2 секунды чтобы не телепортировало снова сразу
        task.wait(2)
        cooldown = false
    end
end)

print("🚪 Порталы готовы!")</pre>
  <button class="copy-btn" data-code="code6">📋 Копировать код</button>
</div>

<h4>✅ Проверь</h4>
<p>Нажми <strong>Play</strong>. Подойди и наступи на синий светящийся портал — ты мгновенно перенесёшься к красному порталу в другом месте карты.</p>
`,
      hint: 'Поставь синий портал у старта, а красный на высокой горе или острове. Получится крутой секретный проход!',
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
