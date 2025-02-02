'use client'
import { useState } from "react";
import ReceiptForm from "./components/ReceiptForm";
import Receipt from "./components/Receipt";
import Image from "next/image"
import logo from "../public/logo.jpg";

export default function Home() {
  const [receiptData, setReceiptData] = useState(null);

  return (
    <div className="min-h-screen">
      <Image src={logo} alt="logo" width={120} height={30} className="block m-auto"/>
      <hr/>
      {/* <h1 className="text-3xl font-bold text-center mb-6">Passion Consults Receipt Generator</h1> */}
      <ReceiptForm onGenerate={setReceiptData} />
      {receiptData && <Receipt data={receiptData} />}
    </div>
  );
}
