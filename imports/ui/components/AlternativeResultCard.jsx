import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    borderRadius: 4,
    overflow: 'hidden'
  },
  media: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 200,
    [theme.breakpoints.up('xl')]: {
      height: 250
    }
  },
  action: {
    marginBottom: -4
  },
  greyText: {
    color: 'rgba(0,0,0,0.54)'
  },
  expandButton: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandButtonOpen: {
    transform: 'rotate(180deg)'
  },
  flexGrow: {
    flex: '1 1 auto'
  },
  image: {
    position: 'absolute',
    top: '-33%',
    zIndex: 2,
    [theme.breakpoints.up('xl')]: {
      width: '80%'
    },
    [theme.breakpoints.down('lg')]: {
      width: '90%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '50%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
});

class AlternativeResultCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpand: false
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
    this.setState({ isExpand: !this.state.isExpand });
  }

  render() {
    const { classes, content } = this.props;

    return (
      <Card className={classes.card}>
        {/* <CardMedia
          className={classes.media}
          image={`/img/illustration/${content.resultImage}.png`}
          style={{ backgroundColor: this.pictureBgColor }}
        /> */}
        <div
          className={classes.media}
          style={{ backgroundColor: this.pictureBgColor }}
        >
          <img
            src={`/img/illustration/mbti-illust-trans-bg-${content._id.toLowerCase()}.png`}
            alt={`MBTI ${content._id} ${content.name}`}
            className={classes.image}
          />
        </div>
        <CardContent>
          <Typography type="headline" component="h2" gutterBottom>
            {content._id} | {content.name}
          </Typography>
          <Typography className={classes.greyText}>
            {content.shortDescription}
          </Typography>
        </CardContent>
        <CardActions className={classes.action}>
          <Button
            dense
            color="primary"
            component={Link}
            to={`/artikel/${content._id}`}
          >
            Baca
          </Button>
          <Button dense color="primary">
            Bagikan
          </Button>
          <div className={classes.flexGrow} />
          <IconButton
            className={classnames(classes.expandButton, {
              [classes.expandButtonOpen]: this.state.isExpand
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.isExpand}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.isExpand} timeout="auto" unmountOnExit>
          <CardContent style={{ paddingBottom: 8 }}>
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
