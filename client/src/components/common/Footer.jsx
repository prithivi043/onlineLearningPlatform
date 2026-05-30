import {
  FaFacebook,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-white">
              LearnHub
            </h2>

            <p className="mt-4">
              Real-Time Online Learning &
              Certification Platform.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">
              Platform
            </h3>

            <ul className="mt-4 space-y-2">
              <li>Courses</li>
              <li>Certificates</li>
              <li>Live Classes</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold">
              Company
            </h3>

            <ul className="mt-4 space-y-2">
              <li>About</li>
              <li>Contact</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold">
              Follow Us
            </h3>

            <div className="flex gap-4 mt-4 text-2xl">
              <FaFacebook />
              <FaLinkedin />
              <FaGithub />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center">
          © 2026 LearnHub. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;