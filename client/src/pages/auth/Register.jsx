import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate =
    useNavigate();

  const { register } =
    useAuth();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
    });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password:
          formData.password,
        role: formData.role,
      });

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Start your learning
          journey
        </p>

        {error && (
          <div className="mb-4 bg-red-100 text-red-600 p-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-100 text-green-600 p-3 rounded-lg">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={
                formData.name
              }
              onChange={
                handleChange
              }
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={
                formData.email
              }
              onChange={
                handleChange
              }
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={
                formData.password
              }
              onChange={
                handleChange
              }
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={
                formData.confirmPassword
              }
              onChange={
                handleChange
              }
              required
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-3 text-gray-700">
              Select Role
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={
                    formData.role ===
                    "student"
                  }
                  onChange={
                    handleChange
                  }
                />
                Student
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="instructor"
                  checked={
                    formData.role ===
                    "instructor"
                  }
                  onChange={
                    handleChange
                  }
                />
                Instructor
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an
          account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;