/**
 * Тесты для task-manifest.js - проверка структуры курсов, модулей и задач
 */
import { describe, test, expect } from "@jest/globals";
import {
  coursesManifest,
  tasksManifest,
  DIFFICULTY_MAP,
} from "../js/tasks/task-manifest.js";

describe("DIFFICULTY_MAP", () => {
  test("должен содержать уровни easy, medium, hard", () => {
    expect(DIFFICULTY_MAP.easy).toBeDefined();
    expect(DIFFICULTY_MAP.medium).toBeDefined();
    expect(DIFFICULTY_MAP.hard).toBeDefined();
  });

  test("каждый уровень должен иметь label, color и stars", () => {
    Object.values(DIFFICULTY_MAP).forEach((level) => {
      expect(level.label).toBeDefined();
      expect(level.color).toBeDefined();
      expect(level.stars).toBeDefined();
    });
  });
});

describe("coursesManifest", () => {
  test("должен содержать 5 курсов", () => {
    expect(coursesManifest.length).toBe(5);
  });

  test("первый курс - Основы HTML & CSS Тест I", () => {
    const course = coursesManifest.find((c) => c.id === "html-css-basics");
    expect(course).toBeDefined();
    expect(course.modules.length).toBe(2);
  });

  test("второй курс - Основы JavaScript", () => {
    const course = coursesManifest.find((c) => c.id === "js-basics");
    expect(course).toBeDefined();
    expect(course.title).toBe("Основы JavaScript");
    expect(course.modules.length).toBe(4);
  });

  test("третий курс - Основы HTML & CSS Тест &#8545;", () => {
    const course = coursesManifest.find((c) => c.id === "html-css-basics-2");
    expect(course).toBeDefined();
    expect(course.title).toBe("Основы HTML & CSS Тест &#8545;");
    expect(course.modules.length).toBe(2);
  });

  test("четвёртый курс - Основы HTML & CSS Тест &#8546;", () => {
    const course = coursesManifest.find((c) => c.id === "html-css-basics-3");
    expect(course).toBeDefined();
    expect(course.title).toBe("Основы HTML & CSS Тест &#8546;");
    expect(course.modules.length).toBe(2);
  });

  test("модули первого курса должны содержать html-tags и css-styling", () => {
    const course = coursesManifest.find((c) => c.id === "html-css-basics");
    const moduleIds = course.modules.map((m) => m.id);
    expect(moduleIds).toContain("html-tags");
    expect(moduleIds).toContain("css-styling");
  });

  test("модули второго курса должны содержать js-variables, js-functions, js-conditionals и js-loops", () => {
    const course = coursesManifest.find((c) => c.id === "js-basics");
    const moduleIds = course.modules.map((m) => m.id);
    expect(moduleIds).toContain("js-variables");
    expect(moduleIds).toContain("js-functions");
    expect(moduleIds).toContain("js-conditionals");
    expect(moduleIds).toContain("js-loops");
  });

  test("модули третьего курса должны содержать html-tags и css-styling", () => {
    const course = coursesManifest.find((c) => c.id === "html-css-basics-2");
    const moduleIds = course.modules.map((m) => m.id);
    expect(moduleIds).toContain("html-tags");
    expect(moduleIds).toContain("css-styling");
  });

  test("модули четвёртого курса должны содержать html-semantic и css-advanced", () => {
    const course = coursesManifest.find((c) => c.id === "html-css-basics-3");
    const moduleIds = course.modules.map((m) => m.id);
    expect(moduleIds).toContain("html-semantic");
    expect(moduleIds).toContain("css-advanced");
  });

  test("каждый модуль должен иметь массив tasks", () => {
    coursesManifest.forEach((course) => {
      course.modules.forEach((module) => {
        expect(Array.isArray(module.tasks)).toBe(true);
        expect(module.tasks.length).toBeGreaterThan(0);
      });
    });
  });
});

