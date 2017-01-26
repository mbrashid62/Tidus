import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import Header from './Header';

function setup(isSignedIn) {
    const props = {
        isSignedIn: isSignedIn,
        user: {},
        signOutFunc: () => {}
    };

    return shallow(<Header {...props} />);
}

describe('StatusMsg Component', () => {
    it('renders appropriate signed out header items', () => {
        const wrapper = setup(false);
        const listItems = wrapper.find('li');
        expect(listItems.length).toBe(4); // renders 4 'li' elements in nav
    });

    it('renders appropriate signed in header items', () => {
        const wrapper = setup(true);
        expect(wrapper.find('li').length).toBe(5); // renders 5 'li' elements in nav
    });
});
