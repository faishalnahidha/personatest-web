import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser((options, user) => {
  const newUser = Object.assign(user);
  // We still want the default hook's 'profile' behavior.
  // if (options.profile) {
  //   newUser.profile = options.profile;
  // }
  newUser.profile = options.profile || {};

  // Assign other custom field
  newUser.gameProfile = {};

  if (options.name) {
    newUser.profile.name = options.name;
  }

  if (options.personalityType) {
    newUser.profile.personalityType = options.personalityType;
  }

  if (options.score) {
    newUser.gameProfile.score = options.score;
  }

  if (options.testResult) {
    newUser.testResult = options.testResult;
  }

  // Returns the user object
  return newUser;
});
