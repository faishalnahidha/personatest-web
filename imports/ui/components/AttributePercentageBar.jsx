import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Line } from 'rc-progress';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    width: '100%',
  },
  lineContainer: {
    position: 'relative',
    color: '#fff',
    fontSize: 12,
  },
  lineLabel: {
    position: 'absolute',
    top: '50%',
    marginTop: -7,
    left: 12,
    right: 12,
  },
  labelContainer: {
    marginBottom: 16,
    paddingLeft: 4,
    paddingRight: 4,
  },
  leftLabel: {
    float: 'left',
  },
  rightLabel: {
    float: 'right',
  },
  bar: {
    borderRadius: 16,
  },
  rotatedBar: {
    transform: 'rotate(180deg)',
  },
};

class AttributePercentageBar extends Component {
  percentage() {
    const { leftPercent, rightPercent } = this.props;
    if (leftPercent >= rightPercent) {
      return leftPercent;
    }
    return rightPercent;
  }

  render() {
    const {
      classes, leftPercent, rightPercent, leftAttribute, rightAttribute,
    } = this.props;

    const rotate = rightPercent > leftPercent;
    return (
      <div className={classes.root}>
        <div className={classes.lineContainer}>
          <Line
            percent={this.percentage()}
            strokeWidth="12"
            strokeColor="#7474bf"
            trailWidth="12"
            strokeLinecap="butt"
            className={classnames(classes.bar, { [classes.rotatedBar]: rotate })}
          />
          <div className={classes.lineLabel}>
            <span style={{ float: 'left' }}>{`${leftPercent}%`}</span>
            <span style={{ float: 'right' }}>{`${rightPercent}%`}</span>
          </div>
        </div>
        <div className={classes.labelContainer}>
          <Typography variant="caption" align="left" className={classes.leftLabel}>
            {leftAttribute}
          </Typography>
          <Typography variant="caption" align="right" className={classes.rightLabel}>
            {rightAttribute}
          </Typography>
        </div>
      </div>
    );
  }
}

AttributePercentageBar.propTypes = {
  classes: PropTypes.object.isRequired,
  leftPercent: PropTypes.number.isRequired,
  rightPercent: PropTypes.number.isRequired,
  leftAttribute: PropTypes.string.isRequired,
  rightAttribute: PropTypes.string.isRequired,
};

export default withStyles(styles)(AttributePercentageBar);
