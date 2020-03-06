import React, { Component } from 'react';
import { Container, Body, Form, Content, Item, Label, Input, Button, Text } from 'native-base';
import RNRestart from 'react-native-restart'; // use to restart the app and have the js and all react compoenents be synced 

import DrawerHeader from '../Header';
import { loginWithEmail, signInAnon } from '../Firebase'


const INITIAL_STATE = {
	email: '',
	password: '', 
	error: null,
}

class SignIn extends Component {
	constructor(props){
		super(props);
		this.state = {
			...INITIAL_STATE,
		}

		this.firebase = this.props.firebase;
	}

	//this on change works cause we only have email and password initially.

	onChange = ( value, text) => {
		this.setState(value === 'email' ? {email: text} : {password: text});
	}

	onSignin= async () => {
		if (this.state.email.length > 5 && this.state.password.length > 6)
		{
			console.log("correct amount of values");
			try {
				await loginWithEmail(this.state.email, this.state.password)
				.then(userCred => {
					console.log(userCred);
					// RNRestart.Restart();
				})
				.catch(error => {
					this.setState({error});
				})
			} catch { error => console.log(error)}
		}
	}

  render() {
		const {error} = this.state;
    return (
      <Container>
        <DrawerHeader navigation={this.props.navigation} title="Sign In" />
				<Content >
					<Form>
						<Item floatingLabel >
							<Label>Email</Label>
							<Input textContentType={'emailAddress'} value={this.state.email} onChangeText={(text) => this.onChange('email', text)}/>
						</Item>
						<Item floatingLabel last>
						<Label>Password</Label>
							<Input autoCompleteType={'password'} secureTextEntry={true} value={this.state.password} onChangeText={(text) => this.onChange('password', text)} />
						</Item>
					</Form>
					<Button full primary style={{margin: 25}}
					onPress={() => this.onSignin()} >
            	<Text>Sign In</Text>
					</Button>
					{error == null ? null : <Text>{error.message}</Text>}
					<Button full warning style={{margin: 25}} onPress={() => signInAnon()} >
						<Text >Sign In Anonymously</Text>
					</Button>
				</Content>
      </Container>
    );
  }
}

export default SignIn;