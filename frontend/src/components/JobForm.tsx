import { useState } from 'react';
import { Job } from '../types/job';

type Props = {
  initialData?: Partial<Job>;
  onSave: (data: Omit<Job, '_id'>) => void;
  onCancel: () => void;
};

const JobForm: React.FC<Props> = ({ initialData = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Job, '_id'>>({
    company: initialData.company || '',
    position: initialData.position || '',
    salaryRange: initialData.salaryRange || '',
    status: initialData.status || 'Applied',
    notes: initialData.notes || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label>
        Company:
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </label>
      <label>
        Position:
        <input
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </label>
      <label>
        Salary Range:
        <input
          name="salaryRange"
          value={formData.salaryRange}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>
      <label>
        Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>
      </label>
      <label>
        Notes:
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="border p-2 w-full"
        ></textarea>
      </label>
      <div className="flex justify-between">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Save
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JobForm;
