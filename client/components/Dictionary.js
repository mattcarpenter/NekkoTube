import React from 'react'

class Dictionary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {

  }

  render() {
    var senses = [];
    (this.props.word.senses || []).forEach(function (sense, index) {
      senses.push(<li key={index}>{sense[1]} - {sense[0]} </li>);
    });

    if (!senses.length) {
      return (<div></div>);
    }

    return (
      <div style={styles.container}>
        <div style={styles.word}>
          {this.props.word.word}
        </div>
        <div style={styles.senses}>
          <strong>Senses:</strong>
          <ul style={styles.list}>
            {senses}
          </ul>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FCFCFC',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#F0F0F0',
    padding: 15
  },
  word: {
    marginRight: '15px',
    fontSize: 40
  },
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
}

export default Dictionary
