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
            {showFuture(gatherings)}
            <table>
                {gatherings.map((g) => (
                    <tr>
                        <td className='gatheringDate'>
                            {showDate(g.meetingDate)}
                        </td>
                        <td>&nbsp;</td>
                        <td>{g.meetingType}</td>
                    </tr>
                ))}
            </table>
        </>,
    ];
};
function showFuture(g) {
    // let mCnt = g.map((gath) => (
    //     //loop through the store
    // ))
    // if (g.gatherings)
    console.log('SIZE:' + g.length);
    if (g.length > 0) {
        //=======================================
        // there are future gatherings in store
        //=======================================
        return [
            <>
                <h2>WE HAVE A FUTURE</h2>
            </>,
        ];
    } else {
        return [<h4>We have no future</h4>];
    }
}
function showDate(d) {
    //return 'mm/dd/yyyy';
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate() + 1;
    let nDate = month + '/' + dt + '/' + year;
    return nDate;
}
function testThis(gatherings) {
    console.log('in the function.');
    var nDate = '';
    var nTitle = '';
    var nFacilitator = '';
    var nSupportRole = '';
    //-----------------------------------
    // sweep through the gatherings
    //-----------------------------------
}
NextGathering.propTypes = {
    gatherings: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
    return { gatherings: state.gathering.gatherings };
};

export default connect(mapStateToProps)(NextGathering);
