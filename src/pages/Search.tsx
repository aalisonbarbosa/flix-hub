import { IoSearch } from "react-icons/io5";
import { fetchMediaByTitle } from "../api/tmdb";
import { useEffect, useRef, useState } from "react";
import type { Movie, Series } from "../types/types";
import MediaCard from "../components/MediaCard";
import {
  useLoaderData,
  useNavigate,
  useParams,
  type LoaderFunctionArgs,
} from "react-router-dom";

export default function SearchPage() {
  const navigate = useNavigate();
  const params = useParams();
  const searchedTitle = params.title ?? "";

  const [searchInput, setSearchInput] = useState<string>("");

  const results = (useLoaderData() as (Movie | Series)[]) || [];

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!searchInput.trim()) return;

    const formatted = encodeURIComponent(searchInput.trim());
    navigate(`/search/${formatted}`);
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-80px)] px-4">
      <form
        className="flex items-center bg-hover py-2 rounded-sm w-full max-w-lg my-8"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          id="title"
          className="bg-transparent focus:outline-none text-text w-5/6 pl-4"
          placeholder="Pesquisa..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          ref={inputRef}
        />
        <div className="w-1/6 flex justify-end pr-4">
          <button type="submit">
            <IoSearch
              className="text-text hover:text-hover duration-200"
              size={24}
            />
          </button>
        </div>
      </form>
      {searchedTitle && results.length === 0 ? (
        <p className="text-secondaryText text-center">
          Não encontramos nada com esse título. Tente outro termo!
        </p>
      ) : (
        <div className="grid max-sm:grid-cols-3 max-lg:grid-cols-4 lg:grid-cols-5 justify-start gap-4">
          {results.map((item) => (
            <div
              key={item.id}
              className="basis-[180px] lg:basis-[220px] grow-0 shrink-0"
            >
              <MediaCard media={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export async function loadSearch({ params }: LoaderFunctionArgs) {
  const { title } = params;

  if (!title || title.trim().length === 0) return [];

  const response = await fetchMediaByTitle(title);
  return response;
}
