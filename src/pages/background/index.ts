console.log("background script loaded");

chrome.runtime.onInstalled.addListener(() => {
  console.log("onInstalled");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("onMessage", message, sender);
  switch (message.type) {
    case "get/options":
      sendResponse({
        type: "options",
        options: {
          container: ".hero-text",
        },
      });
      break;
    default:
      console.error("unknown message type", message);
  }
  return true;
});
