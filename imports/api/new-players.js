import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const NewPlayers =  new Mongo.Collection('newPlayers', {connection: null});