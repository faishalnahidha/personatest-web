import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactiveVar } from 'meteor/reactive-var';
import classnames from 'classnames';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import Header from '../components/Header.jsx';
import TesPage from '../pages/TesPage.jsx';
import HasilTesPage from '../pages/HasilTesPage.jsx';
import MenuDrawer, { drawerWidth } from '../components/MenuDrawer.jsx';
import Footer from '../components/Footer.jsx';
import { secondaryAccentGenerator } from '../../lib/secondary-accent.js';

const styles = theme => ({
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

class TesLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      isDrawerOpen: false
    };

    this.newPlayerInitialized = false;
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  componentDidMount() {
    Session.set('drawerWidth', drawerWidth);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.newPlayerInitialized && nextProps.newPlayerExists) {
      console.log('this will be called once');

      this.secondaryAccent = secondaryAccentGenerator(
        nextProps.newPlayer._id.charAt(0).toUpperCase()
      );

      this.newPlayerInitialized = true;
    }

    if (
      nextProps.newPlayerExists &&
      nextProps.newPlayer.score != this.state.score
    ) {
      const score = nextProps.newPlayer.score;
      this.setState({ score });
    }
  }

  handleDrawerOpen() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }

  renderChildPage() {
    const {
      questionLoading,
      resultLoading,
      newPlayer,
      questions,
      resultContents,
      isTestFinished
    } = this.props;

    if (isTestFinished) {
      return (
        <HasilTesPage
          newPlayer={newPlayer}
          resultLoading={resultLoading}
          resultContents={resultContents}
          isDrawerOpen={this.state.isDrawerOpen}
        />
      );
    } else {
      return (
        <TesPage
          newPlayer={newPlayer}
          questionLoading={questionLoading}
          questions={questions}
          secondaryAccent={this.secondaryAccent}
          isDrawerOpen={this.state.isDrawerOpen}
        />
      );
    }
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

    const headerTitle = (() => {
      if (!loading) {
        if (isTestFinished) {
          return 'Hasil Tes';
        } else {
          return 'Persona Tes';
        }
      } else {
        return '';
      }
    })();

    return (
      <div className={classes.root}>
        <Header
          headerTitle={headerTitle}
          newPlayerName={newPlayerExists ? newPlayer.name : ' '}
          score={score}
          isDrawerOpen={isDrawerOpen}
          secondaryAccent={this.secondaryAccent}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <div
          className={classnames(classes.headerExpand, {
            [classes.headerExpandShift]: isDrawerOpen
          })}
        />
        <MenuDrawer
          isOpen={isDrawerOpen}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        {newPlayerExists ? this.renderChildPage() : ''}
        <Footer />
      </div>
    );
  }
}

TesLayout.propTypes = {
  loading: PropTypes.bool,
  questionLoading: PropTypes.bool,
  newPlayerExists: PropTypes.bool,
  newPlayer: PropTypes.object,
  questions: PropTypes.array
};

export default withStyles(styles)(TesLayout);
