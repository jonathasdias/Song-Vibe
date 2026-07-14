import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { SongType } from "@/types/songType";

export function useSongsByAlbumId(albumId: string) {

    const supabase = createClient();

  return useQuery<SongType[] | null, Error>({
    queryKey: ["songsByAlbumId", albumId],
    queryFn: async () => {
      if (!albumId) return [];

      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("album_id", albumId);

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!albumId,
  });
}
