import { model, Schema } from "mongoose";
import { IMedication, IPrescription } from "../interfaces";

const medicationSchema = new Schema<IMedication>({
  medicineId: {
    type: String,
    default: null
  },
  medicineName: {
    type: String,
    required: [true, "Medicine name is required"],
    trim: true
  },
  dosage: {
    type: String,
    required: [true, "Dosage is required"],
    trim: true,
    validate: {
      validator: function(dosage: string) {
        return /^\d+(\.\d+)?\s*(mg|ml|g|mcg|units?|tablets?|capsules?)$/i.test(dosage);
      },
      message: "Dosage must include quantity and unit (e.g., 500mg, 10ml)"
    }
  },
  frequency: {
    type: String,
    required: [true, "Frequency is required"],
    trim: true
  },
  duration: {
    type: String,
    required: [true, "Duration is required"],
    trim: true,
    validate: {
      validator: function(duration: string) {
        return /^\d+\s+(days?|weeks?|months?)$/i.test(duration);
      },
      message: "Duration must be in format like '7 days', '2 weeks', '1 month'"
    }
  },
  instructions: {
    type: String,
    required: [true, "Instructions are required"],
    trim: true,
    maxlength: [500, "Instructions cannot exceed 500 characters"]
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"]
  },
  refills: {
    type: Number,
    default: 0,
    min: [0, "Refills cannot be negative"],
    max: [12, "Maximum 12 refills allowed"]
  }
}, { _id: false });

const prescriptionSchema = new Schema<IPrescription>(
  {
    prescriptionNumber: {
      type: String,
      required: [true, "Prescription number is required"],
      unique: true,
      trim: true,
      uppercase: true
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor ID is required"],
      index: true
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient ID is required"],
      index: true
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      index: true
    },
    medications: {
      type: [medicationSchema],
      default: []
    },
    diagnosis: {
      type: [String],
      default: []
    },
    symptoms: {
      type: [String],
      default: []
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"]
    },
    issuedDate: {
      type: Date,
      required: [true, "Issued date is required"],
      default: Date.now
    },
    validUntil: {
      type: Date,
      required: [true, "Valid until date is required"],
    },

    followUpRequired: {
      type: Boolean,
      default: false
    },
    followUpDate: {
      type: Date,
      validate: {
        validator: function(this: IPrescription, followUpDate: Date) {
          return !this.followUpRequired || followUpDate;
        },
        message: "Follow-up date is required when follow-up is marked as required"
      }
    },

    allergies: {
      type: [String],
      default: []
    },
  },
  {
    timestamps: true,
  }
);

prescriptionSchema.index({ doctorId: 1, issuedDate: -1 });
prescriptionSchema.index({ patientId: 1, issuedDate: -1 });
prescriptionSchema.index({ status: 1, validUntil: 1 });
prescriptionSchema.index({ isControlledSubstance: 1, status: 1 });

export const PrescriptionModel = model<IPrescription>(
  "Prescription",
  prescriptionSchema
);