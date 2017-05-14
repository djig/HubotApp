import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    let location = this.props.location.pathname;
    return (
      <div className="container">
        <header id="main-header">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">React<span className="logo-dec">Play</span></a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav navbar-right">
                <li className={location === "/" ? 'active' : ''}><IndexLink activeStyle={{color: 'blue'}} to="/">Home</IndexLink></li>
                <li className={location === "/users" ? 'active' : ''}><Link activeStyle={{color: 'blue'}} to="/users">Users</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        </header>
        <div className="wrapper header">
          {this.props.children} 
        </div>
        <footer id="footer">
          <div className="container">
            <div className="row text-center">
              <p>&copy; Hubot. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object.isRequired
};

export default App;
