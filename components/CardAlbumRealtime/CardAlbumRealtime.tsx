"use client"

import { createClient } from "@/lib/supabase/client";
import { AlbumType } from "@/types/albumType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ButtonDeleteAlbum from "../ButtonDeleteAlbum/ButtonDeleteAlbum";

interface CardAlbumProps {
    serverAlbums: AlbumType[]
}

export default function CardAlbumRealtime({serverAlbums}: CardAlbumProps) {

    const [albums, setAlbums] = useState(serverAlbums);

    const supabase = createClient();

    useEffect(()=> {

        const channel = supabase.channel('realtime albums').on('postgres_changes', {
            event: "INSERT", schema: "public", table: "albums"
        }, (payload)=> {
            setAlbums([...albums, payload.new as AlbumType])
        }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    }, [supabase, albums, setAlbums])

    return (
        albums.map((album)=> (
            <li key={album.id} className="bg-gray-800 rounded-lg shadow p-2 sm:p-4 space-y-1 list-none">
                <Image
                src={`https://picsum.photos/600/200?album=${album.id + 1}`}
                alt="Capa do album"
                width={1000}
                height={200}
                loading="eager"
                />

                <div className="flex justify-between items-center">
                    <div>
                        <Link
                        className="text-2xl hover:text-blue-600 hover:underline cursor-pointer"
                        href={`/album/${encodeURIComponent(album.title)}/${encodeURIComponent(album.id)}`}>
                        {album.title}
                        </Link>
                        <h2>Músicas: {album.songs?.[0]?.count ?? 0}</h2>
                    </div>

                    <ButtonDeleteAlbum albumId={album.id} />
                </div>
            </li>
        ))
        
    )
}