import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Reboot from 'material-ui/Reboot';

/* Stylesheet imports */
import 'typeface-roboto';
import '../stylesheets/transition.css';

import { myTheme } from '../themes/theme';
import MainLayout from '../layouts/MainLayout.jsx';
import MulaiTesPage from '../pages/MulaiTesPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import DaftarPageContainer from '../containers/DaftarPageContainer.jsx';

// App component - represents the whole app
class App extends Component {
  componentDidMount() {
    // Meteor.subscribe('userData');
  }

  render() {
    const {
      currentUser,
      connected,
      newPlayerName,
      newPlayerScore,
      headerTitle,
      justRegister,
    } = this.props;

    /* edit this someday */
    let tempUser; // !user
    if (newPlayerName && newPlayerScore && !currentUser) {
      tempUser = {};
      tempUser.name = newPlayerName;
      tempUser.score = newPlayerScore;
    }

    if (currentUser) {
      console.log(`currentUser: ${currentUser.username}`);
    }

    return (
      <div>
        <Reboot>
          <MuiThemeProvider theme={myTheme}>
            <Router>
              <CSSTransitionGroup
                transitionName="fade"
                transitionAppear
                transitionAppearTimeout={300}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => <HomePage currentUser={currentUser} {...props} />}
                    key="home"
                  />
                  <Route exact path="/daftar" component={DaftarPageContainer} key="daftar" />
                  <Route exact path="/mulai-tes" component={MulaiTesPage} key="mulaiTes" />
                  <Route
                    path="/:id"
                    render={props => (
                      <MainLayout
                        currentUser={currentUser}
                        newPlayer={tempUser}
                        headerTitle={headerTitle}
                        justRegister={justRegister}
                        {...props}
                      />
                    )}
                    key="base"
                  />
                  <Redirect from="*" to="/" />
                </Switch>
              </CSSTransitionGroup>
            </Router>
          </MuiThemeProvider>
        </Reboot>
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object, // current meteor user
  connected: PropTypes.bool, // server connection status
  newPlayerName: PropTypes.string,
  newPlayerScore: PropTypes.number,
  headerTitle: PropTypes.string,
  justRegister: PropTypes.bool,
};

export default App;
