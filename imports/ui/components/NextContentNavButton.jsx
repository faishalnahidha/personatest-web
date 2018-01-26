import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import ArrowForward from 'material-ui-icons/ArrowForward';

import { myPrimaryColor } from '../themes/primary-color-palette';

const styles = theme => ({
  button: {
    width: '100%',
    padding: theme.spacing.unit * 2,
    color: 'fff',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  transparentText: {
    color: myPrimaryColor[300],
  },
  whiteText: {
    color: myPrimaryColor[500],
  },
  arrow: {
    paddingTop: 20,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: myPrimaryColor[500],
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
