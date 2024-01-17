"use client";
import React, { MouseEvent, useEffect, useState } from "react";
import Papa from 'papaparse'

interface FormField {
  Name: string;
  AccountNumber: string;
  Role: string;
  BankName: string;
  Amount: string;
}

const initialFormFields: FormField = {
  Name: "",
  AccountNumber: "",
  Role: "",
  BankName: "",
  Amount: "",
};

export default function Page() {
  const [formFields, setFormFields] = useState<FormField[]>([
    initialFormFields,
  ]);
  const [formData, setFormData] = useState<string | undefined>(undefined);

  const handleAddField = (e: MouseEvent<HTMLButtonElement>) => {
    const addNewFields = [...formFields, initialFormFields];
    setFormFields(addNewFields);
  };

  const handleChange = (index: number, fieldName:string, value: string) => {
    const newFormFields = [...formFields];
    newFormFields[index] = { ...newFormFields[index], [fieldName]: value };
    setFormFields(newFormFields);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // setFormData(JSON.stringify(formFields, null, 2))
    // setFormData(formFields)
    const toCSV = Papa.unparse(formFields)

    const blob = new Blob([toCSV] , { type: 'text/csv'})

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url;
    a.download = 'formData.csv';

    document.body.appendChild(a);
  a.click();

  // Remove the anchor from the body
  document.body.removeChild(a);

  // Revoke the URL to free up resources
  URL.revokeObjectURL(url);
     
  }
  return (
    <main className="flex min-h-screen flex-col items-stretch gap-5 p-5 md:p-24 bg-slate-50 text-teal-900">
      <section className="max-w-2xl w-full mx-auto">
        <h2>Form Fields:</h2>
        <form>
          {formFields.map((field, index) => (
            <div className="mb-8" key={index}>
              <p className="text-center">User {index+1}</p>
              <div className="flex flex-col">
                <label
                  htmlFor="Name"
                  className="text-teal-900 text-xs font-medium block pl-3"
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="Name"
                  value={formFields[index].Name}
                  onChange={(e) => handleChange(index, "Name", e.target.value)}
                  className="border border-solid border-deep-green-50 rounded-[10px] w-full bg-[#FCFFFE] px-3 py-2 text-xs text-deep-green-100 placeholder:text-light-text outline-none placeholder:font-normal font-semibold"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="AccountNumber"
                  className="text-teal-900 text-xs font-medium block pl-3"
                >
                  Account Number:
                </label>
                <input
                  type="text"
                  name="AccountNumber"
                  value={formFields[index].AccountNumber}
                  onChange={(e) =>
                    handleChange(index, "AccountNumber", e.target.value)
                  }
                  className="border border-solid border-deep-green-50 rounded-[10px] w-full bg-[#FCFFFE] px-3 py-2 text-xs text-deep-green-100 placeholder:text-light-text outline-none placeholder:font-normal font-semibold"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="Role"
                  className="text-teal-900 text-xs font-medium block pl-3"
                >
                  Role:
                </label>
                <input
                  type="text"
                  name="Role"
                  value={formFields[index].Role}
                  onChange={(e) => handleChange(index, "Role", e.target.value)}
                  className="border border-solid border-deep-green-50 rounded-[10px] w-full bg-[#FCFFFE] px-3 py-2 text-xs text-deep-green-100 placeholder:text-light-text outline-none placeholder:font-normal font-semibold"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="BankName"
                  className="text-teal-900 text-xs font-medium block pl-3"
                >
                  Bank Name:
                </label>
                <input
                  type="text"
                  name="BankName"
                  value={formFields[index].BankName}
                  onChange={(e) =>
                    handleChange(index, "BankName", e.target.value)
                  }
                  className="border border-solid border-deep-green-50 rounded-[10px] w-full bg-[#FCFFFE] px-3 py-2 text-xs text-deep-green-100 placeholder:text-light-text outline-none placeholder:font-normal font-semibold"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="Amount"
                  className="text-teal-900 text-xs font-medium block pl-3"
                >
                  Amount:
                </label>
                <input
                  type="text"
                  name="Amount"
                  value={formFields[index].Amount}
                  onChange={(e) =>
                    handleChange(index, "Amount", e.target.value)
                  }
                  className="border border-solid border-deep-green-50 rounded-[10px] w-full bg-[#FCFFFE] px-3 py-2 text-xs text-deep-green-100 placeholder:text-light-text outline-none placeholder:font-normal font-semibold"
                />
              </div>
            </div>
          ))}
          <button
            onClick={handleAddField}
            type="button"
            className="bg-teal-900 w-full text-center rounded-[10px] px-3 py-2 text-sm font-bold text-white"
          >
            Add Field
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-teal-900 w-full mt-4 text-center rounded-[10px] px-3 py-2 text-sm font-bold text-white"
          >
            Save now
          </button>
        </form>
      </section>
      <section>
        {
          formData && (
            <div>
              {formData}
            </div>
          )
        }
      </section>
    </main>
  );
}
