import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Redirect } from 'react-router-dom';

import TesPage from '../pages/TesPage.jsx';
import HasilTesPage from '../pages/HasilTesPage.jsx';

class TesLayout extends Component {
  constructor(props) {
    super(props);
    this.newPlayerInitialized = false;
  }

  componentWillReceiveProps(nextProps) {
    if (!this.newPlayerInitialized && nextProps.newPlayerExists) {
      this.newPlayerInitialized = true;
      this.saveNewPlayerSession(nextProps.newPlayer);
    }
  }

  componentWillUnmount() {
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
  }

  renderChildPage() {
    const {
      questionLoading,
      resultLoading,
      newPlayer,
      questions,
      resultContents,
      isDrawerOpen,
    } = this.props;

    if (newPlayer.isTestFinished) {
      return (
        <HasilTesPage
          newPlayer={newPlayer}
          resultLoading={resultLoading}
          resultContents={resultContents}
          isDrawerOpen={isDrawerOpen}
        />
      );
    }
    return (
      <TesPage
        newPlayer={newPlayer}
        questionLoading={questionLoading}
        questions={questions}
        isDrawerOpen={isDrawerOpen}
      />
    );
  }

  render() {
    const { loading, newPlayerExists } = this.props;

    if (!loading && !newPlayerExists) {
      return <Redirect to="/mulai-tes" />;
    }

    return <div>{newPlayerExists && this.renderChildPage()}</div>;
  }
}

TesLayout.propTypes = {
  loading: PropTypes.bool.isRequired,
  newPlayerExists: PropTypes.bool.isRequired,
  isDrawerOpen: PropTypes.bool,
  newPlayer: PropTypes.object,
  questionLoading: PropTypes.bool,
  questionHandle: PropTypes.object,
  questions: PropTypes.array,
  resultLoading: PropTypes.bool,
  resultContentHandle: PropTypes.object,
  resultContents: PropTypes.array,
};

export default TesLayout;
