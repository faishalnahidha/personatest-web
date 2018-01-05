import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import HeaderHome from '../components/HeaderHome.jsx';
import Footer from '../components/Footer.jsx';
import MenuDrawer, { drawerWidth } from '../components/MenuDrawer.jsx';

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    padding: 0
  },
  headerExpand: {
    position: 'absolute',
    width: '100%',
    height: 200,
    top: 0,
    zIndex: -1,
    //background: '#7474bf'
    background: 'linear-gradient(90deg, #7474bf, #348ac7)',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  headerExpandShift: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    }
  }
});

class HomeLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      isDrawerOpen: false
    };

    this.newPlayerInitialized = false;
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }

  render() {
    const {
      loading,
      questionLoading,
      resultLoading,
      newPlayerExists,
      newPlayer,
      questions,
      resultContents,
      isTestFinished,
      classes
    } = this.props;

    const { score, isDrawerOpen } = this.state;

    console.log('isDrawerOpen? ' + isDrawerOpen);

    return (
      <div className={classes.root}>
        <HeaderHome headerTitle="Persona Web" />
        <div
          className={classnames(classes.headerExpand, {
            [classes.headerExpandShift]: isDrawerOpen
          })}
        />
        <MenuDrawer
          isOpen={isDrawerOpen}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Footer />
      </div>
    );
  }
}
