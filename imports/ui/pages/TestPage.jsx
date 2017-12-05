import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
//import { withTracker } from 'meteor/react-meteor-data';

import { Questions } from '../../api/questions.js';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import Question from '../components/Question.jsx';
import Header from '../components/Header.jsx';
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
  }
});

/* TestPage represents Persona Test page UI and interaction */
class TestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answeredQuestionsCount: 0,
      questionsAnswers: Array(70).fill(null)
    };

    this.updateNewPlayerData = this.updateNewPlayerData.bind();
  }

  updateNewPlayerData() {}

  renderQuestions() {
    return this.props.questions.map((question, index) => (
      <div key={index}>
        <Question
          question={question}
          value={this.state.questionsAnswers[index]}
          onClick={this.updateNewPlayerData.bind(this)}
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

    /**
     * if the parameter of '/test/:params' is not exists in newPlayers collection,
     * it redirect to '/test/new-player'
     */
    console.log('loading: ' + loading);
    if (!loading && !newPlayerExists) {
      return <Redirect to="/test/new-player" />;
    }

    return (
      <div>
        <Header />
        <div className={classes.contentRoot}>
          <Grid container spacing={16} justify={'center'}>
            <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
              <Paper className={classes.paper}>
                <List>{this.renderQuestions()}</List>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={10} md={3} lg={2}>
              <Paper className={classes.paper}>
                <br />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
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
