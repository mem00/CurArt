import React, { Component } from 'react'
import Popup from "./Popup"

class ArtPiece extends Component{
    constructor(props){
        super(props);
        this.state=({
            favorite: false
        })
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    handleFavorite() {
        let favorite = !this.state.favorite
        this.setState({favorite})
        this.props.handleFavoriteToggle(this.props.piece);
    }

    render() {
        //which favicon to display
        let pieceIndex = this.props.favorites.indexOf(this.props.piece);
        let favIcon = pieceIndex === -1 ? "add_circle" : "remove_circle" 
        return(
            <div className = "frame">
                <div className = "frame-content" >      
                    <img className= "art-image" src={this.props.piece.imageURL} alt="loading" />  
                    <h6 className="title-under">{this.props.piece.title}</h6>
                     <div className = "artpiece-buttons">    
                        <Popup piece={this.props.piece} favorites={this.props.favorites} handleFavoriteToggle={this.props.handleFavoriteToggle}/>
                        <i onClick={this.handleFavorite} className="material-icons icon">{favIcon}</i>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArtPiece