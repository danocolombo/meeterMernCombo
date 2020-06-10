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
        axios.get('/api/client/users/wbc').then((response) => {
            // this.setState({ client: response.data });
            // console.log(response);
            this.setState({ client: JSON.stringify(response.data) });
        });
    }

    render() {
        // const client = this.state.client.map((c) => {
        //     return <p>Wa-la</p>;
        // });
        return [
            <Fragment>
                <div>Display the Client Users for {this.props.cid}</div>
                <div>All the users {this.state.client}</div>
                {showClientInfo(this.state.client)}
            </Fragment>,
        ];
    }
}
function json2array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        result.push(json[key]);
    });
    return result;
}
const showClientInfo = (cin) => {
    //the passed in object is a JSON object from API

    console.log('cin:');
    console.log(cin);
    var obj = JSON.parse(cin);

    // let client = {};
    // axios.get('/api/client/users/wbc').then((response) => {
    //     // this.setState({ client: response.data });
    //     // console.log(response);
    //     // this.setState({ client: JSON.stringify(response.data)
    //     // });
    //     client = JSON.stringify(response.data);
    // });
    // console.log('client: ');
    // console.log(client); // const util = require('util');
    // console.log(util.inspect(users, { showHidden: false, depth: null }));

    // var objs = [];
    // for (var i = usersFromAbove.length; i--; )
    //     objs[i] = JSON.parse(usersFromAbove[i]);
    //this is a java
    var jo = [
        {
            id: '28',
            Title: 'Sweden',
        },
        {
            id: 56,
            Title: 'USA',
        },
        {
            id: 89,
            Title: 'England',
        },
    ];
    // function json2array(json) {
    //     var result = [];
    //     var keys = Object.keys(json);
    //     keys.forEach(function (key) {
    //         result.push(json[key]);
    //     });
    //     return result;
    // }

    // for (var i = 0; i < jo.length; i++) {
    //     var object = jo[i];
    //     for (var property in object) {
    //         console.log('item ' + i + ': ' + property + '=' + object[property]);
    //     }
    //     // If property names are known beforehand, you can also just do e.g.
    //     // alert(object.id + ',' + object.Title);
    // }

    // const util = require('util');
    // console.log(util.inspect(users, { showHidden: false, depth: null }));
    // // let u = JSON.stringify(user);
    // for (var i = 0; i < users.length; i++) {
    //     var object = users[i];
    //     for (var property in object) {
    //         alert('item ' + i + ': ' + property + '=' + object[property]);
    //     }
    //     // If property names are known beforehand, you can also just do e.g.
    //     // alert(object.id + ',' + object.Title);
    // }

    // for (var u in obj) {
    //     console.log('u: ' + u);
    // }
    return <p>wa-da</p>;
};
export default DisplayUsers;
