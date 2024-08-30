import React from "react";

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ content, setContent }) => {
  return (
    <div className="suse bg-amber-400 rounded-3xl flex flex-col mt-4 w-96 mx-auto">
      <h1 className="text-lg">JSON Editor</h1>
      <textarea
        className="text-lg font-mono flex-1 mx-4 mb-4 p-2 rounded-b-2xl"
        defaultValue={content}
        onChange={(evt) => setContent(evt.target.value)}
      ></textarea>
    </div>
  );
};
