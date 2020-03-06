import React, { createContext } from 'react'

export const FirebaseContext = createContext({})


export const withFirebaseHOC = Component => props => (
  <FirebaseContext.Consumer>
    {state => <Component {...props} firebase={state} />}
  </FirebaseContext.Consumer>
)