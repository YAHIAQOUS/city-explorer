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
            result:[],
            displayWeather: false,
            errorMessage: false
        }
    }

    // lab07
    // getWeather = async () => {

    //     // http://localhost:3006/weather?cityName=amman

    //     let serverRoute = process.env.REACT_APP_SERVER;
    //     let url = `${serverRoute}/weather?cityName=${this.props.city}`

    //     try {
    //         let result = await axios.get(url);
    //         console.log(result);

    //         let descriptionArray = [];
    //         let dateArray = [];

    //         for (let i = 0; i < result.data.length; i++) {
    //             descriptionArray.push(result.data[i].description);
    //             dateArray.push(result.data[0].date);
    //         }

    //         this.setState({
    //             displayWeather: true,
    //             description: descriptionArray,
    //             date: dateArray
    //         })
    //         console.log(this.state.description);

    //     } catch {
    //         this.setState({
    //             displayWeather: false,
    //             errorMessage: true
    //         })
    //     }
    // }



    // lab08
    // http://localhost:3006/weather?city=zarqa
    getWeather = async () => {
        console.log('inside function');
        let serverRoute = process.env.REACT_APP_SERVER;
        const resultArray = await axios.get(`${serverRoute}/weather?city=${this.props.city}`)

        this.setState({
            displayWeather: true ,
            result: resultArray.data
        })
        console.log(this.state.result);
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
                                <th>City</th>
                                <th>{this.props.city}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Description</td>
                                <td>{this.state.result.description}</td>
                            </tr>
                            <tr>
                                <td>Solar Radiation</td>
                                <td>{this.state.result.solarRad}</td>
                            </tr>
                            <tr>
                                <td>Temperature</td>
                                <td>{this.state.result.temp}</td>
                            </tr>
                            <tr>
                                <td>Wind Direction</td>
                                <td>{this.state.result.windDir}</td>
                            </tr>
                            <tr>
                                <td>Wind Speed</td>
                                <td>{this.state.result.windSpd}</td>
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
