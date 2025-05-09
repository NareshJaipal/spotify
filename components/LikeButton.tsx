"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
import useLoadImage from "@/hooks/useLoadImage";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";

interface LikeButtonProps {
  song: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({ song }) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  const userId = user?.id;
  const songId = song?.id || song.song_id;

  const artist = song?.artist?.name || song?.author || "";
  const title = song?.title_short || song?.title || "";

  const loadedImagePath = useLoadImage(song);
  const imgUrl = loadedImagePath
    ? loadedImagePath
    : song?.album?.cover_medium || song?.album?.cover_big;

  const loadedSongUrl = useLoadSongUrl(song);
  const songUrl = loadedSongUrl ? loadedSongUrl : song?.preview;

  useEffect(() => {
    if (!userId) {
      return;
    }

    if (songId) {
      const fetchData = async () => {
        const { data, error } = await supabaseClient
          .from("liked_songs")
          .select("*")
          .eq("user_id", userId)
          .eq("song_id", songId)
          .single();

        if (error) {
          console.error(error);
          return;
        }

        if (data) {
          setIsLiked(true);
        }
      };
      fetchData();
    }
  }, [supabaseClient, songId, userId]);

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (songId) {
      if (isLiked) {
        const { error } = await supabaseClient
          .from("liked_songs")
          .delete()
          .eq("user_id", userId)
          .eq("song_id", songId);

        if (error) {
          toast.error(error.message);
        } else {
          setIsLiked(false);
        }
      } else {
        const { error } = await supabaseClient.from("liked_songs").insert({
          user_id: userId,
          song_id: songId,
          title,
          artist,
          imgUrl,
          songUrl,
        });

        if (error) {
          toast.error(error.message);
        } else {
          setIsLiked(true);
          toast.success("Liked!");
        }
      }
    }

    router.refresh();
  };

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button className="transition hover:opacity-75" onClick={handleLike}>
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
