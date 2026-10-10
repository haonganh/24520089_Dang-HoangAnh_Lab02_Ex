# Task Decomposition — Exercise 1: Mini-React VNode and Mounting Engine

## 1. Purpose and source

Build `createTextElement`, `createElement`, and `renderToDOM` from scratch, following the supplied assignment image. Complete this plan and `Ai_rule.md` before implementation.

Accessibility target: the complete demo page must meet all applicable WCAG 2.2 Level A and AA success criteria. These planning files do not establish conformance. Actual implementation and recorded verification are required.

Normative reference: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/).

### Requirements explicitly shown in the assignment

- Implement the three functions above without a framework implementation.
- Produce semantic HTML, including appropriate `main`, `section`, and `button` elements; avoid div-soup.
- Verify that the child string `<script>alert(1)</script>` cannot execute.
- Also run the screenshot's `<img onerror=alert(1)> Safe Text` child example.
- Inspect the live DOM in DevTools; its structure must match the VNode tree without orphan nodes.
- Preserve these two required implementation commit messages exactly:
  1. `feat(core): implement createElement factory`
  2. `feat(core): implement renderToDOM`

### Proposed implementation decisions

The screenshot does not prescribe a complete VNode schema or every edge case. The following are project decisions, to be reconciled with any lecturer-provided starter code before coding:

- Use plain JavaScript ES modules and native DOM APIs.
- Use `TEXT_ELEMENT` as the internal text-node discriminator.
- Represent children as a normalized array in `props.children`.
- Convert string and number children to text VNodes; preserve existing valid VNodes.
- Flatten nested child arrays and omit `null`, `undefined`, and boolean children.
- Reject malformed VNodes and unsupported child types with clear errors.
- Keep rendering separate from mounting: `renderToDOM(vNode)` returns a DOM node; the caller mounts it using `root.replaceChildren(...)`.
- Begin with trusted element types and props. Supporting arbitrary untrusted HTML, URLs, or executable attributes is outside this exercise's text-child XSS requirement.

## 2. Planned files

| File | Purpose |
| --- | --- |
| `task_decomposition.md` | Task order, acceptance checks, and evidence record |
| `Ai_rule.md` | Rules for AI-assisted implementation and review |
| `index.html` | Demo document, language, title, and mount container |
| `mini-react.js` | Exported VNode factories and renderer |
| `test-runner.js` | Assignment example and focused verification checks |
| `style.css` | Demo layout, contrast, focus, and responsive behavior if styling is needed |

Reuse starter filenames when supplied. Do not create additional documentation just to satisfy this plan.

## 3. Tasks and checkpoints

### T1 — Confirm scope and document the plan

- [ ] Read the assignment and available starter files.
- [ ] Confirm exported function names and required commit messages.
- [ ] Read both planning files and reconcile proposed decisions with starter code.
- [ ] Leave unexecuted checks marked as pending.

**Done when:** requirements, implementation decisions, and evidence expectations are distinguishable.

### T2 — Prepare the project and VNode contract

Depends on T1.

- [ ] Prepare the HTML entry page and ES-module script loading.
- [ ] Set the document language to match its content and provide a descriptive page title.
- [ ] Provide exactly one mount container; its neutral wrapper must not replace semantic content inside the rendered demo.
- [ ] Define text and element VNode shapes and a strict VNode type guard.
- [ ] Document how missing props, arrays, primitive children, and invalid values behave.

**Done when:** the project loads through a local HTTP server and the VNode contract is explicit. No renderer implementation is required yet.

### T3 — Implement the factories

Depends on T2. This checkpoint belongs to required Commit 1.

#### T3.1 — `createTextElement(value)`

- [ ] Return a text VNode with `String(value)` as `nodeValue` and an empty child array.
- [ ] Check the documented supported text inputs, including `"Hello World"`, `123`, `0`, and `""`.

#### T3.2 — `createElement(type, props, ...children)`

- [ ] Validate the element type according to the agreed contract.
- [ ] Accept `null` or omitted props without crashing.
- [ ] Copy props without mutating the caller's object.
- [ ] Normalize the variadic children according to Section 1.
- [ ] Keep function-valued event handlers intact for the later renderer.
- [ ] Ensure variadic children determine `props.children` under the proposed contract.

#### T3.3 — Strict type-guard verification

- [ ] Accept correctly shaped text and element VNodes.
- [ ] Reject malformed objects, missing child arrays, invalid discriminators, and unsupported child types.
- [ ] Verify that a primitive child becomes a text VNode instead of being mistaken for an element.

#### T3.4 — Factory checkpoint and Commit 1

- [ ] Inspect nested factory output in the console before implementing rendering.
- [ ] Verify text content, child order, normalization, and input immutability.
- [ ] Review `git diff` and stage the relevant factory work and planning files.
- [ ] Commit with `feat(core): implement createElement factory`.

**Done when:** factory checks pass and the first required commit exists. Record its hash below.

### T4 — Implement `renderToDOM(vNode)`

Depends on T3. This checkpoint belongs to required Commit 2.

