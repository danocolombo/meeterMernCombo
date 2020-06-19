import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import HumanItem from './HumanItem';
import { getHumans } from '../../actions/human';

const Humans = ({
    getHumans,
    human: { humans, loading },
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
            //if we don't have humans, get them
            //we might have them if returning from EditHuman
            // getHumans(activeClient);
        }
        let hs = humans;
        if (hs.length == 0) {
            // getHumans(activeClient);
            getHumans(activeClient);
        } else {
            console.log('we have humans');
        }
    }, [getHumans]);

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
                <Link to='/EditHuman/0'>
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
                {humans.map((human) => (
                    <HumanItem key={human._id} human={human} />
                ))}
            </div>
        </Fragment>
    );
};

Humans.propTypes = {
    getHumans: PropTypes.func.isRequired,
    human: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    human: state.human,
    auth: state.auth,
});

export default connect(mapStateToProps, { getHumans })(Humans);
