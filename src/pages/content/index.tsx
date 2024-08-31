import { PageOptions } from "@src/types";
import { createRoot } from "react-dom/client";
import { Editor } from "./Editor";
import "./style.css";
import { logger } from "@src/utils";
import { i } from "vite/dist/node/types.d-aGj9QkWt";

let elementSelector = "";

const insertGoogleFonts = () => {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=SUSE:wght@100..800&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

const replaceEditor = () => {
  // find the element
  const elements = document.querySelectorAll<
    HTMLTextAreaElement | HTMLInputElement
  >(elementSelector);

  // filter out the elements that are not textarea or input
  const allowedElements = Array.from(elements).filter(
    (el) =>
      el.tagName.toLowerCase() === "textarea" ||
      el.tagName.toLowerCase() === "input"
  );

  // if there are no elements, return
  if (allowedElements.length === 0) {
    return;
  }

  // replace the elements with the editor
  allowedElements.forEach((element) => {
    // check if the element is already replaced
    if (element.style.display === "none") {
      return;
    }

    // create a container for the editor
    const container = document.createElement("div");
    container.classList.add("__json_editor_root");

    // find element's parent and insert container before element
    element.parentNode?.insertBefore(container, element);
    // and hide the original element
    element.style.display = "none";

    const root = createRoot(container);
    root.render(<Editor element={element} />);
  });
};

// check if the dom changed and add the content
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        if (node.querySelector(elementSelector)) {
          replaceEditor();
        }
      }
    });
  });
});

observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});

chrome.runtime.sendMessage(
  { type: "get/options" },
  ({ data }: { data: PageOptions }) => {
    elementSelector = data.selector;
    if (elementSelector) {
      insertGoogleFonts();
      replaceEditor();
    }
  }
);
