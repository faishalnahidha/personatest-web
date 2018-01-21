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
import TesContainer from '../containers/TesContainer.jsx';
import PublicContentLayout from '../layouts/PublicContentLayout.jsx';
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
    const { user, connected } = this.props;

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
                  {/* <Route
                    path="/artikel"
                    render={props => <PublicContentLayout user={user} {...props} />}
                    key="public"
                  /> */}
                  <Route
                    path="/tes/:id"
                    render={props => <TesContainer user={user} {...props} />}
                    key="tes"
                  />
                  <Route
                    path="/:id"
                    render={props => <MainLayout user={user} {...props} />}
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
  // isDrawerOpen: ReactPropTypes.bool, // is drawer open?
};

export default App;
