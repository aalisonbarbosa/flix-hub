import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom";
import { fetchPersonById, fetchPersonFilmography } from "../api/tmdb";
import type { FilmographyItem, Person } from "../types/types";
import MediaCard from "../components/MediaCard";

export default function PersonPage() {
  const {
    person,
    filmography,
  }: {
    person: Person;
    filmography: FilmographyItem[];
  } = useLoaderData();

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  function formatGender(gender: number): string {
    switch (gender) {
      case 1:
        return "Feminino";
      case 2:
        return "Masculino";
      case 3:
        return "Não-binário";
      default:
        return "Não especificado";
    }
  }

  return (
    <>
      <div className="text-text grid grid-cols-3 py-6 max-lg:grid-cols-1 max-lg:pl-4">
        <div className="flex justify-center items-center max-lg:mb-4">
          <img
            src={
              person.profile_path === null
                ? "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                : `${imageBaseUrl}${person.profile_path}`
            }
            alt={person.name}
            className="h-96 rounded-md"
          />
        </div>
        <div className="max-sm:mt-4 col-span-2">
          <h1 className="text-2xl font-bold">{person.name}</h1>
          <h2 className="text-lg font-bold my-2 flex items-center gap-2">
            <div className="h-8 w-1 bg-cta"></div>Biografia
          </h2>
          <p className="w-[80%] text-secondaryText text-sm">
            {person.biography.length > 0
              ? person.biography
              : "Biografia não disponível no momento."}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 text-text max-lg:grid-cols-1">
        <div className="pl-4">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <div className="h-8 w-1 bg-cta"></div>Informações pessoais
          </h2>
          <h3 className="text-lg font-bold">Gênero</h3>
          <p className="text-secondaryText">{formatGender(person.gender)}</p>
          <h3 className="text-lg font-bold">Data de nascimento</h3>
          <p className="text-secondaryText">
            {person.birthday
              ? person.birthday
              : "Data de nascimento desconhecida."}
          </p>
          {person.deathday && (
            <>
              <h3 className="text-lg font-bold">Data de falecimento</h3>
              <p className="text-secondaryText">{person.deathday}</p>
            </>
          )}
          <h3 className="text-lg font-bold">Local de nascimento</h3>
          <p className="text-secondaryText">
            {person.place_of_birth === null
              ? "Local de nascimento desconhecido."
              : person.place_of_birth}
          </p>
        </div>
        <div className="grid col-span-2 pr-4 max-lg:p-4">
          <h2 className="text-xl font-bold my-4 flex items-center gap-2">
            <div className="h-8 w-1 bg-cta"></div>Filmografia
          </h2>
          <div className="grid grid-cols-6 max-md:grid-cols-4 max-sm:grid-cols-3 gap-4">
            {filmography.map((item) => (
              <MediaCard media={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const castMemberLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  const person = await fetchPersonById(Number(id));
  const filmography = await fetchPersonFilmography(Number(id));

  return { person, filmography };
};
