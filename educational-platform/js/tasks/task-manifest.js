/**
 * Реестр всех заданий платформы с поддержкой курсов и модулей
 * Структура: Курсы → Модули → Задачи
 *
 * Данные по каждому курсу вынесены в отдельные файлы:
 * - course-html-css-basics.js
 * - course-js-basics.js
 */

import {
  tasksCourseHtmlCssBasics,
  courseHtmlCssBasics,
} from "./course-html-css-basics.js";

import {
  tasksCourseJsBasics,
  courseJsBasics,
} from "./course-js-basics.js";

export const DIFFICULTY_MAP = {
  easy: { label: "Лёгкое", color: "#3fb950", stars: "⭐" },
  medium: { label: "Среднее", color: "#d29922", stars: "⭐⭐" },
  hard: { label: "Сложное", color: "#f85149", stars: "⭐⭐⭐" },
};

// ════════════════════════════════════════════════════
// КУРСЫ И МОДУЛИ
// ════════════════════════════════════════════════════

export const coursesManifest = [
  courseHtmlCssBasics,
  courseJsBasics,
];

// ════════════════════════════════════════════════════
// ЗАДАЧИ
// ════════════════════════════════════════════════════

export const tasksManifest = [
  ...tasksCourseHtmlCssBasics,
  ...tasksCourseJsBasics,
];