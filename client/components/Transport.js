import React from 'react'

class Transport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    return (
      <div>
        time {this.props.currentTime}
      </div>
    );
  }
}

export default Transport
