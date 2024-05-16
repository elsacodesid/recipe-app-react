import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

function Details() {
  const { id } = useParams();
  const { recipeDetails, setRecipeDetails, handleFavorites, favorites } =
    useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        console.log("Fetched data:", data);
        if (data?.meals) {
          setRecipeDetails(data.meals[0]);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    }

    if (id) {
      getRecipeDetails();
    }
  }, [id, setRecipeDetails]);

  const getIngredients = (recipeDetails) => {
    const ingredients = [];
    for (let i = 0; i <= 20; i++) {
      const ingredient = recipeDetails[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  };

  const ingredients = recipeDetails ? getIngredients(recipeDetails) : [];

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetails?.strMealThumb}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col text-left">
        <div className="text-sm text-cyan-700 font-medium">
          <span>{recipeDetails?.strArea}</span>
          <h3 className="font-bold text-amber-600 text-4xl">
            {recipeDetails?.strMeal}
          </h3>
        </div>
        <div>
          <button
            onClick={() => handleFavorites(recipeDetails)}
            className="p-2 pt-1 rounded-lg text-sm font-medium text-white m-2"
          >
            {favorites &&
            favorites.length > 0 &&
            favorites.findIndex(
              (item) => item.idMeal === recipeDetails?.idMeal
            ) !== -1
              ? "Remove from favorites"
              : "Add to favorites"}
           
          </button>
        </div>
        <div className="">
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="text-black text-sm list-disc">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-left">
                {ingredient}
              </li>
            ))}
          </ul>
          <span className="text-2xl font-semibold text-black text-left">
            Instructions:
          </span>
          <div>
            {" "}
            <span className="text-sm text-black text-left">
              {recipeDetails?.strInstructions}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
