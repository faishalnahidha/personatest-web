import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

import { PublicContents } from '../../api/public-contents.js';

import PublicContentPage from '../pages/PublicContentPage.jsx';

const PublicContentPageContainer = withTracker(({ match }) => {
  const id = match.params.id.toString().toUpperCase();

  const publicContentHandle = Meteor.subscribe('publicContents', id);
  const loading = !publicContentHandle.ready();
  const publicContent = PublicContents.findOne({ _id: id });
  const publicContentExists = !loading && publicContent !== undefined && publicContent !== null;

  return {
    loading,
    publicContent,
    publicContentExists,
    isTestFinished: Session.get('currentNewPlayer_isTestFinished'),
  };
})(PublicContentPage);

export default PublicContentPageContainer;
