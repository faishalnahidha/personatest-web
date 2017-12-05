import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import 'normalize.css';
import 'typeface-roboto';

import { myTheme } from '../themes/theme.js';
import Header from '../components/Header.jsx';
import TestContainer from '../containers/TestContainer.jsx';
import Question from '../components/Question.jsx';
import NewPlayerPage from '../pages/NewPlayerPage.jsx';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 0,
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
      <Router>
        <div className={classes.root}>
          <MuiThemeProvider theme={myTheme}>
            <Route exact path="/" component={hello} />
            <Route path="/test/new-player" component={NewPlayerPage} />
            <Route
              exact
              path="/test"
              render={() => <Redirect to="/test/new-player" />}
            />
            <Route path="/test/:id" component={TestContainer} />
          </MuiThemeProvider>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
