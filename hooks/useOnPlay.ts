import { Song } from "@/types";
import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";

const useOnPlay = (song: any[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (item: any) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setItem(item);
    player.setItems(song.map((item) => item));
  };

  return onPlay;
};

export default useOnPlay;
