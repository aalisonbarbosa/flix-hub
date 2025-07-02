import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import MediaCard from "../components/CarouselMediaCard";
import Pagination from "../components/Pagination";
import { fetchPaginatedMedia } from "../api/tmdb";
import type { Movie } from "../types/types";

export default function MoviesPage() {
  const { movies, page } = useLoaderData() as {
    movies: Movie[];
    page: number;
  };

  if (!movies) {
    return <h1>error ao buscar filmes</h1>;
  }

  return (
    <>
      <h1 className="text-text text-2xl font-semibold uppercase pl-4 py-6 flex items-center gap-2">
        <div className="h-8 w-1 bg-cta"></div>Filmes
      </h1>
      <div className="min-h-[calc(100vh-256px)] w-full flex flex-wrap items-center gap-4">
        <div className="grid max-sm:grid-cols-3 max-lg:grid-cols-4 lg:grid-cols-5 px-4 justify-start gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="basis-[180px] lg:basis-[220px] grow-0 shrink-0"
            >
              <MediaCard media={movie} />
            </div>
          ))}
        </div>
      </div>
      <Pagination page={page} mediaType="movies" totalPages={500} />
    </>
  );
}

export async function loadPaginatedMovies({ params }: LoaderFunctionArgs) {
  const page = Number(params.page) || 1;

  const movies = await fetchPaginatedMedia("movie", page);

  return { movies, page };
}
