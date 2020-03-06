import React, { Component } from 'react';
import { Container, Body, Form, Content, Item, Label, Input, Button, Text } from 'native-base';
import RNRestart from 'react-native-restart'; // use to restart the app and have the js and all react compoenents be synced 

import DrawerHeader from '../Header';
import { signupWithEmail } from '../Firebase'


const INITIAL_STATE = {
	email: '',
	password: '',
	password2: '',
	error: null,
}

class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
			...INITIAL_STATE,
		}

		this.firebase = this.props.firebase;
	}

	//this on change works cause we only have email and password initially.

	onChange = ( value, text) => {
		this.setState(value === 'email' ? {email: text} : value === 'password' ? {password: text} : {password2: text} );
	}

	onSignUp = async () => {
		const {email, password, password2} = this.state;

		if (email.length > 5 && password.length > 0 && password === password2)
		{
			console.log("correct amount of values");
			await signupWithEmail(this.state.email, this.state.password)
			.then(userCred => {
				console.log(userCred);
				// RNRestart.Restart();
			})
			.catch(error => {
				this.setState({error});
			})
		}
		else if (password !== password2)
		{
			this.setState({error: {message: "Passwords do not match"}});
		}
	}

  render() {
		const {error} = this.state;
    return (
      <Container>
        <DrawerHeader navigation={this.props.navigation} title="Sign Up" />
				<Content >
					<Text style={{ margin: 'auto'}}> Welcome to my app!</Text>
					<Form>
						<Item floatingLabel >
							<Label>Email</Label>
							<Input textContentType={'emailAddress'} value={this.state.email} onChangeText={(text) => this.onChange('email', text)}/>
						</Item>
						<Item floatingLabel>
						<Label>Password</Label>
							<Input textContentType={'newPassword'} secureTextEntry={true} value={this.state.password} onChangeText={(text) => this.onChange('password', text)} />
						</Item>
						<Item floatingLabel last>
						<Label>Confirm Password</Label>
							<Input textContentType={'password'} secureTextEntry={true} value={this.state.password2} onChangeText={(text) => this.onChange('password2', text)} />
						</Item>
					</Form>
					<Button full primary style={{margin: 25}}
						onPress={() => this.onSignUp()} >
						<Text>Create Account</Text>
					</Button>
					{error ? <Text>{error.message}</Text> : null}
				</Content>
      </Container>
    );
  }
}

export default (SignUp);