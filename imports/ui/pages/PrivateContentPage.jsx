import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link, Redirect } from 'react-router-dom';
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
// import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import { grey } from 'material-ui/colors';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

// import TestProgressPanel from '../components/TestProgressPanel.jsx';
// import TestResultPanel from '../components/TestResultPanel.jsx';
import { drawerWidth } from '../components/MenuDrawer.jsx';
import NextContentNavButton from '../components/NextContentNavButton.jsx';
import PrevContentNavButton from '../components/PrevContentNavButton.jsx';
import { myPrimaryColor } from '../themes/primary-color-palette';
import { getPersonalityColor } from '../themes/personality-color';
import { getPersonalityName } from '../../lib/get-personality-name';

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
      paddingLeft: '15%',
      paddingRight: '10%',
    },
  },
  textContainer: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '15%',
      paddingRight: '12%',
    },
  },
  expansionContentContainer: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '15%',
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
  greyText: {
    color: grey[700],
  },
  buttonDaftar: {
    marginLeft: theme.spacing.unit * -2,
    marginTop: theme.spacing.unit,
  },
  contentNavButtonConteiner: {
    background: 'linear-gradient(90deg, rgba(116,116,191,1), rgba(52,138,199,1))',
    // backgroundColor: myPrimaryColor[300],
  },
});

const karirContentIdentifier = 'karir yang menarik bagi anda';

class PrivateContentPage extends Component {
  componentDidMount() {
    Session.set('headerTitle', 'Artikel');
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

    if (contentExists) {
      const personalityColor = getPersonalityColor(content.personalityId);
      const personalityName = getPersonalityName(content.personalityId);
      const isKarirContent = content.contentTitle.toLowerCase() === karirContentIdentifier;
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
                        <Typography type="display2">{content.contentTitle}</Typography>
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
                              <Typography paragraph>{domToReact(domNode.children)}</Typography>
                            );
                          }

                          if (domNode.name === 'ol') {
                            return (
                              <ol className={classes.orderedList}>
                                <Typography>{domToReact(domNode.children)}</Typography>
                              </ol>
                            );
                          }

                          if (domNode.name === 'ul') {
                            return (
                              <ul className={classes.orderedList}>
                                <Typography>{domToReact(domNode.children)}</Typography>
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
                          <Typography type="display2">{content.contentTitle}</Typography>
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
                                <Typography paragraph> {domToReact(domNode.children)}</Typography>
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
                                                <Typography paragraph>
                                                  {domToReact(domNode3.children)}
                                                </Typography>
                                              );
                                            }

                                            if (domNode3.name === 'ul') {
                                              return (
                                                <ul className={classes.orderedList}>
                                                  <Typography>
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
                    style={{ borderRadius: '0 0 4px 4px' }}
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
          </Grid>
        </div>
      );
    }

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
