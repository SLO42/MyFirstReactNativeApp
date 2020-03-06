import React, { Component } from 'react';
import { Container } from 'native-base';
import DrawerHeader from '../Header';

export default class Main extends Component {
  render() {
    return (
      <Container>
        <DrawerHeader navigation={this.props.navigation} title="Testing" /> 
      </Container>
    );
  }
}





// import React from 'react';
// import { Container, Header, Content, Button, Text, Left, Icon } from 'native-base';

// export default class Main extends React.Component {
// 	// constructor(props){
// 	//     super(props);

		
// 	// }
// 	render() {
// 		return(
// 				<Container >
// 					<Header >
// 						<Content>
// 							<Button transparent >
// 								<Left >
// 								<Icon name='menu' />
// 								</Left>
// 							</Button>
// 						</Content>
// 					</Header>
// 				</Container>
// 		)
// 	}
// }