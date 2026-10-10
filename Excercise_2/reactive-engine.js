export function createHookEngine() {
  const stateStore = [];
  let cursor = 0;

  function resetCursor() {
    cursor = 0;
  }

  function readNextSlot(initialValue) {
    const index = cursor;

    if (!(index in stateStore)) {
      stateStore[index] = initialValue;
    }

    cursor += 1;

    return {
      index,
      value: stateStore[index],
    };
  }

  return {
    resetCursor,
    readNextSlot,
    get cursor() {
      return cursor;
    },
    get slotCount() {
      return stateStore.length;
    },
  };
}