import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Questions } from '../../api/questions.js';
import { NewPlayers } from '../../api/new-players.js';

import TestPage from '../pages/TestPage.jsx';

const TestContainer = withTracker(({ params: { id } }) => {
  const questionsHandle = Meteor.subscribe('questions');
  const newPlayerHandle = Meteor.subscribe('newPlayers', { _id: id });
  const loading = !newPlayerHandle.ready() && !questionsHandle.ready();
  const questions = Questions.find();
  const newPlayer = NewPlayers.findOne(id);
  const newPlayerExists = !!newPlayer;
  return {
    loading,
    questions,
    newPlayer,
    newPlayerExists
  };
})(TestPage);

export default TestContainer;
