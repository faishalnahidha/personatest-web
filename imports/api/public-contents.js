import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const PublicContents = new Mongo.Collection('publicContents');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('publicContents', function() {
    return PublicContents.find();
  });
}
