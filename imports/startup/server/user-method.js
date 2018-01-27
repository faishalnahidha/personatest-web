import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'users.updateContentReadFlag.private'(userId, contentId, setFlag) {
    check(userId, String);
    check(contentId, String);
    check(setFlag, Boolean);

    const select = {
      _id: userId,
      'contentReadFlags.private.contentId': contentId,
    };

    const set = { $set: { 'contentReadFlags.private.$.flag': setFlag } };

    Meteor.users.update(select, set, false, true);
  },

  'users.updateContentReadFlag.public'(userId, contentId, setFlag) {
    check(userId, String);
    check(contentId, String);
    check(setFlag, Boolean);

    const select = {
      _id: userId,
      'contentReadFlags.public.contentId': contentId,
    };

    const set = { $set: { 'contentReadFlags.public.$.flag': setFlag } };

    Meteor.users.update(select, set, false, true);
  },

  'users.updateScore'(setScore) {
    check(setScore, Number);

    if (!this.userId) {
      throw new Meteor.Error(
        'users.updateScore.unauthorized',
        'Cannot edit score that is not yours',
      );
    }

    Meteor.users.update({ _id: this.userId }, { $set: { 'gameProfile.score': setScore } });
  },
});
