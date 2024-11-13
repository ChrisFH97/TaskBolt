import axiosInstance from './axiosInstance';

export const getJobs = async () => {
  const response = await axiosInstance.get('/jobs');
  return response.data;
};

export const createJob = async (jobData: any) => {
  const response = await axiosInstance.post('/jobs', jobData);
  return response.data;
};
