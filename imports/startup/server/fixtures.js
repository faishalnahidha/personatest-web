import { Meteor } from 'meteor/meteor';
import { Questions } from '../../api/questions.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Questions.find().count() === 0) {
    const questionData = Assets.getText('question-data.json');

    JSON.parse(questionData).question.forEach(question => {
      Questions.insert(question);
    });
  }
});