describe("tasksManifest", () => {
  test("должен содержать 135 задач", () => {
    expect(tasksManifest.length).toBe(135);
  });

  test("задачи 046-049 относятся к курсу js-basics и модулю js-conditionals", () => {
    for (let i = 46; i <= 49; i++) {
      const taskId = String(i).padStart(3, "0");
      const task = tasksManifest.find((t) => t.id === taskId);
      expect(task).toBeDefined();
      expect(task.courseId).toBe("js-basics");
      expect(task.moduleId).toBe("js-conditionals");
    }
  });

  test("задачи 095-100 относятся к курсу js-basics и модулю js-conditionals", () => {
    for (let i = 95; i <= 100; i++) {
      const taskId = String(i).padStart(3, "0");
      const task = tasksManifest.find((t) => t.id === taskId);
      expect(task).toBeDefined();
      expect(task.courseId).toBe("js-basics");
      expect(task.moduleId).toBe("js-conditionals");
    }
  });

  test("задачи 001-005 относятся к курсу html-css-basics и модулю html-tags", () => {
    for (let i = 1; i <= 5; i++) {
      const taskId = String(i).padStart(3, "0");
      const task = tasksManifest.find((t) => t.id === taskId);
      expect(task).toBeDefined();
      expect(task.courseId).toBe("html-css-basics");
      expect(task.moduleId).toBe("html-tags");
    }
  });

  test("задачи 006-010 относятся к курсу html-css-basics и модулю css-styling", () => {
    for (let i = 6; i <= 10; i++) {
      const taskId = String(i).padStart(3, "0");
      const task = tasksManifest.find((t) => t.id === taskId);
      expect(task).toBeDefined();
      expect(task.courseId).toBe("html-css-basics");
      expect(task.moduleId).toBe("css-styling");
    }
  });

  test("задачи 011-015 относятся к курсу js-basics и модулю js-variables", () => {
    for (let i = 11; i <= 15; i++) {
      const taskId = String(i).padStart(3, "0");
      const task = tasksManifest.find((t) => t.id === taskId);
      expect(task).toBeDefined();
      expect(task.courseId).toBe("js-basics");
      expect(task.moduleId).toBe("js-variables");
    }
  });

  test("задачи 016-020 относятся к курсу js-basics и модулю js-functions", () => {
    for (let i = 16; i <= 20; i++) {
      const taskId = String(i).padStart(3, "0");
      const task = tasksManifest.find((t) => t.id === taskId);
      expect(task).toBeDefined();
      expect(task.courseId).toBe("js-basics");
      expect(task.moduleId).toBe("js-functions");
    }
  });


  test("задачи 056-059 относятся  курсу html-css-basics-2 и модулю html-tags", () => {
    for (let i = 56; i <= 59; i++) {
      const taskId = String(i).padStart(3, "0");
      const task = tasksManifest.find((t) => t.id === taskId);
      expect(task).toBeDefined();
      expect(task.courseId).toBe("html-css-basics-2");
      expect(task.moduleId).toBe("html-tags");
    }
  });

  test("задачи 060-069 относятся к курсу html-css-basics-2 и модулю css-styling", () => {
    for (let i = 60; i <= 69; i++) {
      const taskId = String(i).padStart(3, "0");
      const task = tasksManifest.find((t) => t.id === taskId);
      expect(task).toBeDefined();
      expect(task.courseId).toBe("html-css-basics-2");
      expect(task.moduleId).toBe("css-styling");
    }
  });

  test("каждая задача должна иметь обязательные поля", () => {
    tasksManifest.forEach((task) => {
      expect(task.id).toBeDefined();
      expect(task.topic).toBeDefined();
      expect(task.courseId).toBeDefined();
      expect(task.moduleId).toBeDefined();
      expect(task.title).toBeDefined();
      expect(task.difficulty).toBeDefined();
      expect(task.points).toBeDefined();
      expect(task.validator).toBeDefined();
      expect(task.taskPath).toBeDefined();
    });
  });

  test("задачи имеют корректные уровни сложности", () => {
    tasksManifest.forEach((task) => {
      const taskNum = parseInt(task.id, 10);
      if (taskNum >= 95 && taskNum <= 99) {
        expect(task.difficulty).toBe("medium");
      } else if (taskNum === 100) {
        expect(task.difficulty).toBe("medium");
      } else if (taskNum >= 70 && taskNum <= 73) {
        expect(task.difficulty).toBe("easy");
      } else if (taskNum >= 74 && taskNum <= 78) {
        expect(task.difficulty).toBe("medium");
      } else if (taskNum === 79) {
        expect(task.difficulty).toBe("hard");
      } else if (taskNum >= 80 && taskNum <= 94) {
        expect(task.difficulty).toBe("medium");
      } else if (taskNum >= 101 && taskNum <= 135) {
        const mediumTasks = [110, 114, 115, 119, 120, 124, 125, 129, 130, 134, 135];
        if (mediumTasks.includes(taskNum)) {
          expect(task.difficulty).toBe("medium");
        } else {
          expect(task.difficulty).toBe("easy");
        }
      } else {
        expect(task.difficulty).toBe("easy");
      }
    });
  });

  test("validator файл существует для каждой задачи", () => {
    tasksManifest.forEach((task) => {
      expect(task.validator).toMatch(/^task-\d{3}\.js$/);
    });
  });
});

describe("Согласованность курсов, модулей и задач", () => {
  test("все moduleId в задачах должны существовать в modules", () => {
    const allModuleIds = new Set();
    coursesManifest.forEach((course) => {
      course.modules.forEach((module) => {
        allModuleIds.add(module.id);
      });
    });

    tasksManifest.forEach((task) => {
      expect(allModuleIds.has(task.moduleId)).toBe(true);
    });
  });

  test("все courseId в задачах должны существовать в courses", () => {
    const allCourseIds = new Set(coursesManifest.map((c) => c.id));

    tasksManifest.forEach((task) => {
      expect(allCourseIds.has(task.courseId)).toBe(true);
    });
  });

  test("задачи в модулях должны соответствовать задачам в tasksManifest", () => {
    coursesManifest.forEach((course) => {
      course.modules.forEach((module) => {
        module.tasks.forEach((taskId) => {
          const fullTaskId = taskId.padStart(3, "0");
          const task = tasksManifest.find((t) => t.id === fullTaskId);
          expect(task).toBeDefined();
          expect(task.moduleId).toBe(module.id);
        });
      });
    });
  });
});
