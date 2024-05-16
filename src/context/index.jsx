import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate()
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchParam}`
      );
      const data = await res.json();
      if (data?.meals) {
        setRecipeList(data?.meals);
        setLoading(false);
        setSearchParam("");
        navigate("/")
      }
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSearchParam("");
    }
  }

  function handleFavorites(getCurrentItem) {
    let copyFavorites = [...favorites];
    const index = copyFavorites.findIndex(
      (item) => item.idMeal === getCurrentItem.idMeal
    );
    if (index === -1) {
      copyFavorites.push(getCurrentItem);
    } else {
      copyFavorites.splice(index);
    }
    setFavorites(copyFavorites);
  }

  console.log(favorites, "favorites")

  if (loading) return <h3>Loading, please wait...</h3>;

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetails,
        setRecipeDetails,
        handleFavorites,
        favorites
   
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
