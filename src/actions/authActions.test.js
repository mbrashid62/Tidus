import expect from 'expect';
import * as authActions from './authActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('Auth Actions', () => {
    describe('createUserSuccess', () => {
        it('should create a CREATE_USER_SUCCESS action', () => {
            const payload = { user: {}, msg: 'Successful Registration!', isRegistered: true }; //arrange
            const expectedAction = {
                type: types.CREATE_USER_SUCCESS,
                payload: payload
            };
            const action = authActions.createUserSuccess({}); // call the action
            expect(action).toEqual(expectedAction); // make the assertion
        });
    });
    describe('createUserError', () => {
        it('should create a CREATE_USER_ERROR action', () => {
            const mockError = { message: 'Uh oh, error!' };
            const payload = { user: {}, msg: mockError.message, isRegistered: false  }; // arrange
            const expectedAction = {
                type: types.CREATE_USER_ERROR,
                payload: payload
            };
            const action = authActions.createUserError(mockError); // call the action
            expect(action).toEqual(expectedAction); // make the assertion
        });
    });
});



// const middleware = [thunk];
// const mockStore = configureMockStore(middleware);
//
// describe('Async Actions', () => {
//     afterEach(() => {
//         nock.cleanAll();
//     });
//
//     it('should create BEGIN_AJAX_CALL and LOAD_COURSES_SUCCESS when loading courses', (done) => {
//         // Here's an example call to nock.
//         // nock('http://example.com/')
//         //   .get('/courses')
//         //   .reply(200, { body: { course: [{ id: 1, firstName: 'Cory', lastName: 'House'}] }});
//
//         const expectedActions = [
//             {type: types.BEGIN_AJAX_CALL},
//             {type: types.LOAD_COURSES_SUCCESS, body: {courses: [{id: 'clean-code', title: 'Clean Code'}]}}
//         ];
//
//         const store = mockStore({courses: []}, expectedActions, done);
//         store.dispatch(spotifyActions.loadCourses()).then(() => {
//             const actions = store.getActions();
//             expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
//             expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
//             done();
//         });
//     });
// });


