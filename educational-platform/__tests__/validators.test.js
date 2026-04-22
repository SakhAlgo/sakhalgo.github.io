/**
 * Тесты для валидаторов задач - проверка корректности работы валидаторов
 */
import { describe, test, expect } from "@jest/globals";
import Task001Validator from "../js/tasks/task-001.js";
import Task011Validator from "../js/tasks/task-011.js";
import Task016Validator from "../js/tasks/task-016.js";
import Task041Validator from "../js/tasks/task-041.js";
import Task042Validator from "../js/tasks/task-042.js";

describe("Task001Validator (Заголовок страницы)", () => {
  const validator = new Task001Validator();

  test("должен пройти с правильным HTML", async () => {
    const html = "<h1>Привет, мир!</h1>";
    const result = await validator.validate(
      html,
      "",
      "",
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("должен вернуть 50 баллов если есть h1 но неправильный текст", async () => {
    const html = "<h1>Другой текст</h1>";
    const result = await validator.validate(
      html,
      "",
      "",
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(false);
    expect(result.score).toBe(50);
  });

  test("должен вернуть 0 баллов если нет h1", async () => {
    const html = "<p>Привет, мир!</p>";
    const result = await validator.validate(
      html,
      "",
      "",
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
  });

  test("должен проверить наличие checks массива", async () => {
    const html = "<h1>Привет, мир!</h1>";
    const result = await validator.validate(html, "", "", {}, {});

    expect(Array.isArray(result.checks)).toBe(true);
    expect(result.checks.length).toBeGreaterThan(0);
  });
});

describe("Task011Validator (Объявление переменной)", () => {
  const validator = new Task011Validator();

  test("должен пройти с правильным JS (let name)", async () => {
    const js = 'let name = "John";';
    const result = await validator.validate(
      "",
      "",
      js,
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("должен вернуть 50 баллов если только let без name", async () => {
    const js = 'let x = "John";';
    const result = await validator.validate(
      "",
      "",
      js,
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(false);
    expect(result.score).toBe(50);
  });

  test("должен вернуть 50 баллов если есть name но без let", async () => {
    const js = 'name = "John";';
    const result = await validator.validate(
      "",
      "",
      js,
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(false);
    expect(result.score).toBe(50);
  });
});

describe("Task016Validator (Простая функция)", () => {
  const validator = new Task016Validator();

  test("должен пройти с правильной функцией sayHello", async () => {
    const js = 'function sayHello() { return "Hello"; }';
    const result = await validator.validate(
      "",
      "",
      js,
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("должен вернуть 50 баллов если есть function но не sayHello", async () => {
    const js = 'function greet() { return "Hello"; }';
    const result = await validator.validate(
      "",
      "",
      js,
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(false);
    expect(result.score).toBe(50);
  });

  test("должен провалиться без функции", async () => {
    const js = "const x = 5;";
    const result = await validator.validate(
      "",
      "",
      js,
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
  });
});

describe("Task041Validator (Выравнивание текста влево)", () => {
  const validator = new Task041Validator();

  test("должен пройти если text-align установлен в left", async () => {
    const css = ".left { text-align: left; }";
    const result = await validator.validate(
      "",
      css,
      "",
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("должен вернуть 50 баллов если text-align есть, но не left", async () => {
    const css = ".left { text-align: center; }";
    const result = await validator.validate(
      "",
      css,
      "",
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(false);
    expect(result.score).toBe(50);
  });

  test("должен провалиться без text-align", async () => {
    const css = ".left { color: red; }";
    const result = await validator.validate(
      "",
      css,
      "",
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
  });
});

describe("Task042Validator (Ширина элемента)", () => {
  const validator = new Task042Validator();

  test("должен пройти если width установлен в 200px", async () => {
    const css = ".box { width: 200px; }";
    const result = await validator.validate(
      "",
      css,
      "",
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(true);
    expect(result.score).toBe(100);
  });

  test("должен вернуть 50 баллов если width есть, но не 200px", async () => {
    const css = ".box { width: 100px; }";
    const result = await validator.validate(
      "",
      css,
      "",
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(false);
    expect(result.score).toBe(50);
  });

  test("должен провалиться без width", async () => {
    const css = ".box { height: 50px; }";
    const result = await validator.validate(
      "",
      css,
      "",
      {},
      { passThreshold: 70 },
    );

    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
  });
});
