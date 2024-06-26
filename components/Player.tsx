"use client"

import useLoadSongUrl from "@/hooks/useLoadSongUrl"
import usePlayer from "@/hooks/usePlayer"
import PlayerContent from "./PlayerContent"

const Player = () => {
  const player = usePlayer()

  const song = player?.activeSong

  const songUrl = song?.songUrl || song?.preview || useLoadSongUrl(song!)

  if (!song || !songUrl) {
    return null
  }

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-transparent px-4 py-2">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player
