import React, { Component } from 'react';
import ArtDetails from './Components/ArtDetails'
import ArtGallery from './Components/ArtGallery';
import SearchBar from './Components/SearchBar'
import axios from 'axios'
import './App.css';


const URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=isPublicDomain"
const artworkURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects"
const ARTWORK_IDS = [437881, 435885, 438023, 435914, 436546, 436580, 437164, 337699, 436063, 436545, 437180, 436095, 436541,
                    437877, 21126, 438954, 437925, 11742, 435852, 437986, 459088, 441352, 436918, 11602, 438417, 437869, 436573, 437827]
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
  }

  async componentDidMount(){
    // let response = await axios.get(URL);
    // let data = response.data.objectIDs
    //console.log(data[272]);
    //let response2 = await axios.get(artworkURL + "/" + data[0])
    //console.log(response2.data)
    let artwork = [...this.state.artwork]
    for(let i = 0; i < ARTWORK_IDS.length; i++) {  
      let response = await axios.get(artworkURL + "/" + ARTWORK_IDS[i])
      let data = response.data;
      let id = ARTWORK_IDS[i];
      let artistName = data.artistDisplayName;
      let title = data.title;
      let imageURL = data.primaryImage;

      let artPiece = {artistName: artistName, id: id, imageURL: imageURL, title: title, favorite: false }
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
        </header>
         
          {display}
       
         <main>
          {/* <Route exact path='/' render={()=>
           this.setCurrentArtwork({})
          }/> */}
          {/* <Route path='/art' render={('')}/>
          <Route path='/artist' render={('')}/> */}
        </main>  
      </div>
    )
  }
}

export default App;
