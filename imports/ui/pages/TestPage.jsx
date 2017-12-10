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
import Button from 'material-ui/Button';
import NavigateNext from 'material-ui-icons/NavigateNext';

import NewPlayerPage from '../pages/NewPlayerPage.jsx';
import Header from '../components/Header.jsx';
import Question from '../components/Question.jsx';
import TestProgressPanel from '../components/TestProgressPanel.jsx';

const styles = theme => ({
  contentRoot: {
    flexGrow: 1,
    margin: 0,
    marginTop: 80,
    padding: theme.spacing.unit * 1
  },
  paper: {
    padding: '16px 0',
    borderRadius: 5
  },
  mainColumn: {
    overflowY: 'scroll',
    height: '100px'
  },
  rightColumnContainer: {
    position: 'sticky',
    top: 88,
    padding: 0
  },
  buttonBerikutnya: {
    width: '100%',
    marginBottom: theme.spacing.unit * 1
  }
});

/* TestPage represents Persona Test page UI and interaction */
class TestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answers: [],
      answeredCount: 0,
      score: 0,
      newPlayerInitialized: false,
      questionPage: 0,
      nextQuestionPage: false
    };

    this.updateNewPlayerAnswers = this.updateNewPlayerAnswers.bind(this);
    this.handleButtonBerikutnya = this.handleButtonBerikutnya.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.newPlayerInitialized &&
      !nextProps.loading &&
      nextProps.newPlayerExists
    ) {
      console.log('this will be called once');
      const answers = nextProps.newPlayer.answers
        ? nextProps.newPlayer.answers
        : [];
      const questionPage = Math.floor(answers.length / 7);
      const score = nextProps.newPlayer.score;

      console.log('answers: ' + answers);
      console.log('answer.lenght: ' + answers.length);
      console.log('questionPage: ' + questionPage);
      console.log('score: ' + nextProps.newPlayer.score);

      this.setState({
        answers: answers,
        answeredCount: answers.length,
        score: score,
        questionPage: questionPage,
        newPlayerInitialized: true
      });
    }
  }

  addScore(amount) {
    return this.state.score + amount;
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

    console.log(`answers[${index}]: ${answers[index]}`);
  }

  handleButtonBerikutnya() {
    const { answers } = this.state;

    if (answers.length % 7 == 0) {
      const questionPage = this.state.questionPage + 1,
        score = this.addScore(40);
      this.setState({ score, questionPage });

      Meteor.call(
        'newPlayers.updateAnswers',
        this.props.newPlayer._id,
        answers,
        score
      );
    } else {
      alert('Anda belum menjawab semua pertanyaan!');
    }
  }

  percentage() {
    let answeredCount = this.state.answeredCount;
    return Math.floor(answeredCount / 70 * 100);
  }

  renderQuestions() {
    const { answers, questionPage } = this.state,
      questionsPerPage = 7,
      questionStartIndex = questionPage * questionsPerPage,
      questionEndIndex = questionStartIndex + questionsPerPage;

    // console.log(
    //   questionPage + ' | ' + questionStartIndex + ' | ' + questionEndIndex
    // );

    const questionsItemsPerPage = this.props.questions.slice(
      questionStartIndex,
      questionEndIndex
    );

    return questionsItemsPerPage.map((question, index) => (
      <div key={index}>
        <Question
          index={questionStartIndex + index}
          question={question}
          value={answers[questionStartIndex + index]}
          updateNewPlayerAnswers={this.updateNewPlayerAnswers}
        />
        <Divider />
      </div>
    ));
  }

  render() {
    const {
      loading,
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
      //console.log('answeredCount: ' + this.state.answeredCount);
      //console.log('answeres: ' + this.state.answers);
      return (
        <div>
          <Header newPlayer={newPlayer.name} score={this.state.score} />
          <div className={classes.contentRoot}>
            <Grid container spacing={16} justify={'center'}>
              <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
                <Paper className={classes.paper}>
                  <Grid container spacing={0} justify={'center'}>
                    <Grid item xs={12}>
                      <List>{this.renderQuestions()}</List>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5} style={{ padding: 16 }}>
                      <Button
                        raised
                        color="primary"
                        onClick={this.handleButtonBerikutnya}
                        className={classes.buttonBerikutnya}
                      >
                        Berikutnya
                        <NavigateNext style={{ marginLeft: 8 }} />
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={10} md={3} lg={2}>
                <Grid
                  container
                  spacing={0}
                  className={classes.rightColumnContainer}
                >
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <TestProgressPanel
                        percentage={this.percentage()}
                        name={newPlayer.name}
                      />
                    </Paper>
                  </Grid>
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
