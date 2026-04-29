import { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import toyotaImg from '../../public/toyotalogo.png';
import fordImg from '../../public/fordLogo.png';
import hondaImg from '../../public/hondalogo.jpg';
import nissanImg from '../../public/nissanlogo.png';
import mercedesImg from '../../public/mercedesBenz.png';

export default function Receipt({ data }) {
  const receiptRef = useRef(null);

  const generateCanvas = async () => {
    if (!receiptRef.current) return null;

    return html2canvas(receiptRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
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

    const pageWidth = 210;
    const pageHeight = 297;
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight <= pageHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    }

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
        <div className="relative min-w-[44rem] overflow-hidden rounded-lg bg-white p-4 shadow-sm md:p-6" ref={receiptRef}>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 opacity-[0.045]">
            <Image src="/passion_logo.jpg" alt="Receipt watermark" fill sizes="360px" className="object-contain" />
          </div>

          <div className="relative z-10">
            <div className="mb-8 flex w-full items-center justify-between gap-4">
              <div>
                <Image src="/passion_logo.jpg" width={200} height={40} alt="Passion Consults logo" />
              </div>

              <div className="w-[20rem]">
                <h2 className="mb-1 text-end text-3xl font-bold text-blue-900 underline">Passion Consults</h2>
                <p className="text-end text-sm whitespace-normal">31 Ogunsola street oke ira ogba lagos</p>
                <p className="text-end text-sm">Tel: 08068989204</p>
                <p className="text-end text-sm">Alt: 0709528181</p>
              </div>
            </div>

            <table className="mb-6 w-full table-fixed border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border border-slate-400 px-4 py-2">CUSTOMER DETAILS</th>
                  <th className="border border-slate-400 px-4 py-2"></th>
                  <th className="border border-slate-400 px-2 py-2"></th>
                  <th className="border border-slate-400 px-4 py-2">{data.date}</th>
                  <th className="border border-slate-400 px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 px-4 py-2">Name</td>
                  <td className="border border-slate-400 px-4 py-2 break-words">{data.customerName}</td>
                  <td className="border border-slate-400 px-2 py-2"></td>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-2 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-2 py-2"></td>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-2 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-2 py-2"></td>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-2 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-4 py-2 text-center text-sm font-bold italic text-amber-600">
                    No return, No refund.
                  </td>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-2 py-2"></td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-1">Kind Attn:</td>
                  <td className="border border-slate-400 px-4 py-2 break-words">{data.kindAttn}</td>
                  <td className="border border-slate-400 px-2 py-2"></td>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-2 py-2"></td>
                </tr>
              </tbody>
            </table>

            <table className="mb-6 w-full table-fixed border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border border-slate-400 px-4 py-2"></th>
                  <th className="border border-slate-400 px-4 py-2">DESCRIPTION</th>
                  <th className="border border-slate-400 px-4 py-2">UNIT PRICE</th>
                  <th className="border border-slate-400 px-4 py-2">NET VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-slate-400 px-4 py-2">MODEL</td>
                  <td className="border border-slate-400 px-4 py-2 break-words">{data.model}</td>
                  <td className="border border-slate-400 px-4 py-2 break-words">{data.unitPrice}</td>
                  <td className="border border-slate-400 px-4 py-2 break-words">{data.NetValue}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-2">TRIM</td>
                  <td className="border border-slate-400 px-4 py-2 break-words" colSpan={3}>{data.trim}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-2">TXMN</td>
                  <td className="border border-slate-400 px-4 py-2 break-words" colSpan={3}>{data.txmn}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-2">ENGINE</td>
                  <td className="border border-slate-400 px-4 py-2 break-words" colSpan={3}>{data.engine}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-2">CHASSIS</td>
                  <td className="border border-slate-400 px-4 py-2 break-words" colSpan={3}>{data.chassis}</td>
                </tr>
                <tr>
                  <td className="border border-slate-400 px-4 py-2">TOTAL AMOUNT PAID</td>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-4 py-2"></td>
                  <td className="border border-slate-400 px-4 py-2 break-words">{data.totalAmountPaid}</td>
                </tr>
              </tbody>
            </table>

            {data.vehicleName && (
              <div className="mt-4 ml-5">
                <h3 className="my-2 text-xl font-bold">{data.vehicleName}</h3>
                <ul className="list-disc pl-6 text-sm">
                  <li>{data.vehicleInfo1}</li>
                  <li>{data.vehicleInfo2}</li>
                  <li>{data.vehicleInfo3}</li>
                </ul>
              </div>
            )}

            <div className="mb-10 mt-6">
              <p>Thank you</p>
              <br />
              <br />
              <br />
              <p className="uppercase">Oluwabusola Olajide</p>
              <p>Manager{`'`}s Signature</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image src={toyotaImg} width={60} height={20} alt="Toyota logo" />
                <Image src={fordImg} width={60} height={20} alt="Ford logo" />
                <Image src={hondaImg} width={60} height={20} alt="Honda logo" />
                <Image src={nissanImg} width={60} height={20} alt="Nissan logo" />
                <Image src={mercedesImg} width={90} height={20} alt="Mercedes logo" />
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
