import React from 'react'

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
    return (
      <div>
        {this.props.caption ? this.props.caption.inverted : ''}
      </div>
    );
  }
}

export default Captions
