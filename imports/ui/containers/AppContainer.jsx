import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

import App from '../layouts/App.jsx';

export default withTracker(() => {
  // const subscription = Meteor.subscribe('userData');

  Meteor.subscribe('userData');
  const currentUser = Meteor.user();

  return {
    currentUser,
    connected: Meteor.status().connected,
    newPlayerName: Session.get('currentNewPlayer_name'),
    newPlayerScore: Session.get('currentNewPlayer_score'),
    headerTitle: Session.get('headerTitle'),
    justRegister: Session.get('justRegister'),
  };
})(App);
