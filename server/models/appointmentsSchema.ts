import mongoose, {Types, Document, Schema } from "mongoose";

interface IAppointments extends Document {
  date: Date;
  service: string;
  time: string;
  price: number;
  userId:Types.ObjectId;
}

const AppointmentsSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  userId:{
    type: String,
    required: true
  }
});

const Appointments = mongoose.model<IAppointments>(
  "appointments",
  AppointmentsSchema
);

export default Appointments;
