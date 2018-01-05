import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { PublicContents } from '../../api/public-contents.js';

import PublicContentPage from '../pages/PublicContentPage.jsx';

const PublicContentPageContainer = withTracker(({ match }) => {
  const id = match.params.id.toUpperCase();
  console.log('id: ' + id);

  const publicContentHandle = Meteor.subscribe('publicContents', id);
  const loading = !publicContentHandle.ready();
  const publicContent = PublicContents.findOne({ _id: id });
  const publicContentExists =
    !loading && publicContent != undefined && publicContent != null;

  return {
    loading,
    publicContent,
    publicContentExists,
    isDrawerOpen: Session.get('isDrawerOpen')
  };
})(PublicContentPage);

export default PublicContentPageContainer;
