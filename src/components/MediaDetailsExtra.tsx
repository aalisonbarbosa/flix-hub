import type { Movie, Series } from "../types/types";

type MediaDetailsExtraProps = {
  mediaDetails: (Movie | Series) & {
    genres?: { id: number; name: string }[];
    production_companies?: { id: number; name: string }[];
    production_countries?: { iso_3166_1: string; name: string }[];
  };
};

export default function MediaDetailsExtra({
  mediaDetails,
}: MediaDetailsExtraProps) {
  const year =
    "release_date" in mediaDetails && mediaDetails.release_date
      ? mediaDetails.release_date.split("-")[0]
      : "first_air_date" in mediaDetails && mediaDetails.first_air_date
      ? mediaDetails.first_air_date.split("-")[0]
      : "Ano desconhecido";

  return (
    <div className="w-full max-w-4xl px-4 col-span-">
      <h1 className="font-bold text-2xl max-md:pt-4">
        {"title" in mediaDetails ? mediaDetails.title : mediaDetails.name}
      </h1>
      <p className="flex items-center text-secondaryText max-md:text-sm my-2">
        {year} {" - "}
        {mediaDetails.genres && mediaDetails.genres.length > 0 && (
          <>{mediaDetails.genres.map((genre) => genre.name).join(", ")}</>
        )}
        {" - "}
        {mediaDetails.production_companies &&
          mediaDetails.production_companies.length > 0 && (
            <>
              {mediaDetails.production_companies.map((c) => c.name).join(", ")}
            </>
          )}
      </p>
      <h2 className="text-lg font-bold">Sinopse</h2>
      <p className="max-w-xl text-sm text-secondaryText">
        {mediaDetails.overview
          ? mediaDetails.overview.length > 300
            ? `${mediaDetails.overview.slice(0, 300)}...`
            : mediaDetails.overview
          : "Sem descrição disponível."}
      </p>
    </div>
  );
}
