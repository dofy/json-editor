import "@assets/styles/tailwind.css";
import "@pages/panel/index.css";
import { createRoot } from "react-dom/client";
import Browser from "webextension-polyfill";
import { DevTool } from "./DevTool";

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find DevTool root element");
  const root = createRoot(rootContainer);
  root.render(<DevTool />);
}

init();

Browser.devtools.panels
  .create("Dev Tools", "icon-32.png", "src/pages/devtools/index.html")
  .catch(console.error);
