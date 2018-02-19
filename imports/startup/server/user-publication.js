import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.publish('userData', function () {
    return Meteor.users.find(
      { _id: this.userId },
      {
        fields: { testResult: 1, gameProfile: 1, contentReadFlags: 1 },
      },
    );
  });

  Meteor.publish('allUsers', function () {
    if (!this.userId) {
      // this will make this available just to logged in users, and not for everyone.
      this.ready();
      return null;
    }

    const options = {
      fields: {
        username: 1,
        'profile.profilePicture': 1,
        'gameProfile.score': 1,
      },
      sort: { 'gameProfile.score': -1 },
    };

    return Meteor.users.find({});
  });
}
