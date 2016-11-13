import React from 'react'
import { Link } from 'react-router'

class SearchResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
      <li style={styles.container}>
        <div style={styles.thumb}>
          <img src={this.props.video.thumbnails.default.url}/>
        </div>
        <div>
          <a href={'/video/' + this.props.video.youtubeVideoId + (this.props.words !== ',' ? '?words=' + this.props.words : '') }>
            {this.props.video.title}
          </a>
        </div>
      </li>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15
  },
  thumb: {
    marginRight: 15
  }
};


export default SearchResult
