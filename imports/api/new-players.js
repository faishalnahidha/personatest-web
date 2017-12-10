import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const NewPlayers = new Mongo.Collection('newPlayers');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('newPlayers', function newPlayersPublication(newPlayerId) {
    check(newPlayerId, String);

    return NewPlayers.find({ _id: newPlayerId });
  });
}

Meteor.methods({
  'newPlayers.insert'(nameInput, ageInput, sexInput) {
    check(nameInput, String);
    check(ageInput, String);
    check(sexInput, String);

    const newPlayerId = NewPlayers.insert({
      name: nameInput,
      age: ageInput,
      sex: sexInput,
      score: 100
    });
    return newPlayerId;
  },

  'newPlayers.updateAnswers'(newPlayerId, setAnswers, setScore) {
    check(newPlayerId, String);
    check(setAnswers, Array);
    check(setScore, Number);

    NewPlayers.update(newPlayerId, {
      $set: { answers: setAnswers, score: setScore }
    });
  },

  'newPlayers.updateScore'(newPlayerId, setScore) {
    check(newPlayerId, String);
    check(setScore, Number);

    NewPlayers.update(newPlayerId, { $set: { score: setScore } });
  }
});
