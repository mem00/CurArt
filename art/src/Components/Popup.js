import React, { Component } from 'react'
import Modal from 'react-modal'

class Popup extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            showModal: false, 
            favorite: false

        })

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.toggleFavorite = this.toggleFavorite.bind(this);
    }

    handleOpenModal(){
        let showModal = true;
        this.setState({showModal});
    }
    handleCloseModal(){
        this.setState({showModal : false});
    }
    //allow add to favorites from popup
    toggleFavorite(){
        let favorite = !this.state.favorite;
        this.setState({favorite});
        this.props.handleFavoriteToggle(this.props.piece);   
    }

    render() {
        //display icon based on if piece is in favorites
        let pieceIndex = this.props.favorites.indexOf(this.props.piece);
        let favIcon = pieceIndex === -1 ? "add_circle" : "remove_circle" 
        return(
            <div>
                <i onClick={this.handleOpenModal} className="material-icons icon modal-icon">info</i>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal} >      
                <h1>{this.props.piece.title}</h1>
                <h3>{this.props.piece.artistName}</h3> 
                <i onClick={this.handleCloseModal} className="material-icons">arrow_back</i> 
                <i onClick={this.toggleFavorite} className="material-icons">{favIcon}</i>   
                <img className="art-image-popup" src={this.props.piece.imageURL} alt = 'loading' /> 
                <h5>{this.props.piece.artistName}</h5>
                <h5>{this.props.piece.artistDisplayBio}</h5>
                <h5>{this.props.piece.department}</h5>
                <h5>{this.props.piece.dimensions}</h5>
                <h5>{this.props.piece.medium}</h5>
                <h5>{this.props.piece.objectDate}</h5>
                <h5>{this.props.piece.repository}</h5>
                <h6>{this.props.piece.id}</h6>
                </Modal>        
            </div>

        )
    }



}

export default Popup;


