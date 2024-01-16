import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-5 md:p-24 bg-slate-50 text-indigo-900">
      <section className=" max-w-2xl m-auto">
        <h1 className="text-4xl text-center">Welcome to Data Management</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <Link
            href={`/upload-csv`}
            className="bg-teal-600 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded"
          >
            Upload CSV
          </Link>
          <Link
            href={`/manual-entry/`}
            className="bg-teal-600 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded"
          >
            Manual Entry
          </Link>
        </div>
      </section>
    </main>
  );
}
