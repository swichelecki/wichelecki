import React, { Component } from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';

class AboutAbout extends Component {
    constructor(props) {
      super(props);
      this.deleteAbout = this.deleteAbout.bind(this);
      this.editAboutItem = this.editAboutItem.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateFirebase = this.updateFirebase.bind(this);
      this.openCloseForm = this.openCloseForm.bind(this);
      this.state = {
        header: '',
        text: '',
        key: '',
        display: 'none',
        aboutArray: []
      };

      let app = firebase.database().ref('about');
      app.on('value', snapshot => {
          this.getData(snapshot.val());
      });
    }

    getData(values) {
        let aboutValues = values;
        let about = _(aboutValues).keys()
                                  .map(aboutKey => {
                                      let cloned = _.clone(aboutValues[aboutKey]);
                                      cloned.key = aboutKey;
                                      return cloned;
                                  })
                                  .value();
        this.setState({
            aboutArray: about
        });

    }

    deleteAbout(key) {
        let app = firebase.database().ref('about');
        app.child(key).remove();
    }

    editAboutItem(header, text, key) {
      this.setState({
        header: header,
        text: text,
        key: key
      });
    }

    handleChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;

      this.setState({
            [name]: value
          }, this.handleSubmit);

    }

    //handleSubmit callback keeps state in sync with keystrokes

    handleSubmit() {

    }

    updateFirebase(event) {
        event.preventDefault();

        let finalObject = this.state;
        delete finalObject.aboutArray;

        let key = finalObject.key;

        let itemToUpdate = firebase.database().ref().child('about').child(key);

        itemToUpdate.once('value', function(snapshot) {

            if (snapshot.val() === null) {
                alert('Item does not exist.');
            } else {
                itemToUpdate.update(finalObject);
            }

        });

        this.setState({
          header: '',
          text: '',
          key: '',
          display: 'none'
        });
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
              text: '',
              key: ''
          });
      }

    }

    render() {

        return(
            <div>
                <EditAboutForm
                editAboutObject={this.state}
                onChange={this.handleChange}
                onSubmit={this.updateFirebase}
                displayProp={this.state.display}
                cancelEdit={this.openCloseForm}/>
                <h3>Manage About Section</h3>
                <AboutDivs deleteAbout={this.deleteAbout}
                aboutObject={this.state.aboutArray}
                editAbout={this.editAboutItem}
                openForm={this.openCloseForm}/>
            </div>
        );

    }
}

class EditAboutForm extends Component {

    render() {

      const displayValue = this.props.displayProp;
      const displayStyle = {display: displayValue}

              return(
                <div style={displayStyle}>
                <form onSubmit={this.props.onSubmit}>
                    <h3>Update About Section</h3>
                    <label>Header:<br/>
                    <input type="text" name="header" value={this.props.editAboutObject.header} onChange={this.props.onChange}/>
                    </label>
                    <label>Text:
                    <textarea rows="10" className="about-textarea" name="text" value={this.props.editAboutObject.text} onChange={this.props.onChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                <button className="cancel-button" onClick={this.props.cancelEdit}>Cancel</button>
                </div>
              );

    }
}

class AboutDivs extends Component {

    render() {
        let aboutKey;
        if (this.props.aboutObject) {
            aboutKey = this.props.aboutObject.map((key, index) => {

              return(
                  <div className="about-container" key={index}>
                      <p className="body-header-h2"><strong>{key.header}</strong></p>
                        <button onClick={() => {this.props.editAbout(key.header, key.text, key.key); this.props.openForm();}}>Edit</button>
                      <button onClick={() => this.props.deleteAbout(key.key)}>Delete</button>
                  </div>
              );

          });

        }

        return(
            <div>{aboutKey}</div>
        );
    }
}

export default AboutAbout;
