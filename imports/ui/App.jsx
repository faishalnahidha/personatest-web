import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles } from 'material-ui/styles';

import 'normalize.css';

import { myTheme } from './theme.js';
import Header from './components/Header.jsx';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 0,
    width: '100%'
  }
});

// App component - represents the whole app
class App extends Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <MuiThemeProvider theme={myTheme}>
          <Header />
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
