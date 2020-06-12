import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
    deleteClientUser,
    approveClientUser,
    suspendClientUser,
} from '../../actions/admin';

const ClientUser = ({
    deleteClientUser,
    approveClientUser,
    suspendClientUser,
    auth,
    user: { _id, name, role, status },
}) => (
    <Fragment>
        <div className={'ClientUserBox'}>
            <table>
                <tr>
                    <td>{name}</td>
                    <td>{role}</td>
                    <td>{status}</td>
                    <td>
                        {!auth.loading && (
                            <Fragment>
                                <button
                                    onClick={() => approveClientUser(_id)}
                                    type='button'
                                    className='btn btn-success'
                                >
                                    <i class='material-icons md-18'>check</i>
                                </button>
                                <button
                                    onClick={() => suspendClientUser(_id)}
                                    type='button'
                                    className='btn btn-dark'
                                >
                                    <i class='material-icons md-18'>pan_tool</i>
                                </button>
                                <button
                                    onClick={() => deleteClientUser(_id)}
                                    type='button'
                                    className='btn btn-danger'
                                >
                                    <i class='material-icons md-18'>delete</i>
                                </button>
                            </Fragment>
                        )}
                    </td>
                </tr>
            </table>
        </div>
    </Fragment>
);

ClientUser.propTypes = {
    user: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteClientUser: PropTypes.func.isRequired,
    approveClientUser: PropTypes.func.isRequired,
    suspendClientUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    deleteClientUser,
    suspendClientUser,
    approveClientUser,
})(ClientUser);
