import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, H3, Text, Card, CardItem} from 'native-base';
import DrawerHeader from '../Header';
import {AuthUserContext} from '../Session';
import EditAccount from './editAccount';

const INITAL_STATE = {
	loading: true,
	edit: false,
}

class AccountPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...INITAL_STATE,
		}
	}


	componentDidMount(){
		this.setState({loading: true});

		//do some loading for messages or something 
		this.setState({loading: false});
	}

	Loading = () => {
		return(
			<Container>
				<Text style={
					{flex: 1, textAlignVertical: 'center',
					textAlign: 'center', justifyContent: 'center'}
					}>Loading...</Text>
			</Container>
		 )
	}

	changeEdit = () => {
		this.setState({edit: !this.state.edit});
	}

	


  render() {
		const {loading} = this.state;

	
    return (
			<AuthUserContext.Consumer>
				{
					userObj => {
						const dbUser = userObj.dbUser;

						
						return(
							loading ? <this.Loading /> : this.state.edit ? 
							<EditAccount navigation={this.props.navigation} dbUser={dbUser} changeEdit={this.changeEdit} />
							:
							<Container>
							<DrawerHeader navigation={this.props.navigation} title="Account" /> 
			
							<StatusBar barStyle="light-content" />
							<Card >
							<CardItem header >
								<Text>{dbUser? dbUser.username : 'default' } </Text>
								<Right >
									<Button transparent onPress={ () => this.changeEdit()}>
										<Icon name='cog' />
									</Button>
								</Right>
							</CardItem>
							<CardItem >
								<Text>
									Current Market keys you follow :
									{
										dbUser && dbUser.marketKeys ? "keys" : "nothing available" 
									}
								</Text>
							</CardItem>
						</Card>
							
						</Container>
					)
				}

				}
			</AuthUserContext.Consumer>
    );
  }
}

export default AccountPage

