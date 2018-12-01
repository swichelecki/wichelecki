import React, { Component } from 'react';
import * as firebase from 'firebase';

class ManageResumeId extends Component {

    constructor(props) {
        super(props);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleIdSubmit = this.handleIdSubmit.bind(this);
        this.state = {
            id: ''
        }
    }

    componentDidMount() {
        let app = firebase.database().ref('googleId');
        app.on('value', snapshot => {
            this.getData(snapshot.val());
        });
    }

    getData(value){

        let idData = value;
        let id = idData.id;

        this.setState({ id: id });
    }

    handleIdChange(event) {

        const target = event.target;
        const value = target.value;

        this.setState({
            id: value
        });
    }

    handleIdSubmit(event) {

        event.preventDefault();

        let idDatabaseRef = firebase.database().ref('googleId');
        let id = this.state;

        idDatabaseRef.set(id);

        this.setState({
            id: "SUCCESS"
        });

        this.timeout = window.setTimeout(() => {
            this.setState({
                id: id.id
            });
        }, 1000);

    }

    componentWillUnmount() {

        let app = firebase.database().ref('googleId');
        app.off();
    }

    render() {

        return(
            <div>
                <form onSubmit={this.handleIdSubmit}>
                    <h3 className="admin-h3">Update Google PDF ID</h3>
                        <input type="text" id="success" value={this.state.id} onChange={this.handleIdChange} className="google-id-input"/>
                    <br/>
                    <input type="submit" className="form-submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default ManageResumeId;
