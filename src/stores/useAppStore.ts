import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { RecipeSliceType, createRecipeSlice } from './recipeSlice'
import { FavoriteSliceType, createFavoriteSlice } from './favoriteSlice'
import { NotificationSliceType, createNotificationSlice } from './notificationSlice'

export const useAppStore = create<RecipeSliceType & FavoriteSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a)
})))