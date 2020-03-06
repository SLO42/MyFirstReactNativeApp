import React, { Component } from 'react';
import { Container, Text, Item, Icon, Input, Button 
} from 'native-base';
import { getDbUser, updateWithKeyAndValue, updateAccount,updateDisplayName } from '../Firebase'; 
import DrawerHeader from '../Header'; //no header because user must create account
import { withAuthentication, AuthUserContext, withAccount, AccountContext} from '../Session'; 
import DefaultHeader from '../Header';

const INITIAL_STATE = {
	username: '',
	firstname: '', 
	lastname: '',
	loading: true,
	stage: 0,
	dbUser: null,
}

style = {
	flex: 1,
	textAlign: 'center', justifyContent: 'center'}

class CreateAccount extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...INITIAL_STATE,
			prevStage: () => this.setState({stage: --this.state.stage}),
			nextStage: () => this.setState({stage: ++this.state.stage}),
		}
	}

	componentDidMount() {
		this.setState({loading: true});
		getDbUser().then(dbUser => {
			this.setState({dbUser});
			if (dbUser.accountCreated)
			{
				updateAccount();
			}
			else if (!dbUser.username)
			{
				this.setState({stage: 1});
			}
			else if (!dbUser.firstname)
			{
				this.setState({stage: 2, username: dbUser.username});
			}
			else if (!dbUser.lastname)
			{
				this.setState({stage: 3, username: dbUser.username, firstname: dbUser.firstname});
			}
			else this.setState({stage: 3, username: dbUser.username, firstname: dbUser.firstname});
			this.setState({loading: false})
		}).catch(err => console.log(err))

	}


	// prevStage() {
	// 	this.setState({stage: this.state.stage})
	// }

	submitValue(){
		console.log("why you no? ");
		if (this.state.stage == 3)
		{
			updateWithKeyAndValue('username',this.state.username);
			updateWithKeyAndValue('firstname',this.state.firstname);
			updateWithKeyAndValue('lastname',this.state.lastname);
			updateWithKeyAndValue("accountCreated", true);
			console.log("please")
		}
		else this.state.nextStage();
	}

	onChange = ( value, text) => {
		this.setState(value === 'username' ? {username: text} 
		: value === 'firstname' ? {firstname: text} : {lastname: text} );
	}

	

		
	// the loading stage.

	Stage0 = () => {
		return(
			<Container>
				<Text style={
					{flex: 1, textAlignVertical: 'center',
					textAlign: 'center', justifyContent: 'center'}
					}>Loading...</Text>
			</Container>
		 )
	}
	
	Stage1 = (props) => {
		return (
			<Container>
				{ // if value already given, give ability to skip
					props.dbUser.username ? 
					<Button rounder style={{margin: 25}}
					onPress={ () => props.nextStage()} >
						<Text style={style}>skip</Text>
					</Button> : null
				}
				<Text style={
					{flex: 1, textAlignVertical: 'center',
					textAlign: 'center', justifyContent: 'center'}
					}>Stage 1... Create your username </Text>
					<Button full primary style={{margin: 25}}
						onPress={() => this.submitValue()} >
						<Text>Confirm Username</Text>
					</Button>
					<Item >
						<Input textContentType={'username'} 
						placeholder='Username' value={this.state.username} 
						onChangeText={(text) => this.onChange('username', text )}
						/>
						<Icon name='checkmark-circle' />
					</Item>
			</Container>
		)
	}

	Stage2 = (props) => {
		return (
			<Container>
				{
					props.dbUser.firstname ? 
					<Button full primary style={{margin: 25}}
						onPress={() => props.nextStage()} >
						<Text style={style} >skip</Text>
					</Button> : null
				}
				<Button full primary style={{margin: 25}}
					onPress={() => props.prevStage()} >
					<Text style={style}>Go Back</Text>
				</Button>
				<Text style={
					{flex: 1, textAlignVertical: 'center',
					textAlign: 'center', justifyContent: 'center'}
					}>Stage 2... please enter your name</Text>
					<Button full primary style={{margin: 25}}
						onPress={() => this.submitValue()} >
						<Text>Confirm Firstname</Text>
					</Button>
					<Item >
						<Input textContentType={'name'} 
						placeholder='First name' value={this.state.firstname} 
						onChangeText={(text) => this.onChange('firstname', text )}
						/>
						<Icon name='checkmark-circle' />
					</Item>
			</Container>
		)
	}

	Stage3 = (props) => {
		return (
			<Container>
				<Button full primary style={{margin: 25}}
					onPress={() => props.prevStage()} >
					<Text style={style}>Go Back</Text>
				</Button>
				<Text style={
					{flex: 1, textAlignVertical: 'center',
					textAlign: 'center', justifyContent: 'center'}
					}>Stage 3... please enter your last name</Text>
					<Button full primary style={{margin: 25}}
						onPress={() => this.submitValue()} >
						<Text>Confirm Lastname</Text>
					</Button>
					<Item >
						<Input textContentType={'name'} 
						placeholder='Last name' value={this.state.lastname} 
						onChangeText={(text) => this.onChange('lastname', text )}
						/>
						<Icon name='checkmark-circle' />
					</Item>
			</Container>
		)
	}



  render() {
		const {loading, stage} = this.state;
		
		return ( 
				loading ?  <this.Stage0 dbUser={this.state.dbUser}/> : stage == 1 ?
				<this.Stage1 dbUser={this.state.dbUser}
				 nextStage={this.state.nextStage} /> :
				stage == 2 ? <this.Stage2 dbUser={this.state.dbUser} 
				prevStage={this.state.prevStage} nextStage={this.state.nextStage}
				/> : <this.Stage3 dbUser={this.state.dbUser} 	prevStage={this.state.prevStage} nextStage={this.state.nextStage} />

      // <Container>
			// 	<Header>
			// 		<Text>
			// 			1 of 5
			// 		</Text>
			// 	</Header>
			// 	<Content>
			// 		<Card>
			// 			<CardItem header>
	    //     		<Text> first step to create an account  </Text>
			// 			</CardItem>
			// 		</Card>
			// 	</Content>
      // </Container>
    );
  }
}

export default (CreateAccount);