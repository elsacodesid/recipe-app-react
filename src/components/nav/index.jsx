import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } = useContext(GlobalContext);

  console.log(searchParam);
  return (
    <nav className="flex justify-between items-center py-8 mx-auto flex-col lg:flex-row gap-5 lag:gap-0">
      <h2 className="text-2xl font-semibold">
        <NavLink to={"/"} className="font-bold">Recipe App</NavLink>
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Enter item..."
          className="bag-white/75 p-3 -x-8 rounded-full text-white outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
        ></input>
      </form>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className="text-black hover:text-gray-700 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favorites"}
            className="text-black hover:text-gray-700 duration-300"
          >
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
