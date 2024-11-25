import axiosInstance from './axiosInstance';

export const getJobs = async () => {
  const response = await axiosInstance.get('/shifts');
  return response.data;
};

export const createJob = async (jobData: any) => {
  const response = await axiosInstance.post('/shifts/create', jobData);
  return response.data;
};

export const acceptJob = async (jobId: string) => {
  const response = await axiosInstance.post(`/shifts/${jobId}/accept`);
  return response.data;
};

export const completeJob = async (jobId: string) => {
  const response = await axiosInstance.post(`/shifts/${jobId}/complete`);
  return response.data;
};

export const cancelJob = async (jobId: string) => {
  const response = await axiosInstance.post(`/shifts/${jobId}/cancel`);
  return response.data;
};

export const getJobById = async (jobId: string) => {
  const response = await axiosInstance.get(`/shifts/${jobId}`);
  return response.data;
};

export const getJobsByDate = async (date: Date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const response = await axiosInstance.get('/shifts', {
    params: {
      startDate: startOfDay.toISOString(),
      endDate: endOfDay.toISOString(),
    },
  });
  return response.data;
};
