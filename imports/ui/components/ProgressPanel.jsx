import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import CircularProgressbar from 'react-circular-progressbar';

const styles = theme => ({
  root: {
    position: 'relative'
  },
  container: {
    margin: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  circularProgressbar: {
    width: '75%'
  }
});

function ProgressPanel(props) {
  const { classes, percentage } = props;

  return (
    <div className={classes.root}>
      <Grid item xs={12} className={classes.container}>
        <CircularProgressbar
          percentage={percentage}
          className={classes.circularProgressbar}
        />
      </Grid>
    </div>
  );
}

ProgressPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  percentage: PropTypes.number.isRequired
};

export default withStyles(styles)(ProgressPanel);
