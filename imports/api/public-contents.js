import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const PublicContents = new Mongo.Collection('publicContents');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('publicContents', function(id) {
    check(id, String);

    return PublicContents.find({ _id: id });
  });

  Meteor.publish('publicContents.forResult', function(id1, id2, id3) {
    check(id1, String);
    check(id2, String);
    check(id3, String);

    /**
     * Hanya mencari 3 obyek sesuai parameter id1, id2, dan id3
     */
    const query = {
      _id: { $in: [id1, id2, id3] }
    };

    /**
     * Hanya menampilkan field tertentu yaitu:
     * _id, name, type, shortDescription, dan summary
     */
    const options = {
      fields: {
        _id: 1,
        name: 1,
        type: 1,
        shortDescription: 1,
        summary: 1
      }
    };

    return PublicContents.find(query, options);
  });
}
