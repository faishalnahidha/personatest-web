import { Meteor } from 'meteor/meteor';
import { Questions } from '../../api/questions.js';
import { PublicContents } from '../../api/public-contents.js';
import { NewPlayers } from '../../api/new-players.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Questions.find().count() === 0) {
    const questionData = Assets.getText('question-data.json');

    JSON.parse(questionData).question.forEach((question) => {
      Questions.insert(question);
    });
  }

  if (PublicContents.find().count() === 0) {
    const publicContentData = Assets.getText('public-content-data.json');

    JSON.parse(publicContentData).publicContent.forEach((publicContent) => {
      PublicContents.insert(publicContent);
    });
  }

  if (NewPlayers.find().count() === 0) {
    console.log('newPlayerEmpty');
    const megumiKato = {
      _id: 'RBeay5oZJzwddAGhA',
      name: 'Megumi Kato',
      age: 17,
      sex: 'Perempuan',
      score: 500,
      answers: [
        'I',
        'N',
        'N',
        'F',
        'F',
        'P',
        'J',
        'I',
        'N',
        'N',
        'T',
        'T',
        'J',
        'J',
        'I',
        'N',
        'S',
        'T',
        'F',
        'J',
        'J',
        'I',
        'S',
        'N',
        'F',
        'F',
        'J',
        'J',
        'I',
        'S',
        'S',
        'T',
        'F',
        'J',
        'J',
        'I',
        'N',
        'N',
        'T',
        'T',
        'J',
        'P',
        'I',
        'S',
        'S',
        'F',
        'T',
        'J',
        'P',
        'E',
        'S',
        'N',
        'F',
        'F',
        'J',
        'J',
        'I',
        'N',
        'N',
        'T',
        'T',
        'J',
        'J',
        'I',
        'S',
        'N',
        'F',
        'F',
        'J',
        'P',
      ],
      result: {
        extrovert: 10,
        introvert: 90,
        sensory: 40,
        intuitive: 60,
        thinking: 45,
        feeling: 55,
        judging: 80,
        perceiving: 20,
        type: 'INFJ',
        alternativeType1: 'INTJ',
        alternativeType2: 'ISFJ',
      },
    };
    NewPlayers.insert(megumiKato);
  }
});
