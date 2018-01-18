import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser((options, user) => {
  const newUser = Object.assign(user);
  // We still want the default hook's 'profile' behavior.
  if (options.profile) {
    newUser.profile = options.profile;
  }

  // Assigns the custom profile to the newly created user object
  newUser.profile.name = options.name;
  newUser.profile.personalityType = options.personalityType;

  // Assign other custom field
  newUser.gameProfile = {};

  if (options.testResult) {
    newUser.testResult = options.testResult;
  }

  if (options.score) {
    newUser.gameProfile.score = options.score;
  }

  // Returns the user object
  return newUser;
});
