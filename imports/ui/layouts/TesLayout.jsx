import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Session } from 'meteor/session';
import { Route, Redirect, Switch } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import Header from '../components/Header.jsx';
import TesPage from '../pages/TesPage.jsx';
import HasilTesPage from '../pages/HasilTesPage.jsx';
import MenuDrawer, { drawerWidth } from '../components/MenuDrawer.jsx';
import Footer from '../components/Footer.jsx';

const styles = theme => ({
  headerExpand: {
    position: 'absolute',
    width: '100%',
    height: 256,
    top: 0,
    zIndex: -1,
    // background: '#7474bf'
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

class TesLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: Session.get('isDrawerOpen') ? Session.get('isDrawerOpen') : false,
    };

    this.newPlayerInitialized = false;
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { newPlayer } = nextProps;
    if (!this.newPlayerInitialized && nextProps.newPlayerExists) {
      this.newPlayerInitialized = true;
      this.saveNewPlayerSession(newPlayer);
    }
  }

  componentWillUnmount() {
    Session.set('isDrawerOpen', this.state.isDrawerOpen);
    console.log(`statusDrawer: ${this.state.isDrawerOpen}`);
    console.log(`SessionStatusDrawer: ${Session.get('isDrawerOpen')}`);
    if (this.props.resultContentHandle) {
      this.props.resultContentHandle.stop();
    }
    if (this.props.questionHandle) {
      this.props.questionHandle.stop();
    }
  }

  saveNewPlayerSession(newPlayer) {
    Session.setPersistent('currentNewPlayer_id', newPlayer._id);
    Session.setPersistent('currentNewPlayer_isTestFinished', newPlayer.isTestFinished);
    Session.setPersistent('currentNewPlayer_name', newPlayer.name);
    Session.setPersistent('currentNewPlayer_score', newPlayer.score);

    console.log(`Session.currentNewPlayer_id: ${Session.get('currentNewPlayer_id')}`);
    console.log(`Session.currentNewPlayer_isTestFinished: ${Session.get('currentNewPlayer_isTestFinished')}`);
  }

  handleDrawerOpen() {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  }

  renderChildPage() {
    const {
      questionLoading, resultLoading, newPlayer, questions, resultContents,
    } = this.props;

    if (newPlayer.isTestFinished) {
      return (
        <HasilTesPage
          newPlayer={newPlayer}
          resultLoading={resultLoading}
          resultContents={resultContents}
          isDrawerOpen={this.state.isDrawerOpen}
        />
      );
    }
    return (
      <TesPage
        newPlayer={newPlayer}
        questionLoading={questionLoading}
        questions={questions}
        isDrawerOpen={this.state.isDrawerOpen}
      />
    );
  }

  render() {
    const {
      user, loading, newPlayerExists, newPlayer, classes,
    } = this.props;

    const { isDrawerOpen } = this.state;

    // console.log(`newPlayer: ${Session.get('newPlayer').name}`);

    if (!loading && !newPlayerExists) {
      return <Redirect to="/mulai-tes" />;
    }

    const headerTitle = (() => {
      if (!loading) {
        if (newPlayer.isTestFinished) {
          return 'Hasil Tes';
        }
        return 'Persona Test';
      }
      return '';
    })();

    const nameAndScore = (() => {
      if (newPlayerExists) {
        return { name: newPlayer.name, score: newPlayer.score };
      }
      return null;
    })();

    return (
      <div className={classes.root}>
        <Header
          user={user}
          headerTitle={headerTitle}
          newPlayer={nameAndScore}
          isDrawerOpen={isDrawerOpen}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <div
          className={classnames(classes.headerExpand, {
            [classes.headerExpandShift]: isDrawerOpen,
          })}
        />
        <MenuDrawer isOpen={isDrawerOpen} handleDrawerOpen={this.handleDrawerOpen} />
        {newPlayerExists && this.renderChildPage()}
        <Footer />
      </div>
    );
  }
}

TesLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  newPlayerExists: PropTypes.bool.isRequired,
  newPlayer: PropTypes.object,
  questionLoading: PropTypes.bool,
  questionHandle: PropTypes.object,
  questions: PropTypes.array,
  resultLoading: PropTypes.bool,
  resultContentHandle: PropTypes.object,
  resultContents: PropTypes.array,
  isTestFinished: PropTypes.bool,
};

export default withStyles(styles)(TesLayout);
