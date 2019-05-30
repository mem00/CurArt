import React, { Component } from 'react'
import Popup from "./Popup"

class ArtPiece extends Component{
    constructor(props){
        super(props);
        this.state=({
            favorite: false
        })
        this.handleInfo = this.handleInfo.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    handleInfo() {
        this.props.setCurrentArtwork(this.props.piece);
    }

    handleFavorite() {
        let favorite = !this.state.favorite
        this.setState({favorite})
        this.props.handleFavoriteToggle(this.props.piece);
    }

    render() {
        let pieceIndex = this.props.favorites.indexOf(this.props.piece);
        let favIcon = pieceIndex === -1 ? "add_circle" : "remove_circle" 
        return(
            <div className = "frame">
                <div  >      
                    <img className= "art-image" src={this.props.piece.imageURL} alt="loading" />  
                </div>
                <h6 className="title-under">{this.props.piece.title}</h6>
                <i onClick={this.handleFavorite} className="material-icons icon ">{favIcon}</i>
                <i onClick={this.handleInfo} className="material-icons icon">info</i>

                <Popup piece={this.props.piece} favorites={this.props.favorites} handleFavoriteToggle={this.props.handleFavoriteToggle}/>
            </div>
        )
    }
}

export default ArtPiece