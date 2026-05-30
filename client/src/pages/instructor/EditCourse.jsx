import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getCourseById,
  updateCourse,
} from "../../services/courseService";

const EditCourse = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      thumbnail: "",
      level: "",
      category: "",
    });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse =
    async () => {
      try {
        const course =
          await getCourseById(id);

        setFormData(course);
      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await updateCourse(
          id,
          formData
        );

        alert(
          "Course Updated Successfully"
        );

        navigate(
          "/manage-courses"
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6">
          Edit Course
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-5"
        >
          <input
            type="text"
            name="title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            placeholder="Course Title"
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            rows="4"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="thumbnail"
            value={
              formData.thumbnail
            }
            onChange={
              handleChange
            }
            placeholder="Thumbnail URL"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="level"
            value={
              formData.level
            }
            onChange={
              handleChange
            }
            placeholder="Level"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="text"
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            placeholder="Category"
            className="w-full border p-3 rounded-xl"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;