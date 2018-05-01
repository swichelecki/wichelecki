import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';

class ManageWebsites extends Component {
  constructor(props) {
      super(props);
      this.deleteWidget = this.deleteWidget.bind(this);
      this.makeWidgetEdit = this.makeWidgetEdit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.updateFirebase = this.updateFirebase.bind(this);
      this.openCloseForm = this.openCloseForm.bind(this);
      this.handleWebSubmit = this.handleWebSubmit.bind(this);
      this.onChangeCallback = this.onChangeCallback.bind(this);
      this.deleteConfirm = this.deleteConfirm.bind(this);

      var uid = firebase.database().ref().child('websites').push().key;

      this.state = {
        uid: uid,
        backend: '',
        frontend: '',
        header: '',
        image: '',
        lessons: '',
        lessonstext: '',
        tech: '',
        techtext: '',
        text: '',
        key: '',
        link: '',
        display: 'none',
        dataArray: []
      };

  }

  componentDidMount() {

      let app = firebase.database().ref('websites');
      app.on('value', snapshot => {
        this.getData(snapshot.val());
      });

      const rootRef = firebase.database().ref().child('websiteImages');
      const imageRef = rootRef.child('url');
      imageRef.on('value', snap => {
          this.setState({
            image: snap.val()
          });
      });
  }

  getData(values) {
      let websiteVal = values;
      let websites = _(websiteVal)
                        .keys()
                        .map(websiteKey => {
                            let cloned = _.clone(websiteVal[websiteKey]);
                            cloned.key = websiteKey;
                            return cloned;
                        })
                        .value();
        this.setState({
          dataArray: websites
        });

  }

  deleteConfirm(key) {
      let deleteAbout = confirm("Are you sure you want to delete this?");

        if (deleteAbout == true) {
            this.deleteWidget(key);
        }
  }

  deleteWidget(key) {
      let app = firebase.database().ref('websites');
      app.child(key).remove();

  }

  makeWidgetEdit(backend, frontend, header, image, lessons, lessonstext, tech, techtext, text, key, link) {
      this.setState({
        backend: backend,
        frontend: frontend,
        header: header,
        image: image,
        lessons: lessons,
        lessonstext: lessonstext,
        tech: tech,
        techtext: techtext,
        text: text,
        key: key,
        link: link
      });
  }

  handleChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
          [name]: value
        }, this.onChangeCallback);

  }

  //onChangeCallback callback keeps state in sync with keystrokes

  onChangeCallback() {

  }

  updateFirebase(event) {

    event.preventDefault();

    let finalObject = this.state;
    delete finalObject.dataArray;

    let key = finalObject.key;

    let widgetToUpdate = firebase.database().ref().child('websites').child(key);

    widgetToUpdate.once('value', function(snapshot) {

        if (snapshot.val() === null) {
            alert('Item does not exist.');
        } else {
            widgetToUpdate.update(finalObject);
        }

    });

    var websiteImageUrlRef = firebase.database().ref().child('websiteImages');

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
      backend: '',
      key: '',
      display: 'none'
    });

    websiteImageUrlRef.set({url: ''});

    document.getElementById('file').value = null;

    window.scrollTo(0,0);

  }

  openCloseForm() {
      if (this.state.display == 'none'){
          this.setState({
            display: 'block'
          });
      } else {
          this.setState({
            display: 'none',
            header: '',
            image: '',
            text: '',
            link: '',
            tech: '',
            techtext: '',
            lessons: '',
            lessonstext: '',
            frontend: '',
            backend: '',
            key: ''
          });
      }

      window.scrollTo(0,0);
  }

  handleWebSubmit(event) {

      event.preventDefault();

      let headerUrlRef = firebase.database().ref('websites');
      let newWebsite = headerUrlRef.push();
      let websiteImageUrlRef = firebase.database().ref().child('websiteImages');

      let websiteObject = this.state;
      delete websiteObject.dataArray;

      newWebsite.update(websiteObject);

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

      window.scrollTo(0,0);

  }

  componentWillUnmount() {

    let app = firebase.database().ref('websites');
    app.off();

  }

  render() {

        return(
          <div>
            <WebsiteInput
            webSubmit={this.handleWebSubmit}
            onChange={this.handleChange}
            displayProp={this.state.display}
            webInput={this.state}
            />
            <EditWidgetForm
            webInput={this.state}
            onChange={this.handleChange}
            onSubmit={this.updateFirebase}
            displayProp={this.state.display}
            cancelEdit={this.openCloseForm}
            />
            <h3>Manage Websites</h3>
            <FlexBox
            boxContent={this.state.dataArray}
            deleteWidget={this.deleteConfirm}
            editWidget={this.makeWidgetEdit}
            openForm={this.openCloseForm}
            />
          </div>
        );
  }
}

