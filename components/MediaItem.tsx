"use client"

import useLoadImage from "@/hooks/useLoadImage"
import usePlayer from "@/hooks/usePlayer"
import Image from "next/image"

interface MedaiItemProps {
  song: any
  onClick?: (song: any) => void
}

const MediaItem: React.FC<MedaiItemProps> = ({ onClick, song }) => {
  const player = usePlayer()

  const name = song?.title_short || song?.title || "Song name..."
  const artist = song?.artist?.name || song?.artist || song?.author || "Artist"

  const imagePath =
    song?.imgUrl ||
    song?.album?.cover_medium ||
    song?.album?.cover_big ||
    useLoadImage(song)

  const handleClick = () => {
    if (onClick) {
      return onClick(song)
    }

    return player.setItem(song)
  }

  return (
    <div
      onClick={handleClick}
      className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50"
    >
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image fill alt="Media Item" src={imagePath || "/images/liked.png"} />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="truncate text-white">{name}</p>
        <p className="truncate text-sm text-neutral-400">{artist}</p>
      </div>
    </div>
  )
}

export default MediaItem
