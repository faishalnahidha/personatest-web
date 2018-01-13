import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router';
import classnames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Tabs, { Tab } from 'material-ui/Tabs';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
// import {
//   FormLabel,
//   FormControl,
//   FormControlLabel,
//   FormHelperText
// } from 'material-ui/Form';
import { grey } from 'material-ui/colors';
import { fade } from 'material-ui/styles/colorManipulator';
import ArrowBack from 'material-ui-icons/ArrowBack';

import { myPrimaryColor } from '../themes/primary-color-palette.js';

const styles = theme => ({
  root: {
    position: 'fixed',
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: grey[100]
    //background: 'linear-gradient(240deg,  #7474bf, #348ac7, #44449B)'
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
      backgroundSize: '100% auto'
    },
    [theme.breakpoints.down('sm')]: {
      backgroundSize: 'auto 100%'
    }
  },
  paper: {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,.75)'
  },
  paperContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  leftContentContainer: {
    position: 'relative',
    backgroundSize: 'auto',
    backgroundPosition: 'left',
    backgroundImage: 'url("/img/login-bg-kraken.jpg")',
    backgroundAttachment: 'fixed',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 6,
      height: 600
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 3,
      height: 'auto'
    }
  },
  leftContent: {
    zIndex: 2
  },
  rightContentContainer: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      height: 600
    },
    [theme.breakpoints.down('sm')]: {
      height: 428
    }
  },
  formContainer: {
    justifyContent: 'center',

    [theme.breakpoints.up('lg')]: {
      height: '100%',
      margin: 'auto 96px'
    },
    [theme.breakpoints.down('md')]: {
      height: '100%',
      margin: 'auto 80px'
    },
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing.unit * 4
    }
  },
  overlay: {
    height: '100%',
    width: '100%',
    background:
      'linear-gradient(30deg, rgba(116,116,191,1), rgba(52,138,199,.75))',
    position: 'absolute',
    top: 0,
    left: 0
  },
  overlayBackground: {
    height: '100%',
    width: '100%',
    background:
      'linear-gradient(30deg, rgba(255,255,255,.92), rgba(255,255,255,.66))',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -9
  },
  tabs: {
    position: 'absolute',
    width: '100%',
    top: 0
  },
  button: {
    width: '100%',
    marginTop: theme.spacing.unit * 4,
    background: 'linear-gradient(90deg, #7474bf, #348ac7)'
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16
  },
  displayText: {
    fontWeight: 100,
    [theme.breakpoints.up('md')]: {
      fontSize: 45
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 34
    }
  },
  whiteText: {
    color: '#fff'
  },
  leftContentParagraph: {
    fontWeight: 300,
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 2,
      width: '66%'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit,
      width: '100%'
    }
  }
});

function TabContainer(props) {
  return <div>{props.children}</div>;
}

class OtentikasiPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      redirect: false,
      tab: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };

  handleSubmit(event) {
    event.preventDefault();

    const name = this.state.name.trim(),
      age = this.state.age,
      sex = this.state.sex,
      id = Meteor.apply('newPlayers.insert', [name, age, sex], {
        returnStubValue: true
      });

    console.log('newPlayerId: ' + id);

    this.setState({
      id: id,
      redirect: true
    });
  }

  render() {
    const { classes } = this.props;
    const { redirect, id } = this.state;

    // if (redirect) {
    //   return <Redirect to={`/tes/${id}`} />;
    // }

    return (
      <div className={classes.root}>
        <div className={classes.background} />
        <div className={classes.overlayBackground} />
        <Grid container spacing={0} justify={'center'} alignItems={'center'}>
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
                    classes.leftContentContainer
                  )}
                >
                  <div className={classes.overlay} />
                  <div className={classes.leftContent}>
                    <Hidden smDown>
                      <IconButton
                        color="contrast"
                        className={classes.backButton}
                        aria-label="Back to previous page "
                      >
                        <ArrowBack />
                      </IconButton>
                    </Hidden>
                    <Typography
                      className={classnames(
                        classes.displayText,
                        classes.whiteText
                      )}
                    >
                      Kenali Dirimu
                    </Typography>
                    <Hidden smUp>
                      <Typography
                        type="body1"
                        gutterBottom
                        className={classnames(
                          classes.whiteText,
                          classes.rightContentParagraph
                        )}
                      >
                        Temukan kepribadian, potensi, dan bakat alami Anda
                        sekarang.
                      </Typography>
                    </Hidden>
                    <Hidden xsDown>
                      <Typography
                        type="body1"
                        style={{ marginTop: 16 }}
                        gutterBottom
                        className={classnames(
                          classes.whiteText,
                          classes.leftContentParagraph
                        )}
                      >
                        Bergabunglah dengan Persona yang akan memandu Anda dalam
                        menemukan kepribadian, potensi, dan bakat alami Anda.
                        Segera kenali diri Anda dan perjuangkan hidup Anda
                        sekarang!
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
                    classes.paperContentContainer
                  )}
                >
                  <Tabs
                    textColor="primary"
                    indicatorColor="primary"
                    fullWidth
                    value={this.state.tab}
                    onChange={this.handleTabChange}
                    className={classes.tabs}
                  >
                    <Tab label="Masuk" />
                    <Tab label="Daftar" />
                  </Tabs>
                  {/* masuk form */}
                  {this.state.tab === 0 && (
                    <TabContainer>
                      <form
                        onSubmit={this.handleSubmit}
                        className={classnames(
                          classes.formContainer,
                          classes.paperContentContainer
                        )}
                      >
                        {/* <FormControl
                          className={classes.formControl}
                          fullWidth
                          required
                        >
                          <InputLabel htmlFor="email">Email</InputLabel>
                          <Input
                            type="email"
                            endAdornment={
                              <InputAdornment position="end">
                                <MailIcon />
                              </InputAdornment>
                            }
                          />
                        </FormControl> */}
                        <TextField
                          required
                          fullWidth
                          type="email"
                          name="email"
                          label="Email"
                          margin="normal"
                        />
                        <TextField
                          required
                          fullWidth
                          type="password"
                          name="password"
                          label="Password"
                          margin="normal"
                        />
                        <Button
                          raised
                          className={classes.button}
                          color="primary"
                          type="submit"
                          value="Submit"
                        >
                          Masuk
                        </Button>
                      </form>
                    </TabContainer>
                  )}
                  {this.state.tab === 1 && (
                    <TabContainer>
                      <form
                        onSubmit={this.handleSubmit}
                        className={classnames(
                          classes.formContainer,
                          classes.paperContentContainer
                        )}
                      >
                        <TextField
                          required
                          fullWidth
                          name="name"
                          label="Nama"
                          margin="normal"
                        />
                        <TextField
                          required
                          fullWidth
                          type="email"
                          name="email"
                          label="Email"
                          margin="normal"
                        />
                        <TextField
                          required
                          fullWidth
                          type="password"
                          name="password"
                          label="Password"
                          margin="normal"
                        />
                        <TextField
                          required
                          fullWidth
                          type="password"
                          name="confirmPassword"
                          label="Konfirmasi Password"
                          margin="normal"
                        />

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
                    </TabContainer>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

OtentikasiPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OtentikasiPage);
