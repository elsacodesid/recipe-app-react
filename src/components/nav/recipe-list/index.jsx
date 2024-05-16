import { Link } from "react-router-dom";

export default function Recipe({ item }) {
  return (
    <div className="flex flex-col w-40 overflow-hidden p-3 bg-white/75 shadow-xl gap-3 border-2 rounded-2xl border-white">
      <div className="h-50 flex justify-center overflow-hidden items-center rounded-xl ">
        <img
          src={item?.strMealThumb}
          alt="recipe item"
         
        />
      </div>
      <div>
        <span className="text-sm text-cyan-700 font-medium">{item?.strArea}</span>
        <h3 className="font-bold text-amber-600">{item?.strMeal}</h3>
        <Link to={`/recipe-item/${item?.idMeal}`} className="text-sm p-2 rounded-md font-medium tracking-wider inline-block shadow-md bg-black text-white mt-1 pt-1">Recipe Details</Link>
      </div>
    </div>
  );
}
