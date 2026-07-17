"use client";

import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import formatSeconds from "@/utils/formatSeconds";
import { useEffect, useRef } from "react";
import useSongPlayer from "@/hooks/supabase/useSongPlayer";

export default function Miniplayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentSong,
    currentTime,
    duration,
    isPlaying,
    play,
    pause,
    next,
    previous,
    repeat,
    setCurrentTime,
    setDuration,
    setVolume,
    shuffle,
    songs,
    toggleRepeat,
    toggleShuffle,
    volume,
  } = useSongPlayer();

  function togglePLay() {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      pause();
    } else {
      audioRef.current.play();
      play();
    }
  }

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    audio.pause();

    audio.src = currentSong.url;

    audio.load();
  }, [currentSong]);

  const handleEnded = () => {
    if (repeat) {
      audioRef.current!.currentTime = 0;
      audioRef.current!.play();
      return;
    }
    next();
  };

  return (
    <aside
      className="border-t-2 bg-gray-950 fixed bottom-0 left-0 right-0 z-10 p-2 flex flex-col gap-y-1 min-h-30"
      aria-label="Miniplayer de áudio"
    >
      {songs.length > 0 && (
        <audio
          ref={audioRef}
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration);
          }}
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime);
          }}
          onCanPlay={() => {
            if (isPlaying) audioRef.current?.play();
          }}
          onEnded={handleEnded}
        />
      )}
      <div>
        <div className="bg-gray-900 px-2 rounded">
          <Slider
            value={[currentTime]}
            min={0}
            max={duration || 1}
            step={1}
            onValueChange={([value]) => {
              setCurrentTime(value);

              if (audioRef.current) audioRef.current.currentTime = value;
            }}
            className="w-full h-1 md:h-auto py-4 cursor-pointer"
          ></Slider>
        </div>
        <div className="flex justify-between px-4 text-sm">
          <span>{formatSeconds(currentTime)}</span>
          <span>{formatSeconds(duration)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-x-1">
          <Slider
            value={[volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={([value]) => {
              setVolume(value);

              if (audioRef.current) audioRef.current.volume = value;
            }}
            className="w-28"
          ></Slider>
        </div>
      </div>

      <div
        className="flex justify-around items-center mt-1"
        aria-label="Botões de controle das musicas."
      >
        <Button
          className={`${shuffle ? "bg-red-700" : ""}`}
          onClick={toggleShuffle}
        >
          <Shuffle />
        </Button>

        <Button onClick={previous}>
          <SkipBack />
        </Button>

        <Button
          className="size-9 md:size-10 grid place-items-center rounded-full bg-white text-black"
          aria-label="selecionar musica"
          title="Selecionar musica"
          variant="secondary"
          onClick={togglePLay}
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>

        <Button onClick={handleEnded}>
          <SkipForward />
        </Button>

        <Button
          className={`${repeat ? "bg-red-700" : ""}`}
          onClick={toggleRepeat}
        >
          <Repeat />
        </Button>
      </div>
    </aside>
  );
}
