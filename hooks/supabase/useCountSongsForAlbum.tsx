import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export function useCountSongsForAlbum(albumId: string | null) {

    const supabase = createClient();
    
  return useQuery({
    queryKey: ["songCount", albumId],
    enabled: !!albumId,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("songs")
        .select("id", { count: "exact", head: true })
        .eq("album_id", albumId!);

      if (error) {
        throw new Error(error.message);
      }

      return count ?? 0;
    },
  });
}
