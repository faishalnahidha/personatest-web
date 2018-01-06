import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//import { findDOMNode } from 'react-dom';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import IconButton from 'material-ui/IconButton';
import Share from 'material-ui-icons/Share';

import { personalityColor } from '../themes/personality-color.js';

/* theme.spacing.unit = 8px */
const styles = theme => ({
  paper: {
    position: 'relative',
    padding: 0,
    borderRadius: 4,
    overflow: 'hidden'
  },
  pictureDummy: {
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      minHeight: 450
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 350
    }
  },
  textInsidePictureContainer: {
    position: 'absolute',
    [theme.breakpoints.up('md')]: {
      top: 20,
      right: 16,
      textAlign: 'right'
    },
    [theme.breakpoints.down('sm')]: {
      top: 16,
      left: 16,
      textAlign: 'left'
    }
  },
  textInsidePicture: {
    color: '#FFF'
  },
  textContainer: {
    padding: theme.spacing.unit * 2
  },
  buttonContainer: {
    padding: theme.spacing.unit * 1,
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end'
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-start'
    }
  },
  shareFloatingButton: {
    position: 'absolute',
    [theme.breakpoints.up('md')]: {
      bottom: 24,
      left: '58.33%',
      marginLeft: -28
    },
    [theme.breakpoints.down('sm')]: {
      top: 350,
      right: 16,
      marginTop: -28
    }
    //background: 'linear-gradient(45deg, #7474bf, #348ac7)'
  }
});

class MainResultCard extends Component {
  constructor(props) {
    super(props);

    this.attribute = (() => {
      const letterType = this.props.content._id;
      let attribute = [];

      if (letterType.charAt(0) === 'E') {
        attribute.push('Extroverted');
      } else {
        attribute.push('Introverted');
      }

      if (letterType.charAt(1) === 'S') {
        attribute.push('Sensory');
      } else {
        attribute.push('Intuitive');
      }

      if (letterType.charAt(2) === 'T') {
        attribute.push('Thinking');
      } else {
        attribute.push('Feeling');
      }

      if (letterType.charAt(3) === 'J') {
        attribute.push('Judging');
      } else {
        attribute.push('Perceiving');
      }

      return attribute;
    })();

    this.pictureBgColor = (() => {
      const { type } = this.props.content;

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
  }

  render() {
    const { classes, content } = this.props;

    return (
      <Paper className={classes.paper}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sm={12}
            md={7}
            className={classes.pictureDummy}
            style={{ backgroundColor: this.pictureBgColor }}
          >
            <div className={classes.textInsidePictureContainer}>
              <Typography type="display2" className={classes.textInsidePicture}>
                {content._id}
              </Typography>
              <br />
              <Typography
                type="subheading"
                className={classes.textInsidePicture}
                style={{ marginTop: 8 }}
              >
                {this.attribute[0]}
              </Typography>
              <Typography
                type="subheading"
                className={classes.textInsidePicture}
              >
                {this.attribute[1]}
              </Typography>
              <Typography
                type="subheading"
                className={classes.textInsidePicture}
              >
                {this.attribute[2]}
              </Typography>
              <Typography
                type="subheading"
                className={classes.textInsidePicture}
              >
                {this.attribute[3]}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Grid
              container
              alignContent="space-between"
              spacing={0}
              style={{ height: '100%' }}
            >
              <Grid item xs={12} className={classes.textContainer}>
                <Typography type="caption" gutterBottom>
                  Tipe kepribadian Anda:
                </Typography>
                <Typography type="headline" gutterBottom>
                  {content.name.toUpperCase()}
                </Typography>
                <br />
                {Parser(content.content.summary, {
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
              <Grid item xs={12}>
                <Grid container spacing={0} className={classes.buttonContainer}>
                  {/* <IconButton dense color="primary">
                    <Share />
                  </IconButton> */}
                  <Button
                    dense
                    color="primary"
                    component={Link}
                    to={`/artikel/${content._id.toString().toLowerCase()}`}
                  >
                    Baca Lebih Lanjut
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            {/* <div dangerouslySetInnerHTML={{ __html: content.summary }} /> */}
          </Grid>
        </Grid>
        <Tooltip id="tooltip-share" title="Bagikan" placement="right">
          <Button
            fab
            color="primary"
            aria-label="share"
            className={classes.shareFloatingButton}
          >
            <Share />
          </Button>
        </Tooltip>
      </Paper>
    );
  }
}

MainResultCard.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};
export default withStyles(styles)(MainResultCard);
