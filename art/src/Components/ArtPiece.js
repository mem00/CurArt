import React, { Component } from 'react'

class ArtPiece extends Component{
    constructor(props){
        super(props);
        this.state=({
            favorite: false
        })
        this.handleInfo = this.handleInfo.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    componentDidMount() {
        let pieceIndex = this.props.favorites.indexOf(this.props.piece);
        if(pieceIndex !== -1) {
            let favorite = !this.state.favorite
            this.setState({favorite})
        }
    }

    handleInfo() {
        // event.preventDefault();
        this.props.setCurrentArtwork(this.props.piece);
    }

    handleFavorite() {
        let favorite = !this.state.favorite
        this.setState({favorite})
        this.props.handleFavoriteToggle(this.props.piece);
    }

    render() {
        let favIcon = this.state.favorite ? "remove_circle_outline" : "add_circle_outline"
        return(
            <div  className = "frame">
                <i onClick={this.handleFavorite} className="material-icons icon">{favIcon}</i>
                <i onClick={this.handleInfo} class="material-icons icon-info ">info</i>
                <img className= "art-image" src={this.props.piece.imageURL} alt="loading" />   
            </div>
        )
    }
}

export default ArtPiece