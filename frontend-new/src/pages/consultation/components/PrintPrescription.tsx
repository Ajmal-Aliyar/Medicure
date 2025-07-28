import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import type { IViewPrescription } from "@/types/prescription";
import { Button } from "@/components/ui/Button";
import { formatDateToLong } from "@/utils/formatDate";
import { DEFAULT_IMAGE } from "@/app/constants";

interface Props {
  prescription: IViewPrescription;
}

export const PrescriptionPrinter = ({ prescription }: Props) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); 
    }
  };

  const handleDownload = () => {
    if (printRef.current) {
      html2pdf()
        .from(printRef.current)
        .set({
          margin: 10,
          filename: `${prescription.id.replace(/\s+/g, "_")}_prescription.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .save();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button  onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded">
          Print
        </Button>
        <Button variant="green" onClick={handleDownload} className="bg-green-600 text-white px-4 py-2 rounded">
          Download PDF
        </Button>
      </div>

      <div style={{ display: "none" }}>
        <div ref={printRef}>
          <PrintablePrescription prescription={prescription} />
        </div>
      </div>
    </div>
  );
};

const PrintablePrescription: React.FC<{ prescription: IViewPrescription }> = ({ prescription }) => {
  return (
    <div
                    className="prescription-container"
                    style={{
                        padding: "2rem",
                        fontFamily: "Arial, sans-serif",
                        color: "#000",
                        width: "100%",
                        maxWidth: "800px",
                        margin: "0 auto",
                        backgroundColor: "#fff",
                    }}
                >
                    <div className="flex justify-between mb-6">
                        <div>
                            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                                Dr. {prescription?.doctor.personal.fullName}
                            </p>
                            <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                                {prescription?.doctor.professional.specialization}
                            </p>
                            <p style={{ fontSize: "14px" }}>
                                Reg No: {prescription?.doctor.professional.registrationNumber}
                            </p>
                        </div>
    
                        <div style={{ textAlign: "right" }}>
                            <img
                                className="rounded-md"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                src={prescription?.doctor.personal.profileImage || DEFAULT_IMAGE}
                                alt="Doctor"
                            />
                            <p style={{ fontSize: "14px", marginTop: "8px" }}>
                                {prescription?.doctor.personal.email}
                            </p>
                            <p style={{ fontSize: "14px" }}>
                                Mob: {prescription?.doctor.personal.mobile}
                            </p>
                        </div>
                    </div>
    
                    <hr style={{ margin: "1rem 0" }} />
    
                    <div style={{ textAlign: "right", marginBottom: "1rem" }}>
                        <strong>Date:</strong>{" "}
                        {formatDateToLong(String(prescription?.appointment?.appointmentDate))}
                    </div>
    
                    <div style={{ marginBottom: "1rem" }}>
                        <p>
                            <strong>{prescription?.patient.personal.fullName}</strong> |{" "}
                            <strong>Mob:</strong> {prescription?.patient.personal.mobile}
                        </p>
                        <p style={{ fontWeight: "bold", marginTop: "0.5rem" }}>Address:</p>
                        <p style={{ fontSize: "14px" }}>
                            {prescription?.patient.contact?.address?.street},{" "}
                            {prescription?.patient.contact?.address?.city},{" "}
                            {prescription?.patient.contact?.address?.state},{" "}
                            {prescription?.patient.contact?.address?.country} -{" "}
                            {prescription?.patient.contact?.address?.pincode}
                        </p>
                        <p style={{ fontSize: "14px" }}>gmail: {prescription.patient.personal.email}</p>
                    </div>
    
                    <hr style={{ margin: "1rem 0" }} />
    
                    <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "1rem" }}>
                        Medical Prescription
                    </h2>
    
                    {prescription?.allergies.length > 0 && (
                        <p style={{ marginBottom: "4px" }}>
                            <strong>Allergies:</strong> {prescription?.allergies.join(", ")}
                        </p>
                    )}
                    {prescription?.diagnosis.length > 0 && (
                        <p style={{ marginBottom: "4px" }}>
                            <strong>Diagnosis:</strong> {prescription?.diagnosis.join(", ")}
                        </p>
                    )}
                    {prescription?.symptoms.length > 0 && (
                        <p style={{ marginBottom: "12px" }}>
                            <strong>Symptoms:</strong> {prescription?.symptoms.join(", ")}
                        </p>
                    )}
    
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "0.5rem" }}>
                        Medications:
                    </h3>
                    <ol style={{ paddingLeft: "1.2rem" }}>
                        {prescription?.medications.map((med, index) => (
                            <li
                                key={index}
                                style={{
                                    marginBottom: "0.8rem",
                                    padding: "0.5rem",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                }}
                            >
                                <p>
                                    <strong>Name:</strong> {med.medicineName}
                                </p>
                                <p>
                                    <strong>Dosage:</strong> {med.dosage}
                                </p>
                                <p>
                                    <strong>Duration:</strong> {med.duration}
                                </p>
                                <p>
                                    <strong>Frequency:</strong> {med.frequency}
                                </p>
                                <p>
                                    <strong>Quantity:</strong> {med.quantity}
                                </p>
                                <p>
                                    <strong>Refills:</strong> {med.refills}
                                </p>
                                {med.instructions && (
                                    <p>
                                        <strong>Instructions:</strong> {med.instructions}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ol>
    
                    {prescription?.notes && (
                        <>
                            <hr style={{ margin: "1rem 0" }} />
                            <p>
                                <strong>Additional Notes:</strong> {prescription?.notes}
                            </p>
                        </>
                    )}
    
                    {prescription?.followUpRequired && prescription.followUpDate && (
                        <p style={{ marginTop: "1rem" }}>
                            <strong>Follow-up Date:</strong>{" "}
                            {formatDateToLong(String(prescription.followUpDate))}
                        </p>
                    )}
    
                </div>
  );
};
