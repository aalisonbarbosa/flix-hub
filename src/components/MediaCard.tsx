import { Link } from "react-router-dom";
import type { FilmographyItem, Movie, Series } from "../types/types";

export default function MediaCard({
  media,
}: {
  media: Movie | Series | FilmographyItem;
}) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const mediaType = "title" in media ? "movie" : "tv";

  const year =
    "release_date" in media && media.release_date
      ? media.release_date.split("-")[0]
      : "first_air_date" in media && media.first_air_date
      ? media.first_air_date.split("-")[0]
      : "Ano desconhecido";

  return (
    <Link to={`/media-details/${mediaType}/${media.id}`}>
      <div className="relative group">
        <img
          src={
            media.poster_path === null
              ? "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png"
              : `${imageBaseUrl}${media.poster_path}`
          }
          alt={"title" in media ? media.title : media.name}
          className="w-full h-auto object-cover rounded-md shadow-md group-hover:scale-105 transition-transform duration-300 text-secondaryText"
        />
        <p className="text-sm text-text mt-2 truncate">
          {"title" in media ? media.title : media.name}
        </p>
        <p className="text-sm text-secondaryText mt-2 truncate">{year}</p>
      </div>
    </Link>
  );
}
