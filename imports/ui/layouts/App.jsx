import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles } from 'material-ui/styles';

import 'normalize.css';
import 'typeface-roboto';

import { myTheme } from '../themes/theme.js';
import TestContainer from '../containers/TestContainer.jsx';
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
