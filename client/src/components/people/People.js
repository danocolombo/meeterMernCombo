import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PersonItem from './PersonItem';
import { getPeople } from '../../actions/person';
// import auth from '../../../../middleware/auth';

const People = ({
    getPeople,
    person: { people, loading },
    auth: { activeClient, activeRole, activeStatus },
    match,
}) => {
    useEffect(() => {
        if (activeClient) {
            console.log(
                'actives: ' +
                    activeClient +
                    ' ' +
                    activeRole +
                    ' ' +
                    activeStatus
            );
            getPeople(activeClient);
        }
    }, [getPeople]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <h1 className='large text-primary'>People</h1>
            <p className='lead'>
                <i className='fas fa-user'></i>These are your peeps
                <br />
                activeClient{activeClient}
            </p>
            <div>
                <Link to='/EditPerson/0'>
                    <div class='waves-effect waves-light btn green'>
                        <i class='material-icons left green'>
                            add_circle_outline
                        </i>
                        <span className='meeterNavTextHighlight'>
                            {'  '}Add
                        </span>
                    </div>
                </Link>
            </div>
            <div className='posts'>
                {people.map((person) => (
                    <PersonItem key={person._id} person={person} />
                ))}
            </div>
        </Fragment>
    );
};

People.propTypes = {
    getPeople: PropTypes.func.isRequired,
    person: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    person: state.person,
    auth: state.auth,
});

export default connect(mapStateToProps, { getPeople })(People);
