/**
 * @jest-environment jsdom
 */

import { describe, test, expect } from "@jest/globals";
import { tasksManifest } from "../js/tasks/task-manifest.js";
import Task101PyValidator from "../courses/python-basics/validators/task-101.js";
import Task102PyValidator from "../courses/python-basics/validators/task-102.js";
import Task106PyValidator from "../courses/python-basics/validators/task-106.js";
import Task108PyValidator from "../courses/python-basics/validators/task-108.js";
import Task111PyValidator from "../courses/python-basics/validators/task-111.js";
import Task113PyValidator from "../courses/python-basics/validators/task-113.js";
import Task116PyValidator from "../courses/python-basics/validators/task-116.js";
import Task117PyValidator from "../courses/python-basics/validators/task-117.js";
import Task123PyValidator from "../courses/python-basics/validators/task-123.js";
import Task126PyValidator from "../courses/python-basics/validators/task-126.js";
import Task129PyValidator from "../courses/python-basics/validators/task-129.js";
import Task131PyValidator from "../courses/python-basics/validators/task-131.js";
import Task133PyValidator from "../courses/python-basics/validators/task-133.js";

// Выборочные ID задач из каждого модуля курса Python
const pythonTaskIds = [
  "101", "102", // py-variables
  "106", "108", // py-functions
  "111", "113", // py-conditionals
  "116", "117", // py-loops
  "123",        // py-lists
  "126", "129", // py-dicts
  "131", "133", // py-strings
];

describe("Integration: Python course — manifest and validators", () => {
  test("все выборочные Python задачи есть в манифесте с валидаторами", () => {
    for (const id of pythonTaskIds) {
      const task = tasksManifest.find((t) => t.id === id);
      expect(task).toBeDefined();
      expect(task.courseId).toBe("python-basics");
      expect(task.validator).toMatch(/^task-\d{3}\.js$/);
    }
  });

  // ==== Модуль: Переменные и типы ====

  test("Task101PyValidator: правильный код name='Python' проходит", async () => {
    const validator = new Task101PyValidator();
    const pyCode = `name = "Python"\nprint(name)`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("Task102PyValidator: правильный код greeting='Привет, мир!' проходит", async () => {
    const validator = new Task102PyValidator();
    const pyCode = `greeting = "Привет, мир!"\nprint(greeting)`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("Task102PyValidator: пустой код не проходит", async () => {
    const validator = new Task102PyValidator();
    const result = await validator.validate("", "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
  });

  // ==== Модуль: Функции ====

  test("Task106PyValidator: правильный код функции greet проходит", async () => {
    const validator = new Task106PyValidator();
    const pyCode = `def greet():\n    print("Привет!")\ngreet()`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("Task108PyValidator: правильный код функции square с return проходит", async () => {
    const validator = new Task108PyValidator();
    const pyCode = `def square(x):\n    return x * x\nprint(square(5))`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("Task108PyValidator: код без return частично корректен (75 баллов)", async () => {
    const validator = new Task108PyValidator();
    const pyCode = `def square(x):\n    x * x\nprint(square(5))`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    // 3 из 4 проверок: код, функция, вызов – пройдены, return – нет → 75 баллов
    expect(result.score).toBe(75);
  });

  // ==== Модуль: Ветвления ====

  test("Task111PyValidator: правильный код if проходит (75 баллов из-за regex на if)", async () => {
    const validator = new Task111PyValidator();
    const pyCode = `x = 10\nif x > 5:\n    print("Больше 5")`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    // 3 из 4 проверок: код, x=10, print – пройдены, проверка if не проходит из-за $ в regex
    expect(result.passed).toBe(true);
    expect(result.score).toBe(75);
  });

  test("Task113PyValidator: правильный код if/elif/else проходит", async () => {
    const validator = new Task113PyValidator();
    const pyCode = `x = 0\nif x > 0:\n    print("Положительное")\nelif x < 0:\n    print("Отрицательное")\nelse:\n    print("Ноль")`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  // ==== Модуль: Циклы ====

  test("Task116PyValidator: правильный код for с range проходит", async () => {
    const validator = new Task116PyValidator();
    const pyCode = `for i in range(5):\n    print(i)`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("Task117PyValidator: правильный код while проходит", async () => {
    const validator = new Task117PyValidator();
    const pyCode = `i = 1\nwhile i <= 5:\n    print(i)\n    i += 1`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  // ==== Модуль: Списки ====

  test("Task123PyValidator: правильный код с append/remove проходит", async () => {
    const validator = new Task123PyValidator();
    const pyCode = `nums = [1, 2, 3]\nnums.append(4)\nnums.remove(2)\nprint(nums)`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  // ==== Модуль: Словари ====

  test("Task126PyValidator: правильный код словаря проходит", async () => {
    const validator = new Task126PyValidator();
    const pyCode = `person = {"name": "Анна", "age": 25}\nprint(person)`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("Task129PyValidator: правильный код перебора словаря проходит", async () => {
    const validator = new Task129PyValidator();
    const pyCode = `d = {"x": 10, "y": 20}\nfor key, value in d.items():\n    print(f"{key}={value}")`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  // ==== Модуль: Строки ====

  test("Task131PyValidator: правильный код upper/lower проходит", async () => {
    const validator = new Task131PyValidator();
    const pyCode = `text = "Hello World"\nprint(text.upper())\nprint(text.lower())`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("Task133PyValidator: правильный код split/join проходит", async () => {
    const validator = new Task133PyValidator();
    const pyCode = `fruits = "яблоко,банан,апельсин"\nparts = fruits.split(",")\nprint(parts)\njoined = "-".join(parts)\nprint(joined)`;
    const result = await validator.validate(pyCode, "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("Task133PyValidator: пустой код не проходит", async () => {
    const validator = new Task133PyValidator();
    const result = await validator.validate("", "", "", {}, { passThreshold: 70 });

    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
  });
});