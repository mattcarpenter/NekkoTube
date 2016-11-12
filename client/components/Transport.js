import React from 'react'

class Transport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { progressWidth: 0 };
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentTime !== this.props.currentTime) {
      this.setState({ progressWidth: this.props.currentTime * this.props.width / this.props.duration });
    }
  }

  render() {
    return (
      <div style={{ ...styles.container, width: this.props.width }}>
        <div style={{ ...styles.progress, width: this.state.progressWidth }}></div>
      </div>
    );
  }
}

const styles = {
  container: {
    borderWidth: 1.0,
    borderStyle: 'solid',
    borderColor: '#000000',
    height: 40,
    marginBottom: 20
  },
  progress: {
    height: 40,
    backgroundColor: '#00FF00'
  }
};

export default Transport
