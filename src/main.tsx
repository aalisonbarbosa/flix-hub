import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RootLayout from "./pages/RootLayout";
import HomePage, { loadMoviesAndSeries } from "./pages/Home";
import SeriesPage, { loadPaginatedSeries } from "./pages/Series";
import MoviesPage, { loadPaginatedMovies } from "./pages/Movies";
import SearchPage, { loadSearch } from "./pages/Search";
import MediaDetailsPage, { loadMediaDetails } from "./pages/MediaDetails";
import PersonPage, { castMemberLoader } from "./pages/Person";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: loadMoviesAndSeries,
      },
      {
        path: "/series/page/:page",
        element: <SeriesPage />,
        loader: loadPaginatedSeries,
      },
      {
        path: "/movies/page/:page",
        element: <MoviesPage />,
        loader: loadPaginatedMovies,
      },
      {
        path: "/media-details/:mediaType/:id",
        element: <MediaDetailsPage />,
        loader: loadMediaDetails,
      },
      {
        path: "/person/:id",
        element: <PersonPage />,
        loader: castMemberLoader,
      },
      {
        path: "/search/:title",
        element: <SearchPage />,
        loader: loadSearch,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
