import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Session } from 'meteor/session';
import { Route, Switch } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import Header from '../components/Header.jsx';
import MenuDrawer, { drawerWidth } from '../components/MenuDrawer.jsx';
import PublicContentPageContainer from '../containers/PublicContentPageContainer.jsx';
import PrivateContentPageContainer from '../containers/PrivateContentPageContainer.jsx';
import TesContainer from '../containers/TesContainer.jsx';
import Footer from '../components/Footer.jsx';

const styles = theme => ({
  headerExpand: {
    position: 'absolute',
    width: '100%',
    height: 256,
    top: 0,
    zIndex: -10,
    background: 'linear-gradient(90deg, #7474bf, #348ac7)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  headerExpandShift: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
});

class MainLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
    };

    this.newPlayerInitialized = false;
  }

  handleDrawerOpen = () => {
    const isDrawerOpen = !this.state.isDrawerOpen;
    this.setState({ isDrawerOpen });
  };

  render() {
    const {
      classes, currentUser, newPlayer, headerTitle,
    } = this.props;
    const { isDrawerOpen } = this.state;

    return (
      <div className={classes.root}>
        <Header
          currentUser={currentUser}
          newPlayer={newPlayer}
          headerTitle={headerTitle || ' '}
          isDrawerOpen={isDrawerOpen}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <div
          className={classnames(classes.headerExpand, {
            [classes.headerExpandShift]: isDrawerOpen,
          })}
        />
        <MenuDrawer
          currentUser={currentUser}
          isOpen={isDrawerOpen}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Switch>
          <Route
            path="/tes/:id"
            render={props => (
              <TesContainer currentUser={currentUser} isDrawerOpen={isDrawerOpen} {...props} />
            )}
            key="tes"
          />
          <Route
            path="/artikel/:personalityId/:contentId"
            render={props => (
              <PrivateContentPageContainer
                currentUser={currentUser}
                isDrawerOpen={isDrawerOpen}
                {...props}
              />
            )}
          />
          <Route
            path="/artikel/:id"
            render={props => (
              <PublicContentPageContainer
                currentUser={currentUser}
                isDrawerOpen={isDrawerOpen}
                {...props}
              />
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  newPlayer: PropTypes.object,
  headerTitle: PropTypes.string,
};

export default withStyles(styles)(MainLayout);
