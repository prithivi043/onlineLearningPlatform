const express =
  require("express");

const router =
  express.Router();

const {
  generateCertificate,
  getCertificate,
  getCertificatesByUser,
} = require(
  "../controllers/certificateController"
);

router.post(
  "/",
  generateCertificate
);

// MUST COME FIRST
router.get(
  "/user/:userId",
  getCertificatesByUser
);

router.get(
  "/:id",
  getCertificate
);

module.exports =
  router;