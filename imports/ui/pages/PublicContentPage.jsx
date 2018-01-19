import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
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

import TestProgressPanel from '../components/TestProgressPanel.jsx';
import TestResultPanel from '../components/TestResultPanel.jsx';
import { drawerWidth } from '../components/MenuDrawer.jsx';
import { personalityColor } from '../themes/personality-color.js';

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
    // background:
    //  'linear-gradient(135deg, rgba(116,116,191,.1), rgba(52,138,199,.1))'
  },
  blockquoteText: {
    fontSize: 15,
    fontWeight: 300,
    fontStyle: 'italic',
  },
  greyText: {
    color: grey[700],
  },
  buttonDaftar: {
    marginLeft: -16,
    marginTop: theme.spacing.unit,
  },
});

class PublicContentPage extends Component {
  render() {
    const {
      loading,
      publicContent,
      publicContentExists,
      isDrawerOpen,
      isTestFinished,
      classes,
    } = this.props;

    if (!publicContentExists) {
      return <Typography type="display1">404 Not Found</Typography>;
    }

    if (publicContentExists) {
      const pictureBgColor = (() => {
        const { type } = this.props.publicContent;

        if (type === 'SJ') {
          return personalityColor.gold;
        } else if (type === 'SP') {
          return personalityColor.red;
        } else if (type === 'NT') {
          return personalityColor.blue;
        }
        return personalityColor.green;
      })();

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
                      <Typography type="display2" gutterBottom>
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
                              <Typography type="headline" component="h2">
                                {domToReact(domNode.children)}
                              </Typography>
                              <br />
                            </div>
                          );
                        }

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
                  {isTestFinished &&
                    publicContent.article !== 'pengenalan' && (
                      <Grid item xs={12} className={classes.textContainer}>
                        <Typography type="body1" className={classes.greyText}>
                          *Anda dapat melihat deskripsi detail mengenai: kelebihan alami dan
                          tantangan kepribadian Anda, lingkungan kerja dan bos ideal, serta ratusan
                          daftar karir yang sesuai dengan tipe kepribadian Anda, dengan mendaftar di
                          Persona Web
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

PublicContentPage.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  publicContent: PropTypes.object,
  publicContentExists: PropTypes.bool,
  isDrawerOpen: PropTypes.bool.isRequired,
  isTestFinished: PropTypes.bool.isRequired,
};

export default withStyles(styles)(PublicContentPage);
