import React from 'react'
import {connect} from 'react-redux'

@connect((store) => {
    return {
        client: store.reducer.client
    };
})

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const user = this.props.client;
        if (user.isAuthenticated === false) {
            return (<div></div>);
        }



        const user_info = user['user'];

        return(
            <div className="col-sm-12 col-md-6">
                ID: {user_info['id']}<br/>
                Login: {user_info['username']}<br/>
                Full name: {user_info['last_name'] + ' ' + user_info['first_name'] + ' ' + user_info['middle_name']}<br/>
                Date of birth: {user_info['birth_at']}<br/>

            </div>
        )
    }
}