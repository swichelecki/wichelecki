import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';

class Footer extends Component {
    constructor(props){
        super(props);

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

    getData(value) {
        let idData = value;
        let id = idData.id;

        this.setState({
            id: id
        });
    }

    render() {

        const id = this.state.id;

        return(
              <div>
              <a href={`https://drive.google.com/uc?export=download&id=${id}`} download><button className="footer-button-one">Download Resume</button></a>
              <a href="/admin.html" target="_blank"><button className="footer-button-two">Check out this website's CRUD CMS</button></a>
              </div>
        );

    }

}

export default Footer;
