# AI Rules — Mini-React VNode and Mounting Engine

## 1. Purpose and priority

These rules govern AI assistance for Exercise 1. Read `task_decomposition.md` before suggesting or changing implementation.

Follow explicit lecturer requirements and supplied starter code first. Treat choices introduced by the plan as project decisions, not quotations from the assignment. Identify ambiguities that would change the required behavior before making a conflicting change.

Target the complete demo page at WCAG 2.2 Level AA, including applicable Level A criteria. Documentation and semantic tags alone cannot establish conformance.

## 2. Learning and workflow

1. Work through T1–T8 in dependency order.
2. When guiding the student, explain one checkpoint, provide its focused change, and describe how to verify it before moving on. If the student explicitly requests continuous work, continue while retaining checkpoint boundaries.
3. Explain what a function receives, what it returns, and why the change is needed.
4. Keep implementation small and readable. Use named functions, clear variables, and comments for non-obvious decisions.
5. Preserve the student's existing work and starter structure. Inspect relevant code before proposing a replacement.
6. Do not implement React itself, hooks, reconciliation, routing, or component lifecycle features unless the assignment is expanded.
7. Do not mark a task complete, invent screenshots, fabricate test output, or claim a commit or push occurred without evidence.
8. When execution is unavailable, label checks as Pending and give precise manual steps.

## 3. Technical implementation rules

- Implement `createTextElement`, `createElement`, and `renderToDOM` using plain JavaScript and native DOM APIs; do not delegate them to React or another rendering library.
- Keep exported names and module imports consistent with the assignment example.
- Agree on the VNode contract before writing factory or renderer logic.
- Apply strict shape checks; avoid accepting any arbitrary object as a VNode.
- Preserve valid nested VNodes and source child order.
- Do not mutate caller-owned props or arrays during normalization.
- Keep text-node creation, element creation, prop application, and recursive rendering understandable and separately reviewable.
- Use native semantic elements for the demo: one main landmark, meaningful headings, and a real button. Use `section` for a meaningful group. Avoid div-soup.
- A neutral mount container may remain outside the rendered tree. It must not be used as a substitute for meaningful elements.
- Preserve supported accessibility attributes rather than dropping them during rendering.
- Treat HTML boolean attributes and ARIA string values separately.
- Use native button behavior. Set `type="button"` when a button could otherwise submit a form.
- Avoid unnecessary ARIA; native semantics are preferable. Do not contradict an element's native role.
- Keep `renderToDOM` responsible for returning a node; mount through the caller as shown in the assignment.

## 4. Security rules

The lecturer's security checkpoint is safe rendering of malicious-looking child strings.

- Create child text through `document.createTextNode`, or an equivalent plain-text DOM operation.
- Do not render child strings through `innerHTML`, `outerHTML`, `insertAdjacentHTML`, HTML parsing, `eval`, or `new Function`.
- Use `addEventListener` for supported function-valued event props; never serialize event code into HTML attributes.
- Reject raw-HTML escape hatches and executable string event props in this exercise.
- Keep element types and props trusted. If untrusted types or props are later introduced, explicitly define allowed tags, attributes, and safe URL protocols before claiming support.
- Verify both exact child strings from the assignment: `<script>alert(1)</script>` and `<img onerror=alert(1)> Safe Text`.
- Verify literal text output, absence of injected elements, and absence of code execution. A lack of alerts alone is insufficient evidence.
- Describe the result as text-child XSS resistance; do not claim the small renderer prevents every form of XSS.

Security checks and strict JavaScript type guards are assignment requirements. They are not substitutes for WCAG accessibility checks.

## 5. Accessibility rules and evidence

