import { useLoaderData } from "react-router-dom";
import { fetchTmdbMedia } from "../api/tmdb";
import MovieHeroCarousel from "../components/MovieHeroCarousel";
import MediaCarousel from "../components/MediaCarousel";
import Footer from "../components/Footer";

export default function HomePage() {
  const { movies, series } = useLoaderData();

  return (
    <>
      <MovieHeroCarousel movies={movies.slice(0, 6)} />
      <MediaCarousel media={movies.slice(0, 18)} mediaType="movie" />
      <MediaCarousel media={series.slice(0, 18)} mediaType="tv" />
      <Footer />
    </>
  );
}

export async function loadMoviesAndSeries() {
  const movies = await fetchTmdbMedia("movie", 1);
  const series = await fetchTmdbMedia("tv", 1);

  return { movies, series };
}
