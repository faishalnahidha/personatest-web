import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import CircularProgressbar from 'react-circular-progressbar';

import '../stylesheets/circular-progressbar.css';
import { getFirstName } from '../../lib/get-first-name.js';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    borderRadius: 4,
  },
});

function TestProgressPanel(props) {
  const {
    classes, percentage, name, isTestFinished,
  } = props;

  const percentageCopy = () => {
    if (percentage === 100) {
      return percentage - 1;
    }
    return percentage;
  };

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item xs={6} sm={12} md={12}>
          {name && (
            <Typography variant="body2">
              Hai {getFirstName(name)}!
            </Typography>
          )}
          {isTestFinished && (
            <Typography type="body1">
              Anda telah menyelesaikan tes, <Link to="/daftar">daftar akun</Link> untuk melengkapi{' '}
              <em>progress</em>
            </Typography>
          )}

          {!isTestFinished && (
            <Typography type="body1">
              <em>Progress</em> Anda dalam tes ini adalah:
            </Typography>
          )}
        </Grid>
        <Grid item xs={4} sm={9} md={10}>
          <CircularProgressbar
            className="MyCircularProgressbar"
            percentage={percentageCopy()}
            initialAnimation="true"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

TestProgressPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  percentage: PropTypes.number.isRequired,
  name: PropTypes.string,
  isTestFinished: PropTypes.bool,
};

export default withStyles(styles)(TestProgressPanel);
