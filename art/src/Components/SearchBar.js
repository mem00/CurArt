import React, { Component } from 'react'


class SearchBar extends Component {
    constructor(props) {
        super(props) 
        this.state = ({
            search:''
        })
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        let search = event.currentTarget.value;
        this.setState({
            search
        })
        this.props.setSearch(search);
    }

    render() {
        return (
            <input value={this.state.search} onChange={this.handleChange} type="text" placeholder="Search by title" />
        )
    }
}


export default SearchBar