/**
 * @jest-environment jsdom
 */

import { describe, test, expect, beforeEach, afterEach } from "@jest/globals";
import { StorageManager } from "../js/core/storage.js";

const sampleProgress = {
  "001": { completed: true, score: 80 },
  "002": { completed: false, score: 0 },
};

describe("StorageManager", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("save и load прогресса работают корректно", () => {
    expect(StorageManager.save(sampleProgress)).toBe(true);
    const loaded = StorageManager.load();
    expect(loaded).toEqual(sampleProgress);
  });

  test("saveCode и loadCode сохраняют и читают пользовательский код", () => {
    StorageManager.saveCode(
      "041",
      "<p>test</p>",
      ".left { text-align: left; }",
      "",
    );
    const loaded = StorageManager.loadCode("041");
    expect(loaded).toMatchObject({
      html: "<p>test</p>",
      css: ".left { text-align: left; }",
      js: "",
    });
    expect(loaded.savedAt).toBeDefined();
  });

  test("markCompleted сохраняет прогресс и код задачи", () => {
    StorageManager.markCompleted("041", 100, {
      html: "<p>OK</p>",
      css: ".left { text-align: left; }",
      js: "",
    });
    const taskProgress = StorageManager.getTaskProgress("041");
    expect(taskProgress).toBeDefined();
    expect(taskProgress.completed).toBe(true);
    expect(taskProgress.score).toBe(100);
  });

  test("getOverallStats возвращает правильные метрики", () => {
    StorageManager.save({
      "041": { completed: true, score: 100 },
      "042": { completed: false, score: 0 },
    });
    const stats = StorageManager.getOverallStats(2);
    expect(stats).toEqual({
      completed: 1,
      total: 2,
      percent: 50,
      avgScore: 100,
    });
  });

  test("reset очищает localStorage", () => {
    StorageManager.save(sampleProgress);
    StorageManager.saveCode(
      "041",
      "<p>test</p>",
      ".left { text-align: left; }",
      "",
    );
    StorageManager.reset();
    expect(localStorage.getItem(StorageManager.STORAGE_KEY)).toBeNull();
    expect(localStorage.getItem(StorageManager.CODE_KEY)).toBeNull();
    expect(localStorage.getItem(StorageManager.BACKUP_KEY)).toBeNull();
  });
});
