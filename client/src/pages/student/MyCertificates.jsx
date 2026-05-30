    import {
    useEffect,
    useState,
    } from "react";

    import axios from "axios";

    import {
    FaCertificate,
    FaDownload,
    FaArrowLeft,
    } from "react-icons/fa";

    import {
    useNavigate,
    } from "react-router-dom";

    const MyCertificates = () => {
    const navigate =
        useNavigate();

    const [
        certificates,
        setCertificates,
    ] = useState([]);

    const user =
        JSON.parse(
        localStorage.getItem(
            "user"
        )
        ) || {};

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates =
        async () => {
            try {
            const userId =
                user.id ||
                user._id;

            const response =
                await axios.get(
                `${import.meta.env.VITE_API_URL}/certificates/user/${userId}`
                );           
            response.data.forEach(
                (certificate, index) => {
                console.log(
                    `Certificate ${index + 1}:`,
                    {
                    id: certificate._id,
                    studentName:
                        certificate.studentName,
                    course:
                        certificate.courseId
                        ?.title,
                    certificateNumber:
                        certificate.certificateNumber,
                    }
                );
                }
            );

            setCertificates(
                response.data
            );
            } catch (error) {
            console.log(
                "Certificate Fetch Error:",
                error
            );
            }
        };

  return (
  <div className="min-h-screen bg-slate-100">

    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <button
            onClick={() =>
              navigate("/student/dashboard")
            }
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </button>

          <h1 className="text-3xl font-bold text-slate-900">
            My Certificates
          </h1>

          <p className="text-slate-500 mt-2">
            View and manage all earned certificates.
          </p>

        </div>

      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">

        <div className="flex items-center gap-4">

          <img
            src={
              user?.profileImage
                ? user.profileImage
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.name || "Student"
                  )}`
            }
            alt="Profile"
            className="w-14 h-14 rounded-full"
          />

          <div>
            <h2 className="font-semibold text-lg">
              {user?.name}
            </h2>

            <p className="text-slate-500 text-sm">
              Total Certificates: {certificates.length}
            </p>
          </div>

        </div>

      </div>

      {certificates.length === 0 ? (

        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">

          <FaCertificate className="mx-auto text-5xl text-slate-400" />

          <h2 className="text-2xl font-semibold mt-5">
            No Certificates Available
          </h2>

          <p className="text-slate-500 mt-2">
            Complete courses to receive certificates.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {certificates.map(
            (certificate) => (

              <div
                key={certificate._id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-md transition"
              >

                <div className="p-6">

                  <div className="flex items-center justify-between mb-5">

                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">

                      <FaCertificate className="text-indigo-600 text-xl" />

                    </div>

                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
                      Completed
                    </span>

                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    {certificate.courseId?.title}
                  </h3>

                  <div className="space-y-3 text-sm">

                    <div>
                      <p className="text-slate-400">
                        Instructor
                      </p>

                      <p className="font-medium text-slate-700">
                        {certificate.courseId?.instructor}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">
                        Certificate Number
                      </p>

                      <p className="font-mono text-xs break-all text-slate-700">
                        {certificate.certificateNumber}
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/certificate/${certificate._id}`
                      )
                    }
                    className="w-full mt-6 flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition"
                  >
                    <FaDownload />
                    View Certificate
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  </div>
);  
    };

    export default MyCertificates;