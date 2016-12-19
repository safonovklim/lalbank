import React from 'react'
import {connect} from 'react-redux'
import {make_payment} from '../actions/demo_payment'
// make_payment

@connect((store) => {
    return {
        demo_transaction: store.reducer.demo_transaction
    };
})


export default class DemoPaywall extends React.Component {
    constructor(props) {
        super(props);

        let currencies = ["RUB", "USD"]
        let categories = [
            {id: 5, name: "Cash-out", type: "out"},
            {id: 6, name: "Cash-in", type: "in"},
            {id: 7, name: "Food", type: "out"},
            {id: 8, name: "Restaurants", type: "out"},
            {id: 9, name: "Transit", type: "out"},
            {id: 10, name: "Pharmacy", type: "out"},
            {id: 11, name: "Internet/Mobile phone", type: "out"},
            {id: 12, name: "Goods for home", type: "out"},
            {id: 13, name: "Clothes", type: "out"},
            {id: 14, name: "Shoes", type: "out"},
            {id: 15, name: "Pet shop", type: "out"},
            {id: 16, name: "Cosmetics", type: "out"},
            {id: 17, name: "Software, music, video", type: "out"},
            {id: 18, name: "Services", type: "out"},
            {id: 19, name: "Bar", type: "out"},
            {id: 20, name: "Education", type: "out"},
            {id: 21, name: "For kids", type: "out"},
            {id: 22, name: "Gifts", type: "out"},
            {id: 23, name: "Cinema, theater, concert", type: "out"},
            {id: 24, name: "Sport", type: "out"}

        ]

        this.state = {
            payment: {
                card_number: '',
                expire_at: '',
                pin_code: '',
                amount: 0.00,
                currency: currencies[0],
                category: categories[0]['id']
            },
            categories: categories,
            currencies: currencies,
            error: null
        };


        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.verifyInput = this.verifyInput.bind(this);
    }
    onChange(e) {
        let new_state = Object.assign({}, this.state)
        new_state.payment[e.target.name] = e.target.value
        this.setState(new_state)
    }
    onSubmit(e) {
        e.preventDefault();
        // console.info('Login: ' + this.state.login);
        let verification = this.verifyInput(Object.assign({}, this.state.payment))
        if (verification.ok === true) {
            console.log('new payment', this.state.payment)
            this.setState({
                error: null
            })
            this.props.dispatch(make_payment(this.state.payment))
        } else {
            this.setState({
                error: verification.message
            })
        }
    }
    verifyInput(input) {
        const i = input;
        i.amount = Number(i.amount)

        let ok = true;
        let err_msg = ''



        if (i.card_number.length !== 16) {
            err_msg = 'Wrong card number length (should be 16 digits)'
        } else if (i.pin_code.length !== 4) {
            err_msg = 'Wrong PIN code length (should be 4 digits)'
        } else if (!(this.state.currencies.indexOf(i.currency) >= 0)) {
            err_msg = 'Unknown currency'
        } else {
            let c_found = false
            this.state.categories.forEach(c => {
                if (c.id == i.category) {
                    c_found = true
                    if (c.type == "in" && i.amount <= 0) {
                        err_msg = 'Amount should be positive in this category'
                    } else if (c.type == "out" && i.amount >= 0) {
                        err_msg = 'Amount should be negative in this category'
                    }
                }
            })
            if (!c_found) {
                err_msg = 'Unknown category'
            }
        }

        ok = !(err_msg.length > 0)

        return {
            ok: ok,
            message: err_msg
        }
    }
    render() {
        const demo_transaction = this.props.demo_transaction;
        let alert = <div></div>

        if (this.state.error) {
            alert = <div className="alert alert-danger">{this.state.error}</div>
        } else if (demo_transaction.error) {
            alert = <div className="alert alert-danger">{demo_transaction.error}</div>
        } else if (demo_transaction.transaction_completed) {
            alert = <div className="alert alert-danger">Transaction completed</div>
        }

        console.log('demo_transaction', demo_transaction)

        return(
            <div className="col-sm-12 col-md-6 col-md-offset-3">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                        <h3 className="panel-title">PAYWALL (ONLY FOR DEMO)</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            {alert}
                            <div className="form-group">
                                <label>Card number</label>
                                <input type="text" className="form-control" name="card_number" onChange={this.onChange} placeholder="Card number (16 digits)"/>
                            </div>
                            <div className="form-group">
                                <label>Expire date</label>
                                <input type="date" className="form-control" name="expire_at" onChange={this.onChange} placeholder="Expire date"/>
                            </div>
                            <div className="form-group">
                                <label>PIN code</label>
                                <input type="password" className="form-control" name="pin_code" onChange={this.onChange} placeholder="PIN code (XXXX)"/>
                            </div>
                            <hr/>
                            <label>Amount</label>
                            <div className="form-group">
                                <input type="number" className="form-control" name="amount" onChange={this.onChange} placeholder="Amount"/>
                            </div>
                            <div className="form-group">
                                <select className="form-control"  onChange={this.onChange} name="currency">
                                    {
                                       this.state.currencies.map(c => {
                                           return <option value={c}>{c}</option>
                                       })
                                    }
                                </select>
                            </div>
                            <label>Category</label>
                            <div className="form-group">
                                <select className="form-control"  onChange={this.onChange} name="category">
                                    {
                                        this.state.categories.map(c => {
                                            return <option value={c.id}>{c.name}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Make a payment</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}