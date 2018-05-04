import React from 'react';
import './TrackList.css';

class TrackList extends React.Component {
  render() {
    <div className="TrackList">
      <!-- You will add a map method that renders a set of Track components  -->
    {  this.props.tracks.map(track => {
        return <TrackList track={track} key={track.id}/>
      })
      }
    </div>
  }
}

export default TrackList;
