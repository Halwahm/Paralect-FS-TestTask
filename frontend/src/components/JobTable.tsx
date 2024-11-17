import { Job } from '../types/job';
import { useJobs } from '../context/JobContext';

type Props = {
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
};

const JobTable: React.FC<Props> = ({ onEdit, onDelete }) => {
  const { state } = useJobs();

  if (!state.jobs.length) {
    return <p className="text-center">No jobs available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 border border-gray-300 text-left">Company</th>
            <th className="p-4 border border-gray-300 text-left">Position</th>
            <th className="p-4 border border-gray-300 text-left">Salary Range</th>
            <th className="p-4 border border-gray-300 text-left">Status</th>
            <th className="p-4 border border-gray-300 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.jobs.map((job, index) => (
            <tr key={job._id || index}>
              <td className="p-4 border border-gray-300">{job.company}</td>
              <td className="p-4 border border-gray-300">{job.position}</td>
              <td className="p-4 border border-gray-300">
                {job.salaryRange || 'N/A'}
              </td>
              <td className="p-4 border border-gray-300">{job.status}</td>
              <td className="p-4 border border-gray-300 text-center">
                <button
                  onClick={() => onEdit(job)}
                  className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                >
                  Edit
                </button>{' '}
                <button
                  onClick={() => onDelete(job._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;
