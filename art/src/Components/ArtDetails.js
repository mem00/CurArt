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

    componentDidMount() {
        let pieceIndex = this.props.favorites.indexOf(this.props.piece);
        if(pieceIndex !== -1) {
            let favorite = !this.state.favorite
            this.setState({favorite})
        }
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
        let favIcon = this.state.favorite ? "remove_circle_outline" : "add_circle_outline"
        return(
            <div>

                <h1>{this.props.piece.title}</h1>
                <i onClick={this.handleClick} class="material-icons">arrow_back</i>
                <i onClick={this.addToFavorites} class="material-icons">{favIcon}</i>   
                <img className="art-image" src={this.props.piece.imageURL} alt = 'loading' /> 
            </div>

        )
    }

}

export default ArtDetails;