import {Badge, Card, Image, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";

const RecipeShortInfo = (props) => {
    const {id, title, image, dishTypes, summary} = props.data

    return (
        <Card className={'flex-md-row'}>
            <Link
                to={'/recipe/' + id}
                className={'d-block p-2 col-md-5 col-xl-4 col-xxl-3'}
            >
                <Image
                    rounded
                    className={'object-fit-cover w-100'}
                    src={image}
                    alt={title}
                />
            </Link>
            <Card.Body>
                <Link
                    className={'card-title h5 text-decoration-none'}
                    to={'/recipe/' + id}
                >
                    {title}
                </Link>

                {
                    dishTypes ?
                        <Stack direction={'horizontal'} gap={2} className={'flex-wrap mt-2'} >
                            {
                                dishTypes.map(dishType => (
                                    <Badge bg={'secondary'} key={dishType}>{dishType}</Badge>
                                ))
                            }
                        </Stack>
                        :
                        null
                }

                {
                    summary ?
                        <Card.Text className={'mt-2'} dangerouslySetInnerHTML={{__html: summary}} ></Card.Text>
                        :
                        null
                }
            </Card.Body>
        </Card>
    )
}

export default RecipeShortInfo