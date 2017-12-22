import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import Parser from 'html-react-parser';
import domToReact from 'html-react-parser/lib/dom-to-react';

import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

import { personalityColor } from '../themes/personality-color.js';

const styles = theme => ({
  card: {
    borderRadius: 5,
    overflow: 'hidden'
  },
  media: {
    height: 200
  },
  action: {
    marginBottom: -4
  },
  greyText: {
    color: 'rgba(0,0,0,0.54)'
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  flexGrow: {
    flex: '1 1 auto'
  }
});

class AlternativeResultCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };

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

    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { classes, content } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="#"
          style={{ backgroundColor: this.pictureBgColor }}
        />
        {/* <div
          className={classes.media}
          style={{ backgroundColor: this.pictureBgColor }}
        /> */}
        <CardContent>
          <Typography type="headline" component="h2" gutterBottom>
            {content._id} | {content.name}
          </Typography>
          <Typography className={classes.greyText}>
            {content.shortDescription}
          </Typography>
        </CardContent>
        <CardActions className={classes.action}>
          <Button dense color="primary">
            Bagikan
          </Button>
          <Button dense color="primary">
            Baca
          </Button>
          <div className={classes.flexGrow} />
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
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
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

AlternativeResultCard.propTypes = {
  classes: PropTypes.object.isRequired,
  content: PropTypes.object.isRequired
};

export default withStyles(styles)(AlternativeResultCard);
