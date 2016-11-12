import React from 'react'

import { VIDEO_STATE_PAUSED, VIDEO_STATE_PLAYING } from '../actions/videos'

class Captions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latched: false
    }

    this.pauseVideo = debounce(function () {
      this.props.setVideoState(VIDEO_STATE_PAUSED);
    }, 250);

    this.playVideo = debounce(function () {
      this.props.setVideoState(VIDEO_STATE_PLAYING);
    }, 250);
  }

  componentDidMount() {
    
  }

  componentDidUpdate(prevProps) {
  }

  enter() {
    this.pauseVideo();
  }

  leave() {
    this.playVideo();
  }

  click() {
    this.state.latched = !this.state.latched;
    this.props.toggleLatched();
  }

  render() {
    var style = { ...styles.container };
    if (this.props.word.particle) {
      style.backgroundColor = styles.particleBackgroundColor;
    } else {
      style.backgroundColor = styles.defaultbackgroundColor;
    }

    return (
      <div
        style={style}
        onMouseEnter={this.enter.bind(this)}
        onMouseLeave={this.leave.bind(this)}
        onClick={this.click.bind(this)} >
        {this.props.word.word}
      </div>
    );
  }
}

const styles = {
  container: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#D0D0D0',
    padding: 5,
    whiteSpace: 'nowrap',
    margin: 2
  },
  particleBackgroundColor: '#E0E0E0',
  defaultbackgroundColor: '#FAFAFA'
};

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

export default Captions
