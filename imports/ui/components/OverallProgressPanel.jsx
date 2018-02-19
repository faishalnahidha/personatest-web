import React from 'react';
import PropTypes from 'prop-types';

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

function OverallProgressPanel(props) {
  const { classes, percentage, name } = props;

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item xs={6} sm={12} md={12}>
          {name && (
            <Typography type="headline" align="center" gutterBottom>
              Hai {getFirstName(name)}!
            </Typography>
          )}
          <Typography type="caption" align="center">
            <em>Progress </em> keseluruhan Anda di Persona Web
          </Typography>
        </Grid>
        <Grid item xs={4} sm={9} md={10}>
          <CircularProgressbar
            className="MyCircularProgressbar"
            percentage={percentage}
            initialAnimation="true"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

OverallProgressPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  percentage: PropTypes.number.isRequired,
  name: PropTypes.string,
};

export default withStyles(styles)(OverallProgressPanel);
