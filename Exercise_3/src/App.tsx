import { useEffect, useRef, useState } from "react";
import type { Item, ViewState } from "./types";
import "./App.css";

const items: Item[] = [
  { id: 1, title: "Review the assignment" },
  { id: 2, title: "Build the state machine" },
  { id: 3, title: "Test loading and retry" },
];

function App() {
  const [state, setState] = useState<ViewState<Item>>({ status: "IDLE" });
  const requestId = useRef(0);

  useEffect(() => {
    return () => {
      requestId.current += 1;
    };
  }, []);

  async function loadData(simulateError = false) {
    const currentRequest = ++requestId.current;
    setState({ status: "LOADING" });

    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1200));
      if (simulateError) throw new Error("Could not load the feed. Please try again.");

      if (currentRequest === requestId.current) {
        setState({ status: "SUCCESS", data: items });
      }
    } catch (error) {
      if (currentRequest === requestId.current) {
        setState({
          status: "ERROR",
          error: error instanceof Error ? error.message : "An unexpected error occurred.",
        });
      }
    }
  }

  return (
    <main className="app">
      <h1>Resilient Data Feed</h1>

      {state.status === "IDLE" && (
        <section aria-label="Feed controls">
          <p>The feed is ready to load.</p>
          <button onClick={() => void loadData()}>Load Feed</button>
          <button onClick={() => void loadData(true)}>Test Error</button>
        </section>
      )}

      {state.status === "LOADING" && (
        <section aria-label="Loading feed">
          <p role="status">Loading feed…</p>
          <div className="skeleton" aria-hidden="true" />
          <div className="skeleton" aria-hidden="true" />
          <div className="skeleton" aria-hidden="true" />
        </section>
      )}

      {state.status === "SUCCESS" && (
        <section aria-label="Feed items">
          <p role="status">Feed loaded successfully.</p>
          <ul>
            {state.data.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
          <button onClick={() => void loadData()}>Refresh Feed</button>
          <button onClick={() => void loadData(true)}>Test Error</button>
        </section>
      )}

      {state.status === "ERROR" && (
        <section>
          <p role="alert">{state.error}</p>
          <button onClick={() => void loadData()}>Retry Connection</button>
        </section>
      )}
    </main>
  );
}

export default App;