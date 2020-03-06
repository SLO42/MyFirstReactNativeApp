import React from "react";
import { Root, Content, Text } from "native-base";
import 'react-native-gesture-handler';
import firebase from '@react-native-firebase/app';
// import { StackNavigator, DrawerNavigator } from "react-navigation";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";

import Home from '../Home';
import Test from '../main';
import SignIn from '../SignIn';
import SignUp from "../SignUp";
import CreateAccount from '../CreateAccount';
// import {withAuthentication} from '../Session';
import { isLoggedIn, getAccountCreated, connectDb } from '../Firebase';
import { withAuthentication, AuthUserContext, withAccount, AccountContext} from '../Session'; 


const Drawer = createDrawerNavigator();
// const myFire = new Firebase();

console.log('initialized apps ->', firebase.apps);
// create initalState and add user have this be where the auth user listener is. should be some good stuff

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
    }
  }

   componentDidMount() {
    this.setState({loading: true});
    connectDb();
    this.accountCreated = getAccountCreated();
    console.log('initialized apps ->', firebase.apps);
    this.setState({loading: false});
  }

  componentWillUnmount() {
    
  }

  render() {
    const {loading} = this.state;
    const created = getAccountCreated();
    // const CreateAccountWithProps = () => <CreateAccount dbUser={dbUser} authUser={authUser} />

    const DefaultNav = () => 
    <NavigationContainer>
    <Root>
      <AuthUserContext.Consumer>
      { userObj => 
        {const CreateAccountWithProps = () => <CreateAccount authUser={userObj.authUser} />
        return (
          userObj.authUser ? 
        <Drawer.Navigator>
        { userObj.dbUser && userObj.dbUser.accountCreated ? null : <Drawer.Screen name="Create Account" component={CreateAccountWithProps} /> }
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Test" component={Test} />
      </Drawer.Navigator> : 
        <Drawer.Navigator>
          <Drawer.Screen name="Sign In" component={SignIn} />
          <Drawer.Screen name="Sign Up" component={SignUp} /> 
        </Drawer.Navigator> 
        )} }
      </AuthUserContext.Consumer>
    </Root>
  </NavigationContainer>;

    return(loading ? null : <DefaultNav /> )
  }

}

export default withAuthentication(App);