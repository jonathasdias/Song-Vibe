import ButtonAddAlbum from "@/components/ButtonAddAlbum/ButtonAddAlbum";
import CardAlbum from "@/components/CardAlbum/CardAlbum";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const supabase = await createClient();

  const {data: { user }} = await supabase.auth.getUser();

  if (!user) {
    redirect('/login')
  }

  const { data: albuns } = await supabase.from("albuns").select("*");

  return (
    <main className="min-h-screen text-white p-2 sm:p-6">

      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8">
        🎵 Albuns
      </h1>

      <section className="p-4">
        <div className="flex justify-between items-center border-b border-gray-400 p-2">
          <p>
            <b>Albuns:</b> {albuns?.length}
          </p>

          <ButtonAddAlbum />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mx-auto px-1 py-4 md:p-4">
          <CardAlbum />
        </ul>
      </section>
    </main>
  );
}