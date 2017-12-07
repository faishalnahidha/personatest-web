import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';

import { NewPlayers } from '../../api/new-players.js';
import { Questions } from '../../api/questions.js';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Question from '../components/Question.jsx';
import Header from '../components/Header.jsx';
import ProgressPanel from '../components/ProgressPanel.jsx';
import NewPlayerPage from '../pages/NewPlayerPage.jsx';

const styles = theme => ({
  contentRoot: {
    flexGrow: 1,
    margin: 0,
    marginTop: 80,
    padding: 8
  },
  paper: {
    padding: [16, 0],
    borderRadius: 5
  },
  ol: {
    paddingLeft: 0,
    margin: 16,
    marginLeft: 24
  },
  mainColumn: {
    overflowY: 'scroll',
    height: '100px'
  },
  rightColumnContainer: {
    position: 'sticky',
    top: 88,
    padding: 0
  }
});

/* TestPage represents Persona Test page UI and interaction */
class TestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      answeredCount: 0,
      newPlayerInitialized: false
    };

    this.updateNewPlayerAnswers = this.updateNewPlayerAnswers.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.newPlayerInitialized &&
      !nextProps.loading &&
      nextProps.newPlayerExists &&
      nextProps.newPlayer.answers
    ) {
      console.log('this will be called once');
      const answers = nextProps.newPlayer.answers;
      console.log('answers: ' + answers);
      console.log('answer.lenght: ' + answers.length);
      this.setState({
        answers: answers,
        answeredCount: answers.length,
        newPlayerInitialized: true
      });
    }
  }

  updateNewPlayerAnswers(index, value) {
    console.log(`-------question click no.${index + 1}-------`);

    const answers = this.state.answers.slice();

    if (answers[index] === undefined) {
      console.log('new answer');
      answers.push(value);

      var answeredCount = this.state.answeredCount + 1;
      this.setState({ answeredCount });
    } else {
      console.log('edited answer');
      answers[index] = value;
    }

    this.setState({ answers });
    Meteor.call('newPlayers.updateAnswers', this.props.newPlayer._id, answers);

    console.log(`answers[${index}]: ${answers[index]}`);
  }

  percentage() {
    let answeredCount = this.state.answeredCount;
    return Math.floor(answeredCount / 70 * 100);
  }

  renderQuestions() {
    return this.props.questions.map((question, index) => (
      <div key={index}>
        <Question
          index={index}
          question={question}
          value={this.state.answers[index]}
          updateNewPlayerAnswers={this.updateNewPlayerAnswers}
        />
        <Divider />
      </div>
    ));
  }

  render() {
    const {
      loading,
      questions,
      newPlayer,
      newPlayerExists,
      isNewPlayer,
      classes
    } = this.props;

    // if the path is '/test/new-player' don't redirect
    if (isNewPlayer) {
      return true;
    }

    console.log('loading: ' + loading);
    /**
     * if the parameter of '/test/:params' is not exists in newPlayers collection,
     * it redirect to '/test/new-player'
     */
    if (!loading && !newPlayerExists) {
      return <Redirect to="/test/new-player" />;
    }

    if (!loading && newPlayerExists) {
      console.log('answeredCount: ' + this.state.answeredCount);
      return (
        <div>
          <Header newPlayer={newPlayer.name} score={newPlayer.score} />
          <div className={classes.contentRoot}>
            <Grid container spacing={16} justify={'center'}>
              <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
                <Paper className={classes.paper}>
                  <List>{this.renderQuestions()}</List>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={10} md={3} lg={2}>
                <Grid item xs={12} className={classes.rightColumnContainer}>
                  <Paper className={classes.paper}>
                    <br />
                    <ProgressPanel percentage={this.percentage()} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }

    return true;
  }
}

TestPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  questions: PropTypes.array,
  newPlayer: PropTypes.object,
  newPlayerExists: PropTypes.bool,
  isNewPlayer: PropTypes.bool
};

export default withStyles(styles)(TestPage);
