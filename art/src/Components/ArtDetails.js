import React, { Component } from 'react'


class ArtDetails extends Component {
    constructor(props){
        super(props);
        this.state = ({
            favorite:false
        })
        this.handleClick = this.handleClick.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
    }

    handleClick() {
        this.props.setCurrentArtwork({})   
    }

    addToFavorites() {
        let favorite = !this.state.favorite
        this.setState({favorite})
        this.props.handleFavoriteToggle(this.props.piece);   
    }

    render() {
        let pieceIndex = this.props.favorites.indexOf(this.props.piece);
        let favIcon = pieceIndex === -1 ? "add_circle" : "remove_circle" 
        return(
            <div>
                <h1>{this.props.piece.title}</h1>
                <h3>{this.props.piece.artistName}</h3>
                
                <i onClick={this.handleClick} className="material-icons">arrow_back</i>
                <i onClick={this.addToFavorites} className="material-icons">{favIcon}</i>   
                <img className="art-image" src={this.props.piece.imageURL} alt = 'loading' /> 
                <h6>{this.props.piece.artistName}</h6>
                <h6>{this.props.piece.artistDisplayBio}</h6>
                <h6>{this.props.piece.department}</h6>
                <h6>{this.props.piece.dimensions}</h6>
                <h6>{this.props.piece.medium}</h6>
                <h6>{this.props.piece.objectDate}</h6>
                <h6>{this.props.piece.repository}</h6>
            </div>
        )
    }

}

export default ArtDetails;