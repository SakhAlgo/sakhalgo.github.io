// ============ УПРАВЛЕНИЕ ПРОГРЕССОМ ============

let completedTasks = {};
let currentTheme = 0;

function loadProgress() {
  const saved = localStorage.getItem("roblox_course_progress_v1");
  if (saved) completedTasks = JSON.parse(saved);
  updateGlobalProgress();
}

function saveProgress() {
  localStorage.setItem(
    "roblox_course_progress_v1",
    JSON.stringify(completedTasks),
  );
  updateGlobalProgress();
}

function updateGlobalProgress() {
  let total = 0,
    done = 0;
  courseData.forEach((theme, tIdx) => {
    theme.tasks.forEach((_, taskIdx) => {
      total++;
      if (completedTasks[`${tIdx}_${taskIdx}`]) done++;
    });
  });
  const percent = total === 0 ? 0 : Math.floor((done / total) * 100);
  const fillEl = document.getElementById("globalProgressFill");
  const textEl = document.getElementById("globalProgressText");
  if (fillEl) fillEl.style.width = percent + "%";
  if (textEl)
    textEl.innerText = `${percent}% завершено (${done}/${total} заданий)`;
}

function toggleTask(themeIdx, taskIdx) {
  const key = `${themeIdx}_${taskIdx}`;
  if (completedTasks[key]) delete completedTasks[key];
  else completedTasks[key] = true;
  saveProgress();
  renderSidebar();
  renderCurrentTheme();
}
