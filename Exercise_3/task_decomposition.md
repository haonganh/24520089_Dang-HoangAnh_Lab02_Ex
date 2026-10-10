# Exercise 3 — Resilient State Machine and Skeleton Loader

## Objective

Build a typed data component with exactly four states:
IDLE, LOADING, SUCCESS, and ERROR. Show an animated skeleton while loading,
a readable error and Retry button on failure, and data on success.

Prevent outdated async requests from replacing the result of a newer request.
Target WCAG 2.2 Level AA for the complete page. Conformance is not established
until all applicable criteria are reviewed and verified.

## T1 — Setup and plan

- [ ] Create the React TypeScript project.
- [ ] Create task_decomposition.md and Ai_rule.md.
- [ ] Inspect any lecturer-provided starter or data source.
- [ ] Keep the required single implementation commit for the completed work.

## T2 — Types and state transitions

- [ ] Define the Item type based on the supplied feed or starter.
- [ ] Define ViewState<T> as a discriminated union:
      IDLE, LOADING, SUCCESS with data, or ERROR with a message.
- [ ] Start in IDLE.
- [ ] Transition to LOADING before requesting data.
- [ ] Transition to SUCCESS with data or ERROR with a readable message.

## T3 — Loading and success UI

- [ ] Show an animated CSS skeleton only in LOADING.
- [ ] Respect prefers-reduced-motion.
- [ ] Render the returned items safely in SUCCESS.
- [ ] Provide a clear empty state when the successful response has no items.

## T4 — Error, retry, and race handling

- [ ] Show a human-readable error in ERROR.
- [ ] Provide a keyboard-operable Retry Connection button.
- [ ] Retry from ERROR by starting a new LOADING request.
- [ ] Ensure a stale request cannot overwrite the newest result.
- [ ] Ignore or cancel requests when the component is no longer active.

## T5 — Verification and accessibility

- [ ] Verify loading skeleton, successful data, and empty success.
- [ ] Verify error display and retry success.
- [ ] Simulate two overlapping requests and confirm only the latest wins.
- [ ] Check keyboard operation, focus, accessible names, status announcement,
      contrast, reduced motion, zoom, and reflow.
- [ ] Review every other applicable WCAG 2.2 A and AA criterion.
- [ ] Record actual outcomes and evidence below.

## T6 — Required commit and submission

- [ ] Review the final diff and run the project checks.
- [ ] Commit with exactly:
      feat(ui): implement multi-state data component with skeleton feedback
- [ ] Push the commit and confirm it appears on GitHub.
- [ ] Confirm the working tree is clean.

## Verification record

| Check | Status | Evidence |
| --- | --- | --- |
| Typed four-state model | Pending | — |
| Loading skeleton and success data | Pending | — |
| Error and retry | Pending | — |
| Stale request protection | Pending | — |
| Accessibility review | Pending | — |
| Required commit and GitHub push | Pending | — |

Reference: https://www.w3.org/TR/WCAG22/