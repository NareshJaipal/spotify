import usePlayer from "./usePlayer";

const useOnPlay = (song: any[]) => {
  const player = usePlayer();

  const onPlay = (item: any) => {
    player.setItem(item);
    player.setItems(song.map((item) => item));
  };

  return onPlay;
};

export default useOnPlay;
