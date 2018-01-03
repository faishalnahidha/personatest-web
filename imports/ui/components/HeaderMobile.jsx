import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';
import Menu from 'material-ui-icons/Menu';

import anime from 'animejs';

const styles = theme => ({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    background: 'linear-gradient(45deg, #7474bf, #348ac7)'
  },
  avatar: {
    width: 32,
    height: 32
  },
  chip: {
    height: 32,
    color: 'fff',
    backgroundColor: 'rgba(255, 255, 255, 0.25)'
  },
  chipLabel: {
    color: '#fff'
  },
  popoverPaper: {
    minWidth: 200
  },
  chipPopover: {
    margin: theme.spacing.unit
  },
  linearProgress: {
    top: 64
  }
});

class HeaderMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openChip: false
    };
  }

  componentDidMount() {
    this.chipPopoverAchorEl = findDOMNode(this.refs.chip);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.score !== this.props.score) {
      // console.log(
      //   `thisPropsScore: ${this.props.score} | nextPropsScore: ${
      //     nextProps.score
      //   }`
      // );
      const animateScore = anime({
        targets: '#animateScore',
        label: nextProps.score,
        round: 1,
        easing: 'easeInOutExpo'
      });
    }
  }

  AvatarChipPopover() {
    const { newPlayerName, score, classes, secondaryAccent } = this.props;

    return (
      <div>
        <Typography
          type="title"
          align="center"
          className={classes.chipPopover}
          style={{ color: secondaryAccent }}
        >
          {newPlayerName}
        </Typography>
        <Divider />
        <Typography type="body1" align="center" className={classes.chipPopover}>
          Skor : {score}
        </Typography>
      </div>
    );
  }

  render() {
    const { classes, newPlayerName, score, secondaryAccent } = this.props;
    const avatarLetter = newPlayerName.charAt(0);

    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="contrast"
            aria-label="Menu"
          >
            <Menu />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Persona Test
          </Typography>
          {newPlayerName === ' ' ? (
            <CircularProgress color="accent" size={32} />
          ) : (
            <Chip
              ref="chip"
              id="animateScore"
              className={classes.chip}
              classes={{ label: classes.chipLabel }}
              avatar={
                <Avatar
                  className={classes.avatar}
                  style={{ backgroundColor: secondaryAccent }}
                >
                  {avatarLetter}
                </Avatar>
              }
              label={this.props.score}
              onClick={() => this.setState({ openChip: true })}
            />
          )}
          <Popover
            open={this.state.openChip}
            anchorEl={this.chipPopoverAchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={() => this.setState({ openChip: false })}
            classes={{ paper: classes.popoverPaper }}
          >
            {this.AvatarChipPopover()}
          </Popover>
        </Toolbar>
      </AppBar>
    );
  }
}

HeaderMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  newPlayerName: PropTypes.string,
  score: PropTypes.number,
  secondaryAccent: PropTypes.string
};

export default withStyles(styles)(HeaderMobile);
