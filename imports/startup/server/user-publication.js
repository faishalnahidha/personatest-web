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
}
