import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import { Questions } from '../../api/questions.js';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

import Question from '../components/Question.jsx';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 16
  },
  ol: {
    paddingLeft: 0,
    margin: 16
  }
});

/* TestContainer represents Persona Test feature */
class TestPage extends Component {
  renderQuestions() {
    return this.props.questions.map(question => (
      <Question key={question._id} question={question} />
    ));
  }

  render() {
    const classes = this.props.classes;

    return (
      <Grid container className={classes.root}>
        <Grid container spacing={16} justify={'center'}>
          <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
            <Paper className={classes.paper}>
              <ol className={classes.ol}>{this.renderQuestions()}</ol>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={10} md={3} lg={2}>
            <Paper className={classes.paper} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

TestPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTracker(() => {
  return {
    questions: Questions.find({}).fetch()
  };
})(withStyles(styles)(TestPage));
