"use client"

import Image from "next/image";
import Link from "next/link";
import ButtonDeleteAlbum from "../ButtonDeleteAlbum/ButtonDeleteAlbum";
import { useAllAlbuns } from "@/hooks/supabase/useAllAlbuns";

export default function CardAlbum() {

    const { data: albuns } = useAllAlbuns();

    return (
        albuns?.map(album => (
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
                        <h2>Músicas: {album?.songs?.[0].count}</h2>
                    </div>

                    <ButtonDeleteAlbum album={album} />
                </div>
            </li>
        ))
    )
}