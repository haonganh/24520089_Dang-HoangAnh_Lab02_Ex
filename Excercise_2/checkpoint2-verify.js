import { createHookEngine } from "./reactive-engine.js";

const engine = createHookEngine();

const first = engine.readNextSlot(["Review PR", "Verify AST"]);
if (first.index !== 0 || engine.cursor !== 1) {
  throw new Error("First state slot test failed");
}

engine.resetCursor();

const firstAfterReset = engine.readNextSlot(["This value should be ignored"]);
if (
  firstAfterReset.index !== 0 ||
  firstAfterReset.value[0] !== "Review PR" ||
  engine.slotCount !== 1
) {
  throw new Error("State was not retained after cursor reset");
}

console.log("T2 PASS: cursor resets and the state slot is retained.");