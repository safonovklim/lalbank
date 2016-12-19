import React from 'react'
import {connect} from 'react-redux'
import {
    get_cards,
    issue_card
} from '../../actions/client_cards'

// this.props.dispatch(authenticate_user(this.state.login, this.state.password))
@connect((store) => {
    return {
        data: store.reducer.client.data,
        errors: store.reducer.client.errors
    };
})

export default class Cards extends React.Component {
    constructor(props) {
        super(props)
        this.props.dispatch(get_cards())
        this.issueCard = this.issueCard.bind(this)
    }
    issueCard(currency) {
        this.props.dispatch(issue_card(currency))
    }
    render() {
        const card_error = this.props.errors.cards;
        const client_data = this.props.data;

        let alert = <div></div>
        if (client_data['issued_card']) {
            let nc = client_data.issued_card // NEW CARD
            let ed = new Date(nc.expire_at) // EXPIRE DATE
            alert = (
                <div className="alert alert-success">
                    A new card issued. Please remember or save card details in safe place.<br/>
                    Card number: <b>{nc.card_number}</b><br/>
                    Expire at (MM/DD/YYYY): <b>{(ed.getUTCMonth() + 1) + '/' + ed.getUTCDate() + '/' + ed.getUTCFullYear()}</b><br/>
                    Pin code: <b>{nc.pin}</b><br/>
                </div>
            )
        } else if (card_error) {
            alert = (
                <div className="alert alert-danger">
                    {card_error}
                </div>
            )
        }
        return(
            <div>
                {alert}
                <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Your cards</h3>
                </div>
                {
                    client_data['error'] ? (
                        <div className="panel-body">
                            An error occurred: {client_data['error']}
                        </div>
                    ) : (
                        (client_data['cards'].length > 0) ? (
                            <ul className="list-group">
                                {
                                    client_data['cards'].map(function (card) {
                                        return (
                                            <li className="list-group-item" key={card.id}>
                                                <b>{card.amount} {card.currency}</b> - {card.card_number}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        ) : (
                            <div className="panel-body">
                                No cards issued.
                            </div>
                        )
                    )
                }
                <div className="panel-footer">
                    Issue card:
                    <div className="btn-group" role="group">
                        <button className="btn btn-primary" onClick={() => this.issueCard('RUB')}>RUB</button>
                        <button className="btn btn-primary" onClick={() => this.issueCard('USD')}>USD</button>
                        <button className="btn btn-primary" onClick={() => this.issueCard('EUR')}>EUR</button>
                    </div>

                </div>
            </div>
            </div>
        )
    }
}