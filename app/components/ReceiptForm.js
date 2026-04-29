import { useMemo, useState } from 'react';

const fieldGroups = [
  {
    title: 'Customer Details',
    subtitle: 'Who the receipt is for',
    fields: [
      { label: 'Customer Name', key: 'customerName', placeholder: 'e.g. Adebayo Johnson', icon: 'user' },
      { label: 'Kind Attn', key: 'kindAttn', placeholder: 'e.g. Procurement Unit', icon: 'briefcase' },
      { label: 'Date', key: 'date', type: 'date', placeholder: '', icon: 'calendar' },
    ],
  },
  {
    title: 'Vehicle Details',
    subtitle: 'Vehicle and specification info',
    fields: [
      { label: 'Model', key: 'model', placeholder: 'e.g. Toyota Camry 2020', icon: 'car' },
      { label: 'Trim', key: 'trim', placeholder: 'e.g. XLE', icon: 'tag' },
      { label: 'TXMN', key: 'txmn', placeholder: 'e.g. Automatic', icon: 'settings' },
      { label: 'Engine', key: 'engine', placeholder: 'e.g. 2.5L 4-Cylinder', icon: 'chip' },
      { label: 'Chassis', key: 'chassis', placeholder: 'e.g. JTNB11HK2K3001234', icon: 'shield' },
      { label: 'Vehicle Name', key: 'vehicleName', placeholder: 'e.g. 2020 Toyota Camry', icon: 'car' },
      { label: 'Vehicle Info 1', key: 'vehicleInfo1', placeholder: 'e.g. Foreign used, first body', icon: 'list' },
      { label: 'Vehicle Info 2', key: 'vehicleInfo2', placeholder: 'e.g. Accident free', icon: 'list' },
      { label: 'Vehicle Info 3', key: 'vehicleInfo3', placeholder: 'e.g. Duty fully paid', icon: 'list' },
    ],
  },
  {
    title: 'Payment Details',
    subtitle: 'Pricing and amount paid',
    fields: [
      { label: 'Unit Price', key: 'unitPrice', placeholder: 'e.g. NGN 18,500,000', icon: 'money' },
      { label: 'Net Value', key: 'NetValue', placeholder: 'e.g. NGN 18,500,000', icon: 'wallet' },
      { label: 'Total Amount Paid', key: 'totalAmountPaid', placeholder: 'e.g. NGN 18,500,000', icon: 'receipt' },
    ],
  },
];

const initialFormData = {
  customerName: '',
  kindAttn: '',
  model: '',
  trim: '',
  txmn: '',
  engine: '',
  chassis: '',
  unitPrice: '',
  NetValue: '',
  totalAmountPaid: '',
  date: '',
  vehicleName: '',
  vehicleInfo1: '',
  vehicleInfo2: '',
  vehicleInfo3: '',
};

function Icon({ type }) {
  const common = 'h-4 w-4 text-slate-500';

  if (type === 'user') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'briefcase') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <rect x="3" y="7" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  if (type === 'calendar') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'car') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M4 14h16l-1.5-4.5a2 2 0 0 0-1.9-1.4H7.4a2 2 0 0 0-1.9 1.4L4 14Z" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="7.5" cy="16.5" r="1.5" fill="currentColor" />
        <circle cx="16.5" cy="16.5" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'money' || type === 'wallet') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'receipt') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M7 3h10v18l-2-1.3L13 21l-2-1.3L9 21l-2-1.3L5 21V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 8h6M9 12h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'settings') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
        <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1 1a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.4 0l-1-1a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1 1 0 0 1-1-1v-1.5a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.4l1-1a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 1 1v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 0l1 1a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.9.6Z" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }

  if (type === 'chip') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10 10h4v4h-4z" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M12 3 5 6v6c0 5 3.5 7.8 7 9 3.5-1.2 7-4 7-9V6l-7-3Z" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }

  if (type === 'list' || type === 'tag') {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden="true">
        <path d="M8 7h12M8 12h12M8 17h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="4.5" cy="7" r="1" fill="currentColor" />
        <circle cx="4.5" cy="12" r="1" fill="currentColor" />
        <circle cx="4.5" cy="17" r="1" fill="currentColor" />
      </svg>
    );
  }

  return null;
}

export default function ReceiptForm({ onGenerate }) {
  const [formData, setFormData] = useState(initialFormData);
  const [showTips, setShowTips] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const completion = useMemo(() => {
    const values = Object.values(formData);
    const filled = values.filter((value) => String(value).trim().length > 0).length;
    return Math.round((filled / values.length) * 100);
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      date: formData.date || new Date().toISOString().split('T')[0],
    };

    onGenerate(payload);
    setShowSavedToast(true);
    window.setTimeout(() => setShowSavedToast(false), 2400);
  };

  return (
    <section className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Receipt Form</h2>
          <p className="text-sm text-slate-600">Smart, guided form for fast receipt generation.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="min-w-[130px]">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Progress</p>
            <div className="h-2 rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${completion}%` }} />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowTips(true)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Quick Help
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {fieldGroups.map((group) => (
          <div key={group.title} className="rounded-xl border border-slate-200 p-4 md:p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">{group.title}</h3>
              <p className="text-xs text-slate-500">{group.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {group.fields.map(({ label, key, type = 'text', placeholder = '', icon }) => (
                <label key={key} className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                  {label}
                  <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 transition focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200">
                    <Icon type={icon} />
                    <input
                      required
                      type={type}
                      placeholder={placeholder}
                      className="w-full border-0 p-0 text-slate-900 outline-none placeholder:text-slate-400"
                      value={formData[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                    />
                  </div>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-3 md:flex-row md:justify-end">
          <button
            type="button"
            onClick={() => setFormData(initialFormData)}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Generate Receipt
          </button>
        </div>
      </form>

      {showSavedToast && (
        <div className="pointer-events-none fixed bottom-6 right-6 z-50 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg">
          Receipt preview updated successfully.
        </div>
      )}

      {showTips && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-2xl">
            <h4 className="text-lg font-semibold text-slate-900">Quick Form Tips</h4>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
              <li>Use full names for Customer Name and Kind Attn.</li>
              <li>Enter money fields with currency labels, e.g. NGN 18,500,000.</li>
              <li>Vehicle info lines are printed as bullet points on the receipt.</li>
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowTips(false)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
