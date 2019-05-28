import React from 'react'

const ArtPiece = (props) => {

    return(
        <div className = "frame">
            <img className= "art-image" src={props.picture} alt="loading" />
        </div>
    )
}

export default ArtPiece