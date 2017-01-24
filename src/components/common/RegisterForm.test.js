import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import RegisterForm from './RegisterForm';

function setup() {
    const props = {
        user: {},
        onChange: () => {},
        registerMsg: 'Test!',
        registerUser: () => {},
        errors: {}
    };

    return shallow(<RegisterForm {...props} />);
}

describe('RegisterPage Component', () => {
    it('renders a form and a Register header', () => {
        const wrapper = setup();
        const registerForm = wrapper.find('form');
        expect(registerForm.length).toBe(1);
        expect(wrapper.find('h1').text()).toEqual('Register');
    });
});

