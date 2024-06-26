"use client";

import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import useSound from "use-sound";

import usePlayer from "@/hooks/usePlayer";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import useOnPlay from "@/hooks/useOnPlay";

interface PlayerContentProps {
  song: any;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(0.75);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [progressTime, setProgressTime] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
    preload: true,
  });

  useEffect(() => {
    if (sound) {
      sound.on("load", () => {
        sound?.play();
      });

      sound?.play();

      const interval = setInterval(() => {
        if (typeof sound?.seek() === "number") {
          setProgressTime(sound.seek());
        }
      }, 1000);

      return () => {
        clearInterval(interval);
        sound?.unload();
      };
    }
  }, [sound, play]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const onPlayPrevious = () => {
    if (player.songs.length === 0) {
      return;
    }

    const currentIndex = player.songs.findIndex(
      (song) => song === player.activeSong
    );
    const previousSong = player.songs[currentIndex - 1];

    if (!previousSong) {
      return player.setItem(player.songs[player.songs.length - 1]);
    }

    player.setItem(previousSong);
  };

  const onPlayNext = () => {
    console.log("Next Song");
    if (player.songs.length === 0) {
      return;
    }

    const currentIndex = player.songs.findIndex(
      (id) => id === player.activeSong
    );
    const nextSong = player.songs[currentIndex + 1];

    if (!nextSong) {
      return player.setItem(player.songs[0]);
    }

    player.setItem(nextSong);
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
    }
  };

  const handleProgressChange = (value: number) => {
    setProgressTime(value);
    if (sound) {
      sound.seek(value);
    }
  };

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex w-full items-start md:w-[250px]">
        <div className="flex w-full items-center gap-x-2">
          <div className="w-[calc(100%-30px)]">
            <MediaItem song={song} />
          </div>
          <LikeButton song={song} />
        </div>
      </div>

      <div className="col-auto flex w-full items-center justify-end md:hidden">
        <div
          onClick={handlePlay}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
        >
          <Icon size={28} className="text-black" />
        </div>
      </div>

      <div className="flex w-full max-w-[722px] flex-col items-center justify-center">
        <div className="hidden w-full items-center justify-center gap-x-6 md:flex">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={25}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
          />

          <div
            onClick={handlePlay}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white p-1"
          >
            <Icon size={25} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={25}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
          />
        </div>

        <div className="flex w-full items-center gap-x-2">
          <p className="w-[50px] whitespace-nowrap text-right text-sm text-neutral-400">
            {Math.floor(progressTime / 60)}:
            {Math.floor(progressTime % 60) < 10
              ? `0${Math.floor(progressTime % 60)}`
              : Math.floor(progressTime % 60)}
          </p>

          <Slider
            value={progressTime}
            max={sound?.duration() || 0}
            onChange={handleProgressChange}
          />

          <p className="w-[50px] whitespace-nowrap text-sm text-neutral-400">
            {Math.floor(sound?.duration() / 60 || 0)}:
            {Math.floor(sound?.duration() % 60 || 0) < 10
              ? `0${Math.floor(sound?.duration() % 60 || 0)}`
              : Math.floor(sound?.duration() % 60 || 0)}
          </p>
        </div>
      </div>

      <div className="hidden w-full justify-end pr-2 md:flex">
        <div className="flex w-[200px] items-center gap-x-2">
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className="w-[50px] cursor-pointer"
          />

          <p className="w-[85px] cursor-pointer text-center text-neutral-500">
            {volume * 100} %
          </p>
          <Slider
            value={volume}
            max={1}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
