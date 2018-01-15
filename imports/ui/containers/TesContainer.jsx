import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { NewPlayers } from '../../api/new-players.js';
import { Questions } from '../../api/questions.js';
import { PublicContents } from '../../api/public-contents.js';

import TesLayout from '../layouts/TesLayout.jsx';
import { determineTestResult } from '../../lib/determine-test-result.js';

let n = 0;

const TesContainer = withTracker(({ match }) => {
  n += 1;
  const { id } = match.params;

  console.log(`\n------Loading Data: ${n} loops------`);
  console.log(`newPlayer._id:${id}`);

  const newPlayerHandle = Meteor.subscribe('newPlayers', id);
  const loading = !newPlayerHandle.ready();
  const newPlayer = NewPlayers.findOne({ _id: id });
  const newPlayerExists = !loading && newPlayer !== undefined && newPlayer != null;

  console.log(`newPlayerExists: ${newPlayerExists}`);

  if (newPlayerExists) {
    const isTestFinished = newPlayer.answers && newPlayer.answers.length === 70;
    // 70 is completed answers

    if (isTestFinished) {
      let result = {};

      if (newPlayer.result) {
        result = Object.assign(newPlayer.result);
      } else {
        result = determineTestResult(newPlayer.answers);
        Meteor.call('newPlayers.updateResult', newPlayer._id, result);
      }

      // console.log('newPlayer: ' + JSON.stringify(newPlayer));
      // console.log('result: ' + JSON.stringify(result));
      const { type, alternativeType1, alternativeType2 } = result;

      const resultContentHandle = Meteor.subscribe(
        'publicContents.forResult',
        type,
        alternativeType1,
        alternativeType2,
      );

      Session.set('newPlayerId', newPlayer._id);

      return {
        loading,
        newPlayerExists,
        newPlayer,
        resultContentHandle,
        resultLoading: !resultContentHandle.ready(),
        resultContents: PublicContents.find({}).fetch(),
        isTestFinished,
      };
    }
    const questionsHandle = Meteor.subscribe('questions');

    return {
      loading,
      newPlayerExists,
      newPlayer,
      questionsHandle,
      questionLoading: !questionsHandle.ready(),
      questions: Questions.find({}).fetch(),
      isTestFinished,
    };
  }

  return {
    loading,
    newPlayerExists,
    newPlayer,
  };
})(TesLayout);

export default TesContainer;
