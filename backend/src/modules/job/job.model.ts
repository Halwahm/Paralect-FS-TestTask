import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  company: string;
  position: string;
  salaryRange?: string;
  status: 'Applied' | 'Interview' | 'Rejected' | 'Accepted';
  notes?: string;
}

const jobSchema: Schema = new Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    salaryRange: { type: String },
    status: { type: String, enum: ['Applied', 'Interview', 'Rejected', 'Accepted'], required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IJob>('Job', jobSchema);
