"use client"

import { Play } from "lucide-react";
import { ArrowDownFromLine } from "lucide-react";
import { Trash2 } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { useDeleteSong } from "@/hooks/supabase/useDeleteSong";
import { SongType } from "@/types/songType";
import { useDownloadSong } from "@/hooks/supabase/useDownloadSong";
import { Button } from "../ui/button";
// import { useSongPlayerContext } from "@/hooks/useSongPlayerContext";
import Image from "next/image";
import { useAllAlbuns } from "@/hooks/supabase/useAllAlbuns";
import { DialogTransferSongs } from "../DialogTransferSongs/DialogTransferSongs";
import { toast } from "sonner";
import { useRef, useState } from "react";

interface CardSongTypes {
    songs: SongType[]
}

export default function CardSong({songs}: CardSongTypes) {

  const { mutate: deleteSong, isPending } = useDeleteSong();

  const { mutate: downloadSong } = useDownloadSong();
  
  const { data: albuns } = useAllAlbuns();

//   const { playSong } = useSongPlayerContext();

  const handleDeleteSong = (song: SongType) => {
    if (song) {
        toast(`Deseja deletar a música "${song.name}"?`, {
            action: {
                label: "Confirmar",
                onClick: () => deleteSong(song),
            },
            cancel: {
                label: "Cancelar",
                onClick: () => {return},
            },
        });
    }
  };

   const [playingIndex, setPlayingIndex] = useState<number | null>(null);
   const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  const togglePlay = (index: number) => {
    const audio = audioRefs.current[index];

    if (!audio) return;

    // Se clicou na música que já está tocando
    if (playingIndex === index) {
        audio.pause();
        setPlayingIndex(null);
        return;
    }

    // Pausa a música anterior
    if (playingIndex !== null) {
        audioRefs.current[playingIndex]?.pause();
    }

    // Reinicia a nova música
    audio.currentTime = 0;
    audio.play();

    setPlayingIndex(index);
};

  return (
    songs?.length === 0 ? (
        <p className="text-4xl text-gray-400 text-center font-extrabold p-10 col-span-2 md:col-span-4">
            Este álbum ainda não possui músicas.
        </p> ) :

    songs?.map((song, index) => (
        <li key={song.id}
        className={`${
            isPending && "opacity-5"
        } border-2 p-2 md:px-2 md:py-4 rounded-lg shadow flex justify-between items-center md:flex-col md:items-stretch gap-2`}
        >
        <Image
            src={`https://picsum.photos/600/300?song=${index}`}
            alt="capa da música"
            className="md:w-full md:h-37.25 bg-gray-950"
            width={128}
            height={56}
        />

        <div className="w-full text-center space-y-2 md:space-y-6">
            <p className="text-[12px] md:text-sm font-medium break-word line-clamp-2">
            {song.name}
            </p>

            <DialogTransferSongs albuns={albuns!} songId={song.id} />

            <div className="grid grid-cols-4 justify-items-center items-center gap-3">
            <Button
                
                // onClick={() => playSong(index)}
                onClick={() => togglePlay(index)}
                className="size-9 md:size-10 grid place-items-center rounded-full bg-white text-black"
                aria-label="selecionar musica"
                title="Selecionar musica"
                variant="secondary"
            >
                {playingIndex === index ? "Pause" : <Play />}
            </Button>
            <Button
                className="size-9 md:size-10 text-blue-600"
                title="Baixar música"
                aria-label="Baixar música"
                variant="secondary"
                onClick={() =>
                downloadSong({
                    filePath: song.filePath,
                    fileName: song.name,
                })
                }
            >
                <ArrowDownFromLine />
            </Button>
            <Button
                className="size-9 md:size-10 text-2xl grid place-items-center rounded-full text-black hover:bg-destructive"
                title="Deletar música"
                aria-label="Deletar música"
                variant="secondary"
                onClick={() => handleDeleteSong(song)}
            >
                <Trash2 />
            </Button>
            <Button
                className="size-9 md:size-10 text-orange-400"
                title="adicionar a playlist"
                aria-label="adicionar a playlist"
                variant="secondary"
            >
                <CirclePlus className="w-full" />
            </Button>
            </div>
        </div>

        <audio ref={(el) => {audioRefs.current[index] = el;}}
        src={song.url} onEnded={() => setPlayingIndex(null)} preload="metadata" />
        </li>
    ))
  )
};