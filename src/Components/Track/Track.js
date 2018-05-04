import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
   super(props);
   this.state = { trackAction: '+' };
   this.renderAction = this.renderAction.bind(this); // bind(this) to .toggleMood()
 }

 renderAction() {
   const newAction = this.state.trackAction == '+' ? '-' : '+';
   this.setState({ trackAction: newAction });
 }

  render() {
    <div className="Track">
      <div className="Track-information">
        <h3><!-- track name will go here --></h3>
        <p><!-- track artist will go here--> | <!-- track album will go here --></p>
      </div>
      <a className="Track-action" onClick={this.renderAction}>{this.state.Track}<!-- + or - will go here --></a>
    </div>
  }
}

export default Track;
