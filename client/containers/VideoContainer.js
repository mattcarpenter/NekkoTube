import React from 'react'
import { connect } from 'react-redux'
import { Video } from '../components'

class VideoContainer extends React.Component {
  componentDidMount() {
    console.log('------------------ componentDidMount');
    /*this.setState({
      videoId: this.props.params.videoId
    });*/
  }

  render() {
    console.log('--------------- render');
    return (
      <div>
        <Video videoId={this.props.params.videoId}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('------mapStateToProps');
  return {
    //active: ownProps.filter === state.visibilityFilter
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('-------------mapDispatchToProps');
  // @todo: fetch video
  return {
  };
}

VideoContainer = connect(mapStateToProps, mapDispatchToProps)(VideoContainer)

export default VideoContainer 
