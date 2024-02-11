import {Card, Container, ListGroup} from "react-bootstrap";
import useSpoonacularFoodService from "../../services/SpoonacularFood.service";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Spinner from "../spinner/Spinner";
import RecipeShortInfo from "../recipeShortInfo/RecipeShortInfo";
import {Helmet} from "react-helmet";

const Recipe = () => {
    const [data, setData] = useState(null)
    const {loading, getRecipeById} = useSpoonacularFoodService()
    const {id} = useParams()

    useEffect(() => {
        getRecipeById(id)
            .then(setData)
    }, [id])

    const spinner = loading ? <Spinner /> : null
    const content = data ? <View data={data}/> : null

    return (
        <Container className={'mt-4'}>
            {spinner}
            {content}
        </Container>
    )
}

const View = (props) => {
    const {ingredients, instructions, ...otherData} = props.data

    return (
        <>
            <Helmet>
                <title>{otherData.title}</title>
                <meta name="description" content="Recipe information" />
            </Helmet>

            <RecipeShortInfo data={otherData} />

            <div className={'mt-4 col-sm-10 col-md-8 col-lg-6'}>
                <div className={'card-title h5 ps-3'}>
                    Ingredients:
                </div>
                <ListGroup className={'mt-2'}>
                    {
                        ingredients.map((ingredient) => (
                            <ListGroup.Item key={ingredient.id}>
                                {ingredient.name}
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>

            <div className={'mt-4'}>
                <div className={'card-title h5 ps-3'}>
                    Instructions:
                </div>
                {
                    instructions.map((instruction) => (
                        <Card key={instruction.number} className={'mt-2'}>
                            <Card.Body>
                                <Card.Title>Step: {instruction.number}</Card.Title>
                                <Card.Text>{instruction.step}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}

export default Recipe