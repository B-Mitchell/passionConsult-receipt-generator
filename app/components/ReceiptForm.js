import { useState } from "react";

export default function ReceiptForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    customerName: "",
    kindAttn: "",
    model: "",
    trim: "",
    txmn: "",
    engine: "",
    chassis: "",
    unitPrice: "",
    NetValue: "",
    totalAmountPaid: "",
    date: "", // Date is now set to an empty string for manual input
    vehicleName: "", // New field for vehicle name
    vehicleInfo1: "", // New field for additional vehicle info
    vehicleInfo2: "", // New field for additional vehicle info
    vehicleInfo3: "", // New field for additional vehicle info
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    // <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    //   <form onSubmit={handleSubmit} >
    //     <label className="block mb-2">Customer Name:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.customerName}
    //       onChange={(e) => handleChange("customerName", e.target.value)}
    //     />

    //     <label className="block mb-2">Kind Attn:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.kindAttn}
    //       onChange={(e) => handleChange("kindAttn", e.target.value)}
    //     />

    //     <label className="block mb-2">Model:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.model}
    //       onChange={(e) => handleChange("model", e.target.value)}
    //     />

    //     <label className="block mb-2">Trim:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.trim}
    //       onChange={(e) => handleChange("trim", e.target.value)}
    //     />

    //     <label className="block mb-2">TXMN:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.txmn}
    //       onChange={(e) => handleChange("txmn", e.target.value)}
    //     />

    //     <label className="block mb-2">Engine:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.engine}
    //       onChange={(e) => handleChange("engine", e.target.value)}
    //     />

    //     <label className="block mb-2">Chassis:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.chassis}
    //       onChange={(e) => handleChange("chassis", e.target.value)}
    //     />

    //     <label className="block mb-2">Unit price:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.unitPrice}
    //       onChange={(e) => handleChange("unitPrice", e.target.value)}
    //     />

    //     <label className="block mb-2">Net Value:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.NetValue}
    //       onChange={(e) => handleChange("NetValue", e.target.value)}
    //     />

    //     <label className="block mb-2">Total Amount Paid:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.totalAmountPaid}
    //       onChange={(e) => handleChange("totalAmountPaid", e.target.value)}
    //     />

    //     <label className="block mb-2">Date:</label>
    //     <input 
    //     required
    //       type="date"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.date}
    //       onChange={(e) => handleChange("date", e.target.value)}
    //     />

    //     {/* New vehicle name and vehicle info fields */}
    //     <label className="block mb-2">Vehicle Name:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.vehicleName}
    //       onChange={(e) => handleChange("vehicleName", e.target.value)}
    //     />

    //     <label className="block mb-2">Vehicle Info 1:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.vehicleInfo1}
    //       onChange={(e) => handleChange("vehicleInfo1", e.target.value)}
    //     />

    //     <label className="block mb-2">Vehicle Info 2:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.vehicleInfo2}
    //       onChange={(e) => handleChange("vehicleInfo2", e.target.value)}
    //     />

    //     <label className="block mb-2">Vehicle Info 3:</label>
    //     <input 
    //     required
    //       type="text"
    //       className="w-full p-2 border rounded-md mb-4 outline-none"
    //       value={formData.vehicleInfo3}
    //       onChange={(e) => handleChange("vehicleInfo3", e.target.value)}
    //     />

    //     <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 w-full">
    //       Generate Receipt
    //     </button>
    //   </form>
    // </div>
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Receipt Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Customer Name", key: "customerName" },
          { label: "Kind Attn", key: "kindAttn" },
          { label: "Model", key: "model" },
          { label: "Trim", key: "trim" },
          { label: "TXMN", key: "txmn" },
          { label: "Engine", key: "engine" },
          { label: "Chassis", key: "chassis" },
          { label: "Unit Price", key: "unitPrice" },
          { label: "Net Value", key: "NetValue" },
          { label: "Total Amount Paid", key: "totalAmountPaid" },
          { label: "Vehicle Name", key: "vehicleName" },
          { label: "Vehicle Info 1", key: "vehicleInfo1" },
          { label: "Vehicle Info 2", key: "vehicleInfo2" },
          { label: "Vehicle Info 3", key: "vehicleInfo3" },
        ].map(({ label, key }) => (
          <div key={key} className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">{label}:</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
              value={formData[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </div>
        ))}

        {/* Date Field */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-gray-700 font-medium mb-1">Date:</label>
          <input
            type="date"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300"
          >
            Generate Receipt
          </button>
        </div>
      </form>
    </div>
  );
}
