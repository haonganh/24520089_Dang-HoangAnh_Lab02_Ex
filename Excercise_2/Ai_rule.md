# AI Rules — Exercise 2

## Workflow

- Follow task_decomposition.md in checkpoint order.
- Explain each change briefly and provide a verification step.
- Preserve Exercise 1's files.
- Distinguish lecturer requirements from project design choices.
- Never report a test, commit, or push as successful without evidence.
- Keep each required implementation checkpoint in its own commit.

## State engine

- Implement custom useState without React or a state library.
- Keep stateStore persistent inside a closure.
- Reset only the cursor before each component render.
- Capture a stable slot index in each setter.
- Do not use truthiness to decide whether a state slot exists.
- Support direct values and functional updater callbacks.
- Keep hook calls unconditional and in a stable order.
- Update arrays and task objects immutably.
- Do not call setters while rendering a component.
- Maintain one-way flow from events to state to rendered output.

## Event delegation

- Attach one click listener to the persistent application root.
- Never attach click listeners directly to rendered buttons.
- Store element callbacks in a WeakMap.
- Resolve clicks from nested button content to the actionable ancestor.
- Do not register another root listener on every render.
- Verify listeners on actual nodes in DevTools.
- Do not mistake inherited root listeners for direct button listeners.

## Rendering and security

- Reuse the VNode factories and safe text-node renderer.
- Translate JSX examples into createElement calls for this ES-module setup.
- Render user-provided task text with document.createTextNode.
- Do not introduce innerHTML, executable event attributes, or eval.
- Preserve supported aria-*, data-*, id, and class attributes.
- Treat element types and other props as trusted application code.

## Accessibility

Target all applicable WCAG 2.2 Level A and AA criteria.

- Use semantic landmarks, descriptive headings, lists, and native buttons.
- Provide accessible names and expose relevant control states.
- Use aria-pressed for filter and completion toggle buttons where appropriate.
- Support keyboard activation and logical focus order.
- Preserve or deliberately restore focus after DOM replacement.
- Keep focus visible and prevent it from being entirely obscured.
- Use an appropriate status region for task updates.
- Keep the live region stable across renders where practical.
- Do not communicate completion or selected filters through color alone.
- Verify contrast, pointer target size, zoom, reflow, and text spacing.
- Set the document language and a descriptive page title.
- Review additional criteria whenever new features are introduced.
- Record untested checks as Pending.
- Do not claim full AA conformance from an automated score or a short checklist.

Reference: https://www.w3.org/TR/WCAG22/

## Mandatory commit messages

1. feat(state): implement stateStore and resetCursor engine
2. feat(state): implement reactive useState dispatcher
3. feat(events): attach root event delegation listener
4. feat(ui): assemble reactive todo application