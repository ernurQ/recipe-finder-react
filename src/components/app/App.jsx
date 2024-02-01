import {BrowserRouter, Route, Routes} from "react-router-dom";

import Navbar from "../navbar/Navbar";
import {Home, Recipe, RecipeByIngredients} from "../pages";

import './App.sass'

function App() {

    return (
        <BrowserRouter basename={'/recipe-finder-react'}>
            <div className="App bg-secondary-subtle pb-4 min-vh-100">
                <Navbar/>

                <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/recipe-by-ingredients'} element={<RecipeByIngredients />} />
                    <Route path={'/recipe/:id'} element={<Recipe />} />
                    <Route path={'/*'} element={<div>Page not found</div>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
