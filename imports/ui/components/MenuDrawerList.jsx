import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%'
  },
  nestedList: {
    paddingLeft: theme.spacing.unit * 4
  },
  divider: {
    margin: '16px 0'
  }
});

class MenuDrawerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personaListOpen: false,
      tipeListOpen: false,
      warnaListOpen: false
    };
  }

  handleClick = name => event => {
    event.preventDefault();
    this.setState({ [name]: !this.state[name] });
  };

  render() {
    const { classes } = this.props;

    return (
      <List className={classes.root}>
        <ListItem button onClick={this.handleClick('personaListOpen')}>
          <ListItemText primary="Persona" />
        </ListItem>
        <Collapse
          component="li"
          in={this.state.personaListOpen}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>
            <ListItem button className={classes.nestedList}>
              <Typography>Pengenalan</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>Sekilas Tentang Pengelompokan Kepribadian</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>Huruf-Huruf Myers-Briggs</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>Kunjungan ke Perusahaan Persona</Typography>
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={this.handleClick('warnaListOpen')}>
          <ListItemText primary="Warna Kepribadian" />
        </ListItem>
        <Collapse
          component="li"
          in={this.state.warnaListOpen}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>
            <ListItem button className={classes.nestedList}>
              <Typography>Gold [SJ]</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>Red [SP]</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>Blue [NT]</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>Green [NF]</Typography>
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={this.handleClick('tipeListOpen')}>
          <ListItemText primary="Tipe Kepribadian" />
          {/* {this.state.tipeListOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />} */}
        </ListItem>
        <Collapse
          component="li"
          in={this.state.tipeListOpen}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>
            <ListSubheader className={classes.nestedList}>
              Gold [SJ]
            </ListSubheader>
            <ListItem button className={classes.nestedList}>
              <Typography>The Supervisor (ESTJ)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Inspector (ISTJ)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Provider (ESFJ)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Protector (ISFJ)</Typography>
            </ListItem>
            <ListSubheader className={classes.nestedList}>
              Red [SP]
            </ListSubheader>
            <ListItem button className={classes.nestedList}>
              <Typography>The Promoter (ESTP)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Crafter (ISTP)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Performer (ESFP)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Composer (ISFP)</Typography>
            </ListItem>
            <ListSubheader className={classes.nestedList}>
              Blue [NT]
            </ListSubheader>
            <ListItem button className={classes.nestedList}>
              <Typography>The Commander (ENTJ)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Mastermind (INTJ)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Inventor (ENTP)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Thinker (INTP)</Typography>
            </ListItem>
            <ListSubheader className={classes.nestedList}>
              Green [NF]
            </ListSubheader>
            <ListItem button className={classes.nestedList}>
              <Typography>The Mentor (ENFJ)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Counselor (INFJ)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Champion (ENFP)</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>The Dreamer (INFP)</Typography>
            </ListItem>
          </List>
        </Collapse>

        <Divider className={classes.divider} />
        <ListItem button>
          <ListItemText primary="Mulai Tes" />
        </ListItem>
      </List>
    );
  }
}

export default withStyles(styles)(MenuDrawerList);
