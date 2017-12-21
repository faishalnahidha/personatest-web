import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactiveVar } from 'meteor/reactive-var';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Header from '../components/Header.jsx';
import TesPage from '../pages/TesPage.jsx';
import HasilTesPage from '../pages/HasilTesPage.jsx';
import { secondaryAccentGenerator } from '../../lib/secondary-accent.js';

class TesLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0
    };

    this.newPlayerInitialized = false;
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

  renderChildPage() {
    const {
      loading,
      questionLoading,
      resultLoading,
      newPlayerExists,
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
        />
      );
    } else {
      return (
        <TesPage
          newPlayer={newPlayer}
          questionLoading={questionLoading}
          questions={questions}
          secondaryAccent={this.secondaryAccent}
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
      resultContents
    } = this.props;

    //console.log('resultLoading: ' + resultLoading);
    //console.log('resultContents: ' + JSON.stringify(resultContents));
    //console.log('resultContents.name: ' + resultContents.name);

    return (
      <div>
        <Header
          newPlayerName={newPlayerExists ? newPlayer.name : ' '}
          score={this.state.score}
          secondaryAccent={this.secondaryAccent}
        />
        {newPlayerExists ? this.renderChildPage() : ''}
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

export default TesLayout;
