import React from 'react';
import ReactDOM from 'react-dom';

export default class DogImage extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.imageUrl} alt={this.props.breed} className="img-thumbnail" />
            </div>
        );
    }
}