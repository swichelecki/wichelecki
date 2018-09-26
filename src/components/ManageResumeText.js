import React, { Component } from 'react';
import * as firebase from 'firebase';
import ReactQuill from 'react-quill';

class ManageResumeText extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            text: ''
        };

    }

    componentDidMount() {
        let app = firebase.database().ref('resume');
        app.on('value', snapshot => {
            this.getData(snapshot.val());
        });
    }

    getData(value) {
        let resumeData = value;
        let resume = resumeData.text;
        this.setState({text: resume});
    }

    handleChange(value) {
        this.setState({text: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let resumeDatabaseRef = firebase.database().ref('resume');
        let resume = this.state;
        resumeDatabaseRef.set(resume);
    }

    componentWillUnmount() {

        let app = firebase.database().ref('resume');
        app.off();
    }

    render() {

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>Edit Resume</h3>
                    <ReactQuill value={this.state.text} onChange={this.handleChange} />
                    <input type="submit" className="form-submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default ManageResumeText;
