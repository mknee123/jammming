import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults = [
      'name',
      'artist',
      'album',
      'id'
    ]
  }
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <!-- Add a SearchResults component -->
            <SearchResults />
            <!-- Add a Playlist component -->
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
