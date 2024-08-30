import { createRoot } from "react-dom/client";
import "./style.css";

const ContentRootId = "__json_editor_root";

const addContent = (containerSelector: string) => {
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
  root.render(
    <div className="text-lg text-black bg-amber-400">content script loaded</div>
  );
};

chrome.runtime.sendMessage(
  { type: "get/options" },
  ({ options }: { options: Record<string, string> }) => {
    const { container: containerSelector } = options;
    console.log("🚀 ~ containerSelector:", containerSelector);
    addContent(containerSelector);
  }
);

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
