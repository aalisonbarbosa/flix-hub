import { IoSearch } from "react-icons/io5";

import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default function MainHeader() {
  return (
    <header className="w-full h-20 flex justify-between items-center px-4 shadow-xl">
      <Link to="/">
        <h1 className="text-3xl font-extrabold tracking-wide">
          <span className="text-text">Flix</span>
          <span className="text-cta">Hub</span>
        </h1>
      </Link>
      <Navbar />
      <Link to="/search">
        <IoSearch
          className="text-text hover:text-hover duration-200"
          size={24}
        />
      </Link>
    </header>
  );
}
