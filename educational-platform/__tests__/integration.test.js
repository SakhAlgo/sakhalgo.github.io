/**
 * @jest-environment jsdom
 */

import { describe, test, expect } from "@jest/globals";
import { tasksManifest } from "../js/tasks/task-manifest.js";
import Task041Validator from "../js/tasks/task-041.js";
import Task042Validator from "../js/tasks/task-042.js";

describe("Integration: manifest and validators", () => {
  test("task 041 и 042 существуют в манифесте с валидаторами", () => {
    const task041 = tasksManifest.find((task) => task.id === "041");
    const task042 = tasksManifest.find((task) => task.id === "042");

    expect(task041).toBeDefined();
    expect(task041.validator).toBe("task-041.js");
    expect(task042).toBeDefined();
    expect(task042.validator).toBe("task-042.js");
  });

  test("Task041Validator проходит для правильного CSS", async () => {
    const validator = new Task041Validator();
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

  test("Task042Validator проходит для правильного CSS", async () => {
    const validator = new Task042Validator();
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
});
