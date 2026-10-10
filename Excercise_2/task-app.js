import { createElement } from "./mini-react.js";
import { useState, renderApp } from "./reactive-engine.js";

const root = document.getElementById("app");
const status = document.getElementById("status");
let nextId = 3;

if (!(root instanceof HTMLElement) || !(status instanceof HTMLElement)) {
  throw new Error("Missing #app or #status");
}

function announce(message) {
  status.textContent = message;
}

function TaskApp() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review PR", done: false },
    { id: 2, text: "Verify AST", done: false },
  ]);
  const [filter, setFilter] = useState("ALL");

  const visibleTasks = tasks.filter(task =>
    filter === "ALL" ||
    (filter === "ACTIVE" && !task.done) ||
    (filter === "COMPLETED" && task.done)
  );

  function addTask() {
    const id = nextId++;
    setTasks(previous => [
      ...previous,
      { id, text: `Task ${id}`, done: false },
    ]);
    announce(`Task ${id} added`);
  }

  function toggleTask(task) {
    setTasks(previous => previous.map(item =>
      item.id === task.id ? { ...item, done: !item.done } : item
    ));
    announce(`${task.text} marked ${task.done ? "active" : "completed"}`);
  }

  function selectFilter(value) {
    setFilter(value);
    announce(`Showing ${value.toLowerCase()} tasks`);
  }

  return createElement(
    "main",
    { className: "app-container" },
    createElement(
      "header",
      null,
      createElement("h1", null, "Task Manager"),
      createElement("p", null, `Tasks: ${tasks.length}`)
    ),
    createElement(
      "button",
      { type: "button", "data-focus-key": "add-task", onClick: addTask },
      "Add task"
    ),
    createElement(
      "section",
      { "aria-labelledby": "filters-heading" },
      createElement("h2", { id: "filters-heading" }, "Filters"),
      ...["ALL", "ACTIVE", "COMPLETED"].map(value =>
        createElement(
          "button",
          {
            type: "button",
            "aria-pressed": filter === value,
            "data-focus-key": `filter-${value}`,
            onClick: () => selectFilter(value),
          },
          value
        )
      )
    ),
    createElement(
      "section",
      { "aria-labelledby": "tasks-heading" },
      createElement("h2", { id: "tasks-heading" }, "Task list"),
      createElement(
        "ul",
        null,
        ...visibleTasks.map(task =>
          createElement(
            "li",
            null,
            createElement(
              "button",
              {
                type: "button",
                "aria-pressed": task.done,
                "data-focus-key": `task-${task.id}`,
                onClick: () => toggleTask(task),
              },
              `${task.done ? "Completed" : "Open"}: ${task.text}`
            )
          )
        )
      )
    )
  );
}

renderApp(TaskApp, root);