import React, { Fragment } from 'react';
//-----------------------------------------------------
//this displays the next gathering coming up. which is
// gathering.gatherings[0] which is already loaded in
// store
//-----------------------------------------------------
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* eslint react/prop-types: 0 */
const NextGathering = ({ gatherings }) => {
    return [
        <>
            <div>
                <h2>It is right here</h2>
            </div>
            <table>
                {gatherings.map((g) => (
                    <tr>
                        <td className='gatheringDate'>{g.meetingDate}</td>
                        <td>{g.meetingType}</td>
                    </tr>
                ))}
            </table>
        </>,
    ];
};
NextGathering.propTypes = {
    gatherings: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
    return { gatherings: state.gathering.gatherings };
};

export default connect(mapStateToProps)(NextGathering);
