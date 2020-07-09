import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PeopleItem from './PeopleItem';
import Modal from '../layout/Modal/Modal';
import DeletePersonConfirm from './DeletePersonConfirm';
import { getPeople, deletePerson } from '../../actions/people';
// import auth from '../../../../middleware/auth';

const People = ({
    getPeople,
    deletePerson,
    person: { people, loading },
    auth: { activeClient, activeRole, activeStatus },
    match,
}) => {
    useEffect(() => {
        if (activeClient) {
            getPeople(activeClient);
        }
    }, [getPeople, activeClient]);
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');

    const deleteRequest = (i, n) => {
        //this was coming back from person list
        setUserId(i);
        setUserName(n);
        setDeleteConfirmModal(true);
    };
    const deleteConfirmResponse = (r) => {
        console.log('Response:' + r);
        if (r !== 'CANCEL') {
            console.log('deleteing ' + userName + ' (' + userId + ')');
            const i = userId;
            setUserId('');
            setUserName('');
            deletePerson(i);
        }
        setDeleteConfirmModal(false);
    };

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>
                <i className='fas fa-user'></i>People
            </h1>
            <p className='lead'></p>
            <div>
                <Link to='/EditPerson/0'>
                    <div className='waves-effect waves-light btn green'>
                        <i className='material-icons left green'>
                            add_circle_outline
                        </i>
                        <span className='meeterNavTextHighlight'>
                            {'  '}Add
                        </span>
                    </div>
                </Link>
            </div>
            <div>
                <Modal show={deleteConfirmModal}>
                    <DeletePersonConfirm
                        deleteResponse={deleteConfirmResponse}
                        userName={userName}
                    />
                </Modal>
            </div>
            <div className='posts'>
                {people.map((person) => (
                    <PeopleItem
                        key={person._id}
                        person={person}
                        deleteResponse={deleteRequest}
                        // deleteRequest={deleteRequest}
                    />
                ))}
            </div>
        </Fragment>
    );
};

People.propTypes = {
    getPeople: PropTypes.func.isRequired,
    deletePerson: PropTypes.func.isRequired,
    person: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    person: state.person,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getPeople,
    deletePerson,
})(People);
