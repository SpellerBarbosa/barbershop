import mongoose, { Types, Document, Schema } from 'mongoose';

export interface IService extends Document {
    _id: Types.ObjectId;
    service: string;
    price: number;
    userId: Types.ObjectId;
    createdAt?: Date;
    updated?: Date;
}

const serviceSchema = new Schema(
    {
        service: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        userId: {
            type: Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model<IService>('Service', serviceSchema);

export default Service;