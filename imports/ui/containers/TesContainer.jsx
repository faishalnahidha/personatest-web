import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { NewPlayers } from '../../api/new-players.js';
import { Questions } from '../../api/questions.js';
import { PublicContents } from '../../api/public-contents.js';

import TesLayout from '../layouts/TesLayout.jsx';
import { determineTestResult } from '../../lib/determine-test-result.js';

const TesContainer = withTracker(({ match, currentUser }) => {
  const { id } = match.params;
  // console.log(`newPlayer._id:${id}`);

  let newPlayerHandle;
  let loading;
  let newPlayer = {};
  let newPlayerExists;

  /**
   *  jika user login maka data newPlayer diambil dari users, bukan dari collection newPlayer
   *  dan otomatis tes sudah selesai
   */
  if (Meteor.userId()) {
    if (currentUser) {
      newPlayer.name = currentUser.profile.name;
      newPlayer.result = currentUser.testResult;
      newPlayer.isTestFinished = true;
    }
    loading = false;
    newPlayerExists = true;
  } else {
    newPlayerHandle = Meteor.subscribe('newPlayers', id);
    loading = !newPlayerHandle.ready();
    newPlayer = NewPlayers.findOne({ _id: id });
    newPlayerExists = !loading && newPlayer !== undefined && newPlayer != null;
  }

  // console.log(`newPlayerExists: ${newPlayerExists}`);

  if (newPlayerExists) {
    if (!Meteor.userId()) {
      // 70 is completed answers
      newPlayer.isTestFinished = newPlayer.answers && newPlayer.answers.length === 70;
    }

    if (newPlayer.isTestFinished) {
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

      return {
        loading,
        newPlayerExists,
        newPlayer,
        resultContentHandle,
        resultLoading: !resultContentHandle.ready(),
        resultContents: PublicContents.find({}).fetch(),
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
    };
  }

  return {
    loading,
    newPlayerExists,
    newPlayer,
  };
})(TesLayout);

export default TesContainer;
