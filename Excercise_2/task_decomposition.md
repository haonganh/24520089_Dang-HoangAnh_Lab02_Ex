# Exercise 2 — Reactive State Machine and Delegation Hub

## Objective

Build a reactive Task Manager using a custom useState closure engine,
automatic rendering, and root event delegation.

Follow the lecturer's four required atomic commits in order.
Target WCAG 2.2 Level AA for the rendered application.
Conformance remains unverified until all applicable criteria are assessed.

## Architecture

User action -> delegated root event -> state setter
-> state update -> reset hook cursor -> render application -> updated DOM.

The root container persists across renders.
Only its rendered children are replaced.

## Implementation decisions

- Use plain JavaScript ES modules.
- Reuse Exercise 1's createElement and text-node rendering.
- Express the screenshot's JSX example through createElement.
- Keep hook state between renders in a closure-owned stateStore.
- Reset the hook cursor before every component render.
- Each setter captures its own state-slot index.
- Support direct values and functional state updates.
- Call hooks in the same order on every render.
- Use one root click listener and a WeakMap of element handlers.
- Do not attach click listeners directly to rendered buttons.
- Use task objects with stable IDs, text, and completion status.
- Provide All, Active, and Completed filters.
- Task completion is a project design choice supporting useful filters.

## T1 — Planning

- [ ] Create task_decomposition.md and Ai_rule.md.
- [ ] Identify the four mandatory commit messages.
- [ ] Preserve Exercise 1 and prepare separate Exercise 2 files.

## T2 — State storage and cursor

- [ ] Create reactive-engine.js.
- [ ] Create persistent stateStore and hook cursor inside a closure.
- [ ] Implement resetCursor without clearing stored state.
- [ ] Verify cursor reset and state retention.
- [ ] Commit: feat(state): implement stateStore and resetCursor engine

## T3 — Reactive useState dispatcher

- [ ] Implement useState(initialValue).
- [ ] Initialize a slot only when it does not already exist.
- [ ] Capture the slot index in each setter.
- [ ] Support direct values and functional updater callbacks.
- [ ] Implement renderApp(Component, root).
- [ ] Reset the cursor before invoking the component.
- [ ] Re-render after state updates.
- [ ] Preserve independent state slots across renders.
- [ ] Commit: feat(state): implement reactive useState dispatcher

## T4 — Root event delegation

- [ ] Register one click listener on the persistent root.
- [ ] Store rendered element handlers in a WeakMap.
- [ ] Remove per-element addEventListener calls from the renderer.
- [ ] Route bubbled clicks to the nearest mapped actionable ancestor.
- [ ] Support clicks on nested content inside a button.
- [ ] Avoid duplicate root listeners during repeated renders.
- [ ] Verify rendered buttons have no direct click listeners.
- [ ] Commit: feat(events): attach root event delegation listener

## T5 — Reactive Task Manager

- [ ] Initialize tasks named Review PR and Verify AST.
- [ ] Display a reactive total task count.
- [ ] Add tasks through a native button.
- [ ] Toggle task completion.
- [ ] Provide All, Active, and Completed filter buttons.
- [ ] Derive the visible list from task state and selected filter.
- [ ] Keep updates immutable.
- [ ] Use semantic main, headings, sections, lists, and buttons.
- [ ] Preserve keyboard focus when replacing DOM children.
- [ ] Announce task changes through an appropriate status region.
- [ ] Verify accessibility and functionality before committing.
- [ ] Commit: feat(ui): assemble reactive todo application

## T6 — Verification

- [ ] Adding a task updates the list and count immediately.
- [ ] Completion and filtering work together.
- [ ] Updating one state slot does not overwrite another.
- [ ] Task state survives repeated re-renders.
- [ ] New buttons work through the same root listener.
- [ ] No direct button click listeners remain.
- [ ] Nested button content activates the intended handler.
- [ ] Text is rendered safely without HTML parsing.
- [ ] Keyboard focus remains usable after every action.
- [ ] Keyboard, names, states, contrast, target size, zoom, reflow,
      and status announcements are checked.
- [ ] Review all other applicable WCAG 2.2 A and AA criteria.

## T7 — Submission

- [ ] Record actual verification results and commit hashes.
- [ ] Verify all four mandatory commits exist in order.
- [ ] Push changes to the confirmed GitHub repository.
- [ ] Confirm the working tree is clean.

## Verification record

| Check | Status | Evidence |
| --- | --- | --- |
| State retention and cursor reset | Pending | — |
| Independent hooks and setter behavior | Pending | — |
| Automatic re-rendering | Pending | — |
| Root delegation without direct button listeners | Pending | — |
| Task creation, completion, and filters | Pending | — |
| Focus preservation and status announcements | Pending | — |
| Applicable WCAG A and AA review | Pending | — |
| Four required commits and GitHub push | Pending | — |

Reference: https://www.w3.org/TR/WCAG22/