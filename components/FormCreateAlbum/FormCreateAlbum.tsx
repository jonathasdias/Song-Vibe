'use client'

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Loading from "../Loading/Loading";
import { useCreateAlbum } from "@/hooks/supabase/useCreateAlbum";


interface CreateAlbumFormType {
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormCreateAlbum({ className, setOpen }: CreateAlbumFormType) {
  const [titleAlbum, setTitleAlbum] = useState<string>("");

  const supabase = createClient();

  const { mutate: createAlbum, isPending, error } = useCreateAlbum();
  
  async function handleCreateAlbum(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (titleAlbum.trim() === "") {
        alert("O título não pode ser vazio.");
        return;
    }

    const { data: {user}, error: userError } = await supabase.auth.getUser();
        
    if (userError || !user) {
      console.error("Usuário não autenticado");
      alert("Você precisa estar logado para criar um álbum.");
      return;
    }

    createAlbum({ title: titleAlbum, user_id: user?.id });
    setTitleAlbum("");

    if (error) {
      console.error("Erro ao criar álbum:", error.message);
      alert("Erro ao criar álbum");
    } else {
      alert("Álbum criado com sucesso!");
      setOpen(false);
    }
  }

  return (
    <form
      onSubmit={handleCreateAlbum}
      className={cn("grid items-start gap-6", className)}
    >
      <div className="grid gap-3">
        <Label htmlFor="titleAlbum">Titulo do album</Label>
        <Input
          type="text"
          id="titleAlbum"
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitleAlbum(e.target.value)}
          minLength={2}
          maxLength={30}
          required
        />
      </div>
      {isPending ? <Loading /> : <Button>Criar</Button>}
    </form>
  );
};