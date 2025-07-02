import { Link } from "react-router-dom";
import type { Movie, Series } from "../types/types";

export default function CarouselMediaCard({
  media,
}: {
  media: Movie | Series;
}) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const mediaType = "title" in media ? "movie" : "tv";

  return (
    <Link to={`/media-details/${mediaType}/${media.id}`}>
      <div className="relative group">
        <img
          src={`${imageBaseUrl}${media.poster_path}`}
          alt={"title" in media ? media.title : media.name}
          className="w-full h-auto rounded-md shadow-md group-hover:scale-105 transition-transform duration-300"
        />
        <p className="text-sm text-text mt-2 truncate">
          {"title" in media ? media.title : media.name}
        </p>
        <p className="text-sm text-secondaryText mt-2 truncate">
          {"release_date" in media
            ? media.release_date.split("-")[0]
            : media.first_air_date.split("-")[0]}
        </p>
      </div>
    </Link>
  );
}
