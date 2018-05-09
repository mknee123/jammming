import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName : 'MurKat Sweet Feels',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === this.state.playlistTracks.id)) {
      return;
    } else {
      let tracks = this.state.playlistTacks;
      tracks.push(track);
      this.setState({playlistTracks: tracks});
    }
  }

  removeTrack(track) {
    let trackPush = this.state.playlistTracks.filter(savedTrack =>
      savedTrack.id !== track.id
    );
    this.setState({playlistTracks : trackPush});
  }

  updatePlaylistName(name) {
    this.setState({playlistName : name});
  }

  savePlaylist() {
    console.log("the state of the playlist name after onChange is", this.state.playlistName);

    this.state.playlistTracks.map(track => track.uri);
    }


  search(term) {
    {/*log term to console*/}
    console.log(term);
    {/*
    this.setState({Spotify.search : term});*/}
    Spotify.search(term).then(tracks => {
      this.setState({searchResults : tracks});
    });
  }
  render() {
    Spotify.getAccessToken();
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          {/*Add a SearchBar component*/}
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            {/* Add a SearchResults component */}
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            {/* Add a Playlist component */}
            <Playlist
            playlistTracks={this.state.playlistTracks}
            playlistName={this.state.playlistName}
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
