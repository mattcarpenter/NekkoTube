import React from 'react'
import { connect } from 'react-redux'
import SearchContainer from '../containers/SearchContainer'

function Home({ }) {
  return (
    <SearchContainer/>
  )
}

export default connect()(Home)
