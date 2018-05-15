import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     isPlaying: false
   };
   //this.state = { trackAction: '+' };
   this.renderAction = this.renderAction.bind(this); // bind(this) to .toggleMood()
   this.addTrack = this.addTrack.bind(this);
   this.removeTrack = this.removeTrack.bind(this);
   //preview track
   this.previewTrack = this.previewTrack.bind(this);
 }

 addTrack(event) {
   this.props.onAdd(this.props.track);
 }
 removeTrack(event) {
   this.props.onRemove(this.props.track);
 }

 renderAction() {
   if(this.props.isRemoval) {
     return  <a id={this.props.track.key} className="Track-action" onClick={this.removeTrack}>-</a>;
   }
   return <a id={this.props.track.key} className="Track-action" onClick={this.addTrack}>+</a>;
 }
 /*preview track attempt */
 previewTrack() {
   const audio = this.refs.audio;
   if(!this.state.isPlaying) {
     audio.play();
     this.setState({
       isPlaying: true,
     });
   } else {
   audio.pause();
   this.setState({
     isPlaying: false,
   });
   }
 }
 /*show play or stop icon for songs with previews */
 trackIcon(){
    if(this.props.track.preview){
      if(!this.state.isPlaying) {
        return (
         <a onClick={this.previewTrack}>  <i className="Icons fas fa-play-circle"></i></a>
        );
      } else {
        return (
        <a onClick={this.previewTrack}>  <i className="Icons fas fa-stop-circle" onClick={this.previewTrack}></i></a>
        );
      }
    } else {
      return <p className="No-preview">No preview available. </p>
    }
 }
  render() {
    return (
    <div className="Track" key={this.props.track.id}>
      <div className="Track-preview-icon">
        {this.trackIcon()}
      </div>
      <div className="Track-cover-image">
        <img className="Album-cover" src={this.props.track.image} alt="album cover" />
        <audio ref="audio" src={this.props.track.preview}></audio>

      </div>
      <div className="Track-information">
        <h3>  {this.props.track.name}</h3>
        <p>  {this.props.track.artist} | <small>{this.props.track.album}</small></p>
      </div>
    {this.renderAction()}
    </div>
  );
  }
}

export default Track;
