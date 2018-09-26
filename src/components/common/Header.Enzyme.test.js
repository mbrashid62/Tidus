// import expect from 'expect';
// import React from 'react';
// import {shallow} from 'enzyme';
// import Header from './Header';
//
// function setup(loading) {
//     const props = {
//         loading: loading
//     };
//
//     return shallow(<Header {...props} />);
// }
//
// describe('Header Component', () => {
//     it('renders appropriate header items when done loading', () => {
//         const wrapper = setup(false);
//         const listItems = wrapper.find('li');
//         expect(listItems.length).toBe(2); // renders 4 'li' elements in nav
//     });
//
//     it('renders appropriate header items when loading', () => {
//         const wrapper = setup(true);
//         expect(wrapper.find('li').length).toBe(2); // renders 5 'li' elements in nav
//     });
// });
