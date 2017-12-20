import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { CSSTransitionGroup } from 'react-transition-group';
//import TransitionGroup from 'react-addons-transition-group';

import { NewPlayers } from '../../api/new-players.js';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import NavigateNext from 'material-ui-icons/NavigateNext';

import '../stylesheets/animate.css';

import NewPlayerPage from '../pages/NewPlayerPage.jsx';
import Header from '../components/Header.jsx';
import QuestionList from '../components/QuestionList.jsx';
import TestProgressPanel from '../components/TestProgressPanel.jsx';
import { smoothScroll } from '../../other/smooth-scroll.js';
import { secondaryAccentGenerator } from '../../other/secondary-accent.js';

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
  },
  circularProgress: {
    marginTop: 128,
    marginBottom: 128
  }
});

const ANSWER_POINTS = 40;
const QUESTIONS_PER_PAGE = 7;
const LAST_PAGE = 9;

/* TestPage represents Persona Test page user interface and interaction */
class TestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answersPerPage: Array(7).fill(null), // make array[0..6] filled by null
      answeredCount: 0,
      score: 0,
      newPlayerInitialized: false,
      questionPage: 0,
      openSnackbar: false
    };

    this.secondaryAccent = null;
    this.updateAnswersPerPage = this.updateAnswersPerPage.bind(this);
    this.handleButtonBerikutnya = this.handleButtonBerikutnya.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.newPlayerInitialized &&
      !nextProps.loading &&
      nextProps.newPlayerExists
    ) {
      console.log('this will be called once');
      console.log('answers: ' + nextProps.newPlayer.answers);
      console.log('score: ' + nextProps.newPlayer.score);

      this.initializeState(nextProps);

      this.setState({
        newPlayerInitialized: true
      });

      this.secondaryAccent = secondaryAccentGenerator(
        nextProps.newPlayer._id.charAt(0).toUpperCase()
      );

      return true;
    }

    if (
      nextProps.newPlayerExists &&
      nextProps.newPlayer.answers &&
      nextProps.newPlayer.answers.length !== this.state.answeredCount
    ) {
      console.log('initializeState called');
      this.initializeState(nextProps);
      return true;
    }
  }

  initializeState(nextProps) {
    const answers = nextProps.newPlayer.answers
      ? nextProps.newPlayer.answers
      : [];
    const questionPage = Math.floor(answers.length / 7);
    const score = nextProps.newPlayer.score;
    const blankAnswers = Array(7).fill(null);

    this.setState({
      answersPerPage: blankAnswers,
      answeredCount: answers.length,
      score: score,
      questionPage: questionPage
    });
  }

  updateAnswersPerPage(index, value) {
    console.log(`-------question click no.${index + 1}-------`);
    const answersPerPage = this.state.answersPerPage.slice();

    /**
     * Jika nilai array dengan index tersebut == null,
     * berarti merupakan jawaban baru maka answeredCount
     * perlu ditambah
     */
    if (answersPerPage[index] == null) {
      console.log('new answer!');
      const answeredCount = this.state.answeredCount + 1;
      this.setState({ answeredCount });
    }

    answersPerPage[index] = value;
    this.setState({ answersPerPage });
  }

  updateAnswers(answerPerPage, score) {
    const answers = this.props.newPlayer.answers
      ? this.props.newPlayer.answers.slice()
      : [];
    const newAnswers = answers.concat(answerPerPage);

    this.setState({ answers: newAnswers });

    Meteor.call(
      'newPlayers.updateAnswers',
      this.props.newPlayer._id,
      newAnswers,
      score
    );
  }

  handleButtonBerikutnya() {
    const { answersPerPage } = this.state;

    /**
     * answersPerPage.indexOf(null) === -1 --> untuk mencari adakah
     * nilai null dalam array answersPerPage, -1 berarti tidak ada
     * null dan boleh ke halaman berikutnya
     */
    if (answersPerPage.indexOf(null) === -1) {
      const score = this.addScore(ANSWER_POINTS);
      var questionPage = this.state.questionPage + 1;
      const answerPerPageCopy = answersPerPage.slice();
      const blankAnswers = Array(7).fill(null);

      this.setState({
        score: score,
        questionPage: questionPage,
        answersPerPage: blankAnswers,
        openSnackbar: true
      });
      smoothScroll.scrollTo('top', 80);
      this.updateAnswers(answerPerPageCopy, score);

      if (questionPage > LAST_PAGE) {
        return <Redirect to={`/result/${this.props.newPlayer._id}`} />;
      }
    } else {
      alert('Anda belum menjawab semua pertanyaan!');
      // smoothScroll.scrollTo('top', 80);
      // this.setState({ openSnackbar: true });
    }
  }

  addScore(point) {
    return this.state.score + point;
  }

  percentage() {
    const answeredCount = this.state.answeredCount;
    return Math.floor(answeredCount / 70 * 100);
  }

  renderQuestions() {
    const { questionPage, answersPerPage } = this.state;

    const questionStartIndex = questionPage * QUESTIONS_PER_PAGE;
    const questionEndIndex = questionStartIndex + QUESTIONS_PER_PAGE;

    const questionsPerPage = this.props.questions.slice(
      questionStartIndex,
      questionEndIndex
    );

    return (
      <Grid container spacing={0} justify={'center'}>
        <Grid item xs={12}>
          <CSSTransitionGroup
            transitionName={{
              enter: 'animated',
              enterActive: 'fadeInUp',
              appear: 'animated',
              appearActive: 'fadeInUp'
            }}
            transitionAppear={true}
            transitionLeave={false}
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
          >
            <List key={questionPage}>
              <QuestionList
                questionsPerPage={questionsPerPage}
                questionStartIndex={questionStartIndex}
                answersPerPage={answersPerPage}
                updateAnswersToTestPage={this.updateAnswersPerPage}
              />
            </List>
          </CSSTransitionGroup>
        </Grid>
        <Grid item xs={12} sm={6} md={5} style={{ padding: 16 }}>
          <Button
            raised
            color="primary"
            onClick={this.handleButtonBerikutnya}
            className={this.props.classes.buttonBerikutnya}
          >
            {questionPage < LAST_PAGE ? 'Berikutnya' : 'Lihat Hasil'} ({
              questionPage
            })
            <NavigateNext style={{ marginLeft: 8 }} />
          </Button>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { loading, newPlayer, newPlayerExists, classes } = this.props;

    console.log('loading: ' + loading);
    /**
     * if the parameter of '/test/:params' is not exists in newPlayers collection,
     * it redirect to '/test/new-player'
     */
    if (!loading && !newPlayerExists) {
      return <Redirect to="/new-player" />;
    }

    if (this.state.questionPage > LAST_PAGE) {
      return <Redirect to={`/result/${this.props.newPlayer._id}`} />;
    }

    if (newPlayerExists) {
      return (
        <div id="top">
          <Header
            newPlayer={newPlayer.name}
            score={this.state.score}
            secondaryAccent={this.secondaryAccent}
          />
          <div className={classes.contentRoot}>
            <Grid container spacing={16} justify="center">
              <Grid item xs={12} sm={10} md={8} lg={6}>
                <Paper className={classes.paper}>
                  {/* <Grid container spacing={0} justify="center">
                    <CircularProgress
                      size={50}
                      className={classes.circularProgress}
                    />
                  </Grid> */}
                  {loading ? (
                    <Grid
                      container
                      spacing={0}
                      justify="center"
                      alignItems="center"
                    >
                      <CircularProgress
                        size={50}
                        className={classes.circularProgress}
                      />
                    </Grid>
                  ) : (
                    this.renderQuestions()
                  )}
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
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            open={this.state.openSnackbar}
            onRequestClose={() => this.setState({ openSnackbar: false })}
            autoHideDuration={2500}
            message={
              <span>
                {newPlayer.name}, skor anda:
                <span style={{ color: this.secondaryAccent }}>
                  &ensp;+ {ANSWER_POINTS}
                </span>
              </span>
            }
          />
        </div>
      );
    }

    return (
      <Grid container spacing={0} justify="center" alignItems="center">
        <CircularProgress size={50} className={classes.circularProgress} />
      </Grid>
    );
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
