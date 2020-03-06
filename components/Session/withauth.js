import React from 'react';

import AuthUserContext from './context';
import { onAuthUserListener, isLoggedIn, getDbUser, user, getUid } from '../Firebase';
import { anonUser } from '../Firebase/db';
// import firebase from '@react-native-firebase/app';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        dbUser: null
      };
      
		}

    

		async componentDidMount() {
      this.listener = onAuthUserListener(
        authUser => {
          if (authUser)
          {
            const authTest = {...authUser._user}
            getDbUser().then(dbUser => this.setState({ authUser: authTest, dbUser }) )
            user(authTest.uid).on('value', (snapshot) => 
            getDbUser().then(dbUser => this.setState({ dbUser }))
            )
          }
        },
        () => {
          this.setState({ authUser: null, dbUser: null })
        },
      );
    }


    componentWillUnmount() {
      this.listener ? this.listener() : null;

    }

    render() {
      return (
        <AuthUserContext.Provider value={{ authUser: this.state.authUser, dbUser: this.state.dbUser}} >
          <Component {...this.props} />
        </AuthUserContext.Provider>
			)
    }
  }

  return (WithAuthentication);
};

export default withAuthentication;