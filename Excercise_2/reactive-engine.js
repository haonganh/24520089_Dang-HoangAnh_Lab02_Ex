import { renderToDOM } from "./mini-react.js";

export function createHookEngine() {
  const stateStore = [];
  let cursor = 0;
  let currentComponent = null;
  let root = null;
  let rendering = false;

  function resetCursor() {
    cursor = 0;
  }

  function readNextSlot(initialValue) {
    const index = cursor;

    if (!(index in stateStore)) {
      stateStore[index] = initialValue;
    }

    cursor += 1;
    return { index, value: stateStore[index] };
  }

  function renderApp(Component, target) {
    if (typeof Component !== "function" || !(target instanceof Element)) {
      throw new TypeError("renderApp needs a component and a root element");
    }
    if (rendering) {
      throw new Error("Cannot render recursively");
    }

    currentComponent = Component;
    root = target;
    rendering = true;

    try {
      resetCursor();
      root.replaceChildren(renderToDOM(Component()));
    } finally {
      rendering = false;
    }
  }

  function useState(initialValue) {
    const slot = readNextSlot(initialValue);

    function setState(update) {
      if (rendering) {
        throw new Error("Do not update state during rendering");
      }

      const previous = stateStore[slot.index];
      const next = typeof update === "function"
        ? update(previous)
        : update;

      if (Object.is(previous, next)) return;

      stateStore[slot.index] = next;

      if (currentComponent && root) {
        renderApp(currentComponent, root);
      }
    }

    return [slot.value, setState];
  }

  return {
    resetCursor,
    readNextSlot,
    useState,
    renderApp,
    get cursor() {
      return cursor;
    },
    get slotCount() {
      return stateStore.length;
    },
  };
}

const appEngine = createHookEngine();

export const useState = appEngine.useState;
export const renderApp = appEngine.renderApp;