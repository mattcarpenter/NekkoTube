import React from 'react'
import CaptionWordContainer from '../containers/CaptionWordContainer'

class Captions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    if (this.props.caption && (this.props.caption.words || []).length > 0) {
      var words = this.props.caption.words;
      var wordsComponents = [];
      words.forEach(function (word, index) {
        wordsComponents.push(<CaptionWordContainer key={index} word={word} />)
      });

      return (
        <div style={styles.container}>
          {wordsComponents}
        </div>
      );
    } else {
      return (<div></div>);
    }
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15
  }
}

export default Captions
