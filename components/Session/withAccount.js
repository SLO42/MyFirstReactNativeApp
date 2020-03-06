import React from 'react';

import AccountContext from './context';
import { onAccountListener, isLoggedIn, stopAccountListener, getUid } from '../Firebase';
// import firebase from '@react-native-firebase/app';

const withAccount = Component => {
  class WithAccount extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        dbUser: null,
      };
      
		}

    

		async componentDidMount() {

			this.listener = onAccountListener( 
				(dbUser) => {
					if (dbUser.accountCreated){
						this.setState({accountCreated: true, dbUser: dbUser});
          }
          else{
            this.setState({accountCreated: false, dbUser: dbUser });
          }
				},
				() => {
					this.setState({accountCreated: false,});
				}
			);

    }


    componentWillUnmount() {
      try{
        stopAccountListener();
        this.listener();
      }catch {error => console.log(error)};

    }

    render() {
      return (
        <AccountContext.Provider value={this.state.dbUser}>
          <Component {...this.props} />
        </AccountContext.Provider>
			)
    }
  }

  return (WithAccount);
};

export default withAccount;