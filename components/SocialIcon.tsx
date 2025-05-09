import { IconType } from "react-icons";

interface SocialIconProps {
  icon: IconType;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon }) => {
  return (
    <a
      href="#"
      className="flex items-center justify-center text-white bg-neutral-600 hover:bg-neutral-500 p-1.5 rounded-full"
    >
      <Icon size={20} />
    </a>
  );
};

export default SocialIcon;