- [ ] Validate the input VNode before processing it.
- [ ] Create text nodes with `document.createTextNode`; do not parse child strings as HTML.
- [ ] Create trusted HTML elements with `document.createElement`.
- [ ] Map `className` to `class` and preserve required `id`, `role`, `aria-*`, `data-*`, and other supported attributes.
- [ ] Treat `children` and text-node metadata as internal fields, not DOM attributes.
- [ ] Register supported function-valued events with `addEventListener`; map `onClick` to `click`.
- [ ] Handle supported boolean HTML attributes by presence/absence; preserve string values such as `aria-hidden="false"` accurately.
- [ ] Reject executable string event props and raw-HTML escape hatches.
- [ ] Recursively append children in VNode order.
- [ ] Return the detached subtree; do not mount it as a side effect.

**Done when:** text, nested elements, supported attributes, and event handlers render correctly without executing text children.

### T5 — Mount the assignment example and verify security

Depends on T4.

- [ ] Reproduce the screenshot's tree: `main#root-view`, `header.hero`, `h1`, paragraph, and native button with an `onClick` handler logging `Ping`.
- [ ] Retain `role="main"` if reproducing the provided example exactly; native `main` already supplies the role.
- [ ] Add a `section` only for a meaningful thematic group, with an appropriate heading when used.
- [ ] Verify the mount target exists before calling `replaceChildren`.
- [ ] Mount using `root.replaceChildren(renderToDOM(vApp))`.
- [ ] Run the supplied button-presence assertion and verify the button is a native button with the expected label and handler.
- [ ] Test each malicious-looking child string separately: `<script>alert(1)</script>` and `<img onerror=alert(1)> Safe Text`.
- [ ] Confirm both strings appear literally, no alert runs, and no `script` or `img` element is created from these child strings.
- [ ] Mount the same example again; confirm the mount target has one expected subtree, no duplicated descendants, and no stale content.

**Done when:** the example renders, button activation works, and the exact text-child attacks remain inert. This does not prove security for arbitrary untrusted props.

### T6 — Verify accessibility on the complete demo page

Depends on T5. Use the rules in `Ai_rule.md` as the implementation checklist.

- [ ] Inspect semantic structure, reading order, headings, document language, and title.
- [ ] Test Tab and Shift+Tab navigation and native button activation with Enter and Space.
- [ ] Check focus visibility, focus obstruction, and pointer target size.
- [ ] Measure relevant color contrast and test zoom, reflow, and text spacing.
- [ ] Inspect the browser accessibility tree for the button's name and role and the main landmark.
- [ ] Run an accessibility scanner if available, then manually verify results and the criteria it cannot establish.
- [ ] Review every Level A and AA criterion in the W3C reference; record Pass, Fail, Pending, or Not applicable with evidence or a concrete reason.

**Done when:** applicable checks pass, remaining limitations are explicit, and conditional criteria have supported applicability decisions. A scanner score alone is insufficient.

### T7 — Perform the live DevTools audit

Depends on T5 and T6.

- [ ] Compare each VNode's type, attributes, text, child count, and sibling order with the live Elements panel.
- [ ] Confirm the expected semantic elements and absence of unnecessary layout wrappers.
- [ ] Check repeated mounting for duplicated or leftover nodes inside the mount target.
- [ ] Check the Console for assertions, exceptions, and unintended XSS execution.
- [ ] Capture concise evidence of the Elements panel, console results, and accessibility checks.

**Done when:** the live DOM matches the intended tree and all observed discrepancies are resolved or recorded as failures.

### T8 — Complete Commit 2 and prepare submission

Depends on T4–T7.

- [ ] Review the final diff and stage renderer, demo, and relevant evidence updates.
- [ ] Commit with `feat(core): implement renderToDOM`.
- [ ] Check that both required commits exist in the correct order.
- [ ] Confirm the working tree is clean, or explain any intentionally uncommitted files.
- [ ] If repository submission is required, verify the actual repository URL and push the correct branch; do not invent a remote.
- [ ] Reopen the final demo and confirm the lecturer's required files are present.

**Done when:** both commits are reviewable and the agreed submission destination contains the intended work.

## 4. Verification record

All checks are pending at document creation. Replace placeholders only after verification.

| Check | Status | Actual result / evidence |
| --- | --- | --- |
| Factory output and normalization | Pending | — |
| Strict VNode guards | Pending | — |
| Recursive DOM structure and props | Pending | — |
| Mouse and keyboard button activation | Pending | — |
| Script-string child test | Pending | — |
| Image-handler-string child test | Pending | — |
| Repeated mount and DevTools audit | Pending | — |
| Applicable WCAG A and AA review | Pending | — |
| Required Commit 1 | Pending | Hash: — |
| Required Commit 2 | Pending | Hash: — |

For accessibility evidence, use one row per criterion reviewed:

| WCAG criterion | Applicable? / reason | Status | Method, browser, and evidence |
| --- | --- | --- | --- |
| To be completed during T6 | Not yet assessed | Pending | — |

## 5. Definition of done

- [ ] The three required exports work from scratch.
- [ ] Factory behavior and strict guards match the agreed contract.
- [ ] The supplied example mounts as semantic HTML with a functioning button.
- [ ] Both required malicious child strings remain plain text.
- [ ] Live DevTools evidence confirms the intended tree without duplicate or leftover nodes.
- [ ] All applicable WCAG 2.2 A and AA criteria have been reviewed, with evidence and no unresolved failures before any conformance claim.
- [ ] The two required commit messages are exact and their order is correct.
- [ ] The submission includes `task_decomposition.md` and `Ai_rule.md`.
