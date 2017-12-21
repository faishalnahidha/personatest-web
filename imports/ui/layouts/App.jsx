import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withStyles } from 'material-ui/styles';

/**
 * Stylesheet imports
 */
import 'normalize.css';
import 'typeface-roboto';
import '../stylesheets/transition.css';

import { myTheme } from '../themes/theme.js';
import HomePage from '../pages/HomePage.jsx';
import TesContainer from '../containers/TesContainer.jsx';
import MulaiTesPage from '../pages/MulaiTesPage.jsx';

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
              <Switch>
                <Route exact path="/" component={HomePage} key="home" />
                <Route
                  path="/mulai-tes"
                  component={MulaiTesPage}
                  key="mulaiTes"
                />
                <Route path="/tes/:id" component={TesContainer} key="tes" />
                <Route
                  path="/hasil-tes/:id"
                  component={TesContainer}
                  key="hasil"
                />
                <Redirect from="*" to="/" />
                {/* <Route path="/test/:id" component={TestContainer} key="test" />
                <Route
                  path="/result/:id"
                  component={ResultContainer}
                  key="result"
                /> */}
              </Switch>
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
