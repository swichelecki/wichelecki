import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';
import { Link, BrowserRouter } from 'react-router-dom';

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
              <div className="footer-wrap">
                <Link to="/admin" target="_blank" className="footer-button-one">Check out this website's CRUD CMS</Link>
                <br/><br/>
                <a href={`${id}`} target="_blank" className="footer-button-one">See GitHub repo</a>
              </div>
        );

    }

}

export default Footer;
