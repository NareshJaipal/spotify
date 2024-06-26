import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song || !song?.song_path) {
    return null;
  }

  const { data: songData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song?.song_path);

  return songData.publicUrl || null;
};

export default useLoadSongUrl;
