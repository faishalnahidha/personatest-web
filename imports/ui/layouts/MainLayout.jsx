import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Session } from 'meteor/session';
import { Route, Redirect, Switch } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import Header from '../components/Header.jsx';
import MenuDrawer, { drawerWidth } from '../components/MenuDrawer.jsx';
import PublicContentPageContainer from '../containers/PublicContentPageContainer.jsx';
import Footer from '../components/Footer.jsx';

const styles = theme => ({
  headerExpand: {
    position: 'absolute',
    width: '100%',
    height: 256,
    top: 0,
    zIndex: -1,
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
      isDrawerOpen: Session.get('isDrawerOpen') ? Session.get('isDrawerOpen') : false,
    };

    this.newPlayerInitialized = false;
    // this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  handleDrawerOpen = () => {
    const isDrawerOpen = !this.state.isDrawerOpen;
    this.setState({ isDrawerOpen });
    Session.set({ isDrawerOpen });
  };

  render() {
    const { classes, user } = this.props;
    const { isDrawerOpen } = this.state;

    return (
      <div className={classes.root}>
        <Header
          user={user}
          headerTitle="Artikel"
          isDrawerOpen={isDrawerOpen}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <div
          className={classnames(classes.headerExpand, {
            [classes.headerExpandShift]: isDrawerOpen,
          })}
        />
        <MenuDrawer isOpen={isDrawerOpen} handleDrawerOpen={this.handleDrawerOpen} />
        <Switch>
          <Route
            path="/artikel/:id"
            render={props => (
              <PublicContentPageContainer user={user} isDrawerOpen={isDrawerOpen} {...props} />
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
  user: PropTypes.object,
  newPlayerName: PropTypes.string,
  score: PropTypes.number,
};

export default withStyles(styles)(MainLayout);
