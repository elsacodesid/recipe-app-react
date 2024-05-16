import { useContext } from "react";
import Recipe from "../../components/nav/recipe-list";
import { GlobalContext } from "../../context";

function Favorites() {
  const { favorites } = useContext(GlobalContext);

  return (
    <div className="py- container mx-auto flex flex-wrap justify-center gap-10">
      {favorites && favorites.length > 0 ? (
        favorites.map((item) => <Recipe item={item} />)
      ) : (
        <p>No favorites added</p>
      )}
    </div>
  );
}

export default Favorites;
