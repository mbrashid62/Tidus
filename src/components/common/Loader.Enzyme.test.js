import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

function setup(loading) {
    const props = {
        loading: loading
    };

    return shallow(<Loader {...props} />);
}

describe('Loader component', () => {
    it('does not render a loader when passed in false', () => {
        const wrapper = setup(false);
        const loaderDiv = wrapper.find('.loader');
        expect(loaderDiv.length).toBe(0);
    });

    it('renders a loader when passed in true', () => {
        const wrapper = setup(true);
        const loaderDiv = wrapper.find('.loader');
        expect(loaderDiv.length).toBe(1);
    });
});