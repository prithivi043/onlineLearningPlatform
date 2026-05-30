const Certificate =
  require("../models/Certificate");

const Enrollment =
  require("../models/Enrollment");

const Course =
  require("../models/Course");

// Generate Certificate

exports.generateCertificate =
  async (req, res) => {
    try {
      const {
        userId,
        courseId,
      } = req.body;

      const enrollment =
        await Enrollment.findOne({
          userId,
          courseId,
        });

      if (!enrollment) {
        return res.status(404).json({
          success: false,
          message:
            "Student enrollment not found",
        });
      }

      console.log(
        "Enrollment Name:",
        enrollment.name
      );

      // Remove old certificate
      await Certificate.deleteMany({
        userId,
        courseId,
      });

      const certificate =
        await Certificate.create({
          userId,
          courseId,
          studentName:
            enrollment.name,
          certificateNumber:
            `CERT-${Date.now()}`,
        });

      res.status(201).json({
        success: true,
        certificate,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

// Get Certificate

        exports.getCertificate =
        async (req, res) => {
            try {
            console.log(
                "Certificate ID Requested:",
                req.params.id
            );

            const certificate =
                await Certificate.findById(
                req.params.id
                )
                .populate("courseId")
                .populate("userId");

            console.log(
                "Certificate Found:"
            );

            console.log(
                JSON.stringify(
                certificate,
                null,
                2
                )
            );

            if (!certificate) {
                return res.status(404).json({
                success: false,
                message:
                    "Certificate not found",
                });
            }

            res.status(200).json(
                certificate
            );
            } catch (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message:
                error.message,
            });
            }
        };

// Get User Certificates

exports.getUserCertificates =
  async (req, res) => {
    try {
      const certificates =
        await Certificate.find({
          userId:
            req.params.userId,
        })
          .populate("courseId")
          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        certificates
      );
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


  
  exports.getCertificatesByUser =
  async (req, res) => {
    try {
      const certificates =
        await Certificate.find({
          userId:
            req.params.userId,
        })
          .populate("userId")
          .populate("courseId")
          .sort({
            createdAt: -1,
          });

      console.log(
        "Certificates Found:",
        certificates.length
      );

      console.log(
        JSON.stringify(
          certificates,
          null,
          2
        )
      );

      res.json(
        certificates
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };