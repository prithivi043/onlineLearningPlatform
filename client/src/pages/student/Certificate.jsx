import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import html2canvas from "html2canvas";

import jsPDF from "jspdf";

import {
  FaDownload,
  FaArrowLeft,
} from "react-icons/fa";

const Certificate = () => {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [
    certificate,
    setCertificate,
  ] = useState(null);

  useEffect(() => {
    fetchCertificate();
  }, []);

        const fetchCertificate =
            async () => {
                try {
                const response =
                    await axios.get(
                    `${import.meta.env.VITE_API_URL}/certificates/${id}`
                    );

                console.log(
                    "Opened Certificate Data:",
                    response.data
                );

                setCertificate(
                    response.data
                );
                } catch (error) {
                console.log(error);
                }
            };

       const downloadPDF = () => {
        const pdf = new jsPDF(
            "landscape",
            "mm",
            "a4"
        );

        // ======================
        // Borders
        // ======================

        pdf.setDrawColor(
            37,
            99,
            235
        );

        pdf.setLineWidth(2);

        pdf.rect(
            10,
            10,
            277,
            190
        );

        pdf.setLineWidth(0.5);

        pdf.rect(
            15,
            15,
            267,
            180
        );

        // ======================
        // Title
        // ======================

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(30);

        pdf.setTextColor(
            37,
            99,
            235
        );

        pdf.text(
            "CERTIFICATE OF COMPLETION",
            148,
            40,
            {
            align: "center",
            }
        );

        // Decorative Line

        pdf.setDrawColor(
            212,
            163,
            54
        );

        pdf.line(
            95,
            50,
            200,
            50
        );

        // ======================
        // Subtitle
        // ======================

        pdf.setFontSize(16);

        pdf.setTextColor(
            0,
            0,
            0
        );

        pdf.text(
            "This certificate is proudly awarded to",
            148,
            70,
            {
            align: "center",
            }
        );

        // ======================
        // Student Name
        // ======================

        pdf.setFontSize(30);

        pdf.setTextColor(
            79,
            70,
            229
        );

        pdf.text(
            certificate.studentName ||
            certificate.userId?.name ||
            "",
            148,
            92,
            {
            align: "center",
            }
        );

        pdf.setDrawColor(
            79,
            70,
            229
        );

        pdf.line(
            95,
            102,
            200,
            102
        );

        // ======================
        // Course
        // ======================

        pdf.setFontSize(16);

        pdf.setTextColor(
            0,
            0,
            0
        );

        pdf.text(
            "For successfully completing",
            148,
            122,
            {
            align: "center",
            }
        );

        pdf.setFontSize(24);

        pdf.setTextColor(
            16,
            185,
            129
        );

        pdf.text(
            certificate.courseId.title,
            148,
            145,
            {
            align: "center",
            }
        );

        // ======================
        // Gold Seal
        // ======================

        pdf.setDrawColor(
            212,
            163,
            54
        );

        pdf.circle(
            248,
            60,
            14
        );

        pdf.circle(
            248,
            60,
            11
        );

        pdf.setFontSize(10);

        pdf.setTextColor(
            212,
            163,
            54
        );

        pdf.text(
            "CERTIFIED",
            248,
            61,
            {
            align: "center",
            }
        );

        // ======================
        // Signature Lines
        // ======================

        pdf.setDrawColor(
            37,
            99,
            235
        );

        pdf.line(
            40,
            165,
            95,
            165
        );

        pdf.line(
            195,
            165,
            250,
            165
        );

        // ======================
        // Signature Names
        // ======================

        pdf.setFont(
            "times",
            "italic"
        );

        pdf.setFontSize(24);

        pdf.setTextColor(
            0,
            0,
            0
        );

        pdf.text(
            "Prithivi",
            67,
            160,
            {
            align: "center",
            }
        );

        pdf.text(
            "Prithivi",
            222,
            160,
            {
            align: "center",
            }
        );

        // ======================
        // Signature Labels
        // ======================

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setFontSize(11);

        pdf.setTextColor(
            37,
            99,
            235
        );

        pdf.text(
            "Instructor Signature",
            67,
            173,
            {
            align: "center",
            }
        );

        pdf.text(
            "Authorized Signature",
            222,
            173,
            {
            align: "center",
            }
        );

        // ======================
        // Bottom Details
        // ======================

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.setFontSize(12);

        pdf.setTextColor(
            80,
            80,
            80
        );

        pdf.text(
            `Completed On: ${new Date(
            certificate.issuedDate
            ).toLocaleDateString()}`,
            25,
            185
        );

        pdf.text(
            `Instructor: ${certificate.courseId.instructor}`,
            25,
            193
        );

        pdf.text(
            `Certificate No: ${certificate.certificateNumber}`,
            190,
            193
        );

        // ======================
        // Save PDF
        // ======================

        pdf.save(
            `${certificate.courseId.title}-Certificate.pdf`
        );
        };

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Certificate...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <div className="max-w-6xl mx-auto">
        {/* Top Actions */}

        <div className="flex justify-between mb-6">
          <button
            onClick={() =>
              navigate(
                "/my-courses"
              )
            }
            className="bg-white px-5 py-3 rounded-xl shadow flex items-center gap-2"
          >
            <FaArrowLeft />
            Back
          </button>

          <button
            onClick={
              downloadPDF
            }
            className="bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <FaDownload />
            Download PDF
          </button>
        </div>

        {/* Certificate */}

        <div
  id="certificate"
  className="relative bg-white p-16 rounded-xl overflow-hidden"
>
  {/* Outer Border */}

  <div className="absolute inset-4 border-[6px] border-blue-600"></div>

  {/* Inner Border */}

  <div className="absolute inset-8 border-2 border-blue-500"></div>

  {/* Seal */}

  <div className="absolute top-16 right-20 w-28 h-28 rounded-full border-4 border-yellow-500 flex items-center justify-center">
    <div className="text-center">
      <p className="text-xs font-bold text-yellow-600">
        CERTIFIED
      </p>
    </div>
  </div>

  <div className="relative z-10 text-center">
    {/* Title */}

    <h1 className="text-6xl font-extrabold text-blue-600 tracking-wide">
      CERTIFICATE
    </h1>

    <h2 className="text-4xl font-bold text-blue-600 mt-2">
      OF COMPLETION
    </h2>

    {/* Decorative Line */}

    <div className="flex items-center justify-center mt-6">
      <div className="w-32 h-[2px] bg-yellow-500"></div>

      <div className="mx-4 text-yellow-500 text-2xl">
        ✦
      </div>

      <div className="w-32 h-[2px] bg-yellow-500"></div>
    </div>

    {/* Subtitle */}

    <p className="mt-12 text-xl text-slate-600">
      This certificate is proudly awarded to
    </p>

    {/* Student Name */}

    <h2 className="text-6xl font-bold mt-6 text-indigo-600">
      {certificate.studentName || certificate.userId?.name}
    </h2>

    <div className="w-96 h-[2px] bg-indigo-500 mx-auto mt-4"></div>

    {/* Course */}

    <p className="mt-12 text-xl text-slate-600">
      For successfully completing
    </p>

    <h3 className="text-5xl font-bold mt-6 text-emerald-600">
      {
        certificate.courseId
          .title
      }
    </h3>

    {/* Bottom Info */}

    <div className="grid grid-cols-3 gap-8 mt-16">
      <div>
        <h4 className="font-semibold text-slate-500">
          Instructor
        </h4>

        <p className="text-xl font-bold mt-2">
          {
            certificate
              .courseId
              .instructor
          }
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-500">
          Completion Date
        </h4>

        <p className="text-xl font-bold mt-2">
          {new Date(
            certificate.issuedDate
          ).toLocaleDateString()}
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-slate-500">
          Certificate No
        </h4>

        <p className="text-lg font-bold mt-2 break-words">
          {
            certificate.certificateNumber
          }
        </p>
      </div>
    </div>

    {/* Signatures */}

    <div className="mt-20 flex justify-between items-end px-12">
      <div className="text-center">
        <p
          className="text-5xl italic"
          style={{
            fontFamily:
              "'Brush Script MT', cursive",
          }}
        >
          Prithivi
        </p>

        <div className="border-t-2 border-blue-600 w-56"></div>

        <p className="mt-2 font-semibold text-blue-600">
          Instructor Signature
        </p>
      </div>

      <div className="text-center">
        <p
          className="text-5xl italic"
          style={{
            fontFamily:
              "'Brush Script MT', cursive",
          }}
        >
          Prithivi
        </p>

        <div className="border-t-2 border-blue-600 w-56"></div>

        <p className="mt-2 font-semibold text-blue-600">
          Authorized Signature
        </p>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default Certificate;