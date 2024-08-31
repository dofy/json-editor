import { getPureUrl } from "@src/utils";
import { FC, useEffect, useState } from "react";
import { OptionEditor } from "./OptionEditor";
import { PageOptions } from "@src/types";

const Popup: FC = () => {
  const [pageKey, setPageKey] = useState<string>();
  const [options, setOptions] = useState<PageOptions>();

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
    <main className="min-w-[420px] p-2 flex flex-col gap-3">
      <h3 className="text-xl font-bold underline ml-4 underline-offset-2">
        Options about the current page
      </h3>
      <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-xl">
        <div className="flex gap-2">
          <h4 className="font-bold">Page Key:</h4>
          <span className="text-blue-500">{pageKey}</span>
        </div>
        <OptionEditor optionsKey={pageKey!} options={options!} />
      </div>
    </main>
  );
};

export default Popup;
