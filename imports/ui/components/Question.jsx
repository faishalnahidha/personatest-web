import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import { FormControlLabel, FormHelperText } from 'material-ui/Form';

const styles = theme => ({
  questionItem: {
    margin: [32, 16]
  },
  answerBoxContainer: {
    marginTop: 16
  },
  answerBox: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#B0BEC5', //blueGrey[500]
    padding: [8, 16]
  }
});

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { classes, question } = this.props;

    return (
      <li className={classes.questionItem}>
        <Typography type="subheading">{question.text}</Typography>
        <Grid container className={classes.answerBoxContainer} spacing={0}>
          <Grid item xs={12} sm={6} className={classes.answerBox}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.value === question.answer[0].value}
                  onChange={this.handleChange}
                  value={question.answer[0].value}
                  name="question-choice"
                  aria-label="A"
                />
              }
              label={this.props.question.answer[0].text}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.answerBox}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.value === question.answer[1].value}
                  onChange={this.handleChange}
                  value={question.answer[1].value}
                  name="question-choice"
                  aria-label="B"
                />
              }
              label={question.answer[1].text}
            />
          </Grid>
        </Grid>
      </li>
    );
  }
}

Question.propTypes = {
  classes: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired
};

export default withStyles(styles)(Question);
