import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

const styles = theme => ({
  questionItem: {
    margin: '32px 16px',
  },
  answerBoxContainer: {
    marginTop: theme.spacing.unit * 2, // 16px
  },
  answerBox: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#B0BEC5', // blueGrey[500]
    padding: '8px 16px',
  },
});

function QuestionItem(props) {
  const {
    classes, question, updateAnswersToQuestionList, number, index, value,
  } = props;

  const handleChange = (event) => {
    updateAnswersToQuestionList(index, event.target.value);
  };

  return (
    <li className={classes.questionItem}>
      <Typography type="subheading">
        &nbsp;{number}. {question.text}
      </Typography>
      <Grid container className={classes.answerBoxContainer} spacing={0}>
        <Grid item xs={12} sm={6} className={classes.answerBox}>
          <FormControlLabel
            control={
              <Radio
                checked={value === question.answer[0].value}
                onChange={handleChange}
                value={question.answer[0].value}
                aria-label="A"
              />
            }
            label={question.answer[0].text}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.answerBox}>
          <FormControlLabel
            control={
              <Radio
                checked={value === question.answer[1].value}
                onChange={handleChange.bind(this)}
                value={question.answer[1].value}
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

QuestionItem.propTypes = {
  classes: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  number: PropTypes.number,
  index: PropTypes.number,
  value: PropTypes.string,
  updateAnswersToQuestionList: PropTypes.func,
};

export default withStyles(styles)(QuestionItem);
