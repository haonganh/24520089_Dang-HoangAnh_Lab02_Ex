import {
  createHookEngine,
  useState,
  renderApp,
} from "./reactive-engine.js";
import { createElement } from "./mini-react.js";

// T2: resetting the cursor retains the first slot.
const engine = createHookEngine();
engine.readNextSlot(["Review PR", "Verify AST"]);
engine.resetCursor();

const retained = engine.readNextSlot(["Wrong replacement"]);
if (
  retained.index !== 0 ||
  retained.value[0] !== "Review PR" ||
  engine.slotCount !== 1
) {
  throw new Error("T2 state retention failed");
}

console.log("T2 PASS: state slot retained.");

// T3: two independent hooks and automatic rendering.
const root = document.getElementById("app");
if (!(root instanceof HTMLElement)) {
  throw new Error("Missing #app");
}

let setTasks;
let setFilter;

function TaskApp() {
  const [tasks, updateTasks] = useState(["Review PR", "Verify AST"]);
  const [filter, updateFilter] = useState("ALL");

  setTasks = updateTasks;
  setFilter = updateFilter;

  return createElement(
    "main",
    { className: "app-container" },
    createElement("h2", null, `Tasks: ${tasks.length}`),
    createElement("p", null, `Filter: ${filter}`),
    createElement(
  "button",
  {
    type: "button",
    onClick: () => updateTasks(previous => [
      ...previous,
      `Task ${previous.length + 1}`,
    ]),
  },
  createElement("span", null, "Add task")
)
  );
  
}

renderApp(TaskApp, root);
setTasks(previous => [...previous, "New task"]);

if (
  !root.textContent.includes("Tasks: 3") ||
  !root.textContent.includes("Filter: ALL")
) {
  throw new Error("Task update or independent state failed");
}

setFilter("ACTIVE");

if (
  !root.textContent.includes("Tasks: 3") ||
  !root.textContent.includes("Filter: ACTIVE") ||
  root.querySelectorAll("main").length !== 1
) {
  throw new Error("Filter update or re-render failed");
}

console.log("T3 PASS: independent hooks update and re-render.");

console.log("T3 PASS: independent hooks update and re-render.");

root.querySelector("button span").click();
if (!root.textContent.includes("Tasks: 4")) {
  throw new Error("Delegated nested click failed");
}

root.querySelector("button span").click();
if (!root.textContent.includes("Tasks: 5")) {
  throw new Error("Delegation failed after re-render");
}

console.log("T4 PASS: nested clicks work after re-render.");