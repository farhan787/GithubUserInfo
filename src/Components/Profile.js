import React, { Component } from 'react';
import { Col, Card, CardTitle } from 'react-materialize';
export default class Profile extends Component {
  render(){

    let user = this.props.userData;
    console.log(user)
    let followers = `${user.homeURL}/followers`
    let following = `${user.homeURL}/following`
    let repos = `${user.homeURL}/repositories`

    if(user.notFound === 'Not Found'){
      return(
        <div className="notfound">
          <h1>Are you sure, this user exists on Github??</h1>
        </div>
      );
    }

    else{
      return(
        <section className="github-profile">
          <div className="github-profile-info">
            <a href={user.homeURL} target="_blank" title={user.name || user.userName} /><img src={user.avatar} alt="This user has no image" />
            <h2><a href={user.homeURL} title={user.userName} target="_blank" />{user.name ||user.userName}</h2>
            <h3>{user.location}</h3>
          </div>
          <div className="github-profile-state">
            <ul>
              <li>
                <a href={repos} target="_blank" title="Number of Repositories" /><i>{user.repos}</i><span>Repositories</span>
              </li>
              <li>
                <a href={followers} target="_blank" title="Number of Followers" /><i>{user.followers}</i><span>Followers</span>
              </li>
              <li>
                <a href={following} target="_blank" title="Number of Following" /><i>{user.following}</i><span>Following</span>
              </li>
            </ul>
          </div>
        </section>
      );
    }

  }
}
