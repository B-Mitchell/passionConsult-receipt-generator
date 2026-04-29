'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReceiptForm from './components/ReceiptForm';
import Receipt from './components/Receipt';

export default function Home() {
  const [receiptData, setReceiptData] = useState(null);
  const [showReceiptPopup, setShowReceiptPopup] = useState(false);

  const handleGenerateReceipt = (data) => {
    setReceiptData(data);
    setShowReceiptPopup(true);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4">
              <Image
                src="/passion_logo.jpg"
                alt="Passion Consults logo"
                width={160}
                height={60}
                priority
              />
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Passion Consults Receipt Generator</h1>
                <p className="text-sm text-slate-600">Create, preview, and download professional receipts in one flow.</p>
              </div>
            </div>
          </div>
        </section>

        <ReceiptForm onGenerate={handleGenerateReceipt} />
      </div>

      {receiptData && showReceiptPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 md:p-6">
          <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-slate-200 md:p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Generated Receipt</h2>
              <button
                type="button"
                onClick={() => setShowReceiptPopup(false)}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <Receipt data={receiptData} />
          </div>
        </div>
      )}
    </main>
  );
}
