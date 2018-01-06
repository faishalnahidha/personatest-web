import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { CircularProgress } from 'material-ui/Progress';

import TestProgressPanel from '../components/TestProgressPanel.jsx';
import TestResultPanel from '../components/TestResultPanel.jsx';
import { drawerWidth } from '../components/MenuDrawer.jsx';
import { personalityColor } from '../themes/personality-color.js';

const styles = theme => ({
  contentRoot: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginTop: 96
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 80
    }
  },
  mainColumnContainer: {
    margin: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  mainColumnContainerShift: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: drawerWidth
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  rightColumnContainer: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit
    }
  },
  paper: {
    position: 'relative',
    padding: 0,
    paddingBottom: theme.spacing.unit * 2,
    borderRadius: 4,
    overflow: 'hidden'
  },
  pictureDummy: {
    position: 'relative',
    minHeight: 350
  },
  textContainer: {
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '15%',
      paddingRight: '10%'
    }
  },
  orderedList: {
    paddingLeft: 0
  }
});

class PublicContentPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      loading,
      publicContent,
      publicContentExists,
      isDrawerOpen,
      classes
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
        } else {
          return personalityColor.green;
        }
      })();

      return (
        <div className={classes.contentRoot}>
          <Grid container spacing={16} justify="center">
            {/* Main column*/}
            <Grid
              item
              xs={12}
              sm={10}
              md={8}
              lg={6}
              className={classnames(classes.mainColumnContainer, {
                [classes.mainColumnContainerShift]: isDrawerOpen
              })}
            >
              <Paper className={classes.paper}>
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={12}
                    className={classes.pictureDummy}
                    style={{ backgroundColor: pictureBgColor }}
                  />
                  <Grid item xs={12} className={classes.textContainer}>
                    <br />
                  </Grid>
                  <Grid item xs={12} className={classes.textContainer}>
                    <Typography type="headline">
                      Tentang {publicContent.name}
                    </Typography>
                    <br />
                    {Parser(publicContent.content.summary, {
                      replace: domNode => {
                        if (domNode.name === 'p') {
                          return (
                            <Typography paragraph>
                              {domToReact(domNode.children)}
                            </Typography>
                          );
                        }
                      }
                    })}
                    {Parser(publicContent.content.about, {
                      replace: domNode => {
                        if (domNode.name === 'p') {
                          return (
                            <Typography paragraph>
                              {domToReact(domNode.children)}
                            </Typography>
                          );
                        } else if (domNode.name === 'li') {
                          return (
                            <Typography type="body1" gutterBottom>
                              <li>{domToReact(domNode.children)}</li>
                            </Typography>
                          );
                        }
                      }
                    })}
                  </Grid>
                  <Grid item xs={12} className={classes.textContainer}>
                    <Typography type="headline">Keseluruhan</Typography>
                    <br />
                    {Parser(publicContent.content.overall, {
                      replace: domNode => {
                        if (domNode.name === 'p') {
                          return (
                            <Typography paragraph>
                              {domToReact(domNode.children)}
                            </Typography>
                          );
                        }
                      }
                    })}
                  </Grid>
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
  isDrawerOpen: PropTypes.bool.isRequired
};

export default withStyles(styles)(PublicContentPage);
