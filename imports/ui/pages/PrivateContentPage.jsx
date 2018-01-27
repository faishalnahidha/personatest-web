import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Snackbar from 'material-ui/Snackbar';
import Typography from 'material-ui/Typography';
import { grey } from 'material-ui/colors';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import { drawerWidth } from '../components/MenuDrawer.jsx';
import ContentProgressPanel from '../components/ContentProgressPanel.jsx';
import NextContentNavButton from '../components/NextContentNavButton.jsx';
import PrevContentNavButton from '../components/PrevContentNavButton.jsx';
import OverallProgressPanel from '../components/OverallProgressPanel.jsx';
import { myPrimaryColor } from '../themes/primary-color-palette';
import { mySecondaryColor } from '../themes/secondary-color-palette';
import { getPersonalityColor } from '../themes/personality-color';
import { getPersonalityName } from '../../lib/get-personality-name';
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
    borderRadius: 4,
    overflow: 'hidden',
  },
  paperKarir: {
    paddingBottom: 0,
  },
  pictureContainer: {
    marginBottom: theme.spacing.unit,
    backgroundColor: grey[500],
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
  expansionContentContainer: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '12%',
      paddingRight: '12%',
    },
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
    padding: 1,
    paddingLeft: theme.spacing.unit * 3,
    borderLeft: '2px solid transparent',
    borderImage: 'linear-gradient(to bottom right, #7474bf 0%, #348ac7 100%)',
    borderImageSlice: 1,
  },
  blockquoteText: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightLight,
  },
  personalityNameText: {
    fontSize: theme.typography.pxToRem(30),
    marginTop: theme.spacing.unit,
  },
  expansionTitleText: {
    color: myPrimaryColor[700],
    fontWeight: 300,
  },
  paragraphText: {
    fontSize: theme.typography.pxToRem(16),
    color: grey[800],
  },
  greyText: {
    color: grey[700],
  },
  contentNavButtonConteiner: {
    marginTop: theme.spacing.unit * 5,
    backgroundColor: grey[100],
  },
});

const READ_POINT = readPoint;
const karirContentIdentifier = 'karir yang menarik bagi anda';
const contentMinReadTime = 5;

