
import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, H3, Text, Card, CardItem,} from 'native-base';
import DrawerHeader from '../Header';
import { isLoggedIn } from '../Firebase'



class EditAccount extends Component {
	constructor(props){
		super(props);

		this.state = {
			dbUser: this.props.dbUser,
		}
	}
  render() {
		const {dbUser} = this.state;

    return (
				<Container>
					<DrawerHeader navigation={this.props.navigation} title="Account" /> 
	
					<StatusBar barStyle="light-content" />
					<Card >
						<CardItem header>
							<Right >
								<Button transparent onPress={ () => this.props.changeEdit()} >
									<Icon 
									name="cog"
									/>
								</Button>
							</Right>
						</CardItem>
						<CardItem >
							<Text> todo: make this a list and add / remove martket keys,
								Current Market keys you follow :
								{
									dbUser && dbUser.marketKeys ? "keys" : "nothing available" 
								}
							</Text>
						</CardItem>
					</Card>
				</Container>

    );
	}
}



export default (EditAccount);




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
