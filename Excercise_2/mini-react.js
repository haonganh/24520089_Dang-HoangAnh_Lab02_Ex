const TEXT_ELEMENT = "TEXT_ELEMENT";
const clickHandlers = new WeakMap();

export function dispatchDelegatedClick(event) {
  const root = event.currentTarget;
  let element = event.target instanceof Element
    ? event.target
    : event.target?.parentElement;

  while (element && element !== root) {
    const handler = clickHandlers.get(element);
    if (handler) {
      handler(event);
      return;
    }
    element = element.parentElement;
  }
}

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

export function renderToDOM(vNode) {
  if (!isVNode(vNode)) {
    throw new TypeError("renderToDOM expected a valid VNode");
  }

  if (vNode.type === "TEXT_ELEMENT") {
    return document.createTextNode(vNode.props.nodeValue);
  }

  const element = document.createElement(vNode.type);
  const booleanAttributes = new Set([
    "disabled", "checked", "selected", "multiple", "required",
    "readonly", "autofocus", "hidden",
  ]);

  for (const [originalName, value] of Object.entries(vNode.props)) {
    if (
      originalName === "children" ||
      originalName === "key" ||
      originalName === "nodeValue"
    ) {
      continue;
    }

    if (originalName === "dangerouslySetInnerHTML") {
      throw new TypeError("Raw HTML is not supported");
    }

    if (/^on/i.test(originalName)) {
      if (!/^on[A-Z]/.test(originalName) || typeof value !== "function") {
        throw new TypeError(`Invalid event handler: ${originalName}`);
      }

     if (originalName !== "onClick") {
  throw new TypeError(`Unsupported delegated event: ${originalName}`);
}
clickHandlers.set(element, value);
      continue;
    }

    if (value === null || value === undefined) continue;
    if (typeof value === "function") continue;

    const name = originalName === "className" ? "class" : originalName;
    const lowerName = name.toLowerCase();

    if (booleanAttributes.has(lowerName)) {
      if (value) element.setAttribute(name, "");
      continue;
    }

    if (typeof value === "boolean" && !lowerName.startsWith("aria-")) {
      continue;
    }

    if (typeof value === "object") {
      throw new TypeError(`Unsupported object prop: ${originalName}`);
    }

    element.setAttribute(name, String(value));
  }

  for (const child of vNode.props.children) {
    element.appendChild(renderToDOM(child));
  }

  return element;
}