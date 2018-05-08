import React from 'react';
import ReactDOM from 'react-dom';
import DogImage from './DogImage'

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            breeds: [],
            breed: 'affenpinscher',
            fetchUrl: 'https://dog.ceo/api/breed/affenpinscher/images/random',
            imageUrl: ''
        };
        this.handleFetch = this.handleFetch.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleGetBreed = this.handleGetBreed.bind(this);
    }

    handleFetch() {
        fetch(this.state.fetchUrl).then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({
                imageUrl: json.message
            });
        });
    }

    handleSelect() {
        var fu = 'https://dog.ceo/api/breed/' + document.getElementById("select").value + '/images/random';
        var br = document.getElementById("select").value;

        console.log(fu);
        console.log(br);
        
        this.setState({
            breed: br,
            fetchUrl: fu
        });

        fetch(fu).then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({
                imageUrl: json.message
            });
        });
    }

    handleGetBreed() {
        fetch('https://dog.ceo/api/breeds/list/all').then((res) => {
            return res.json();
        }).then((json) => {
            let breedList = [];

            for (var key in json.message) {
                if (json.message[key].length === 0) {
                    breedList.push(key);
                } else {
                    for (var spec in json.message[key]) {
                        breedList.push(key + "-" + json.message[key][spec]);
                    }
                }
            }

            this.setState({
                breeds: breedList
            })

            console.log(breedList);
        });
    }

    componentDidMount() {
        fetch(this.state.fetchUrl).then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({
                imageUrl: json.message
            });
        });
    }

    render() {
        return (
            <div className="text-center">
                {this.handleGetBreed()}
                <h1 id="header">{this.state.breed} Image Generator</h1>
                <p>Please press the button to generate a new random image.</p>
                <div className="text-center form-group">
                    <select id="select" onChange={this.handleSelect}>
                        {
                            this.state.breeds.map(function(breed) {
                                return <option key={breed} value={breed}>{breed}</option>;
                            })
                        }
                    </select>
                </div>
                <button type="button" className="btn btn-info" onClick={this.handleFetch}>Fetch</button>
                <hr />
                <DogImage imageUrl={this.state.imageUrl} breed={this.breed} />
            </div>
        );
    }
}


