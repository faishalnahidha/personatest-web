import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Reboot from 'material-ui/Reboot';

/**
 * Stylesheet imports
 */
// import 'normalize.css';
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
    Session.setDefault('isDrawerOpen', false);
    this.users = Meteor.users;
  }

  render() {
    const {
      user, connected, newPlayerName, newPlayerScore, headerTitle,
    } = this.props;

    const tempUser = {}; // !user
    if (newPlayerName && newPlayerScore) {
      tempUser.name = newPlayerName;
      tempUser.score = newPlayerScore;
    }

    if (user) {
      console.log(`user: ${JSON.stringify(user)}`);
    }
    console.log(`connected: ${connected}`);

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
                    render={props => <HomePage user={user} {...props} />}
                    key="home"
                  />
                  <Route exact path="/daftar" component={DaftarPageContainer} key="daftar" />
                  <Route exact path="/mulai-tes" component={MulaiTesPage} key="mulaiTes" />
                  <Route
                    path="/:id"
                    render={props => (
                      <MainLayout
                        user={user}
                        newPlayer={tempUser}
                        headerTitle={headerTitle}
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
  user: PropTypes.object, // current meteor user
  connected: PropTypes.bool, // server connection status
  newPlayerName: PropTypes.string,
  newPlayerScore: PropTypes.number,
  headerTitle: PropTypes.string,
};

export default App;
