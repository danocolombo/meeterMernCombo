import React, { Component } from 'react';
import { getGroups } from '../../actions/group';
import props from 'prop-types';
export default class ExistingGroups extends Component {
    constructor(props) {
        super();
        this.state = {
            existingGroups: [],
        };
    }

    componentDidMount() {
        // fetch the project name, once it retrieves resolve the promsie and update the state.
        this.getExistingGroups().then((result) =>
            this.setState({
                existingGroups: result,
            })
        );
    }

    getExistingGroups() {
        // replace with whatever your api logic is.
        const mid1 = '5eb87420c29f0b5ac02ad73d';
        const mid = props.mid;
        const res = getGroups(mid);
        return res();
    }

    render() {
        var smallGroups = [];
        if (this.state.existingGroups) {
            smallGroups = this.state.existingGroups.map((grp) => (
                <tr>
                    {grp.gender == 'm' ? <td>Men's</td> : <td></td>}
                    {grp.gender == 'w' ? <td>Women's</td> : <td></td>}
                    <td>{grp.title}</td>
                    <td>{grp.facilitator}</td>
                </tr>
            ));
        }

        return [
            <>
                <table>{smallGroups}</table>
            </>,
        ];
    }
}
