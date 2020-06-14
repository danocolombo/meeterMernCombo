import React, { Component, Fragment } from 'react';
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
            case 'x':
                returnValue = [<div>Mixed</div>];
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
                <Fragment>
                    <div className={'groupListItem'}>
                        <div className='GGL-Gender my-1'>
                            <a href={this.generateGroupLink(grp._id)}>
                                {this.showGender(grp.gender, grp._id)}
                            </a>
                        </div>

                        <div>
                            <p className='GGL-Title my-1 pr-1'>{grp.title}</p>
                        </div>
                        <div>
                            <p className='GGL-Location my-1'>{grp.location}</p>
                        </div>
                        <div>
                            <p className='GGL-Facilitator my-1'>
                                {grp.facilitator}
                            </p>
                        </div>
                        <div className='GGL-Button my'>
                            <button
                                onClick={() => deleteGroup(grp._id)}
                                type='button'
                                className='btn btn-danger my0'
                            >
                                <i className='fas fa-times' />
                            </button>
                        </div>
                    </div>
                </Fragment>
                // <tr>
                //     <td className='GGL-Gender'>
                //         <a href={this.generateGroupLink(grp._id)}>
                //             {this.showGender(grp.gender, grp._id)}
                //         </a>
                //     </td>
                //     <td className='GGL-Title'>{grp.title}</td>
                //     <td className='GGL'>{grp.location}</td>
                //     <td className='GGL-Facilitator'>{grp.facilitator}</td>
                // {/* {/* <td className='GGL-Delete'>
                //     <div className='mx-2'>
                //         <a
                //             id='deleteGrp'
                //             className='DeleteTarget'
                //             title='DELETE'
                //             href='/#'
                //             onClick={() => deleteGroup(grp._id)}
                //         >
                //             <i className='fas fa-minus-circle'></i>
                //         </a>
                //     </div>
                // </td> */}
                // </tr> */}
            ));
        }

        return [
            <>
                <table>{smallGroups}</table>
            </>,
        ];
    }
}
