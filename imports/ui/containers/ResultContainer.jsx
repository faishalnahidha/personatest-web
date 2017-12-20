import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { NewPlayers } from '../../api/new-players.js';
import { PublicContents } from '../../api/public-contents.js';

import ResultPage from '../pages/ResultPage.jsx';

function countResult(answers) {
  if (Array.isArray(answers) === false) {
    return false;
  }

  let result = {
    extrovert: 0,
    introvert: 0,
    sensory: 0,
    intuitive: 0,
    thinking: 0,
    feeling: 0,
    judging: 0,
    perceiving: 0
  };

  /**
   * Menghitung banyaknya masing" jawaban
   */
  for (let i = 0; i <= answers.length; i++) {
    if (answers[i] === 'E') {
      result.extrovert += 1;
    } else if (answers[i] === 'I') {
      result.introvert += 1;
    } else if (answers[i] === 'S') {
      result.sensory += 1;
    } else if (answers[i] === 'N') {
      result.intuitive += 1;
    } else if (answers[i] === 'T') {
      result.thinking += 1;
    } else if (answers[i] === 'F') {
      result.feeling += 1;
    } else if (answers[i] === 'J') {
      result.judging += 1;
    } else {
      result.perceiving += 1;
    }
  }

  /**
   * Menentukan tipe kepribadian (hurufnya) dari hasil
   * perhitungan di atas
   */
  if (result.extrovert >= result.introvert) {
    result.type = 'E';
  } else {
    result.type = 'I';
  }

  if (result.sensory >= result.intuitive) {
    result.type += 'S';
  } else {
    result.type += 'N';
  }

  if (result.thinking >= result.feeling) {
    result.type += 'T';
  } else {
    result.type += 'F';
  }

  if (result.judging >= result.perceiving) {
    result.type += 'J';
  } else {
    result.type += 'P';
  }

  return result;
}

const ResultContainer = withTracker(({ match }) => {
  const id = match.params.id;

  const newPlayerHandle = Meteor.subscribe('newPlayers', id);
  let loading = !newPlayerHandle.ready();

  const newPlayer = NewPlayers.findOne({ _id: id });
  const newPlayerExists = newPlayer != undefined && newPlayer != null;

  if (newPlayerExists) {
    const answers = newPlayer.answers.slice();
    const result = countResult(answers);
    const publicContentHandle = Meteor.subscribe('publicContents');

    return {
      loading: !(newPlayerHandle.ready() && publicContentHandle.ready()),
      publicContent: PublicContents.findOne({ _id: result.type }),
      newPlayer,
      newPlayerExists
    };
  } else {
    return {
      loading,
      publicContent: null,
      newPlayer,
      newPlayerExists
    };
  }
})(ResultPage);

export default ResultContainer;
