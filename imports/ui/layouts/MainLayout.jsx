import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Session } from 'meteor/session';
import { Route, Switch } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

import Header from '../components/Header.jsx';
import MenuDrawer, { drawerWidth } from '../components/MenuDrawer.jsx';
import PublicContentPageContainer from '../containers/PublicContentPageContainer.jsx';
import PrivateContentPageContainer from '../containers/PrivateContentPageContainer.jsx';
import TesContainer from '../containers/TesContainer.jsx';
import Footer from '../components/Footer.jsx';

import { mySecondaryColor } from '../themes/secondary-color-palette';
import { registerPoint } from '../../lib/points-const';

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

const REGISTER_POINT = registerPoint;

class MainLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDrawerOpen: false,
      isSnackbarOpen: false,
      isSnackbarOpen2: false,
    };

    this.newPlayerInitialized = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.justRegister === true) {
      this.setState({ isSnackbarOpen: true, isSnackbarOpen2: true });
    }
  }

  handleDrawerOpen = () => {
    const isDrawerOpen = !this.state.isDrawerOpen;
    this.setState({ isDrawerOpen });
  };

  handleSnackbarClose = () => {
    const isSnackbarOpen = false;
    this.setState({ isSnackbarOpen });
    Session.setPersistent('justRegister', false);
  };

  handleSnackbar2Close = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    const isSnackbarOpen2 = false;
    this.setState({ isSnackbarOpen2 });
  };

  render() {
    const {
      classes, currentUser, newPlayer, headerTitle,
    } = this.props;
    const { isDrawerOpen, isSnackbarOpen, isSnackbarOpen2 } = this.state;

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
            key="tesNewPlayer"
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
        {currentUser && (
          <Snackbar
            key="snackbar1"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={isSnackbarOpen}
            onClose={this.handleSnackbarClose}
            autoHideDuration={3000}
            message={
              <span>
                {currentUser.profile.name}, skor anda:
                <span style={{ color: mySecondaryColor.A700 }}>&ensp;+ {REGISTER_POINT}</span>
              </span>
            }
          />
        )}
        {currentUser && (
          <Snackbar
            key="snackbar2"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={isSnackbarOpen2}
            onClose={this.handleSnackbar2Close}
            autoHideDuration={8000}
            message={
              <span>
                Terima kasih sudah mendaftar di Persona Web App. Sekarang Anda bisa mengakses
                panduan karir berdasarkan tipe kepribadian Anda. Selain itu, Anda akan mendapatkan
                poin setiap selesai membaca satu artikel.
              </span>
            }
            action={
              <Button color="secondary" dense onClick={this.handleSnackbar2Close}>
                Tutup
              </Button>
            }
          />
        )}
      </div>
    );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  newPlayer: PropTypes.object,
  headerTitle: PropTypes.string,
  justRegister: PropTypes.bool,
};

export default withStyles(styles)(MainLayout);
