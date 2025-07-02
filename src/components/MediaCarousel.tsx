import { Link } from "react-router-dom";
import type { Movie, Series } from "../types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import CarouselMediaCard from "./CarouselMediaCard";

interface ParamsProps {
  media: Movie[] | Series[];
  mediaType: "movie" | "tv";
}

export default function MediaCarousel({ media, mediaType }: ParamsProps) {
  return (
    <div className="relative py-6 px-4">
      <div className="flex justify-between items-center mb-4 text-text uppercase">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <div className="h-8 w-1 bg-cta"></div>
          {mediaType === "movie" ? "Filmes" : "Séries"}
        </h2>
        <Link
          to={`${mediaType === "movie" ? "/movies/page/1" : "/series/page/1"}`}
        >
          <button className="text-sm bg-cta hover:bg-hover duration-300 p-2 rounded-sm">
            Ver tudo
          </button>
        </Link>
      </div>
      <Carousel className="w-full mx-auto">
        <CarouselContent className="gap-4">
          {media.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-[150px] sm:basis-[180px] md:basis-[200px] lg:basis-[220px] transition-transform"
            >
              <CarouselMediaCard media={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 max-sm:hidden" />
        <CarouselNext className="right-0 max-sm:hidden" />
      </Carousel>
    </div>
  );
}
