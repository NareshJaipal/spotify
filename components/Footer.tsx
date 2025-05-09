import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import SocialIcon from "./SocialIcon";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-400 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-fit p-4">
            <h2 className="text-white text-2xl font-bold mb-2">
              Spotify Clone
            </h2>
            <p className="text-neutral-400">
              Build with{" "}
              <b className="text-neutral-300 font-semibold">Next.Js</b>
            </p>
          </div>

          <div className="w-fit p-4">
            <h3 className="text-white text-xl font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-2">
              <SocialIcon icon={FaFacebookF} />
              <SocialIcon icon={FaTwitter} />
              <SocialIcon icon={FaInstagram} />
              <SocialIcon icon={FaLinkedinIn} />
              <SocialIcon icon={FaYoutube} />
            </div>
          </div>
        </div>

        <div className="py-6 text-center">
          <p className="text-neutral-400">
            &copy; 2024{" "}
            <b className="text-neutral-300 font-semibold">Naresh Jaipal</b>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
