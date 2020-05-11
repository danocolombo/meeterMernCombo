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
            <table>
                {gatherings.map((g) => (
                    <tr>
                        <td className='gatheringDate'>Date:{
                        date = new Date(g.meetingDate);
                        year = date.getFullYear();
                        month = date.getMonth()+1;
                        dt = date.getDate();
                        // if(dt < 10){
                        //     dt = '0' + dt;
                        // }

                        g.meetingDate
                        
                        }</td>
                        <td>{g.meetingType}</td>
                    </tr>
                ))}
            </table>
        </>
    ];
};
function testThis(gatherings){
    console.log('in the function.');
    var nDate = "";
    var nTitle = "";
    var nFacilitator = "";
    var nSupportRole = "";
    //-----------------------------------
    // sweep through the gatherings
    //-----------------------------------

};
NextGathering.propTypes = {
    gatherings: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
    return { gatherings: state.gathering.gatherings };
};

export default connect(mapStateToProps)(NextGathering);
