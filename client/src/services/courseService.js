import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

export const createCourse =
  async (courseData) => {
    const response =
      await axios.post(
        `${API_URL}/courses`,
        courseData
      );

    return response.data;
  };

export const getCourses =
  async () => {
    const response =
      await axios.get(
        `${API_URL}/courses`
      );

    return response.data;
  };

export const getCourseById =
  async (id) => {
    const response =
      await axios.get(
        `${API_URL}/courses/${id}`
      );

    return response.data;
  };

export const deleteCourse =
  async (id) => {
    const response =
      await axios.delete(
        `${API_URL}/courses/${id}`
      );

    return response.data;
  };

export const updateCourse =
  async (
    id,
    courseData
  ) => {
    const response =
      await axios.put(
        `${API_URL}/courses/${id}`,
        courseData
      );

    return response.data;
  };