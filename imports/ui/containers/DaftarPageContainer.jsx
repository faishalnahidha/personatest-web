import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

import { NewPlayers } from '../../api/new-players.js';

import DaftarPage from '../pages/DaftarPage.jsx';

const DaftarPageContainer = withTracker(() => {
  const currentNewPlayerId = Session.get('currentNewPlayer_id');
  const isTestFinished = Session.get('currentNewPlayer_isTestFinished');
  console.log(`Session.get(newPlayerId): ${Session.get('newPlayerId')}`);

  const newPlayerHandle = Meteor.subscribe('newPlayers', currentNewPlayerId);
  const loading = !newPlayerHandle.ready();
  const newPlayer = NewPlayers.findOne({ _id: currentNewPlayerId });
  const newPlayerExists = !loading && newPlayer !== undefined && newPlayer != null;

  return {
    currentNewPlayerId,
    isTestFinished,
    loading,
    newPlayer,
    newPlayerExists,
  };
})(DaftarPage);

export default DaftarPageContainer;
