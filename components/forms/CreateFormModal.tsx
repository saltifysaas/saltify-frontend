"use client";

import { useState } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

interface CreateFormModalProps {
  onClose: () => void;
}

export default function CreateFormModal({ onClose }: CreateFormModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formName, setFormName] = useState("");
  const [tag, setTag] = useState("");
  const [layout, setLayout] = useState<"single" | "multi" | "card">("single");

  const handleCreate = () => {
    if (!formName.trim()) return alert("Please enter a form name");
    const newFormId = Date.now();
    window.location.href = `/forms/builder?id=${newFormId}&layout=${layout}&name=${encodeURIComponent(
      formName
    )}&tag=${encodeURIComponent(tag)}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full relative p-8">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-[#00332D] mb-2 text-center">
              Create a Form
            </h2>
            <p className="text-center text-gray-500 mb-8 max-w-md mx-auto">
              Start collecting data with powerful forms that use conditional logic,
              accept payments, generate reports, and automate workflows.
            </p>

            <div className="grid grid-cols-3 gap-5">
              <button
                onClick={() => setStep(2)}
                className="bg-[#F0F9F5] border-2 border-[#00332D] rounded-lg p-5 flex flex-col items-center hover:bg-[#e3f3eb] transition"
              >
                <div className="text-5xl text-[#00332D] mb-3">+</div>
                <div className="font-semibold text-[#00332D] text-sm">Start from scratch</div>
                <div className="text-xs text-gray-500">A blank slate is all you need</div>
              </button>

              <div className="bg-white border border-gray-300 rounded-lg p-5 text-center">
                <img src="/images/template-icon.png" alt="Template" className="mx-auto mb-3 w-16 h-16" />
                <div className="font-semibold text-sm text-[#00332D]">Use template</div>
                <div className="text-xs text-gray-500">Choose from 10,000+ premade forms</div>
              </div>

              <div className="bg-white border border-gray-300 rounded-lg p-5 text-center">
                <img src="/images/pdf-icon.png" alt="PDF" className="mx-auto mb-3 w-16 h-16" />
                <div className="font-semibold text-sm text-[#00332D]">Smart PDF Form</div>
                <div className="text-xs text-gray-500">Convert your PDF form to an online form</div>
              </div>

              <div className="bg-white border border-gray-300 rounded-lg p-5 text-center">
                <img src="/images/esign-icon.png" alt="E-sign" className="mx-auto mb-3 w-16 h-16" />
                <div className="font-semibold text-sm text-[#00332D]">E-sign forms</div>
                <div className="text-xs text-gray-500">Collect e-signatures with online forms</div>
              </div>

              <div className="bg-white border border-gray-300 rounded-lg p-5 text-center">
                <img src="/images/import-icon.png" alt="Import" className="mx-auto mb-3 w-16 h-16" />
                <div className="font-semibold text-sm text-[#00332D]">Import form</div>
                <div className="text-xs text-gray-500">Convert an existing form in seconds</div>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <button
              onClick={() => setStep(1)}
              className="text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              ← Back
            </button>

            <h2 className="text-xl font-bold text-[#00332D] mb-4">Select Form Layout</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div
                onClick={() => setStep(3) || setLayout("single")}
                className={clsx(
                  "cursor-pointer border p-4 rounded-lg text-center",
                  layout === "single" ? "border-[#00332D] bg-[#F0F9F5]" : "border-gray-300"
                )}
              >
                <img src="/images/layout-single.png" alt="Classic Form" className="mx-auto mb-2 w-16 h-16" />
                <div className="font-semibold text-[#00332D] mb-1">Classic Form</div>
                <div className="text-sm text-gray-500">Show all questions on one page</div>
              </div>
              <div
                onClick={() => setStep(3) || setLayout("multi")}
                className={clsx(
                  "cursor-pointer border p-4 rounded-lg text-center",
                  layout === "multi" ? "border-[#00332D] bg-[#F0F9F5]" : "border-gray-300"
                )}
              >
                <img src="/images/layout-multi.png" alt="Multi-step" className="mx-auto mb-2 w-16 h-16" />
                <div className="font-semibold text-[#00332D] mb-1">Multi-step Form</div>
                <div className="text-sm text-gray-500">Segment questions over steps</div>
              </div>
              <div
                onClick={() => setStep(3) || setLayout("card")}
                className={clsx(
                  "cursor-pointer border p-4 rounded-lg text-center",
                  layout === "card" ? "border-[#00332D] bg-[#F0F9F5]" : "border-gray-300"
                )}
              >
                <img src="/images/layout-card.png" alt="Card Form" className="mx-auto mb-2 w-16 h-16" />
                <div className="font-semibold text-[#00332D] mb-1">Card Form</div>
                <div className="text-sm text-gray-500">Single question per screen</div>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <button
              onClick={() => setStep(2)}
              className="text-sm text-gray-500 hover:text-gray-700 mb-4"
            >
              ← Back
            </button>

            <h2 className="text-xl font-bold text-[#00332D] mb-4">Form Details</h2>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Form Name"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Form Tag (optional)"
                className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>

            <button
              onClick={handleCreate}
              className="mt-4 w-full bg-[#00332D] text-white py-2 rounded-lg hover:bg-[#022b25] transition"
            >
              Continue to Builder
            </button>
          </>
        )}
      </div>
    </div>
  );
}
