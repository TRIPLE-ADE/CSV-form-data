"use client";
import Papa from "papaparse";
import { ChangeEvent, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (result: any) => {
          setCsvData(result.data);
          console.log(result.data);
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
      <section className="max-w-2xl m-auto">
        <div>
          <p className="mb-4 text-lg font-semibold">
            Upload a CSV file for parsing
          </p>
          <p className="text-gray-600 mb-2">
            To get started, click the link below to choose a CSV file from your
            device. Once uploaded, the file will be parsed, and the data will
            be displayed below.
          </p>
          <label
            htmlFor="upload"
            className="cursor-pointer underline text-indigo-500"
          >
            Click here
          </label>{" "}
          to upload a CSV file
          <input
            type="file"
            accept=".csv"
            id="upload"
            onChange={handleFileUpload}
            className="hidden"
          />
           <p className="mt-4">
            Alternatively, if you prefer manual entry, you can{" "}
            <Link href="/manual-entry" className="underline">
              go to the manual entry page
            </Link>{" "}
            and enter the data manually.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <p className="text-lg font-semibold mb-2">Parsed CSV Data:</p>
        {csvData.length > 0 && (
          <ul>
            {csvData.map((row, index) => (
              <li key={index} className="mb-2">
                {Object.entries(row).map(([key, value]) => (
                  value != '' && <span key={key} className="mr-2">
                  {key}: {String(value)}
                </span> 
                ))}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
