import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
import Spinner from '../layout/Spinner';
import GatheringItem from './GatheringItem';
import { getGatherings } from '../../actions/gathering';

const Gatherings = ({
    getGatherings,
    gathering: { gatherings, hatherings, loading },
    auth: { activeClient, activeRole, activeStatus },
    match,
    historyView,
}) => {
    useEffect(() => {
        if (activeClient) {
            // console.log(
            //     'actives: ' +
            //         activeClient +
            //         ' ' +
            //         activeRole +
            //         ' ' +
            //         activeStatus
            // );
            getGatherings({ activeClient });
        }
        // getGatherings();
    }, [getGatherings, activeClient]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div>
                <h2 className='large text-primary'>
                    <i className='far fa-calendar-alt'></i> Meetings
                </h2>

                {offerView()}
            </div>

            <div className='posts'>{throwList()}</div>
        </Fragment>
    );
    function throwList() {
        if (match.params.options === 'historyView') {
            return [
                hatherings.map((hathering) => (
                    <GatheringItem
                        key={hathering._id}
                        gathering={hathering}
                        activeRole={activeRole}
                        activeStatus={activeStatus}
                    />
                )),
            ];
        } else {
            return [
                gatherings.map((gathering) => (
                    <GatheringItem
                        key={gathering._id}
                        gathering={gathering}
                        activeRole={activeRole}
                        activeStatus={activeStatus}
                    />
                )),
            ];
        }
    }
    function offerView() {
        if (match.params.options === 'historyView') {
            return [
                <Link to='/gatherings'>
                    <span className='meeterNavTextHighlight'>
                        Active Meetings
                    </span>
                </Link>,
                <p className='lead'>Your historical list of meetings...</p>,
            ];
        } else {
            if (activeStatus === 'approved' && activeRole !== 'guest') {
                return [
                    <Link to='/gatherings/historyView' id='hView'>
                        HISTORY
                    </Link>,
                    <p className='lead'>List of upcoming meetings...</p>,
                    <div>
                        <Link to='/EditGathering/0' visible='false'>
                            <div className='waves-effect waves-light btn'>
                                <i className='material-icons left green'>
                                    add_circle_outline
                                </i>
                                <span className='meeterNavTextHighlight'>
                                    {' '}
                                    NEW
                                </span>
                            </div>
                        </Link>
                    </div>,
                ];
            } else {
                return [
                    <Link to='/gatherings/historyView'>HISTORY</Link>,
                    <p className='lead'>List of upcoming meetings...</p>,
                ];
            }
        }
    }
};

Gatherings.defaultProps = {
    historyView: false,
};
Gatherings.propTypes = {
    getGatherings: PropTypes.func.isRequired,
    gathering: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    // hathering: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    gathering: state.gathering,
    hathering: state.hathering,
    auth: state.auth,
});
export default connect(mapStateToProps, { getGatherings })(Gatherings);
