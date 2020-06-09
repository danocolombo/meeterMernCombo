import React, { Component, Fragment } from 'react';
import axios from 'axios';
export class DisplayUsers extends Component {
    state = {
        client: [],
    };
    componentDidMount() {
        //go get the posts before we render....
        // https://jsonplaceholder.typicode.com/posts
        // '/api/client/code/wbc
        let client = {};
        axios.get('/api/client/code/wbc').then((response) => {
            // this.setState({ client: response.data });
            // console.log(response);
            this.setState({ client: JSON.stringify(response.data) });
        });
    }
    showClientInfo = () => {
        return <p>wa-da</p>;
    };
    render() {
        // const client = this.state.client.map((c) => {
        //     return <p>Wa-la</p>;
        // });
        return [
            <Fragment>
                <div>Display the Client Users for {this.props.cid}</div>
                <div>Display the Client Users for {this.state.client}</div>
                {this.showClientInfo}
                {/* const {( _id, name, code)} = this.state.client;
                <p>NAME: {this.state.client.name}</p> */}
            </Fragment>,
        ];
    }
}

export default DisplayUsers;
