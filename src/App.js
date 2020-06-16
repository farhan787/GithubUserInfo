import React, { Component } from 'react';
import './App.css';
import Github from './Github';
import { Header, Footer } from './Components';
import Auth0Lock from 'auth0-lock';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idToken: '',
      profile: {},
    };
    this.showLock = this.showLock.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.logout = this.logout.bind(this);
  }

  static defaultProps = {
    clientId: 'IPXYBaKbBhbJczFjCGLoAzsflzFsJvEX',
    domainName: 'awesome-developer.auth0.com',
  };

  componentWillMount() {
    this.auth0Options = {
      auth: {
        responseType: 'token id_token',
        audience: 'https://awesome-developer.auth0.com/userinfo',
        redirectUri: 'http://localhost:3000/',
        scope: 'openid',
      },
      autoclose: true,
      oidcConformant: true,
    };

    this.lock = new Auth0Lock(
      this.props.clientId,
      this.props.domainName,
      this.auth0Options
    );

    this.lock.on('authenticated', (authResult) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return;
        }
        this.setProfile(authResult.idToken, profile);
      });
    });

    this.getProfile();
  }

  setProfile(idToken, profile) {
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile')),
    });
  }

  getProfile() {
    if (localStorage.getItem('idToken') != null) {
      this.setState(
        {
          idToken: localStorage.getItem('idToken'),
          profile: JSON.parse(localStorage.getItem('profile')),
        },
        () => {
          console.log(this.state);
        }
      );
    }
  }

  showLock() {
    this.lock.show();
  }

  logout() {
    this.setState(
      {
        idToken: '',
        profile: '',
      },
      () => {
        localStorage.removeItem('idToken');
        localStorage.removeItem('profile');
      }
    );
  }

  render() {
    let gitty;
    if (this.state.idToken) {
      gitty = <Github />;
    } else {
      gitty = (
        <h4 className="card" style={{ marginTop: 150, padding: 50 }}>
          Click on login to checkout Github Finder
        </h4>
      );
    }

    return (
      <div className="App">
        <div className="header">
          <Header
            idToken={this.state.idToken}
            onLogout={this.logout}
            onLogin={this.showLock}
          />
        </div>

        {gitty}
      </div>
    );
  }
}

export default App;
