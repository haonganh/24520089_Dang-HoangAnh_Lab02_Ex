import {
  createTextElement,
  createElement,
  isVNode,
} from "./mini-react.js";

const root = document.getElementById("app");
if (!(root instanceof HTMLElement)) {
  throw new Error("Missing mount container: #app");
}

const text = createTextElement("Hello World");
const number = createTextElement(123);

const app = createElement(
  "main",
  { id: "root-view", role: "main" },
  createElement("h1", null, "Mini React Engine"),
  createElement("p", null, ["Safe Text", 123]),
  createElement("button", { onClick: () => console.log("Ping") }, "Click")
);

if (text.props.nodeValue !== "Hello World") throw new Error("Text test failed");
if (number.props.nodeValue !== "123") throw new Error("Number test failed");
if (!isVNode(app) || app.props.children.length !== 3) {
  throw new Error("VNode tree test failed");
}
if (isVNode({ type: "main", props: {} })) {
  throw new Error("Malformed VNode was accepted");
}

console.log("T3 PASS: factories and VNode guard");
console.log("VNode tree:", app);