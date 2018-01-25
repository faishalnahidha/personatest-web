import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import ArrowBack from 'material-ui-icons/ArrowBack';

const styles = theme => ({
  button: {
    width: '100%',
    padding: theme.spacing.unit * 2,
    color: 'fff',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  transparentText: {
    color: 'rgba(255,255,255,0.66)',
  },
  whiteText: {
    color: '#fff',
  },
  icon: {
    float: 'left',
  },
  arrow: {
    paddingTop: 20,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: '#fff',
    float: 'left',
  },
});

function PrevContentNavButton(props) {
  const { classes, prevContentTitle, prevContentRoute } = props;

  return (
    <ButtonBase
      focusRipple
      key="prev"
      className={classes.button}
      component={Link}
      to={`/artikel/${prevContentRoute}`}
    >
      <div className={classes.arrow}>
        <ArrowBack />
      </div>
      <div>
        <Typography type="body1" gutterBottom className={classes.transparentText}>
          Sebelumnya
        </Typography>
        <Typography type="title" gutterBottom className={classes.whiteText}>
          {prevContentTitle}
        </Typography>
      </div>
    </ButtonBase>
  );
}

PrevContentNavButton.propTypes = {
  classes: PropTypes.object,
  prevContentTitle: PropTypes.string,
  prevContentRoute: PropTypes.string,
};

export default withStyles(styles)(PrevContentNavButton);
