import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {useCallback, useState} from "react";
import {useNavigate} from 'react-router-dom'
import useSpoonacularFoodService from "../../services/SpoonacularFood.service";
import './NavbarSearch.sass'

const NavbarSearch = () => {
    const [options, setOptions] = useState([])
    const {loading, getAutocompleteRecipeSearch} = useSpoonacularFoodService()
    const navigate = useNavigate()

    const handleSearch = useCallback((query) => {
        getAutocompleteRecipeSearch(query)
            .then(setOptions)
    }, []);

    const handleSubmit = useCallback((option) => {
        if (option.length === 0) {
            return
        }
        navigate(`/recipe/${option[0].id}`)
    }, []);

    return (
        <AsyncTypeahead
            isLoading={loading}
            id="async-example"
            labelKey={'title'}
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder={'Find recipe'}
            renderMenuItemChildren={(option) => (
                <div>
                    {option.title}
                </div>
            )}
            onChange={handleSubmit}
        />
    )
}

export default NavbarSearch;