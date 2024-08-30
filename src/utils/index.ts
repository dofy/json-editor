export const logger = (...msgs: string[]) => {
  chrome.runtime.sendMessage({ type: "system/log", msgs });
};

export const getPureUrl = (url: string) => {
  const u = new URL(url);
  return `${u.origin}${u.pathname}`;
};
