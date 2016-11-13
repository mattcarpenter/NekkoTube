import React from 'react'
import SearchResult from './SearchResult'

class Captions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: []
    };
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchResults != this.props.searchResults) {
      // Update results
      this.setState({ results: (this.props.searchResults || []) });
    }
  }

  search() {
    this.props.onSearch(this.state.query);
  }

  handleQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  submit(event) {
    event.preventDefault();
    this.search();
  }

  render() {
    // compose search results
    var results = [];
    var words = (this.state.query || '').split(' ').join(',');

    this.state.results.forEach((result, index) => {
      results.push(
        <SearchResult
          key={index}
          video={result}
          words={words}
        />
      );
    });

    return (
      <div style={styles.container}>
        <form style={styles.form} onSubmit={this.submit.bind(this)}>
          <div className="form-group">
            <label htmlFor="query">Search Query</label>
            <input type="text" className="form-control" id="query" onChange={this.handleQueryChange.bind(this)}/>
          </div>
          <button type="button" className="btn btn-default" onClick={this.search.bind(this)}>Search</button>
        </form>
        <ul style={styles.results}>
          {results}
        </ul>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width: 640
  },
  form: {
    width: '100%'
  },
  results: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    marginTop: 20
  }
}

export default Captions
