import React, { Component } from 'react';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { isLoggedIn, signOut } from '../Firebase';
class DrawerHeader extends Component{


  render() {

    const DefaultHeader = () => { 
      return (
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title style={{maxWidth: 400, fontSize: 15} }> {this.props.title ? this.props.title : "default Header"}</Title>
          </Body>
          <Right>
            {isLoggedIn() !== null ? <Button transparent onPress={() => signOut()}>
              <Icon name='md-arrow-round-back' />
            </Button>: null }
          </Right>
        </Header>
      )
    }

    return (
        <DefaultHeader />
    )
  }
}

export default (DrawerHeader);