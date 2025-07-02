import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import {
  fetchCredits,
  fetchMediaDetails,
  fetchRecommendedMedia,
} from "../api/tmdb";
import type { Credits, Movie, Series } from "../types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import MediaCard from "../components/MediaCard";
import MediaDetailsExtra from "../components/MediaDetailsExtra";

export default function MidiaDetailsPage() {
  const { media, credits, recommended } = useLoaderData() as {
    media: Movie | Series;
    credits: Credits;
    recommended: Movie[] | Series[];
  };

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="min-h-[calc(100vh-80px)] text-text pt-6">
      <div className="grid grid-cols-3 max-md:grid-cols-1">
        <div className="flex justify-center items-center">
          <img
            src={
              media.poster_path === null
                ? "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
                : `${imageBaseUrl}${media.poster_path}`
            }
            alt={"title" in media ? media.title : media.name}
            className="h-96 rounded-md"
          />
        </div>
        <MediaDetailsExtra mediaDetails={media} />
      </div>
      {credits.cast.length > 0 && (
        <div className="p-4">
          <h2 className="flex items-center gap-2 text-lg font-bold py-4 uppercase">
            <div className="h-8 w-1 bg-cta"></div>Elenco
          </h2>
          <div className="w-full flex justify-center items-center">
            <Carousel className="w-full">
              <CarouselContent>
                {credits.cast.map((actor) => (
                  <CarouselItem
                    key={actor.id}
                    className="basis-[150px] sm:basis-[180px] md:basis-[200px] lg:basis-[220px] transition-transform"
                  >
                    <Link to={`/person/${actor.id}`}>
                      <div className="relative group">
                        <img
                          src={
                            actor.profile_path === null
                              ? "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                              : `${imageBaseUrl}${actor.profile_path}`
                          }
                          alt={actor.name}
                          className="rounded-md w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <p className="my-2">{actor.name}</p>
                        <p className="text-sm text-secondaryText">
                          {actor.character}
                        </p>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      )}
      {recommended.length > 0 && (
        <div className="px-4 pb-4">
          <h2 className="flex items-center gap-2 text-lg font-bold py-4 uppercase">
            <div className="h-8 w-1 bg-cta"></div>Recomendações
          </h2>
          <div className="grid max-sm:grid-cols-3 max-lg:grid-cols-5 lg:grid-cols-7 px-4 justify-start gap-4">
            {recommended.map((item) => (
              <div
                key={item.id}
                className="basis-[180px] lg:basis-[220px] grow-0 shrink-0"
              >
                <MediaCard media={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export async function loadMediaDetails({ params }: LoaderFunctionArgs) {
  const { id, mediaType } = params;

  if (!id || !mediaType) throw new Error("ID ou tipo de mídia ausente");

  const media = await fetchMediaDetails(
    mediaType as "movie" | "tv",
    Number(id)
  );

  const credits = await fetchCredits(mediaType as "movie" | "tv", Number(id));

  const recommended = await fetchRecommendedMedia(mediaType, Number(id));

  return { media, credits, recommended };
}
