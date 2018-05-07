import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults : [],
      playlistName : 'My Sick Playlist',
      playlistTracks : []
    };

  this.addTrack = this.addTrack.bind(this);
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;

     tracks.push(track);
     this.setState({ playlistTracks: tracks });
   }

   removeTrack(track) {
     let tracks = this.state.playlistTracks;
     tracks = tracks.filter(current => current.id !== track.id);
     this.setState({ playlistTracks: tracks });
   }

   updatePlaylistName(name) {
     this.setState({ playlistName : name });
   }

   savePlaylist() {
     let trackURIs = this.state.playlistTracks.map(track => track.uri);
     Spotify.savePlaylist(this.state.playlistName, trackURIs);
     this.setState({
         searchResults: []
       });
    this.updatePlaylistName('New Playlist');
   }

   search(term) {
     Spotify.search(term).then(tracks => this.setState({ searchResults: tracks }));
   }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">

            <SearchResults
            onAdd={this.addTrack}
           searchResults={this.state.searchResults} />

            <Playlist
            playlistName={this.state.playlistName}
            tracks={this.state.playlistTracks}
            onAdd={this.addTrack}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
