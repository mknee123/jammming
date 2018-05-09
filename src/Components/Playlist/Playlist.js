import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
    /*this.setState({ name: event.target.value });*/
  }
  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.props.playlistName} onNameChange={this.handleNameChange}
        />
        {/* Add a TrackList component */}
        <TrackList tracks={this.props.playlistTracks}
        isRemoval={true}
        onRemove={this.props.removeTrack}
        onAdd={this.props.addTrack}
         />
        <a className="Playlist-save"
        onClick={this.props.onSave}
        >SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
