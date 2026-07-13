import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { AlbumType } from "@/types/albumType";

export function useAllAlbuns() {

    const supabase = createClient();

    return useQuery<AlbumType[]>({
        queryKey: ["albuns"],
        queryFn: async () => {
        const { data, error } = await supabase.from("albuns").select(`*, songs(count)`);

        if (error) throw new Error(error.message);
        return data;
        },
    });
}
