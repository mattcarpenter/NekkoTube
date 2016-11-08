import React from 'react'
import YouTube from 'react-youtube'

const opts = {
    height: '390',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
    }
 };

class Video extends React.Component {
  componentDidMount() {
    this.props.fetchVideo(this.props.videoId);
  }

  onReady(event) {
    setTimeout(function () {
        console.log(event.target.getMediaReferenceTime());
    }, 3000);
  }

  render() {
    return (
      <YouTube
        videoId={this.props.videoId}
        opts={opts}
        onReady={this.onReady}
      />
    );
  }
}

export default Video
