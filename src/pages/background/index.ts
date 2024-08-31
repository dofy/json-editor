import { getPureUrl } from "@src/utils";

chrome.runtime.onInstalled.addListener(() => {});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const pageKey = message.pageKey || getPureUrl(sender.url!);
  switch (message.type) {
    case "get/options": {
      chrome.storage.sync.get(pageKey, (result) => {
        sendResponse({
          pageKey,
          data: result[pageKey]?.data || {},
        });
      });
      break;
    }
    case "set/options": {
      chrome.storage.sync.set({ [pageKey]: { data: message.data } }, () => {
        sendResponse({ pageKey, data: message.data });
      });
      break;
    }
    case "system/log":
      console.log("<system/log>", ...message.msgs);
      break;
    default:
      console.log("Unknown Message Type:", message.type);
      break;
  }
  return true;
});
