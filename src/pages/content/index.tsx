import { createRoot } from "react-dom/client";
import "./style.css";
import { Editor } from "./Editor";

const ContentRootId = "__json_editor_root";

const updateContent = (content: string) => {
  chrome.runtime.sendMessage({ type: "set/content", content });
};

const addContent = (containerSelector: string) => {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=SUSE:wght@100..800&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);

  const div = document.createElement("div");
  div.id = ContentRootId;

  if (containerSelector) {
    document.querySelector(containerSelector)?.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  const rootContainer = document.querySelector(`#${ContentRootId}`);
  if (!rootContainer) throw new Error("Can't find Content root element");
  const root = createRoot(rootContainer);
  root.render(<Editor content="test" setContent={updateContent} />);
};

chrome.runtime.sendMessage({ type: "get/options" }, ({ data }) => {
  const { container: containerSelector } = data;
  addContent(containerSelector);
});
