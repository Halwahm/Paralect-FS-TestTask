import { useEffect, useState } from 'react';
import JobTable from './components/JobTable';
import JobForm from './components/JobForm';
import { useJobs } from './context/JobContext';
import api from './services/api';
import { Job } from './types/job';

const App: React.FC = () => {
  const { dispatch } = useJobs();
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isFormVisible, setFormVisible] = useState(false);

  const fetchJobs = async () => {
    try {
      const { data } = await api.get('/jobs');
      const transformedData = data.data.map((job: Job) => ({
        _id: job._id,
        company: job.company,
        position: job.position,
        salaryRange: job.salaryRange || 'N/A',
        status: job.status,
        notes: job.notes || '',
      }));

      dispatch({ type: 'SET_JOBS', payload: transformedData });
    } catch (error) {
      console.error('Data load error:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      if (!id) throw new Error('Job ID is missing');
      await api.delete(`/jobs/${id}`);
      dispatch({ type: 'DELETE_JOB', payload: id });
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleSave = async (data: Omit<Job, '_id'>) => {
    try {
      if (editingJob) {
        const jobId = editingJob._id;
        if (!jobId) throw new Error('Job ID is missing for update');

        const { data: updatedJob } = await api.put(`/jobs/${editingJob._id}`, data);
        dispatch({ type: 'UPDATE_JOB', payload: updatedJob });
      } else {
        const { data: newJob } = await api.post('/jobs', data);
        dispatch({ type: 'ADD_JOB', payload: newJob });
      }
      setFormVisible(false);
      setEditingJob(null);
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleCancel = () => {
    setFormVisible(false);
    setEditingJob(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Job Management</h1>
      {!isFormVisible ? (
        <JobTable onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        <JobForm
          initialData={editingJob || {}}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default App;
