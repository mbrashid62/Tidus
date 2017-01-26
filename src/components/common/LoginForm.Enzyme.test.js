import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import LoginForm from './LoginForm';

function setup() {
    const props = {
        onChange: () => {},
        registerMsg: 'Test!',
        loginUser: () => {},
        loginMsg: 'Hello',
        errors: {}
    };

    return shallow(<LoginForm {...props} />);
}

describe('LoginForm Component', () => {
    it('renders a form and a Login header', () => {
        const wrapper = setup();
        const loginForm = wrapper.find('form');
        expect(loginForm.length).toBe(1);
        expect(wrapper.find('h1').text()).toEqual('Login');
    });
});


