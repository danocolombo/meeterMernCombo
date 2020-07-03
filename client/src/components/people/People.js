import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PeopleItem from './PeopleItem';
import { getPeople } from '../../actions/people';
// import auth from '../../../../middleware/auth';
import PeopleRemoveConfirm from './PeopleRemoveConfirm';
import Modal from '../layout/Modal/Modal';
import { deletePerson } from '../../actions/people';

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
    const [showDeleteModal, setPeopleConfirmation] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [deleteName, setDeleteName] = useState('');

    const deletePeopleHandler = (userId, userName) => {
        // this is coming back from list of people, throw modal
        setDeleteId(userId);
        setDeleteName(userName);
        setPeopleConfirmation(true);
    };
    const deleteConfirmHandler = (a) => {
        // this is response from confirmation 'a' is answer
        if (a !== 'CANCEL') {
            console.log('########################################');
            console.log('People :: deleteConfirmationHandler');
            console.log('id: ' + deleteId);
            console.log('user: ' + deleteName);
            console.log('Now we call api to remove people/user');
            console.log('########################################');
            deletePerson(deleteId);
        } else {
            console.log('CANCELING PEOPLE REMOVE');
        }
        setPeopleConfirmation(false); // hide modal
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
            <Modal show={showDeleteModal}>
                <PeopleRemoveConfirm
                    handleAction={deleteConfirmHandler}
                    userName={deleteName}
                />
            </Modal>
            <div className='posts'>
                {people.map((person) => (
                    <PeopleItem
                        key={person._id}
                        person={person}
                        deleteAction={deletePeopleHandler}
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

export default connect(mapStateToProps, { getPeople, deletePerson })(People);
