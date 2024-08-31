import { PageOptions } from "@src/types";
import { useEffect, useState } from "react";

interface OptionEditorProps {
  optionsKey: string;
  options: PageOptions;
}

export const OptionEditor: React.FC<OptionEditorProps> = ({
  optionsKey,
  options,
}) => {
  const [isChanged, setIsChanged] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<PageOptions>(options);

  useEffect(() => {
    setCurrentOptions(options);
  }, [options]);

  const updateOptions = (container: string) => {
    setIsChanged(true);
    setCurrentOptions({ container });
  };

  const onSave = () => {
    chrome.runtime.sendMessage({
      type: "set/options",
      optionsKey,
      data: currentOptions,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold" htmlFor="container">
        JSON Input Element Selector:
      </label>
      <input
        id="container"
        className="border border-gray-300 rounded-md px-2 py-1"
        value={currentOptions?.container}
        onChange={(evt) => updateOptions(evt.target.value)}
      ></input>
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded-md disabled:opacity-50"
        onClick={onSave}
        disabled={!isChanged}
      >
        Save
      </button>
    </div>
  );
};
