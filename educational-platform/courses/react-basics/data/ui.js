// ============ UI-РЕНДЕРИНГ ============

function renderSidebar() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  let html = "";
  courseData.forEach((theme, idx) => {
    const themeCompleted = theme.tasks.every(
      (_, tIdx) => completedTasks[`${idx}_${tIdx}`],
    );
    html += `<div class="nav-item ${idx === currentTheme ? "active" : ""} ${themeCompleted ? "completed" : ""}" onclick="goToTheme(${idx})"><div class="nav-icon">${themeCompleted ? "✓" : idx + 1}</div><span>${escapeHtml(theme.title)}</span></div>`;
  });
  sidebar.innerHTML = html;
}

function renderCurrentTheme() {
  const theme = courseData[currentTheme];
  const main = document.getElementById("mainContent");
  if (!main) return;
  let tasksHtml = "";
  theme.tasks.forEach((task, idx) => {
    const isCompleted = !!completedTasks[`${currentTheme}_${idx}`];
    const difficultyLabel =
      task.difficulty === "easy"
        ? "Лёгкое"
        : task.difficulty === "medium"
          ? "Среднее"
          : "Тяжелое";
    tasksHtml += `<div class="task-card ${isCompleted ? "completed" : ""}" data-task-idx="${idx}"><div class="task-header" onclick="toggleTaskBody(this, ${idx})"><div class="task-number">${isCompleted ? "✓" : idx + 1}</div><div class="task-info"><h4>${escapeHtml(task.title)}</h4><p>${escapeHtml(task.desc)}</p></div><div class="difficulty ${task.difficulty}">${difficultyLabel}</div></div><div class="task-body" id="taskBody-${idx}"><div class="hint-box">💡 Подсказка: ${escapeHtml(task.hint)}</div><button class="btn btn-primary" onclick="toggleSolution(${idx})">📘 Показать решение</button><div class="solution-area" id="solution-${idx}"><div class="code-block"><div class="code-header">✅ Решение.</div><pre>${escapeHtmlPreserveSpaces(task.solution)}</pre></div></div><button class="btn" style="margin-top:12px" onclick="toggleComplete(${currentTheme}, ${idx})">${isCompleted ? "Отменить выполнение" : "✓ Отметить выполненным"}</button></div></div>`;
  });
  main.innerHTML = `<div class="card"><h2>${escapeHtml(theme.theory.title)}</h2><div class="subtitle">${escapeHtml(theme.theory.subtitle)}</div>${theme.theory.content}</div><h3 style="margin-bottom:20px">📋 Практические задания (10 заданий) — код с правильными отступами</h3><div class="tasks-section">${tasksHtml}</div><div class="nav-buttons"><button class="btn" ${currentTheme === 0 ? "disabled" : ""} onclick="prevTheme()">← Предыдущая тема</button><button class="btn btn-primary" onclick="nextTheme()">Следующая тема →</button></div>`;
}

// ============ НАВИГАЦИЯ ============

window.goToTheme = (idx) => {
  currentTheme = idx;
  renderSidebar();
  renderCurrentTheme();
  window.scrollTo(0, 0);
};

window.prevTheme = () => {
  if (currentTheme > 0) goToTheme(currentTheme - 1);
};

window.nextTheme = () => {
  if (currentTheme < courseData.length - 1) goToTheme(currentTheme + 1);
};

window.toggleTaskBody = (header, idx) => {
  const body = document.getElementById(`taskBody-${idx}`);
  if (body) body.classList.toggle("open");
};

window.toggleSolution = (idx) => {
  const sol = document.getElementById(`solution-${idx}`);
  if (sol) sol.classList.toggle("open");
};

window.toggleComplete = (themeIdx, taskIdx) => {
  toggleTask(themeIdx, taskIdx);
};

// ============ ИНИЦИАЛИЗАЦИЯ ============
loadProgress();
renderSidebar();
renderCurrentTheme();
