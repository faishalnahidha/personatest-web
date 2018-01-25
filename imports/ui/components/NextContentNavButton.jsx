import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ArrowForward from 'material-ui-icons/ArrowForward';
import ArrowBack from 'material-ui-icons/ArrowBack';

const styles = theme => ({
  button: {
    width: '100%',
    padding: theme.spacing.unit * 2,
    color: 'fff',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  transparentText: {
    color: 'rgba(255,255,255,0.66)',
  },
  whiteText: {
    color: '#fff',
  },
  arrow: {
    paddingTop: 20,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: '#fff',
    float: 'right',
  },
});

function NextContentNavButton(props) {
  const { classes, nextContentTitle, nextContentRoute } = props;

  return (
    <ButtonBase
      focusRipple
      key="next"
      className={classes.button}
      component={Link}
      to={`/artikel/${nextContentRoute}`}
    >
      <div>
        <Typography type="body1" align="right" gutterBottom className={classes.transparentText}>
          Berikutnya
        </Typography>
        <Typography type="title" align="right" gutterBottom className={classes.whiteText}>
          {nextContentTitle}
        </Typography>
      </div>
      <div className={classes.arrow}>
        <ArrowForward />
      </div>
    </ButtonBase>
  );
}

NextContentNavButton.propTypes = {
  classes: PropTypes.object,
  nextContentTitle: PropTypes.string,
  nextContentRoute: PropTypes.string,
};

export default withStyles(styles)(NextContentNavButton);
