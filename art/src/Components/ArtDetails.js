import React, { Component } from 'react'


class ArtDetails extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
    }

    handleClick() {
        this.props.setCurrentArtwork({})   
    }

    addToFavorites() {
        this.props.handleFavoriteToggle(this.props.piece);   
    }

    render() {
        return(
            <div>
                <h1>{this.props.piece.title}</h1>
                <img className="art-image" src={this.props.piece.imageURL} alt = 'loading' />
                <button onClick={this.handleClick}>Back</button>
                <button onClick={this.addToFavorites}>Add to Favorites</button>
            </div>

        )
    }

}

export default ArtDetails;