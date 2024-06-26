"use client";

import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import PlayButton from "./PlayButton";
import { twMerge } from "tailwind-merge";

interface SongItemProps {
  imageClassName?: string;
  data: Song;
  onClick: (song: any) => void;
}

const SongItem: React.FC<SongItemProps> = ({
  data,
  onClick,
  imageClassName,
}) => {
  const imagePath = useLoadImage(data);
  return (
    <div
      onClick={() => onClick(data)}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square h-full w-full rounded-md overflow-hidden">
        <Image
          className={twMerge("object-cover", imageClassName)}
          fill
          src={imagePath || "/images/liked.png"}
          alt="Song Item Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm w-full truncate">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
