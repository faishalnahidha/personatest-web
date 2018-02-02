import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';
import { grey } from 'material-ui/colors';

// import ContentProgressPanel from '../components/ContentProgressPanel.jsx';
import NextContentNavButton from '../components/NextContentNavButton.jsx';
import OverallProgressPanel from '../components/OverallProgressPanel.jsx';
import { mySecondaryColor } from '../themes/secondary-color-palette';
import { drawerWidth } from '../components/MenuDrawer.jsx';
import { readPoint } from '../../lib/points-const';
import {
  overallContentPercentage,
  privateContentPercentage,
  publicContentPercentage,
} from '../../lib/determine-content-percentage';

const styles = theme => ({
  contentRoot: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginTop: 96,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 80,
    },
  },
  mainColumnContainer: {
    margin: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainColumnContainerShift: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: drawerWidth,
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  rightColumnContainer: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit,
    },
  },
  paper: {
    position: 'relative',
    padding: 0,
    paddingBottom: theme.spacing.unit * 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  pictureContainer: {
    marginBottom: theme.spacing.unit,
  },
  displayTextContainer: {
    marginTop: theme.spacing.unit * 6,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '12%',
      paddingRight: '12%',
    },
  },
  textContainer: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '12%',
      paddingRight: '12%',
    },
  },
  shortDescription: {
    fontSize: theme.typography.pxToRem(21),
    fontWeight: theme.typography.fontWeightLight,
    fontStyle: 'italic',
  },
  orderedList: {
    paddingLeft: 20,
  },
  divider: {
    maxWidth: '62%',
    margin: '16px 0',
  },
  image: {
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '130%',
      marginLeft: -40,
    },
  },
  blockquote: {
    margin: '32px 0',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3,
    borderLeft: '3px solid transparent',
    borderImage: 'linear-gradient(to bottom right, #7474bf 0%, #348ac7 100%)',
    borderImageSlice: 1,
  },
  blockquoteText: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightLight,
    // fontStyle: 'italic',
  },
  paragraphText: {
    fontSize: theme.typography.pxToRem(16),
    color: grey[800],
  },
  greyText: {
    color: grey[700],
  },
  buttonDaftar: {
    marginLeft: theme.spacing.unit * -2,
    marginTop: theme.spacing.unit,
  },
  contentNavButtonConteiner: {
    marginTop: theme.spacing.unit * 5,
  },
  stickyPanel: {
    position: 'sticky',
    [theme.breakpoints.up('md')]: {
      top: 104,
    },
    [theme.breakpoints.down('md')]: {
      top: 88,
    },
  },
  imageInText: {
    width: '100%',
    marginBottom: theme.spacing.unit * 2,
  },
});

const READ_POINT = readPoint;
const contentMinReadTime = 5;

class PublicContentPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSnackbar1: false,
      openSnackbar2: false,
      openSnackbar3: false,
      seconds: 0,
    };

    this.isContentRead = false;
    this.recentlyRead = false;
  }

  componentDidMount() {
    Session.set('headerTitle', 'Artikel');
  }

  componentWillReceiveProps(nextProps) {
    const drawerNotChange = this.props.isDrawerOpen === nextProps.isDrawerOpen;

    if (
      Meteor.userId() &&
      nextProps.publicContentExists &&
      nextProps.publicContent !== this.props.publicContent &&
      drawerNotChange
    ) {
      // this.recentlyRead = false;
      this.isContentRead = false;
      this.setState({ openSnackbar1: false, openSnackbar3: false });
      this.stopTick();

      const contentReadFlag = this.findUserContentReadFlag(
        nextProps.currentUser,
        nextProps.publicContent._id,
      );
      this.isContentRead = contentReadFlag.flag;

      if (!this.isContentRead) {
        this.startTick();
      } else if (this.isContentRead && !this.recentlyRead) {
        this.setState({ openSnackbar3: true });
      }

      this.recentlyRead = false;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  findUserContentReadFlag(currentUser, contentId) {
    const { contentReadFlags } = currentUser;

    return contentReadFlags.public.find(element => element.contentId === contentId.toLowerCase());
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1,
    }));
  }

  startTick() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stopTick = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.setState({ seconds: 0 });
  };

  openSnackbar1 = () => {
    this.stopTick();
    this.setState({ openSnackbar1: true });
  };

  handleSnackbar1Close = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ openSnackbar1: false, openSnackbar2: true });
    this.updateUserContentReadFlag();
    this.updateUserScore();
  };

  updateUserContentReadFlag() {
    const { publicContent } = this.props;
    Meteor.call('users.updateContentReadFlag.public', publicContent._id, true);

    this.isContentRead = true;
    this.recentlyRead = true;
  }

  updateUserScore() {
    const score = this.props.currentUser.gameProfile.score + READ_POINT;
    Meteor.call('users.updateScore', score);
  }

  render() {
    const {
      currentUser,
      loading,
      publicContent,
      publicContentExists,
      isDrawerOpen,
      isTestFinished,
      classes,
    } = this.props;

    console.log(`seconds: ${this.state.seconds}`);

    if (!publicContentExists) {
      return <Typography type="display1">404 Not Found</Typography>;
    }

    if (publicContentExists) {
      if (this.state.seconds === publicContent.minimumReadTime) {
        this.openSnackbar1();
      }

      console.log(`isTestFinished?${isTestFinished}`);

      return (
        <div className={classes.contentRoot}>
          <Grid container spacing={16} justify="center">
            {/* Main column */}
            <Grid
              item
              xs={12}
              sm={10}
              md={8}
              lg={6}
              className={classnames(classes.mainColumnContainer, {
                [classes.mainColumnContainerShift]: isDrawerOpen,
              })}
            >
              <Paper className={classes.paper}>
                <Grid container spacing={0}>
                  {publicContent.contentMainImage !== null ? (
                    <Grid item xs={12} className={classes.pictureContainer}>
                      <img
                        src={`/img/content-feature/${publicContent.contentMainImage}`}
                        alt={`MBTI ${publicContent._id} ${publicContent.name}`}
                        className={classes.image}
                      />
                    </Grid>
                  ) : (
                    <Grid item xs={12} className={classes.displayTextContainer}>
                      <Typography type="display2" component="h1" gutterBottom>
                        {publicContent.name}
                      </Typography>
                    </Grid>
                  )}

                  {publicContent.shortDescription !== null && (
                    <Grid item xs={12} className={classes.textContainer}>
                      <Typography
                        className={classnames(classes.shortDescription, classes.greyText)}
                      >
                        {publicContent.shortDescription}
                      </Typography>
                      <Divider className={classes.divider} />
                    </Grid>
                  )}
                  <Grid item xs={12} className={classes.textContainer}>
                    {Parser(publicContent.content, {
                      replace: (domNode) => {
                        if (domNode.name === 'h2') {
                          return (
                            <div>
                              <Typography type="display1" component="h2" gutterBottom>
                                {domToReact(domNode.children)}
                              </Typography>
                              <br />
                            </div>
                          );
                        }

                        if (domNode.name === 'p') {
                          return (
                            <Typography className={classes.paragraphText} paragraph>
                              {domToReact(domNode.children)}
                            </Typography>
                          );
                        }

                        if (domNode.name === 'ol') {
                          return (
                            <ol className={classes.orderedList}>
                              <Typography className={classes.paragraphText}>
                                {domToReact(domNode.children)}
                              </Typography>
                            </ol>
                          );
                        }

                        if (domNode.name === 'ul') {
                          return (
                            <ul className={classes.orderedList}>
                              <Typography className={classes.paragraphText}>
                                {domToReact(domNode.children)}
                              </Typography>
                            </ul>
                          );
                        }

                        if (domNode.name === 'blockquote') {
                          return (
                            <div className={classes.blockquote}>
                              <Typography
                                className={classnames(classes.blockquoteText, classes.greyText)}
                              >
                                {domToReact(domNode.children)}
                              </Typography>
                            </div>
                          );
                        }

                        if (domNode.name === 'img') {
                          return (
                            <img
                              src={domNode.attribs.src}
                              alt={domNode.attribs.alt}
                              className={classes.imageInText}
                            />
                          );
                        }

                        if (domNode.name === 'hr') {
                          return <Divider className={classes.divider} />;
                        }

                        return null;
                      },
                    })}
                  </Grid>
                  {!currentUser &&
                    isTestFinished &&
                    publicContent.article !== 'pengenalan' && (
                      <Grid item xs={12} className={classes.textContainer}>
                        <Typography type="body1" className={classes.greyText}>
                          <em>
                            *Anda dapat melihat deskripsi detail mengenai: kelebihan alami dan
                            tantangan kepribadian Anda, lingkungan kerja dan bos ideal, serta
                            ratusan daftar karir yang sesuai dengan tipe kepribadian Anda, dengan
                            mendaftar di Persona Web
                          </em>
                        </Typography>
                        <Button
                          color="primary"
                          className={classes.buttonDaftar}
                          component={Link}
                          to="/daftar"
                        >
                          Daftar Sekarang
                        </Button>
                      </Grid>
                    )}
                  {currentUser &&
                    currentUser.profile.personalityType === publicContent._id && (
                      <Grid container spacing={0} className={classes.contentNavButtonConteiner}>
                        <Grid item xs={6} />
                        <Grid item xs={6}>
                          <NextContentNavButton
                            nextContentTitle="Kelebihan Alami dalam Pekerjaan"
                            nextContentRoute={`${currentUser.profile.personalityType.toLowerCase()}/kelebihan-alami`}
                          />
                        </Grid>
                      </Grid>
                    )}
                </Grid>
              </Paper>
            </Grid>
            {/* Right column */}
            {currentUser && (
              <Grid item xs={12} sm={10} md={3} lg={2}>
                <div className={classnames(classes.rightColumnContainer, classes.stickyPanel)}>
                  <Grid container spacing={16} justify="center">
                    <Grid item xs={12} sm={6} md={12}>
                      <OverallProgressPanel
                        percentage={overallContentPercentage(currentUser.contentReadFlags)}
                        name={currentUser.profile.name}
                      />
                    </Grid>
                    {/* <Grid item xs={12} sm={6} md={12}>
                      <ContentProgressPanel
                        testPercentage={100}
                        privateContentPercentage={privateContentPercentage(currentUser.contentReadFlags)}
                        publicContentPercentage={publicContentPercentage(currentUser.contentReadFlags)}
                      />
                    </Grid> */}
                  </Grid>
                </div>
              </Grid>
            )}
          </Grid>
          {currentUser && (
            <div>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={this.state.openSnackbar1}
                onClose={this.handleSnackbar1Close}
                SnackbarContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Artikel ini telah selesai dibaca</span>}
                action={
                  <Button key="ok" color="secondary" dense onClick={this.handleSnackbar1Close}>
                    OK
                  </Button>
                }
              />
              <Snackbar
                key="snackbar2"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={this.state.openSnackbar2}
                onClose={() => this.setState({ openSnackbar2: false })}
                autoHideDuration={3000}
                message={
                  <span>
                    {currentUser.username || 'user'}, skor anda:
                    <span style={{ color: mySecondaryColor.A700 }}>&ensp;+ {READ_POINT}</span>
                  </span>
                }
              />
              <Snackbar
                key="snackbar3"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={this.state.openSnackbar3}
                onClose={() => this.setState({ openSnackbar3: false })}
                autoHideDuration={3000}
                message={<span>Anda sudah membaca artikel ini</span>}
              />
            </div>
          )}
        </div>
      );
    }

    return <CircularProgress />;
  }
}

PublicContentPage.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  loading: PropTypes.bool,
  publicContent: PropTypes.object,
  publicContentExists: PropTypes.bool,
  isDrawerOpen: PropTypes.bool.isRequired,
  isTestFinished: PropTypes.bool,
};

export default withStyles(styles)(PublicContentPage);
