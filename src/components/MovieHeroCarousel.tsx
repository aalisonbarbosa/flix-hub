import { useEffect, useState } from "react";
import type { Movie } from "../types/types";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Link } from "react-router-dom";

interface MovieHeroCarouselProps {
  movies: Movie[];
}

export default function MovieHeroCarousel({ movies }: MovieHeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="w-full flex flex-col justify-evenly items-center h-80 px-4">
      <Carousel
        className="w-full max-w-7xl"
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 px-2"
            >
              <Link to={`/media-details/movie/${movie.id}`}>
                <div className="relative w-full overflow-hidden rounded-md shadow-lg">
                  <div className="absolute bottom-4 left-4 text-text">
                    <h3>{movie.title}</h3>
                    <span className="text-sm text-secondaryText">
                      {movie.release_date.split("-")[0]}
                    </span>
                  </div>
                  <img
                    src={`${imageBaseUrl}${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-auto object-cover aspect-[16/9]"
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 max-sm:hidden" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 max-sm:hidden" />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm flex gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === current - 1 ? "bg-hover" : "bg-text"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
