"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

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

  return <div>Item</div>;
};

export default MediaItem;
