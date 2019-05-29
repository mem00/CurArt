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
                <i onClick={this.handleClick} class="material-icons">arrow_back</i>
                <i onClick={this.addToFavorites} class="material-icons">add_circle_outline</i>   
                <img className="art-image" src={this.props.piece.imageURL} alt = 'loading' /> 
            </div>

        )
    }

}

export default ArtDetails;