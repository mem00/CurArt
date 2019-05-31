import React, { Component } from 'react';
import ArtGallery from './Components/ArtGallery';
import SearchBar from './Components/SearchBar';
import ArtworkIDS from './ArtworkIDs'
import axios from 'axios';
import './App.css';

const artworkURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects"
const NUMBER_OF_PIECES = 15;


class App extends Component {
  constructor(props) {
    super(props)
    this.state =({
      artIds: [],
      artwork: [],
      artworkFiltered: [],
      favorites: [],
      favoritesFiltered: [],
      favoriteCount: 0,
      filter: "all",
      search: ''
    })

    this.handleClick = this.handleClick.bind(this);
    this.handleFavoriteToggle = this.handleFavoriteToggle.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.getNewArt = this.getNewArt.bind(this);
  }

  async componentDidMount(){
    this.getNewArt();
  }

 async getNewArt() {
    let artwork = [...this.state.artwork]
    artwork = []
    for(let i = 0; i < NUMBER_OF_PIECES; i++) {  
      //random
      let randomIndex = Math.floor(Math.random() * ArtworkIDS.length)
      let response = await axios.get(artworkURL + "/" + ArtworkIDS[randomIndex])
      //creat artPiece object
      let data = response.data;
      let id = data.objectID;
      let artistName = data.artistDisplayName;
      let artistDisplayBio = data.artistDisplayBio;
      let title = data.title;
      let imageURL = data.primaryImageSmall;
      let department = data.department;
      let dimensions = data.dimensions;
      let medium = data.medium;
      let objectDate = data.objectDate;
      let repository = data.repository;
      let artPiece = {id: id, artistName: artistName, artistDisplayBio: artistDisplayBio,  imageURL: imageURL, title: title, favorite: false, 
      department : department, dimensions: dimensions, medium: medium, objectDate: objectDate, repository:repository}
      artwork.push(artPiece)
      let artworkFiltered = [...artwork]
      this.setState({artwork, artworkFiltered})
    }
  }

  handleFavoriteToggle(piece) {
    //inspired by film app
    let favorites = [...this.state.favorites];
    let pieceIndex = favorites.indexOf(piece);
    let favoriteCount = this.state.favoriteCount;
    if(pieceIndex === -1) {
      favorites.push(piece)
      favoriteCount++;
    }
    else{
      favorites.splice(pieceIndex, 1);
      favoriteCount--;
    }
    let favoritesFiltered = [...favorites]
    this.setState({favorites, favoritesFiltered, favoriteCount});
  }

  setSearch(search) {
    //get copy
    let artworkUnfiltered = [...this.state.artwork]
    let favoritesUnfiltered = [...this.state.favorites]
    const artworkFiltered = artworkUnfiltered.filter((art)=>{
      return(art.title.toLowerCase().includes(search.toLowerCase()))
    })

    const favoritesFiltered = favoritesUnfiltered.filter((art)=>{
      return(art.title.toLowerCase().includes(search.toLowerCase()))
    })

    this.setState({
      artworkFiltered, favoritesFiltered, search
    })
  }

  //handle home and favorite tabs
  handleClick(event){
    if(event.currentTarget.innerHTML === "Home") {
      this.setState({filter: "all"})
    }else {
      this.setState({filter: "favorites"})
    }
  }

  render() {
    //style current tab
    const styleHome = {
      color: this.state.filter==="all" ? "yellow" : "white"
    }
    const styleFavorites = {
      color: this.state.filter==="favorites" ? "yellow" : "white"
    }

    //display all or favorites
    let display
    let art = this.state.filter === "all" ? this.state.artworkFiltered : this.state.favoritesFiltered
    if(art.length === 0) {
      display = <div>Please add art</div>
    }
    else  {
      display = <ArtGallery artwork={art}  handleFavoriteToggle={this.handleFavoriteToggle} favorites={this.state.favorites}/>
    } 

    //dont display search bar untill all paintings load
    let search = this.state.artwork.length === 15 ? <SearchBar setSearch={this.setSearch} /> : <div></div>
    return (
      <div>
        <header>
          <h1 className="title">Art</h1>
          <ul className = "nav">
            <li onClick = {this.handleClick} style={styleHome}>Home</li>
            <li onClick = {this.handleClick} style={styleFavorites}>Favorites<span className="section-count">{this.state.favoriteCount}</span></li>
          </ul>
          {search}
          <button onClick={this.getNewArt}>Get New Art</button>
        </header>  
          {display} 
      </div>
    )
  }
}

export default App;
