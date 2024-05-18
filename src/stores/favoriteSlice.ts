import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { RecipeSliceType, createRecipeSlice } from "./recipeSlice";
import { NotificationSliceType, createNotificationSlice } from "./notificationSlice";

export type FavoriteSliceType = {
    favorites: Recipe[]
    handleClickFavorite: (recipe: Recipe) => void
    favoriteExits: (id: Recipe['idDrink']) => boolean
    loadFromStorage: () => void
}

export const createFavoriteSlice: StateCreator<FavoriteSliceType & RecipeSliceType & NotificationSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if (get().favorites.some((favorite => favorite.idDrink === recipe.idDrink))) {
            set({
                favorites: get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
            })
            createNotificationSlice(set, get, api)
                .showNotification({
                    text: 'Se elimino de favoritos',
                    error: true
                })
        } else {
            set({
                favorites: [...get().favorites, recipe]
            })
            createNotificationSlice(set, get, api)
                .showNotification({
                    text: 'Se agrego a favoritos',
                    error: false
                })
        }

        createRecipeSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExits: (id) => {
        return get().favorites.some((favorite => favorite.idDrink === id))
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})