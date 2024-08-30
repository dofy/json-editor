import "@pages/newtab/Newtab.css";

export default function Newtab(): JSX.Element {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-4xl text-blue-300 font-black">JSON Editor</div>
      <pre>
        <code className="text-2xl">
          {`
{
  "name": "JSON Editor",
  "version": "1.0.0",
  "description": "A JSON editor extension",
  "author": "Seven Yu <dofyyu@gmail.com>",
}
          `}
        </code>
      </pre>
    </main>
  );
}
