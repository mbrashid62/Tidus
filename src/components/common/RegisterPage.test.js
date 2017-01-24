// import React from 'react';
// import expect from 'expect';
// import {mount, shallow} from 'enzyme';
// import {LoginForm} from './LoginForm';
//
// describe ('Register Form Component', () => {
//     it('sets error message when trying to register mismatching passwords', () => {
//         const props = {
//             actions: {
//                 createUser: () => { return Promise.resolve(); },
//                 initStateChangeHook: () => { return Promise.resolve(); }
//             },
//             isSignedIn: false,
//             registerMsg: '',
//             registerReducer: {}
//         };
//
//         const wrapper = mount(<RegisterPage {...props}/>);
//         const saveButton = wrapper.find('ReactButton');
//         expect(saveButton.text()).toBe('Sign Up');
//         saveButton.simulate('click');
//         expect(wrapper.state().errors.title).toBe('passwords must match');
//     });
// });
