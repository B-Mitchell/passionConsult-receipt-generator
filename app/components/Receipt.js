/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function Receipt({ data }) {
  const receiptRef = useRef(null);

  const waitForReceiptImages = async () => {
    if (!receiptRef.current) return;

    const images = Array.from(receiptRef.current.querySelectorAll('img'));
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      }),
    );
  };

  const generateCanvas = async () => {
    if (!receiptRef.current) return null;
    await waitForReceiptImages();

    const target = receiptRef.current;

    return html2canvas(target, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      scrollY: -window.scrollY,
      windowWidth: target.scrollWidth,
      windowHeight: target.scrollHeight,
    });
  };

  const handleDownloadPDF = async () => {
    const canvas = await generateCanvas();
    if (!canvas) return;

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;

    let imgWidth = maxWidth;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight > maxHeight) {
      imgHeight = maxHeight;
      imgWidth = (canvas.width * imgHeight) / canvas.height;
    }

    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

    pdf.save('receipt.pdf');
  };

  const handleDownloadImage = async (format) => {
    const canvas = await generateCanvas();
    if (!canvas) return;

    const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const extension = format === 'jpg' ? 'jpg' : 'png';
    const quality = format === 'jpg' ? 0.95 : 1;

    const dataUrl = canvas.toDataURL(mimeType, quality);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `receipt.${extension}`;
    link.click();
  };

  const handlePrintReceipt = () => {
    if (!receiptRef.current) return;

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) return;

    const receiptHtml = receiptRef.current.innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt Print</title>
          <style>
            body {
              margin: 0;
              padding: 16px;
              font-family: Arial, Helvetica, sans-serif;
              color: #111827;
              background: #ffffff;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 12px;
            }
            th, td {
              border: 1px solid #94a3b8;
              padding: 8px;
              vertical-align: top;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>${receiptHtml}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="relative w-[794px] rounded-lg bg-white p-4 shadow-sm md:p-5" ref={receiptRef}>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
            <img src="/passion_logo.jpg" alt="Receipt watermark" className="h-full w-full object-contain" />
          </div>

          <div className="relative z-10 text-[12.5px] leading-[1.35]">
            <div className="mb-6 flex w-full items-start justify-between gap-4">
              <div>
                <img src="/passion_logo.jpg" alt="Passion Fort logo" className="h-[86px] w-auto object-contain" />
              </div>

              <div className="w-[20rem]">
                <h2 className="mb-1 text-end text-3xl font-bold text-blue-900 underline">Passion Fort</h2>
                <p className="text-end text-sm whitespace-normal">31 Ogunsola street oke ira ogba lagos</p>
                <p className="text-end text-sm">Tel: 08068989204</p>
                <p className="text-end text-sm">Alt: 0709528181</p>
              </div>
            </div>

            <table className="mb-4 w-full table-fixed border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border border-slate-400 px-4 py-1.5">CUSTOMER DETAILS</th>
                  <th className="border border-slate-400 px-4 py-1.5"></th>
                  <th className="border border-slate-400 px-2 py-1.5"></th>
                  <th className="border border-slate-400 px-4 py-1.5">{data.date}</th>
                  <th className="border border-slate-400 px-4 py-1.5"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 px-4 py-1.5">Name</td>
                  <td className="border border-slate-400 px-4 py-1.5 break-words">{data.customerName}</td>
                  <td className="border border-slate-400 px-2 py-1.5"></td>
                  <td className="border border-slate-400 px-4 py-1.5"></td>
                  <td className="border border-slate-400 px-2 py-1.5"></td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-1"></td>
                  <td className="border border-slate-400 px-4 py-1"></td>
                  <td className="border border-slate-400 px-2 py-1"></td>
                  <td className="border border-slate-400 px-4 py-1"></td>
                  <td className="border border-slate-400 px-2 py-1"></td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-1"></td>
                  <td className="border border-slate-400 px-4 py-1"></td>
                  <td className="border border-slate-400 px-2 py-1"></td>
                  <td className="border border-slate-400 px-4 py-1"></td>
                  <td className="border border-slate-400 px-2 py-1"></td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-1.5"></td>
                  <td className="border border-slate-400 px-4 py-1.5 text-center text-sm font-bold italic text-amber-600">
                    No return, No refund.
                  </td>
                  <td className="border border-slate-400 px-4 py-1.5"></td>
                  <td className="border border-slate-400 px-4 py-1.5"></td>
                  <td className="border border-slate-400 px-2 py-1.5"></td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-1">Kind Attn:</td>
                  <td className="border border-slate-400 px-4 py-1.5 break-words">{data.kindAttn}</td>
                  <td className="border border-slate-400 px-2 py-1.5"></td>
                  <td className="border border-slate-400 px-4 py-1.5"></td>
                  <td className="border border-slate-400 px-2 py-1.5"></td>
                </tr>
              </tbody>
            </table>

            <table className="mb-4 w-full table-fixed border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border border-slate-400 px-4 py-1.5"></th>
                  <th className="border border-slate-400 px-4 py-1.5">DESCRIPTION</th>
                  <th className="border border-slate-400 px-4 py-1.5">UNIT PRICE</th>
                  <th className="border border-slate-400 px-4 py-1.5">NET VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 px-4 py-1.5">MODEL</td>
                  <td className="border border-slate-400 px-4 py-1.5 break-words">{data.model}</td>
                  <td className="border border-slate-400 px-4 py-1.5 break-words">{data.unitPrice}</td>
                  <td className="border border-slate-400 px-4 py-1.5 break-words">{data.NetValue}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-1.5">TRIM</td>
                  <td className="border border-slate-400 px-4 py-1.5 break-words" colSpan={3}>{data.trim}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-1.5">TXMN</td>
                  <td className="border border-slate-400 px-4 py-1.5 break-words" colSpan={3}>{data.txmn}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-1.5">ENGINE</td>
                  <td className="border border-slate-400 px-4 py-1.5 break-words" colSpan={3}>{data.engine}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-1.5">CHASSIS</td>
                  <td className="border border-slate-400 px-4 py-1.5 break-words" colSpan={3}>{data.chassis}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-1.5">TOTAL AMOUNT PAID</td>
                  <td className="border border-slate-400 px-4 py-1.5"></td>
                  <td className="border border-slate-400 px-4 py-1.5"></td>
                  <td className="border border-slate-400 px-4 py-1.5 break-words">{data.totalAmountPaid}</td>
                </tr>
              </tbody>
            </table>

            {data.vehicleName && (
              <div className="mt-3 ml-5">
                <h3 className="my-1.5 text-xl font-bold">{data.vehicleName}</h3>
                <ul className="list-disc pl-6 text-sm leading-[1.3]">
                  <li>{data.vehicleInfo1}</li>
                  <li>{data.vehicleInfo2}</li>
                  <li>{data.vehicleInfo3}</li>
                </ul>
              </div>
            )}

            <div className="mb-6 mt-4">
              <p>Thank you</p>
              <div className="h-12"></div>
              <p className="uppercase">Oluwabusola Olajide</p>
              <p>Manager{`'`}s Signature</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="/toyotalogo.png" alt="Toyota logo" className="h-5 w-auto object-contain" />
                <img src="/fordLogo.png" alt="Ford logo" className="h-5 w-auto object-contain" />
                <img src="/hondalogo.jpg" alt="Honda logo" className="h-5 w-auto object-contain" />
                <img src="/nissanlogo.png" alt="Nissan logo" className="h-5 w-auto object-contain" />
                <img src="/mercedesBenz.png" alt="Mercedes logo" className="h-5 w-auto object-contain" />
              </div>
              <div className="ml-4 flex-1">
                <div className="border-b-2 border-black"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        <button
          onClick={handleDownloadPDF}
          className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Export PDF
        </button>
        <button
          onClick={() => handleDownloadImage('png')}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Export PNG
        </button>
        <button
          onClick={() => handleDownloadImage('jpg')}
          className="w-full rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Export JPG
        </button>
        {/* <button
          onClick={handlePrintReceipt}
          className="w-full rounded-lg bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
        >
          Print Receipt
        </button> */}
      </div>
    </div>
  );
}
