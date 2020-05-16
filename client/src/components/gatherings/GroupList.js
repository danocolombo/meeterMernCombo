import React from 'react';
import axios from 'axios';
import { getGroups } from '../../actions/group';

/* eslint react/prop-types: 0 */
const GroupList = () => {
    return [
        <>
            <table>
                <tr>
                    <td>Yeah</td>
                    <td>RIGHT</td>
                </tr>
            </table>
            {getOurGroups()}
        </>,
    ];
};
function getOurGroups() {
    const mid = '5eb87420c29f0b5ac02ad73d';

    const res = getGroups(mid);

    const response = res();

    // if (res) {
    //     console.log('we got a res');
    //     console.log(typeof res);
    //     console.log(res);
    // }
    if (response) {
        console.log('we got a response');
        console.log(typeof response);
        console.log(response);
        console.log(typeof response[0]);
    }
    // const maybe = response.data;
    // if (maybe) {
    //     console.log('we got a maybe');
    //     console.log(typeof maybe);
    //     console.log(maybe);
    // }
    return [<h2>closer</h2>];
}
export default GroupList;
