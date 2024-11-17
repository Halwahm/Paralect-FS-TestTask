import express, { Request, Response, NextFunction } from 'express';
import { getAllJobs, createJob, updateJob, deleteJob } from './job.service';
import { validate } from '../../middlewares/validate'
import { createJobSchema, updateJobSchema } from './job.validation';

const router = express.Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const jobs = await getAllJobs();
    res.status(200).json({ message: 'Jobs fetched successfully', data: jobs });
  })
);

router.post(
  '/',
  validate(createJobSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const job = await createJob(req.body);
    res.status(201).json({ message: 'Job created successfully', data: job });
  })
);

router.put(
  '/:id',
  validate(updateJobSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const updatedJob = await updateJob(req.params.id, req.body);
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job updated successfully', data: updatedJob });
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const deletedJob = await deleteJob(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully', data: deletedJob });
  })
);

module.exports = router;
