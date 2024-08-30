import { createRoot } from "react-dom/client";
import { Editor } from "./Editor";
import "./style.css";

const updateContent = (content: string) => {
  chrome.runtime.sendMessage({ type: "set/content", content });
};

const addContent = (containerSelector: string) => {
  const rootContainer = document.querySelector(containerSelector);
  if (!rootContainer) return;

  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=SUSE:wght@100..800&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  const container = document.createElement("div");
  container.classList.add("__json_editor_root");
  rootContainer.appendChild(container);

  const root = createRoot(container);
  root.render(<Editor content="test" setContent={updateContent} />);
};

chrome.runtime.sendMessage({ type: "get/options" }, ({ data }) => {
  data.container && addContent(data.container);
});
