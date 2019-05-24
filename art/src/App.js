import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css';

const URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=isPublicDomain"
const artworkURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects"

class App extends Component {
  constructor(props) {
    super(props)
    this.state =({
      artwork: [],
      currentArtwork: {},
      imageURLs: [],
      display: false
    })
  }

  async componentDidMount(){
    let response = await axios.get(URL);
    let data = response.data.objectIDs
    console.log(data[272]);
    let response2 = await axios.get(artworkURL + "/" + data[0])
    console.log(response2.data)
    let imageURLs = [...this.state.imageURLs]
    for(let i = 700 ; i < data.length; i++) {  
      let response = await axios.get(artworkURL + "/" + data[i])
      let imageURL = response.data.primaryImage;
      if(imageURL) {
        imageURLs.push(imageURL);
      }
      this.setState({imageURLs})
   }
 
  }

  render() {
    let photos
    if(this.state.imageURLs) {
      photos = this.state.imageURLs.map((picture, index) => (
            <img key={index} src={picture} alt="loading" />
        ))
    }
    return (
      <div>
        <header>
          <h1>Art</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/art">Art</Link></li>
            <li><Link to="/artists">Artists</Link></li>
          </ul>
        </header>
        {photos}
        <main>
        {/* <Route exact path='/' render={('')}/>
        <Route path='/art' render={('')}/>
        <Route path='/artist' render={('')}/> */}


        </main>
      </div>
    )
  }
}

export default App;