class WebsiteInput extends Component {
  constructor(){
    super();
    this.uploadImage = this.uploadImage.bind(this);
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

  render() {

      const displayValue = this.props.displayProp;

      let formDisplay = (displayValue == 'none') ? formDisplay = 'block' : formDisplay = 'none';

      const displayStyle = {display: formDisplay}

      const url = this.props.webInput.image;

      return(
        <div style={displayStyle}>
        <form onSubmit={this.props.webSubmit} id="contactForm">
            <h3>Add Website Widget</h3>
            <label>
                Site Name:<br/>
                <input type="text" name="header" value={this.props.webInput.header} onChange={this.props.onChange}/>
            </label>
            <label>
                Intro Text:<br/>
                <textarea rows="10" name="text" value={this.props.webInput.text} onChange={this.props.onChange}/>
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
                <input type="text" name="link" value={this.props.webInput.link} onChange={this.props.onChange}/>
            </label>
            <label>
                Technology:<br/>
                <input type="text" name="tech" value={this.props.webInput.tech} onChange={this.props.onChange}/>
            </label>
            <label>
                Technology Text:<br/>
                <textarea rows="10" name="techtext" value={this.props.webInput.techtext} onChange={this.props.onChange}/>
            </label>
            <label>
                Frontend:<br/>
                <input type="text" name="frontend" value={this.props.webInput.frontend} onChange={this.props.onChange}/>
            </label>
            <label>
                Backend:<br/>
                <input type="text" name="backend" value={this.props.webInput.backend} onChange={this.props.onChange}/>
            </label>
            <label>
                Lessons Learned:<br/>
                <input type="text" name="lessons" value={this.props.webInput.lessons} onChange={this.props.onChange}/>
            </label>
            <label>
                Lessons Learned Text:<br/>
                <textarea rows="10" name="lessonstext" value={this.props.webInput.lessonstext} onChange={this.props.onChange}/>
            </label>
            <input className="form-submit" type="submit" value="Submit"/>
        </form>
        </div>
      );

    }
}

class EditWidgetForm extends Component {
  constructor() {
    super();
      this.uploadImage = this.uploadImage.bind(this);
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

  render () {

    const displayValue = this.props.displayProp;
    const displayStyle = {display: displayValue}

      return (
        <div style={displayStyle}>
        <h3>Update Website Widget</h3>
        <form onSubmit={this.props.onSubmit} id="contactForm">
            <label>
                Site Name:<br/>
                <input type="text" name="header" value={this.props.webInput.header} onChange={this.props.onChange}/>
            </label>
            <label>
                Intro Text:<br/>
                <textarea rows="10" name="text" value={this.props.webInput.text} onChange={this.props.onChange}/>
            </label>
            <label>
                Site Image:<br/>
                <input type="file" id="file"
                  onChange={this.uploadImage}
                  ref={input => {
                  this.fileInput = input;
                  }}
                />
                <img src={this.props.webInput.image} className="file-image"/>
            </label>
            <label>
                Website URL:<br/>
                <input type="text" name="link" value={this.props.webInput.link} onChange={this.props.onChange}/>
            </label>
            <label>
                Technology:<br/>
                <input type="text" name="tech" value={this.props.webInput.tech} onChange={this.props.onChange}/>
            </label>
            <label>
                Technology Text:<br/>
                <textarea rows="10" name="techtext" value={this.props.webInput.techtext} onChange={this.props.onChange}/>
            </label>
            <label>
                Frontend:<br/>
                <input type="text" name="frontend" value={this.props.webInput.frontend} onChange={this.props.onChange}/>
            </label>
            <label>
                Backend:<br/>
                <input type="text" name="backend" value={this.props.webInput.backend} onChange={this.props.onChange}/>
            </label>
            <label>
                Lessons Learned:<br/>
                <input type="text" name="lessons" value={this.props.webInput.lessons} onChange={this.props.onChange}/>
            </label>
            <label>
                Lessons Learned Text:<br/>
                <textarea rows="10" name="lessonstext" value={this.props.webInput.lessonstext} onChange={this.props.onChange}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
        <button className="cancel-button" onClick={this.props.cancelEdit}>Cancel</button>
        </div>
      );
  }

}

class FlexBox extends Component {

  render() {

      let contentBlock;
      if (this.props.boxContent) {

          contentBlock = this.props.boxContent.map((data, index) => {

            return(
                <div id="box" key={index} className="flexbox">
                    <p><strong>{data.header}</strong></p>
                    <button onClick={() => {this.props.editWidget(data.backend, data.frontend, data.header, data.image, data.lessons, data.lessonstext, data.tech, data.techtext, data.text, data.key, data.link); this.props.openForm();}}>Edit</button>
                    <button onClick={() => this.props.deleteWidget(data.key)}>Delete</button>
                </div>
            );

          });
      }

      return (
        <div className="flexbox-container">
        {contentBlock}
        </div>);
  }

}

export default ManageWebsites;
