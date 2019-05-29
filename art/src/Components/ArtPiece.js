import React, { Component } from 'react'

class ArtPiece extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        // event.preventDefault();
        this.props.setCurrentArtwork(this.props.piece);
    }

    render() {
        return(
            <div onClick={this.handleClick} className = "frame">
                <i className="material-icons icon">add_circle_outline</i>
                <i class="material-icons icon-favorite ">info</i>
                <img className= "art-image" src={this.props.piece.imageURL} alt="loading" />
                
            </div>
        )
    }
}

export default ArtPiece