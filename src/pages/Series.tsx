import { fetchPaginatedMedia } from "../api/tmdb";
import MediaCard from "../components/MediaCard";
import Pagination from "../components/Pagination";
import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import type { Series } from "../types/types";

export default function SeriesPage() {
  const { series, page } = useLoaderData() as {
    series: Series[];
    page: number;
  };

  if (!series) {
    return <h1>error ao buscar filmes</h1>;
  }

  return (
    <>
      <h1 className="text-text text-2xl font-semibold uppercase pl-4 py-6 flex items-center gap-2">
        <div className="h-8 w-1 bg-cta"></div>Séries
      </h1>
      <div className="min-h-[calc(100vh-256px)] w-full flex flex-wrap items-center gap-4">
        <div className="grid max-sm:grid-cols-3 max-lg:grid-cols-4 lg:grid-cols-5 px-4 justify-start gap-4">
          {series.map((item) => (
            <div
              key={item.id}
              className="basis-[180px] lg:basis-[220px] grow-0 shrink-0"
            >
              <MediaCard media={item} />
            </div>
          ))}
        </div>
      </div>
      <Pagination page={page} mediaType="series" totalPages={500} />
    </>
  );
}

export async function loadPaginatedSeries({ params }: LoaderFunctionArgs) {
  const page = Number(params.page) || 1;

  const series = await fetchPaginatedMedia("tv", page);

  return { series, page };
}
