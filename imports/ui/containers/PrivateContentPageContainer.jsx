import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';

import { PrivateContents } from '../../api/private-contents.js';

import PrivateContentPage from '../pages/PrivateContentPage.jsx';

const PrivateContentPageContainer = withTracker(({ match }) => {
  const personalityId = match.params.personalityId.toString();
  const contentId = match.params.contentId.toString();
  const id = `${personalityId}/${contentId}`;

  const isUserLogin = !!Meteor.userId();

  const privateContentHandle = Meteor.subscribe('privateContents', id);
  const loading = !privateContentHandle.ready();
  const content = PrivateContents.findOne({ _id: id });
  const contentExists = !loading && content !== undefined && content != null;

  return {
    askedPersonalityContent: personalityId.toUpperCase(),
    isUserLogin,
    loading,
    content,
    contentExists,
  };
})(PrivateContentPage);

export default PrivateContentPageContainer;
