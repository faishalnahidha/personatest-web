import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Link } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import HomeIcon from 'material-ui-icons/Home';
import AssignmentIcon from 'material-ui-icons/Assignment';
import AssignmentTurnedInIcon from 'material-ui-icons/AssignmentTurnedIn';
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
    margin: '8px 0'
  },
  parentSubheading: {
    backgroundColor: theme.palette.background.paper
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
    const newPlayerId = Session.get('newPlayerId');

    return (
      <List className={classes.root}>
        {/* List utama */}
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText inset primary="Beranda" />
        </ListItem>
        <ListItem button component={Link} to="/mulai-tes">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText inset primary="Mulai Tes Baru" />
        </ListItem>
        {newPlayerId ? (
          <ListItem button component={Link} to={`/tes/${newPlayerId}`}>
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText inset primary="Hasil Tes" />
          </ListItem>
        ) : (
          ''
        )}
        <Divider className={classes.divider} />

        <ListSubheader className={classes.parentSubheading}>
          Artikel
        </ListSubheader>
        <ListItem button onClick={this.handleClick('personaListOpen')}>
          <ListItemText primary="Pengenalan" />
        </ListItem>
        <Collapse
          component="li"
          in={this.state.personaListOpen}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>
            <ListItem button className={classes.nestedList}>
              <Typography>
                Mengenali <em>Passion</em>
              </Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>Sekilas Tentang Pengelompokan Kepribadian</Typography>
            </ListItem>
            <ListItem button className={classes.nestedList}>
              <Typography>Pengelompokan Kepribadian Myers-Briggs</Typography>
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
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/gold"
            >
              <Typography>Gold [SJ]</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/red"
            >
              <Typography>Red [SP]</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/blue"
            >
              <Typography>Blue [NT]</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/green"
            >
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
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/estj"
            >
              <Typography>The Supervisor (ESTJ)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/istj"
            >
              <Typography>The Inspector (ISTJ)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/esfj"
            >
              <Typography>The Provider (ESFJ)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/isfj"
            >
              <Typography>The Protector (ISFJ)</Typography>
            </ListItem>
            <ListSubheader className={classes.nestedList}>
              Red [SP]
            </ListSubheader>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/estp"
            >
              <Typography>The Promoter (ESTP)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/istp"
            >
              <Typography>The Crafter (ISTP)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/esfp"
            >
              <Typography>The Performer (ESFP)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/isfp"
            >
              <Typography>The Composer (ISFP)</Typography>
            </ListItem>
            <ListSubheader className={classes.nestedList}>
              Blue [NT]
            </ListSubheader>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/entj"
            >
              <Typography>The Commander (ENTJ)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/intj"
            >
              <Typography>The Mastermind (INTJ)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/entp"
            >
              <Typography>The Inventor (ENTP)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/intp"
            >
              <Typography>The Thinker (INTP)</Typography>
            </ListItem>
            <ListSubheader className={classes.nestedList}>
              Green [NF]
            </ListSubheader>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/enfj"
            >
              <Typography>The Mentor (ENFJ)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/infj"
            >
              <Typography>The Counselor (INFJ)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/enfp"
            >
              <Typography>The Champion (ENFP)</Typography>
            </ListItem>
            <ListItem
              button
              className={classes.nestedList}
              component={Link}
              to="/artikel/infp"
            >
              <Typography>The Dreamer (INFP)</Typography>
            </ListItem>
          </List>
        </Collapse>
      </List>
    );
  }
}

export default withStyles(styles)(MenuDrawerList);
