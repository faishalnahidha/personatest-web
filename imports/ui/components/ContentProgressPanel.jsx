import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import CircularProgressbar from 'react-circular-progressbar';
import { Line, Circle } from 'rc-progress';

import '../stylesheets/circular-progressbar.css';
import { myPrimaryColor } from '../themes/primary-color-palette';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    borderRadius: 4,
  },
  percentageNumber: {
    fontWeight: theme.typography.fontWeightMedium,
    color: myPrimaryColor[500],
  },
});

function ContentProgressPanel(props) {
  const {
    classes, testPercentage, publicContentPercentage, privateContentPercentage,
  } = props;

  const strokeColor = myPrimaryColor[500];

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={24}>
        <Grid item xs={6} sm={12} md={12}>
          <Typography type="body2" align="center">
            Detil <em>Progress</em> Anda
          </Typography>
        </Grid>
        <Grid item xs={6} sm={12} md={12}>
          <Typography type="body1">
            Persona Test&nbsp; <span className={classes.percentageNumber}>{testPercentage}%</span>
          </Typography>
          <Line percent={testPercentage} strokeWidth="6" strokeColor={strokeColor} trailWidth="6" />
        </Grid>

        <Grid item xs={6} sm={12} md={12}>
          <Typography type="body1">
            Profil Khusus&nbsp;{' '}
            <span className={classes.percentageNumber}>{privateContentPercentage}%</span>
          </Typography>
          <Line
            percent={privateContentPercentage}
            strokeWidth="6"
            strokeColor={strokeColor}
            trailWidth="6"
          />
        </Grid>

        <Grid item xs={6} sm={12} md={12}>
          <Typography type="body1">
            Artikel Umum&nbsp;{' '}
            <span className={classes.percentageNumber}>{publicContentPercentage}%</span>
          </Typography>
          <Line
            percent={publicContentPercentage}
            strokeWidth="6"
            strokeColor={strokeColor}
            trailWidth="6"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

ContentProgressPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  testPercentage: PropTypes.number,
  publicContentPercentage: PropTypes.number,
  privateContentPercentage: PropTypes.number,
};

export default withStyles(styles)(ContentProgressPanel);
