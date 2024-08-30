import { getPureUrl } from "@src/utils";

chrome.runtime.onInstalled.addListener(() => {});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const optionsKey = message.optionsKey || getPureUrl(sender.url!);
  switch (message.type) {
    case "get/options": {
      chrome.storage.sync.get(optionsKey, (result) => {
        sendResponse({
          optionsKey,
          data: result[optionsKey]?.data || {},
        });
      });
      break;
    }
    case "set/options": {
      chrome.storage.sync.set({ [optionsKey]: { data: message.data } }, () => {
        sendResponse({ optionsKey, data: message.data });
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
