import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SongType } from "@/types/songType";
import { createClient } from "@/lib/supabase/client";

export function useDeleteSong() {
    const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (song: SongType) => {
      const { error: storageError } = await supabase.storage
        .from("songs")
        .remove([song.filePath]);

      if (storageError) {
        throw new Error("Erro ao remover do storage: " + storageError.message);
      }

      const { error: dbError } = await supabase
        .from("songs")
        .delete()
        .eq("id", song.id);

      if (dbError) {
        throw new Error(
          "Erro ao remover do banco de dados: " + dbError.message
        );
      }
    },
    onSuccess: (_, song) => {
      toast.success(`Música "${song.name}" deletada com sucesso.`);
      queryClient.invalidateQueries({ queryKey: ["songsByAlbumId"] });
      queryClient.invalidateQueries({ queryKey: ["storage-usage"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
