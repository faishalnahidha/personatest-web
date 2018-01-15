import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import Tooltip from 'material-ui/Tooltip';

import AttributePercentageBar from '../components/AttributePercentageBar.jsx';

import { getFirstName } from '../../lib/get-first-name.js';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    borderRadius: 4,
  },
  headContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  barContainer: {},
  bar: {
    margin: '8px 0',
  },
  personalityText: {
    color: 'rgba(0,0,0,0.87)',
  },
  divider: {
    margin: '16px -16px',
  },
  avatar: {
    width: 56,
    height: 56,
  },
});

class TestResultPanel extends Component {
  personalityColorTypeText() {
    const { personalityColorType } = this.props;

    if (personalityColorType === 'SJ') {
      return 'GOLD [SJ]';
    } else if (personalityColorType === 'SP') {
      return 'RED [SP]';
    } else if (personalityColorType === 'NT') {
      return 'BLUE [NT]';
    } else if (personalityColorType === 'NF') {
      return 'GREEN [NF]';
    }

    return null;
  }

  render() {
    const {
      classes, result, playerName, personalityType,
    } = this.props;
    return (
      <Paper className={classes.paper}>
        <Grid container spacing={0} justify="space-around" alignItems="center">
          <Grid item xs={12} className={classes.headContainer}>
            <Grid container spacing={0} justify="center">
              <Avatar className={classes.avatar}>S</Avatar>
              <Grid item xs={12} style={{ marginTop: 8 }}>
                <Tooltip id="tooltip-personality" title="Tipe Kepribadian" placement="right">
                  <Typography type="body2" align="center">
                    {personalityType.toUpperCase()}
                  </Typography>
                </Tooltip>
                <Typography type="caption" align="center">
                  Warna kepribadian: {this.personalityColorTypeText()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} sm={10} md={12} className={classes.barContainer}>
            <Grid container spacing={0}>
              <Grid item xs={12} className={classes.bar}>
                <AttributePercentageBar
                  leftPercent={result.extrovert}
                  rightPercent={result.introvert}
                  leftAttribute="Extroverted"
                  rightAttribute="Introverted"
                />
              </Grid>
              <Grid item xs={12} className={classes.bar}>
                <AttributePercentageBar
                  leftPercent={result.sensory}
                  rightPercent={result.intuitive}
                  leftAttribute="Sensory"
                  rightAttribute="Intuitive"
                />
              </Grid>
              <Grid item xs={12} className={classes.bar}>
                <AttributePercentageBar
                  leftPercent={result.thinking}
                  rightPercent={result.feeling}
                  leftAttribute="Thinking"
                  rightAttribute="Feeling"
                />
              </Grid>
              <Grid item xs={12} className={classes.bar}>
                <AttributePercentageBar
                  leftPercent={result.judging}
                  rightPercent={result.perceiving}
                  leftAttribute="Judging"
                  rightAttribute="Perceiving"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

TestResultPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  result: PropTypes.object.isRequired,
  playerName: PropTypes.string.isRequired,
  personalityType: PropTypes.string,
  personalityColorType: PropTypes.string,
};

export default withStyles(styles)(TestResultPanel);
