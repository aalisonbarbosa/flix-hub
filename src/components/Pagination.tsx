import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

interface PaginationProps {
  page: number;
  mediaType: "movies" | "series";
  totalPages?: number;
}

export default function Pagination({
  page,
  mediaType,
  totalPages,
}: PaginationProps) {
  const navigate = useNavigate();

  const previousPage = page > 1 ? page - 1 : null;
  const nextPage = totalPages && page >= totalPages ? null : page + 1;

  return (
    <div className="w-full h-24 text-text text-xl flex gap-4 items-center justify-center">
      <button
        className={`p-4 rounded-md transition-colors ${
          previousPage
            ? "bg-hover hover:bg-secondaryText"
            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
        }`}
        onClick={() => {
          if (previousPage) {
            page--;
            navigate(`/${mediaType}/page/${previousPage}`);
          }
        }}
        disabled={!previousPage}
      >
        <GrFormPreviousLink />
      </button>
      <div className="flex items-center gap-3 text-base font-semibold">
        {previousPage && (
          <span className="bg-hover px-4 py-2 rounded-md">{previousPage}</span>
        )}
        <span className="bg-secondaryText px-4 py-2 rounded-md text-white shadow-md">
          {page}
        </span>
        {(!totalPages || page + 1 <= totalPages) && (
          <span className="bg-hover px-4 py-2 rounded-md">{page + 1}</span>
        )}
      </div>
      <button
        className={`p-4 rounded-md transition-colors ${
          nextPage && (!totalPages || page < totalPages)
            ? "bg-hover hover:bg-secondaryText"
            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
        }`}
        onClick={() => {
          if (nextPage) {
            page++;
            navigate(`/${mediaType}/page/${nextPage}`);
          }
        }}
        disabled={!nextPage}
      >
        <GrFormNextLink />
      </button>
    </div>
  );
}
