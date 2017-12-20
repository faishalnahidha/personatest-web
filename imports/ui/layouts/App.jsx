import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles } from 'material-ui/styles';

/**
 * Stylesheet imports
 */
import 'normalize.css';
import 'typeface-roboto';
import '../stylesheets/transition.css';
import '../stylesheets/circular-progressbar.css';

import { myTheme } from '../themes/theme.js';
import HomePage from '../pages/HomePage.jsx';
import TestContainer from '../containers/TestContainer.jsx';
import ResultContainer from '../containers/ResultContainer.jsx';
import NewPlayerPage from '../pages/NewPlayerPage.jsx';

const styles = theme => ({
  root: {
    marginTop: 0,
    width: '100%'
  }
});

const hello = () => <h1>Hello</h1>;

// App component - represents the whole app
class App extends Component {
  render() {
    const { classes } = this.props;
    //const isHeaderRoute = !window.location.pathname.includes('new-player');

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={myTheme}>
          <Router>
            <CSSTransitionGroup
              transitionName="fade"
              transitionAppear={true}
              transitionAppearTimeout={300}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              <Route exact path="/" component={HomePage} key="home" />
              <Route
                path="/new-player"
                component={NewPlayerPage}
                key="newPlayer"
              />
              <Route path="/test/:id" component={TestContainer} key="test" />
              <Route
                path="/result/:id"
                component={ResultContainer}
                key="result"
              />
              {/* <Route path="/result/" component={ResultContainer} key="result" /> */}
            </CSSTransitionGroup>
          </Router>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
