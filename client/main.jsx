import React from 'react';
import { Meteor } from 'meteor/meteor';

import { mount } from 'react-mounter';
import App from '../imports/ui/app.jsx';

Meteor.startup(() => {

});

const MainLayout = ({content}) => (
    <div className="wrap">
        {content()}
    </div>
);

var renderpage = function(name) {
    return mount(MainLayout, {
        content: () => (<App pageName={name} />)
    });
}

// some routing
FlowRouter.route("/home", {
    action: function() {
        // mount(MainLayout, {
        //     content: () => (<App pageName="home" />)
        // });
        renderpage("home");
    },
    name: "home"
});

FlowRouter.route("/", {
    action: function() {
        renderpage("home");
    },
    name: "home"
})

FlowRouter.route("/listings", {
    action: function() {
        renderpage("listings")
    },
    name: "listings"
});
