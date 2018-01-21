import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';
import classnames from 'classnames';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { CSSTransitionGroup } from 'react-transition-group';
// import TransitionGroup from 'react-addons-transition-group';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import NavigateNext from 'material-ui-icons/NavigateNext';

import { NewPlayers } from '../../api/new-players.js';

import '../stylesheets/animate.css';

import QuestionList from '../components/QuestionList.jsx';
import TestProgressPanel from '../components/TestProgressPanel.jsx';
import { drawerWidth } from '../components/MenuDrawer.jsx';
import { smoothScroll } from '../../lib/smooth-scroll.js';
import { determineTestResult } from '../../lib/determine-test-result.js';
import { testAnswerPoint } from '../../lib/points-const';
import {mySecondaryColor} from '../themes/secondary-color-palette';

const styles = theme => ({
  contentRoot: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginTop: 96,
    },
    [theme.breakpoints.down('md')]: {
      marginTop: 80,
    },
  },
  paper: {
    padding: 0,
    borderRadius: 4,
  },
  mainColumnContainer: {
    margin: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainColumnContainerShift: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: drawerWidth,
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  stickyPanel: {
    position: 'sticky',
    top: 104,
  },
  buttonBerikutnya: {
    width: '100%',
    marginBottom: theme.spacing.unit * 2,
  },
  circularProgress: {
    marginTop: 128,
    marginBottom: 128,
  },
});

const ANSWER_POINTS = testAnswerPoint;
const QUESTIONS_PER_PAGE = 7;
const LAST_PAGE = 9;

