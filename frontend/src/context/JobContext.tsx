import React, { createContext, useReducer, useContext, ReactNode, useCallback } from 'react';
import { Job } from '../types/job';

type JobState = {
  jobs: Job[];
};

type JobAction =
  | { type: 'SET_JOBS'; payload: Job[] }
  | { type: 'ADD_JOB'; payload: Job }
  | { type: 'UPDATE_JOB'; payload: Job }
  | { type: 'DELETE_JOB'; payload: string };

const initialState: JobState = {
  jobs: [],
};

const jobReducer = (state: JobState, action: JobAction): JobState => {
  switch (action.type) {
    case 'SET_JOBS':
      return { jobs: action.payload };
    case 'ADD_JOB':
      return { jobs: [...state.jobs, action.payload] };
    case 'UPDATE_JOB':
      return {
        jobs: state.jobs.map((job) =>
          job._id === action.payload._id ? action.payload : job
        ),
      };
    case 'DELETE_JOB':
      return { jobs: state.jobs.filter((job) => job._id !== action.payload) };
    default:
      return state;
  }
};

const JobContext = createContext<{
  state: JobState;
  dispatch: React.Dispatch<JobAction>;
} | null>(null);

export const JobProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(jobReducer, initialState);
  const stableDispatch = useCallback(dispatch, []);

  return (
    <JobContext.Provider value={{ state, dispatch: stableDispatch }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used inside JobProvider');
  }
  return context;
};
