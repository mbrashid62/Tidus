import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as loginActions from '../../actions/loginActions';
import { bindActionCreators } from 'redux';
import TextInput from '../common/TextInput';

const LoginForm = ({course, allAuthors, onSave, onChange, saving, errors}) => {
    return (
        <form>
            <h1>Login</h1>
            <TextInput
                name="email"
                label="Email"

            />

            <TextInput
                name="password"
                label="Password"
               />

            <input
                type="submit"sa
                value={'Go'}
                className="btn btn-primary"
                />
        </form>
    );
};

// ManageCoursePage.propTypes = {
//     course: PropTypes.object.isRequired,
//     authors: PropTypes.array.isRequired,
//     actions: PropTypes.object.isRequired
// };
LoginForm.propTypes = {
    // course: React.PropTypes.object.isRequired,
    // allAuthors: React.PropTypes.array,
    // onSave: React.PropTypes.func.isRequired,
    // onChange: React.PropTypes.func.isRequired,
    // saving: React.PropTypes.bool,
    // errors: React.PropTypes.object
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {

    let user = ownProps.params;
    user = {email: user.email, pw: user.password};

    return {
        user: user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
