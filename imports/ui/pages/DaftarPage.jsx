import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/Menu/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import { grey } from 'material-ui/colors';
import ArrowBack from 'material-ui-icons/ArrowBack';

// import { myPrimaryColor } from '../themes/primary-color-palette';
import { registerPoint } from '../../lib/points-const';

const styles = theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: grey[100],
    // background: 'linear-gradient(240deg,  #7474bf, #348ac7, #44449B)'
    overflowY: 'auto',
  },
  background: {
    zIndex: -10,
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundPosition: 'center',
    backgroundImage: 'url("/img/login-bg-kraken.jpg")',
    backgroundAttachment: 'fixed',

    [theme.breakpoints.up('md')]: {
      backgroundSize: '100% auto',
    },
    [theme.breakpoints.down('sm')]: {
      backgroundSize: 'auto 100%',
    },
  },
  paper: {
    overflowY: 'hidden',
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,.75)',
    margin: theme.spacing.unit * 2,
  },
  paperContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  leftContentContainer: {
    position: 'relative',
    backgroundSize: 'auto',
    backgroundPosition: 'left',
    backgroundImage: 'url("/img/login-bg-kraken.jpg")',
    backgroundAttachment: 'fixed',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 6,
      height: 600,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 3,
      height: 'auto',
    },
  },
  leftContent: {
    zIndex: 2,
  },
  rightContentContainer: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      height: 600,
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  formContainer: {
    justifyContent: 'center',

    [theme.breakpoints.up('lg')]: {
      height: '100%',
      margin: '0 96px',
    },
    [theme.breakpoints.down('md')]: {
      height: '100%',
      margin: '0 80px',
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit * 4,
    },
  },
  overlay: {
    height: '100%',
    width: '100%',
    background: 'linear-gradient(30deg, rgba(116,116,191,1), rgba(52,138,199,.75))',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlayBackground: {
    height: '100%',
    width: '100%',
    background: 'linear-gradient(30deg, rgba(255,255,255,.92), rgba(255,255,255,.66))',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -9,
  },
  button: {
    width: '100%',
    marginTop: theme.spacing.unit * 4,
    background: 'linear-gradient(90deg, #7474bf, #348ac7)',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    color: '#fff',
  },
  displayText: {
    fontWeight: 100,
    [theme.breakpoints.up('md')]: {
      fontSize: 45,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 34,
    },
  },
  whiteText: {
    color: '#fff',
  },
  leftContentParagraph: {
    fontWeight: 300,
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 2,
      width: '66%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit,
      width: '100%',
    },
  },
  divider: {
    margin: '16px 0',
  },
  menu: {
    width: 200,
  },
});

const personalityTypes = [
  {
    value: 'ESTJ',
    label: 'The Supervisor (ESTJ)',
  },
  {
    value: 'ISTJ',
    label: 'The Inspector (ISTJ)',
  },
  {
    value: 'ESFJ',
    label: 'The Provider (ESFJ)',
  },
  {
    value: 'ISFJ',
    label: 'The Protector (ISFJ)',
  },
  {
    value: 'ESTP',
    label: 'The Promoter (ESTP)',
  },
  {
    value: 'ISTP',
    label: 'The Crafter (ISTP)',
  },
  {
    value: 'ESFP',
    label: 'The Performer (ESFP)',
  },
  {
    value: 'ISFP',
    label: 'The Composer (ISFP)',
  },
  {
    value: 'ENTJ',
    label: 'The Commander (ENTJ)',
  },
  {
    value: 'INTJ',
    label: 'The Mastermind (INTJ)',
  },
  {
    value: 'ENTP',
    label: 'The Inventor (ENTP)',
  },
  {
    value: 'INTP',
    label: 'The Thinker (INTP)',
  },
  {
    value: 'ENFJ',
    label: 'The Mentor (ENFJ)',
  },
  {
    value: 'INFJ',
    label: 'The Counselor (INFJ)',
  },
  {
    value: 'ENFP',
    label: 'The Champion (ENFP)',
  },
  {
    value: 'INFP',
    label: 'The Dreamer (INFP)',
  },
];

const DAFTAR_POINT = registerPoint;

class DaftarPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null,
      redirect: false,
      username: '',
      name: '',
      personalityType: '',
      isSnackbarOpen: false,
    };

    this.newPlayerInitialized = false;
  }

  componentWillReceiveProps(nextProps) {
    const { newPlayer } = nextProps;
    if (!this.newPlayerInitialized && nextProps.newPlayerExists) {
      const autoUsername = newPlayer.name.replace(/\s/g, '').toLowerCase();

      this.setState({
        username: autoUsername,
        name: newPlayer.name,
        personalityType: newPlayer.result.type,
      });
      this.newPlayerInitialized = true;
    }
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmitDaftar = (event) => {
    event.preventDefault();

    const username = this.state.username.trim();
    const email = this.emailDaftar.value;
    const password = this.passwordDaftar.value;
    const confirmPassword = this.konfirmasiPasswordDaftar.value;
    const name = this.state.name.trim();
    const personalityType = this.state.personalityType.toUpperCase();

    const testResult = Object.assign(this.props.newPlayer.result);
    const score = this.props.newPlayer.score + DAFTAR_POINT;

    this.setState({ errors: 'test' });

    if (password === confirmPassword) {
      Accounts.createUser(
        {
          email,
          username,
          password,
          name,
          personalityType,
          score,
          testResult,
        },
        (err) => {
          if (err) {
            this.setState({
              errors: err.reason,
              isSnackbarOpen: true,
            });
            console.log(err.reason);
          } else {
            Session.setPersistent('justRegister', true);
            this.setState({
              redirect: true,
            });
            // this.props.history.go(-1);
          }
        },
      );
    }

    if (password !== confirmPassword) {
      this.setState({ errors: 'Password tidak sama' });
      this.setState({ isSnackbarOpen: true });
    }
  };

  handleBackButton = () => {
    this.props.history.go(-1);
  };

  render() {
    const { classes } = this.props;
    const {
      errors, redirect, personalityType, isSnackbarOpen,
    } = this.state;

    if (redirect) {
      return <Redirect to={`/artikel/${personalityType.toLowerCase()}`} />;
    }

    return (
      <div className={classes.root}>
        <div className={classes.background} />
        <div className={classes.overlayBackground} />
        <Grid container spacing={0} justify="center" alignItems="center">
          <Grid item xs={11} sm={6} md={11} lg={10} xl={7}>
            <Paper className={classes.paper}>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={7}
                  className={classnames(
                    classes.paperContentContainer,
                    classes.leftContentContainer,
                  )}
                >
                  <div className={classes.overlay} />
                  <div className={classes.leftContent}>
                    <Hidden smDown>
                      <IconButton
                        className={classes.backButton}
                        aria-label="Back to previous page"
                        onClick={this.handleBackButton}
                      >
                        <ArrowBack />
                      </IconButton>
                    </Hidden>
                    <Typography className={classnames(classes.displayText, classes.whiteText)}>
                      Kenali Dirimu
                    </Typography>
                    <Hidden smUp>
                      <Typography
                        type="body1"
                        gutterBottom
                        className={classnames(classes.whiteText, classes.rightContentParagraph)}
                      >
                        Temukan kepribadian, potensi, dan bakat alami Anda sekarang.
                      </Typography>
                    </Hidden>
                    <Hidden xsDown>
                      <Typography
                        type="body1"
                        style={{ marginTop: 16 }}
                        gutterBottom
                        className={classnames(classes.whiteText, classes.leftContentParagraph)}
                      >
                        Bergabunglah dengan Persona yang akan memandu Anda dalam menemukan
                        kepribadian, potensi, dan bakat alami Anda. Segera kenali diri Anda dan
                        perjuangkan hidup Anda sekarang!
                      </Typography>
                    </Hidden>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={5}
                  className={classnames(
                    classes.rightContentContainer,
                    classes.paperContentContainer,
                  )}
                >
                  <div className={classes.tabContainer}>
                    <form
                      onSubmit={this.handleSubmitDaftar}
                      className={classnames(classes.formContainer, classes.paperContentContainer)}
                    >
                      <TextField
                        id="username-daftar"
                        required
                        fullWidth
                        type="text"
                        label="Username"
                        margin="dense"
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                      />
                      <TextField
                        id="email-daftar"
                        required
                        fullWidth
                        type="email"
                        label="Email"
                        margin="dense"
                        inputRef={(c) => {
                          this.emailDaftar = c;
                        }}
                      />
                      <TextField
                        id="password-daftar"
                        required
                        fullWidth
                        type="password"
                        label="Password"
                        margin="dense"
                        inputRef={(c) => {
                          this.passwordDaftar = c;
                        }}
                      />
                      <TextField
                        id="confirm-password-daftar"
                        required
                        fullWidth
                        type="password"
                        label="Konfirmasi Password"
                        margin="dense"
                        inputRef={(c) => {
                          this.konfirmasiPasswordDaftar = c;
                        }}
                      />
                      <br />
                      <TextField
                        id="name-daftar"
                        required
                        fullWidth
                        type="text"
                        label="Nama Lengkap"
                        margin="dense"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                      />
                      <TextField
                        id="personality-type-daftar"
                        required
                        select
                        fullWidth
                        label="Tipe Kepribadian"
                        value={this.state.personalityType}
                        onChange={this.handleChange('personalityType')}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu,
                          },
                        }}
                        helperText={
                          <Typography type="caption">
                            Belum tahu tipe kepribadian anda? Klik <a href="/mulai-tes">di sini</a>{' '}
                          </Typography>
                        }
                        margin="dense"
                      >
                        {personalityTypes.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>

                      <Button
                        raised
                        className={classes.button}
                        color="primary"
                        type="submit"
                        value="Submit"
                      >
                        Daftar
                      </Button>
                    </form>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={() => this.setState({ isSnackbarOpen: false })}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.errors}</span>}
        />
      </div>
    );
  }
}

DaftarPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  // loading: PropTypes.bool.isRequired,
  newPlayerExists: PropTypes.bool.isRequired,
  newPlayer: PropTypes.object,
};

export default withStyles(styles)(DaftarPage);
