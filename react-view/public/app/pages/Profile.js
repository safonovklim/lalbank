import React from 'react'
import {connect} from 'react-redux'

import MainInfo from './for_profile/MainInfo'
import Cards from './for_profile/Cards'
import Transactions from './for_profile/Transactions'
import Analysis from './for_profile/Analysis'

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
        const client = this.props.client;
        if (client.isAuthenticated === false) {
            return (<div></div>);
        }

        return(
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <MainInfo client={client}/>
                        <hr/>
                        <Transactions client={client}/>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <Cards client={client}/>
                        <hr/>
                        <Analysis client={client}/>
                    </div>
                </div>
            </div>


        )
    }
}