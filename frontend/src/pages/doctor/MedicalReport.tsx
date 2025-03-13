"use client"

import { useState } from "react"
import { format } from "date-fns"

export default function MedicalRecordForm() {
  const [date, setDate] = useState<Date | null>(null)
  const [formData, setFormData] = useState({
    diagnosis: "",
    prescription: "",
    allergy: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ ...formData, dateOfExamination: date })
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 fixed bottom-10 right-10">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-2xl font-semibold">Medical Record Entry</h2>
        <p className="text-gray-600">Enter patient examination details</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        

        <div>
          <label className="block text-gray-700 font-medium">Diagnosis</label>
          <textarea
            name="diagnosis"
            placeholder="Enter detailed diagnosis"
            value={formData.diagnosis}
            onChange={handleInputChange}
            className="w-full p-2 border rounded min-h-[100px] focus:ring focus:ring-blue-200 "
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Prescription</label>
          <textarea
            name="prescription"
            placeholder="Enter prescription details"
            value={formData.prescription}
            onChange={handleInputChange}
            className="w-full p-2 border rounded min-h-[100px] focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Allergies</label>
          <textarea
            name="allergy"
            placeholder="Enter patient allergies"
            value={formData.allergy}
            onChange={handleInputChange}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Date of Examination</label>
          <input
            type="date"
            value={date ? format(date, "yyyy-MM-dd") : ""}
            onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : null)}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          />
        </div>
      </form>
    </div>
  )
}
