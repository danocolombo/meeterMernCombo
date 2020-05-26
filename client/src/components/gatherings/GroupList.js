import React, { Component } from 'react';
import { getGroups } from '../../actions/group';
import props from 'prop-types';
import { deleteGroup } from '../../actions/group';
export default class ExistingGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mid: this.props.mid,
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
        console.log('mid:' + this.state.mid);
    }

    getExistingGroups() {
        // replace with whatever your api logic is.
        const mid1 = '5eb87420c29f0b5ac02ad73d';
        const mid = this.state.mid;
        const res = getGroups(mid);
        return res();
    }
    showGender(g, i) {
        var returnValue = [];
        var hl = '/EditGroup/' + this.props.mid + '/' + i;
        switch (g) {
            case 'm':
                returnValue = [<div>Men's</div>];
                break;
            case 'f':
                returnValue = [<div>Women's</div>];
                break;
            default:
                returnValue = [<td className='GGL-Gender'></td>];
                break;
        }
        console.log('hl:' + hl);
        return returnValue;
    }
    generateGroupLink(gid) {
        var returnValue = [];
        var theLink = '/EditGroup/' + this.props.mid + '/' + gid;
        returnValue = theLink;
        return returnValue;
    }
    render() {
        var smallGroups = [];
        if (this.state.existingGroups) {
            smallGroups = this.state.existingGroups.map((grp) => (
                <tr>
                    <td className='GGL-Gender'>
                        <a href={this.generateGroupLink(grp._id)}>
                            {this.showGender(grp.gender, grp._id)}
                        </a>
                    </td>
                    <td className='GGL-Title'>{grp.title}</td>
                    <td className='GGL'>{grp.location}</td>
                    <td className='GGL-Facilitator'>{grp.facilitator}</td>
                    {/* <td className='GGL-Delete'>
                        <div className='mx-2'>
                            <a
                                id='deleteGrp'
                                className='DeleteTarget'
                                title='DELETE'
                                href='/#'
                                onClick={() => deleteGroup(grp._id)}
                            >
                                <i className='fas fa-minus-circle'></i>
                            </a>
                        </div>
                    </td> */}
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
