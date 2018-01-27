import { Meteor } from 'meteor/meteor';
import {
  initialPrivateContentReadFlags,
  initialPublicContentReadFlags,
} from '../../lib/initial-content-read-flags';

Accounts.onCreateUser((options, user) => {
  const newUser = Object.assign(user);
  // We still want the default hook's 'profile' behavior.
  // if (options.profile) {
  //   newUser.profile = options.profile;
  // }
  newUser.profile = options.profile || {};

  // Assign other custom field
  newUser.gameProfile = {};
  newUser.contentReadFlags = {};

  if (options.name) {
    newUser.profile.name = options.name;
  }

  if (options.personalityType) {
    newUser.profile.personalityType = options.personalityType;
    newUser.contentReadFlags.private = initialPrivateContentReadFlags(options.personalityType);
  }

  if (options.age) {
    newUser.profile.age = options.age;
  }

  if (options.score) {
    newUser.gameProfile.score = options.score;
  }

  if (options.testResult) {
    newUser.testResult = options.testResult;
  }

  newUser.contentReadFlags.public = initialPublicContentReadFlags.slice();
  // newUser.gameProfile.privateContentsRead = 0;
  // newUser.gameProfile.allContentsRead = 0;

  // Returns the user object
  return newUser;
});
