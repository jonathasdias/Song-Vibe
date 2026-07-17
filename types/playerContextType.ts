import { SongType } from "./songType";

export interface PlayerContextType {
    queue: SongType[];
    currentSong: SongType | null;

    currentIndex: number;

    playing: boolean;

    volume: number;

    progress: number;

    duration: number;

    repeat: boolean;

    shuffle: boolean;

    play: (songs: SongType[], index: number) => void;

    pause: () => void;

    resume: () => void;

    next: () => void;

    previous: () => void;

    seek: (value: number) => void;

    setVolume: (value: number) => void;

    toggleRepeat: () => void;

    toggleShuffle: () => void;
}