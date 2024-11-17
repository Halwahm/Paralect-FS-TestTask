import Job, { IJob } from './job.model';
import { Error } from 'mongoose';

class ServiceError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ServiceError';
  }
}

export const getAllJobs = async (): Promise<IJob[]> => {
  try {
    return await Job.find();
  } catch (error) {
    throw new ServiceError(500, 'Failed to fetch jobs');
  }
};

export const createJob = async (data: Partial<IJob>): Promise<IJob> => {
  try {
    if (!data.company || !data.position || !data.status) {
      throw new ServiceError(400, 'Required fields are missing');
    }
    return await Job.create(data);
  } catch (error) {
    if (error instanceof Error.ValidationError) {
      throw new ServiceError(400, 'Validation error: Invalid data provided');
    }
    throw new ServiceError(500, 'Failed to create job');
  }
};

export const updateJob = async (id: string, data: Partial<IJob>): Promise<IJob | null> => {
  try {
    const job = await Job.findByIdAndUpdate(id, data, { new: true });
    if (!job) {
      throw new ServiceError(404, `Job with id ${id} not found`);
    }
    return job;
  } catch (error) {
    if (error instanceof Error.CastError) {
      throw new ServiceError(400, 'Invalid job ID format');
    }
    throw new ServiceError(500, 'Failed to update job');
  }
};

export const deleteJob = async (id: string): Promise<IJob | null> => {
  try {
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      throw new ServiceError(404, `Job with id ${id} not found`);
    }
    return job;
  } catch (error) {
    if (error instanceof Error.CastError) {
      throw new ServiceError(400, 'Invalid job ID format');
    }
    throw new ServiceError(500, 'Failed to delete job');
  }
};