/* TesPage represents Persona Test page user interface and interaction */
class TesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answersPerPage: Array(7).fill(null), // make array[0..6] filled by null
      answeredCount: 0,
      questionPage: 0,
      openSnackbar: false,
    };

    this.updateAnswersPerPage = this.updateAnswersPerPage.bind(this);
    this.handleButtonBerikutnya = this.handleButtonBerikutnya.bind(this);
  }

  componentDidMount() {
    const { newPlayer } = this.props;
    this.updateSomeState(newPlayer);
  }

  componentWillReceiveProps({ newPlayer }) {
    if (newPlayer.answers && newPlayer.answers.length !== this.state.answeredCount) {
      console.log('updateSomeState called');
      this.updateSomeState(newPlayer);
    }
  }

  updateSomeState(newPlayer) {
    const answers = newPlayer.answers ? newPlayer.answers : [];
    const questionPage = Math.floor(answers.length / 7);
    const blankAnswers = Array(7).fill(null);

    this.setState({
      answersPerPage: blankAnswers,
      answeredCount: answers.length,
      questionPage,
    });
  }

  updateAnswersPerPage(index, value) {
    console.log(`>> question click no.${index + 1} <<`);
    const answersPerPage = this.state.answersPerPage.slice();

    /**
     * Jika nilai array dengan index tersebut == null,
     * berarti merupakan jawaban baru maka answeredCount
     * perlu ditambah
     */
    if (answersPerPage[index] == null) {
      const answeredCount = this.state.answeredCount + 1;
      this.setState({ answeredCount });
    }

    answersPerPage[index] = value;
    this.setState({ answersPerPage });
  }

  /**
   *
   * @param {Array} answerPerPage
   * @param {Number} score
   * updateAnswers() adalah fungsi untuk mengupdate
   * database yaitu newPlayers collection
   */
  updateAnswers(answerPerPage, score) {
    const { newPlayer } = this.props;
    const answers = newPlayer.answers ? newPlayer.answers.slice() : [];
    /**
     * Menggabungkan array answers (answers yang sekarang)
     * dengan answerPerPage (7 answer tambahan)
     */
    const newAnswers = answers.concat(answerPerPage);

    Meteor.call('newPlayers.updateAnswers', this.props.newPlayer._id, newAnswers, score);

    return newAnswers;
  }

  updateResult(answers) {
    if (answers.length === 70) {
      const result = determineTestResult(answers);

      Meteor.call('newPlayers.updateResult', this.props.newPlayer._id, result);
    } else {
      throw new Meteor.Error('answers not full!');
    }
  }

  handleButtonBerikutnya() {
    const { answersPerPage } = this.state;

    /**
     * answersPerPage.indexOf(null) === -1 --> untuk mencari adakah
     * nilai null dalam array answersPerPage. -1 berarti tidak ada
     * null dan boleh ke halaman berikutnya
     */
    if (answersPerPage.indexOf(null) === -1) {
      const score = this.addScore(ANSWER_POINTS);
      const questionPage = this.state.questionPage + 1;
      const answerPerPageCopy = answersPerPage.slice();
      const blankAnswers = Array(7).fill(null);

      this.setState({
        questionPage,
        answersPerPage: blankAnswers,
        openSnackbar: true,
      });

      smoothScroll.scrollTo('top', 96);
      const answers = this.updateAnswers(answerPerPageCopy, score);

      /**
       * Jika questionPage sudah melebihi LAST_PAGE, berarti
       * tes sudah selesai. Saatnya menghitung hasil tes lalu
       * mengupdate data result di newPlayers collection
       */
      if (questionPage > LAST_PAGE) {
        this.updateResult(answers);
        // return true;
      }
    } else {
      alert('Anda belum menjawab semua pertanyaan!');
      // smoothScroll.scrollTo('top', 80);
      // this.setState({ openSnackbar: true });
    }
  }

  addScore(point) {
    return this.props.newPlayer.score + point;
  }

  percentage() {
    const { answeredCount } = this.state;
    return Math.floor(answeredCount / 70 * 100);
  }

  renderQuestions() {
    const { questionPage, answersPerPage } = this.state;

    const questionStartIndex = questionPage * QUESTIONS_PER_PAGE;
    const questionEndIndex = questionStartIndex + QUESTIONS_PER_PAGE;

    const questionsPerPage = this.props.questions.slice(questionStartIndex, questionEndIndex);

    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12}>
          <CSSTransitionGroup
            transitionName={{
              enter: 'animated',
              enterActive: 'fadeInUp',
              appear: 'animated',
              appearActive: 'fadeInUp',
            }}
            transitionAppear
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
            {questionPage < LAST_PAGE ? 'Berikutnya' : 'Lihat Hasil'}
            <NavigateNext style={{ marginLeft: 8 }} />
          </Button>
        </Grid>
      </Grid>
    );
  }

  render() {
    const {
      questionLoading, newPlayer, isDrawerOpen, classes,
    } = this.props;

    return (
      <div id="top">
        <div className={classes.contentRoot}>
          <Grid container spacing={16} justify="center">
            {/* main column */}
            <Grid
              item
              xs={12}
              sm={10}
              md={8}
              lg={6}
              className={classnames(classes.mainColumnContainer, {
                [classes.mainColumnContainerShift]: isDrawerOpen,
              })}
            >
              <Paper className={classes.paper}>
                {questionLoading ? (
                  <Grid container spacing={0} justify="center" alignItems="center">
                    <CircularProgress size={50} className={classes.circularProgress} />
                  </Grid>
                ) : (
                  this.renderQuestions()
                )}
              </Paper>
            </Grid>
            {/* right column */}
            <Grid item xs={12} sm={10} md={3} lg={2}>
              <Grid container spacing={16} justify="center" className={classes.stickyPanel}>
                <Grid item xs={12} sm={6} md={12}>
                  <TestProgressPanel percentage={this.percentage()} name={newPlayer.name} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
        {/* Snackbar code here */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.openSnackbar}
          onClose={() => this.setState({ openSnackbar: false })}
          autoHideDuration={2500}
          message={
            <span>
              {newPlayer.name}, skor anda:
              <span style={{ color: mySecondaryColor.A700 }}>&ensp;+ {ANSWER_POINTS}</span>
            </span>
          }
        />
      </div>
    );

    // return (
    //   <Grid container spacing={0} justify="center" alignItems="center">
    //     <CircularProgress size={50} className={classes.circularProgress} />
    //   </Grid>
    // );
  }
}

TesPage.propTypes = {
  classes: PropTypes.object.isRequired,
  questionLoading: PropTypes.bool,
  questions: PropTypes.array,
  newPlayer: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool,
};

export default withStyles(styles)(TesPage);
