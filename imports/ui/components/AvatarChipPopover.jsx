import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  }
});

function AvatarChipPopover(props) {
  const { classes, name, score } = props;

  return (
    <div>
      <Typography type="body2" align="center" className={classes.typography}>
        {name}
      </Typography>
      <Divider />
      <Typography align="center" className={classes.typography}>
        skor: {score}
      </Typography>
    </div>
  );
}

AvatarChipPopover.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
};

export default withStyles(styles)(AvatarChipPopover);
