import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import CircularProgressbar from 'react-circular-progressbar';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group/';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  }
});

function TestProgressPanel(props) {
  const { classes, percentage, name } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item xs={6} sm={4} md={10}>
          <Typography type="headline" align="center">
            Hai {name}!
          </Typography>
          <Typography type="caption" align="center">
            <i>Progress</i> anda di tes ini adalah:
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2} md={10}>
          <CircularProgressbar
            className="MyCircularProgressbar"
            percentage={percentage}
            initialAnimation="true"
          />
        </Grid>
      </Grid>
    </div>
  );
}

TestProgressPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  percentage: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(styles)(TestProgressPanel);
