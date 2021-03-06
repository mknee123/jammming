import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.searchOnEnter = this.searchOnEnter.bind(this);
  }
  search() {
    this.props.onSearch(this.state.term);
    //this.props.onKeyPress(this.state.term);
  }
  handleTermChange(event) {
    this.setState({ term : event.target.value});
  }
  searchOnEnter(event) {
    if(event.key === 'Enter'){
      this.props.onKeyPress(this.state.term);
      console.log('Enter key pressed.');
    }
  }

  render(){
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
        onChange={this.handleTermChange} onKeyPress={this.searchOnEnter} />
        <button onClick={this.search}>SEARCH</button>
      </div>
    );
  }
}

export default SearchBar;
