import type { FilmographyItem, PersonCredits } from "../types/types";

type TmdbResponse = {
  results: any[];
};

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

if (!TOKEN) {
  throw new Error("TMDB token não definido. Verifique seu .env.");
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: TOKEN,
  },
};

export async function fetchTmdbMedia(
  mediaType: "movie" | "tv",
  totalPages: number
): Promise<any[]> {
  const requests: Promise<TmdbResponse>[] = [];

  for (let page = 1; page <= totalPages; page++) {
    const url = `https://api.themoviedb.org/3/discover/${mediaType}?language=pt-BR&page=${page}`;
    requests.push(
      fetch(url, options)
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(
              `Erro na requisição: ${res.status} ${res.statusText}`
            );
          }
          return res.json();
        })
        .catch((error) => {
          console.error(
            `Falha ao buscar ${mediaType} na página ${page}:`,
            error
          );
          return { results: [] };
        })
    );
  }

  const results = await Promise.all(requests);
  return results.flatMap((result) => result.results);
}

export async function fetchPaginatedMedia(mediaType: "movie" | "tv", page: number) {
  const url = `https://api.themoviedb.org/3/discover/${mediaType}?language=pt-BR&page=${page}`;

  const response = await fetch(url, options);
  const data = await response.json()

  return data.results;
}

export async function fetchMediaDetails(mediaType: "movie" | "tv", id: number) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}?language=pt-BR`;

  const response = await fetch(url, options);

  if (!response.ok) throw new Error("Erro ao buscar detalhes");

  return response.json();
}

export async function fetchCredits(mediaType: "movie" | "tv", id: number) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=pt-BR`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Erro ao buscar elenco.");
  }

  return response.json();
}

export async function fetchMediaByTitle(title: string) {
  const url = `https://api.themoviedb.org/3/search/multi?language=pt-BR&query=${encodeURIComponent(title)}`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Erro ao buscar media.");
  }

  const data = await response.json();

  return data.results;
}

export async function fetchRecommendedMedia(mediaType: string, movieId: number) {
  const url = `https://api.themoviedb.org/3/${mediaType}/${movieId}/recommendations?language=pt-BR`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Erro ao buscar recomendações.");
  }

  const data = await response.json();
  return data.results;
}

export async function fetchPersonById(id: number) {
  const url = `https://api.themoviedb.org/3/person/${id}`

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Erro ao buscar pessoa.");
  }

  const data = await response.json();
  return data;
}

export async function fetchPersonFilmography(id: number): Promise<FilmographyItem[]> {
  const url = `https://api.themoviedb.org/3/person/${id}/combined_credits`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Erro ao buscar a filmografia.");
  }

  const data: PersonCredits = await response.json();

  // Retorna apenas o elenco (cast), ordenado por data de lançamento
  const filmography = data.cast
    .filter((item) => item.media_type === "movie" || item.media_type === "tv")
    .sort((a, b) => {
      const dateA = new Date(a.release_date || a.first_air_date || "").getTime();
      const dateB = new Date(b.release_date || b.first_air_date || "").getTime();
      return dateB - dateA; // Mais recentes primeiro
    });

  return filmography;
}