class PrivateContentPage extends Component {
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
    Session.set('headerTitle', 'Artikel | Profil Khusus');
  }

  componentWillReceiveProps(nextProps) {
    const drawerNotChange = this.props.isDrawerOpen === nextProps.isDrawerOpen;

    if (
      Meteor.userId() &&
      nextProps.contentExists &&
      nextProps.content !== this.props.content &&
      drawerNotChange
    ) {
      // this.recentlyRead = false;
      this.isContentRead = false;
      this.setState({ openSnackbar1: false, openSnackbar3: false });
      this.stopTick();

      const contentReadFlag = this.findUserContentReadFlag(
        nextProps.currentUser,
        nextProps.content._id,
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

    return contentReadFlags.private.find(element => element.contentId === contentId);
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
    const { content } = this.props;
    Meteor.call('users.updateContentReadFlag.private', content._id, true);

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
      isUserLogin,
      askedPersonalityContent,
      loading,
      content,
      contentExists,
      isDrawerOpen,
      classes,
    } = this.props;

    if (!isUserLogin) {
      console.log('youre not logged in!');
      return <Redirect to="/" />;
    }

    /* user tidak boleh mengakses content yang bukan profil tipe kepribadiannya */
    if (
      isUserLogin &&
      currentUser &&
      currentUser.profile.personalityType !== askedPersonalityContent
    ) {
      console.log('your profile not same');
      return <Redirect to="/" />;
    }

    if (!contentExists) {
      return <Typography type="display1">404 Not Found</Typography>;
    }

    // console.log(`seconds: ${this.state.seconds}`);

    if (contentExists) {
      const personalityColor = getPersonalityColor(content.personalityId);
      const personalityName = getPersonalityName(content.personalityId);
      const isKarirContent = content.contentTitle.toLowerCase() === karirContentIdentifier;

      if (this.state.seconds === contentMinReadTime) {
        this.openSnackbar1();
      }

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
              {!isKarirContent ? (
                <Paper className={classes.paper}>
                  <Grid container spacing={0}>
                    {content.contentMainImage && content.contentMainImage !== '' ? (
                      <Grid item xs={12} className={classes.pictureContainer}>
                        <br />
                      </Grid>
                    ) : (
                      <Grid item xs={12} className={classes.displayTextContainer}>
                        <Typography type="display2" component="h1">
                          {content.contentTitle}
                        </Typography>
                        <Typography
                          className={classes.personalityNameText}
                          style={{ color: personalityColor }}
                        >
                          {personalityName}
                        </Typography>
                      </Grid>
                    )}
                    <Grid item xs={12} className={classes.textContainer}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12} className={classes.textContainer}>
                      {Parser(content.contentBody, {
                        replace: (domNode) => {
                          if (domNode.name === 'p') {
                            return (
                              <Typography paragraph className={classes.paragraphText}>
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

                          if (domNode.name === 'hr') {
                            return <Divider className={classes.divider} />;
                          }

                          return null;
                        },
                      })}
                    </Grid>
                    <Grid container spacing={0} className={classes.contentNavButtonConteiner}>
                      <Grid item xs={6}>
                        <PrevContentNavButton
                          prevContentTitle={content.prevContentTitle}
                          prevContentRoute={content.prevContentRoute}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        {content.nextContentRoute && (
                          <NextContentNavButton
                            nextContentTitle={content.nextContentTitle}
                            nextContentRoute={content.nextContentRoute}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              ) : (
                <div>
                  <Paper
                    className={classnames(classes.paper, classes.paperKarir)}
                    style={{ borderRadius: '4px 4px 0 0' }}
                  >
                    <Grid container spacing={0}>
                      {content.contentMainImage && content.contentMainImage !== '' ? (
                        <Grid item xs={12} className={classes.pictureContainer}>
                          <br />
                        </Grid>
                      ) : (
                        <Grid item xs={12} className={classes.displayTextContainer}>
                          <Typography type="display2" component="h1">
                            {content.contentTitle}
                          </Typography>
                          <Typography
                            className={classes.personalityNameText}
                            style={{ color: personalityColor }}
                          >
                            {personalityName}
                          </Typography>
                        </Grid>
                      )}
                      <Grid item xs={12} className={classes.textContainer}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12} className={classes.textContainer}>
                        {Parser(content.contentBody, {
                          replace: (domNode) => {
                            if (domNode.attribs && domNode.attribs.id === 'career-type') {
                              return <div />;
                            }

                            if (domNode.name === 'p') {
                              return (
                                <Typography className={classes.paragraphText} paragraph>
                                  {domToReact(domNode.children)}
                                </Typography>
                              );
                            }
                            return null;
                          },
                        })}
                      </Grid>
                    </Grid>
                  </Paper>
                  {Parser(content.contentBody, {
                    replace: (domNode) => {
                      if (domNode.attribs && domNode.attribs.id === 'top-paragraph') {
                        return <div />;
                      }

                      if (domNode.attribs && domNode.attribs.id === 'career-type') {
                        return (
                          <ExpansionPanel>
                            {domToReact(domNode.children, {
                              replace: (domNode2) => {
                                if (domNode2.name === 'h3') {
                                  return (
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                      <div className={classes.expansionContentContainer}>
                                        <Typography
                                          type="subheading"
                                          component="h3"
                                          className={classes.expansionTitleText}
                                        >
                                          {domToReact(domNode2.children)}
                                        </Typography>
                                      </div>
                                    </ExpansionPanelSummary>
                                  );
                                }

                                if (domNode2.attribs && domNode2.attribs.id === 'career-list') {
                                  return (
                                    <ExpansionPanelDetails>
                                      <div className={classes.expansionContentContainer}>
                                        {domToReact(domNode2.children, {
                                          replace: (domNode3) => {
                                            if (domNode3.name === 'p') {
                                              return (
                                                <Typography
                                                  paragraph
                                                  className={classes.paragraphText}
                                                >
                                                  {domToReact(domNode3.children)}
                                                </Typography>
                                              );
                                            }

                                            if (domNode3.name === 'ul') {
                                              return (
                                                <ul className={classes.orderedList}>
                                                  <Typography className={classes.paragraphText}>
                                                    {domToReact(domNode3.children)}
                                                  </Typography>
                                                </ul>
                                              );
                                            }
                                            return null;
                                          },
                                        })}
                                      </div>
                                    </ExpansionPanelDetails>
                                  );
                                }

                                return null;
                              },
                            })}
                          </ExpansionPanel>
                        );
                      }

                      return null;
                    },
                  })}
                  <Paper
                    className={classnames(classes.paper, classes.paperKarir)}
                    style={{ borderRadius: '0 0 4px 4px', backgroundColor: grey[100] }}
                  >
                    <Grid container spacing={0} className={classes.contentNavButtonConteiner}>
                      <Grid item xs={6}>
                        <PrevContentNavButton
                          prevContentTitle={content.prevContentTitle}
                          prevContentRoute={content.prevContentRoute}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        {content.nextContentRoute && (
                          <NextContentNavButton
                            nextContentTitle={content.nextContentTitle}
                            nextContentRoute={content.nextContentRoute}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
              )}
            </Grid>
            {/* Right column */}
            {currentUser && (
              <Grid item xs={12} sm={10} md={3} lg={2}>
                <div className={classes.rightColumnContainer}>
                  <Grid container spacing={16} justify="center">
                    <Grid item xs={12} sm={6} md={12}>
                      <OverallProgressPanel
                        percentage={overallContentPercentage(currentUser.contentReadFlags)}
                        name={currentUser.profile.name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={12}>
                      <ContentProgressPanel
                        testPercentage={100}
                        privateContentPercentage={privateContentPercentage(currentUser.contentReadFlags)}
                        publicContentPercentage={publicContentPercentage(currentUser.contentReadFlags)}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            )}
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={this.state.openSnackbar1}
            // autoHideDuration={6000}
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
                {currentUser.username}, skor anda:
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
      );
    }

    // posisinya perlu diatur
    return <CircularProgress />;
  }
}

PrivateContentPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  loading: PropTypes.bool,
  content: PropTypes.object,
  contentExists: PropTypes.bool,
  isUserLogin: PropTypes.bool,
  askedPersonalityContent: PropTypes.string,
};

export default withStyles(styles)(PrivateContentPage);
