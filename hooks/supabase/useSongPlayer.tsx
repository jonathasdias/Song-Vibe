import { create } from "zustand";
import { SongType } from "@/types/songType";

interface songPlayerTypes {
  songs: SongType[];
  currentSong: SongType | null;
  currentIndex: number;

  isPlaying: boolean;

  currentTime: number;
  duration: number;

  volume: number;

  shuffle: boolean;
  repeat: boolean;

  setSongs: (songs: SongType[]) => void;

  playSong: (song: SongType, playlist?: SongType[]) => void;

  play: () => void;
  pause: () => void;
  togglePLay: () => void;

  next: () => void;
  previous: () => void;

  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;

  setVolume: (volume: number) => void;

  toggleShuffle: () => void;
  toggleRepeat: () => void;
}

const useSongPlayer = create<songPlayerTypes>((set, get) => ({
  songs: [],
  currentSong: null,
  currentIndex: 0,

  isPlaying: false,

  currentTime: 0,
  duration: 0,

  volume: 80,

  shuffle: false,
  repeat: false,

  setSongs: (songs) => set({ songs }),

  playSong: (song, playlist) => {
    const songs = playlist ?? get().songs;

    const index = songs.findIndex((s) => s.id === song.id);

    set({
      songs,
      currentSong: song,
      currentIndex: index,
      isPlaying: true,
    });
  },

  play: () => set({ isPlaying: true }),

  pause: () => set({ isPlaying: false }),

  togglePLay: () => {
    if (get().isPlaying) get().pause();
    else get().play();
  },

  next: () => {
    const { songs, currentIndex } = get();

    if (!songs.length) return;

    const nextIndex = (currentIndex + 1) % songs.length;

    set({
      currentIndex: nextIndex,
      currentSong: songs[nextIndex],
      isPlaying: true,
    });
  },

  previous: () => {
    const { songs, currentIndex } = get();

    if (!songs.length) return;

    const previousIndex =
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1;

    set({
      currentIndex: previousIndex,
      currentSong: songs[previousIndex],
      isPlaying: true,
    });
  },

  setCurrentTime: (currentTime) => set({ currentTime }),

  setDuration: (duration) => set({ duration }),

  setVolume: (volume) => set({ volume }),

  toggleShuffle: () =>
    set((state) => ({
      shuffle: !state.shuffle,
    })),

  toggleRepeat: () =>
    set((state) => ({
      repeat: !state.repeat,
    })),
}));

export default useSongPlayer;
