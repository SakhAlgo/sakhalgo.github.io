/**
 * Скрипт замены HTML-тегов < > на < >
 * в примерах кода (<pre> блоки теории) и решениях курса Roblox Studio.
 *
 * Запуск: node courses/roblox-studio/data/escape-html-tags.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const files = [
  "theme-1.js",
  "theme-7.js",
  "theme-8.js",
  "theme-2.js",
  "theme-3.js",
  "theme-4.js",
  "theme-5.js",
  "theme-6.js",
  "theme-7.js",
  "theme-8.js",
  "theme-9.js",
];

// Список HTML-тегов (нижний регистр для сравнения)
const HTML_TAGS = new Set([
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // React-компоненты (с заглавной буквы) — их тоже экранируем
  // (определяем динамически: начинается с заглавной буквы)
]);

function isHtmlTag(tagName) {
  return (
    HTML_TAGS.has(tagName.toLowerCase()) ||
    (tagName[0] >= "A" && tagName[0] <= "Z")
  );
}

// ================================================================
// ОБРАБОТКА
// ================================================================

for (const file of files) {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, "utf8");
  let count = 0;

  // ЭТАП 1: Экранирование внутри <pre>...</pre> блоков (теория)
  content = content.replace(
    /(<pre>)([\s\S]*?)(<\/pre>)/g,
    (_m, open, inner, close) => {
      const newInner = inner.replace(/</g, "<").replace(/>/g, ">");
      if (newInner !== inner) {
        count++;
        return open + newInner + close;
      }
      return _m;
    },
  );

  // ЭТАП 2: Экранирование в solution: "..." и solution: '...'
  // Построчно обрабатываем
  let result = "";
  let state = "normal"; // normal | inSolutionDq | inSolutionSq
  let escapeNext = false;

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    const next = content[i + 1] || "";

    if (state === "normal") {
      // Ищем solution:
      if (ch === "s" && content.slice(i, i + 9) === "solution:") {
        let j = i + 9;
        while (j < content.length && /\s/.test(content[j])) j++;
        if (content[j] === '"') {
          result += content.slice(i, j + 1);
          i = j;
          state = "inSolutionDq";
          continue;
        } else if (content[j] === "'") {
          result += content.slice(i, j + 1);
          i = j;
          state = "inSolutionSq";
          continue;
        }
      }
      result += ch;
    } else if (state === "inSolutionDq") {
      if (escapeNext) {
        result += ch;
        escapeNext = false;
      } else if (ch === "\\") {
        result += ch;
        escapeNext = true;
      } else if (ch === '"') {
        result += ch;
        state = "normal";
      } else {
        // Проверяем, это HTML-тег?
        if (ch === "<") {
          const isCloseTag = next === "/";
          let nameStart = isCloseTag ? i + 2 : i + 1;
          let nameEnd = nameStart;
          while (nameEnd < content.length && /[a-zA-Z]/.test(content[nameEnd]))
            nameEnd++;
          const tagName = content.slice(nameStart, nameEnd);

          if (tagName && isHtmlTag(tagName)) {
            result += "<";
            count++;
            continue;
          }
        } else if (ch === ">") {
          // Всегда экранируем > внутри solution строки
          result += ">";
          count++;
          continue;
        }
        result += ch;
      }
    } else if (state === "inSolutionSq") {
      if (escapeNext) {
        result += ch;
        escapeNext = false;
      } else if (ch === "\\") {
        result += ch;
        escapeNext = true;
      } else if (ch === "'") {
        result += ch;
        state = "normal";
      } else {
        if (ch === "<") {
          const isCloseTag = next === "/";
          let nameStart = isCloseTag ? i + 2 : i + 1;
          let nameEnd = nameStart;
          while (nameEnd < content.length && /[a-zA-Z]/.test(content[nameEnd]))
            nameEnd++;
          const tagName = content.slice(nameStart, nameEnd);

          if (tagName && isHtmlTag(tagName)) {
            result += "<";
            count++;
            continue;
          }
        } else if (ch === ">") {
          result += ">";
          count++;
          continue;
        }
        result += ch;
      }
    }
  }

  if (count > 0) {
    fs.writeFileSync(filePath, result, "utf8");
    console.log(`✅ ${file} — ${count} замен`);
  } else {
    console.log(`⚠️ ${file} — нет изменений`);
  }
}

// ================================================================
// ui.js: убираем escapeHtmlPreserveSpaces(task.solution)
// ================================================================

const uiPath = path.join(__dirname, "ui.js");
let uiContent = fs.readFileSync(uiPath, "utf8");

if (uiContent.includes("escapeHtmlPreserveSpaces(task.solution)")) {
  uiContent = uiContent.replace(
    /escapeHtmlPreserveSpaces\(task\.solution\)/g,
    "task.solution",
  );
  fs.writeFileSync(uiPath, uiContent, "utf8");
  console.log(`✅ ui.js — обновлён (убрано двойное экранирование решений)`);
} else {
  console.log(`⚠️ ui.js — уже обработан`);
}

console.log("\n✅ Готово!");
