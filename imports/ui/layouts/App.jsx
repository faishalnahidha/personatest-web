import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
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
import BaseLayout from '../layouts/BaseLayout.jsx';
import TesContainer from '../containers/TesContainer.jsx';
import PublicContentLayout from '../layouts/PublicContentLayout.jsx';
import MulaiTesPage from '../pages/MulaiTesPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import OtentikasiPage from '../pages/OtentikasiPage.jsx';
import TemporaryDrawer from '../pages/TemporaryDrawer.jsx';

// App component - represents the whole app
function App(props) {
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
                <Route exact path="/" component={HomePage} key="home" />
                <Route exact path="/otentikasi" component={OtentikasiPage} key="otentikasi" />
                <Route exact path="/mulai-tes" component={MulaiTesPage} key="mulaiTes" />
                <Route path="/artikel" component={PublicContentLayout} key="public" />
                <Route path="/tes/:id" component={TesContainer} key="tes" />
                <Route exact path="/temporary" component={TemporaryDrawer} key="temporary" />
                <Redirect from="*" to="/" />
              </Switch>
            </CSSTransitionGroup>
          </Router>
        </MuiThemeProvider>
      </Reboot>
    </div>
  );
}

export default App;
