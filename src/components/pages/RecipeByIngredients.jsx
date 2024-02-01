import {Button, Container, Form} from "react-bootstrap";
import {useRef, useState} from "react";
import useSpoonacularFoodService from "../../services/SpoonacularFood.service";
import RecipesList from "../recipesList/RecipesList";
import Spinner from "../spinner/Spinner";
import IngredientsInput from "../ingredientsInput/IngredientsInput";
import {Helmet} from "react-helmet";

const RecipeByIngredients = () => {
    const [selected, setSelected] = useState([])
    const [recipes, setRecipes] = useState([])
    const [newItemsLoading, setNewItemsLoading] = useState(false)
    const [itemsEnded, setItemsEnded] = useState(false)
    const existingIds = useRef(new Set())
    const [offset, setOffset] = useState(10)
    const { loading, getRecipeByIngredient } = useSpoonacularFoodService()

    const onSubmit =(e) => {
        e.preventDefault()
        getRecipeByIngredient(selected)
            .then(recipes => {
                setRecipes(recipes)
                recipes.forEach(({id}) => {
                    existingIds.current.add(id)
                })
            })
    }

    const filterDuplicateRecipes = (newRecipes) => {
        return newRecipes.filter(({id}) => {
            const exist = existingIds.current.has(id)
            existingIds.current.add(id)
            return !exist
        })
    }

    const onMore = () => {
        setNewItemsLoading(true)
        getRecipeByIngredient(selected, 10, offset)
            .then(newRecipes => {
                if (newRecipes.length < 10) {
                    setItemsEnded(true)
                }
                setRecipes(recipes => [...recipes, ...filterDuplicateRecipes(newRecipes)])
                setOffset(offset => offset + 10)
                setNewItemsLoading(false)
            })
    }

    const spinner = loading ? <Spinner /> : null

    return (
        <>
            <Helmet>
                <title>Recipes by ingredient</title>
                <meta name="description" content="Find recipes by ingredient" />
            </Helmet>

            <Container className={'mt-4'}>
                <div className={'offset-md-1 col-md-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6'}>
                    <div className={'h5'}>
                        Find recipe by ingredients
                    </div>
                    <Form className={'mt-3'} onSubmit={onSubmit}>
                        <IngredientsInput select={{selected, setSelected}} />
                    </Form>
                </div>

                <div className={'mt-4 offset-md-1 col-md-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6'}>
                    <RecipesList data={recipes}/>
                    {spinner}
                </div>

                <Button
                    variant="secondary"
                    className={'mt-4 mx-auto'}
                    style={{display: recipes.length === 0 || itemsEnded ? 'none' : 'block'}}
                    disabled={newItemsLoading}
                    onClick={onMore}
                >
                    More
                </Button>

            </Container>
        </>
    )
}

export default RecipeByIngredients;