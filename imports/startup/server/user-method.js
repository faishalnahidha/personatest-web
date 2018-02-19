import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.methods({
  'users.updateContentReadFlag.private'(contentId, setFlag) {
    check(contentId, String);
    check(setFlag, Boolean);

    if (!this.userId) {
      throw new Meteor.Error(
        'users.updateContentReadFlag.unauthorized',
        'Cannot edit flags that is not yours',
      );
    }

    const select = {
      _id: this.userId,
      'contentReadFlags.private.contentId': contentId.toLowerCase(),
    };

    const set = { $set: { 'contentReadFlags.private.$.flag': setFlag } };

    Meteor.users.update(select, set, false, true);
  },

  'users.updateContentReadFlag.public'(contentId, setFlag) {
    check(contentId, String);
    check(setFlag, Boolean);

    if (!this.userId) {
      throw new Meteor.Error(
        'users.updateContentReadFlag.unauthorized',
        'Cannot flags score that is not yours',
      );
    }

    const select = {
      _id: this.userId,
      'contentReadFlags.public.contentId': contentId.toLowerCase(),
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
