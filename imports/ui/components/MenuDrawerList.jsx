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

const pengenalanList = [
  {
    text: 'Mengenali Diri Sendiri',
    linkTo: '/artikel/mengenali-diri-sendiri'
  },
  {
    text: 'Sekilas Tentang Pengelompokan Kepribadian',
    linkTo: '#2'
  },
  {
    text: 'Pengelompokan Kepribadian Myers-Briggs',
    linkTo: '#3'
  },
  {
    text: 'Kunjungan ke Perusahaan Persona',
    linkTo: '#4'
  }
];

const warnaKepribadianList = [
  {
    text: 'Gold [SJ]',
    linkTo: '/artikel/gold'
  },
  {
    text: 'Red [SP]',
    linkTo: '/artikel/red'
  },
  {
    text: 'Blue [NT]',
    linkTo: '/artikel/blue'
  },
  {
    text: 'Green [NF]',
    linkTo: '/artikel/green'
  }
];

const tipeKepribadianList = [
  {
    text: 'The Supervisor (ESTJ)',
    linkTo: '/artikel/estj'
  },
  {
    text: 'The Inspector (ISTJ)',
    linkTo: '/artikel/istj'
  },
  {
    text: 'The Provider (ESFJ)',
    linkTo: '/artikel/esfj'
  },
  {
    text: 'The Protector (ISFJ)',
    linkTo: '/artikel/isfj'
  },
  {
    text: 'The Promoter (ESTP)',
    linkTo: '/artikel/estp'
  },
  {
    text: 'The Crafter (ISTP)',
    linkTo: '/artikel/istp'
  },
  {
    text: 'The Performer (ESFP)',
    linkTo: '/artikel/esfp'
  },
  {
    text: 'The Composer (ISFP)',
    linkTo: '/artikel/isfp'
  },
  {
    text: 'The Commander (ENTJ)',
    linkTo: '/artikel/entj'
  },
  {
    text: 'The Mastermind (INTJ)',
    linkTo: '/artikel/intj'
  },
  {
    text: 'The Inventor (ENTP)',
    linkTo: '/artikel/entp'
  },
  {
    text: 'The Thinker (INTP)',
    linkTo: '/artikel/intp'
  },
  {
    text: 'The Mentor (ENFJ)',
    linkTo: '/artikel/enfj'
  },
  {
    text: 'The Counselor (INFJ)',
    linkTo: '/artikel/infj'
  },
  {
    text: 'The Champion (ENFP)',
    linkTo: '/artikel/enfp'
  },
  {
    text: 'The Dreamer (INFP)',
    linkTo: '/artikel/infp'
  }
];

class MenuDrawerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pengenalanListOpen: false,
      tipeListOpen: false,
      warnaListOpen: false
    };
  }

  handleClick = name => event => {
    event.preventDefault();
    this.setState({ [name]: !this.state[name] });
  };

  handleTap = () => {
    if (this.props.handleDrawerOpen) {
      console.log('tapped');
      this.props.handleDrawerOpen();
    }
  };

  mapSubList(list) {
    return list.map(listItem => (
      <div key={listItem.linkTo} ref="listItemContainer">
        <ListItem
          button
          className={this.props.classes.nestedList}
          component={Link}
          to={listItem.linkTo}
          onClick={this.handleTap}
        >
          <Typography>{listItem.text}</Typography>
        </ListItem>
      </div>
    ));
  }

  render() {
    const { classes } = this.props;
    const newPlayerId = Session.get('newPlayerId');

    return (
      <List className={classes.root}>
        {/* List utama */}
        <ListItem button component={Link} to="/" onClick={this.handleTap}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText inset primary="Beranda" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/mulai-tes"
          onClick={this.handleTap}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText inset primary="Mulai Tes Baru" />
        </ListItem>
        {newPlayerId ? (
          <ListItem
            button
            component={Link}
            to={`/tes/${newPlayerId}`}
            onClick={this.handleTap}
          >
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText inset primary="Hasil Tes" />
          </ListItem>
        ) : null}
        <Divider className={classes.divider} />

        <ListSubheader className={classes.parentSubheading}>
          Artikel
        </ListSubheader>
        {/* List Pengenalan */}
        <ListItem button onClick={this.handleClick('pengenalanListOpen')}>
          <ListItemText primary="Pengenalan" />
        </ListItem>
        <Collapse
          component="li"
          in={this.state.pengenalanListOpen}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>{this.mapSubList(pengenalanList)}</List>
        </Collapse>
        {/* List Warna Kepribadian */}
        <ListItem button onClick={this.handleClick('warnaListOpen')}>
          <ListItemText primary="Warna Kepribadian" />
        </ListItem>
        <Collapse
          component="li"
          in={this.state.warnaListOpen}
          timeout="auto"
          unmountOnExit
        >
          <List disablePadding>{this.mapSubList(warnaKepribadianList)}</List>
        </Collapse>
        {/* List Tipe Kepribadian */}
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
          <List disablePadding>{this.mapSubList(tipeKepribadianList)}</List>
        </Collapse>
      </List>
    );
  }
}

MenuDrawerList.propTypes = {
  handleDrawerOpen: PropTypes.func
};

export default withStyles(styles)(MenuDrawerList);
