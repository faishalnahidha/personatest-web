import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Questions } from '../../api/questions.js';
import { NewPlayers } from '../../api/new-players.js';

import TestPage from '../pages/TestPage.jsx';

const TestContainer = withTracker(({ match }) => {
  const id = match.params.id;

  const newPlayerHandle = Meteor.subscribe('newPlayers', id);
  console.log('-----------------------');
  console.log('id:' + id);

  let loading = !newPlayerHandle.ready();

  const newPlayer = NewPlayers.findOne({ _id: id });
  const newPlayerExists = newPlayer != undefined && newPlayer != null;
  console.log('newPlayerExists: ' + newPlayerExists);

  if (newPlayerExists) {
    const questionsHandle = Meteor.subscribe('questions');
    console.log('newPlayer.name: ' + newPlayer.name);

    return {
      loading: !(newPlayerHandle.ready() && questionsHandle.ready()),
      questions: Questions.find({}).fetch(),
      newPlayer,
      newPlayerExists
    };
  } else {
    return {
      loading,
      questions: [],
      newPlayer,
      newPlayerExists
    };
  }
})(TestPage);

export default TestContainer;
