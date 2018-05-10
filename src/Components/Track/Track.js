import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
   super(props);

   //this.state = { trackAction: '+' };
   this.renderAction = this.renderAction.bind(this); // bind(this) to .toggleMood()
   this.addTrack = this.addTrack.bind(this);
   this.removeTrack = this.removeTrack.bind(this);
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
  render() {
    return (
    <div className="Track">
      <div className="Track-information">
        <h3>  {this.props.track.name}  </h3>
        <p>  {this.props.track.artist} | <small>{this.props.track.album}</small></p>
      </div>
    {this.renderAction()}
    </div>
  );
  }
}

export default Track;
