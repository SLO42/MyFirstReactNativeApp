
import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, H3, Text} from 'native-base';
import DrawerHeader from '../Header';
import { isLoggedIn } from '../Firebase'



class Home extends Component {
  render() {

    const user = isLoggedIn();

    return (
      <Container>
        <DrawerHeader navigation={this.props.navigation} title="<- Click me to Navigate" /> 

        <StatusBar barStyle="light-content" />
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <H3 >App to showcase</H3>
            <View style={{ marginTop: 8 }} />
            <H3 >NativeBase components</H3>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
            {user ? <Text>{user.email}</Text> : null }
          </View>
      </Container>
    );
  }
}



export default (Home);




// import React, { Component } from "react";
// import HomeScreen from "./HomeScreen.js";
// import MainScreenNavigator from "../ChatScreen/index.js";
// import Profile from "../ProfileScreen/index.js";
// import SideBar from "../SideBar/SideBar.js";
// import { DrawerNavigator } from "react-navigation";
// const HomeScreenRouter = DrawerNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Chat: { screen: MainScreenNavigator },
//     Profile: { screen: Profile }
//   },
//   {
//     contentComponent: props => <SideBar {...props} />
//   }
// );
// export default HomeScreenRouter;
