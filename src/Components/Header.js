import React, { Component, Fragment } from 'react';
import { NavItem, Navbar } from 'react-materialize';

export default class Header extends Component {

  render(){

    var check;

    if(this.props.idToken){
      check = <NavItem onClick={this.props.onLogout.bind(this)} href="#">Logout</NavItem>
    }else{
      check = <NavItem onClick={this.props.onLogin.bind(this)} href="#">Login</NavItem>
    }

    return(
      <Fragment>
        <Navbar brand='Github Finder' center>
          <NavItem href="#">{check}</NavItem>
        </Navbar>
      </Fragment>
    );
  }
}
