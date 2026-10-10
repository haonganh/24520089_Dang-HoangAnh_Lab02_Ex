import { createElement, renderToDOM } from "./mini-react.js";

const root = document.getElementById("app");

if (!(root instanceof HTMLElement)) {
  throw new Error("Missing mount container: #app");
}

const app = createElement(
  "main",
  { id: "root-view" },
  createElement(
    "header",
    { className: "hero" },
    createElement("h1", null, "Mini React Engine"),
    createElement("p", null, "Safe text rendering demo")
  ),
  createElement(
    "p",
    null,
    "<script>alert(1)</script>",
    " ",
    "<img onerror=alert(1)> Safe Text"
  ),
  createElement(
    "button",
    { type: "button", onClick: () => console.log("Ping") },
    "Click"
  )
);

root.replaceChildren(renderToDOM(app));

if (!(root.querySelector("button") instanceof HTMLButtonElement)) {
  throw new Error("Button did not render");
}

if (root.querySelector("script, img")) {
  throw new Error("A test string became an HTML element");
}

if (!root.textContent.includes("<script>alert(1)</script>")) {
  throw new Error("Script test string was not rendered as text");
}

if (!root.textContent.includes("<img onerror=alert(1)> Safe Text")) {
  throw new Error("Image test string was not rendered as text");
}

console.log("T4 PASS: DOM rendered; both test strings stayed text.");