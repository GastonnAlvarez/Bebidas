import { useAppStore } from "../stores/useAppStore";
import { Drink } from "../types";

type DrinkCardTypes = {
    drink: Drink
}

export default function DrinkCard({ drink }: DrinkCardTypes) {
    const selectRecipe = useAppStore((state) => state.selectRecipe)


    return (
        <div className="border shadow-xl">
            <div className="overflow-hidden">
                <img
                    className="hover:scale-125 transition-transform hover:rotate-2"
                    src={drink.strDrinkThumb}
                    alt="Drink" />
            </div>
            <div>
                <h2
                    className="truncate text-2xl font-black"
                >{drink.strDrink}</h2>
                <button
                    className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
                    type="button"
                    onClick={() => selectRecipe(drink.idDrink)}
                >Ver Receta</button>
            </div>
        </div>
    )
}
