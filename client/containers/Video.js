import React from 'react'
import { connect } from 'react-redux'
import { Player } from '../components'

class Video extends React.Component {
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
        Hello
        <Player videoId={this.props.params.videoId}/>
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
  return {
  };
}

Video = connect(mapStateToProps, mapDispatchToProps)(Video)

export default Video 
