import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import ArrowBack from '@material-ui/icons/ArrowBack';

import { myPrimaryColor } from '../themes/primary-color-palette';

const styles = theme => ({
  button: {
    width: '100%',
    padding: theme.spacing.unit * 2,
    color: 'fff',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  transparentText: {
    color: myPrimaryColor.A200,
  },
  titleText: {
    color: myPrimaryColor[600],
  },
  icon: {
    float: 'left',
  },
  arrow: {
    paddingTop: 20,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: myPrimaryColor[500],
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
        <Typography variant="body1" className={classes.transparentText}>
          Sebelumnya
        </Typography>
        <Typography variant="subheading" gutterBottom className={classes.titleText}>
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
