import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/enrollments`;

export const enrollCourse =
  async (data) => {
    const response =
      await axios.post(
        API_URL,
        data
      );

    return response.data;
  };

export const getMyCourses =
  async (userId) => {
    const response =
      await axios.get(
        `${API_URL}/my-courses/${userId}`
      );

    return response.data;
  };

export const updateProgress =
  async (
    enrollmentId,
    progress
  ) => {
    const response =
      await axios.put(
        `${API_URL}/${enrollmentId}`,
        {
          progress,
        }
      );

    return response.data;
  };

export const unEnrollCourse =
  async (
    enrollmentId
  ) => {
    const response =
      await axios.delete(
        `${API_URL}/${enrollmentId}`
      );

    return response.data;
  };