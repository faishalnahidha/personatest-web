import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { PublicContents } from '../../api/public-contents.js';

import PublicContentPage from '../pages/PublicContentPage.jsx';

const PublicContentPageContainer = withTracker(({ match, isDrawerOpen }) => {
  const id = match.params.id.toString().toUpperCase();
  console.log(`id: ${id}`);

  const publicContentHandle = Meteor.subscribe('publicContents', id);
  const loading = !publicContentHandle.ready();
  const publicContent = PublicContents.findOne({ _id: id });
  const publicContentExists = !loading && publicContent !== undefined && publicContent != null;

  return {
    loading,
    publicContent,
    publicContentExists,
    isDrawerOpen,
  };
})(PublicContentPage);

export default PublicContentPageContainer;
