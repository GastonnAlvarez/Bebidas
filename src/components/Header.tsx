import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
    const [searchFilter, setSearchFilter] = useState({
        ingredient: '',
        category: ''
    })
    const { pathname } = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const showNotification = useAppStore((state) => state.showNotification)

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearchFilter({
            ...searchFilter,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validar
        if (Object.values(searchFilter).includes('')) {
            showNotification({
                text: 'Todos los campos son obligarorios',
                error: true
            })
            return
        }

        // Consultar Recetas
        searchRecipes(searchFilter)

    }

    return (
        <header className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-600"}>
            <div className="container mx-auto px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <img className="w-32" src="/logo.svg" alt="logotipo" />
                    </div>
                    <nav className="flex justify-between gap-3">
                        <NavLink
                            to='/'
                            className={({ isActive }) => isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}
                        >Inicio</NavLink>
                        <NavLink
                            to='/favorites'
                            className={({ isActive }) => isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}
                        >Favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form
                        className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-28 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-4">
                            <label
                                htmlFor="ingredient"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Nombre o Ingredientes</label>
                            <input
                                type="text"
                                className="p-3 w-full rounded-lg focus:outline-none"
                                name="ingredient"
                                id="ingredient"
                                placeholder="Nombre o Ingrediente: Ej. Vodka, Tequila o Cafe"
                                onChange={handleChange}
                                value={searchFilter.ingredient}
                            />
                        </div>
                        <div className="space-y-4">
                            <label
                                htmlFor="category"
                                className="block text-white uppercase font-extrabold text-lg"
                            >Categoria</label>
                            <select
                                className="p-3 w-full rounded-lg focus:outline-none"
                                name="category"
                                id="category"
                                onChange={handleChange}
                                value={searchFilter.category}
                            >
                                <option value="">-- Seleccione la Categoria --</option>
                                {categories.drinks.map(category => (
                                    <option
                                        value={category.strCategory}
                                        key={category.strCategory}
                                    >{category.strCategory}</option>
                                ))}
                            </select>
                        </div>

                        <input
                            type="submit"
                            value="Buscar receta"
                            className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                        />
                    </form>
                )}

            </div>
        </header>
    )
}
