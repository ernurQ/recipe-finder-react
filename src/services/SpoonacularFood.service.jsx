import useHttp from "../hooks/http.hook";

const useSpoonacularFoodService = () => {
    const {request, ...httpStates} = useHttp()

    const _apiBase = 'https://api.spoonacular.com'
    const _apiBaseRecipes = `${_apiBase}/recipes`
    const _apiBaseIngredients = `${_apiBase}/food/ingredients`
    const _apiKey = 'apiKey=7882b7c565fc44339e7ce9914a2fc4a3'

    const getRandomRecipes = async (number=10) => {
        const response = await request(
            _apiBaseRecipes + `/random?` + _apiKey + `&number=${number}`
        )
        return response.recipes.map(_normalizeRecipeData)
    }

    const getAutocompleteRecipeSearch = async (query, number=5) => {
        return await request(
            _apiBaseRecipes + `/autocomplete?` + _apiKey + `&query=${query}` + `&number=${number}`
        )
    }

    const getRecipeById = async (id) => {
        const response =  await request(
            _apiBaseRecipes + `/${id}` + `/information?` + _apiKey
        )
        return _normalizeRecipeData(response)
    }

    const getAutocompleteIngredientSearch = async (query, number=5) => {
        const response =  await request(
            _apiBaseIngredients + '/autocomplete?' + _apiKey + `&query=${query}` + `&number=${number}`
        )
        return response.map(ingredient => ingredient.name)
    }

    const getRecipeByIngredient = async (ingredients, number=10, offset=0) => {
        if (offset % 2 === 1) {
            offset--
        }
        offset = offset / 2
        const str = ingredients.join(",+")
        const response = await request(
            _apiBaseRecipes + `/findByIngredients?` + _apiKey + `&ingredients=${str}` + `&number=${number}` + `&offset=${offset}`
        )
        return response.map(_normalizeRecipeData)
    }

    const _normalizeRecipeData = ({id, title, image, extendedIngredients, analyzedInstructions, dishTypes, summary}) => ({
        id,
        title,
        image,
        ingredients: extendedIngredients ? extendedIngredients.map(ingredient => _normalizeIngredientData(ingredient)) : null,
        instructions: analyzedInstructions ? analyzedInstructions.length === 0 ? [] : analyzedInstructions[0].steps : null,
        dishTypes,
        summary,
    })

    const _normalizeIngredientData = ({id, original, name}) => ({
        id,
        name: original || name,
    })

    return {
        ...httpStates,
        getRandomRecipes,
        getAutocompleteRecipeSearch,
        getRecipeById,
        getAutocompleteIngredientSearch,
        getRecipeByIngredient,
    }
}

export default useSpoonacularFoodService;