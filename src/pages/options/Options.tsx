import "@pages/options/Options.css";

export default function Options(): JSX.Element {
  return (
    <div className="w-[720px] p-2">
      <h1 className="text-2xl text-blue-500 font-medium">
        JSON Editor Settings
      </h1>
      <section className="mt-4">
        <h3 className="text-lg text-blue-400">Global Settings</h3>
      </section>
      <section className="mt-4">
        <h3 className="text-lg text-blue-400">User Settings</h3>
      </section>
    </div>
  );
}
