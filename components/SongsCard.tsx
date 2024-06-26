"use client"

import Image from "next/image"
import PlayButton from "./PlayButton"

interface SongsCardProps {
  song: any
  onClick: (song: any) => void
}

const SongsCard: React.FC<SongsCardProps> = ({ song, onClick }) => {
  const artist = song?.artist.name || "Artist"
  const name = song?.title_short || "Song name..."
  const imgUrl = song?.album?.cover_medium || song?.album?.cover_big

  return (
    <div
      onClick={() => onClick(song)}
      className="group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md p-3 transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        <Image
          className="aspect-square rounded-lg object-cover"
          fill
          src={imgUrl || "/images/liked.png"}
          alt="Album Image"
        />
      </div>
      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold">{name}</p>
        <p className="w-full truncate pb-2 text-sm text-neutral-400">
          By {artist}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  )
}

export default SongsCard
