import {ListGroup} from "react-bootstrap";
import RecipeShortInfo from "../recipeShortInfo/RecipeShortInfo";

const RecipesList = (props) => {
    const {data} = props

    return (
        <ListGroup>
            {data.map((recipe) => {
                if (recipe.summary && recipe.summary.length >= 350) {
                    recipe.summary = recipe.summary.substring(0, 350) + "...";
                }

                return (
                    <ListGroup.Item key={recipe.id}>
                        <RecipeShortInfo data={recipe} />
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}

export default RecipesList;