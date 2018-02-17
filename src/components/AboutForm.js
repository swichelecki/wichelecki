import React, { Component } from 'react';
import * as firebase from 'firebase';

class AboutForm extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            header: '',
            text: ''
        };
    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {

        event.preventDefault();

        var AboutUrlRef = firebase.database().ref('about');
        var newAbout = AboutUrlRef.push();

        newAbout.update(this.state);

        this.setState({
            header: '',
            text: ''
        });

    }

    render() {

        return(
          <form onSubmit={this.handleSubmit}>
              <h3>Add About Section</h3>
              <label>Header:<br/>
              <input type="text" name="header" value={this.state.header} onChange={this.handleChange}/>
              </label>
              <label>Text:
              <textarea rows="10" className="about-textarea" name="text" value={this.state.text} onChange={this.handleChange}/>
              </label>
              <input type="submit" value="Submit"/>
          </form>
        );
    }
}

export default AboutForm;
