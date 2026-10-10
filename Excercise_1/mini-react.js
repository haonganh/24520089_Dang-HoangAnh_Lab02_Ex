const TEXT_ELEMENT = "TEXT_ELEMENT";

export function createTextElement(value) {
  if (typeof value !== "string" && typeof value !== "number") {
    throw new TypeError("Text must be a string or number");
  }

  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: String(value),
      children: [],
    },
  };
}

export function isVNode(value) {
  if (value === null || typeof value !== "object") return false;

  const { type, props } = value;
  if (props === null || typeof props !== "object" || Array.isArray(props)) {
    return false;
  }
  if (!Array.isArray(props.children)) return false;

  if (type === TEXT_ELEMENT) {
    return typeof props.nodeValue === "string" && props.children.length === 0;
  }

  return (
    typeof type === "string" &&
    /^[a-z][a-z0-9-]*$/i.test(type) &&
    props.children.every(isVNode)
  );
}

export function createElement(type, props, ...children) {
  if (typeof type !== "string" || !/^[a-z][a-z0-9-]*$/i.test(type)) {
    throw new TypeError("Element type must be a valid HTML tag name");
  }

  const normalizedChildren = children.flat(Infinity)
    .filter(child => child !== null &&
                     child !== undefined &&
                     typeof child !== "boolean")
    .map(child => {
      if (typeof child === "string" || typeof child === "number") {
        return createTextElement(child);
      }
      if (isVNode(child)) return child;
      throw new TypeError("Unsupported VNode child");
    });

  return {
    type,
    props: {
      ...(props ?? {}),
      children: normalizedChildren,
    },
  };
}