"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MedaiItemProps {
  onClick?: (id: string) => void;
  data: Song;
}

const MediaItem: React.FC<MedaiItemProps> = ({ onClick, data }) => {
  const imagePath = useLoadImage(data);

  const handleOnClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    // TODO: Default turn on Player
  };

  return (
    <div
      onClick={handleOnClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-w-[48px] min-h-[48px] overflow-hidden">
        <Image fill alt="Media Item" src={imagePath || "/images/liked.png"} />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
      </div>
    </div>
  );
};

export default MediaItem;
