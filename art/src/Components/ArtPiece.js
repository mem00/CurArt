import React, { Component } from 'react'

class ArtPiece extends Component{
    constructor(props){
        super(props);
        this.handleInfo = this.handleInfo.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this)
    }

    handleInfo() {
        // event.preventDefault();
        this.props.setCurrentArtwork(this.props.piece);
    }

    handleFavorite() {
        this.props.handleFavoriteToggle(this.props.piece);
    }

    render() {
        return(
            <div  className = "frame">
                <i onClick={this.handleFavorite} className="material-icons icon">add_circle_outline</i>
                <i onClick={this.handleInfo} class="material-icons icon-info ">info</i>
                <img className= "art-image" src={this.props.piece.imageURL} alt="loading" />   
            </div>
        )
    }
}

export default ArtPiece