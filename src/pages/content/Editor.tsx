import React from "react";

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  return (
    <div className="suse bg-amber-400 rounded-3xl flex flex-col mt-4 w-full mx-auto">
      <h1 className="text-lg">JSON Editor</h1>
      <textarea
        className="text-lg font-mono flex-1 mx-4 mb-4 p-2"
        defaultValue={content}
        onChange={(evt) => setContent(evt.target.value)}
      ></textarea>
      <button className="text-lg font-bold mx-4 mb-4 p-2 rounded-b-2xl bg-blue-500 text-white">
        Save
      </button>
    </div>
  );
};
