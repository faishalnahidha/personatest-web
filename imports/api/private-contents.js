import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const PrivateContents = new Mongo.Collection('privateContents');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('privateContents', (id) => {
    check(id, String);

    return PrivateContents.find({ _id: id });
  });
}
