"use client"

import CardSong from "@/components/CardSong/CardSong";
import { MoveLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useStorageUsage } from "@/hooks/supabase/useStorageUsage";
import { formatBytes } from "@/utils/formatBytes";
import { useAllAlbuns } from "@/hooks/supabase/useAllAlbuns";
import { DialogTransferSongs } from "@/components/DialogTransferSongs/DialogTransferSongs";
import FormUploadSongs from "@/components/FormUploadSongs/FormUploadSongs";
import { toast } from "sonner";
import { useSongsByAlbumId } from "@/hooks/supabase/useSongsByAlbumId";

// import Miniplayer from "@/components/Miniplayer";

export default function MyAlbum() {

    const router = useRouter();
    const params = useParams();
    const { id:albumId, title } = params;

    const { data: songs, error:songsError } = useSongsByAlbumId(albumId! as string);

    if (songsError) {
        toast.error("Músicas relacionadas a esse album não foram encontradas.");
        console.error(
        "Erro ao buscar músicas relacionadas a esse album:",
        songsError
        );
    }

    const { data: albuns } = useAllAlbuns();

    const { data: storageUsage, isLoading: storageUsageloading } =
        useStorageUsage("songs");

    return (
        <main className="p-6">
            <MoveLeft className="cursor-pointer" size={40} onClick={()=> router.back()} />

            <h1 className="text-center font-extrabold text-5xl mb-5">{title}</h1>

            {/* {songs && songs.length > 0 && <Miniplayer songs={songs!} />} */}

            <div className="mb-6 border-b p-2 flex justify-between items-center">
                <div
                className="flex flex-col md:flex-row justify-between gap-y-1 gap-x-4"
                aria-label="informações do album"
                >
                    
                <p>
                    <strong>Músicas:</strong> {songs?.length}
                </p>

                <p>
                    <strong>Usado:</strong>{" "}
                    {!storageUsageloading &&
                    formatBytes(Number(storageUsage?.totalBytes))}
                </p>
                </div>

                <div className="flex items-center flex-nowrap gap-x-2">
                <DialogTransferSongs albuns={albuns!} fromAlbumId={albumId! as string} />

                {albumId && <FormUploadSongs albumId={albumId! as string} />}
                </div>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
               <CardSong songs={songs!} />
            </ul>
        </main>
    )
}