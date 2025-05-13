import mongoose, { Document, mongo, Schema } from "mongoose";

interface IWorkingHours extends Document {
  dayOfWeek: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  lunchBreakStart: string;
  lunchBreakEnd: string;
}

const workingHoursSchema = new Schema({
  dayOfWeek: {
    type: Number,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  openTime: {
    type: String,
    required: true,
  },
  closeTime: {
    type: String,
    required: true,
  },
  lunchBreakStart: {
    type: String,
    required: true,
  },
  lunchBreakEnd: {
    type: String,
    required: true,
  },
});

const WokingHours = mongoose.model<IWorkingHours>(
  "workinghours",
  workingHoursSchema
);

export default WokingHours;
