"use client";
import Papa from "papaparse";
import { ChangeEvent, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (result: any) => {
          console.log(result.data);
          setCsvData(result.data);
        },
        header: true,
        error: (err: any) => {
          console.error(err.message);
        },
      });
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center gap-5 p-5 md:p-24 bg-slate-50 text-indigo-900">
      <section className=" max-w-2xl m-auto">
        <h1 className="text-4xl text-center">Welcome to Data Management</h1>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <label
            htmlFor="upload"
            className="cursor-pointer bg-teal-600 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded"
          >
            Upload CSV
          </label>
          <input
            type="file"
            accept=".csv"
            id="upload"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Link
            href={`/manual-entry/`}
            className="bg-teal-600 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded"
          >
            Manual Entry
          </Link>
        </div>
      </section>
      {/* Files upload data extract */}
      <section className="mt-8">
        {csvData.length > 0 && (
          <>
            <p className="text-lg font-semibold mb-2">Parsed CSV Data:</p>
            <ul>
              {csvData.map((row, index) => (
                <li key={index} className="mb-2">
                  {Object.entries(row).map(
                    ([key, value]) =>
                      value != "" && (
                        <span key={key} className="mr-2">
                          {key}: {String(value)}
                        </span>
                      )
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
