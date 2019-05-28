import React, { Component } from 'react'


class ArtDetails extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <h1>{this.props.piece.title}</h1>

        )
    }

}

export default ArtDetails;