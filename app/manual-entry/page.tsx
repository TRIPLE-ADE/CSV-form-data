"use client";
import React, { MouseEvent, useEffect, useState } from "react";

interface FormField {
  key: string;
  value: string;
  [key: string]: string;
}
const initialFormFields: FormField[] = [
  { key: "Name", value: "" },
  { key: "AccountNumber", value: "" },
  { key: "Role", value: "" },
  { key: "BankName", value: "" },
  { key: "Amount", value: "" },
];

export default function Page() {
  const [formFields, setFormFields] = useState<FormField[]>([
    ...initialFormFields,
  ]);
  const [jsonData, setJsonData] = useState<string | null>(null);

  useEffect(() => {
    const formData: Record<string, string | undefined> = formFields.reduce(
      (acc, field) => {
        if (field.key && field.value) {
          console.log(formFields);
          acc[field.key] = field.value;
        }
        return acc;
      }
    );

    setJsonData(JSON.stringify(formData, null, 2));
    console.log(jsonData);
  }, [formFields]);

  const handleFieldChange = (index: number, key: string, value: string) => {
    const newFormFields = [...formFields];
    newFormFields[index] = { key, value };
    setFormFields(newFormFields);
  };

  const handleAddField = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormFields([...formFields, ...initialFormFields]);
  };

  return (
    <main className="flex min-h-screen flex-col items-stretch gap-5 p-5 md:p-24 bg-slate-50 text-indigo-900">
      <section className="max-w-2xl w-full mx-auto">
        <form>
          <h2>Form Fields:</h2>
          {formFields.map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className={`${field.key == "Name" ? 'mt-6' : 'mt-2'}`}>{field.key}</label>
              <input
                type="text"
                placeholder={field.key}
                value={field.value}
                onChange={(e) =>
                  handleFieldChange(index, field.key, e.target.value)
                }
              />
            </div>
          ))}
          <button onClick={handleAddField}>Add Field</button>
        </form>
      </section>
    </main>
  );
}
