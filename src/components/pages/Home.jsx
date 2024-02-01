import {Container} from "react-bootstrap";
import useSpoonacularFoodService from "../../services/SpoonacularFood.service";
import RecipesList from "../recipesList/RecipesList";
import {useEffect, useState} from "react";
import Spinner from "../spinner/Spinner";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const {loading, getRandomRecipes} = useSpoonacularFoodService()

    useEffect(() => {
        getRandomRecipes()
            .then(setRecipes)
    }, []);

    const content = loading ? <Spinner /> : <RecipesList data={recipes} />

    return (
        <Container className={'mt-4'}>
            {content}
        </Container>
    )
}

export default Home;