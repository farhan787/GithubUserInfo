import React, { Component } from 'react';
import Profile from './Components/Profile'
import Search from './Components/Search'

const API = 'https://api.github.com/users'

export default class Github extends Component {

  constructor(props){
    super(props);

    this.state = {
      userName: 'farhan787',
      name: '',
      avatar: '',
      repos: '',
      followers: '',
      following: '',
      homeURL: '',
      notFound: '',
    };
    this.getProfile = this.getProfile.bind(this)
  }

  componentDidMount(){
    this.getProfile(this.state.userName)
  }

  getProfile(username){
    let url = `${API}/${username}`
    fetch(url)
    .then(result => result.json() )
    .then((data) => {
      this.setState({
        userName: data.login,
        name: data.name,
        avatar: data.avatar_url,
        repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        homeURL: data.html_url,
        notFound: data.message,
      })
    })

    .catch((err) => {
      console.log(err.message)
    })
  }

  render(){
    return(
      <div>
        <section id="card">
          <Search searchProfile={this.getProfile}/>
          <Profile userData={this.state} />
        </section>
      </div>
    );
  }
}
