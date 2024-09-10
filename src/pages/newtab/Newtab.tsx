import "@pages/newtab/Newtab.css";
import pkg from "../../../package.json";

export default function Newtab(): JSX.Element {
  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-5xl text-blue-400">JSON Editor</div>
      <pre>
        <code className="text-2xl text-gray-500">
          {`
{
  "name": "JSON Editor",
  "version": "${pkg.version}",
  "description": "A JSON Editor Extension for Chrome",
  "author": {
    "name": "Seven Yu",
    "email": "dofyyu@gmail.com"
  }
}
`}
        </code>
      </pre>
    </main>
  );
}
