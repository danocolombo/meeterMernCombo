import React, { Component } from 'react';

export default class DisplayUsersC extends Component {
    state = {
        users: [
            {
                id: '12345678',
                role: 'beginner',
                status: 'pending',
            },
            {
                id: '0987654',
                role: 'finsiher',
                status: 'expired',
            },
        ],
        showUsers: false,
    };
    approveAll = () => {
        this.setState({
            users: [
                {
                    id: '12345678',
                    role: 'beginner',
                    status: 'approved',
                },
                {
                    id: '0987654',
                    role: 'finsiher',
                    status: 'approved',
                },
            ],
        });
    };
    toggleUsersHandler = () => {
        const doesShow = this.state.showUsers;
        this.setState({ showUsers: !doesShow });
    };
    render() {
        return (
            <div>
                <hr />
                <p>
                    DisplayUsersC.js
                    <br />
                    Stateful: using local state <b>not REDUX</b>
                </p>
                <br />

                <button onClick={this.toggleUsersHandler}>Show Users</button>
                <p></p>
                {this.state.showUsers ? (
                    <div>
                        <br />

                        <button onClick={this.approveAll}>Approve All</button>
                        <p>User0 Status: {this.state.users[0].status}</p>
                        <p>User1 Status: {this.state.users[1].status}</p>
                        <br />
                    </div>
                ) : null}
                <br />
            </div>
        );
    }
}
