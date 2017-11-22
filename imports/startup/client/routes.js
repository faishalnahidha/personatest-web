import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// Import to load these templates
import App from '../../ui/containers/App.jsx';

FlowRouter.route('/test/', {
  name: 'App.test',
  action() {
    mount(App);
  }
});
