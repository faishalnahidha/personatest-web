import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { findDOMNode } from 'react-dom';
import Session from 'meteor/session';

import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Divider from 'material-ui/Divider';
import Menu, { MenuItem } from 'material-ui/Menu';
import { CircularProgress } from 'material-ui/Progress';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { blueGrey } from 'material-ui/colors';

import anime from 'animejs';

import { drawerWidth } from '../components/MenuDrawer.jsx';
import { mySecondaryColor } from '../themes/secondary-color-palette';
import LoginDialog from '../components/LoginDialog.jsx';

const styles = theme => ({
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  rightButton: {
    marginRight: -12,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    background: 'linear-gradient(90deg, rgba(116,116,191,1), rgba(52,138,199,1))',
    transition: theme.transitions.create(['margin', 'width', 'box-shadow'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarTop: {
    boxShadow: 'none',
  },
  appBarDown: {},
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
  avatar: {
    width: 32,
    height: 32,
    fontSize: 15,
    color: blueGrey[800],
    backgroundColor: mySecondaryColor.A700,
  },
  avatarMasuk: {
    width: 32,
    height: 32,
  },
  chip: {
    height: 32,
    color: 'fff',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  chipLabel: {
    color: '#fff',
  },
  popoverPaper: {
    minWidth: 200,
  },
  chipPopover: {
    margin: theme.spacing.unit,
  },
  linearProgress: {
    top: 64,
  },
});

const avatarDefaultImagePath = '/img/avatar/';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openChip: false,
      isScroll: false,
      anchorElUserMenu: null,
      isUserMenuOpen: false,
      isLoginDialogOpen: false,
    };
  }

  componentDidMount() {
    this.chipPopoverAchorEl = this.chip;
    document.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.score !== this.props.score) {
  //     const animateScore = anime({
  //       targets: '#animateScore',
  //       label: nextProps.score,
  //       round: 1,
  //       easing: 'easeInOutExpo',
  //     });
  //   }
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('scroll', () => {
  //     this.handleScroll();
  //   });
  // }

  handleScroll() {
    const isScroll = window.scrollY > 50;
    if (isScroll !== this.state.isTop) {
      this.setState({ isScroll });
    }
  }

  handleUserMenuOpen = (event) => {
    this.setState({ anchorElUserMenu: event.currentTarget, isUserMenuOpen: true });
  };

  handleUserMenuClose = () => {
    this.setState({ anchorElUserMenu: null, isUserMenuOpen: false });
  };

  handleLoginDialogOpen = () => {
    if (this.state.isUserMenuOpen) {
      this.setState({ isUserMenuOpen: false });
    }
    this.setState({ isLoginDialogOpen: true });
  };

  handleLoginDialogClose = () => {
    this.setState({ isLoginDialogOpen: false });
  };

  handleUserLogout = () => {
    if (this.state.isUserMenuOpen) {
      this.setState({ isUserMenuOpen: false });
    }
    Meteor.logout();
  };

  AvatarChipPopover = () => (
    <div>
      <Typography
        type="title"
        align="center"
        className={this.props.classes.chipPopover}
        style={{ color: this.props.secondaryAccent }}
      >
        {this.props.newPlayerName}
      </Typography>
      <Divider />
      <Typography type="body1" align="center" className={this.props.classes.chipPopover}>
        Skor : {this.props.score}
      </Typography>
    </div>
  );

  renderRightIcon() {
    const { newPlayerName, classes, secondaryAccent } = this.props;

    if (newPlayerName === undefined) {
      return '';
    } else if (newPlayerName === ' ') {
      return <CircularProgress color="accent" size={32} />;
    }
    const avatarLetter = newPlayerName.charAt(0);

    return (
      <Chip
        ref={(node) => {
          this.chip = node;
        }}
        id="animateScore"
        className={classes.chip}
        classes={{ label: classes.chipLabel }}
        avatar={
          <Avatar className={classes.avatar} style={{ backgroundColor: secondaryAccent }}>
            {avatarLetter}
          </Avatar>
        }
        label={this.props.score}
        onClick={() => this.setState({ openChip: true })}
      />
    );
  }

  renderRightComponents() {
    const { user, newPlayerName, classes } = this.props;
    const { isUserMenuOpen, anchorElUserMenu } = this.state;

    if (user) {
      /* Icon dan menu saat user SUDAH login */
      const avatarFileName = `mbti-avatar-${user.profile.personalityType.toLowerCase()}.png`;
      return (
        <div>
          <IconButton
            aria-owns={isUserMenuOpen ? 'user-menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleUserMenuOpen}
          >
            <Avatar
              alt={user.username}
              src={`${avatarDefaultImagePath}${avatarFileName}`}
              className={classes.avatarMasuk}
            />
          </IconButton>
          <Menu
            id="user-menu-appbar"
            anchorEl={anchorElUserMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isUserMenuOpen}
            onClose={this.handleUserMenuClose}
          >
            <MenuItem onClick={this.handleUserMenuClose}>Profil</MenuItem>
            <MenuItem onClick={this.handleUserLogout}>Keluar</MenuItem>
          </Menu>
        </div>
      );
    } else if (!user && newPlayerName) {
      /* Icon dan menu saat user BELUM DAFTAR dan sudah/sedang mengerjakan tes (temp user) */
      const avatarLetter = newPlayerName.charAt(0);
      return (
        <div>
          <IconButton>
            <Avatar className={classes.avatar}>{avatarLetter}</Avatar>
          </IconButton>
        </div>
      );
    }

    return (
      /* Icon dan menu saat user BELUM login */
      <div>
        <Hidden mdUp>
          <IconButton
            aria-owns={isUserMenuOpen ? 'user-menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleUserMenuOpen}
            className={classes.rightButton}
          >
            <AccountCircle color="contrast" />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <Button
            color="contrast"
            onClick={this.handleLoginDialogOpen}
            className={classes.rightButton}
          >
            Masuk
          </Button>
        </Hidden>
        <Menu
          id="user-menu-appbar"
          anchorEl={anchorElUserMenu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isUserMenuOpen}
          onClose={this.handleUserMenuClose}
        >
          <MenuItem onClick={this.handleLoginDialogOpen}>Masuk</MenuItem>
        </Menu>
      </div>
    );
  }

  render() {
    const {
      classes, headerTitle, isDrawerOpen, handleDrawerOpen,
    } = this.props;
    const { isScroll, isLoginDialogOpen } = this.state;
    // const avatarLetter = newPlayerName ? newPlayerName.charAt(0) : ' ';

    return (
      <div>
        <AppBar
          className={classnames(classes.appBar, {
            [classes.appBarTop]: !isScroll,
            [classes.appBarDown]: isScroll,
            [classes.appBarShift]: isDrawerOpen,
          })}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classnames(classes.menuButton, isDrawerOpen && classes.hide)}
              color="contrast"
              aria-label="Menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {headerTitle}
            </Typography>
            {/* {this.renderRightIcon()} */}
            {this.renderRightComponents()}

            <Popover
              open={this.state.openChip}
              anchorEl={this.chipPopoverAchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              onClose={() => this.setState({ openChip: false })}
              classes={{ paper: classes.popoverPaper }}
            >
              <this.AvatarChipPopover />
            </Popover>
          </Toolbar>
        </AppBar>
        <LoginDialog
          isLoginDialogOpen={isLoginDialogOpen}
          handleLoginDialogOpen={this.handleLoginDialogOpen}
          handleLoginDialogClose={this.handleLoginDialogClose}
        />
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  headerTitle: PropTypes.string.isRequired,
  user: PropTypes.object,
  newPlayerName: PropTypes.string,
  score: PropTypes.number,
  secondaryAccent: PropTypes.string,
  isDrawerOpen: PropTypes.bool,
  handleDrawerOpen: PropTypes.func,
};

export default withStyles(styles)(Header);
