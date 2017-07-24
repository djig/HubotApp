import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
 
import Paper from 'material-ui/Paper';
import Comment from 'material-ui/svg-icons/communication/comment';
// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    let location = this.props.location.pathname;
    return (
        <div className="container">
          <Paper zDepth={1} >
          <header id="main-header">
          <nav className="navbar navbar-default">
            <div className="row">
                <div className="col-md-8 col-lg-8 col-sm-8">
                    <a className="navbar-brand" href="#">React<span className="logo-dec">Play</span></a>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-4">
                    <ul className="nav navbar-nav">
                      <li className={location === "/" ? 'active' : ''}><IndexLink activeStyle={{color: 'blue'}} to="/">
                        <Comment color={location === "/" ? 'blue' : 'grey'}  hoverColor="green"/>
                        Comments
                      </IndexLink></li>
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
        </Paper>
      </div>
 
      
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object.isRequired
};

export default App;
