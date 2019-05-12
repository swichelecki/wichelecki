import React, { Component } from 'react';
import * as firebase from 'firebase';

class Login extends Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
        this.state = {
            user: '',
            password: ''
        }
    }

    componentDidMount() {

        const auth = firebase.auth();
        const promise = auth.onAuthStateChanged(firebaseUser => {

            if (firebaseUser) {

                console.log('you are logged in');
            }

        });
    }

    onChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    login(event) {
        event.preventDefault();

        let user = this.state.user;
        let password = this.state.password;

        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(user, password);
        promise.catch(error => {
            console.log(error.message);
            alert('Incorrect user name or password!');
        });

        auth.onAuthStateChanged(user => {

            if (user) {

                this.props.logIn(!this.props.loggedIn);
            }

        });

    }

    render() {

        return(
            <div className="absolute-center">
                <form className="login-form" onSubmit={this.login}>
                    <input className="login-input" type="text" name="user" placeholder="user name" value={this.state.user} onChange={this.onChange}/>
                    <input className="login-input" type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onChange}/>
                    <input className="login-submit" type="submit" value="Log in"/>
                </form>
            </div>
        );
    }
}

export default Login;
