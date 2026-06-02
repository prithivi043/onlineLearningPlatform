import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import jsPDF from "jspdf";

import {
  FaDownload,
  FaArrowLeft,
} from "react-icons/fa";

const Certificate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    fetchCertificate();
  }, []);

  const fetchCertificate = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/certificates/${id}`
      );
      setCertificate(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPDF = () => {
    const pdf = new jsPDF("landscape", "mm", "a4");

    const instructorName = certificate.courseId?.instructor || "Instructor";
    const authorizedName = "Prithivi";

    // Borders
    pdf.setDrawColor(37, 99, 235);
    pdf.setLineWidth(2);
    pdf.rect(10, 10, 277, 190);
    pdf.setLineWidth(0.5);
    pdf.rect(15, 15, 267, 180);

    // Title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(30);
    pdf.setTextColor(37, 99, 235);
    pdf.text("CERTIFICATE OF COMPLETION", 148, 40, { align: "center" });

    // Decorative Line
    pdf.setDrawColor(212, 163, 54);
    pdf.line(95, 50, 200, 50);

    // Subtitle
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text("This certificate is proudly awarded to", 148, 70, { align: "center" });

    // Student Name
    pdf.setFontSize(30);
    pdf.setTextColor(79, 70, 229);
    pdf.text(
      certificate.studentName || certificate.userId?.name || "",
      148, 92, { align: "center" }
    );
    pdf.setDrawColor(79, 70, 229);
    pdf.line(95, 102, 200, 102);

    // Course
    pdf.setFontSize(16);
    pdf.setTextColor(0, 0, 0);
    pdf.text("For successfully completing", 148, 122, { align: "center" });
    pdf.setFontSize(24);
    pdf.setTextColor(16, 185, 129);
    pdf.text(certificate.courseId.title, 148, 145, { align: "center" });

    // Gold Seal
    pdf.setDrawColor(212, 163, 54);
    pdf.circle(248, 60, 14);
    pdf.circle(248, 60, 11);
    pdf.setFontSize(10);
    pdf.setTextColor(212, 163, 54);
    pdf.text("CERTIFIED", 248, 61, { align: "center" });

    // Signature Lines
    pdf.setDrawColor(37, 99, 235);
    pdf.line(40, 165, 95, 165);
    pdf.line(195, 165, 250, 165);

    // Signature Names — times italic (best cursive jsPDF supports natively)
    pdf.setFont("times", "italic");
    pdf.setFontSize(26);
    pdf.setTextColor(30, 58, 138);
    pdf.text(instructorName, 67, 162, { align: "center" });
    pdf.text(authorizedName, 222, 162, { align: "center" });

    // Signature Labels
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.setTextColor(37, 99, 235);
    pdf.text("Instructor Signature", 67, 173, { align: "center" });
    pdf.text("Authorized Signature", 222, 173, { align: "center" });

    // Bottom Details
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.setTextColor(80, 80, 80);
    pdf.text(
      `Completed On: ${new Date(certificate.issuedDate).toLocaleDateString()}`,
      25, 185
    );
    pdf.text(`Instructor: ${certificate.courseId.instructor}`, 25, 193);
    pdf.text(`Certificate No: ${certificate.certificateNumber}`, 190, 193);

    pdf.save(`${certificate.courseId.title}-Certificate.pdf`);
  };

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Certificate...
      </div>
    );
  }

  const instructorName = certificate.courseId?.instructor || "Instructor";
  const authorizedName = "Prithivi";

  return (
    <>
      {/* Signature Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Pinyon+Script&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-slate-100 p-4 sm:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto">

          {/* Top Actions */}
          <div className="flex justify-between mb-5 sm:mb-6 gap-3">
            <button
              onClick={() => navigate("/my-courses")}
              className="bg-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow flex items-center gap-2 text-sm sm:text-base font-medium hover:bg-slate-50 transition"
            >
              <FaArrowLeft />
              Back
            </button>

            <button
              onClick={downloadPDF}
              className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex items-center gap-2 text-sm sm:text-base font-medium transition"
            >
              <FaDownload />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">Download</span>
            </button>
          </div>

          {/* Scroll hint on mobile */}
          <p className="text-center text-xs text-slate-400 mb-3 sm:hidden">
            ← Scroll sideways to view full certificate →
          </p>

          {/* Certificate — horizontally scrollable on small screens */}
          <div className="overflow-x-auto rounded-xl shadow-xl">
            <div
              id="certificate"
              className="relative bg-white rounded-xl overflow-hidden"
              style={{ minWidth: "720px", padding: "60px 70px 50px" }}
            >
              {/* Outer Border */}
              <div className="absolute inset-4 border-[6px] border-blue-600 rounded-sm pointer-events-none" />

              {/* Inner Border */}
              <div className="absolute inset-[30px] border-[1.5px] border-blue-400 rounded-sm pointer-events-none" />

              {/* Gold Seal */}
              <div className="absolute top-14 right-16 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-4 border-yellow-500 flex items-center justify-center">
                  <div className="w-[72px] h-[72px] rounded-full border-2 border-yellow-400 flex flex-col items-center justify-center gap-0.5">
                    <span className="text-[9px] font-extrabold text-yellow-600 tracking-widest">CERTI</span>
                    <span className="text-[9px] font-extrabold text-yellow-600 tracking-widest">FIED</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">

                {/* Title */}
                <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-600 tracking-widest">
                  CERTIFICATE
                </h1>
                <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 mt-2 tracking-wide">
                  OF COMPLETION
                </h2>

                {/* Decorative divider */}
                <div className="flex items-center justify-center mt-5">
                  <div className="w-28 h-[2px] bg-yellow-500" />
                  <span className="mx-4 text-yellow-500 text-2xl leading-none">✦</span>
                  <div className="w-28 h-[2px] bg-yellow-500" />
                </div>

                {/* Subtitle */}
                <p className="mt-10 text-lg text-slate-500 tracking-wide">
                  This certificate is proudly awarded to
                </p>

                {/* Student Name */}
                <h2 className="text-5xl lg:text-6xl font-bold mt-5 text-indigo-600">
                  {certificate.studentName || certificate.userId?.name}
                </h2>
                <div className="w-80 h-[2px] bg-indigo-400 mx-auto mt-3" />

                {/* Course */}
                <p className="mt-10 text-lg text-slate-500 tracking-wide">
                  For successfully completing
                </p>
                <h3 className="text-4xl lg:text-5xl font-bold mt-4 text-emerald-600">
                  {certificate.courseId.title}
                </h3>

                {/* Info Row */}
                <div className="grid grid-cols-3 gap-6 mt-12">
                  <div className="text-center">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Instructor
                    </h4>
                    <p className="text-lg font-bold mt-1 text-slate-700">
                      {certificate.courseId.instructor}
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Completion Date
                    </h4>
                    <p className="text-lg font-bold mt-1 text-slate-700">
                      {new Date(certificate.issuedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                      Certificate No
                    </h4>
                    <p className="text-sm font-bold mt-1 text-slate-700 break-all">
                      {certificate.certificateNumber}
                    </p>
                  </div>
                </div>

                {/* Signatures */}
                <div className="mt-12 flex justify-between items-end px-10">

                  {/* Instructor Signature */}
                  <div className="text-center">
                    <p
                      style={{
                        fontFamily: "'Great Vibes', cursive",
                        fontSize: "54px",
                        lineHeight: "1.1",
                        color: "#1e3a8a",
                        letterSpacing: "1px",
                      }}
                    >
                      {instructorName}
                    </p>
                    <div className="border-t-2 border-blue-600 w-56 mx-auto mt-1" />
                    <p className="mt-2 font-semibold text-blue-600 text-xs tracking-widest uppercase">
                      Instructor Signature
                    </p>
                  </div>

                  {/* Authorized Signature */}
                  <div className="text-center">
                    <p
                      style={{
                        fontFamily: "'Pinyon Script', cursive",
                        fontSize: "54px",
                        lineHeight: "1.1",
                        color: "#1e3a8a",
                        letterSpacing: "1px",
                      }}
                    >
                      {authorizedName}
                    </p>
                    <div className="border-t-2 border-blue-600 w-56 mx-auto mt-1" />
                    <p className="mt-2 font-semibold text-blue-600 text-xs tracking-widest uppercase">
                      Authorized Signature
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Certificate;
