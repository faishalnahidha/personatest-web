import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

import { myPrimaryColor } from '../themes/primary-color-palette';

const styles = theme => ({
  questionItem: {
    position: 'relative',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 4,
    // margin: '32px 16px',
  },
  questionBackground: {
    position: 'absolute',
    width: '100%',
    height: 144,
    top: 0,
    left: 0,
    // backgroundColor: myPrimaryColor[400],
  },
  questionForeground: {
    position: 'relative',
    zIndex: 10,
  },
  numberText: {
    fontSize: theme.typography.pxToRem(40),
    fontWeight: theme.typography.fontWeightLight,
    padding: theme.spacing.unit,
    // marginBottom: 0,
    color: 'rgb(0,0,0,.54)',
  },
  questionTextContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  questionText: {
    fontSize: theme.typography.pxToRem(18),
    padding: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 5,
    // color: '#fff',
  },
  answerBoxContainer: {
    // marginTop: theme.spacing.unit * 2, // 16px
    margin: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 5,
    borderRadius: 5,
  },
  answerBox: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#B0BEC5', // blueGrey[500]
    padding: '8px 16px',
  },
  avatar: {
    width: 28,
    height: 28,
  },
});

function QuestionItem(props) {
  const {
    classes, question, updateAnswersToQuestionList, number, index, value,
  } = props;

  const handleChange = (event) => {
    updateAnswersToQuestionList(index, event.target.value);
  };

  const numberText = number < 10 ? `0${number}` : `${number}`;

  return (
    <div>
      <li className={classes.questionItem}>
        {/* <div className={classes.questionBackground} /> */}
        <div className={classes.questionForeground}>
          <Grid container spacing={16} alignItems="center">
            <Grid item xs={3}>
              <Typography align="right" className={classes.numberText}>
                {numberText}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography className={classes.questionText}>{question.text}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={1} sm={3} />
            <Grid item xs={11} sm={9}>
              {/* <Paper className={classes.answerBoxContainer}> */}
              <List dense>
                <ListItem key={question.answer[0].text} value={question.answer[0].value} style={{ padding: '0 24px' }}>
                  {/* <ListItemAvatar>
                    <Avatar className={classnames(classes.avatar)} alt="A">
                      A
                    </Avatar>
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={
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
                    }
                  />
                </ListItem>
                <ListItem key={question.answer[1].text} value={question.answer[1].value} style={{ padding: '0 24px' }}>
                  {/* <ListItemAvatar>
                    <Avatar className={classnames(classes.avatar)} alt="B">
                      B
                    </Avatar>
                  </ListItemAvatar> */}
                  <FormControlLabel
                    control={
                      <Radio
                        checked={value === question.answer[1].value}
                        onChange={handleChange}
                        value={question.answer[1].value}
                        aria-label="B"
                      />
                    }
                    label={question.answer[1].text}
                  />
                  {/* <ListItemText primary={question.answer[1].text} /> */}
                </ListItem>
              </List>
              {/* </Paper> */}
            </Grid>

          </Grid>

        </div>

      </li>
      <Divider />
    </div>
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
