import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import { personalityColor } from '../themes/personality-color.js';

const styles = theme => ({
  contentRoot: {
    flexGrow: 1,
    margin: 0,
    marginTop: 80,
    padding: theme.spacing.unit * 1
  },
  paper: {
    padding: 0,
    borderRadius: 5,
    overflow: 'hidden'
  },
  pictureDummy: {
    minHeight: 450,
    position: 'relative'
  },
  textInsidePictureContainer: {
    position: 'absolute',
    top: 20,
    right: 16,
    bottom: 16,
    left: 16
  },
  textInsidePicture: {
    color: '#FFF'
  },
  textContainer: {
    padding: theme.spacing.unit * 2
  }
});

class MainResult extends Component {
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
    console.log(this.attribute[0]);

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
              <Typography
                type="display1"
                gutterBottom
                align="right"
                className={classes.textInsidePicture}
              >
                {content._id}
              </Typography>
              <br />
              <Typography
                type="subheading"
                align="right"
                className={classes.textInsidePicture}
              >
                {this.attribute[0]}
              </Typography>
              <Typography
                type="subheading"
                align="right"
                className={classes.textInsidePicture}
              >
                {this.attribute[1]}
              </Typography>
              <Typography
                type="subheading"
                align="right"
                className={classes.textInsidePicture}
              >
                {this.attribute[2]}
              </Typography>
              <Typography
                type="subheading"
                align="right"
                className={classes.textInsidePicture}
              >
                {this.attribute[3]}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={5} className={classes.textContainer}>
            <Typography type="caption" gutterBottom>
              Tipe kepribadian Anda:
            </Typography>
            <Typography type="title" gutterBottom>
              {content.name.toUpperCase()}
            </Typography>
            <br />
            {Parser(content.summary, {
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
            {/* <div dangerouslySetInnerHTML={{ __html: content.summary }} /> */}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

MainResult.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.object
};
export default withStyles(styles)(MainResult);
