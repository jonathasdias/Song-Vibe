import { Play, Repeat, Shuffle, SkipBack, SkipForward } from "lucide-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import formatSeconds from "@/utils/formatSeconds";
import { SongType } from "@/types/songType";

interface MiniplayerPropsTypes {
  songs: SongType[];
}

export default function Miniplayer({ songs }: MiniplayerPropsTypes) {
  return (
    <aside
      className="border-t-2 bg-gray-950 fixed bottom-0 left-0 right-0 z-10 p-2 flex flex-col gap-y-1 min-h-30"
      aria-label="Miniplayer de áudio"
    >
      {songs.length > 0 && <audio />}
      <div>
        <div className="bg-gray-900 px-2 rounded">
          <Slider
            value={[0]}
            min={0}
            max={100}
            step={0.8}
            className="w-full h-1 md:h-auto py-4 cursor-pointer"
          ></Slider>
        </div>
        <div className="flex justify-between px-4 text-sm">
          <span>{formatSeconds(120)}</span>
          <span>{formatSeconds(120)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-x-1">
          <Slider
            value={[80]}
            min={0}
            max={1}
            step={0.01}
            className="w-28"
          ></Slider>
        </div>
      </div>

      <div
        className="flex justify-around items-center mt-1"
        aria-label="Botões de controle das musicas."
      >
        <Button>
          <Shuffle />
        </Button>

        <Button>
          <SkipBack />
        </Button>

        <Button
          className="size-9 md:size-10 grid place-items-center rounded-full bg-white text-black"
          aria-label="selecionar musica"
          title="Selecionar musica"
          variant="secondary"
        >
          <Play />
        </Button>

        <Button>
          <SkipForward />
        </Button>

        <Button>
          <Repeat />
        </Button>
      </div>
    </aside>
  );
}
