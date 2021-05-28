/* eslint-disable react/jsx-no-comment-textnodes */
import react from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Button from 'react-bootstrap/Button'

class Movies extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            displayMovies: false,
            errorMessage: false
        }
    }

    // http://localhost:3006/movies?city=zarqa
    getMovies = async () => {
        console.log('inside function');
        let serverRoute = process.env.REACT_APP_SERVER;
        const resultArray = await axios.get(`${serverRoute}/movies?city=${this.props.city}`)

        this.setState({
            displayMovies: true,
            result: resultArray.data
        })
        console.log(this.state.result);
    }


    render() {
        return (
            <>
                {this.props.displayMap &&
                    <Button onClick={this.getMovies} variant="outline-primary">Movies</Button>
                }
                {this.state.result.map((movie, idx) => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={movie.image_url} key={idx} />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>
                                    {movie.overview}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Released On: {movie.released_on}</ListGroupItem>
                                <ListGroupItem>Average Votes: {movie.average_votes}</ListGroupItem>
                                <ListGroupItem>Total Votes: {movie.total_votes}</ListGroupItem>
                                <ListGroupItem>Popularity: {movie.popularity}</ListGroupItem>
                            </ListGroup>
                        </Card>
                    )
                })}

                {this.state.errorMessage &&
                    <p>Movies not Found</p>
                }
            </>
        )
    }
}
export default Movies;
