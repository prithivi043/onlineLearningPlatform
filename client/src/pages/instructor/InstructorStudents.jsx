import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers,FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const InstructorStudents = () => {

  const navigate = useNavigate();

  const [students, setStudents] =
    useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents =
    async () => {
      try {

        const instructor =
          JSON.parse(
            localStorage.getItem("user")
          );

        const res =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/instructor/students/${instructor._id}`
          );

        setStudents(res.data);

      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50">
      
      {/* Back Button */}
    <div className="mb-6">

      <button
        onClick={() =>
          navigate("/instructor/dashboard")
        }
        className="flex items-center gap-3 bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-sm hover:bg-slate-50 hover:shadow-md transition-all duration-300"
      >
        <FaArrowLeft className="text-slate-600" />

        <span className="font-medium text-slate-700">
          Back to Dashboard
        </span>

      </button>

    </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <FaUsers className="text-indigo-600" />
            Students
          </h1>

          <p className="text-slate-500 mt-2">
            View and manage enrolled students.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">

          <p className="text-sm text-slate-500">
            Total Students
          </p>

          <h2 className="text-3xl font-bold text-slate-900">
            {students.length}
          </h2>

        </div>

      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Student Records
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Student
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Email
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Phone
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Organization
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Course
                </th>

                <th className="text-left px-6 py-4 font-semibold text-slate-600">
                  Progress
                </th>

              </tr>

            </thead>

            <tbody>

              {students.map((student) => (

                <tr
                  key={student._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-600">
                        {student.name?.charAt(0)}
                      </div>

                      <span className="font-medium">
                        {student.name}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-4">
                    {student.email}
                  </td>

                  <td className="px-6 py-4">
                    {student.phone}
                  </td>

                  <td className="px-6 py-4">
                    {student.organization}
                  </td>

                  <td className="px-6 py-4">
                    {student.courseTitle}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-28 bg-slate-200 rounded-full h-2">

                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${student.progress}%`,
                          }}
                        />

                      </div>

                      <span className="font-medium">
                        {student.progress}%
                      </span>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 lg:hidden">

        {students.map((student) => (

          <div
            key={student._id}
            className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm"
          >

            <div className="flex items-center gap-4 mb-4">

              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {student.name?.charAt(0)}
              </div>

              <div>

                <h3 className="font-semibold text-lg">
                  {student.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {student.email}
                </p>

              </div>

            </div>

            <div className="space-y-2 text-sm">

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Phone
                </span>
                <span>{student.phone}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Organization
                </span>
                <span>{student.organization}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Course
                </span>
                <span>{student.courseTitle}</span>
              </div>

            </div>

            <div className="mt-4">

              <div className="flex justify-between mb-2">

                <span className="text-sm text-slate-500">
                  Progress
                </span>

                <span className="font-medium">
                  {student.progress}%
                </span>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-2">

                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${student.progress}%`,
                  }}
                />

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default InstructorStudents;