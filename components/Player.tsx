"use client";

import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();

  const song = player?.activeSong;

  if (!song) {
    return null;
  }

  return (
    <div className="fixed bottom-0 h-[100px] w-full bg-transparent px-4 py-2">
      <PlayerContent key={song.id} song={song} videoId={song.id} />
    </div>
  );
};

export default Player;
