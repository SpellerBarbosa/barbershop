import mongoose, { Document, Schema } from "mongoose";

interface IAppointments extends Document {
  date: string;
  time: string;
  service: string;
}

const AppointmentsSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
});

const Appointments = mongoose.model<IAppointments>(
  "appointments",
  AppointmentsSchema
);

export default Appointments;
