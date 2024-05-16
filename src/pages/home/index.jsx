import React, { useContext } from "react";
import { GlobalContext } from "../../context";
import Recipe from "../../components/nav/recipe-list";

function Home() {
  const {recipeList, loading} = useContext(GlobalContext);

  if (loading) return <div>Loading, pease wait...</div>
  return <div className="py- container mx-auto flex flex-wrap justify-center gap-10">
    {
      recipeList && recipeList.length > 0 ? 
      
      recipeList.map((item) => <Recipe item={item}/>): <p>No recipe found!</p>
    
    }</div>;
}

export default Home;
