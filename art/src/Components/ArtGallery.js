import React, { Component } from 'react'
import ArtPiece from './ArtPiece'

class ArtGallery extends Component{
    render() {
        let display = this.props.artwork.map((piece, index) => (
            <ArtPiece className= "piece" key={index}  piece={piece} setCurrentArtwork={this.props.setCurrentArtwork} handleFavoriteToggle={this.props.handleFavoriteToggle} favorites={this.props.favorites}/>
        ))
        return(
            <div className="art-container">
            {display}
            </div>
        )
    }


}

export default ArtGallery;