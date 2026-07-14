import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface TransferSongParams {
  songId: string;
  toAlbumId: string;
}

export function useTransferSong() {
    const supabase = createClient();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ songId, toAlbumId }: TransferSongParams) => {
      if (!songId || !toAlbumId)
        throw new Error("Selecione a música e o álbum de destino.");

      const { data, error } = await supabase
        .from("songs")
        .update({ album_id: toAlbumId })
        .eq("id", songId)
        .select();

      if (error) throw error;

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songsByAlbumId"] });
      queryClient.invalidateQueries({ queryKey: ["albuns"] });
    },
  });

  return mutation;
}
