import React, { Component } from 'react';
import * as firebase from 'firebase';

class WebsitesContentForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this);

        var uid = firebase.database().ref().child('websites').push().key;

        this.state = {
          uid: uid,
          header: '',
          image: '',
          text: '',
          link: '',
          tech: '',
          techtext: '',
          lessons: '',
          lessonstext: '',
          frontend: '',
          backend: ''
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

    componentDidMount() {
        const rootRef = firebase.database().ref().child('websiteImages');
        const imageRef = rootRef.child('url');
        imageRef.on('value', snap => {
            this.setState({
              image: snap.val()
            });
        });
    }

    uploadImage(event) {

      let file = this.fileInput.files[0];
      let websiteImage = [];
      let websiteUrlString = '';

      var storageRef = firebase.storage().ref('website/' + file.name);

      var websiteImageUrlRef = firebase.database().ref().child('websiteImages');

      storageRef.put(file).then(function(url) {

          storageRef.getDownloadURL().then(function(url) {

          websiteImage.push(url);

          websiteUrlString = websiteImage[0];

          var newWebsiteUrlString = websiteImageUrlRef;

          newWebsiteUrlString.set({url: websiteUrlString});

        });

      });

    }

    handleSubmit(event) {

        event.preventDefault();

        var headerUrlRef = firebase.database().ref('websites');
        var newWebsite = headerUrlRef.push();
        var websiteImageUrlRef = firebase.database().ref().child('websiteImages');

        newWebsite.update(this.state);

        this.setState({
          header: '',
          image: '',
          text: '',
          tech: '',
          link: '',
          techtext: '',
          lessons: '',
          lessonstext: '',
          frontend: '',
          backend: ''
        });

        websiteImageUrlRef.set({url: ''});

        document.getElementById('file').value = null;

    }

    render () {

        const url = this.state.image;

        return (
          <form onSubmit={this.handleSubmit} id="contactForm">
              <h3>Add Website Widget</h3>
              <label>
                  Site Name:<br/>
                  <input type="text" name="header" value={this.state.header} onChange={this.handleChange}/>
              </label>
              <label>
                  Intro Text:<br/>
                  <textarea rows="10" name="text" value={this.state.text} onChange={this.handleChange}/>
              </label>
              <label>
                  Site Image:<br/>
                  <input type="file" id="file"
                    onChange={this.uploadImage}
                    ref={input => {
                      this.fileInput = input;
                    }}
                  />
                  <img src={url} className="file-image"/>
              </label>
              <label>
                  Website URL:<br/>
                  <input type="text" name="link" value={this.state.link} onChange={this.handleChange}/>
              </label>
              <label>
                  Technology:<br/>
                  <input type="text" name="tech" value={this.state.tech} onChange={this.handleChange}/>
              </label>
              <label>
                  Technology Text:<br/>
                  <textarea rows="10" name="techtext" value={this.state.techtext} onChange={this.handleChange}/>
              </label>
              <label>
                  Frontend:<br/>
                  <input type="text" name="frontend" value={this.state.frontend} onChange={this.handleChange}/>
              </label>
              <label>
                  Backend:<br/>
                  <input type="text" name="backend" value={this.state.backend} onChange={this.handleChange}/>
              </label>
              <label>
                  Lessons Learned:<br/>
                  <input type="text" name="lessons" value={this.state.lessons} onChange={this.handleChange}/>
              </label>
              <label>
                  Lessons Learned Text:<br/>
                  <textarea rows="10" name="lessonstext" value={this.state.lessonstext} onChange={this.handleChange}/>
              </label>
              <input type="submit" value="Submit"/>
          </form>
        );
    }
}

export default WebsitesContentForm;
