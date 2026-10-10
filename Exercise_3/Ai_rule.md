# AI Rules — Exercise 3

- Follow task_decomposition.md in checkpoint order.
- Follow lecturer-provided starter code and data requirements.
- Keep the state union limited to IDLE, LOADING, SUCCESS, and ERROR.
- Store success data only in SUCCESS and error text only in ERROR.
- Render the skeleton only while LOADING.
- Treat caught errors as unknown; safely produce a readable message.
- Prevent stale requests from changing the latest state. Use request identity
  or cancellation and verify the behavior with overlapping requests.
- Make retry start a fresh request and show LOADING feedback.
- Render feed text as text; do not inject untrusted HTML.
- Keep the Retry Connection button keyboard-operable and visibly focused.
- Announce loading and error status to assistive technology appropriately.
- Respect prefers-reduced-motion for the animated skeleton.
- Check contrast, zoom, reflow, names, keyboard behavior, and other applicable
  WCAG 2.2 Level A and AA criteria.
- Mark untested criteria Pending. Do not claim full AA conformance without
  completing the applicable review.
- Keep all implementation work under the assignment's one required commit.
- Never invent test results, commit hashes, or push success.