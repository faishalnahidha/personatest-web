import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Tooltip from 'material-ui/Tooltip';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { grey } from 'material-ui/colors';
import Face from 'material-ui-icons/Face';

// import anime from 'animejs';

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
    color: '#348AC7',
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
  score: {
    fontSize: 13,
    letterSpacing: 1,
    padding: '4px 8px',
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,.25)',
    userSelect: 'none',
    [theme.breakpoints.up('sm')]: {
      marginRight: 4,
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
});

const LoginIcon = () => (
  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
    <path
      fill={grey[600]}
      d="M19,3H5C3.89,3 3,3.89 3,5V9H5V5H19V19H5V15H3V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M10.08,15.58L11.5,17L16.5,12L11.5,7L10.08,8.41L12.67,11H3V13H12.67L10.08,15.58Z"
    />
  </svg>
);
const LogoutIcon = () => (
  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
    <path
      fill={grey[600]}
      d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z"
    />
  </svg>
);

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isScroll: false,
      anchorElUserMenu: null,
      isUserMenuOpen: false,
      isLoginDialogOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      this.handleScroll();
    });
  }

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
    // this.props.history.push('/');
    // return <Redirect to="/" push />;
  };

  UserMenu = (props) => {
    const { isUserMenuOpen, anchorElUserMenu } = this.state;
    return (
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
        {props.children}
      </Menu>
    );
  };

  renderRightComponents() {
    const { currentUser, newPlayer, classes } = this.props;
    const { isUserMenuOpen, anchorElUserMenu } = this.state;

    if (currentUser) {
      /* Icon dan menu saat user SUDAH login */
      return (
        <div>
          <Tooltip id="tooltip-skor" title="Skor Anda">
            <span className={classes.score}>
              {currentUser.gameProfile ? currentUser.gameProfile.score : 0}
            </span>
          </Tooltip>
          <IconButton
            aria-owns={isUserMenuOpen ? 'user-menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleUserMenuOpen}
          >
            <Avatar
              alt={currentUser.username}
              src={currentUser.profile.profilePicture}
              className={classes.avatarMasuk}
            >
              {!currentUser.profile.profilePicture && currentUser.username.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
          <this.UserMenu>
            {/* <MenuItem onClick={this.handleUserMenuClose}>
              <ListItemIcon>
                <Face style={{ marginRight: 0 }} />
              </ListItemIcon>
              <ListItemText inset primary="Profil" />
            </MenuItem> */}
            <MenuItem onClick={this.handleUserLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText inset primary="Keluar" />
            </MenuItem>
          </this.UserMenu>
        </div>
      );
    } else if (!currentUser && newPlayer) {
      /* Icon dan menu saat user BELUM DAFTAR dan sudah/sedang
         mengerjakan tes (temporary user/newPlayer) */
      const avatarLetter = newPlayer.name ? newPlayer.name.charAt(0) : ' ';
      return (
        <div>
          <Tooltip id="tooltip-skor" title="Skor Anda">
            <span className={classes.score}>{newPlayer.score || 0}</span>
          </Tooltip>
          <IconButton
            aria-owns={isUserMenuOpen ? 'user-menu-appbar' : null}
            aria-haspopup="true"
            onClick={this.handleUserMenuOpen}
          >
            <Avatar className={classes.avatar}>{avatarLetter}</Avatar>
          </IconButton>
          <this.UserMenu>
            <MenuItem onClick={this.handleLoginDialogOpen}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText inset primary="Masuk" />
            </MenuItem>
          </this.UserMenu>
        </div>
      );
    }
    /* Icon dan menu saat user BELUM login */
    return (
      <div>
        <Hidden mdUp>
          <IconButton
            aria-owns={isUserMenuOpen ? 'user-menu-appbar' : null}
            aria-haspopup="true"
            color="inherit"
            onClick={this.handleUserMenuOpen}
            className={classes.rightButton}
          >
            <AccountCircle />
          </IconButton>
        </Hidden>
        <Hidden smDown>
          <Button
            color="inherit"
            onClick={this.handleLoginDialogOpen}
            className={classes.rightButton}
          >
            Masuk
          </Button>
        </Hidden>
        <this.UserMenu
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
          <MenuItem onClick={this.handleLoginDialogOpen}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText inset primary="Masuk" />
          </MenuItem>
        </this.UserMenu>
      </div>
    );
  }

  render() {
    const {
      classes, headerTitle, isDrawerOpen, handleDrawerOpen,
    } = this.props;
    const { isScroll, isLoginDialogOpen } = this.state;

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
              color="inherit"
              aria-label="Menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              {headerTitle}
            </Typography>
            {this.renderRightComponents()}
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
  currentUser: PropTypes.object,
  newPlayer: PropTypes.object,
  isDrawerOpen: PropTypes.bool,
  handleDrawerOpen: PropTypes.func,
};

export default withStyles(styles)(Header);
