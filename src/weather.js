/* eslint-disable react/jsx-no-comment-textnodes */
import react from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

class Weather extends react.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: [],
            date: [],
            displayWeather: false,
            errorMessage: false
        }
    }


    getWeather = async () => {

        // http://localhost:3006/weather?cityName=amman

        let serverRoute = 'http://localhost:3006';
        let url = `${serverRoute}weather?cityName=${this.props.city}`

        try {
            let result = await axios.get(url);
            console.log(result);

            let descriptionArray = [];
            let dateArray = [];

            for (let i = 0; i < result.data.length; i++) {
                descriptionArray.push(result.data[i].description);
                dateArray.push(result.data[0].date);
            }

            this.setState({
                displayWeather: true,
                description: descriptionArray,
                date: dateArray
            })
            console.log(this.state.description);

        } catch {
            this.setState({
                displayWeather: false,
                errorMessage: true
            })
        }
    }



    render() {
        return (
            <>
                {this.props.displayMap &&
                    // <button onClick={this.getWeather}>Weather</button>
                    <Button onClick={this.getWeather} variant="outline-primary">Weather</Button>
                }
                {this.state.displayWeather &&
                    <Table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.date[0]}</td>
                                <td>{this.state.description[0]}</td>
                            </tr>
                            <tr>
                                <td>{this.state.date[1]}</td>
                                <td>{this.state.description[1]}</td>
                            </tr>
                            <tr>
                                <td>{this.state.date[2]}</td>
                                <td>{this.state.description[2]}</td>
                            </tr>
                        </tbody>
                    </Table>
                }

                {this.state.errorMessage &&
                    <p>Weather not Found</p>
                }
            </>
        )
    }
}
export default Weather;
