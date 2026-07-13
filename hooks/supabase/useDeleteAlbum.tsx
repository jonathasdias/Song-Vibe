import { createClient } from "@/lib/supabase/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useDeleteAlbum() {
    const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (albumId: string) => {
      const { error } = await supabase
        .from("albuns")
        .delete()
        .eq("id", albumId);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albuns"] });
      queryClient.invalidateQueries({ queryKey: ["albumByTitle"] });
      queryClient.invalidateQueries({ queryKey: ["songsByAlbumId"] });
    },
  });
}
