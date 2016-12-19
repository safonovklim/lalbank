import React from 'react'


export default class MainInfo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const user = this.props.employee.data.client;
        const user_info = user['profile'];

        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Client information</h3>
                </div>
                <ul className="list-group">
                    <li className="list-group-item">{user_info['last_name'] + ' ' + user_info['first_name'] + ' ' + user_info['middle_name']}</li>
                    <li className="list-group-item">Birth date <b>{user_info['birth_at']}</b></li>
                    <li className="list-group-item">Login <b>{user_info['username']}</b></li>
                </ul>
            </div>
        )
    }
}