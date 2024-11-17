export interface Job {
    _id: string;
    company: string;
    position: string;
    salaryRange?: string;
    status: 'Applied' | 'Interview' | 'Rejected' | 'Accepted';
    notes?: string;
}  