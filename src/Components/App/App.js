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
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
  return;
  }  else {
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
   }

   removeTrack(track) {
     let tracks = this.state.playlistTracks;
     tracks = tracks.filter(current => current.id !== track.id);
     this.setState({ playlistTracks: tracks });
   }

   updatePlaylistName(name) {
     this.setState({ playlistName : name });
     console.log(name);
   }

   savePlaylist() {
     let trackURIs = this.state.playlistTracks.map(track => track.uri);
     Spotify.savePlaylist(this.state.playlistName, trackURIs);
     this.setState({
         playlistName: this.props.playlistName,
         playlistTracks: []
       });
    this.updatePlaylistName(this.state.playlistName);
   }

   search(term) {
     /*log term to console */
     console.log(term);
     Spotify.search(term).then(tracks => this.setState({ searchResults: tracks }));
   }

  render() {
    Spotify.getAccessToken();
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">

            <SearchResults
            onAdd={this.addTrack}
            //isRemoval={this.state.isRemoval}
           searchResults={this.state.searchResults} />

            <Playlist
            playlistName={this.state.playlistName}
            playlistTacks={this.state.playlistTracks}
            //onAdd={this.addTrack}
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
