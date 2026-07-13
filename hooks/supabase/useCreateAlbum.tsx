import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { AlbumType } from "@/types/albumType";

export function useCreateAlbum() {

    const supabase = createClient();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (album: { title: string; user_id: string }) => {
      const { data, error } = await supabase
        .from("albuns")
        .insert(album)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (newAlbum) => {
      queryClient.setQueryData(["albuns"], (old: AlbumType[]) => {
        return old ? [...old, newAlbum] : [newAlbum];
      });
    },
  });
}
