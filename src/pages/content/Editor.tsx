import React, { ChangeEvent } from "react";

const dispatchElementEvent = (element: HTMLElement, type: string) => {
  const event = new Event(type, {
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
};

const changeHandler = (
  evt: ChangeEvent<HTMLTextAreaElement>,
  element: HTMLInputElement | HTMLTextAreaElement
) => {
  element.value = evt.target.value;
  dispatchElementEvent(element, "change");
};

interface EditorProps {
  element: HTMLTextAreaElement | HTMLInputElement;
}

export const Editor: React.FC<EditorProps> = ({ element }) => {
  return (
    <div className="suse bg-gray-200 rounded-2xl flex flex-col p-2 mt-2 w-full mx-auto h-[420px]">
      <textarea
        className="font-mono flex-1 p-2 rounded-xl"
        defaultValue={element.value || element.innerHTML}
        onChange={(evt) => changeHandler(evt, element)}
      ></textarea>
    </div>
  );
};
