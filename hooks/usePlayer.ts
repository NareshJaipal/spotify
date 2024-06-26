import { create } from "zustand";

interface PlayerStore {
  songs: any[];
  activeSong?: any;
  setItem: (song: any) => void;
  setItems: (songs: any[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  songs: [],
  activeSong: undefined,
  setItem: (song: any) => set({ activeSong: song }),
  setItems: (songs: any[]) => set({ songs: songs }),
  reset: () => set({ activeSong: undefined, songs: [] }),
}));

export default usePlayer;