Use the normative [WCAG 2.2 specification](https://www.w3.org/TR/WCAG22/) to resolve criterion wording, exceptions, and applicability. The following are practical checks for this demo, not an exhaustive replacement for the standard.

### Structure, language, and names

- Use semantic relationships and a meaningful DOM reading order. Review 1.3.1 and 1.3.2.
- Make headings describe their content and button labels describe their action. Review 2.4.6 and 4.1.2.
- Set a descriptive document title and correct `html` language; identify language changes where applicable. Review 2.4.2, 3.1.1, and 3.1.2.
- Keep the visible button label in its accessible name. Review 2.5.3.
- If meaningful images are introduced, provide useful text alternatives; use empty alternatives for decorative images. Review 1.1.1. The malicious image-like test string is text, not an actual image.

### Interaction and focus

- Verify all demo actions using only the keyboard, with no trapped focus. Review 2.1.1 and 2.1.2.
- Preserve logical focus order. Review 2.4.3.
- Keep keyboard focus visibly indicated and ensure author-created content does not entirely hide the focused control. Review 2.4.7 and 2.4.11. Prefer keeping the entire control visible as a project design choice.
- Do not remove outlines without a suitable replacement.
- Use pointer targets of at least 24 × 24 CSS pixels as the default. If relying on a 2.5.8 exception, document and verify it rather than assuming it applies.
- Activate ordinary buttons on click; do not introduce irreversible activation on pointer-down. Review 2.5.2.
- Do not trigger unexpected navigation or context changes merely from focus or input. Review 3.2.1 and 3.2.2.

### Presentation

- Verify text contrast: at least 4.5:1 for ordinary text, or 3:1 for WCAG-defined large text, subject to the criterion's exceptions. Review 1.4.3.
- Check required visual control indicators and meaningful graphics against 1.4.11, including its 3:1 threshold and exceptions.
- Do not communicate meaning through color alone. Review 1.4.1.
- Test text resizing to 200% and reflow at a 320 CSS-pixel viewport width for this vertically scrolling demo. Check for lost information or functionality and unjustified horizontal scrolling. Review 1.4.4 and 1.4.10.
- Test user text-spacing overrides: line height 1.5 times font size, paragraph spacing 2 times font size, letter spacing 0.12 times font size, and word spacing 0.16 times font size. Content and controls must remain usable. Review 1.4.12.
- Avoid fixed dimensions that clip enlarged content; use wrapping and flexible layout.
- Do not lock the demo to one device orientation without an essential reason. Review 1.3.4.
- Prefer real text to images of text. Review 1.4.5.

### Conditional features and full coverage

The base demo contains headings, text, and a button. Do not add unrelated features solely to make a criterion applicable. Review every A and AA criterion, including those outside the focused list above, against the actual final page.

| Feature or condition | Required review when present |
| --- | --- |
| Prerecorded or live media | Appropriate text alternatives, captions, and audio description: 1.2.1–1.2.5 |
| Personal-information inputs | Programmatically identifiable input purposes: 1.3.5 |
| Automatically playing audio | Audio-control requirements: 1.4.2 |
| Hover or focus popups | Dismissible, hoverable, persistent content as applicable: 1.4.13 |
| Character-only shortcuts | Disable, remap, or restrict appropriately: 2.1.4 |
| Time limits, moving content, or flashing | Review 2.2.1, 2.2.2, and 2.3.1 |
| Repeated blocks or a set of pages | Bypass repeated blocks, navigation alternatives, and consistency: 2.4.1, 2.4.5, 3.2.3, 3.2.4 |
| Links | Purpose understandable in context: 2.4.4 |
| Complex gestures, motion, or dragging | Suitable alternatives: 2.5.1, 2.5.4, 2.5.7 |
| Repeated help mechanisms | Consistent placement where required: 3.2.6 |
| Forms and detected input errors | Labels, error identification, and correction suggestions: 3.3.1–3.3.3 |
| Legal, financial, stored-data, or test-response submissions | Review error-prevention requirements: 3.3.4 |
| Repeated entry in a process | Review reuse or selection of previously entered information: 3.3.7 |
| Authentication | Review accessible authentication requirements and allowed alternatives: 3.3.8 |
| On-page status updates | Expose status to assistive technology without moving focus unnecessarily: 4.1.3 |

For example, mark authentication criteria Not applicable only after verifying that no authentication process exists. A console-only `Ping` message is developer output; if user-facing feedback is later added, assess that feedback separately.

WCAG 2.2 clarification: 2.4.13 Focus Appearance and 2.5.5 Target Size (Enhanced) are AAA, not mandatory AA criteria. Criterion 4.1.1 Parsing was removed in WCAG 2.2. Continue to write valid HTML as an engineering practice without presenting that removed criterion as an AA requirement.

## 6. Verification rules

For each check, record the actual result, browser or tool used, and evidence location in `task_decomposition.md`.

- Verify factory values and strict guards before the first implementation commit.
- Verify rendering, attributes, listener behavior, and repeated mounting before the second.
- Inspect the live Elements panel and accessibility tree rather than judging accessibility from appearance alone.
- Combine a scanner, when available, with manual keyboard, screen-reader or accessibility-tree, contrast, zoom, reflow, and spacing checks.
- Do not treat a clean console or scanner report as proof of WCAG conformance.
- Use Pass, Fail, Pending, and Not applicable consistently. Explain every Not applicable decision.
- Recheck affected behavior after a relevant change; do not fabricate successful results.
- Do not claim Level AA conformance until all applicable A and AA criteria and the full-page, complete-process, accessibility-supported technology, and non-interference conformance requirements have been assessed.

## 7. Git and submission rules

Preserve the required checkpoint order and exact messages:

1. `feat(core): implement createElement factory`
2. `feat(core): implement renderToDOM`

Review staged changes before committing. Include the planning files with the first checkpoint unless the lecturer specifies a separate documentation commit. Do not move renderer implementation into the factory checkpoint merely to finish everything at once.

Never invent a repository URL, credentials, branch, commit hash, push result, or deployment. Use the confirmed submission destination. Do not rewrite existing history or overwrite student work without explicit instruction.

## 8. Completion gate

AI assistance is complete only when the agreed task's deliverables are produced and its verification status is reported honestly. For this initial documentation task, completion means creating these two files. All implementation, accessibility testing, DevTools auditing, and Git checkpoints remain pending until actually performed.
