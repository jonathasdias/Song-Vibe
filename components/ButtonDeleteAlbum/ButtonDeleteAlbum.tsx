"use client"

import { AlbumType } from "@/types/albumType";
import { Button } from "../ui/button";
import { useDeleteAlbum } from "@/hooks/supabase/useDeleteAlbum";

interface PropsTypes {
    album: AlbumType
}

export default function ButtonDeleteAlbum({album}: PropsTypes) {

    const { mutate: mutDeleteAlbum, isPending: deleteIsPending } = useDeleteAlbum();

    function deleteAlbum() {
        if (
              album &&
              confirm(
                "Tem certeza que deseja excluir este álbum e suas músicas?"
              )
            ) {
              mutDeleteAlbum(album.id);
            }
    }
    
    return (
        <Button onClick={deleteAlbum} className="text-red-600" variant='destructive'>
            {deleteIsPending ? (
            <p className="animate-pulse">Deletando...</p>
          ) : (
            "Deletar"
          )}
        </Button>
    )
}