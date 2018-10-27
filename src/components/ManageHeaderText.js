import React, { Component } from 'react';
import * as firebase from 'firebase';

class ManageHeaderText extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            text: ""
        };
    }

    componentDidMount() {

        let app = firebase.database().ref('headerText');
        app.on('value', snapshot => {
            this.getData(snapshot.val());
        });
    }

    getData(value) {

        let headerText = value;
        let text = headerText.text;

        this.setState({
            text: text
        });
    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;

        this.setState({
            text: value
        });
    }

    handleSubmit(event) {

        event.preventDefault();

        let app = firebase.database().ref('headerText');
        let text = this.state;

        app.set(text);

        this.setState({
            text: 'SUCCESS'
        });

        this.timeout = window.setTimeout(() => {
            this.setState({
                text: text.text
            });
        }, 1000);

    }

    componentWillUnmount() {

        let app = firebase.database().ref('headerText');
        app.off();
    }

    render() {

        return(
            <div>
                <br/>
                <form onSubmit={this.handleSubmit} id="contactForm">
                    <h3>Manage Header Text</h3>
                    <textarea rows="5" value={this.state.text} onChange={this.handleChange} className="header-textarea"/>
                    <br/>
                    <input type="submit" className="form-submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default ManageHeaderText;
