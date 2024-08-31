import { PageOptions } from "@src/types";
import { useEffect, useState } from "react";

interface OptionEditorProps {
  pageKey: string;
  options: PageOptions;
}

export const OptionEditor: React.FC<OptionEditorProps> = ({
  pageKey,
  options,
}) => {
  const [isChanged, setIsChanged] = useState(false);
  const [buttonText, setButtonText] = useState<string>("Save");
  const [currentOptions, setCurrentOptions] = useState<PageOptions>(options);

  useEffect(() => {
    setCurrentOptions(options);
  }, [options]);

  const updateOptions = (selector: string) => {
    setIsChanged(true);
    setCurrentOptions({ selector });
  };

  const onSave = () => {
    // Save the current options to the storage
    chrome.runtime.sendMessage({
      type: "set/options",
      pageKey,
      data: currentOptions,
    });

    setIsChanged(false);
    setButtonText("Saved!");

    setTimeout(() => {
      setButtonText("Save");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold" htmlFor="container">
        JSON Input Element Selector:
      </label>
      <input
        id="container"
        className="border border-gray-300 rounded-md px-2 py-1"
        value={currentOptions?.selector}
        onChange={(evt) => updateOptions(evt.target.value)}
      ></input>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded-md disabled:opacity-50"
        onClick={onSave}
        disabled={!isChanged}
      >
        {buttonText}
      </button>
    </div>
  );
};
