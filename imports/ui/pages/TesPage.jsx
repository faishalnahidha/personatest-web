import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
// import TransitionGroup from 'react-transition-group/TransitionGroup';
import { CSSTransitionGroup } from 'react-transition-group';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';
import List from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import NavigateNext from 'material-ui-icons/NavigateNext';

import '../stylesheets/animate.css';

import QuestionList from '../components/QuestionList.jsx';
import TestProgressPanel from '../components/TestProgressPanel.jsx';
import { drawerWidth } from '../components/MenuDrawer.jsx';
import { smoothScroll } from '../../lib/smooth-scroll.js';
import { determineTestResult } from '../../lib/determine-test-result.js';
import { testAnswerPoint, startTestPoint } from '../../lib/points-const';
import { mySecondaryColor } from '../themes/secondary-color-palette';

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
    overflow: 'hidden',
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
    [theme.breakpoints.up('md')]: {
      top: 104,
    },
    [theme.breakpoints.down('md')]: {
      top: 88,
    },
  },
  buttonBerikutnya: {
    width: '100%',
    //  marginBottom: theme.spacing.unit * 2,
  },
  circularProgress: {
    marginTop: 128,
    marginBottom: 128,
  },
  questionList: {
    padding: 0,
  },
  snackbarMessage: {
    maxWidth: 256,
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

const ANSWER_POINTS = testAnswerPoint;
const START_POINTS = startTestPoint;
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
      openSnackbar2: false,
      openSnackbar3: false,
      openSnackbar4: false,
    };

    this.updateAnswersPerPage = this.updateAnswersPerPage.bind(this);
    this.handleButtonBerikutnya = this.handleButtonBerikutnya.bind(this);
  }

  componentDidMount() {
    const { newPlayer } = this.props;
    this.updateSomeState(newPlayer);
    Session.set('headerTitle', 'Persona Test');
    if (!newPlayer.answers) {
      this.setState({ openSnackbar2: true, openSnackbar3: true }); // masih bisa run
    }
  }

  componentWillReceiveProps({ newPlayer }) {
    if (newPlayer.answers && newPlayer.answers.length !== this.state.answeredCount) {
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
    Session.setPersistent('currentNewPlayer_score', score);
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

      if (questionPage === 1) {
        this.setState({ openSnackbar4: true });
      }

      smoothScroll.scrollTo('top', 96);
      const answers = this.updateAnswers(answerPerPageCopy, score);

      /**
       * Jika questionPage sudah melebihi LAST_PAGE, berarti
       * tes sudah selesai. Saatnya menghitung hasil tes lalu
       * mengupdate data result di newPlayers collection
       */
      if (questionPage > LAST_PAGE) {
        this.updateResult(answers);
      }
    } else {
      alert('Anda belum menjawab semua pertanyaan!');
    }
  }

  handleSnackbar3Close = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnackbar3: false });
  };

  handleSnackbar4Close = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnackbar4: false });
  };

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
            <List key={questionPage} className={this.props.classes.questionList}>
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
            variant="raised"
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
          key="snackbar1"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.openSnackbar}
          onClose={() => this.setState({ openSnackbar: false })}
          autoHideDuration={3000}
          message={
            <span>
              {newPlayer.name}, skor anda:
              <span style={{ color: mySecondaryColor.A700 }}>&ensp;+ {ANSWER_POINTS}</span>
            </span>
          }
        />
        <Snackbar
          key="snackbar2"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.openSnackbar2}
          onClose={() => this.setState({ openSnackbar2: false })}
          autoHideDuration={3000}
          message={
            <span>
              {newPlayer.name}, skor awal anda:
              <span style={{ color: mySecondaryColor.A700 }}>&ensp;+ {START_POINTS}</span>
            </span>
          }
        />
        <Snackbar
          key="snackbar3"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackbar3}
          onClose={this.handleSnackbar3Close}
          autoHideDuration={8000}
          message={
            <span className={classes.snackbarMessage}>
              Hai {newPlayer.name}, selamat datang di Persona Web App. Di sini, Anda akan
              mendapatkan poin dengan berinteraksi dengan aplikasi. Kumpulkan poin
              sebanyak-banyaknya sambil menemukan karir terbaik Anda!
            </span>
          }
          action={
            <Button color="secondary" size="small" onClick={this.handleSnackbar3Close}>
              Tutup
            </Button>
          }
        />
        <Snackbar
          key="snackbar4"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openSnackbar4}
          onClose={this.handleSnackbar4Close}
          autoHideDuration={8000}
          message={
            <span className={classes.snackbarMessage}>
              Cobalah untuk tidak terpengaruh norma/nilai di masyarakat ketika menjawab. Jujurlah
              pada diri sendiri untuk mendapatkan hasil tes yang akurat.
            </span>
          }
          action={
            <Button color="secondary" size="small" onClick={this.handleSnackbar4Close}>
              Tutup
            </Button>
          }
        />
      </div>
    );
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
