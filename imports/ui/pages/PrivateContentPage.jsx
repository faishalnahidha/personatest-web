import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { grey } from 'material-ui/colors';

// import TestProgressPanel from '../components/TestProgressPanel.jsx';
// import TestResultPanel from '../components/TestResultPanel.jsx';
import { drawerWidth } from '../components/MenuDrawer.jsx';
import { getPersonalityColor } from '../themes/personality-color.js';

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
  shortDescription: {
    fontSize: 21,
    fontWeight: 300,
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
    fontSize: 15,
    fontWeight: 300,
    fontStyle: 'italic',
  },
  personalityNameText: {
    fontSize: 30,
    marginTop: theme.spacing.unit,
  },
  greyText: {
    color: grey[700],
  },
  buttonDaftar: {
    marginLeft: -16,
    marginTop: theme.spacing.unit,
  },
});

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
      console.log('redirect please');
      return <Redirect to="/" />;
    }

    /* user tidak boleh mengakses content yang bukan profil tipe kepribadiannya */
    if (
      isUserLogin &&
      currentUser &&
      currentUser.profile.personalityType !== askedPersonalityContent
    ) {
      console.log('redirect please 2');
      return <Redirect to="/" />;
    }

    if (!contentExists) {
      return <Typography type="display1">404 Not Found</Typography>;
    }

    if (contentExists) {
      const personalityColor = getPersonalityColor(content.personalityId);
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
                  {content.contentMainImage && content.contentMainImage !== '' ? (
                    <Grid item xs={12} className={classes.pictureContainer}>
                      <br />
                    </Grid>
                  ) : (
                    <Grid item xs={12} className={classes.displayTextContainer}>
                      <Typography type="display2">{content.contentTitle}</Typography>
                      <Typography
                        gutterBottom
                        className={classes.personalityNameText}
                        style={{ color: personalityColor }}
                      >
                        {content.personalityName}
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
                          return <Typography paragraph>{domToReact(domNode.children)}</Typography>;
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
                  {content.prevContentRoute && (
                    <Grid item xs={6} className={classes.textContainer}>
                      <Button
                        color="primary"
                        className={classes.buttonDaftar}
                        component={Link}
                        to={`/artikel/${content.prevContentRoute}`}
                      >
                        Previous
                      </Button>
                    </Grid>
                  )}
                  {content.nextContentRoute && (
                    <Grid item xs={6} className={classes.textContainer}>
                      <Button
                        color="primary"
                        className={classes.buttonDaftar}
                        component={Link}
                        to={`/artikel/${content.nextContentRoute}`}
                      >
                        Next
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Paper>
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
