import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaArrowLeft,
  FaSave,
  FaCamera,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentSettings = () => {

const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      profileImage: "",
    });

  useEffect(() => {
    fetchProfile();
  }, []);


  const fetchProfile =
    async () => {
      try {
        const user =
          JSON.parse(
            localStorage.getItem("user")
          );

        const res =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${user._id}`
          );

        setFormData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/users/${user._id}`,
      formData
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );

    setFormData(res.data);

    alert(
      "Profile Updated Successfully"
    );

  } catch (err) {
    console.log(err);
  }
};

 return (
  <div className="min-h-screen bg-slate-50 p-6 lg:p-10">

    <div className="max-w-6xl mx-auto">


      {/* Header */}
      <div className="mb-8">

        <button
            onClick={() =>
                navigate("/student/dashboard")
            }
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition mb-4"
            >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
            </button>

        <h1 className="text-4xl font-bold text-slate-900">
          Account Settings
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your profile information and account preferences.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Profile Card */}
        <div className="lg:col-span-1">

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

            <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />

            <div className="px-6 pb-8">

              <div className="relative -mt-14 flex justify-center">

                <div className="relative">

                  <img
                    src={
                    formData.profileImage
                        ? formData.profileImage
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            formData.name || "Student"
                        )}&background=4F46E5&color=fff&size=256`
                    }
                    alt=""
                    className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
                  />

                  <button
                    type="button"
                    className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg"
                  >
                    <FaCamera />
                  </button>

                </div>

              </div>

              <div className="text-center mt-5">

                <h2 className="text-xl font-bold text-slate-900">
                  {formData.name || "Student"}
                </h2>

                <p className="text-slate-500 mt-1">
                  {formData.email}
                </p>

              </div>

              <div className="mt-8 space-y-4">

                <div className="p-4 rounded-2xl bg-slate-50 border">
                  <p className="text-xs text-slate-500">
                    Profile Completion
                  </p>

                  <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
                    <div className="w-4/5 h-2 rounded-full bg-indigo-600" />
                  </div>

                  <p className="text-sm mt-2 text-slate-600">
                    80% Complete
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Form Card */}
        <div className="lg:col-span-2">

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

            <h2 className="text-2xl font-bold text-slate-900 mb-8">
              Personal Information
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">
                    Full Name
                  </label>

                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">
                    Email Address
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label className="text-sm font-medium text-slate-600 mb-2 block">
                    Phone Number
                  </label>

                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                

              </div>

              <div className="pt-4 flex justify-end">

                <button
                  type="submit"
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <FaSave />

                  Save Changes
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  </div>
);
};

export default StudentSettings;