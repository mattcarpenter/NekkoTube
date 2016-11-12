import React from 'react'
import { connect } from 'react-redux'
import Dictionary  from '../components/Dictionary'
import { setDictionaryWord } from '../actions/dictionary'

const mapStateToProps = (state, ownProps) => {
  return {
  	word: state.dictionary.word
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary)
