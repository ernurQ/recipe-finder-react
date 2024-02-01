import {Button, Form, FormGroup} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import {useCallback, useState} from "react";
import useSpoonacularFoodService from "../../services/SpoonacularFood.service";

const IngredientsInput = (props) => {
    const [options, setOptions] = useState([])
    const { selected, setSelected } = props.select
    const { loading, getAutocompleteIngredientSearch } = useSpoonacularFoodService()

    const onChange = useCallback((option) => {
        setSelected(option)
        setOptions([])
    }, []);

    const onInputChange = useCallback((value) => {
        if (value.length < 2) {
            return
        }
        getAutocompleteIngredientSearch(value)
            .then(setOptions)
    }, []);

    return (
        <FormGroup className={' d-flex'}>
            <Form.Label className={'visually-hidden'}>Find recipe by ingredients</Form.Label>
            <Typeahead
                className={'flex-grow-1 me-1'}
                id="basic-typeahead-multiple"
                labelKey="name"
                multiple
                onChange={onChange}
                onInputChange={onInputChange}
                options={options}
                placeholder={'Find ingredient'}
                selected={selected}
            />
            <Button disabled={loading || selected.length === 0} variant={'secondary'} type="submit">
                Search
            </Button>
        </FormGroup>
    )
}

export default IngredientsInput;