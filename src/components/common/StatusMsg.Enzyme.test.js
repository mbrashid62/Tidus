import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import StatusMsg from './StatusMsg';

function setup() {
    const props = {
        msg: 'Test Message',
        errors: { title: 'There was an error' }
    };

    return shallow(<StatusMsg {...props} />);
}

describe('StatusMsg Component', () => {
    it('renders a div, a msg, and an error', () => {
        const wrapper = setup();
        const div = wrapper.find('div');
        expect(div.length).toBe(1);
        expect(wrapper.find('#status-msg').text()).toEqual('Test Message');
        expect(wrapper.find('#status-error').text()).toEqual('There was an error');
    });
});


