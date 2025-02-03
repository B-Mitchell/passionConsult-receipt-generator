import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import toyotaImg from "../../public/toyotalogo.png"
import fordImg from "../../public/fordLogo.png"
import hondaImg from "../../public/hondalogo.jpg"
import nissanImg from "../../public/nissanlogo.png"
import mercedesImg from "../../public/mercedesBenz.png"

export default function Receipt({ data }) {
  const receiptRef = useRef();
const handleDownloadPDF = async () => {
    const canvas = await html2canvas(receiptRef.current, { scale: 2 }); // Higher scale improves resolution
    const imgData = canvas.toDataURL("image/png");
  
    const pdf = new jsPDF({
      orientation: "p", // Portrait mode
      unit: "mm",
      format: "a4", // Standard A4 size
    });
  
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("receipt.pdf");
  };

  return (
    <div className="min-w-[44rem] shadow-2xl mx-auto bg-white p-6 rounded-lg mt-6 whitespace-nowrap">
      <div ref={receiptRef} className="p-4 rounded-md block min-w-[40rem]">
        <div className="flex justify-between w-[100%] align-middle items-center mb-8">
          <div>
            <Image src={logo} width={200} height={40} alt="logo" />
          </div>

          <div className="w-[20rem]">
            <h2 className="text-3xl text-end font-bold mb-1 text-blue-900 underline">Passion Consults</h2>
            <p className="text-sm text-end whitespace-normal">Tinubu market old ipaja road, adjacent grand ovation event center</p>
            <p className="text-sm text-end">Tel: +234 806 898 9204</p>
          </div>
        </div>

        <br />
        <br />
        <table className="w-full table-fixed mb-6">
        <thead>
            <tr>
            <th className="border px-4 py-2">CUSTOMER DETAILS</th>
            <th className="border px-4 py-2"></th>
            <th className="border px-2 py-2"></th>
            <th className="border px-4 py-2">{data.date}</th>
            <th className="border px-4 py-2"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="border px-4 py-2">Name</td>
                <td className="border px-4 py-2">{data.customerName}</td>
                <td className="border px-2 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-2 py-2"></td>
            </tr>
            <tr>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-2 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-2 py-2"></td>
            </tr>
            <tr>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-2 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-2 py-2"></td>
            </tr>
            <tr>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2 text-center italic text-[#dd8a2c] font-bold text-sm">No return, No refund.</td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-2 py-2"></td>
            </tr>
            <tr>
                <td className="border px-4 py-1">Kind Attn:</td>
                <td className="border px-4 py-2"></td>
                <td className="border px-2 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-2 py-2"></td>
            </tr>
        </tbody>
        </table>

        {/* Vehicle Info Table */}
        <table className="w-full mb-6 table-fixed">
          <thead>
            <tr>
              <th className="border px-4 py-2"></th>
              <th className="border px-4 py-2">DESCRIPTION</th>
              <th className="border px-4 py-2">UNIT PRICE</th>
              <th className="border px-4 py-2">NET VALUE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">MODEL</td>
              <td className="border px-4 py-2">{data.model}</td>
              <td className="border px-4 py-2">{data.unitPrice}</td>
              <td className="border px-4 py-2">{data.NetValue}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">TRIM</td>
              <td className="border px-4 py-2">{data.trim}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">TXMN</td>
              <td className="border px-4 py-2">{data.txmn}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">ENGINE</td>
              <td className="border px-4 py-2">{data.engine}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">CHASSIS</td>
              <td className="border px-4 py-2">{data.chassis}</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
            </tr>
            <tr>
              <td className="border px-4 py-2">TOTAL AMOUNT PAID</td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2">{data.totalAmountPaid}</td>
            </tr>
          </tbody>
        </table>

        {/* Vehicle Name and Info Section */}
        {data.vehicleName && (
          <div className="mt-4 ml-5">
            <h3 className="text-xl font-bold my-2">{data.vehicleName}</h3>
            <ul className="list-disc pl-6">
              <li>{data.vehicleInfo1}</li>
              <li>{data.vehicleInfo2}</li>
              <li>{data.vehicleInfo3}</li>
            </ul>
          </div>
        )}
        <br />
        <br />
        <div className="mt-6 mb-10">
            <p >Thank you</p>
            <br />
            <br />
            <br />
            <p className="uppercase">Oluwabusola Olajide</p>
            <p >Manager{`'`}s Signature</p>
        </div>
        <br />
        <br />
        <div className="flex justify-between items-center">
            {/* Logos Section */}
            <div className="flex gap-4 items-center">
                <Image src={toyotaImg} width={60} height={20} alt="Toyota logo" />
                <Image src={fordImg} width={60} height={20} alt="Ford logo" />
                <Image src={hondaImg} width={60} height={20} alt="Honda logo" />
                <Image src={nissanImg} width={60} height={20} alt="Nissan logo" />
                <Image src={mercedesImg} width={90} height={20} alt="Mercedes logo" />
            </div>

            {/* Divider Section */}
            <div className="flex-1 ml-4">
                <div className="border-black border-b-2"></div>
            </div>
        </div>

      </div>
      <button
        onClick={handleDownloadPDF}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full"
      >
        Download PDF
      </button>
    </div>
  );
}
