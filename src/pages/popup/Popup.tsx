import { getPureUrl } from "@src/utils";
import { FC, useEffect, useState } from "react";

const Popup: FC = () => {
  const [pageKey, setPageKey] = useState<string | null>(null);
  const [options, setOptions] = useState<{ container: string } | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const optionsKey = getPureUrl(tabs[0].url!);
      setPageKey(optionsKey);

      chrome.runtime.sendMessage(
        { type: "get/options", optionsKey },
        ({ data }) => {
          setOptions(data);
        }
      );
    });
  }, []);

  return (
    <main className="min-w-[420px] p-2 bg-gray-100 ">
      <h3 className="text-2xl font-bold underline-offset-2">
        Options about current site
      </h3>
      <div className="flex gap-2 text-lg">
        <h4 className="font-bold">Page Key:</h4>
        <span>{pageKey}</span>
      </div>
      <pre>{JSON.stringify(options, null, 2)}</pre>
    </main>
  );
};

export default Popup;
