import React, { Component } from 'react';
import ArtPiece from './Components/ArtPiece'
import ArtDetails from './Components/ArtDetails'
import { Link, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css';
import ArtGallery from './Components/ArtGallery';

const URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=isPublicDomain"
const artworkURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects"
const ARTWORK_IDS = [437881, 435885, 438023, 435914, 436546, 436580, 437164, 337699, 436063, 436545, 437180, 436095, 436541,
                    437877, 21126, 438954, 437925, 11742, 435852, 437986, 459088, 441352, 436918, 11602, 438417, 437869, 436573, 437827]

class App extends Component {
  constructor(props) {
    super(props)
    this.state =({
      artwork: [],
      currentArtwork: {}
    })
    this.setCurrentArtwork = this.setCurrentArtwork.bind(this);
  }

  async componentDidMount(){
    let response = await axios.get(URL);
    let data = response.data.objectIDs
    //console.log(data[272]);
    //let response2 = await axios.get(artworkURL + "/" + data[0])
    //console.log(response2.data)
    let artwork = [...this.state.artwork]
    for(let i = 0; i < ARTWORK_IDS.length; i++) {  
      let response = await axios.get(artworkURL + "/" + ARTWORK_IDS[i])
      let data = response.data;
      let id = ARTWORK_IDS[i];
      console.log(response.data)
      let artistName = data.artistDisplayName;
      let title = data.title;
      let imageURL = data.primaryImage;

      let artPiece = {artistName: artistName, id: id, imageURL: imageURL, title: title }
      artwork.push(artPiece)

      this.setState({artwork})
   }
  }

  setCurrentArtwork(piece) {
    let currentArtwork = piece;
    this.setState({currentArtwork});
  }

  render() {
    let display
    if(this.state.artwork && !this.state.currentArtwork.imageURL) {
      display = <ArtGallery artwork={this.state.artwork} setCurrentArtwork={this.setCurrentArtwork} />
    } else if(this.state.currentArtwork.imageURL){
      display = <ArtDetails piece={this.state.currentArtwork} setCurrentArtwork={this.setCurrentArtwork}/> 
    }
    return (
      <div>
        <header>
          <h1>Art</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
          </ul>
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
