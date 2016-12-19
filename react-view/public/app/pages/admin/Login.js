import React from 'react'
import {connect} from 'react-redux'
import {authenticate_employee} from '../../actions/employee'

@connect((store) => {
    return {
        employee: store.reducer.employee
    };
})

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


    }
    onChange(e) {
        // console.log(e.target.name + ' == ' + e.target.value);
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e) {
        e.preventDefault();
        // console.info('Login: ' + this.state.login);
        // console.info('Password: ' + this.state.password);
        this.props.dispatch(authenticate_employee(this.state.login, this.state.password))
    }
    render() {
        if (this.props.employee.isAuthenticated) {
            this.props.router.push('admin/dashboard');
        }
        // console.log(this);

        let alert = <div className=""></div>;
        if (this.props.employee.errors['auth']) {
            alert = <div className="alert alert-danger">{this.props.employee.errors['auth']}</div>
        }
        return(
            <div className="col-sm-12 col-md-6 col-md-offset-3">
                <form onSubmit={this.onSubmit}>
                    {alert}
                    <div className="form-group">
                        <input type="text" className="form-control" name="login" onChange={this.onChange} placeholder="Employee Login"/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" onChange={this.onChange} placeholder="Employee Password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Log in as Employee</button>
                </form>
            </div>
        )
    }
}