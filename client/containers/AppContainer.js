import React from 'react'
import { Link, browserHistory } from 'react-router'

export default function AppContainer({ children }) {
  return (
    <div className="container" style={styles.container}>
      <header style={styles.header}>
        <h1>=＾● ⋏ ●＾=</h1>
        <navigation>
          <a href="/">Home</a>
        </navigation>
      </header>
      {children}
    </div>
  )
}

const styles = {
  header: {
    marginBottom: 20,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 20,
    width: 640
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};

//  onClick={() => browserHistory.push('/foo')}