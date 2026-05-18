import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, "theme-1.js");
let content = fs.readFileSync(file, "utf8");

console.log("=== ПРОВЕРКА СОДЕРЖИМОГО ===");
// Проверяем наличие <pre> в файле
const preMatches = content.match(/<pre>/g);
console.log("Найдено <pre>:", preMatches ? preMatches.length : 0);

const solMatches = content.match(/solution:\s*"/g);
console.log('Найдено solution:":', solMatches ? solMatches.length : 0);

// Проверяем наличие HTML-тегов в solutions
const solLines = content.split("\n").filter((l) => l.includes("solution:"));
solLines.forEach((l, i) => {
  const angleMatches = l.match(/<[a-zA-Z\/]/g);
  if (angleMatches) {
    console.log(
      `  solution ${i}: найдено ${angleMatches.length} тегов: ${angleMatches.slice(0, 5).join(", ")}...`,
    );
    console.log(`  контекст: ${l.trim().slice(0, 80)}`);
  }
});

// Проверяем наличие HTML-тегов внутри <pre>
const preBlocks = content.match(/<pre>([\s\S]*?)<\/pre>/g);
if (preBlocks) {
  console.log(`\n=== ПРЕ-БЛОКИ (${preBlocks.length}) ===`);
  preBlocks.forEach((block, i) => {
    const inner = block.replace("<pre>", "").replace("</pre>", "");
    if (inner.includes("<") || inner.includes(">")) {
      console.log(`  pre[${i}]: содержит угловые скобки`);
      console.log(`    ${inner.slice(0, 60)}...`);
    }
  });
}

console.log("\n=== ПРОВЕРКА С РЕГЕКСОМ ===");
// Самая простая проверка
const result = content.replace(
  /(<pre>)([\s\S]*?)(<\/pre>)/g,
  (m, open, inner, close) => {
    if (inner.includes("<") || inner.includes(">")) {
      const e = inner.replace(/</g, "<").replace(/>/g, ">");
      console.log(`  ЗАМЕНА: ${inner.slice(0, 30)}...`);
      return open + e + close;
    }
    return m;
  },
);

console.log("\nИзменён:", result !== content);
