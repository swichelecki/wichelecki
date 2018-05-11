import React, { Component } from 'react';
import * as firebase from 'firebase';

class FileInput extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            url: ''
        };
    }

    componentDidMount() {
        const rootRef = firebase.database().ref().child('headerUrl');
        const imageRef = rootRef.child('url');
        imageRef.on('value', snap => {
            this.setState({
              url: snap.val()
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let file = this.fileInput.files[0];
        let headerImage = [];
        let headerUrlString = null;

        var storageRef = firebase.storage().ref('header/' + file.name);

        var headerUrlRef = firebase.database().ref().child('headerUrl');

        storageRef.put(file).then(function(url) {

            storageRef.getDownloadURL().then(function(url) {

            headerImage.push(url);

            headerUrlString = headerImage[0];

            console.log(headerImage[0]);

            var newHeaderUrlRef = headerUrlRef;

            newHeaderUrlRef.update({url: headerUrlString});

          });
        });
    }

    render() {

        const url = this.state.url;

        return(
          <div>
              <h3 className="manage-header-image-h3">Manage Header Image</h3>
              <form onSubmit={this.handleSubmit}>
                  <input
                    type="file"
                    ref={input => {
                      this.fileInput = input;
                    }}
                  />
                  <button type="submit" className="photo-submit" onClick={this.addImage}>Submit</button>
                  <img src={url} className="file-image"/>
              </form>
          </div>
        );

    }
}

export default FileInput;
