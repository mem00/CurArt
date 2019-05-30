import React, { Component } from 'react';
import ArtDetails from './Components/ArtDetails';
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
      currentArtwork: {},
      filter: "all",
      search: ''
    })
    this.setCurrentArtwork = this.setCurrentArtwork.bind(this);
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
      let randomIndex = Math.floor(Math.random() * ArtworkIDS.length)
      let response = await axios.get(artworkURL + "/" + ArtworkIDS[randomIndex])
      let data = response.data;
      console.log(data)
      let id = data.objectID
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
  setCurrentArtwork(piece) {
    let currentArtwork = piece;
    this.setState({currentArtwork});
  }

  handleFavoriteToggle(piece) {
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
    let artworkUnfiltered = [...this.state.artwork]
    let favoritesUnfiltered = [...this.state.favorites]
    const artworkFiltered= artworkUnfiltered.filter((art)=>{
      return(art.title.toLowerCase().includes(search.toLowerCase()))
    })

    const favoritesFiltered= favoritesUnfiltered.filter((art)=>{
      return(art.title.toLowerCase().includes(search.toLowerCase()))
    })

    this.setState({
      artworkFiltered, favoritesFiltered, search
    })
  }

  handleClick(event){
    this.setCurrentArtwork({});
    if(event.currentTarget.innerHTML === "Home") {
      this.setState({filter: "all"})
    }else {
      this.setState({filter: "favorites"})
    }
  }

  render() {
    let display
    let art = this.state.filter === "all" ? this.state.artworkFiltered : this.state.favoritesFiltered
    if(art.length === 0) {
      display = <div>Please add art</div>
    }
    else if(!this.state.currentArtwork.imageURL) {
      display = <ArtGallery artwork={art} setCurrentArtwork={this.setCurrentArtwork} handleFavoriteToggle={this.handleFavoriteToggle} favorites={this.state.favorites}/>
    } else if(this.state.currentArtwork.imageURL){
      display = <ArtDetails piece={this.state.currentArtwork} setCurrentArtwork={this.setCurrentArtwork} handleFavoriteToggle={this.handleFavoriteToggle} favorites={this.state.favorites}/> 
    }
    return (
      <div>
        <header>
          <h1 className="title">Art</h1>
          <ul className = "nav">
            <li onClick = {this.handleClick}>Home</li>
            <li onClick = {this.handleClick}>Favorites {this.state.favoriteCount}</li>
            <li><i className="material-icons">face</i></li>
          </ul>
          <SearchBar setSearch={this.setSearch} />
          <button onClick={this.getNewArt}>Get New Art</button>
        </header>
         
          {display} 
      </div>
    )
  }
}

export default App;
