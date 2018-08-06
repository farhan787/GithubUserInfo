import React, { Component } from 'react';

export default class Search extends Component {

  submitData(event){
    event.preventDefault();
    let value = this.refs.username.value;
    this.props.searchProfile(value);
    this.refs.username.value = '';
  }

  render(){
    return(
      <div className="search-box">
        <form onSubmit={this.submitData.bind(this)}>
          <label><input type="search" ref="username" placeholder="Enter user name and hit enter" /></label><br/>
        </form>
      </div>
    );
  }
}
