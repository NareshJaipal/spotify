"use client";

import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import usePlayer from "@/hooks/usePlayer";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import { FiLoader } from "react-icons/fi";

interface PlayerContentProps {
  song: any;
  videoId: string;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, videoId }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(75);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [progressTime, setProgressTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bufferedProgress, setBufferedProgress] = useState(0);

  const [playerReadyRef, setPlayerReadyRef] = useState(false);
  const youtubePlayerRef = useRef<any>(null);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  useEffect(() => {
    const loadYouTubeIframeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = initializePlayer;
      } else {
        initializePlayer();
      }
    };

    loadYouTubeIframeAPI();
  }, []);

  useEffect(() => {
    if (playerReadyRef) {
      setIsLoading(true);
      initializePlayer();
    }
  }, [videoId]);

  const initializePlayer = () => {
    if (!window.YT) return;
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.destroy();
    }

    try {
      youtubePlayerRef.current = new window.YT.Player("youtube-player", {
        height: "0",
        width: "0",
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          origin: window.location.origin,
          playsinline: 1,
        },
        events: {
          onReady: (event: any) => {
            setPlayerReadyRef(true);
            event.target.setVolume(volume);
            event.target.playVideo();
            setIsLoading(false);
          },
          onStateChange: (event: any) => {
            switch (event.data) {
              case window.YT.PlayerState.PLAYING:
                setIsPlaying(true);
                setIsLoading(false);
                break;
              case window.YT.PlayerState.PAUSED:
                setIsPlaying(false);
                break;
              case window.YT.PlayerState.ENDED:
                onPlayNext();
                break;
              case window.YT.PlayerState.BUFFERING:
                setIsLoading(true);
                break;
              case window.YT.PlayerState.CUED:
                event.target.playVideo();
                break;
              default:
                console.warn("Unknown player state:", event.data);
                break;
            }
          },
          onError: (event: any) => {
            console.error("YouTube Player Error:", event);
            setIsLoading(false);
          },
        },
      });
    } catch (error) {
      console.error("Error initializing YouTube player:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (youtubePlayerRef.current?.getCurrentTime && !isLoading) {
        try {
          const currentTime = youtubePlayerRef.current.getCurrentTime() || 0;
          const videoDuration = youtubePlayerRef.current.getDuration() || 0;
          const bufferProgress =
            youtubePlayerRef.current.getVideoLoadedFraction() * 100 || 0;

          setProgressTime(currentTime);
          setDuration(videoDuration);
          setBufferedProgress(bufferProgress);
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handlePlay = () => {
    if (!youtubePlayerRef.current) return;

    try {
      if (!isPlaying) {
        youtubePlayerRef.current.playVideo();
      } else {
        youtubePlayerRef.current.pauseVideo();
      }
    } catch (error) {
      console.error("Error handling play/pause:", error);
    }
  };

  const onPlayPrevious = () => {
    if (player.songs.length === 0) return;

    const currentIndex = player.songs.findIndex((s) => s === player.activeSong);
    const previousSong = player.songs[currentIndex - 1];

    if (!previousSong) {
      return player.setItem(player.songs[player.songs.length - 1]);
    }

    player.setItem(previousSong);
  };

  const onPlayNext = () => {
    if (player.songs.length === 0) return;

    const currentIndex = player.songs.findIndex((s) => s === player.activeSong);
    const nextSong = player.songs[currentIndex + 1];

    if (!nextSong) {
      return player.setItem(player.songs[0]);
    }

    player.setItem(nextSong);
  };

  const toggleMute = () => {
    if (!youtubePlayerRef.current) return;

    try {
      if (volume === 0) {
        setVolume(previousVolume);
        youtubePlayerRef.current.setVolume(previousVolume);
      } else {
        setPreviousVolume(volume);
        setVolume(0);
        youtubePlayerRef.current.setVolume(0);
      }
    } catch (error) {
      console.error("Error toggling mute:", error);
    }
  };

  const handleProgressChange = (value: number) => {
    if (!youtubePlayerRef.current) return;

    try {
      setProgressTime(value);
      youtubePlayerRef.current.seekTo(value);
    } catch (error) {
      console.error("Error changing progress:", error);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (!youtubePlayerRef.current) return;

    try {
      setVolume(value);
      youtubePlayerRef.current.setVolume(value);
    } catch (error) {
      console.error("Error changing volume:", error);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md border-t border-neutral-700/50">
      <div className="relative w-full">
        <Slider
          value={progressTime}
          max={duration}
          onChange={handleProgressChange}
          bufferedProgress={bufferedProgress}
          className="absolute -top-5"
        />
      </div>

      <div className="flex items-center gap-x-2 px-4 pt-2">
        <span className="text-xs text-neutral-400">
          {formatTime(progressTime)}
        </span>
        <span className="text-xs text-neutral-400">/</span>
        <span className="text-xs text-neutral-400">{formatTime(duration)}</span>
      </div>

      <div id="youtube-player" className="hidden"></div>

      <div className="pb-2 px-4 flex items-center justify-between w-full gap-x-2 sm:gap-x-4 md:gap-x-6 overflow-hidden">
        <div className="flex items-center min-w-[135px]">
          <div className="flex items-center gap-x-4">
            <AiFillStepBackward
              onClick={onPlayPrevious}
              size={24}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />

            <div
              onClick={handlePlay}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-white cursor-pointer hover:scale-105 transition"
            >
              {isLoading ? (
                <FiLoader className="h-5 w-5 text-black animate-spin" />
              ) : (
                <Icon size={24} className="text-black" />
              )}
            </div>

            <AiFillStepForward
              onClick={onPlayNext}
              size={24}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-1 w-full max-w-[700px] overflow-hidden">
          <MediaItem song={song} />
        </div>

        <div className="hidden md:flex items-center min-w-[135px] gap-x-2 justify-end">
          <VolumeIcon
            onClick={toggleMute}
            size={24}
            className="cursor-pointer text-neutral-400 hover:text-white transition"
          />

          <div className="w-[100px]">
            <Slider value={volume} max={100} onChange={handleVolumeChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
