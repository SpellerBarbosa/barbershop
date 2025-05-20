import mongoose, {Types, Document, Schema } from "mongoose";

export interface IAppointments extends Document {
  date: Date;
  service: string;
  time: string;
  price: number;
  status: string;
  userId:Types.ObjectId;
}

const AppointmentsSchema = new Schema({
  date: {
    type: Date,
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
  status:{
    type: String,
    default: 'pendente'
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
